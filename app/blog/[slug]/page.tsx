import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateFAQSchema } from "@/lib/schema";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { SITE_URL } from "@/lib/seo/site";
import { getSeoBlogPostBySlug, seoBlogPosts } from "@/lib/seo-blog-posts";
import { seoWhatsAppHref } from "@/lib/seo/contact";
import { AIAnswerBlock, FAQSection } from "@/components/geo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getSeoBlogPostBySlug(slug);
  if (!post) {
    return { title: "Article introuvable", robots: { index: false, follow: false } };
  }
  return genMeta({
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    canonicalPath: `/blog/${post.slug}/`,
    ogType: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getSeoBlogPostBySlug(slug);
  if (!post) notFound();

  const pageUrl = `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}/`;
  const faq = [
    {
      question: "Comment réserver un taxi Rabat aéroport ?",
      answer: post.cta,
    },
    {
      question: "Le prix est-il fixe ?",
      answer:
        "Un tarif indicatif ou forfait est confirmé par WhatsApp avant le départ selon votre adresse exacte.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        dateModified: post.updatedAt,
        datePublished: post.updatedAt,
        author: { "@type": "Organization", name: "Rabat Transfert Aéroport" },
        publisher: { "@type": "Organization", name: "Rabat Transfert Aéroport" },
        mainEntityOfPage: pageUrl,
        keywords: post.keywords.join(", "),
      },
      generateFAQSchema(faq, pageUrl),
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
          Guide Rabat Transfert
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{post.title}</h1>
        <p className="mt-3 text-sm text-slate-500">Mis à jour : {post.updatedAt}</p>
        <AIAnswerBlock answer={post.intro} className="mt-8" />
        {post.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">{section.heading}</h2>
            {section.body.map((p, i) => (
              <p key={i} className="mt-3 text-slate-600">
                {p}
              </p>
            ))}
          </section>
        ))}
        <FAQSection items={faq} />
        <p className="mt-10 rounded-xl bg-teal-50 p-4 text-slate-800">{post.cta}</p>
        <a
          href={seoWhatsAppHref(post.cta)}
          className="mt-6 inline-block rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white"
        >
          Réserver sur WhatsApp
        </a>
        <p className="mt-8">
          <Link href="/blog/" className="text-teal-700 hover:underline">
            ← Tous les articles
          </Link>
        </p>
      </article>
    </main>
  );
}
