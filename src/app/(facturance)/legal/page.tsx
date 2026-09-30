import type { Metadata } from "next";

import { LegalPage } from "@/components/public-site/public-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Mentions légales",
  description:
    "Éditeur, responsabilité et informations légales de Facturance Plus.",
  path: "/legal",
});

export default function Page() {
  return <LegalPage />;
}
