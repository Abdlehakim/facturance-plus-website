import type { Metadata } from "next";

import { DataRequestsPage } from "@/components/public-site/public-pages";

export const metadata: Metadata = {
  title: "Demandes relatives aux données",
  description:
    "Exercer vos droits sur vos données personnelles chez Facturance Plus.",
  alternates: { canonical: "/data-requests" },
};

export default function Page() {
  return <DataRequestsPage />;
}
