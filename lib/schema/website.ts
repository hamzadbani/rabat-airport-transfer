import { SITE_URL } from "@/lib/seo/site";
import { ORGANIZATION_ID } from "./local-business";
import type { SchemaNode } from "./types";

export function generateWebSiteSchema(): SchemaNode {
  const origin = SITE_URL.replace(/\/$/, "");
  return {
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    url: `${origin}/`,
    name: "Rabat Transfert Aéroport",
    publisher: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: `${origin}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema(): SchemaNode {
  const origin = SITE_URL.replace(/\/$/, "");
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Rabat Transfert Aéroport",
    url: `${origin}/`,
    logo: `${origin}/assets/new-logo-taxi-rabat-removebg-preview.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+212674545939",
      contactType: "reservations",
      areaServed: "MA",
      availableLanguage: ["French", "English", "Arabic"],
    },
  };
}
