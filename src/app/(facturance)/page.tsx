import type { Metadata } from "next";

import { FacturancePlusPage } from "@/components/public-site/public-pages";
import { publicSiteConfig } from "@/lib/public-site-config";

// Title and description come from the root layout, which already describes the
// product; only the canonical URL is set per page.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Ported from the customer application's SeoManager, which injected this graph
 * into the document head on the homepage only. Here it is rendered with the
 * page, and the ids resolve against facturance.com rather than the client
 * application's old host. Values are otherwise unchanged; the fields that were
 * conditional on a configured contact stay conditional.
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
          "Logiciel Windows de facturation, devis, stock, clients, paiements et gestion multi-sociétés.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows 10, Windows 11",
        publisher: {
          "@id": organizationId,
        },
        offers: {
          "@type": "Offer",
          price: "25",
          priceCurrency: "TND",
          url: homeUrl,
        },
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
