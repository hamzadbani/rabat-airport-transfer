import type { GeoEntity } from "@/lib/geo/entities";

type Props = {
  entities: GeoEntity[];
};

export function GeoEntitySection({ entities }: Props) {
  if (entities.length === 0) return null;

  return (
    <section
      className="mt-10"
      aria-labelledby="geo-entities-title"
      itemScope
      itemType="https://schema.org/Place"
    >
      <h2 id="geo-entities-title" className="text-lg font-bold text-slate-900">
        Zones & lieux desservis
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {entities.map((entity) => (
          <li
            key={entity.id}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
            itemProp="name"
          >
            <span className="font-medium">{entity.name}</span>
            {entity.iataCode ? (
              <span className="ml-1 text-slate-500">({entity.iataCode})</span>
            ) : null}
            <meta itemProp="addressCountry" content={entity.addressCountry} />
          </li>
        ))}
      </ul>
    </section>
  );
}
