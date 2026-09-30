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
  localized: Record<LanguageCode, LocalizedArticleContent>;
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
