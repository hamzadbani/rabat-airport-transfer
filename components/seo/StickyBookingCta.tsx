"use client";

import { seoWhatsAppHref, SEO_BUSINESS_PHONE_TEL } from "@/lib/seo/contact";

export function StickyBookingCta() {
  const wa = seoWhatsAppHref(
    "Bonjour, je souhaite réserver un taxi / transfert aéroport.",
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full bg-emerald-600 py-3 text-center text-sm font-semibold text-white"
        >
          WhatsApp
        </a>
        <a
          href={SEO_BUSINESS_PHONE_TEL}
          className="flex-1 rounded-full bg-teal-700 py-3 text-center text-sm font-semibold text-white"
        >
          Appeler
        </a>
      </div>
    </div>
  );
}
