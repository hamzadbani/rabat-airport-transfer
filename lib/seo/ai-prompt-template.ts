/**
 * Copy this prompt into your Laravel job / queue worker / OpenAI call.
 * **Never** generate HTML on HTTP request — write once, cache in DB (`seo_pages`),
 * or merge `data/seo-ai-cache.json` at `next build`.
 */
export function buildFrenchSeoAiPrompt(input: {
  service: string;
  location: string;
  modifier: string | null;
}): string {
  const mod = input.modifier?.trim() || "— (aucun modificateur)";
  return `Generate a unique SEO page in French for a taxi service.

Context:
- Service: ${input.service}
- Location: ${input.location}
- Modifier: ${mod}

Constraints:
- 400–700 words
- Natural, human tone (not robotic)
- Mention real areas in Rabat (Agdal, Hay Riad, Souissi)
- Include trust elements (24/7, ponctualité, sécurité)
- Include 1 FAQ section
- Avoid repetition with other pages

Structure:
- Intro
- H2: Service overview
- H2: Why choose us
- H2: Pricing / airport info (if relevant)
- FAQ (3 questions)

Output HTML only.`;
}
