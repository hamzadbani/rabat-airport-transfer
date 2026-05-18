import type { SchemaNode } from "./types";

/** Marks concise answer blocks for voice / AI extraction (Speakable spec). */
export function generateSpeakableSchema(
  pageUrl: string,
  cssSelectors: string[],
): SchemaNode {
  return {
    "@type": "WebPage",
    "@id": `${pageUrl}#speakable`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}
