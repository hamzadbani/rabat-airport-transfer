import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

export const dynamic = "force-static";
export const revalidate = false;

const base = SITE_URL.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog/", "/guides/", "/airport-guides/", "/travel-tips/"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
