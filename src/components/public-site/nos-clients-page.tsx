import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Info, MapPin } from "lucide-react";
import { DirectoryCompanyLogo } from "./directory-company-logo";

import {
  PublicPageContainer,
  PublicPageHeader,
} from "@/components/public-site/public-pages";
import {
  fetchPublicShowcase,
  safeExternalUrl,
  SHOWCASE_PAGE_SIZE,
  SHOWCASE_MAX_PAGE,
  type PublicShowcaseCard,
} from "@/lib/showcase-api";

/**
 * The public directory at /nos-clients.
 *
 * A server component that reads the public endpoint on every render. It holds
 * no list, has no fallback dataset and applies no filter of its own: the set
 * it displays is exactly the set the server returned for this request, and a
 * company withdrawn since the last render is simply absent from the next one.
 *
 * The public allowlist is rebuilt field by field. An optional approved logo
 * uses the local live proxy; no pending bytes or private company asset enters
 * the card, and every new image request rechecks server eligibility.
 *
 * Nothing is invented. There is no customer count, no rating, no testimonial
 * and no map: a company appears with the name, sector, city, description and
 * link an administrator approved, or those of them it has.
 */

function CompanyCard({ company }: { company: PublicShowcaseCard }) {
  // Validated where it is used, rather than trusted from a rule enforced in
  // the API. An unsafe or malformed value simply yields no link.
  const websiteUrl = safeExternalUrl(company.websiteUrl);
  const locationLine = [company.sector, company.city]
    .filter((value): value is string => Boolean(value))
    .join(" · ");

  return (
    <li className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-3">
        <DirectoryCompanyLogo key={company.logoUrl ?? "none"} src={company.logoUrl} />
        <div className="min-w-0">
          {/* The display name is text, never markup: React escapes it, and no
              server value is ever passed through dangerouslySetInnerHTML. */}
          <h3 className="text-base font-semibold leading-6 text-[#0b294d]">
            {company.displayName}
          </h3>
          {locationLine !== "" && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{locationLine}</span>
            </p>
          )}
        </div>
      </div>

      {/* The approved description, capped at 120 code points by the API, so a
          card cannot grow out of proportion with its neighbours. */}
      {company.description && (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {company.description}
        </p>
      )}

      {websiteUrl && (
        <p className="mt-4 pt-1">
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Visiter le site
            <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="sr-only">
              (s’ouvre dans un nouvel onglet)
            </span>
          </a>
        </p>
      )}
    </li>
  );
}

function StateCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 rounded-2xl border bg-white p-8 text-center">
      <span
        aria-hidden="true"
        className="mx-auto grid size-11 place-items-center rounded-full bg-[#f5f8fc] text-[#0b294d]/60"
      >
        <Info className="size-5" />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-[#0b294d]">{title}</h2>
      <div className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function pageHref(page: number): string {
  return page <= 1 ? "/nos-clients" : `/nos-clients?page=${page}`;
}

export async function NosClientsPage({ page }: { page: number }) {
  if (!Number.isSafeInteger(page) || page < 1 || page > SHOWCASE_MAX_PAGE) {
    notFound();
  }
  const safePage = page;
  const result = await fetchPublicShowcase({
    limit: SHOWCASE_PAGE_SIZE,
    offset: (safePage - 1) * SHOWCASE_PAGE_SIZE,
  });

  /**
   * The API carries no total, on purpose: a count of what is published is
   * still a measurement of the set, and nothing about excluded companies may
   * be inferable from metadata. Its own contract says a caller paginates "by
   * reading until a short page comes back", so a full page means another may
   * exist and a short one means this is the last. No count is displayed.
   */
  const companies = result.status === "ok" ? result.companies : [];
  const hasNextPage =
    result.status === "ok" && companies.length === SHOWCASE_PAGE_SIZE &&
    safePage < SHOWCASE_MAX_PAGE;

  return (
    <PublicPageContainer>
      <PublicPageHeader
        eyebrow="Nos clients"
        title="Ils nous font confiance"
        description="Découvrez les entreprises qui ont choisi Facturance Plus pour accompagner leur activité."
      />

      <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
        Cet annuaire est volontaire. Chaque entreprise qui y figure a
        explicitement autorisé la publication de ses informations, et les
        contenus affichés ont été vérifiés avant leur mise en ligne. Une
        entreprise peut retirer son autorisation à tout moment : elle cesse
        alors d’apparaître sur cette page.
      </p>

      {result.status === "unavailable" ? (
        <StateCard title="Annuaire momentanément indisponible">
          <p>
            La liste des entreprises n’a pas pu être affichée pour le moment.
            Merci de réessayer dans quelques instants.
          </p>
        </StateCard>
      ) : companies.length === 0 ? (
        safePage > 1 ? (
          <StateCard title="Aucune entreprise sur cette page">
            <p>
              Cette page de l’annuaire ne contient plus d’entreprise.{" "}
              <Link
                href={pageHref(1)}
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                Revenir au début de l’annuaire
              </Link>
              .
            </p>
          </StateCard>
        ) : (
          <StateCard title="Aucune entreprise publiée pour le moment">
            <p>
              Aucune entreprise n’a encore choisi de présenter son activité
              dans cet annuaire. Cette page se remplira à mesure que des
              entreprises donneront leur autorisation.
            </p>
          </StateCard>
        )
      ) : (
        <>
          <ul className="mt-10 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              // The public slug is the stable identity. No internal
              // identifier exists in the response to use instead.
              <CompanyCard key={company.slug} company={company} />
            ))}
          </ul>

          {(safePage > 1 || hasNextPage) && (
            <nav
              className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6"
              aria-label="Pagination de l’annuaire"
            >
              {safePage > 1 ? (
                <Link
                  href={pageHref(safePage - 1)}
                  className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Page précédente
                </Link>
              ) : (
                <span />
              )}

              <span className="text-sm text-muted-foreground">
                Page {safePage}
              </span>

              {hasNextPage ? (
                <Link
                  href={pageHref(safePage + 1)}
                  className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Page suivante
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </>
      )}
    </PublicPageContainer>
  );
}
