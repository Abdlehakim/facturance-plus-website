import type { Metadata } from "next";

import { LegalPage } from "@/components/public-site/public-pages";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, responsabilité et informations légales de Facturance Plus.",
  alternates: { canonical: "/legal" },
};

export default function Page() {
  return <LegalPage />;
}
