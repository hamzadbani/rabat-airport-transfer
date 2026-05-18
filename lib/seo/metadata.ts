import type { Metadata } from "next";
import {
  generateSeoPageMetadata,
  type GenerateMetadataInput,
} from "@/lib/metadata";
import type { SeoLocale, SeoPageId } from "./types";

export type { GenerateMetadataInput };

export function publishedLocalesForSeoPage(_pageId: SeoPageId): SeoLocale[] {
  return ["fr"];
}

/** @deprecated Use `generateSeoPageMetadata` from `@/lib/metadata`. */
export function buildSeoPageMetadata(
  pageId: SeoPageId,
  locale: SeoLocale,
): Metadata {
  return generateSeoPageMetadata(pageId, locale);
}

export { generateSeoPageMetadata };
