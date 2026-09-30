import { permissionFirstSaasPost } from "./building-permission-first-saas-products";
import { cloudDataSourceOfTruthPost } from "./cloud-data-source-of-truth";
import { designingFinanceSystemsPost } from "./designing-finance-systems-for-multi-company-operations";
import { softwareForOwnersAdminsOperatorsPost } from "./designing-software-for-owners-admins-operators";
import { facturanceRoadmapPost } from "./what-we-are-building-next-for-facturance";
import { offlineDesktopWorkflowsPost } from "./why-offline-desktop-workflows-still-matter-for-erp-teams";
import type { LanguageCode } from "./blog-types";
import type { BlogPost, LocalizedBlogPost } from "./blog-types";

export const blogPosts: BlogPost[] = [
  designingFinanceSystemsPost,
  offlineDesktopWorkflowsPost,
  permissionFirstSaasPost,
  cloudDataSourceOfTruthPost,
  softwareForOwnersAdminsOperatorsPost,
  facturanceRoadmapPost,
];

export const featuredPost = designingFinanceSystemsPost;

export function getAllBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function localizeBlogPost(
  post: BlogPost,
  language: LanguageCode,
): LocalizedBlogPost {
  const localized = post.localized[language];

  return {
    slug: post.slug,
    icon: post.icon,
    publishedAt: post.publishedAt,
    ...localized,
  };
}

export function getLocalizedBlogPosts(
  language: LanguageCode,
): LocalizedBlogPost[] {
  return blogPosts.map((post) => localizeBlogPost(post, language));
}

export function getLocalizedBlogPostBySlug(
  slug: string,
  language: LanguageCode,
): LocalizedBlogPost | undefined {
  const post = getBlogPostBySlug(slug);

  return post ? localizeBlogPost(post, language) : undefined;
}

export type {
  BlogContentBlock,
  BlogPost,
  LocalizedArticleContent,
  LocalizedBlogPost,
} from "./blog-types";
