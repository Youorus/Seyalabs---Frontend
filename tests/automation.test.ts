import test from "node:test";
import assert from "node:assert/strict";
import { automationBrief, automationExample, estimateAutomation } from "../lib/automation-estimate";
import { serviceEnquiry } from "../lib/service-enquiry";
import { services } from "../data/services";

test("automation estimates subtract human work and monthly maintenance once", () => {
  const example = estimateAutomation(automationExample[0]);
  assert.equal(example.hoursBefore, 30);
  assert.equal(example.hoursAfter, 11);
  assert.equal(example.hoursSaved, 19);
  assert.equal(estimateAutomation(automationExample[1]).hoursSaved, 8.5);
  assert.equal(estimateAutomation(automationExample[2]).hoursSaved, -1);
  assert.equal(estimateAutomation({ ...automationExample[0], monthlyRuns: 0 }).hoursSaved, -1);
  assert.equal(estimateAutomation({ ...automationExample[0], minutesBefore: 2, monthlyMaintenance: 0 }).hoursSaved, 0);
  assert.ok(automationBrief(automationExample).includes("-1 h/mois"));
});

test("invalid calculator inputs cannot produce a misleading estimate", () => {
  for (const change of [{ monthlyRuns: -1 }, { monthlyRuns: 1.5 }, { monthlyRuns: Infinity }, { minutesBefore: NaN }, { minutesAfter: -1 }, { monthlyMaintenance: Infinity }, { name: " " }]) {
    assert.throws(() => estimateAutomation({ ...automationExample[0], ...change }), RangeError);
  }
});

test("commercial enquiries keep a known service and reject arbitrary query input", () => {
  for (const service of services) {
    const enquiry = serviceEnquiry(service.slug);
    assert.equal(enquiry?.service, service);
    assert.ok(enquiry?.message.includes(service.name));
    assert.ok(enquiry?.projectType);
  }
  assert.equal(serviceEnquiry("assistant-ia")?.projectType, "Intelligence artificielle");
  assert.equal(serviceEnquiry("integration-api")?.projectType, "Data / API");
  for (const input of [undefined, ["assistant-ia"], "https://example.org", "__proto__", "<script>", "constructor"]) assert.equal(serviceEnquiry(input), undefined);
});
