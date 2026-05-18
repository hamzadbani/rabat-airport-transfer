import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata = genMeta({
  title: "Conseils voyage Maroc | Taxi Rabat & transferts",
  description:
    "Astuces transport au Maroc : Rabat, Casablanca, aéroports et réservation taxi.",
  canonicalPath: "/travel-tips/",
});

const TIPS = [
  {
    title: "Réserver avant d’atterrir",
    body: "Pour RBA, confirmez le point de rendez-vous et le tarif par WhatsApp avec votre numéro de vol.",
  },
  {
    title: "Anticiper Rabat ↔ Casablanca",
    body: "Prévoyez 75–95 min selon trafic ; un forfait longue distance évite les surprises.",
  },
  {
    title: "Comparer taxi Rabat prix",
    body: "Demandez un prix annoncé avant départ — voir la page prix taxi Rabat.",
  },
];

export default function TravelTipsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Conseils voyage & taxi</h1>
      <ul className="mt-8 space-y-6">
        {TIPS.map((tip) => (
          <li key={tip.title} className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">{tip.title}</h2>
            <p className="mt-2 text-slate-600">{tip.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/taxi-rabat-prix/" className="text-teal-700 hover:underline">
          Prix taxi Rabat →
        </Link>
      </p>
    </main>
  );
}
