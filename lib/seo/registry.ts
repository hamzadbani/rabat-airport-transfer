import { SEO_PAGE_SPECS } from "./page-specs";
import type { SeoDimensions } from "./dimensions";
import type { SeoPageDefinition, SeoPageId } from "./types";

/**
 * Built from `SEO_PAGE_SPECS` (Laravel `seo_pages` equivalent in TypeScript).
 * To add a page: append a spec (+ FR copy), keep slug = `slugFromDimensions(dimensions)`.
 */
export const SEO_PAGE_REGISTRY: Record<SeoPageId, SeoPageDefinition> =
  Object.fromEntries(
    SEO_PAGE_SPECS.map((s) => {
      const def: SeoPageDefinition = {
        id: s.id,
        indexed: s.indexed,
        slugByLocale: { fr: s.id },
        relatedPageIds: s.relatedPageIds,
        sitemap: s.sitemap,
      };
      return [s.id, def];
    }),
  ) as Record<SeoPageId, SeoPageDefinition>;

export function listSeoPageIds(): SeoPageId[] {
  return SEO_PAGE_SPECS.map((s) => s.id);
}

/** Slugs pre-rendered & sitemap-listed (`indexed: true` only). */
export function listIndexedFrSeoSlugs(): string[] {
  return SEO_PAGE_SPECS.filter((s) => s.indexed).map((s) => s.id);
}

/** Alias: today all specs are indexed; use `listIndexedFrSeoSlugs` if you add drafts. */
export function listFrSeoSlugs(): string[] {
  return listIndexedFrSeoSlugs();
}

export function getSeoPageIdByFrSlug(slug: string): SeoPageId | null {
  for (const s of SEO_PAGE_SPECS) {
    if (s.id === slug && s.indexed) {
      return s.id;
    }
  }
  return null;
}

export function getDimensionsForPage(id: SeoPageId): SeoDimensions | null {
  const spec = SEO_PAGE_SPECS.find((s) => s.id === id);
  if (!spec) {
    throw new Error(`Unknown SEO page: ${id}`);
  }
  return spec.dimensions ?? null;
}
