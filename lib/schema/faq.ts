import type { FaqItemInput, SchemaNode } from "./types";

export function generateFAQSchema(
  items: FaqItemInput[],
  pageUrl: string,
): SchemaNode {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
