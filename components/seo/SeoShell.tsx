import Link from "next/link";
import { Menu } from "lucide-react";
import {
  SEO_SHELL_NAV_PAGE_IDS,
  getSeoPagePath,
} from "@/lib/seo/routing";
import {
  SEO_BUSINESS_PHONE_DISPLAY,
  SEO_BUSINESS_PHONE_TEL,
  seoWhatsAppHref,
} from "@/lib/seo/contact";
import { getSeoPageCopy } from "@/lib/seo/messages";
import type { SeoLocale, SeoPageId } from "@/lib/seo/types";
type SeoShellProps = {
  locale: SeoLocale;
  /** Current page (nav link can be styled as active). */
  activePageId?: SeoPageId;
  children: React.ReactNode;
};

export function SeoShell({ locale, activePageId, children }: SeoShellProps) {
  const wa = seoWhatsAppHref(
    "Bonjour Rabat Transfert, je souhaite des infos / une réservation.",
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-slate-900"
          >
            Rabat Transfert
          </Link>
          <nav
            className="hidden flex-wrap items-center justify-end gap-1 text-sm font-medium text-slate-600 lg:flex"
            aria-label="Services taxi"
          >
            {SEO_SHELL_NAV_PAGE_IDS.map((id) => {
              const copy = getSeoPageCopy(id, locale);
              const href = getSeoPagePath(id, locale);
              const active = id === activePageId;
              return (
                <Link
                  key={id}
                  href={href}
                  className={`rounded-md px-2 py-1 transition-colors hover:bg-slate-100 hover:text-slate-900 ${
                    active ? "bg-teal-50 text-teal-800" : ""
                  }`}
                >
                  {copy.h1.split("—")[0]?.trim() ?? copy.h1}
                </Link>
              );
            })}
            <Link
              href="/blog/"
              className="rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm sm:inline-block sm:text-sm"
            >
              WhatsApp
            </a>
            <a
              href={SEO_BUSINESS_PHONE_TEL}
              className="rounded-full bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm sm:text-sm"
            >
              Appeler
            </a>
            <details className="relative lg:hidden">
              <summary
                className="flex cursor-pointer list-none items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-slate-700 [&::-webkit-details-marker]:hidden"
                aria-label="Menu"
              >
                <Menu className="size-5" />
              </summary>
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
                {SEO_SHELL_NAV_PAGE_IDS.map((id) => {
                  const copy = getSeoPageCopy(id, locale);
                  return (
                    <Link
                      key={id}
                      href={getSeoPagePath(id, locale)}
                      className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {copy.h1.split("—")[0]?.trim() ?? copy.h1}
                    </Link>
                  );
                })}
                <Link
                  href="/blog/"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Blog
                </Link>
              </div>
            </details>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Rabat Transfert Aéroport
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {SEO_BUSINESS_PHONE_DISPLAY} · Rabat–Salé · 24/7
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={SEO_BUSINESS_PHONE_TEL}
              className="font-medium text-teal-800 underline-offset-2 hover:underline"
            >
              Appeler
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-800 underline-offset-2 hover:underline"
            >
              WhatsApp
            </a>
            <Link
              href="/"
              className="font-medium text-slate-700 underline-offset-2 hover:underline"
            >
              Accueil site
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
