import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/site";
import {
  getSeoPageAlternateLanguages,
  getSeoPagePath,
  getSeoPageUrl,
} from "@/lib/seo/routing";
import { getSeoPageCopy } from "@/lib/seo/messages";
import { publishedLocalesForSeoPage } from "@/lib/seo/metadata";
import type { SeoLocale, SeoPageId } from "@/lib/seo/types";

const SITE_NAME = "Rabat Transfert Aéroport";
const DEFAULT_OG_IMAGE = "/assets/new-logo-taxi-rabat-removebg-preview.png";

export type GenerateMetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
  locale?: SeoLocale;
  pageId?: SeoPageId;
  ogType?: "website" | "article";
  noindex?: boolean;
};

const LOCALE_MAP: Record<SeoLocale, string> = {
  fr: "fr_FR",
  en: "en_US",
  ar: "ar_MA",
};

/** Central metadata builder for all routes (SEO pages, blog, hubs). */
export function generateMetadata(input: GenerateMetadataInput): Metadata {
  const locale = input.locale ?? "fr";
  const languages =
    input.pageId != null
      ? getSeoPageAlternateLanguages(
          SITE_URL,
          input.pageId,
          publishedLocalesForSeoPage(input.pageId),
        )
      : undefined;

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: input.canonicalPath,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      type: input.ogType ?? "website",
      url: `${SITE_URL.replace(/\/$/, "")}${input.canonicalPath}`,
      title: input.title,
      description: input.description,
      locale: LOCALE_MAP[locale],
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: input.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    other: {
      "geo.region": "MA-04",
      "geo.placename": "Rabat",
      "geo.position": "34.0515;-6.7515",
      ICBM: "34.0515, -6.7515",
    },
  };
}

/** SEO programmatic landing metadata (wraps copy + hreflang). */
export function generateSeoPageMetadata(
  pageId: SeoPageId,
  locale: SeoLocale,
): Metadata {
  const copy = getSeoPageCopy(pageId, locale);
  return generateMetadata({
    title: copy.meta.title,
    description: copy.meta.description,
    keywords: copy.meta.keywords,
    canonicalPath: getSeoPagePath(pageId, locale),
    locale,
    pageId,
  });
}

export function generateHomeMetadata(locale: SeoLocale = "fr"): Metadata {
  const titles: Record<SeoLocale, string> = {
    fr: "Taxi Rabat Aéroport | Transfert RBA 24/7 — Prix Fixe",
    en: "Rabat Airport Taxi | RBA Transfer 24/7 — Fixed Quote",
    ar: "تاكسي مطار الرباط | نقل RBA 24/7 — سعر ثابت",
  };
  const descriptions: Record<SeoLocale, string> = {
    fr: "Taxi Rabat aéroport Rabat-Salé (RBA), chauffeur privé et transfert 24/7. Prix annoncé avant départ — Rabat, Salé, Casablanca. Réservation WhatsApp.",
    en: "Rabat-Salé Airport (RBA) taxi & private transfer 24/7. Quoted fare before pickup — Rabat, Salé, Casablanca. Book on WhatsApp.",
    ar: "تاكسي مطار الرباط-سلا (RBA) وسائق خاص 24/7. سعر معلن قبل الانطلاق — الرباط، سلا، الدار البيضاء. احجز عبر واتساب.",
  };
  const path = locale === "fr" ? "/" : `/${locale}/`;
  return generateMetadata({
    title: titles[locale],
    description: descriptions[locale],
    keywords: [
      "taxi rabat aéroport",
      "transfert aeroport rabat",
      "taxi rabat",
      "chauffeur privé rabat",
      "rabat airport transfer",
      "transport aeroport rabat",
      "taxi aeroport rabat prix fixe",
    ],
    canonicalPath: path,
    locale,
  });
}

export { getSeoPageUrl };
