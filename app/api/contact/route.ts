import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { contactSchema } from "@/lib/contact-schema";
import { consumeRateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const runtime = "nodejs";
const maxBytes = 16384;

function reply(data: object, status = 200, headers: Record<string, string> = {}) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("EMPTY");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > maxBytes) { await reader.cancel(); throw new Error("SIZE"); }
    chunks.push(value);
  }
  const body = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(body));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowed = [site.url];
  if (process.env.NODE_ENV !== "production" || process.env.CONTACT_ALLOW_LOCAL_PREVIEW === "true") allowed.push(request.nextUrl.origin);
  if (!origin || !allowed.includes(origin)) return reply({ error: "Cette demande ne peut pas être envoyée depuis cette origine." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "Format de demande non pris en charge." }, 415);
  if (Number(request.headers.get("content-length")) > maxBytes) return reply({ error: "La demande est trop volumineuse." }, 413);
  let identifier = "unproxied";
  // Enable only behind a proxy that strips and overwrites incoming forwarded headers.
  if (process.env.CONTACT_TRUST_PROXY === "true") identifier = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 128) || identifier;
  try { if (!await consumeRateLimit(identifier)) return reply({ error: "Trop de tentatives. Réessayez dans 15 minutes ou écrivez-nous par email." }, 429, { "Retry-After": "900" }); }
  catch { return reply({ error: "L’envoi est temporairement indisponible. Vous pouvez nous écrire par email." }, 503); }
  let input: unknown;
  try { input = await readBody(request); } catch (error) { return reply({ error: "La demande est invalide ou trop volumineuse." }, error instanceof Error && error.message === "SIZE" ? 413 : 400); }
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return reply({ error: "Vérifiez les champs de votre demande.", fields: parsed.error.flatten().fieldErrors }, 400);
  if (parsed.data.website) return reply({ ok: true });
  const elapsed = Date.now() - parsed.data.startedAt;
  if (elapsed < 1500 || elapsed > 86400000) return reply({ error: "Merci de vérifier votre demande puis de réessayer." }, 400);
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return reply({ error: "L’envoi direct n’est pas encore disponible. Finalisez votre demande par email." }, 503);
  try {
    if (new URL(webhook).protocol !== "https:") throw new Error("Invalid webhook configuration");
    const { website: _website, startedAt: _startedAt, ...lead } = parsed.data;
    void _website; void _startedAt;
    const id = randomUUID();
    const response = await fetch(webhook, {
      method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": id,
        ...(process.env.CONTACT_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` } : {}) },
      body: JSON.stringify({ id, ...lead, source: "seyalabs-website", receivedAt: new Date().toISOString() }),
      redirect: "error", cache: "no-store", signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error("Delivery failed");
    return reply({ ok: true });
  } catch { return reply({ error: "L’envoi n’a pas pu être confirmé. Vous pouvez finaliser votre demande par email." }, 502); }
}
