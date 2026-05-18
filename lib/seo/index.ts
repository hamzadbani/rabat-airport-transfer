export { SITE_URL } from "./site";
export {
  DEFAULT_SEO_LOCALE,
  NON_DEFAULT_SEO_LOCALES,
  SEO_PAGE_IDS,
  type SeoLocale,
  type SeoPageId,
} from "./types";
export { SEO_SLUG_LIST, type SeoSlug } from "./slug-catalog";
export {
  SEO_PAGE_REGISTRY,
  getDimensionsForPage,
  getSeoPageIdByFrSlug,
  listFrSeoSlugs,
  listIndexedFrSeoSlugs,
  listSeoPageIds,
} from "./registry";
export { SEO_PAGE_SPECS, type SeoPageSpec } from "./page-specs";
export type { SeoDimensions, SeoIntent, SeoLocation, SeoService } from "./dimensions";
export { slugFromDimensions } from "./slug-formula";
export { buildFrenchSeoAiPrompt } from "./ai-prompt-template";
export { SEO_ROUTE_LEGS, estimatePriceMad } from "./routes-data";
export { getRouteFactForPage } from "./route-for-page";
export type { SeoPageDbRow, SeoAiCacheFile } from "./seo-db-types";
export {
  getSeoPagePath,
  getSeoPageUrl,
  getSeoPageAlternateLanguages,
  SEO_SHELL_NAV_PAGE_IDS,
} from "./routing";
export { getSeoPageCopy } from "./messages";
export {
  buildSeoPageMetadata,
  publishedLocalesForSeoPage,
} from "./metadata";
