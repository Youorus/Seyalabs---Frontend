import { analyticsEnabled, measurementId, type AnalyticsEvent } from "./analytics";
import { readConsent, sanitiseAnalyticsUrl } from "./consent";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const disableKey = `ga-disable-${measurementId}` as const;
const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
let loading: Promise<boolean> | undefined;
let configured = false;
let lastLocation = "";
function allowed() { return analyticsEnabled && readConsent()?.analytics === "granted" && !window[disableKey]; }

export function deleteAnalyticsCookies() {
  const names = document.cookie.split(";").map((cookie) => cookie.trim().split("=")[0]).filter((name) => /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name));
  const host = window.location.hostname;
  const domains = new Set(["", host, `.${host}`]);
  const parts = host.split(".");
  for (let i = 1; i < parts.length - 1; i++) { domains.add(parts.slice(i).join(".")); domains.add(`.${parts.slice(i).join(".")}`); }
  for (const name of names) for (const domain of domains) {
    document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
  }
}

export function stopAnalytics() {
  const wasEnabled = window[disableKey] === false;
  window[disableKey] = true;
  if (configured && wasEnabled) window.gtag?.("consent", "update", denied);
  deleteAnalyticsCookies();
  lastLocation = "";
}

export async function startAnalytics(): Promise<boolean> {
  if (!analyticsEnabled || readConsent()?.analytics !== "granted") return false;
  window[disableKey] = false;
  if (!loading) {
    window.dataLayer = window.dataLayer || [];
    // Keep Google's documented gtag command queue format.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = window.gtag || function () { window.dataLayer!.push(arguments); };
    window.gtag("consent", "default", denied);
    // Basic mode: no script, connection or ping before acceptance.
    loading = new Promise((resolve) => {
      const script = document.createElement("script");
      script.id = "seya-google-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.referrerPolicy = "no-referrer";
      script.onload = () => resolve(true);
      script.onerror = () => { script.remove(); loading = undefined; resolve(false); };
      document.head.appendChild(script);
    });
  }
  if (!await loading || !allowed()) return false;
  window.gtag?.("consent", "update", { ...denied, analytics_storage: "granted" });
  if (!configured) {
    window.gtag?.("js", new Date());
    window.gtag?.("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 365 * 24 * 60 * 60,
      cookie_update: false,
      cookie_flags: "SameSite=Lax;Secure",
      page_location: sanitiseAnalyticsUrl(window.location.href),
      page_referrer: sanitiseAnalyticsUrl(document.referrer),
    });
    configured = true;
  }
  return true;
}

export function sendPageView(pathname: string) {
  if (!configured || !allowed()) return;
  const location = sanitiseAnalyticsUrl(new URL(pathname, window.location.origin).href);
  if (!location || lastLocation === location) return;
  const parameters = { page_location: location, page_path: pathname.split(/[?#]/)[0], page_title: document.title, page_referrer: lastLocation || sanitiseAnalyticsUrl(document.referrer) };
  window.gtag?.("set", parameters);
  window.gtag?.("event", "page_view", { ...parameters, send_to: measurementId });
  lastLocation = location;
}

export function sendAnalyticsEvent(event: AnalyticsEvent) {
  if (!configured || !allowed()) return;
  window.gtag?.("event", event, { send_to: measurementId, page_location: sanitiseAnalyticsUrl(window.location.href), page_path: window.location.pathname, page_referrer: sanitiseAnalyticsUrl(document.referrer) });
}
