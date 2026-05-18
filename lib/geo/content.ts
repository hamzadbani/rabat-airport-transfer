import type { SeoPageMessages } from "@/lib/seo/messages/types";
import { getEntitiesForPage } from "./entities";

export type GeoOptimizedBlock = {
  /** Short direct answer for AI Overview / SGE (40–80 words). */
  aiAnswer: string;
  /** One-line summary for featured snippets. */
  summary: string;
  entities: ReturnType<typeof getEntitiesForPage>;
  peopleAlsoAsk: Array<{ question: string; answer: string }>;
};

/** Builds GEO/SGE-friendly content blocks from page copy + slug entities. */
export function generateGeoOptimizedContent(
  pageId: string,
  copy: SeoPageMessages,
): GeoOptimizedBlock {
  const entities = getEntitiesForPage(pageId);
  const entityNames = entities.map((e) => e.name).join(", ");
  const firstSection = copy.sections[0];
  const summary =
    copy.heroSubtitle.length > 160
      ? `${copy.heroSubtitle.slice(0, 157)}…`
      : copy.heroSubtitle;

  const aiAnswer = [
    copy.h1,
    copy.heroSubtitle,
    firstSection
      ? `${firstSection.heading}: ${firstSection.paragraphs[0] ?? ""}`
      : "",
    `Zones couvertes : ${entityNames}. Réservation par WhatsApp ou téléphone, tarif confirmé avant départ.`,
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 600);

  const peopleAlsoAsk =
    copy.faq.length >= 3
      ? copy.faq
      : [
          ...copy.faq,
          {
            question: "Quel est le meilleur taxi à Rabat pour l'aéroport ?",
            answer:
              "Un taxi privé avec prix annoncé avant prise en charge, ponctualité au terminal RBA et contact direct WhatsApp est le choix le plus fiable pour les vols.",
          },
          {
            question: "Combien coûte un taxi Rabat aéroport ?",
            answer:
              "Le tarif dépend du quartier de départ ou d'arrivée. Une estimation indicative est affichée sur la page ; le montant définitif est confirmé à la réservation.",
          },
        ].slice(0, 5);

  return { aiAnswer, summary, entities, peopleAlsoAsk };
}
