/** Canonical production origin (override in CI via NEXT_PUBLIC_SITE_URL). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://taxirabatairoport.com"
).replace(/\/$/, "");
