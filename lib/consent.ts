export const consentKey = "seya-analytics-consent-v2";
export type ConsentChoice = "granted" | "denied";
export type ConsentRecord = { version: 2; analytics: ConsentChoice; decidedAt: number; expiresAt: number };

export function createConsent(analytics: ConsentChoice, now = Date.now()): ConsentRecord {
  const expiry = new Date(now);
  const day = expiry.getUTCDate();
  expiry.setUTCDate(1);
  expiry.setUTCMonth(expiry.getUTCMonth() + 6);
  const lastDay = new Date(Date.UTC(expiry.getUTCFullYear(), expiry.getUTCMonth() + 1, 0)).getUTCDate();
  expiry.setUTCDate(Math.min(day, lastDay));
  return { version: 2, analytics, decidedAt: now, expiresAt: expiry.getTime() };
}

export function parseConsent(raw: string | null, now = Date.now()): ConsentRecord | null {
  if (!raw) return null;
  try {
    const record = JSON.parse(raw) as Partial<ConsentRecord>;
    if (record.version !== 2 || !["granted", "denied"].includes(record.analytics || "") ||
      !Number.isFinite(record.decidedAt) || !Number.isFinite(record.expiresAt) ||
      record.decidedAt! > now || record.expiresAt! <= now ||
      record.expiresAt !== createConsent(record.analytics!, record.decidedAt).expiresAt) return null;
    return record as ConsentRecord;
  } catch { return null; }
}

export function readConsent(): ConsentRecord | null {
  try { return parseConsent(window.localStorage.getItem(consentKey)); } catch { return null; }
}

export function saveConsent(choice: ConsentChoice): ConsentRecord | null {
  const record = createConsent(choice);
  try {
    window.localStorage.setItem(consentKey, JSON.stringify(record));
    window.localStorage.removeItem("seya-analytics-consent-v1");
    return record;
  } catch { return null; }
}

export function sanitiseAnalyticsUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return ["https:", "http:"].includes(parsed.protocol) ? parsed.origin + parsed.pathname : "";
  } catch { return ""; }
}
