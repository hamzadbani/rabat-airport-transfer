import type { SeoPageId } from "./types";
import type { SeoSitemapConfig } from "./types";

/** Priority / changefreq from slug intent (money pages first). */
export function inferSitemapConfig(id: SeoPageId): SeoSitemapConfig {
  if (
    id === "taxi-rabat-aeroport" ||
    id === "taxi-aeroport-rabat" ||
    id === "rabat-casablanca-taxi" ||
    id === "transfert-rabat-casablanca" ||
    id === "taxi-rabat-casablanca" ||
    id === "casablanca-rabat-taxi" ||
    id === "transfert-rabat-aeroport" ||
    id === "taxi-prix-rabat"
  ) {
    return { changeFrequency: "weekly", priority: 0.98 };
  }
  if (
    id === "taxi-rabat" ||
    id === "taxi-sale" ||
    id === "taxi-sale-aeroport" ||
    id === "transfert-sale-aeroport"
  ) {
    return { changeFrequency: "weekly", priority: 0.95 };
  }
  if (
    id === "taxi-rabat-prix" ||
    id === "taxi-sale-prix" ||
    id === "taxi-rabat-casa-prix" ||
    id === "chauffeur-prive-rabat" ||
    id === "chauffeur-prive-sale"
  ) {
    return { changeFrequency: "weekly", priority: 0.9 };
  }
  if (
    id.startsWith("reserver-") ||
    id.includes("whatsapp") ||
    id.includes("24-7") ||
    id.includes("nuit") ||
    id.includes("rapide") ||
    id.includes("fiable") ||
    id.includes("pas-cher")
  ) {
    return { changeFrequency: "monthly", priority: 0.78 };
  }
  if (
    id.includes("luxe") ||
    id.includes("vip") ||
    id.includes("chauffeur-prive-aeroport") ||
    id === "taxi-avec-chauffeur-rabat"
  ) {
    return { changeFrequency: "weekly", priority: 0.88 };
  }
  if (
    id === "taxi-rabat-marrakech" ||
    id === "taxi-rabat-tanger" ||
    id === "taxi-rabat-fes" ||
    id === "taxi-rabat-meknes" ||
    id === "taxi-rabat-kenitra"
  ) {
    return { changeFrequency: "monthly", priority: 0.85 };
  }
  return { changeFrequency: "monthly", priority: 0.8 };
}
