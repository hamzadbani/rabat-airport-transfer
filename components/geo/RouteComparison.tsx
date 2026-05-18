import Link from "next/link";
import { getSeoPagePath } from "@/lib/seo/routing";
import type { SeoPageId } from "@/lib/seo/types";

const ROUTES: Array<{
  pageId: SeoPageId;
  label: string;
  hint: string;
}> = [
  {
    pageId: "taxi-rabat-aeroport",
    label: "Taxi Rabat → RBA",
    hint: "Arrivée / départ aéroport",
  },
  {
    pageId: "rabat-casablanca-taxi",
    label: "Rabat ↔ Casablanca",
    hint: "Centre-ville & affaires",
  },
  {
    pageId: "taxi-rabat-prix",
    label: "Prix taxi Rabat",
    hint: "Tarifs & forfaits",
  },
];

export function RouteComparison() {
  return (
    <section className="mt-12" aria-labelledby="route-comparison-title">
      <h2 id="route-comparison-title" className="text-lg font-bold text-slate-900">
        Comparer les trajets fréquents
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {ROUTES.map((route) => (
          <li key={route.pageId}>
            <Link
              href={getSeoPagePath(route.pageId, "fr")}
              className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-200 hover:bg-teal-50/50"
            >
              <span className="font-semibold text-teal-900">{route.label}</span>
              <span className="mt-1 block text-xs text-slate-500">
                {route.hint}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
