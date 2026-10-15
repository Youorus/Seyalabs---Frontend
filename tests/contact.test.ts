import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { contactSchema, emailBody } from "../lib/contact-schema";
import { consumeRateLimit } from "../lib/rate-limit";
import { POST } from "../app/api/contact/route";
import { mailer } from "../lib/contact-mail";

const input = {
  name: "Camille Martin", company: "Exemple de test", email: "camille@example.org", phone: "",
  projectType: "Application métier", budget: "À définir", timeline: "Exploration",
  message: "Nous souhaitons centraliser la gestion de nos dossiers internes.", consent: true,
  website: "", startedAt: Date.now() - 5000,
};

test("lead validation trims values and rejects unqualified or malformed requests", () => {
  const valid = contactSchema.parse({ ...input, name: " Camille Martin ", email: " camille@example.org " });
  assert.equal(valid.name, "Camille Martin"); assert.equal(valid.email, "camille@example.org");
  for (const change of [{ consent: false }, { message: "Court" }, { email: "invalid" }, { budget: "fake" }, { phone: "abc12345" }, { message: "a".repeat(5001) }]) {
    assert.equal(contactSchema.safeParse({ ...input, ...change }).success, false);
  }
  assert.ok(emailBody(valid).includes(input.message));
  const training = contactSchema.parse({ ...input, projectType: "Formation", message: "Nous souhaitons former cinq personnes à l’automatisation." });
  assert.ok(emailBody(training).includes("Type de demande : Formation"));
  assert.ok(emailBody(training).includes("former cinq personnes"));
});

test("abuse protection isolates callers and expires its window", async () => {
  for (let i = 0; i < 5; i++) assert.equal(await consumeRateLimit("unit-caller", 1000000), true);
  assert.equal(await consumeRateLimit("unit-caller", 1000000), false);
  assert.equal(await consumeRateLimit("other-caller", 1000000), true);
  assert.equal(await consumeRateLimit("unit-caller", 2000000), true);
});

test("contact endpoint checks origin, payload, bot trap and delivery outcome", async () => {
  process.env.CONTACT_TRUST_PROXY = "true";
  const previousWebhook = process.env.CONTACT_WEBHOOK_URL;
  const realFetch = globalThis.fetch;
  let index = 0;
  function request(body: unknown, origin = "https://seyalabs.com") {
    return new NextRequest("https://seyalabs.com/api/contact", { method: "POST", headers: { origin, "content-type": "application/json", "x-forwarded-for": `test-${index++}` }, body: JSON.stringify(body) });
  }
  try {
    assert.equal((await POST(request(input, "https://example.org"))).status, 403);
    assert.equal((await POST(request({ ...input, consent: false }))).status, 400);
    assert.equal((await POST(request({ ...input, message: "a".repeat(20000) }))).status, 413);
    delete process.env.CONTACT_WEBHOOK_URL;
    assert.equal((await POST(request({ ...input, website: "spam" }))).status, 200);
    assert.equal((await POST(request(input))).status, 503);
    process.env.CONTACT_WEBHOOK_URL = "https://webhook.example.org/lead";
    let transmitted: Record<string, unknown> | undefined;
    globalThis.fetch = (async (_url, init) => { transmitted = JSON.parse(init?.body as string); return new Response("", { status: 200 }); }) as typeof fetch;
    assert.equal((await POST(request(input))).status, 200);
    assert.equal(transmitted?.email, input.email);
    assert.equal(transmitted?.website, undefined);
    assert.equal(transmitted?.startedAt, undefined);
    const trainingRequest = { ...input, projectType: "Formation", message: "Formation souhaitée : data et intégration API pour notre équipe." };
    assert.equal((await POST(request(trainingRequest))).status, 200);
    assert.equal(transmitted?.projectType, "Formation");
    assert.equal(transmitted?.message, trainingRequest.message);
    globalThis.fetch = (async () => new Response("", { status: 500 })) as typeof fetch;
    assert.equal((await POST(request(input))).status, 502);
  } finally {
    globalThis.fetch = realFetch;
    if (previousWebhook === undefined) delete process.env.CONTACT_WEBHOOK_URL; else process.env.CONTACT_WEBHOOK_URL = previousWebhook;
    delete process.env.CONTACT_TRUST_PROXY;
  }
});

test("contact endpoint delivers by SMTP, replying to the visitor, before any webhook", async () => {
  process.env.CONTACT_TRUST_PROXY = "true";
  process.env.SMTP_USER = "contact@seyalabs.com";
  process.env.SMTP_PASSWORD = "test-only";
  process.env.CONTACT_WEBHOOK_URL = "https://webhook.example.org/lead";
  const realCreate = mailer.createTransport;
  const realFetch = globalThis.fetch;
  let index = 0;
  function request(body: unknown) {
    return new NextRequest("https://seyalabs.com/api/contact", { method: "POST", headers: { origin: "https://seyalabs.com", "content-type": "application/json", "x-forwarded-for": `smtp-${index++}` }, body: JSON.stringify(body) });
  }
  const sent: Array<Record<string, unknown>> = [];
  let webhookCalled = false;
  globalThis.fetch = (async () => { webhookCalled = true; return new Response("", { status: 200 }); }) as typeof fetch;
  try {
    mailer.createTransport = (() => ({ sendMail: async (message: Record<string, unknown>) => { sent.push(message); return {}; } })) as unknown as typeof mailer.createTransport;
    assert.equal((await POST(request({ ...input, company: "Exemple\r\nBcc: x@example.org" }))).status, 200);
    assert.equal(webhookCalled, false);
    assert.equal(sent.length, 2);
    assert.equal(sent[0].to, "contact@seyalabs.com");
    const confirmation = sent[1];
    assert.equal(confirmation.to, input.email);
    assert.equal(confirmation.replyTo, "contact@seyalabs.com");
    assert.equal((confirmation.headers as Record<string, string>)["Auto-Submitted"], "auto-replied");
    assert.match(String(confirmation.subject), /^Nous avons bien reçu votre demande — SL-[0-9A-F]{8}$/);
    // Aucun texte libre du visiteur dans un courriel envoyé à une adresse saisie.
    for (const field of [confirmation.html, confirmation.text]) {
      assert.ok(!String(field).includes("Bcc:"));
      assert.ok(!String(field).includes(input.message));
      assert.ok(!String(field).includes(input.name));
    }
    assert.ok(String(confirmation.html).includes("Application métier"));
    assert.deepEqual(sent[0].from, { name: "SEYA LABS", address: "contact@seyalabs.com" });
    assert.deepEqual(sent[0].replyTo, { name: input.name, address: input.email });
    assert.ok(!String(sent[0].subject).includes("\n"));
    assert.ok(String(sent[0].text).includes(input.message));
    let calls = 0;
    mailer.createTransport = (() => ({ sendMail: async () => { if (calls++ === 1) throw new Error("550 mailbox unavailable"); return {}; } })) as unknown as typeof mailer.createTransport;
    assert.equal((await POST(request(input))).status, 200, "an undeliverable confirmation must not reject a delivered lead");
    mailer.createTransport = (() => ({ sendMail: async () => { throw new Error("535 auth failed"); } })) as unknown as typeof mailer.createTransport;
    assert.equal((await POST(request(input))).status, 502);
  } finally {
    mailer.createTransport = realCreate;
    globalThis.fetch = realFetch;
    for (const key of ["SMTP_USER", "SMTP_PASSWORD", "CONTACT_WEBHOOK_URL", "CONTACT_TRUST_PROXY"]) delete process.env[key];
  }
});
