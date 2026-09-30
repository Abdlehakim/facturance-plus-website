import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, UserRound } from "lucide-react";

import { MarkdownContent } from "@/components/blog/markdown-content";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  type BlogArticle,
} from "@/lib/blog";
import { publicSiteConfig } from "@/lib/public-site-config";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

/** Derived from the Markdown files, so a new article needs no registration. */
export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

/**
 * Every article is known at build time, and the standalone production image
 * carries the rendered pages rather than src/content. Without this, an unknown
 * slug would be rendered on demand and the loader would look for Markdown that
 * is not in the image; with it, anything outside the list above is a 404.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article introuvable" };
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    image: post.image,
    article: {
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : [],
    },
  });
}

/**
 * BlogPosting for one article, built only from fields the front matter
 * actually carries. `image` appears when the article declares one and is left
 * out otherwise; no article records a modified date, so `dateModified` is
 * absent rather than invented, and the author is an Organization because every
 * byline names a team.
 */
function ArticleStructuredData({
  post,
  slug,
}: {
  post: BlogArticle;
  slug: string;
}) {
  const articleUrl = absoluteUrl(`/blog/${slug}`);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    inLanguage: "fr",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    ...(post.image ? { image: absoluteUrl(post.image) } : {}),
    ...(post.author
      ? { author: { "@type": "Organization", name: post.author } }
      : {}),
    publisher: {
      "@type": "Organization",
      name: publicSiteConfig.publisherName,
      url: publicSiteConfig.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/facturance-plus-logo.png"),
        width: 1919,
        height: 348,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // Serialized from values this repository controls, never from input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });

function formatPublishedAt(value: string): string | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishedAt = formatPublishedAt(post.publishedAt);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
      <ArticleStructuredData post={post} slug={slug} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Retour au blog
      </Link>

      <article className="mt-8">
        <header>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            {post.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t pt-5">
            {post.author && (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <UserRound className="size-4" aria-hidden="true" />
                {post.author}
              </span>
            )}
            {publishedAt && (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4" aria-hidden="true" />
                {publishedAt}
              </span>
            )}
            {post.readTime && (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4" aria-hidden="true" />
                {post.readTime}
              </span>
            )}
          </div>
        </header>

        <div className="mt-6">
          <MarkdownContent content={post.content} />
        </div>
      </article>

      <Link
        href="/blog"
        className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Retour au blog
      </Link>
    </div>
  );
}
