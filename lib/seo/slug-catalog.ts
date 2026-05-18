/**
 * Canonical programmatic SEO slugs (FR = URL = id).
 * Part 1: user list (39) + Part 2: high-intent intercity / utility (11) = 50.
 */
export const SEO_SLUG_LIST = [
  // —— Core Rabat / Salé ——
  "taxi-rabat",
  "taxi-sale",
  "taxi-rabat-aeroport",
  "taxi-sale-aeroport",
  "transfert-rabat-aeroport",
  "transfert-sale-aeroport",
  "taxi-rabat-prix",
  "taxi-sale-prix",
  "chauffeur-prive-rabat",
  "chauffeur-prive-sale",
  // —— Zones Rabat ——
  "taxi-hay-riad",
  "taxi-agdal",
  "taxi-souissi",
  "taxi-yaacoub-el-mansour",
  "taxi-hassan-rabat",
  "taxi-ocean-rabat",
  "taxi-akkari",
  "taxi-takkadoum",
  // —— Airport / routes (money) ——
  "rabat-casablanca-taxi",
  "casablanca-rabat-taxi",
  "taxi-rabat-casa-prix",
  "taxi-rabat-marrakech",
  "taxi-rabat-tanger",
  "taxi-aeroport-rabat-centre",
  // —— Long-tail conversion ——
  "reserver-taxi-rabat",
  "taxi-rabat-24-7",
  "taxi-rabat-nuit",
  "taxi-rabat-whatsapp",
  "taxi-rabat-rapide",
  "taxi-rabat-fiable",
  "taxi-rabat-pas-cher",
  // —— Salé GEO ——
  "taxi-sale-medina",
  "taxi-sale-tabriquet",
  "taxi-sale-hay-salam",
  "taxi-sale-bettana",
  // —— Premium ——
  "taxi-luxe-rabat",
  "chauffeur-prive-aeroport-rabat",
  "transfert-vip-rabat",
  "taxi-avec-chauffeur-rabat",
  // —— Extended intercity / utility (11) ——
  "taxi-rabat-fes",
  "taxi-rabat-meknes",
  "taxi-rabat-kenitra",
  "taxi-rabat-temara",
  "taxi-rabat-mohammedia",
  "taxi-rabat-skhirat",
  "taxi-rabat-gare",
  "taxi-rabat-entreprise",
  "navette-aeroport-rabat",
  "taxi-rabat-evenement",
  "taxi-rabat-seminaire",
  // —— High-intent URL aliases (Search Console + conversational queries) ——
  "transfert-rabat-casablanca",
  "taxi-rabat-casablanca",
  "taxi-aeroport-rabat",
  "taxi-prix-rabat",
  "taxi-rabat-gare-agdal",
  "taxi-rabat-hotel-sofitel",
] as const;

export type SeoSlug = (typeof SEO_SLUG_LIST)[number];

export function isSeoSlug(s: string): s is SeoSlug {
  return (SEO_SLUG_LIST as readonly string[]).includes(s);
}
