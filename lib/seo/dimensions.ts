/**
 * Core dimensions for programmatic SEO (strategy layer).
 * Expand locations / intents gradually — avoid shipping 100 thin pages at once.
 */
export type SeoService = "taxi" | "transfert" | "chauffeur-prive";

/** City or quartier slug segment (ASCII, hyphenated). */
export type SeoLocation =
  | "rabat"
  | "sale"
  | "hay-riad"
  | "agdal"
  | "souissi";

/**
 * Intent / modifier segment (last part of slug when present).
 * `casablanca` = liaison Rabat → Casablanca (intercity), not a “city” row.
 */
export type SeoIntent = "aeroport" | "prix" | "casablanca";

export type SeoDimensions = {
  service: SeoService;
  location: SeoLocation;
  /** Omit for “hub” pages (e.g. taxi-rabat, taxi-hay-riad). */
  intent?: SeoIntent;
};
