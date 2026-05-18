import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { seoBlogPosts } from "@/lib/seo-blog-posts";

export const metadata = genMeta({
  title: "Guides transport Rabat | Taxi & transferts",
  description:
    "Guides taxi Rabat, prix, réservation et liaisons inter-villes au Maroc.",
  canonicalPath: "/guides/",
});

export default function GuidesHubPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Guides transport Rabat</h1>
      <p className="mt-4 text-slate-600">
        Conseils pratiques pour réserver un taxi ou un transfert aéroport à Rabat.
      </p>
      <ul className="mt-8 space-y-4">
        {seoBlogPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}/`}
              className="text-lg font-medium text-teal-800 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/" className="text-teal-700 hover:underline">
          Accueil
        </Link>
      </p>
    </main>
  );
}
