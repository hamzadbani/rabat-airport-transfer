import type { SeoDimensions } from "./dimensions";

/**
 * Clean URL: `{service}-{location}` or `{service}-{location}-{intent}`.
 * Examples: taxi-rabat, taxi-rabat-aeroport, taxi-hay-riad, transfert-rabat-casablanca
 */
export function slugFromDimensions(d: SeoDimensions): string {
  const parts = [d.service, d.location];
  if (d.intent) {
    parts.push(d.intent);
  }
  return parts.join("-");
}

export function assertSlugMatchesDimensions(
  pageId: string,
  dimensions: SeoDimensions,
): void {
  const built = slugFromDimensions(dimensions);
  if (built !== pageId) {
    throw new Error(
      `SEO slug mismatch: pageId "${pageId}" !== slugFromDimensions(${JSON.stringify(dimensions)}) => "${built}"`,
    );
  }
}
