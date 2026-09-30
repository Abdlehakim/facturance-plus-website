import { permissionFirstSaasPost } from "./building-permission-first-saas-products";
import { cloudDataSourceOfTruthPost } from "./cloud-data-source-of-truth";
import { designingFinanceSystemsPost } from "./designing-finance-systems-for-multi-company-operations";
import { softwareForOwnersAdminsOperatorsPost } from "./designing-software-for-owners-admins-operators";
import { documentsCommerciauxPost } from "./devis-bon-commande-bon-livraison-facture";
import { factureElectroniqueTunisiePost } from "./facture-electronique-tunisie-2026";
import { gestionStockPost } from "./gestion-stock-bonnes-pratiques";
import { choisirModeDeploiementPost } from "./logiciel-facturation-local-web-synchronise-tunisie";
import { mentionsObligatoiresFacturePost } from "./mentions-obligatoires-facture-tunisie";
import { facturanceRoadmapPost } from "./what-we-are-building-next-for-facturance";
import { offlineDesktopWorkflowsPost } from "./why-offline-desktop-workflows-still-matter-for-erp-teams";
import type { LanguageCode } from "./blog-types";
import type { BlogPost, LocalizedBlogPost } from "./blog-types";

/**
 * Display order, and the order the blog page reads: its first entry is the
 * featured article. The French guides come first; the earlier engineering
 * posts follow in the order they already had.
 */
export const blogPosts: BlogPost[] = [
  mentionsObligatoiresFacturePost,
  factureElectroniqueTunisiePost,
  documentsCommerciauxPost,
  gestionStockPost,
  choisirModeDeploiementPost,
  designingFinanceSystemsPost,
  offlineDesktopWorkflowsPost,
  permissionFirstSaasPost,
  cloudDataSourceOfTruthPost,
  softwareForOwnersAdminsOperatorsPost,
  facturanceRoadmapPost,
];

export const featuredPost = mentionsObligatoiresFacturePost;

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
  // Falls back to the record's own fields, which is what a French-authored
  // article carries instead of a `localized.fr` entry.
  const localized = post.localized?.[language] ?? {
    category: post.category,
    title: post.title,
    description: post.description,
    readTime: post.readTime,
    author: post.author,
    content: post.content,
  };

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
