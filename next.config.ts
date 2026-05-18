import type { NextConfig } from "next";

/**
 * Static export for Hostinger (Apache): CI uploads `out/`.
 * Set NEXT_PUBLIC_SITE_URL at build (default: https://taxirabatairoport.com).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
