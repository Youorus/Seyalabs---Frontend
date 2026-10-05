import { readConsent } from "./consent";

export const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-K3MFCQHF4R";
export const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "false" && /^G-[A-Z0-9]+$/.test(measurementId);
export const analyticsEvents = ["hero_cta_click", "contact_started", "contact_submitted", "service_viewed", "case_study_viewed", "resource_downloaded", "email_clicked", "phone_clicked"] as const;
export type AnalyticsEvent = typeof analyticsEvents[number];
export function isAnalyticsEvent(event: unknown): event is AnalyticsEvent {
  return typeof event === "string" && analyticsEvents.includes(event as AnalyticsEvent);
}

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined" || !analyticsEnabled || !isAnalyticsEvent(event) || readConsent()?.analytics !== "granted") return;
  // No form values, link destinations, email addresses or arbitrary event properties.
  window.dispatchEvent(new CustomEvent("seya:analytics", { detail: { event } }));
}
