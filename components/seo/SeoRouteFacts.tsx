import { getRouteFactForPage } from "@/lib/seo/route-for-page";
import type { SeoPageId } from "@/lib/seo/types";

type Props = { pageId: SeoPageId };

/**
 * Real distance / duration / indicative price — strong GEO + CTR signals.
 */
export function SeoRouteFacts({ pageId }: Props) {
  const fact = getRouteFactForPage(pageId);
  if (!fact) return null;

  return (
    <section
      className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
      aria-labelledby="seo-route-facts-title"
    >
      <h2
        id="seo-route-facts-title"
        className="text-lg font-bold text-slate-900"
      >
        Repères trajet (indicatif)
      </h2>
      <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
        <div>
          <dt className="font-medium text-slate-500">Trajet type</dt>
          <dd className="mt-1">
            {fact.fromCity} → {fact.toCity}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Distance</dt>
          <dd className="mt-1">{fact.distanceKm} km (estimation)</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Durée</dt>
          <dd className="mt-1">≈ {fact.durationMin} min</dd>
        </div>
        <div className="sm:col-span-3">
          <dt className="font-medium text-slate-500">Prix estimé</dt>
          <dd className="mt-1 text-base font-semibold text-emerald-900">
            à partir de {fact.priceEstimatedMAD} MAD
          </dd>
          <p className="mt-2 text-xs text-slate-500">
            Fourchette marketing indicative (base + km). Tarif définitif confirmé
            par WhatsApp selon adresse exacte, créneau et trafic.
          </p>
        </div>
      </dl>
    </section>
  );
}
