import type { SeoPageId } from "./types";
import { estimatePriceMad, SEO_ROUTE_LEGS, type SeoRouteLeg } from "./routes-data";

export type RouteFactDisplay = SeoRouteLeg & {
  priceEstimatedMAD: number;
};

/** Pick a representative route row for pricing / distance blocks on SEO pages. */
export function getRouteFactForPage(pageId: SeoPageId): RouteFactDisplay | null {
  let leg: SeoRouteLeg | undefined;

  if (
    pageId === "taxi-rabat-aeroport" ||
    pageId === "taxi-aeroport-rabat" ||
    pageId === "transfert-rabat-aeroport" ||
    pageId === "taxi-aeroport-rabat-centre" ||
    pageId === "navette-aeroport-rabat"
  ) {
    leg = SEO_ROUTE_LEGS.find((r) => r.id === "rabat-centre-rba");
  } else if (pageId === "taxi-hay-riad") {
    leg = SEO_ROUTE_LEGS.find((r) => r.id === "hay-riad-rba");
  } else if (pageId === "taxi-agdal") {
    leg = SEO_ROUTE_LEGS.find((r) => r.id === "agdal-rba");
  } else if (pageId === "taxi-souissi") {
    leg = SEO_ROUTE_LEGS.find((r) => r.id === "souissi-rba");
  } else if (
    pageId === "taxi-sale-aeroport" ||
    pageId === "transfert-sale-aeroport"
  ) {
    leg = SEO_ROUTE_LEGS.find((r) => r.id === "sale-rba");
  } else if (
    pageId === "rabat-casablanca-taxi" ||
    pageId === "transfert-rabat-casablanca" ||
    pageId === "taxi-rabat-casablanca" ||
    pageId === "taxi-rabat-casa-prix"
  ) {
    leg = SEO_ROUTE_LEGS.find((r) => r.id === "rabat-casa-centre");
  } else if (pageId === "casablanca-rabat-taxi") {
    const forward = SEO_ROUTE_LEGS.find((r) => r.id === "rabat-casa-centre");
    if (!forward) return null;
    leg = {
      ...forward,
      id: "casa-rabat",
      fromCity: forward.toCity,
      toCity: forward.fromCity,
    };
  } else if (
    pageId === "taxi-rabat-prix" ||
    pageId === "taxi-prix-rabat" ||
    pageId === "taxi-sale-prix"
  ) {
    leg = SEO_ROUTE_LEGS.find((r) => r.id === "rabat-centre-rba");
  }

  if (!leg) return null;

  return {
    ...leg,
    priceEstimatedMAD: estimatePriceMad(leg),
  };
}
