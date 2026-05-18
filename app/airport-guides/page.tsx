import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { getSeoPagePath } from "@/lib/seo/routing";

export const metadata = genMeta({
  title: "Guides aéroport Rabat-Salé (RBA) | Transfert & taxi",
  description:
    "Tout sur le transfert aéroport Rabat-Salé : prix, prise en charge, liaison Casablanca CMN.",
  canonicalPath: "/airport-guides/",
});

const PAGES = [
  "taxi-rabat-aeroport",
  "taxi-aeroport-rabat",
  "transfert-rabat-aeroport",
  "navette-aeroport-rabat",
  "taxi-aeroport-rabat-centre",
] as const;

export default function AirportGuidesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Guides transfert aéroport Rabat
      </h1>
      <p className="mt-4 text-slate-600">
        Pages dédiées RBA : taxi, navette, prix et prise en charge terminal.
      </p>
      <ul className="mt-8 space-y-3">
        {PAGES.map((id) => (
          <li key={id}>
            <Link
              href={getSeoPagePath(id, "fr")}
              className="font-medium text-teal-800 hover:underline"
            >
              {id.replace(/-/g, " ")}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/blog/taxi-rabat-airport-price-2026/" className="text-teal-700">
          Lire le guide prix taxi aéroport Rabat 2026 →
        </Link>
      </p>
    </main>
  );
}
