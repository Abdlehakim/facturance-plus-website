import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

/**
 * The blog's only loading logic.
 *
 * Articles are Markdown files under src/content/blog. Adding one is the whole
 * publishing workflow: the listing, the article route, `generateStaticParams`
 * and the sitemap all read from here, so nothing has to be registered by hand.
 *
 * Server only, and enforced by `node:fs`: importing this from a client
 * component fails the build rather than shipping the loader to the browser.
 * The files are read at build or server-render time, never from a browser
 * request.
 */

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

/** Front matter. `featured` and `image` are the only optional fields. */
export type BlogArticleMeta = {
  title: string;
  slug: string;
  description: string;
  category: string;
  /** ISO date, e.g. "2026-09-30". */
  publishedAt: string;
  author: string;
  readTime: string;
  featured?: boolean;
  /** Root-relative path to a real file under public/, when one exists. */
  image?: string;
};

/** A listing entry: everything the cards need, without the Markdown body. */
export type BlogArticleSummary = BlogArticleMeta;

export type BlogArticle = BlogArticleMeta & {
  /** The Markdown body, front matter removed. */
  content: string;
};

const REQUIRED_FIELDS = [
  "title",
  "slug",
  "description",
  "category",
  "publishedAt",
  "author",
  "readTime",
] as const;

/**
 * Validates one file's front matter.
 *
 * Throws rather than returning a partial article: a malformed field is an
 * authoring mistake, and failing at build time is easier to act on than a page
 * that renders with a blank title.
 */
function parseMeta(data: Record<string, unknown>, file: string): BlogArticleMeta {
  for (const field of REQUIRED_FIELDS) {
    const value = data[field];
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(
        `Article "${file}": le champ "${field}" est obligatoire et doit être une chaîne non vide.`,
      );
    }
  }

  if (Number.isNaN(new Date(data.publishedAt as string).getTime())) {
    throw new Error(
      `Article "${file}": "publishedAt" (${String(data.publishedAt)}) n'est pas une date valide.`,
    );
  }

  if (data.featured !== undefined && typeof data.featured !== "boolean") {
    throw new Error(`Article "${file}": "featured" doit être un booléen.`);
  }

  if (data.image !== undefined) {
    if (typeof data.image !== "string" || !data.image.startsWith("/")) {
      throw new Error(
        `Article "${file}": "image" doit être un chemin commençant par "/".`,
      );
    }
  }

  return {
    title: data.title as string,
    slug: data.slug as string,
    description: data.description as string,
    category: data.category as string,
    publishedAt: data.publishedAt as string,
    author: data.author as string,
    readTime: data.readTime as string,
    ...(data.featured === true ? { featured: true } : {}),
    ...(typeof data.image === "string" ? { image: data.image } : {}),
  };
}

/**
 * Newest first, then by slug so that articles sharing a publication date keep a
 * stable order across machines - readdir order is not dependable.
 */
function byPublishedAtDesc(a: BlogArticleMeta, b: BlogArticleMeta): number {
  const difference =
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  return difference !== 0 ? difference : a.slug.localeCompare(b.slug);
}

function readArticles(): BlogArticle[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"));

  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const meta = parseMeta(data as Record<string, unknown>, file);

    if (meta.slug !== path.basename(file, ".md")) {
      throw new Error(
        `Article "${file}": le slug "${meta.slug}" ne correspond pas au nom du fichier.`,
      );
    }

    return { ...meta, content: content.trim() };
  });

  const slugs = new Set<string>();
  for (const article of articles) {
    if (slugs.has(article.slug)) {
      throw new Error(`Slug d'article en double : "${article.slug}".`);
    }
    slugs.add(article.slug);
  }

  return articles.sort(byPublishedAtDesc);
}

// Read once per process. The files cannot change while the server is running a
// production build, and `next dev` restarts the module on edit.
let cache: BlogArticle[] | null = null;

function allArticles(): BlogArticle[] {
  cache ??= readArticles();
  return cache;
}

/** Every article, newest first. */
export function getAllBlogPosts(): BlogArticleSummary[] {
  return allArticles().map(({ content: _content, ...meta }) => meta);
}

export function getBlogPostBySlug(slug: string): BlogArticle | undefined {
  return allArticles().find((article) => article.slug === slug);
}

/**
 * The article shown in the "À la une" slot.
 *
 * The first one flagged `featured` in sort order wins, so two flagged articles
 * still give a stable result rather than depending on file order. With none
 * flagged, the newest article stands in.
 */
export function getFeaturedBlogPost(): BlogArticleSummary | undefined {
  const posts = getAllBlogPosts();
  return posts.find((post) => post.featured === true) ?? posts[0];
}
