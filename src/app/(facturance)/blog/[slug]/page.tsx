import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, UserRound } from "lucide-react";

import {
  getAllBlogPosts,
  getLocalizedBlogPostBySlug,
  type BlogContentBlock,
  type LocalizedBlogPost,
} from "@/components/blog/blog-data";
import { publicSiteConfig } from "@/lib/public-site-config";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

/** Unchanged: the same slugs are still generated, so no article URL breaks. */
export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getLocalizedBlogPostBySlug(slug, "fr");

  if (!post) {
    return { title: "Article introuvable" };
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    article: {
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : [],
    },
  });
}

/**
 * BlogPosting for one article, built only from fields the article record
 * actually carries. The records hold no cover image and no modified date, so
 * `image` and `dateModified` are deliberately absent rather than invented, and
 * the author is an Organization because every byline names a team.
 */
function ArticleStructuredData({
  post,
  slug,
}: {
  post: LocalizedBlogPost;
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

function ContentBlock({ block }: { block: BlogContentBlock }) {
  if (block.type === "heading") {
    return (
      <h2 className="mt-10 text-2xl font-bold tracking-tight text-[#0b294d]">
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="mt-5 grid gap-2 pl-5 marker:text-primary [&>li]:list-disc">
        {block.items.map((item) => (
          <li key={item} className="leading-7 text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "callout") {
    return (
      <aside className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
        <p className="font-bold text-[#0b294d]">{block.title}</p>
        <p className="mt-2 leading-7 text-muted-foreground">{block.text}</p>
      </aside>
    );
  }

  return <p className="mt-5 leading-8 text-muted-foreground">{block.text}</p>;
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getLocalizedBlogPostBySlug(slug, "fr");

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
          {post.content.map((block, index) => (
            <ContentBlock key={index} block={block} />
          ))}
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
