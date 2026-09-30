import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Newspaper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAllBlogPosts, getFeaturedBlogPost } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog facturation et gestion commerciale",
  description:
    "Conseils, guides et actualités pour mieux gérer votre facturation et votre gestion commerciale avec Facturance Plus.",
  path: "/blog",
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });

function formatPublishedAt(value: string): string | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

export default function BlogPage() {
  const posts = getAllBlogPosts();
  // The featured article comes from front matter; the grid below lists the
  // rest, still newest first.
  const featured = getFeaturedBlogPost();
  const rest = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : posts;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          BLOG FACTURANCE PLUS
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl lg:text-5xl">
          Conseils et ressources pour mieux gérer votre entreprise
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          Guides pratiques, conseils de gestion et nouveautés autour de
          Facturance Plus.
        </p>
      </header>

      {!featured ? (
        <section className="mt-12 rounded-2xl border border-blue-100/80 bg-white px-6 py-16 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Newspaper className="size-7" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-xl font-bold text-[#0b294d]">
            De nouveaux articles arrivent bientôt.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Nous préparons des guides pratiques autour de la facturation, de la
            gestion commerciale et de Facturance Plus.
          </p>
        </section>
      ) : (
        <>
          <section className="mt-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              À LA UNE
            </p>

            <article className="mt-4 overflow-hidden rounded-2xl border border-blue-200 bg-white p-6 shadow-[0_18px_50px_rgba(11,41,77,0.09)] sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                  {featured.category}
                </span>
                <PostMeta post={featured} />
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl">
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h2>

              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                {featured.description}
              </p>

              <Button asChild className="mt-6 h-11 px-6">
                <Link href={`/blog/${featured.slug}`}>
                  Lire l’article
                  <ArrowRight />
                </Link>
              </Button>
            </article>
          </section>

          {rest.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl">
                Tous les articles
              </h2>

              <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex h-full flex-col rounded-2xl border border-blue-100/80 bg-white p-5 transition-colors hover:border-primary/30"
                  >
                    <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                      {post.category}
                    </span>

                    <h3 className="mt-4 text-lg font-bold leading-snug text-[#0b294d]">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {post.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <PostMeta post={post} />
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary"
                    >
                      Lire l’article
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <section className="mt-14 overflow-hidden rounded-2xl bg-[#0b294d] px-6 py-10 text-center sm:px-10">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Découvrez Facturance Plus
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-blue-100">
          Créez votre compte et découvrez l’application pendant trois jours,
          sans engagement.
        </p>
        <Button
          asChild
          className="mt-7 h-11 bg-white px-6 text-[#0b294d] hover:bg-blue-50"
        >
          <a href={CLIENT_SIGNUP_URL}>Démarrer l’essai gratuit</a>
        </Button>
      </section>
    </div>
  );
}

/** Date and reading time, each shown only when the article actually has one. */
function PostMeta({
  post,
}: {
  post: { publishedAt: string; readTime: string };
}) {
  const publishedAt = formatPublishedAt(post.publishedAt);

  return (
    <>
      {publishedAt && (
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {publishedAt}
        </span>
      )}
      {post.readTime && (
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {post.readTime}
        </span>
      )}
    </>
  );
}
