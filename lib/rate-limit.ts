import { createHmac, randomBytes } from "node:crypto";

const ephemeralSecret = randomBytes(32).toString("hex");
const attempts = new Map<string, { count: number; expiresAt: number }>();
const windowSeconds = 900;
const maximum = 5;

export async function consumeRateLimit(identifier: string, now = Date.now()) {
  const key = `seya:contact:${createHmac("sha256", process.env.RATE_LIMIT_SECRET || ephemeralSecret).update(identifier).digest("hex")}`;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    if (!process.env.RATE_LIMIT_SECRET) throw new Error("Distributed rate limit secret required");
    const response = await fetch(`${redisUrl.replace(/\/$/, "")}/multi-exec`, {
      method: "POST", headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", key], ["EXPIRE", key, windowSeconds, "NX"]]),
      cache: "no-store", signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error("Rate limit unavailable");
    const result: { result?: number; error?: string }[] = await response.json();
    if (typeof result[0]?.result !== "number" || result.some((item) => item.error)) throw new Error("Invalid rate limit result");
    return result[0].result <= maximum;
  }
  for (const [storedKey, value] of attempts) if (value.expiresAt <= now) attempts.delete(storedKey);
  const record = attempts.get(key);
  if (!record) {
    // Bound memory use even if a trusted proxy supplies many unique identifiers.
    if (attempts.size >= 10000) return false;
    const nextRecord = { count: 1, expiresAt: now + windowSeconds * 1000 };
    attempts.set(key, nextRecord);
    const timer = setTimeout(() => { if (attempts.get(key) === nextRecord) attempts.delete(key); }, windowSeconds * 1000);
    timer.unref();
    return true;
  }
  record.count += 1;
  return record.count <= maximum;
}
