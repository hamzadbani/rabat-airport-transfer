import type { MetadataRoute } from "next";
import { seoBlogPosts } from "@/lib/seo-blog-posts";
import { SEO_PAGE_REGISTRY, listSeoPageIds } from "@/lib/seo/registry";
import { SITE_URL } from "@/lib/seo/site";
import { getSeoPageUrl } from "@/lib/seo/routing";
import { DEFAULT_SEO_LOCALE } from "@/lib/seo/types";

const base = SITE_URL.replace(/\/$/, "");

const homeLanguages: Record<string, string> = {
  fr: `${base}/`,
  en: `${base}/en/`,
  ar: `${base}/ar/`,
  "x-default": `${base}/`,
};

/** Programmatic SEO + blog + hub URLs for sitemap.xml */
export function buildFullSitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${base}/en/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${base}/ar/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: homeLanguages },
    },
  ];

  for (const pageId of listSeoPageIds()) {
    const def = SEO_PAGE_REGISTRY[pageId];
    if (!def.indexed) continue;
    entries.push({
      url: getSeoPageUrl(SITE_URL, pageId, DEFAULT_SEO_LOCALE),
      lastModified: now,
      changeFrequency: def.sitemap.changeFrequency,
      priority: def.sitemap.priority,
      alternates: {
        languages: {
          fr: getSeoPageUrl(SITE_URL, pageId, DEFAULT_SEO_LOCALE),
          "x-default": getSeoPageUrl(SITE_URL, pageId, DEFAULT_SEO_LOCALE),
        },
      },
    });
  }

  const hubs = ["/blog/", "/guides/", "/airport-guides/", "/travel-tips/"];
  for (const hub of hubs) {
    entries.push({
      url: `${base}${hub}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const post of seoBlogPosts) {
    entries.push({
      url: `${base}/blog/${post.slug}/`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  return entries;
}

/** Route-focused sitemap subset (money pages). */
export function buildRoutesSitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return listSeoPageIds()
    .filter((id) => SEO_PAGE_REGISTRY[id].indexed)
    .filter(
      (id) =>
        id.includes("aeroport") ||
        id.includes("casablanca") ||
        id.includes("casa") ||
        id.includes("transfert") ||
        id.includes("rabat-casablanca") ||
        id.includes("marrakech"),
    )
    .map((pageId) => ({
      url: getSeoPageUrl(SITE_URL, pageId, DEFAULT_SEO_LOCALE),
      lastModified: now,
      changeFrequency: SEO_PAGE_REGISTRY[pageId].sitemap.changeFrequency,
      priority: SEO_PAGE_REGISTRY[pageId].sitemap.priority,
    }));
}
