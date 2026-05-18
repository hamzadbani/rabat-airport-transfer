import type { MetadataRoute } from "next";
import { buildFullSitemap } from "@/lib/sitemap";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  return buildFullSitemap();
}
