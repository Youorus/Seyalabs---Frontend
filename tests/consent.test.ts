import { test } from "node:test";
import assert from "node:assert/strict";
import { createConsent, parseConsent, sanitiseAnalyticsUrl } from "../lib/consent";
import { isAnalyticsEvent } from "../lib/analytics";

test("acceptance and refusal expire after six calendar months, with month-end clamping", () => {
  const now = Date.parse("2026-08-31T12:00:00Z");
  for (const choice of ["granted", "denied"] as const) {
    const record = createConsent(choice, now);
    assert.equal(record.expiresAt, Date.parse("2027-02-28T12:00:00Z"));
    assert.deepEqual(parseConsent(JSON.stringify(record), now + 1), record);
    assert.equal(parseConsent(JSON.stringify(record), record.expiresAt), null);
  }
});

test("malformed, legacy, future and extended consent fails closed", () => {
  const now = Date.parse("2026-10-05T12:00:00Z");
  const record = createConsent("granted", now);
  for (const raw of [null, "granted", "denied", "[]", "null", "{}", "broken", JSON.stringify({ ...record, version: 1 }), JSON.stringify({ ...record, analytics: "yes" }), JSON.stringify({ ...record, expiresAt: record.expiresAt + 1 }), JSON.stringify(createConsent("granted", now + 1))]) {
    assert.equal(parseConsent(raw, now), null);
  }
});

test("analytics URL fields exclude queries, hashes and non-web destinations", () => {
  assert.equal(sanitiseAnalyticsUrl("https://seyalabs.com/contact?email=person@example.com#secret"), "https://seyalabs.com/contact");
  for (const url of ["mailto:person@example.com", "javascript:alert(1)", "invalid"]) assert.equal(sanitiseAnalyticsUrl(url), "");
  assert.equal(isAnalyticsEvent("email_clicked"), true);
  assert.equal(isAnalyticsEvent("person@example.com"), false);
  assert.equal(isAnalyticsEvent(undefined), false);
});
