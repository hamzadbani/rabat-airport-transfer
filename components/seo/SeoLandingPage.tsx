import Link from "next/link";
import {
  AIAnswerBlock,
  AirportTransferInfo,
  FAQSection,
  GeoEntitySection,
  PricingExplainer,
  RouteComparison,
  ServiceCoverage,
  SpeakableContent,
  TrustSignals,
} from "@/components/geo";
import { generateGeoOptimizedContent } from "@/lib/geo";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessAndTaxiServiceGraph,
  generateSpeakableSchema,
  generateTaxiRouteSchema,
  LOCAL_BUSINESS_ID,
  TAXI_SERVICE_ID,
} from "@/lib/schema";
import { SEO_PAGE_REGISTRY } from "@/lib/seo/registry";
import {
  SEO_BUSINESS_PHONE_DISPLAY,
  SEO_BUSINESS_PHONE_TEL,
  seoWhatsAppHref,
} from "@/lib/seo/contact";
import { getSeoPageCopy } from "@/lib/seo/messages";
import { SITE_URL } from "@/lib/seo/site";
import { getSeoPagePath, getSeoPageUrl } from "@/lib/seo/routing";
import { getRouteFactForPage } from "@/lib/seo/route-for-page";
import type { SeoLocale, SeoPageId } from "@/lib/seo/types";
import { SeoRouteFacts } from "./SeoRouteFacts";
import { SeoShell } from "./SeoShell";
import { StickyBookingCta } from "./StickyBookingCta";

type SeoLandingPageProps = {
  pageId: SeoPageId;
  locale: SeoLocale;
};

function buildJsonLd(pageId: SeoPageId, locale: SeoLocale) {
  const copy = getSeoPageCopy(pageId, locale);
  const pageUrl = getSeoPageUrl(SITE_URL, pageId, locale);
  const homeUrl = `${SITE_URL.replace(/\/$/, "")}/`;
  const schemaLocale = locale === "en" || locale === "ar" ? locale : "fr";
  const routeFact = getRouteFactForPage(pageId);
  const geo = generateGeoOptimizedContent(pageId, copy);

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: copy.meta.title,
    description: copy.meta.description,
    keywords: copy.meta.keywords.join(", "),
    inLanguage: locale === "fr" ? "fr-MA" : locale,
    isPartOf: {
      "@type": "WebSite",
      url: homeUrl,
      name: "Rabat Transfert Aéroport",
    },
    provider: { "@id": LOCAL_BUSINESS_ID },
    about: { "@id": TAXI_SERVICE_ID },
  };

  const graph: unknown[] = [
    ...generateLocalBusinessAndTaxiServiceGraph(schemaLocale),
    webPage,
    generateBreadcrumbSchema(
      [
        { name: "Accueil", item: homeUrl },
        { name: copy.h1, item: pageUrl },
      ],
      pageUrl,
    ),
    generateFAQSchema(geo.peopleAlsoAsk, pageUrl),
    generateSpeakableSchema(pageUrl, [
      "[data-speakable='ai-answer']",
      "[data-speakable='summary']",
    ]),
  ];

  if (routeFact) {
    const routeNodes = generateTaxiRouteSchema({
      fromCity: routeFact.fromCity,
      toCity: routeFact.toCity,
      distanceKm: routeFact.distanceKm,
      priceEstimatedMAD: routeFact.priceEstimatedMAD,
      pageUrl,
    });
    const svcId = `${pageUrl}#route-service`;
    webPage.mainEntity = { "@id": svcId };
    graph.push(...routeNodes);
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function SeoLandingPage({ pageId, locale }: SeoLandingPageProps) {
  const copy = getSeoPageCopy(pageId, locale);
  const related = SEO_PAGE_REGISTRY[pageId].relatedPageIds;
  const jsonLd = buildJsonLd(pageId, locale);
  const geo = generateGeoOptimizedContent(pageId, copy);
  const routeFact = getRouteFactForPage(pageId);
  const showAirport =
    pageId.includes("aeroport") ||
    pageId.includes("rba") ||
    pageId.includes("navette");
  const wa = seoWhatsAppHref(
    `Bonjour Rabat Transfert, demande concernant : ${copy.h1}. Merci de me confirmer disponibilité et tarif.`,
  );

  return (
    <SeoShell locale={locale} activePageId={pageId}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpeakableContent summary={geo.summary} />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
          Rabat Transfert · Taxi Rabat & Aéroport RBA
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {copy.h1}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{copy.heroSubtitle}</p>

        <TrustSignals bullets={copy.trustBullets} />
        <AIAnswerBlock answer={geo.aiAnswer} className="mt-8" />
        <SeoRouteFacts pageId={pageId} />
        {routeFact ? (
          <div className="mt-8">
            <PricingExplainer priceFromMad={routeFact.priceEstimatedMAD} />
          </div>
        ) : null}
        {showAirport && <AirportTransferInfo />}
        <GeoEntitySection entities={geo.entities} />
        <ServiceCoverage />

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
          >
            WhatsApp — devis rapide
          </a>
          <a
            href={SEO_BUSINESS_PHONE_TEL}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Appeler {SEO_BUSINESS_PHONE_DISPLAY}
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
          >
            Réserver en ligne
          </Link>
        </div>

        <div className="prose prose-slate mt-12 max-w-none">
          {copy.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="text-xl font-bold text-slate-900">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-slate-600">
                  {p}
                </p>
              ))}
            </section>
          ))}
          {copy.aiBodyHtml ? (
            <section
              className="mb-10 border-t border-slate-200 pt-10"
              aria-label="Contenu détaillé"
            >
              <div
                className="seo-ai-html text-slate-700 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: copy.aiBodyHtml }}
              />
            </section>
          ) : null}
        </div>

        <RouteComparison />
        <FAQSection items={copy.faq} />
        <FAQSection items={geo.peopleAlsoAsk} variant="paa" />

        <section className="mt-14">
          <h2 className="text-lg font-bold text-slate-900">
            {copy.relatedSectionTitle}
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {related.map((id) => {
              const rc = getSeoPageCopy(id, locale);
              return (
                <li key={id}>
                  <Link
                    href={getSeoPagePath(id, locale)}
                    className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-teal-800 shadow-sm hover:border-teal-200 hover:bg-teal-50"
                  >
                    {rc.h1}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </article>
      <StickyBookingCta />
    </SeoShell>
  );
}
