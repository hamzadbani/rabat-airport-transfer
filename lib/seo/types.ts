import { SEO_SLUG_LIST } from "./slug-catalog";

/** Locales with dedicated URL prefixes when not default. */
export type SeoLocale = "fr" | "en" | "ar";

/** Default locale: French at root (no `/fr` prefix). */
export const DEFAULT_SEO_LOCALE: SeoLocale = "fr";

/** Locales that will use `/en/...`, `/ar/...` later; French stays unprefixed. */
export const NON_DEFAULT_SEO_LOCALES: SeoLocale[] = ["en", "ar"];

/** Single source of URL ids (= FR slugs). See `slug-catalog.ts`. */
export const SEO_PAGE_IDS = SEO_SLUG_LIST;

export type SeoPageId = (typeof SEO_SLUG_LIST)[number];

export type SeoSitemapConfig = {
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

export type SeoPageDefinition = {
  id: SeoPageId;
  indexed: boolean;
  slugByLocale: Partial<Record<SeoLocale, string>> & { fr: string };
  relatedPageIds: SeoPageId[];
  sitemap: SeoSitemapConfig;
};
