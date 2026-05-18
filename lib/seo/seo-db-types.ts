import type { SeoFaqItem } from "./messages/types";

/**
 * Laravel `seo_pages` row shape — keep Next cache JSON aligned for future import.
 */
export type SeoPageDbRow = {
  slug: string;
  service: string | null;
  city: string | null;
  zone: string | null;
  modifier: string | null;
  /** Full HTML body from AI job (trusted, server-side only). */
  content: string | null;
  ai_generated: boolean;
  last_generated_at: string | null;
  /** Array or JSON string (Laravel column). */
  faq_json: SeoFaqItem[] | string | null;
};

/** Optional build-time merge file: `data/seo-ai-cache.json` */
export type SeoAiCacheFile = Record<string, SeoPageDbRow>;
