const AREAS = [
  "Rabat centre & administrations",
  "Hay Riad, Agdal, Souissi, Hassan",
  "Salé médina, Tabriquet, Bettana",
  "Aéroport Rabat-Salé (RBA)",
  "Casablanca centre & CMN",
  "Liaisons Marrakech, Fès, Tanger",
];

export function ServiceCoverage() {
  return (
    <section className="mt-10" aria-labelledby="service-coverage-title">
      <h2 id="service-coverage-title" className="text-lg font-bold text-slate-900">
        Couverture service
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {AREAS.map((area) => (
          <li
            key={area}
            className="flex items-start gap-2 text-sm text-slate-700"
          >
            <span className="mt-1 text-teal-600" aria-hidden>
              ✓
            </span>
            {area}
          </li>
        ))}
      </ul>
    </section>
  );
}
