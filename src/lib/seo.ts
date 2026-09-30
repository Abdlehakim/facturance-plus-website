import type { Metadata } from "next";

import { publicSiteConfig } from "@/lib/public-site-config";

/**
 * Shared metadata for the public pages.
 *
 * Every indexable route needs the same five things - title, description,
 * canonical, Open Graph and a Twitter card - and only the first three differ
 * per page. `buildPageMetadata` assembles them so the social tags cannot drift
 * out of step with the canonical, which is what happens when each page hand
 * writes its own `openGraph` block.
 *
 * Titles are passed without the brand suffix: the root layout's title template
 * appends it. The social title carries it explicitly, because Open Graph has
 * no template and a bare "Contact" tells a share preview nothing.
 */

/** Generated from the brand logo; 1200x630, the size the platforms crop to. */
export const SOCIAL_IMAGE = {
  url: "/facturance-plus-og.png",
  width: 1200,
  height: 630,
  alt: "Facturance Plus — logiciel de facturation et de gestion commerciale",
} as const;

/** Open Graph wants language_TERRITORY; this site is French, for Tunisia. */
export const OG_LOCALE = "fr_TN";

export function absoluteUrl(path: string): string {
  return new URL(path, publicSiteConfig.siteUrl).toString();
}

type ArticleFacts = {
  /** ISO date from the article record - never a generated timestamp. */
  publishedTime: string;
  authors: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  socialTitle,
  image,
  article,
}: {
  title: string;
  description: string;
  /** Root-relative, e.g. "/pricing". Becomes both canonical and og:url. */
  path: string;
  socialTitle?: string;
  /** Root-relative path to a real image; falls back to the shared card. */
  image?: string;
  article?: ArticleFacts;
}): Metadata {
  const resolvedSocialTitle =
    socialTitle ?? `${title} | ${publicSiteConfig.brandName}`;

  const sharedOpenGraph = {
    locale: OG_LOCALE,
    siteName: publicSiteConfig.brandName,
    title: resolvedSocialTitle,
    description,
    url: absoluteUrl(path),
    images: image ? [{ url: image, alt: title }] : [{ ...SOCIAL_IMAGE }],
  };

  // Two branches rather than a conditional `type`: Open Graph is a
  // discriminated union, and publishedTime/authors exist only on the article
  // member of it.
  const openGraph: Metadata["openGraph"] = article
    ? {
        ...sharedOpenGraph,
        type: "article",
        publishedTime: article.publishedTime,
        authors: article.authors,
      }
    : { ...sharedOpenGraph, type: "website" };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: resolvedSocialTitle,
      description,
      images: [image ?? SOCIAL_IMAGE.url],
    },
  };
}
