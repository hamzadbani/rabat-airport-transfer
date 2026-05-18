import Link from "next/link";
import { getHomeAiAnswer, getHomeFaq } from "@/lib/home-faq";
import {
  SEO_SHELL_NAV_PAGE_IDS,
  getSeoPagePath,
} from "@/lib/seo/routing";
import { getSeoPageCopy } from "@/lib/seo/messages";
import {
  seoWhatsAppHref,
  SEO_BUSINESS_PHONE_DISPLAY,
  SEO_BUSINESS_PHONE_TEL,
} from "@/lib/seo/contact";
import type { SeoLocale } from "@/lib/seo/types";

type Props = { locale: SeoLocale };

const HIGHLIGHTS = [
  { pageId: "taxi-rabat" as const, label: "Taxi Rabat" },
  { pageId: "taxi-rabat-aeroport" as const, label: "Taxi Rabat Aéroport" },
  { pageId: "rabat-casablanca-taxi" as const, label: "Rabat ↔ Casablanca" },
  { pageId: "taxi-rabat-prix" as const, label: "Prix taxi Rabat" },
];

const HERO: Record<
  SeoLocale,
  { h1: string; lead: string; faqTitle: string; aiLead: string }
> = {
  fr: {
    h1: "Taxi Rabat Aéroport — Transfert Rabat-Salé (RBA) 24/7",
    lead: "Chauffeur privé Rabat, tarif annoncé avant départ. Transferts aéroport RBA, Rabat ↔ Casablanca et liaisons au Maroc.",
    faqTitle: "Taxi Rabat aéroport — réponses utiles",
    aiLead: "En bref",
  },
  en: {
    h1: "Rabat Airport Taxi — Rabat-Salé (RBA) Transfer 24/7",
    lead: "Private chauffeur in Rabat with quoted fare before pickup. RBA airport transfers, Rabat ↔ Casablanca and Morocco routes.",
    faqTitle: "Rabat airport taxi — quick answers",
    aiLead: "In short",
  },
  ar: {
    h1: "تاكسي مطار الرباط — نقل الرباط-سلا (RBA) 24/7",
    lead: "سائق خاص في الرباط بسعر معلن قبل الانطلاق. نقل مطار RBA والرباط ↔ الدار البيضاء ومسارات في المغرب.",
    faqTitle: "تاكسي مطار الرباط — إجابات سريعة",
    aiLead: "باختصار",
  },
};

export function HomeLanding({ locale }: Props) {
  const hero = HERO[locale];
  const faq = getHomeFaq(locale);
  const aiAnswer = getHomeAiAnswer(locale);
  const wa = seoWhatsAppHref(
    locale === "en"
      ? "Hello Rabat Transfert, I would like to book a transfer."
      : locale === "ar"
        ? "مرحباً Rabat Transfert، أود حجز نقل."
        : "Bonjour Rabat Transfert, je souhaite réserver un transfert.",
  );

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-bold text-teal-800">
            Rabat Transfert
          </Link>
          <nav className="hidden gap-4 text-sm font-medium text-slate-600 md:flex">
            {SEO_SHELL_NAV_PAGE_IDS.slice(0, 5).map((id) => (
              <Link
                key={id}
                href={getSeoPagePath(id, locale)}
                className="hover:text-teal-800"
              >
                {getSeoPageCopy(id, locale).h1.split("—")[0]?.trim()}
              </Link>
            ))}
            <Link href="/blog/" className="hover:text-teal-800">
              Blog
            </Link>
          </nav>
          <a
            href={wa}
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section
          id="accueil"
          className="bg-gradient-to-b from-teal-50 to-white px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {hero.h1}
            </h1>
            <p className="mt-6 text-lg text-slate-600">{hero.lead}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={wa}
                className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow"
              >
                Réserver WhatsApp
              </a>
              <a
                href={SEO_BUSINESS_PHONE_TEL}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900"
              >
                {SEO_BUSINESS_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Services taxi & transferts
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map(({ pageId, label }) => (
              <li key={pageId}>
                <Link
                  href={getSeoPagePath(pageId, locale)}
                  className="block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300 hover:shadow-md"
                >
                  <span className="font-semibold text-teal-900">{label}</span>
                  <p className="mt-2 text-sm text-slate-600">
                    {getSeoPageCopy(pageId, locale).heroSubtitle.slice(0, 120)}…
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">{hero.faqTitle}</h2>
          <div id="ai-answer" className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="font-semibold text-slate-900">{hero.aiLead}</p>
            <p className="mt-2 text-slate-600">{aiAnswer}</p>
          </div>
          <dl className="mt-8 space-y-6">
            {faq.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-1 text-slate-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id="contact"
          className="border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6"
        >
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-slate-900">Contact & réservation</h2>
            <p className="mt-4 text-slate-600">
              Indiquez date, heure, adresses et nombre de passagers. Réponse rapide
              par WhatsApp ou téléphone.
            </p>
            <a
              href={wa}
              className="mt-6 inline-block rounded-full bg-teal-700 px-8 py-3 font-semibold text-white"
            >
              Ouvrir WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Rabat Transfert Aéroport · taxi rabat ·
        transport aéroport rabat
      </footer>
    </div>
  );
}
