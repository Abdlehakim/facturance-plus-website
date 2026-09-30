import type { Metadata } from "next";

import { SupportPage } from "@/components/public-site/public-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Centre d’aide",
  description:
    "Assistance Facturance Plus : contact par e-mail, par téléphone et sur WhatsApp.",
  path: "/support",
});

export default function Page() {
  return <SupportPage />;
}
