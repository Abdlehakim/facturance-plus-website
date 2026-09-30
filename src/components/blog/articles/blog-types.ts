import type { LucideIcon } from "lucide-react";
/**
 * The locales the article records carry. Declared here because the blog data
 * is the only consumer left after the old marketing site was removed.
 */
export type LanguageCode = "en" | "fr" | "de" | "ar";

export type BlogContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "callout";
      title: string;
      text: string;
    }
  | {
      /**
       * A short list of links to other pages of this site. Kept as a block of
       * its own because paragraphs are plain text: an inline link would mean
       * either markup inside the data or a parser, and neither belongs here.
       */
      type: "links";
      title?: string;
      items: { label: string; href: string }[];
    };

export type BlogPost = {
  slug: string;
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  readTime: string;
  publishedAt: string;
  author: string;
  content: BlogContentBlock[];
  /**
   * Translations of the fields above.
   *
   * Optional, and partial: the articles written in French carry their content
   * once, at the top level, and `localizeBlogPost` falls back to it for any
   * locale this record does not translate. The earlier articles, authored in
   * English with four translations, are unaffected.
   */
  localized?: Partial<Record<LanguageCode, LocalizedArticleContent>>;
};

export type LocalizedArticleContent = {
  category: string;
  title: string;
  description: string;
  readTime: string;
  author: string;
  content: BlogContentBlock[];
};

export type LocalizedBlogPost = Omit<
  BlogPost,
  | "category"
  | "title"
  | "description"
  | "readTime"
  | "author"
  | "content"
  | "localized"
> &
  LocalizedArticleContent;
