import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/components/blog/blog-data";
import { publicSiteConfig } from "@/lib/public-site-config";

/**
 * The public Facturance Plus pages this site owns. The client application no
 * longer publishes a sitemap for them: it is the authenticated app and is
 * served noindex.
 */
const PUBLIC_PATHS = [
  "/",
  "/blog",
  "/contact",
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

  // Article routes are derived from the same source the blog renders from, so
  // a new post appears here without a second list to maintain.
  const articlePaths = getAllBlogPosts().map((post) => `/blog/${post.slug}`);

  return [...PUBLIC_PATHS, ...articlePaths].map((path) => ({
    url: new URL(path, publicSiteConfig.siteUrl).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "yearly",
    priority: path === "/" ? 1 : 0.5,
  }));
}
