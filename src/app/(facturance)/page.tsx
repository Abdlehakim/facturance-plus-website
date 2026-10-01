import type { Metadata } from "next";

import { getStructuredPricingOffers } from "@/components/public-site/pricing-offers";
import { FacturancePlusPage } from "@/components/public-site/public-pages";
import { publicSiteConfig } from "@/lib/public-site-config";
import { absoluteUrl, buildPageMetadata, SOCIAL_IMAGE } from "@/lib/seo";

/*
 * Brand-and-product intent. The geo query "logiciel de facturation en
 * Tunisie" belongs to /logiciel-facturation-tunisie, so the two titles no
 * longer compete for it.
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Facturance Plus | Logiciel de facturation et gestion commerciale",
  brandedTitle: true,
  description:
    "Facturance Plus centralise factures, devis, clients, fournisseurs, articles, stocks et paiements dans une seule solution de gestion commerciale.",
  path: "/",
});

/**
 * Ported from the customer application's SeoManager, which injected this graph
 * into the document head on the homepage only. Here it is rendered with the
 * page, and the ids resolve against facturance.com rather than the client
 * application's old host. The fields that were conditional on a configured
 * contact stay conditional, and the offers are read from the pricing cards
 * instead of being restated - nothing here is asserted that the site does not
 * already publish.
 */
function HomepageStructuredData() {
  const homeUrl = `${publicSiteConfig.siteUrl}/`;
  const organizationId = `${homeUrl}#organization`;
  const softwareApplicationId = `${homeUrl}#software-application`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: publicSiteConfig.publisherName,
        url: homeUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/facturance-plus-logo.png"),
          width: 1919,
          height: 348,
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: publicSiteConfig.country,
        },
        ...(publicSiteConfig.supportEmail !== null
          ? { email: publicSiteConfig.supportEmail }
          : {}),
        ...(publicSiteConfig.supportPhone !== null
          ? { telephone: publicSiteConfig.supportPhone }
          : {}),
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareApplicationId,
        name: publicSiteConfig.brandName,
        url: homeUrl,
        description:
          "Logiciel de facturation et de gestion commerciale : devis, factures, stock, clients, fournisseurs, paiements et gestion multi-entreprises, sur Windows et depuis un navigateur.",
        applicationCategory: "BusinessApplication",
        // Must stay identical to the node published under the same @id on
        // /logiciel-facturation-tunisie: one entity, described twice.
        operatingSystem: "Windows 10, Windows 11, Web",
        inLanguage: "fr",
        image: absoluteUrl(SOCIAL_IMAGE.url),
        publisher: {
          "@id": organizationId,
        },
        // Derived from the pricing cards rather than restated here, so the
        // structured price and the published price cannot diverge.
        offers: getStructuredPricingOffers().map((offer) => ({
          "@type": "Offer",
          name: offer.name,
          price: String(offer.price),
          priceCurrency: offer.priceCurrency,
          url: absoluteUrl("/pricing"),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: offer.price,
            priceCurrency: offer.priceCurrency,
            unitText: offer.unitText,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialized from values this repository controls, never from input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <HomepageStructuredData />
      <FacturancePlusPage />
    </>
  );
}
