import type { SeoPageId } from "./types";

const RABAT_HUB: SeoPageId[] = [
  "taxi-rabat",
  "taxi-rabat-aeroport",
  "taxi-rabat-prix",
  "rabat-casablanca-taxi",
];

const SALE_HUB: SeoPageId[] = [
  "taxi-sale",
  "taxi-sale-aeroport",
  "taxi-sale-prix",
];

function pushUnique(out: SeoPageId[], id: SeoPageId, self: SeoPageId) {
  if (id === self || out.includes(id)) return;
  out.push(id);
}

/** Contextual internal links (max 6) — tuned for silos Rabat / Salé / money. */
export function computeRelatedPageIds(self: SeoPageId): SeoPageId[] {
  const out: SeoPageId[] = [];
  const isSaleFocus =
    self.startsWith("taxi-sale") ||
    self.startsWith("transfert-sale") ||
    self.startsWith("chauffeur-prive-sale");

  if (isSaleFocus) {
    for (const id of SALE_HUB) pushUnique(out, id, self);
    pushUnique(out, "taxi-rabat", self);
    pushUnique(out, "taxi-rabat-aeroport", self);
    pushUnique(out, "transfert-sale-aeroport", self);
  } else {
    for (const id of RABAT_HUB) pushUnique(out, id, self);
    pushUnique(out, "taxi-sale", self);
    pushUnique(out, "taxi-sale-aeroport", self);
  }

  if (
    self.startsWith("chauffeur") ||
    self.includes("vip") ||
    self.includes("luxe") ||
    self === "taxi-avec-chauffeur-rabat"
  ) {
    pushUnique(out, "chauffeur-prive-rabat", self);
  }

  if (self.includes("aeroport") || self.includes("navette")) {
    pushUnique(out, "transfert-rabat-aeroport", self);
  }

  if (
    self.includes("marrakech") ||
    self.includes("tanger") ||
    self.includes("fes") ||
    self.includes("meknes") ||
    self.includes("kenitra") ||
    self.includes("temara") ||
    self.includes("skhirat") ||
    self.includes("mohammedia")
  ) {
    pushUnique(out, "rabat-casablanca-taxi", self);
  }

  if (self === "taxi-rabat-pas-cher" || self === "taxi-rabat-casa-prix") {
    pushUnique(out, "taxi-rabat-prix", self);
  }

  return out.slice(0, 6);
}
