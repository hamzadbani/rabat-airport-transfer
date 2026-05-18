import type { SeoLocale, SeoPageId } from "../types";
import { DEFAULT_SEO_LOCALE } from "../types";
import type { SeoPageDbRow } from "../seo-db-types";
import { buildProgrammaticFrCopy } from "../programmatic-fr";
import type { SeoPageMessages } from "./types";
import { getAiRowForSlug } from "./ai-cache";
import { frHandOverrides } from "./fr";

const TOP_QUERY_KEYWORDS = {
  rabat: [
    "taxi rabat",
    "taxi privé rabat",
    "transport privé rabat",
    "chauffeur privé rabat",
    "taxi rabat aeroport",
    "transfert aeroport rabat",
    "prix taxi rabat",
    "tarif taxi rabat",
    "reservation taxi rabat",
    "taxi rabat 24h",
  ],
  sale: [
    "taxi salé",
    "taxi privé salé",
    "transport privé salé",
    "chauffeur privé salé",
    "taxi salé aéroport",
    "transfert aeroport salé",
    "prix taxi salé",
    "tarif taxi salé",
    "reservation taxi salé",
    "taxi sale rabat",
  ],
} as const;

function parseFaqJson(
  raw: SeoPageDbRow["faq_json"],
): SeoPageMessages["faq"] | null {
  if (!raw) return null;
  try {
    const data =
      typeof raw === "string" ? (JSON.parse(raw) as unknown) : raw;
    if (!Array.isArray(data) || data.length < 2) return null;
    return data as SeoPageMessages["faq"];
  } catch {
    return null;
  }
}

function mergeAiCache(base: SeoPageMessages, pageId: SeoPageId): SeoPageMessages {
  const row = getAiRowForSlug(pageId);
  if (!row) return base;
  const parsedFaq = parseFaqJson(row.faq_json);
  const faq = parsedFaq ?? base.faq;
  return {
    ...base,
    faq,
    ...(row.content && row.content.trim()
      ? { aiBodyHtml: row.content.trim() }
      : {}),
  };
}

function withKeywordFallback(copy: SeoPageMessages, pageId: SeoPageId): SeoPageMessages {
  const phrase = pageId.replace(/-/g, " ");
  const isSale = /\bsale\b/.test(phrase);
  const city = isSale ? "salé" : "rabat";
  const topQueries = isSale ? TOP_QUERY_KEYWORDS.sale : TOP_QUERY_KEYWORDS.rabat;
  const service = /aeroport|rba/.test(phrase)
    ? `transfert ${city} aeroport`
    : `taxi ${city} 24h`;

  const baseKeywords = copy.meta.keywords.filter((k) => k.trim().length > 0);
  const normalized = Array.from(
    new Set([...baseKeywords, phrase, ...topQueries, service]),
  );

  return {
    ...copy,
    meta: {
      ...copy.meta,
      keywords: normalized,
    },
  };
}

/**
 * Merge order: hand FR overrides → programmatic templates → optional AI cache
 * (`data/seo-ai-cache.json`, generated offline / Laravel queue).
 */
export function getSeoPageCopy(
  pageId: SeoPageId,
  locale: SeoLocale,
): SeoPageMessages {
  const base =
    locale !== DEFAULT_SEO_LOCALE
      ? (frHandOverrides[pageId] ?? buildProgrammaticFrCopy(pageId))
      : (frHandOverrides[pageId] ?? buildProgrammaticFrCopy(pageId));
  if (locale !== DEFAULT_SEO_LOCALE) {
    return withKeywordFallback(base, pageId);
  }
  return withKeywordFallback(mergeAiCache(base, pageId), pageId);
}
