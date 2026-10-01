import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, ExternalLink, Info, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { publicSiteConfig } from "@/lib/public-site-config";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

import {
  CHECKED_AT,
  criteria,
  eInvoiceCriteria,
  products,
  type Verdict,
} from "./comparison-data";

const PATH = "/comparatif-logiciel-facturation-tunisie";

export const metadata: Metadata = buildPageMetadata({
  title: "Comparatif des logiciels de facturation en Tunisie 2026",
  description:
    "Comparez les logiciels de facturation en Tunisie en 2026 : tarifs, Web, Windows, stock, paiements, multi-entreprises et facturation électronique, avec sources vérifiées.",
  path: PATH,
});

/**
 * Comparison page, built from ./comparison-data so the table, the per-product
 * sections and the source list all read the same values.
 *
 * No score, no ranking and no winner: the guidance section sorts products by
 * need instead. Facturance Plus is held to the same evidence standard as the
 * others, which is why its electronic-invoicing row records the transmission
 * step it does not cover alongside the two it does.
 */

function VerdictCell({ verdict }: { verdict: Verdict }) {
  if (verdict === "yes") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
        <Check className="size-4 shrink-0" aria-hidden="true" />
        Oui
      </span>
    );
  }

  if (verdict === "partial") {
    return (
      <span className="text-sm font-medium text-[#0b294d]">Partiel</span>
    );
  }

  if (verdict === "no") {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <Minus className="size-4 shrink-0" aria-hidden="true" />
        Non
      </span>
    );
  }

  return (
    <span className="text-sm text-muted-foreground/80">Non communiqué</span>
  );
}

function StructuredData() {
  const homeUrl = `${publicSiteConfig.siteUrl}/`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: homeUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Comparatif des logiciels de facturation en Tunisie",
        item: absoluteUrl(PATH),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialized from values this repository controls, never from input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function ComparatifLogicielFacturationTunisiePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <StructuredData />

      <nav aria-label="Fil d’Ariane" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="font-medium text-primary hover:underline">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-3.5" />
          </li>
          <li aria-current="page">
            Comparatif des logiciels de facturation en Tunisie
          </li>
        </ol>
      </nav>

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          COMPARATIF 2026
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl lg:text-5xl">
          Comparatif des logiciels de facturation en Tunisie en 2026
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          Plusieurs solutions de facturation et de gestion commerciale sont
          disponibles en Tunisie, et elles ne couvrent pas le même périmètre :
          certaines s’arrêtent à l’émission des documents, d’autres incluent le
          stock, la caisse, la comptabilité ou la paie. Les tarifs vont de
          quelques dinars par mois à plusieurs centaines par an, et ne se
          comparent pas toujours sur la même base.
        </p>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Ce comparatif réunit sept solutions selon les mêmes critères, à partir
          des pages publiques de chaque éditeur. Il n’attribue ni note ni
          classement : le bon logiciel dépend de ce que vous avez à gérer.
        </p>
      </header>

      <aside
        className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        aria-labelledby="transparence-title"
      >
        <p
          id="transparence-title"
          className="flex items-center gap-2 text-base font-bold text-[#7a4a05]"
        >
          <Info className="size-5 shrink-0" aria-hidden="true" />
          Qui publie ce comparatif
        </p>
        <p className="mt-3 text-sm leading-6 text-[#7a4a05]">
          Ce comparatif est publié par l’équipe Facturance Plus. Facturance Plus
          figure donc dans le tableau aux côtés des autres solutions. Nous
          utilisons les mêmes critères pour chaque logiciel et indiquons « Non
          communiqué » lorsqu’une information n’est pas disponible publiquement.
          Ce n’est pas un avis indépendant : lisez-le en le sachant, et vérifiez
          les points qui comptent pour vous auprès de chaque éditeur.
        </p>
        <p className="mt-3 text-sm leading-6 text-[#7a4a05]">
          Informations vérifiées le {CHECKED_AT} à partir des pages publiques
          des éditeurs. Les fonctionnalités et les tarifs peuvent évoluer :
          vérifiez-les sur le site de chaque éditeur avant de prendre une
          décision.
        </p>
      </aside>

      <section className="mt-14" aria-labelledby="methode-title">
        <h2
          id="methode-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Comment avons-nous comparé les logiciels ?
        </h2>
        <ul className="mt-5 grid max-w-3xl gap-2 pl-5 marker:text-primary [&>li]:list-disc">
          <li className="leading-7 text-muted-foreground">
            Les informations proviennent des pages publiques de chaque éditeur :
            pages produit, pages tarifs et pages consacrées à la facturation
            électronique.
          </li>
          <li className="leading-7 text-muted-foreground">
            Les mêmes critères sont appliqués à toutes les solutions, y compris
            à Facturance Plus.
          </li>
          <li className="leading-7 text-muted-foreground">
            Les tarifs sont repris dans le format publié par l’éditeur — mensuel
            ou annuel, HT ou TTC — sans recalcul de notre part.
          </li>
          <li className="leading-7 text-muted-foreground">
            Aucune note, aucun score et aucun classement ne sont attribués.
          </li>
          <li className="leading-7 text-muted-foreground">
            Les solutions retenues sont des outils de facturation ou de gestion
            commerciale actifs et vérifiables en Tunisie, qui publient
            suffisamment d’informations pour être comparés. Aucune n’a été
            ajoutée ni écartée pour avantager Facturance Plus.
          </li>
          <li className="leading-7 text-muted-foreground">
            Les tarifs mensuels et annuels ne sont pas convertis les uns dans
            les autres, et la mention HT ou TTC est reprise telle que l’éditeur
            la publie — ou signalée comme absente lorsqu’elle ne l’est pas.
          </li>
          <li className="leading-7 text-muted-foreground">
            L’absence d’une information sur un site n’est jamais interprétée
            comme l’absence de la fonctionnalité correspondante.
          </li>
          <li className="leading-7 text-muted-foreground">
            Les sources utilisées sont listées en bas de page.
          </li>
        </ul>

        <div className="mt-6 max-w-3xl rounded-xl border border-blue-100/80 bg-blue-50/60 p-5">
          <p className="text-sm leading-6 text-[#0b294d]">
            <strong className="font-bold">« Non communiqué »</strong> signifie
            que nous n’avons pas trouvé cette information sur les pages
            publiques consultées. Cela ne signifie pas nécessairement que la
            fonctionnalité n’existe pas.
          </p>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="lecture-title">
        <h2
          id="lecture-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Comment lire ce comparatif
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Les tableaux utilisent quatre valeurs seulement. Elles portent sur ce
          que l’éditeur documente publiquement, pas sur la qualité de la
          solution.
        </p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-blue-100/80 bg-white p-4">
            <dt className="flex items-center gap-1.5 text-sm font-bold text-emerald-700">
              <Check className="size-4 shrink-0" aria-hidden="true" />
              Oui
            </dt>
            <dd className="mt-1.5 text-sm leading-6 text-muted-foreground">
              La capacité est explicitement décrite par l’éditeur, ou vérifiée
              dans l’application pour Facturance Plus.
            </dd>
          </div>
          <div className="rounded-xl border border-blue-100/80 bg-white p-4">
            <dt className="text-sm font-bold text-[#0b294d]">Partiel</dt>
            <dd className="mt-1.5 text-sm leading-6 text-muted-foreground">
              La capacité est annoncée, mais avec une réserve explicite : une
              étape qui reste à votre charge, ou une affirmation de l’éditeur
              que nous n’avons pas pu recouper.
            </dd>
          </div>
          <div className="rounded-xl border border-blue-100/80 bg-white p-4">
            <dt className="flex items-center gap-1.5 text-sm font-bold text-[#0b294d]">
              <Minus className="size-4 shrink-0" aria-hidden="true" />
              Non
            </dt>
            <dd className="mt-1.5 text-sm leading-6 text-muted-foreground">
              L’absence est établie : l’éditeur l’indique, ou nous la
              constatons directement. Cette valeur est rare et n’est jamais
              utilisée par défaut.
            </dd>
          </div>
          <div className="rounded-xl border border-blue-100/80 bg-white p-4">
            <dt className="text-sm font-bold text-muted-foreground">
              Non communiqué
            </dt>
            <dd className="mt-1.5 text-sm leading-6 text-muted-foreground">
              L’information n’a pas été trouvée sur les pages publiques
              consultées. <strong className="font-semibold text-[#0b294d]">Ce
              n’est pas un « non »</strong> : la fonctionnalité peut exister
              sans être documentée. Posez la question à l’éditeur.
            </dd>
          </div>
        </dl>

        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground">
          Les tarifs demandent la même prudence. Selon l’éditeur, ils
          s’entendent au mois ou à l’année, hors taxes ou toutes taxes
          comprises, et peuvent dépendre du nombre d’utilisateurs, du nombre
          d’entreprises gérées ou des modules activés. Un tarif d’entrée ne dit
          pas ce que coûtera votre configuration réelle.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="differences-title">
        <h2
          id="differences-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Les différences principales
        </h2>
        <ul className="mt-5 grid max-w-3xl gap-2 pl-5 marker:text-primary [&>li]:list-disc">
          <li className="leading-7 text-muted-foreground">
            La quasi-totalité des solutions comparées sont des applications Web.
            Une seule propose aussi une application Windows utilisable hors
            ligne.
          </li>
          <li className="leading-7 text-muted-foreground">
            Le périmètre varie fortement : de l’émission de documents seule
            jusqu’à l’ERP complet avec paie et CRM.
          </li>
          <li className="leading-7 text-muted-foreground">
            La facturation électronique est le critère où les écarts sont les
            plus marqués, et où les formulations des éditeurs demandent le plus
            d’attention.
          </li>
          <li className="leading-7 text-muted-foreground">
            Les tarifs ne sont pas comparables tels quels : certains sont
            mensuels, d’autres annuels, certains HT et d’autres TTC.
          </li>
          <li className="leading-7 text-muted-foreground">
            La gestion de stock et le multi-dépôt séparent nettement les
            solutions de facturation des solutions de gestion commerciale.
          </li>
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="tableau-title">
        <h2
          id="tableau-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Tableau comparatif
        </h2>
        <p className="mt-3 text-sm text-muted-foreground lg:hidden">
          Faites défiler le tableau horizontalement pour voir toutes les
          solutions.
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-blue-100/80 bg-white">
          <table className="w-full min-w-[56rem] border-collapse text-left">
            <caption className="sr-only">
              Comparatif des logiciels de facturation disponibles en Tunisie,
              informations vérifiées le {CHECKED_AT}
            </caption>
            <thead>
              <tr className="border-b border-blue-100/80">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-white px-4 py-4 text-sm font-bold text-[#0b294d]"
                >
                  Critère
                </th>
                {products.map((product) => (
                  <th
                    key={product.id}
                    scope="col"
                    className="px-4 py-4 text-sm font-bold text-[#0b294d]"
                  >
                    {product.name}
                    {product.isPublisher ? (
                      <span className="mt-1 block text-[0.6875rem] font-medium uppercase tracking-wide text-primary">
                        Notre solution
                      </span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-100/60">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-white px-4 py-4 text-sm font-semibold text-[#0b294d]"
                >
                  Prix affiché
                </th>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="px-4 py-4 text-sm leading-6 text-muted-foreground"
                  >
                    {product.pricing}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-blue-100/60">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-white px-4 py-4 text-sm font-semibold text-[#0b294d]"
                >
                  Essai gratuit
                </th>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="px-4 py-4 text-sm leading-6 text-muted-foreground"
                  >
                    {product.trial}
                  </td>
                ))}
              </tr>

              {criteria.map((criterion) => (
                <tr key={criterion.id} className="border-b border-blue-100/60">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-4 py-4 text-sm font-semibold text-[#0b294d]"
                  >
                    {criterion.label}
                  </th>
                  {products.map((product) => (
                    <td key={product.id} className="px-4 py-4">
                      <VerdictCell verdict={product.values[criterion.id]} />
                    </td>
                  ))}
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Tarifs et fonctionnalités relevés le {CHECKED_AT}. La facturation
          électronique fait l’objet du tableau détaillé ci-dessous, parce
          qu’elle recouvre quatre étapes distinctes.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="electronique-title">
        <h2
          id="electronique-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Facturation électronique : lisez les formulations de près
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          C’est le point sur lequel les annonces se ressemblent le plus alors
          que les réalités techniques diffèrent. Plusieurs choses distinctes
          sont souvent résumées par la même expression :
        </p>
        <ul className="mt-5 grid max-w-3xl gap-2 pl-5 marker:text-primary [&>li]:list-disc">
          <li className="leading-7 text-muted-foreground">
            <strong className="font-semibold text-[#0b294d]">
              Générer un fichier TEIF
            </strong>{" "}
            — produire le XML au format attendu, que vous déposez ensuite
            vous-même.
          </li>
          <li className="leading-7 text-muted-foreground">
            <strong className="font-semibold text-[#0b294d]">
              Signer électroniquement
            </strong>{" "}
            — apposer une signature au moyen d’un certificat, qui reste à votre
            charge.
          </li>
          <li className="leading-7 text-muted-foreground">
            <strong className="font-semibold text-[#0b294d]">
              Transmettre à TTN
            </strong>{" "}
            — envoyer la facture à la plateforme, parfois avec vos propres accès
            après enrôlement, parfois de bout en bout.
          </li>
          <li className="leading-7 text-muted-foreground">
            <strong className="font-semibold text-[#0b294d]">
              Être homologué ou certifié
            </strong>{" "}
            — une reconnaissance officielle, qui ne découle pas des trois points
            précédents.
          </li>
        </ul>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-blue-100/80 bg-white">
          <table className="w-full min-w-[56rem] border-collapse text-left">
            <caption className="sr-only">
              Étapes de la facturation électronique couvertes par chaque
              solution, informations vérifiées le {CHECKED_AT}
            </caption>
            <thead>
              <tr className="border-b border-blue-100/80">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-white px-4 py-4 text-sm font-bold text-[#0b294d]"
                >
                  Étape
                </th>
                {products.map((product) => (
                  <th
                    key={product.id}
                    scope="col"
                    className="px-4 py-4 text-sm font-bold text-[#0b294d]"
                  >
                    {product.name}
                    {product.isPublisher ? (
                      <span className="mt-1 block text-[0.6875rem] font-medium uppercase tracking-wide text-primary">
                        Notre solution
                      </span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eInvoiceCriteria.map((criterion) => (
                <tr key={criterion.id} className="border-b border-blue-100/60">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-4 py-4 align-top text-sm font-semibold text-[#0b294d]"
                  >
                    {criterion.label}
                    <span className="mt-1 block text-xs font-normal leading-5 text-muted-foreground">
                      {criterion.help}
                    </span>
                  </th>
                  {products.map((product) => (
                    <td key={product.id} className="px-4 py-4 align-top">
                      <VerdictCell verdict={product.eInvoice[criterion.id]} />
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-white px-4 py-4 align-top text-sm font-semibold text-[#0b294d]"
                >
                  Ce qu’en dit l’éditeur
                </th>
                {products.map((product) => (
                  <td
                    key={product.id}
                    className="px-4 py-4 align-top text-sm leading-6 text-muted-foreground"
                  >
                    {product.electronicInvoice}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          « Partiel » couvre deux cas distincts, précisés dans la dernière
          ligne : une étape annoncée mais qui reste à votre charge, et une
          homologation revendiquée par l’éditeur que nous n’avons pas pu
          recouper auprès d’une source indépendante. Une certification
          mentionnée sur le site d’un éditeur reste une affirmation de cet
          éditeur.
        </p>

        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
          Demandez à chaque éditeur lequel de ces quatre niveaux il couvre
          réellement, et ce qui reste à votre charge. Notre article{" "}
          <Link
            href="/blog/facture-electronique-tunisie-2026"
            className="font-semibold text-primary hover:underline"
          >
            facture électronique en Tunisie : guide pratique
          </Link>{" "}
          détaille ces distinctions, et les{" "}
          <Link
            href="/blog/facture-electronique-tunisie-erreurs-2026"
            className="font-semibold text-primary hover:underline"
          >
            dix erreurs à éviter
          </Link>{" "}
          couvrent la préparation en amont. Le périmètre, le calendrier et les
          modalités relèvent des dispositifs officiels : vérifiez ce qui
          s’applique à votre entreprise auprès des sources officielles
          tunisiennes ou de votre conseiller comptable.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="solutions-title">
        <h2
          id="solutions-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Les solutions en détail
        </h2>

        <div className="mt-6 grid gap-5">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border border-blue-100/80 bg-white p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-xl font-bold tracking-tight text-[#0b294d]">
                  {product.name}
                </h3>
                {product.isPublisher ? (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-primary">
                    Notre solution
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {product.focus}
              </p>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-[#f5f8fc] px-4 py-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#0b294d]/70">
                    Tarif affiché
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                    {product.pricing}
                  </dd>
                </div>
                <div className="rounded-xl bg-[#f5f8fc] px-4 py-3">
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#0b294d]/70">
                    Essai
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                    {product.trial}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-bold text-[#0b294d]">
                    Points notables
                  </p>
                  <ul className="mt-2 grid gap-1.5 pl-5 marker:text-primary [&>li]:list-disc">
                    {product.strengths.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-6 text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0b294d]">
                    Limites ou informations manquantes
                  </p>
                  <ul className="mt-2 grid gap-1.5 pl-5 marker:text-primary [&>li]:list-disc">
                    {product.limits.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-6 text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                <strong className="font-semibold text-[#0b294d]">
                  Facturation électronique :
                </strong>{" "}
                {product.electronicInvoice}
              </p>

              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {product.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                  >
                    {source.label}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                ))}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="besoin-title">
        <h2
          id="besoin-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Quel logiciel choisir selon votre besoin ?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Les regroupements ci-dessous reprennent uniquement les capacités
          vérifiées plus haut. Ce ne sont pas des recommandations classées :
          plusieurs solutions peuvent convenir au même besoin.
        </p>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {[
            {
              title: "Vous avez besoin d’un logiciel Windows",
              body: "Facturance Plus est la seule solution comparée à publier une application de bureau Windows. Aucune des autres pages consultées ne mentionne de version installée : ce point est donc à vérifier directement auprès des éditeurs concernés.",
            },
            {
              title: "Vous préférez une solution 100 % Web",
              body: "Toutes les solutions comparées proposent un accès par navigateur. Le choix se fera alors sur le périmètre fonctionnel et le tarif plutôt que sur le mode d’accès.",
            },
            {
              title: "Vous travaillez parfois sans connexion",
              body: "Facturance Plus fonctionne hors ligne dans son mode Local uniquement. Swifto annonce des applications mobiles terrain utilisables hors ligne puis synchronisées. Pour les autres, l’information n’est pas publiée.",
            },
            {
              title: "Vous gérez du stock",
              body: "Facturance Plus, Swiver, Hesabi, Iberis, Finco et Swifto annoncent une gestion d’articles et de stock. Le multi-dépôt est explicitement mentionné par Facturance Plus, Swiver, Finco et Swifto. Clic2Up ne mentionne pas de gestion de stock.",
            },
            {
              title: "Vous gérez plusieurs entreprises",
              body: "Facturance Plus permet de rattacher plusieurs entreprises à un même compte, et Hesabi propose une offre Cabinet multi-dossiers destinée aux experts-comptables. Pour les autres solutions, l’information n’est pas publiée sur les pages consultées.",
            },
            {
              title: "Vous cherchez une solution avec comptabilité ou paie",
              body: "Hesabi annonce comptabilité et paie, et Swifto annonce paie et RH. Facturance Plus ne propose ni comptabilité ni paie : ces besoins supposent une autre solution ou un outil complémentaire.",
            },
            {
              title: "Vous avez besoin d’une caisse (POS)",
              body: "Swiver, Hesabi et Swifto annoncent un module de caisse. Facturance Plus n’en propose pas.",
            },
            {
              title: "La facture électronique est votre priorité",
              body: "Swiver et Clic2Up décrivent publiquement la chaîne complète : TEIF, signature et transmission à TTN. Hesabi annonce la génération TEIF, le dépôt restant effectué avec les accès de l’entreprise après enrôlement. Facturance Plus génère et signe le fichier TEIF depuis son application Windows, mais ne le transmet pas à El Fatoora. Finco revendique une homologation ANCE ; Iberis et Swifto mentionnent El Fatoora sans détail technique. Si la transmission depuis le logiciel est déterminante pour vous, ce critère réduit nettement la liste.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-blue-100/80 bg-white p-5"
            >
              <h3 className="text-base font-bold text-[#0b294d]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="faq-title">
        <h2
          id="faq-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Questions fréquentes
        </h2>

        <dl className="mt-6 grid gap-4 lg:grid-cols-2">
          {[
            {
              question: "Quel logiciel de facturation choisir en Tunisie ?",
              answer:
                "Il n’y a pas de réponse unique. Commencez par lister ce que vous devez gérer — documents seuls, stock, caisse, comptabilité, facture électronique — puis éliminez les solutions dont le périmètre publié ne couvre pas ces besoins. Le tarif ne départage utilement que les solutions restantes.",
            },
            {
              question:
                "Existe-t-il des logiciels de facturation gratuits en Tunisie ?",
              answer:
                "Iberis publie une offre gratuite permanente mais plafonnée en volume, et Finco une offre Découverte limitée en nombre de factures. Les autres solutions comparées proposent des essais de 14 à 15 jours, ou un premier mois offert.",
            },
            {
              question:
                "Quelle différence entre logiciel de facturation et logiciel de gestion commerciale ?",
              answer:
                "La facturation couvre l’émission des documents. La gestion commerciale y ajoute les fiches clients et fournisseurs, le catalogue, le stock et le suivi des règlements. Nous détaillons cette distinction sur notre page dédiée à la gestion commerciale.",
            },
            {
              question:
                "Tous les logiciels gèrent-ils la facture électronique TTN ?",
              answer:
                "Non, et les niveaux couverts diffèrent nettement. Générer un fichier TEIF, le signer et le transmettre à TTN sont trois étapes distinctes, et toutes les solutions ne les couvrent pas de la même façon. Demandez à chaque éditeur ce qui reste à votre charge.",
            },
            {
              question:
                "Peut-on utiliser un logiciel de facturation hors ligne ?",
              answer:
                "Rarement : la plupart des solutions comparées sont des applications Web qui supposent une connexion. Facturance Plus fonctionne hors ligne dans son mode Local uniquement, et Swifto annonce des applications mobiles terrain utilisables hors connexion.",
            },
            {
              question: "Quel logiciel choisir pour gérer le stock ?",
              answer:
                "Six des sept solutions comparées annoncent une gestion de stock. Si vous stockez à plusieurs endroits, regardez spécifiquement le multi-dépôt, qui n’est pas publié par tous les éditeurs.",
            },
            {
              question: "Faut-il choisir une version Web ou Windows ?",
              answer:
                "Cela dépend surtout de votre connexion et de votre mobilité. Une version Web ne demande aucune installation mais suppose une connexion ; une application installée continue de fonctionner sans réseau mais reste liée au poste.",
            },
            {
              question: "Peut-on changer de logiciel de facturation plus tard ?",
              answer:
                "C’est possible, mais la difficulté tient à la reprise de l’historique. Avant de vous engager, demandez sous quel format vos données peuvent être exportées si vous décidiez de partir.",
            },
            {
              question: "Les tarifs des logiciels sont-ils fixes ?",
              answer:
                "Non. Certains éditeurs facturent au mois, d’autres à l’année, certains par utilisateur et d’autres au forfait, et des promotions sont fréquentes. Les tarifs de ce comparatif sont ceux publiés à la date indiquée.",
            },
            {
              question:
                "Comment les informations de ce comparatif ont-elles été vérifiées ?",
              answer: `Chaque information provient des pages publiques de l’éditeur concerné, consultées le ${CHECKED_AT} et listées en bas de page. Lorsqu’une information n’y figurait pas, la mention « Non communiqué » est utilisée plutôt qu’une supposition.`,
            },
          ].map((faq) => (
            <div
              key={faq.question}
              className="rounded-xl border border-blue-100/80 bg-white p-5"
            >
              <dt className="text-base font-bold text-[#0b294d]">
                {faq.question}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-muted-foreground">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14" aria-labelledby="sources-title">
        <h2
          id="sources-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Sources et date de vérification
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Pages consultées le {CHECKED_AT}. Les liens ci-dessous renvoient vers
          les sites des éditeurs, qui restent la référence en cas d’écart avec
          ce tableau.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-blue-100/80 bg-white p-5"
            >
              <p className="text-sm font-bold text-[#0b294d]">{product.name}</p>
              <ul className="mt-2 grid gap-1.5">
                {product.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      {source.label}
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="interne-title">
        <h2
          id="interne-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Pour aller plus loin
        </h2>
        <ul className="mt-5 grid max-w-3xl gap-2 pl-5 marker:text-primary [&>li]:list-disc">
          <li className="leading-7 text-muted-foreground">
            <Link
              href="/logiciel-facturation-tunisie"
              className="font-semibold text-primary hover:underline"
            >
              Logiciel de facturation en Tunisie
            </Link>{" "}
            — ce que couvre un outil de facturation.
          </li>
          <li className="leading-7 text-muted-foreground">
            <Link
              href="/logiciel-gestion-commerciale-tunisie"
              className="font-semibold text-primary hover:underline"
            >
              Logiciel de gestion commerciale en Tunisie
            </Link>{" "}
            — le périmètre élargi aux tiers, au catalogue et aux règlements.
          </li>
          <li className="leading-7 text-muted-foreground">
            <Link
              href="/logiciel-gestion-stock-tunisie"
              className="font-semibold text-primary hover:underline"
            >
              Logiciel de gestion de stock en Tunisie
            </Link>{" "}
            — articles, dépôts, seuils et alertes.
          </li>
          <li className="leading-7 text-muted-foreground">
            <Link
              href="/pricing"
              className="font-semibold text-primary hover:underline"
            >
              Tarifs de Facturance Plus
            </Link>{" "}
            — le détail des modes et de la remise multi-entreprises.
          </li>
          <li className="leading-7 text-muted-foreground">
            <Link
              href="/blog/logiciel-facturation-ou-excel"
              className="font-semibold text-primary hover:underline"
            >
              Logiciel de facturation ou Excel
            </Link>{" "}
            — si vous hésitez encore à quitter le tableur.
          </li>
          <li className="leading-7 text-muted-foreground">
            <Link
              href="/blog/logiciel-facturation-local-web-synchronise-tunisie"
              className="font-semibold text-primary hover:underline"
            >
              Local, web ou synchronisé
            </Link>{" "}
            — comment trancher sur le mode de fonctionnement.
          </li>
        </ul>
      </section>

      <section
        className="mt-14 overflow-hidden rounded-2xl bg-[#0b294d] px-6 py-10 text-center sm:px-10"
        aria-labelledby="tester-title"
      >
        <h2
          id="tester-title"
          className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          Tester Facturance Plus
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-blue-100">
          Si les fonctionnalités de Facturance Plus correspondent à vos besoins,
          vous pouvez tester l’application gratuitement avant de choisir. Si
          vous avez besoin que le logiciel transmette lui-même vos factures à
          El Fatoora, d’autres solutions de ce comparatif documentent cette
          étape, que Facturance Plus ne couvre pas.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="h-11 bg-white px-6 text-[#0b294d] hover:bg-blue-50"
          >
            <a href={CLIENT_SIGNUP_URL}>Démarrer l’essai gratuit</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 border-white/40 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/features">Découvrir les fonctionnalités</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
