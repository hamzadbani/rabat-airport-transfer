import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { SeoPageId } from "../types";
import type { SeoAiCacheFile, SeoPageDbRow } from "../seo-db-types";

const CACHE_REL = join("data", "seo-ai-cache.json");

let memo: SeoAiCacheFile | null | undefined;

/**
 * Load AI-generated copy **once per Node process** (typically `next build`).
 * File is optional; never read on the browser bundle.
 */
export function loadSeoAiCache(): SeoAiCacheFile | null {
  if (memo !== undefined) return memo;
  if (typeof process === "undefined" || !process.cwd) {
    memo = null;
    return null;
  }
  const abs = join(process.cwd(), CACHE_REL);
  if (!existsSync(abs)) {
    memo = null;
    return null;
  }
  try {
    const raw = readFileSync(abs, "utf8");
    memo = JSON.parse(raw) as SeoAiCacheFile;
    return memo;
  } catch {
    memo = null;
    return null;
  }
}

export function getAiRowForSlug(slug: SeoPageId): SeoPageDbRow | null {
  const table = loadSeoAiCache();
  if (!table) return null;
  const row = table[slug];
  return row ?? null;
}
