import type { MetadataRoute } from "next";

import { publicSiteConfig } from "@/lib/public-site-config";

/**
 * This site is the indexable one. The compatibility redirects under /login and
 * /register only forward to the client application, so they are kept out of
 * the crawl.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/register"],
    },
    sitemap: new URL("/sitemap.xml", publicSiteConfig.siteUrl).toString(),
  };
}
