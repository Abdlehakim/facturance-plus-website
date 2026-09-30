import type { MetadataRoute } from "next";

import { publicSiteConfig } from "@/lib/public-site-config";

/**
 * The public Facturance Plus pages this site owns. The client application no
 * longer publishes a sitemap for them: it is the authenticated app and is
 * served noindex.
 *
 * The older marketing routes (/pricing, /blog, /contact) are deliberately
 * absent pending a decision on whether they belong to this product.
 */
const PUBLIC_PATHS = [
  "/",
  "/features",
  "/pricing",
  "/resources",
  "/privacy",
  "/support",
  "/terms",
  "/legal",
  "/data-requests",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_PATHS.map((path) => ({
    url: new URL(path, publicSiteConfig.siteUrl).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "yearly",
    priority: path === "/" ? 1 : 0.5,
  }));
}
