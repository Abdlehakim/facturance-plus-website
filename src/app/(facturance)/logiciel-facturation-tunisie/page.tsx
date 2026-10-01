import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ChevronRight,
  CreditCard,
  FileText,
  Globe,
  MonitorDown,
  ReceiptText,
  UserRoundCheck,
} from "lucide-react";

import { getStructuredPricingOffers } from "@/components/public-site/pricing-offers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicSiteConfig } from "@/lib/public-site-config";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

const PATH = "/logiciel-facturation-tunisie";

export const metadata: Metadata = buildPageMetadata({
  title: "Logiciel de facturation en Tunisie",
  description:
    "Découvrez Facturance Plus, logiciel de facturation et de gestion commerciale pour gérer factures, devis, clients, fournisseurs, articles, stocks et paiements en Tunisie.",
  path: PATH,
});

/**
 * Primary SEO landing page.
 *
 * Every capability described here is one the application actually ships, and
 * every figure comes from the pricing cards rather than being restated. The
 * regulatory paragraph deliberately asserts nothing about Tunisian law and
 * sends the reader to the dedicated articles instead.
 */

const workflowSections: {
  id: string;
  title: string;
  icon: LucideIcon;
  paragraphs: string[];
  points: string[];
}[] = [
  {
    id: "factures",
    title: "Créez et gérez vos factures",
    icon: ReceiptText,
    paragraphs: [
      "Une facture se prépare à partir des fiches que vous tenez déjà : le client, les articles, les prix. Vous n’avez pas à retaper une désignation ou une adresse d’un document à l’autre, ce qui supprime la première cause d’erreur sur une facture.",
      "La numérotation est attribuée par l’application, par type de document et par entreprise. C’est ce qui garantit une série continue, sans doublon, même lorsque plusieurs personnes émettent des documents le même jour.",
    ],
    points: [
      "Factures et avoirs, avec un numéro attribué automatiquement",
      "Export PDF et envoi du document par e-mail",
      "Historique consultable par exercice",
    ],
  },
  {
    id: "devis",
    title: "Préparez vos devis et vos documents commerciaux",
    icon: FileText,
    paragraphs: [
      "Facturance Plus couvre les quatre documents d’une vente : le devis que vous proposez, le bon de commande qui engage, le bon de livraison qui prouve la remise, et la facture qui demande le règlement.",
      "Comme ils partagent les mêmes fiches, les informations restent cohérentes d’une étape à la suivante. C’est ce chaînage qui permet de remonter d’une facture contestée jusqu’au devis accepté.",
    ],
    points: [
      "Devis, bons de commande et bons de livraison",
      "Séries de numérotation distinctes par type de document",
      "Modèles de document réutilisables",
    ],
  },
  {
    id: "clients",
    title: "Gérez vos clients et vos fournisseurs",
    icon: UserRoundCheck,
    paragraphs: [
      "Les fiches clients et fournisseurs sont la source unique des informations qui apparaissent sur vos documents : dénomination, identifiant fiscal, adresses, coordonnées. Vous les complétez une fois, et chaque document émis ensuite en hérite.",
      "C’est aussi ce qui rend l’historique exploitable : savoir ce qu’un client a commandé, ce qu’il a réglé et ce qui reste dû ne demande plus de recouper plusieurs fichiers.",
    ],
    points: [
      "Fiches clients, fournisseurs et transporteurs",
      "Champs de fiche configurables selon votre activité",
      "Historique des documents rattaché à chaque tiers",
    ],
  },
  {
    id: "stocks",
    title: "Suivez vos articles et vos stocks",
    icon: Boxes,
    paragraphs: [
      "Le catalogue d’articles alimente les documents commerciaux, et les mouvements de stock découlent de l’activité enregistrée plutôt que d’une saisie séparée que quelqu’un doit penser à faire.",
      "Les articles, les services et les dépôts sont tenus par entreprise : une marchandise appartient à l’entité qui l’a achetée et qui la vendra.",
    ],
    points: [
      "Catalogue d’articles et de services",
      "Gestion par dépôt ou magasin",
      "Seuils et alertes paramétrables par article",
    ],
  },
  {
    id: "paiements",
    title: "Suivez vos paiements",
    icon: CreditCard,
    paragraphs: [
      "Les règlements s’enregistrent sur les factures qu’ils soldent, y compris les paiements partiels. Vous voyez ce qui a été encaissé, ce qui reste dû et depuis quand, sans reconstituer l’information à partir d’un relevé bancaire et d’un tableur.",
      "C’est le point de départ d’un suivi de trésorerie fiable : la plupart des tensions d’une PME viennent du décalage entre les factures émises et les paiements réellement encaissés.",
    ],
    points: [
      "Encaissements clients et règlements fournisseurs",
      "Paiements partiels et annulation d’un règlement",
      "Échéances visibles sur les documents",
    ],
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Qu’est-ce qu’un logiciel de facturation ?",
    answer:
      "C’est une application qui produit vos documents commerciaux à partir de données structurées — clients, articles, prix — au lieu de les recomposer à chaque fois. Elle attribue les numéros, conserve l’historique et relie les documents entre eux, ce qu’un tableur ne fait pas.",
  },
  {
    question: "Pourquoi utiliser un logiciel de facturation en Tunisie ?",
    answer:
      "Les raisons sont les mêmes que partout : supprimer la ressaisie, garantir une numérotation continue, retrouver un document en quelques secondes et savoir qui vous doit combien. Les obligations fiscales, elles, dépendent de votre situation et se vérifient auprès des sources officielles ou de votre conseiller comptable.",
  },
  {
    question: "Peut-on gérer les devis avec Facturance Plus ?",
    answer:
      "Oui. Les devis font partie des documents pris en charge, au même titre que les bons de commande, les bons de livraison, les factures et les avoirs.",
  },
  {
    question:
      "Facturance Plus permet-il de gérer les clients et les fournisseurs ?",
    answer:
      "Oui. Les fiches clients, fournisseurs et transporteurs sont tenues dans l’application et alimentent directement les documents que vous émettez.",
  },
  {
    question: "Peut-on suivre les articles et le stock ?",
    answer:
      "Oui. Le catalogue d’articles et de services, les dépôts et les mouvements de stock sont gérés dans l’application, séparément pour chaque entreprise rattachée au compte.",
  },
  {
    question: "Comment suivre les paiements ?",
    answer:
      "Les règlements sont enregistrés sur les factures qu’ils soldent, y compris lorsqu’ils sont partiels. Vous consultez ainsi l’état réel de chaque facture plutôt qu’une liste de documents émis.",
  },
  {
    question: "Facturance Plus fonctionne-t-il sur le Web ?",
    answer:
      "Oui. La Version web s’utilise depuis un navigateur, sans installation sur le poste, et les données sont hébergées sur le serveur Facturance.",
  },
  {
    question: "Facturance Plus existe-t-il pour Windows ?",
    answer:
      "Oui. L’application de bureau fonctionne sur Windows 10 et Windows 11 en 64 bits, soit en mode Local uniquement, soit en mode Local + serveur avec synchronisation.",
  },
];

function StructuredData() {
  const pageUrl = absoluteUrl(PATH);
  const homeUrl = `${publicSiteConfig.siteUrl}/`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Logiciel de facturation en Tunisie",
            item: pageUrl,
          },
        ],
      },
      {
        // Same @id as the homepage graph: one product described on two pages,
        // not two competing entities.
        "@type": "SoftwareApplication",
        "@id": `${homeUrl}#software-application`,
        name: publicSiteConfig.brandName,
        url: homeUrl,
        description:
          "Logiciel de facturation et de gestion commerciale : factures, devis, bons de commande et de livraison, clients, fournisseurs, articles, stocks et paiements.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows 10, Windows 11, Web",
        inLanguage: "fr",
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        publisher: {
          "@type": "Organization",
          name: publicSiteConfig.publisherName,
          url: homeUrl,
        },
        // Read from the pricing cards rather than restated here.
        offers: getStructuredPricingOffers().map((offer) => ({
          "@type": "Offer",
          name: offer.name,
          price: String(offer.price),
          priceCurrency: offer.priceCurrency,
          url: absoluteUrl("/pricing"),
        })),
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

export default function LogicielFacturationTunisiePage() {
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
          <li aria-current="page">Logiciel de facturation en Tunisie</li>
        </ol>
      </nav>

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          FACTURATION ET GESTION COMMERCIALE
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl lg:text-5xl">
          Logiciel de facturation en Tunisie pour gérer votre entreprise
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          Facturance Plus réunit vos devis, factures, bons de commande et bons
          de livraison, vos fiches clients et fournisseurs, vos articles, vos
          stocks et vos règlements dans une seule application. Les informations
          sont saisies une fois et réutilisées partout, ce qui supprime la
          ressaisie et les écarts qu’elle produit.
        </p>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          L’application existe en version Windows et en version web, et un même
          compte peut gérer plusieurs entreprises, chacune avec ses propres
          documents et sa propre numérotation.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild className="h-11 px-6">
            <a href={CLIENT_SIGNUP_URL}>Démarrer l’essai gratuit</a>
          </Button>
          <Button asChild variant="outline" className="h-11 px-6">
            <Link href="/features">Découvrir les fonctionnalités</Link>
          </Button>
        </div>
      </header>

      <section className="mt-14" aria-labelledby="centraliser-title">
        <h2
          id="centraliser-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Centralisez votre facturation et votre gestion commerciale
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          La difficulté quotidienne d’une TPE ou d’une PME n’est pas d’émettre
          une facture : c’est de retrouver, six mois plus tard, le devis qui l’a
          précédée, de savoir si elle a été réglée, et d’avoir la certitude que
          le prix appliqué était le bon. Ces questions se règlent quand les
          documents, les tiers et les articles vivent au même endroit.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100/80 bg-white p-3 shadow-[0_18px_50px_rgba(11,41,77,0.09)] sm:p-4">
          <Image
            src="/img-main-page.png"
            alt="Interface du logiciel de facturation Facturance Plus"
            width={1350}
            height={875}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>
      </section>

      {workflowSections.map(({ id, title, icon: Icon, paragraphs, points }) => (
        <section key={id} className="mt-14" aria-labelledby={`${id}-title`}>
          <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </span>

          <h2
            id={`${id}-title`}
            className="mt-4 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
          >
            {title}
          </h2>

          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}

          <ul className="mt-5 grid max-w-3xl gap-2 pl-5 marker:text-primary [&>li]:list-disc">
            {points.map((point) => (
              <li key={point} className="leading-7 text-muted-foreground">
                {point}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-14" aria-labelledby="tunisie-title">
        <h2
          id="tunisie-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Une solution adaptée aux entreprises en Tunisie
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Toutes les entreprises ne travaillent pas dans les mêmes conditions,
          et la connexion internet pèse souvent plus lourd dans le choix d’un
          outil que la liste de ses fonctionnalités. Facturance Plus propose
          trois modes de fonctionnement pour cette raison.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-3">
          {[
            {
              icon: MonitorDown,
              title: "Local uniquement",
              detail:
                "Les données restent sur votre poste, sans synchronisation. L’application continue de fonctionner si la connexion tombe.",
            },
            {
              icon: Globe,
              title: "Version web",
              detail:
                "L’application s’utilise depuis un navigateur, sans installation, avec les données hébergées sur le serveur Facturance.",
            },
            {
              icon: ReceiptText,
              title: "Local + serveur",
              detail:
                "Le travail reste local et les données sont synchronisées avec le serveur, avec l’accès à l’espace client web en complément.",
            },
          ].map(({ icon: Icon, title, detail }) => (
            <Card key={title} className="h-full max-w-none gap-3 border-blue-100/80">
              <CardHeader>
                <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle>
                  <h3 className="leading-snug">{title}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {detail}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground">
          Le détail des trois modes, leurs contraintes et le profil d’entreprise
          auquel chacun convient sont comparés dans notre article{" "}
          <Link
            href="/blog/logiciel-facturation-local-web-synchronise-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            logiciel de facturation local, web ou synchronisé
          </Link>
          . Les tarifs, exprimés par entreprise et par mois, figurent sur la{" "}
          <Link
            href="/pricing"
            className="font-semibold text-primary hover:underline"
          >
            page des tarifs
          </Link>
          .
        </p>
      </section>

      <section className="mt-14" aria-labelledby="electronique-title">
        <h2
          id="electronique-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Facturation électronique en Tunisie
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          La facturation électronique prend une place croissante dans la
          digitalisation des échanges commerciaux en Tunisie. Son périmètre, son
          calendrier et ses modalités techniques relèvent des dispositifs
          officiels et peuvent évoluer : vérifiez ce qui s’applique à votre
          entreprise auprès des sources officielles tunisiennes ou de votre
          conseiller comptable.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Facturance Plus est un logiciel de facturation et de gestion
          commerciale. Il n’est ni une plateforme de transmission officielle, ni
          un dispositif homologué ou certifié pour l’échange réglementaire de
          factures électroniques, et aucun logiciel ne peut garantir à votre
          place la conformité fiscale de votre entreprise. Ce qu’il apporte, en
          revanche, est la matière première de toute démarche de ce type : des
          fiches structurées, une numérotation gérée par le système et un
          historique consultable.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            {
              href: "/blog/facture-electronique-tunisie-2026",
              label: "Facture électronique en Tunisie : guide pratique",
            },
            {
              href: "/blog/facture-electronique-tunisie-erreurs-2026",
              label: "Facture électronique : 10 erreurs à éviter",
            },
            {
              href: "/blog/mentions-obligatoires-facture-tunisie",
              label: "Les mentions à vérifier sur une facture",
            },
            {
              href: "/blog/facture-avoir-tunisie",
              label: "Facture d’avoir : corriger ou annuler une facture",
            },
            {
              href: "/blog/devis-bon-commande-bon-livraison-facture",
              label: "Devis, bon de commande, bon de livraison et facture",
            },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between gap-3 rounded-xl border border-blue-100/80 bg-white px-4 py-3 text-sm font-semibold text-[#0b294d] transition-colors hover:border-primary/30"
            >
              <span className="min-w-0">{label}</span>
              <ChevronRight
                className="size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="pourquoi-title">
        <h2
          id="pourquoi-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Pourquoi utiliser Facturance Plus ?
        </h2>
        <ul className="mt-5 grid max-w-3xl gap-2 pl-5 marker:text-primary [&>li]:list-disc">
          <li className="leading-7 text-muted-foreground">
            Les fiches clients, fournisseurs et articles sont saisies une fois
            et réutilisées par tous les documents.
          </li>
          <li className="leading-7 text-muted-foreground">
            La numérotation est attribuée par l’application, par type de
            document et par entreprise.
          </li>
          <li className="leading-7 text-muted-foreground">
            Les règlements, y compris partiels, sont rattachés aux factures
            qu’ils soldent.
          </li>
          <li className="leading-7 text-muted-foreground">
            Plusieurs entreprises se gèrent depuis un même compte, chacune avec
            ses propres documents, articles et stocks.
          </li>
          <li className="leading-7 text-muted-foreground">
            Trois modes de fonctionnement, pour s’adapter à votre connexion et à
            votre organisation.
          </li>
        </ul>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
          Si vous travaillez aujourd’hui sur tableur, notre comparaison{" "}
          <Link
            href="/blog/logiciel-facturation-ou-excel"
            className="font-semibold text-primary hover:underline"
          >
            logiciel de facturation ou Excel
          </Link>{" "}
          reprend les critères un par un, sans partir du principe que le tableur
          est toujours le mauvais choix.
        </p>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
          Si votre besoin dépasse l’émission des documents, la{" "}
          <Link
            href="/logiciel-gestion-commerciale-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            gestion commerciale
          </Link>{" "}
          couvre aussi les tiers, le catalogue et les règlements, et la page
          consacrée à la{" "}
          <Link
            href="/logiciel-gestion-stock-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            gestion des articles et du stock
          </Link>{" "}
          traite le suivi des quantités. Pour situer Facturance Plus parmi les
          autres solutions disponibles, voyez notre{" "}
          <Link
            href="/comparatif-logiciel-facturation-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            comparatif des logiciels de facturation en Tunisie
          </Link>
          .
        </p>
      </section>

      <section className="mt-14" aria-labelledby="faq-title">
        <h2
          id="faq-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Questions fréquentes
        </h2>

        <dl className="mt-6 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
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

      <section
        className="mt-14 overflow-hidden rounded-2xl bg-[#0b294d] px-6 py-10 text-center sm:px-10"
        aria-labelledby="decouvrir-title"
      >
        <h2
          id="decouvrir-title"
          className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          Découvrez Facturance Plus
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-blue-100">
          Créez votre compte et découvrez l’application pendant trois jours,
          sans engagement.
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
            <Link href="/contact">Poser une question</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
