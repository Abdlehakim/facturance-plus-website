import type { Metadata } from "next";

import { PrivacyPage } from "@/components/public-site/public-pages";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Facturance Plus collecte, utilise et protège vos données.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <PrivacyPage />;
}
