import type { Metadata } from "next";

import { TermsPage } from "@/components/public-site/public-pages";

export const metadata: Metadata = {
  title: "Conditions d’utilisation",
  description:
    "Les conditions d’utilisation du service Facturance Plus.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <TermsPage />;
}
