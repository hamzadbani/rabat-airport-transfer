# SEO + GEO + SGE Architecture

Production SEO system for **https://taxirabatairoport.com/** (Next.js App Router, static export).

## Folder layout

| Path | Role |
|------|------|
| `lib/seo/` | Slug catalog, registry, copy, routing, route facts |
| `lib/schema/` | JSON-LD generators (LocalBusiness, FAQ, Offer, …) |
| `lib/geo/` | Entity map + `generateGeoOptimizedContent()` |
| `lib/metadata/` | Central `generateMetadata()` / `generateSeoPageMetadata()` |
| `lib/sitemap/` | `buildFullSitemap()` for `app/sitemap.ts` |
| `components/geo/` | AIAnswerBlock, FAQSection, TrustSignals, … |
| `components/seo/` | SeoLandingPage, SeoShell, StickyBookingCta |
| `app/[slug]/` | 56+ programmatic FR landing pages (SSG) |
| `app/blog/` | Article hub + FAQ/Article schema |
| `data/seo-ai-cache.json` | Optional offline AI HTML (see `.example`) |

## Add a new SEO page

1. Add slug to `lib/seo/slug-catalog.ts`
2. Optional: `dimensions` in `lib/seo/page-specs.ts`
3. Copy template in `lib/seo/programmatic-fr.ts` or hand override in `lib/seo/messages/fr.ts`
4. `npm run build` — page, sitemap, and metadata are generated automatically

## AI / SGE content

- Never generate HTML on HTTP requests.
- Run offline prompts (`lib/seo/ai-prompt-template.ts`), store in `data/seo-ai-cache.json`, rebuild.
- On-page: `AIAnswerBlock`, People Also Ask (`FAQSection variant="paa"`), `SpeakableContent`.

## Deploy

- `output: "export"` → `out/`
- CI uploads `out/` to Hostinger (see `.github/workflows/deploy-hostinger.yml`)
- Set `NEXT_PUBLIC_SITE_URL=https://taxirabatairoport.com` in CI

## Target queries (Search Console)

Optimized for: `taxi rabat`, `rabat taxi`, `transport aeroport rabat`, `taxi rabat prix`, `taxi in rabat`.
