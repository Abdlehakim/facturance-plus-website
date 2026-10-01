import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/lib/blog";
import { publicSiteConfig } from "@/lib/public-site-config";

/**
 * The public Facturance Plus pages this site owns. The client application no
 * longer publishes a sitemap for them: it is the authenticated app and is
 * served noindex.
 *
 * `lastModified` is reported only where a real date exists. The articles carry
 * a published date; the static pages carry nothing, so they omit the field.
 * Stamping the render time on every route would tell a crawler the entire site
 * changed on every fetch, which is worse than saying nothing at all.
 */
const PUBLIC_PATHS: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/logiciel-facturation-tunisie", priority: 0.9 },
  { path: "/logiciel-gestion-commerciale-tunisie", priority: 0.9 },
  { path: "/logiciel-gestion-stock-tunisie", priority: 0.9 },
  { path: "/comparatif-logiciel-facturation-tunisie", priority: 0.8 },
  { path: "/pricing", priority: 0.9 },
  { path: "/features", priority: 0.9 },
  { path: "/blog", priority: 0.8 },
  { path: "/resources", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/support", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/legal", priority: 0.3 },
  { path: "/data-requests", priority: 0.3 },
];

function urlFor(path: string): string {
  return new URL(path, publicSiteConfig.siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = PUBLIC_PATHS.map(
    ({ path, priority }) => ({
      url: urlFor(path),
      changeFrequency: path === "/" ? "weekly" : "yearly",
      priority,
    }),
  );

  // Article routes come from the same source the blog renders from, so a new
  // post appears here without a second list to maintain.
  const articleEntries: MetadataRoute.Sitemap = getAllBlogPosts().map(
    (post) => {
      const publishedAt = new Date(post.publishedAt);

      return {
        url: urlFor(`/blog/${post.slug}`),
        ...(Number.isNaN(publishedAt.getTime())
          ? {}
          : { lastModified: publishedAt }),
        changeFrequency: "yearly",
        priority: 0.6,
      };
    },
  );

  return [...staticEntries, ...articleEntries];
}
