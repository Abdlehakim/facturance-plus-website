import type { Metadata } from "next";

import { PrivacyPage } from "@/components/public-site/public-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment Facturance Plus collecte, utilise et protège vos données.",
  path: "/privacy",
});

export default function Page() {
  return <PrivacyPage />;
}
