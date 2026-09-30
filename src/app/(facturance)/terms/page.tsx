import type { Metadata } from "next";

import { TermsPage } from "@/components/public-site/public-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Conditions d’utilisation",
  description:
    "Les conditions d’utilisation du service Facturance Plus.",
  path: "/terms",
});

export default function Page() {
  return <TermsPage />;
}
