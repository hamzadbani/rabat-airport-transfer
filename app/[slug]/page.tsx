import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/SeoLandingPage";
import { generateSeoPageMetadata } from "@/lib/metadata";
import {
  getSeoPageIdByFrSlug,
  listIndexedFrSeoSlugs,
} from "@/lib/seo/registry";
import { DEFAULT_SEO_LOCALE } from "@/lib/seo/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return listIndexedFrSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageId = getSeoPageIdByFrSlug(slug);
  if (!pageId) return {};
  return generateSeoPageMetadata(pageId, DEFAULT_SEO_LOCALE);
}

export default async function SeoSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const pageId = getSeoPageIdByFrSlug(slug);
  if (!pageId) notFound();
  return <SeoLandingPage pageId={pageId} locale={DEFAULT_SEO_LOCALE} />;
}
