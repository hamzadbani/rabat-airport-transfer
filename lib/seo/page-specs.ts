import type { SeoDimensions } from "./dimensions";
import { assertSlugMatchesDimensions } from "./slug-formula";
import { computeRelatedPageIds } from "./related-links";
import { inferSitemapConfig } from "./sitemap-infer";
import { SEO_SLUG_LIST } from "./slug-catalog";
import type { SeoPageId, SeoSitemapConfig } from "./types";

/**
 * Laravel `seo_pages` equivalent: one row per slug.
 * Optional `dimensions` only when `slug === slugFromDimensions(dimensions)` (formula pages).
 */
export type SeoPageSpec = {
  id: SeoPageId;
  dimensions?: SeoDimensions;
  indexed: boolean;
  relatedPageIds: SeoPageId[];
  sitemap: SeoSitemapConfig;
};

/** Slugs that still match `{service}-{location}-{intent?}` (validated at load). */
const DIMENSIONS_BY_ID: Partial<Record<SeoPageId, SeoDimensions>> = {
  "taxi-rabat": { service: "taxi", location: "rabat" },
  "taxi-sale": { service: "taxi", location: "sale" },
  "taxi-rabat-aeroport": { service: "taxi", location: "rabat", intent: "aeroport" },
  "taxi-sale-aeroport": { service: "taxi", location: "sale", intent: "aeroport" },
  "transfert-rabat-aeroport": { service: "transfert", location: "rabat", intent: "aeroport" },
  "transfert-sale-aeroport": { service: "transfert", location: "sale", intent: "aeroport" },
  "taxi-rabat-prix": { service: "taxi", location: "rabat", intent: "prix" },
  "taxi-sale-prix": { service: "taxi", location: "sale", intent: "prix" },
  "chauffeur-prive-rabat": { service: "chauffeur-prive", location: "rabat" },
  "chauffeur-prive-sale": { service: "chauffeur-prive", location: "sale" },
  "taxi-hay-riad": { service: "taxi", location: "hay-riad" },
  "taxi-agdal": { service: "taxi", location: "agdal" },
  "taxi-souissi": { service: "taxi", location: "souissi" },
};

function validateDimensionsMap(): void {
  for (const [id, d] of Object.entries(DIMENSIONS_BY_ID)) {
    assertSlugMatchesDimensions(id, d as SeoDimensions);
  }
}

validateDimensionsMap();

export const SEO_PAGE_SPECS: SeoPageSpec[] = SEO_SLUG_LIST.map((id) => ({
  id,
  dimensions: DIMENSIONS_BY_ID[id],
  indexed: true,
  relatedPageIds: computeRelatedPageIds(id),
  sitemap: inferSitemapConfig(id),
}));

export function getSpecById(id: SeoPageId): SeoPageSpec | undefined {
  return SEO_PAGE_SPECS.find((s) => s.id === id);
}
