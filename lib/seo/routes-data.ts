/**
 * Static route facts for GEO + pricing blocks (replace with DB `routes` later).
 * Prices are **indicative** (marketing) — always confirm on WhatsApp.
 */
export type SeoRouteLeg = {
  id: string;
  fromCity: string;
  toCity: string;
  distanceKm: number;
  durationMin: number;
  /** Formula: base + distance * perKm (MAD), rounded. */
  baseMAD: number;
  perKmMAD: number;
};

export const SEO_ROUTE_LEGS: SeoRouteLeg[] = [
  {
    id: "rabat-centre-rba",
    fromCity: "Rabat centre",
    toCity: "Aéroport Rabat-Salé (RBA)",
    distanceKm: 12,
    durationMin: 22,
    baseMAD: 50,
    perKmMAD: 5,
  },
  {
    id: "hay-riad-rba",
    fromCity: "Hay Riad (Rabat)",
    toCity: "Aéroport Rabat-Salé (RBA)",
    distanceKm: 14,
    durationMin: 25,
    baseMAD: 50,
    perKmMAD: 5,
  },
  {
    id: "agdal-rba",
    fromCity: "Agdal (Rabat)",
    toCity: "Aéroport Rabat-Salé (RBA)",
    distanceKm: 13,
    durationMin: 24,
    baseMAD: 50,
    perKmMAD: 5,
  },
  {
    id: "souissi-rba",
    fromCity: "Souissi (Rabat)",
    toCity: "Aéroport Rabat-Salé (RBA)",
    distanceKm: 18,
    durationMin: 28,
    baseMAD: 50,
    perKmMAD: 5,
  },
  {
    id: "sale-rba",
    fromCity: "Salé (centre)",
    toCity: "Aéroport Rabat-Salé (RBA)",
    distanceKm: 10,
    durationMin: 18,
    baseMAD: 50,
    perKmMAD: 5,
  },
  {
    id: "rabat-casa-centre",
    fromCity: "Rabat",
    toCity: "Casablanca (centre-ville)",
    distanceKm: 88,
    durationMin: 75,
    baseMAD: 400,
    perKmMAD: 4,
  },
  {
    id: "rabat-cmn",
    fromCity: "Rabat",
    toCity: "Aéroport Mohammed V (CMN)",
    distanceKm: 105,
    durationMin: 95,
    baseMAD: 500,
    perKmMAD: 3,
  },
];

export function estimatePriceMad(leg: SeoRouteLeg): number {
  return Math.round(leg.baseMAD + leg.distanceKm * leg.perKmMAD);
}
