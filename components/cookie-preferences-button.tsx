"use client";
import { analyticsEnabled } from "@/lib/analytics";
export function CookiePreferencesButton() {
  if (!analyticsEnabled) return null;
  return <button type="button" className="privacy-preferences" onClick={() => window.dispatchEvent(new Event("seya:privacy"))}>Gérer les cookies</button>;
}
