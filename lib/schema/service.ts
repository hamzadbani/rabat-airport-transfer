import { LOCAL_BUSINESS_ID } from "./local-business";
import type { RouteOfferInput, SchemaNode } from "./types";

export function generateServiceSchema(input: {
  name: string;
  description?: string;
  pageUrl: string;
  offerId: string;
}): SchemaNode {
  const svcId = `${input.pageUrl}#route-service`;
  return {
    "@type": "Service",
    "@id": svcId,
    name: input.name,
    description: input.description,
    serviceType: "TaxiService",
    provider: { "@id": LOCAL_BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: "Rabat",
      addressCountry: "MA",
    },
    offers: { "@id": input.offerId },
  };
}

export function generateOfferSchema(route: RouteOfferInput): SchemaNode {
  const offerId = `${route.pageUrl}#offer`;
  return {
    "@type": "Offer",
    "@id": offerId,
    priceCurrency: "MAD",
    price: String(route.priceEstimatedMAD),
    description: `Estimation indicative ${route.fromCity} → ${route.toCity} (${route.distanceKm} km)`,
    url: route.pageUrl,
  };
}

export function generateTaxiRouteSchema(route: RouteOfferInput): SchemaNode[] {
  const offerId = `${route.pageUrl}#offer`;
  return [
    generateOfferSchema(route),
    generateServiceSchema({
      name: `Transport ${route.fromCity} → ${route.toCity}`,
      pageUrl: route.pageUrl,
      offerId,
    }),
  ];
}
