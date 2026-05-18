import type { BreadcrumbItemInput, SchemaNode } from "./types";

export function generateBreadcrumbSchema(
  items: BreadcrumbItemInput[],
  pageUrl: string,
): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
