// Conversion hooks for a future tag manager (GTM / GA4 / Google Ads). Nothing is loaded today: events are
// pushed to window.dataLayer only if a tag manager has created it, so without one they are no-ops.
// Before adding one: a consent banner (Consent Mode v2) and an updated privacy policy.
//
// Rules: never send personal data (names, emails, phone numbers, messages, hrefs that contain them).
// `generate_lead` is the conversion and fires once, only after the form service confirms the message.
// `form_step` marks a step reached in a multi-step form (`step`: 2, 3), to see where people drop off.
// `form_submit` marks a valid submit attempt; GA4's enhanced measurement also uses that name, so turn off
// its "Form interactions" option to avoid counting twice.

export type TrackEvent = "generate_lead" | "form_step" | "form_submit" | "click_whatsapp" | "click_email" | "click_phone";
export type TrackParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: TrackEvent, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, params);
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...params });
}
