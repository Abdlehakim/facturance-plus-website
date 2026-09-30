import type { Metadata } from "next";

import { DataRequestsPage } from "@/components/public-site/public-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Demandes relatives aux données",
  description:
    "Exercer vos droits sur vos données personnelles chez Facturance Plus.",
  path: "/data-requests",
});

export default function Page() {
  return <DataRequestsPage />;
}
