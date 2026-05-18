type Props = {
  priceFromMad?: number;
  note?: string;
};

export function PricingExplainer({ priceFromMad, note }: Props) {
  return (
    <section
      className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-5"
      aria-labelledby="pricing-explainer-title"
      data-speakable="pricing"
    >
      <h2 id="pricing-explainer-title" className="text-lg font-bold text-slate-900">
        Comment est calculé le prix ?
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>Distance réelle et quartier de prise en charge (Rabat, Salé, RBA, CMN).</li>
        <li>Créneau horaire, trafic et attente éventuelle (vol retardé).</li>
        <li>Type de véhicule (berline premium, van) et nombre de bagages.</li>
      </ul>
      {priceFromMad != null && (
        <p className="mt-4 text-base font-semibold text-teal-900">
          Indication à partir de {priceFromMad} MAD — tarif confirmé par WhatsApp avant départ.
        </p>
      )}
      {note ? <p className="mt-2 text-xs text-slate-500">{note}</p> : null}
    </section>
  );
}
