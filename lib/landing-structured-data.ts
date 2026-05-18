import { getHomeFaq } from "@/lib/home-faq";
import { SITE_URL } from "@/lib/seo/site";
import {
  generateFAQSchema,
  generateLocalBusinessAndTaxiServiceGraph,
  generateOrganizationSchema,
  generateSpeakableSchema,
  generateWebSiteSchema,
  type SchemaGraph,
} from "@/lib/schema";

type Locale = "fr" | "en" | "ar";

export function getLocalBusinessAndTaxiServiceGraph(locale: Locale) {
  return generateLocalBusinessAndTaxiServiceGraph(locale);
}

export function getLandingStructuredData(locale: Locale): SchemaGraph {
  const pageUrl = locale === "fr" ? SITE_URL : `${SITE_URL}/${locale}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      generateWebSiteSchema(),
      generateOrganizationSchema(),
      ...generateLocalBusinessAndTaxiServiceGraph(locale),
      generateFAQSchema(getHomeFaq(locale), pageUrl),
      generateSpeakableSchema(pageUrl, ["#ai-answer"]),
    ],
  };
}
