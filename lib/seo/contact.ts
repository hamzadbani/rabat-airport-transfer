/** Shared conversion CTAs for SEO landings (keep in sync with main site). */
export const SEO_BUSINESS_PHONE_DISPLAY = "+212 6 74 54 59 39";
export const SEO_BUSINESS_PHONE_TEL = "tel:+212674545939";
export const SEO_WHATSAPP_E164 = "212674545939";
export const SEO_BUSINESS_EMAIL = "Taxi.toursrabat@gmail.com";

export function seoWhatsAppHref(prefill?: string): string {
  const q = prefill ? `?text=${encodeURIComponent(prefill)}` : "";
  return `https://wa.me/${SEO_WHATSAPP_E164}${q}`;
}
