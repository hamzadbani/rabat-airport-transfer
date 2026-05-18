import { SEO_PAGE_REGISTRY } from "./registry";
import {
  DEFAULT_SEO_LOCALE,
  type SeoLocale,
  type SeoPageId,
} from "./types";

/**
 * URL strategy:
 * - French (default): `/{slug}/` at site root — no `/fr` prefix.
 * - Future EN/AR: add `app/en/{slug}/page.tsx` (etc.) that calls the same
 *   `SeoLandingPage` with `locale="en"` once `messages/en.ts` exists.
 *   Paths are built by `getSeoPagePath(pageId, locale)` using `slugByLocale`.
 */

function slugFor(pageId: SeoPageId, locale: SeoLocale): string {
  const def = SEO_PAGE_REGISTRY[pageId];
  return def.slugByLocale[locale] ?? def.slugByLocale.fr;
}

/**
 * Pathname with trailing slash (matches `trailingSlash: true` in next.config).
 */
export function getSeoPagePath(pageId: SeoPageId, locale: SeoLocale): string {
  const slug = slugFor(pageId, locale);
  if (locale === DEFAULT_SEO_LOCALE) {
    return `/${slug}/`;
  }
  return `/${locale}/${slug}/`;
}

/**
 * Absolute URL for sitemap, canonical hints, and JSON-LD.
 */
export function getSeoPageUrl(
  siteUrl: string,
  pageId: SeoPageId,
  locale: SeoLocale,
): string {
  const base = siteUrl.replace(/\/$/, "");
  const path = getSeoPagePath(pageId, locale).replace(/^\//, "");
  return `${base}/${path}`;
}

/**
 * When EN/AR pages exist, return alternate URLs for hreflang (same pageId).
 */
export function getSeoPageAlternateLanguages(
  siteUrl: string,
  pageId: SeoPageId,
  /** Locales that have published pages for this `pageId`. */
  publishedLocales: SeoLocale[],
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of publishedLocales) {
    const tag = loc === DEFAULT_SEO_LOCALE ? "fr" : loc;
    languages[tag] = getSeoPageUrl(siteUrl, pageId, loc);
  }
  if (languages.fr) {
    languages["x-default"] = languages.fr;
  }
  return languages;
}

/** Primary nav subset for the SEO shell (order = display order). */
export const SEO_SHELL_NAV_PAGE_IDS: SeoPageId[] = [
  "taxi-rabat",
  "taxi-sale",
  "taxi-rabat-aeroport",
  "taxi-sale-aeroport",
  "transfert-rabat-aeroport",
  "rabat-casablanca-taxi",
  "taxi-rabat-prix",
  "chauffeur-prive-rabat",
];
