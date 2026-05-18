import { SITE_URL } from "@/lib/seo/site";
import { SEO_BUSINESS_EMAIL } from "@/lib/seo/contact";
import { getOptionalAggregateRatingBlock } from "@/lib/seo/reviews-schema";
import type { GeoCoordinatesSchema, PostalAddressSchema, SchemaNode } from "./types";

export type BusinessLocale = "fr" | "en" | "ar";

const siteOrigin = SITE_URL.replace(/\/$/, "");
export const LOCAL_BUSINESS_ID = `${siteOrigin}/#localbusiness`;
export const TAXI_SERVICE_ID = `${siteOrigin}/#taxi-service-airport`;
export const ORGANIZATION_ID = `${siteOrigin}/#organization`;

const descriptions: Record<BusinessLocale, string> = {
  fr: "Taxi Rabat, transfert aéroport Rabat-Salé (RBA), Casablanca ↔ Rabat. Chauffeur privé premium Mercedes & BMW, réservation 24h/24.",
  en: "Rabat taxi, Rabat-Salé airport transfer (RBA), Casablanca ↔ Rabat. Premium private chauffeur, Mercedes & BMW fleet, 24/7 booking.",
  ar: "تاكسي الرباط، نقل مطار الرباط-سلا، الرباط ↔ الدار البيضاء. سائق خاص فاخر، حجز 24/7.",
};

export function generateLocalBusinessSchema(
  locale: BusinessLocale = "fr",
): SchemaNode {
  const aggregateRating = getOptionalAggregateRatingBlock();
  const businessDescription = descriptions[locale] ?? descriptions.fr;

  const address: PostalAddressSchema = {
    "@type": "PostalAddress",
    addressLocality: "Rabat",
    addressRegion: "Rabat-Salé-Kénitra",
    postalCode: "10000",
    addressCountry: "MA",
  };

  const geo: GeoCoordinatesSchema = {
    "@type": "GeoCoordinates",
    latitude: 34.0515,
    longitude: -6.7515,
  };

  const node: SchemaNode = {
    "@type": "LocalBusiness",
    "@id": LOCAL_BUSINESS_ID,
    additionalType: "https://schema.org/TaxiService",
    name: "Rabat Transfert Aéroport",
    alternateName: ["Rabat Transfert", "Taxi Rabat Aéroport"],
    description: businessDescription,
    url: `${siteOrigin}/`,
    telephone: "+212674545939",
    email: SEO_BUSINESS_EMAIL,
    image: `${siteOrigin}/assets/new-logo-taxi-rabat-removebg-preview.png`,
    priceRange: "$$$",
    address,
    geo,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      { "@type": "City", name: "Rabat", addressCountry: "MA" },
      { "@type": "City", name: "Salé", addressCountry: "MA" },
      { "@type": "City", name: "Casablanca", addressCountry: "MA" },
      {
        "@type": "Airport",
        name: "Aéroport Rabat-Salé",
        iataCode: "RBA",
        addressCountry: "MA",
      },
      {
        "@type": "Airport",
        name: "Aéroport Mohammed V",
        iataCode: "CMN",
        addressCountry: "MA",
      },
    ],
    serviceType: [
      "Airport transfer",
      "Private chauffeur",
      "Intercity taxi",
      "Premium transport",
    ],
    sameAs: [],
  };

  if (aggregateRating) {
    node.aggregateRating = aggregateRating;
  }

  return node;
}

export function generateTaxiServiceSchema(
  locale: BusinessLocale = "fr",
): SchemaNode {
  const businessDescription = descriptions[locale] ?? descriptions.fr;

  return {
    "@type": "TaxiService",
    "@id": TAXI_SERVICE_ID,
    name:
      locale === "en"
        ? "Rabat airport transfer & private taxi"
        : locale === "ar"
          ? "نقل مطار الرباط وتاكسي خاص"
          : "Transfert aéroport Rabat & taxi privé",
    description: businessDescription,
    provider: { "@id": LOCAL_BUSINESS_ID },
    areaServed: [
      { "@type": "City", name: "Rabat", addressCountry: "MA" },
      { "@type": "City", name: "Salé", addressCountry: "MA" },
      {
        "@type": "Airport",
        name: "Aéroport Rabat-Salé",
        iataCode: "RBA",
        addressCountry: "MA",
      },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteOrigin}/`,
      servicePhone: "+212674545939",
    },
  };
}

export function generateLocalBusinessAndTaxiServiceGraph(
  locale: BusinessLocale = "fr",
): SchemaNode[] {
  return [
    generateLocalBusinessSchema(locale),
    generateTaxiServiceSchema(locale),
  ];
}
