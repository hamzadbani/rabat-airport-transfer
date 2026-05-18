import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { seoBlogPosts } from "@/lib/seo-blog-posts";

export const metadata = genMeta({
  title: "Blog Taxi Rabat | Guides transfert aéroport & prix",
  description:
    "Guides pratiques : taxi Rabat, transfert aéroport RBA, prix taxi Rabat, Casablanca ↔ Rabat et transport au Maroc.",
  keywords: [
    "taxi rabat",
    "transport aeroport rabat",
    "taxi rabat prix",
    "rabat airport transfer",
  ],
  canonicalPath: "/blog/",
});

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            Rabat Transfert — Guides
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Blog taxi Rabat & transfert aéroport
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Conseils réservation, prix, liaisons Rabat–Casablanca et transport
            aéroport au Maroc.
          </p>
        </header>
        <section className="grid gap-5 sm:grid-cols-2">
          {seoBlogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-200 p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="text-teal-800 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-slate-600">{post.description}</p>
              <p className="mt-2 text-xs text-slate-500">
                Mis à jour : {post.updatedAt}
              </p>
            </article>
          ))}
        </section>
        <p className="mt-10">
          <Link href="/" className="text-teal-700 hover:underline">
            ← Accueil
          </Link>
        </p>
      </div>
    </main>
  );
}
