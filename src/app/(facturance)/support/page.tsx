import type { Metadata } from "next";

import { SupportPage } from "@/components/public-site/public-pages";

export const metadata: Metadata = {
  title: "Centre d’aide",
  description:
    "Assistance Facturance Plus : contact, WhatsApp, e-mail et téléphone.",
  alternates: { canonical: "/support" },
};

export default function Page() {
  return <SupportPage />;
}
