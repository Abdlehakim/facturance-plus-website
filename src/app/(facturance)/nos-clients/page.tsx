import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NosClientsPage } from "@/components/public-site/nos-clients-page";
import { buildPageMetadata } from "@/lib/seo";
import { SHOWCASE_MAX_PAGE } from "@/lib/showcase-api";

/**
 * `brandedTitle` skips the root layout's "%s | Facturance Plus" template,
 * because this title already names the brand: without it the rendered title
 * would repeat it twice.
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Nos clients | Entreprises utilisant Facturance Plus",
  description:
    "Découvrez les entreprises qui utilisent Facturance Plus en Tunisie et qui ont choisi de présenter leur activité dans notre annuaire.",
  path: "/nos-clients",
  brandedTitle: true,
});

/**
 * Rendered per request, never prerendered and never revalidated.
 *
 * Reading `searchParams` would already opt this route out of static
 * generation, and the fetch behind it is `cache: "no-store"` - but the
 * requirement here is a property of the page, not a side effect of how it
 * happens to read its data. Stated explicitly so a later refactor that drops
 * the search parameter cannot silently turn the directory into a build
 * artefact: a consent withdrawal has to take effect on the next request, and
 * a prerendered page would keep serving a company that asked to be removed.
 */
export const dynamic = "force-dynamic";

function readPage(value: string | string[] | undefined): number {
  if (value === undefined) return 1;
  if (typeof value !== "string" || !/^[1-9]\d{0,3}$/.test(value)) {
    notFound();
  }
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed > SHOWCASE_MAX_PAGE) notFound();
  return parsed;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const resolved = await searchParams;
  return <NosClientsPage page={readPage(resolved.page)} />;
}
