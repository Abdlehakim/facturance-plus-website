import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Building2,
  ChevronRight,
  FileText,
  Globe,
  MonitorDown,
  RefreshCw,
  UserRoundCheck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicSiteConfig } from "@/lib/public-site-config";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

const PATH = "/logiciel-gestion-commerciale-tunisie";

export const metadata: Metadata = buildPageMetadata({
  title: "Logiciel de gestion commerciale en Tunisie",
  description:
    "Centralisez factures, devis, clients, fournisseurs, articles, stocks et paiements avec Facturance Plus, logiciel de gestion commerciale pour les entreprises en Tunisie.",
  path: PATH,
});

/**
 * Second SEO landing page, on the broader commercial-management query.
 *
 * Deliberately distinct from /logiciel-facturation-tunisie, which answers the
 * invoicing query: that page walks through the documents one by one, this one
 * is about centralising a whole commercial cycle - tiers, catalogue, stock,
 * encaissements and décaissements - in a single place. Every capability named
 * here exists in the application.
 */

const centralisationAreas: {
  id: string;
  title: string;
  icon: LucideIcon;
  paragraphs: string[];
  points: string[];
}[] = [
  {
    id: "documents",
    title: "Centralisez vos documents commerciaux",
    icon: FileText,
    paragraphs: [
      "Une vente laisse rarement un seul document derrière elle. Il y a la proposition, la commande confirmée, la livraison, puis la facture — et c’est l’absence de lien entre ces quatre pièces qui rend un dossier difficile à reconstituer six mois plus tard.",
      "Facturance Plus produit les quatre depuis les mêmes fiches : devis, bons de commande, bons de livraison et factures, auxquels s’ajoutent les avoirs. Chaque type a sa propre série de numérotation, attribuée par l’application et non retenue de tête.",
    ],
    points: [
      "Devis, bons de commande, bons de livraison, factures et avoirs",
      "Modèles de document réutilisables d’une vente à l’autre",
      "Export PDF et envoi du document par e-mail",
    ],
  },
  {
    id: "tiers",
    title: "Gérez vos clients et fournisseurs depuis un même espace",
    icon: UserRoundCheck,
    paragraphs: [
      "Dans beaucoup d’entreprises, les coordonnées d’un client existent à trois endroits : un fichier, une boîte mail et la mémoire de la personne qui a conclu la vente. Dès qu’une adresse change, deux des trois deviennent faux.",
      "Les fiches clients, fournisseurs et transporteurs sont ici la source unique de ces informations. Elles alimentent les documents que vous émettez, et les champs de fiche peuvent être adaptés à ce que votre activité demande réellement.",
    ],
    points: [
      "Fiches clients, fournisseurs et transporteurs",
      "Champs de fiche configurables selon votre activité",
      "Historique des documents rattaché à chaque tiers",
    ],
  },
  {
    id: "articles",
    title: "Organisez vos articles et votre stock",
    icon: Boxes,
    paragraphs: [
      "Le catalogue est le deuxième pilier d’une gestion commerciale : sans désignations et sans prix fiables, chaque document redevient un exercice de saisie. Articles et services sont tenus dans l’application et repris directement par les documents.",
      "Les mouvements de stock découlent de l’activité enregistrée plutôt que d’une saisie parallèle que quelqu’un doit penser à faire — c’est la différence entre un stock théorique et un stock qu’on peut utiliser pour décider.",
    ],
    points: [
      "Catalogue d’articles et de services",
      "Gestion par dépôt ou magasin",
      "Seuils et alertes paramétrables par article",
    ],
  },
  {
    id: "paiements",
    title: "Suivez les paiements clients et fournisseurs",
    icon: Wallet,
    paragraphs: [
      "Émettre une facture n’est pas encaisser. L’écart entre les deux est ce qui met une entreprise rentable en difficulté, et il ne se voit que si les règlements sont rattachés aux documents qu’ils soldent.",
      "Facturance Plus suit les paiements clients et les paiements fournisseurs, y compris partiels, avec une vue trésorerie et le suivi des charges. Vous savez ce qui est encaissé, ce qui reste dû et ce qui doit sortir.",
    ],
    points: [
      "Encaissements clients et règlements fournisseurs",
      "Paiements partiels et annulation d’un règlement",
      "Suivi des charges et vue trésorerie",
    ],
  },
];

const strengths: { title: string; detail: string; icon: LucideIcon }[] = [
  {
    title: "Tout le cycle commercial",
    detail:
      "Devis, commandes, livraisons, factures et avoirs produits depuis les mêmes fiches.",
    icon: FileText,
  },
  {
    title: "Tiers et catalogue",
    detail:
      "Clients, fournisseurs, transporteurs, articles et services tenus à un seul endroit.",
    icon: UserRoundCheck,
  },
  {
    title: "Stock par dépôt",
    detail:
      "Articles, dépôts et seuils suivis séparément pour chaque entreprise du compte.",
    icon: Boxes,
  },
  {
    title: "Encaissements et sorties",
    detail:
      "Paiements clients, règlements fournisseurs, charges et vue trésorerie.",
    icon: Wallet,
  },
  {
    title: "Plusieurs entreprises",
    detail:
      "Chaque entité conserve ses documents, ses tiers, ses articles et sa numérotation.",
    icon: Building2,
  },
  {
    title: "Windows et navigateur",
    detail:
      "Application de bureau sur Windows 10 et 11, ou Version web sans installation.",
    icon: RefreshCw,
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Qu’est-ce qu’un logiciel de gestion commerciale ?",
    answer:
      "C’est une application qui réunit les opérations commerciales d’une entreprise — documents de vente, clients, fournisseurs, articles, stocks et règlements — dans un même environnement, au lieu de les répartir entre plusieurs fichiers sans lien entre eux.",
  },
  {
    question:
      "Quelle est la différence entre facturation et gestion commerciale ?",
    answer:
      "La facturation ne couvre que l’émission des factures. La gestion commerciale englobe tout ce qui gravite autour : la proposition commerciale, la commande, la livraison, les fiches des tiers, le catalogue, le stock et le suivi des règlements. La facture en est l’aboutissement, pas le périmètre.",
  },
  {
    question: "Un logiciel de gestion commerciale peut-il remplacer Excel ?",
    answer:
      "Pour une activité à faible volume avec un seul utilisateur, un tableur bien tenu suffit souvent. Il devient coûteux dès que plusieurs personnes produisent des documents, que le stock compte ou que les informations sont recopiées d’un fichier à l’autre.",
  },
  {
    question:
      "Peut-on gérer les clients et les fournisseurs avec Facturance Plus ?",
    answer:
      "Oui. Les fiches clients, fournisseurs et transporteurs sont tenues dans l’application et alimentent directement les documents émis, avec des champs adaptables à votre activité.",
  },
  {
    question: "Peut-on gérer les articles et le stock ?",
    answer:
      "Oui. Le catalogue d’articles et de services, la gestion par dépôt ou magasin et les seuils paramétrables par article font partie de l’application, séparément pour chaque entreprise du compte.",
  },
  {
    question: "Facturance Plus permet-il de suivre les paiements ?",
    answer:
      "Oui, pour les encaissements clients comme pour les règlements fournisseurs, y compris lorsqu’ils sont partiels. Les charges et une vue trésorerie complètent ce suivi.",
  },
  {
    question: "Facturance Plus fonctionne-t-il sur Windows ?",
    answer:
      "Oui. L’application de bureau fonctionne sur Windows 10 et Windows 11 en 64 bits, soit en mode Local uniquement, soit en mode Local + serveur avec synchronisation.",
  },
  {
    question: "Existe-t-il une version Web ?",
    answer:
      "Oui. La Version web s’utilise depuis un navigateur, sans installation sur le poste, avec les données hébergées sur le serveur Facturance.",
  },
  {
    question: "Un logiciel de gestion commerciale convient-il aux PME ?",
    answer:
      "C’est précisément le cas d’usage le plus fréquent : une structure assez grande pour que l’information se disperse entre plusieurs fichiers et plusieurs personnes, mais pas assez pour s’offrir un système lourd à déployer.",
  },
  {
    question: "Peut-on gérer plusieurs entreprises ?",
    answer:
      "Oui. Un même compte peut rattacher plusieurs entreprises, chacune conservant ses propres documents, tiers, articles, stocks et séries de numérotation. Une remise s’applique à partir de trois entreprises.",
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
          { "@type": "ListItem", position: 1, name: "Accueil", item: homeUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Logiciel de gestion commerciale en Tunisie",
            item: pageUrl,
          },
        ],
      },
      {
        // A reference to the product entity the homepage already defines, not a
        // second SoftwareApplication: same @id, so this page describes it
        // rather than declaring a competing copy with its own offers.
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: "Logiciel de gestion commerciale en Tunisie",
        inLanguage: "fr",
        isPartOf: { "@id": `${homeUrl}#organization` },
        about: { "@id": `${homeUrl}#software-application` },
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

export default function LogicielGestionCommercialeTunisiePage() {
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
          <li aria-current="page">Logiciel de gestion commerciale en Tunisie</li>
        </ol>
      </nav>

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          GESTION COMMERCIALE
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl lg:text-5xl">
          Logiciel de gestion commerciale en Tunisie pour centraliser votre
          activité
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          Quand les devis sont dans un traitement de texte, les règlements dans
          un tableur et le stock dans un troisième fichier, le suivi commercial
          devient un travail de recoupement. Un logiciel de gestion commerciale
          réunit ces opérations dans un même environnement, à partir des mêmes
          fiches.
        </p>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Facturance Plus couvre le cycle complet : documents de vente, clients
          et fournisseurs, articles et stocks, encaissements et règlements, pour
          une ou plusieurs entreprises rattachées au même compte.
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

      <section className="mt-14" aria-labelledby="definition-title">
        <h2
          id="definition-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Qu’est-ce qu’un logiciel de gestion commerciale ?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          C’est l’outil qui tient l’ensemble de l’activité commerciale, et non
          une seule de ses étapes. Là où un outil de facturation s’arrête à
          l’émission du document, la gestion commerciale couvre ce qui le
          précède et ce qui le suit : la proposition, la commande, la livraison,
          les fiches des tiers, le catalogue, le stock et les règlements.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          La différence pratique tient en une question : combien de fichiers
          devez-vous ouvrir pour savoir ce qu’un client vous doit, ce qu’il a
          commandé et ce qu’il vous reste en stock ? Si la réponse est « trois »,
          c’est de centralisation qu’il s’agit, pas d’un problème de facturation.
          Si votre besoin se limite effectivement aux factures, notre page
          dédiée au{" "}
          <Link
            href="/logiciel-facturation-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            logiciel de facturation en Tunisie
          </Link>{" "}
          traite ce périmètre plus restreint.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100/80 bg-white p-3 shadow-[0_18px_50px_rgba(11,41,77,0.09)] sm:p-4">
          <Image
            src="/facturance-plus-hero.webp"
            alt="Interface de gestion commerciale Facturance Plus affichée sur un écran de bureau"
            width={1672}
            height={941}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>
      </section>

      {centralisationAreas.map(
        ({ id, title, icon: Icon, paragraphs, points }) => (
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
        ),
      )}

      <section className="mt-14" aria-labelledby="excel-title">
        <h2
          id="excel-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Pourquoi remplacer Excel et les fichiers dispersés ?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Le tableur n’est pas un mauvais outil — c’est souvent le bon choix au
          démarrage. Il devient coûteux quand l’activité grandit, et le coût est
          rarement visible parce qu’il se paie en heures plutôt qu’en facture.
        </p>

        <ul className="mt-5 grid max-w-3xl gap-2 pl-5 marker:text-primary [&>li]:list-disc">
          <li className="leading-7 text-muted-foreground">
            La même information existe dans plusieurs fichiers, et une seule des
            copies est à jour.
          </li>
          <li className="leading-7 text-muted-foreground">
            Personne ne sait quelle version fait foi après quelques mois de
            duplications.
          </li>
          <li className="leading-7 text-muted-foreground">
            Une formule cassée ne prévient pas : le total reste affiché, il est
            simplement faux.
          </li>
          <li className="leading-7 text-muted-foreground">
            La numérotation tenue à la main produit des doublons dès que deux
            personnes émettent des documents.
          </li>
          <li className="leading-7 text-muted-foreground">
            Le rapprochement des règlements se fait de plus en plus tard, puis
            plus du tout.
          </li>
        </ul>

        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
          Nous comparons les deux approches critère par critère, sans partir du
          principe que le tableur a toujours tort, dans notre article{" "}
          <Link
            href="/blog/logiciel-facturation-ou-excel"
            className="font-semibold text-primary hover:underline"
          >
            logiciel de facturation ou Excel
          </Link>
          . Côté stock, nos{" "}
          <Link
            href="/blog/gestion-stock-bonnes-pratiques"
            className="font-semibold text-primary hover:underline"
          >
            sept bonnes pratiques de gestion de stock
          </Link>{" "}
          détaillent ce qu’un outil ne décide pas à votre place.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="modes-title">
        <h2
          id="modes-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Gestion commerciale locale, Web ou synchronisée
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          La question qui tranche le plus souvent n’est pas fonctionnelle mais
          pratique : que se passe-t-il si la connexion tombe en pleine journée ?
          Facturance Plus propose trois modes pour cette raison.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-3">
          {[
            {
              icon: MonitorDown,
              title: "Local uniquement",
              detail:
                "Les données restent sur le poste, sans synchronisation. L’application fonctionne même sans connexion.",
            },
            {
              icon: Globe,
              title: "Version web",
              detail:
                "Accès depuis un navigateur, sans installation, avec les données hébergées sur le serveur Facturance.",
            },
            {
              icon: RefreshCw,
              title: "Local + serveur",
              detail:
                "Travail local et synchronisation avec le serveur, avec l’espace client web en complément.",
            },
          ].map(({ icon: Icon, title, detail }) => (
            <Card
              key={title}
              className="h-full max-w-none gap-3 border-blue-100/80"
            >
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
          Le profil d’entreprise auquel chaque mode convient est comparé en
          détail dans notre article{" "}
          <Link
            href="/blog/logiciel-facturation-local-web-synchronise-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            local, web ou synchronisé
          </Link>
          .
        </p>
      </section>

      <section className="mt-14" aria-labelledby="pme-title">
        <h2
          id="pme-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Une solution adaptée aux PME en Tunisie
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Une TPE ou une PME n’a pas les mêmes contraintes qu’un groupe : pas de
          service informatique, pas de projet de déploiement sur six mois, et
          souvent une même personne qui prépare les devis, suit les livraisons et
          relance les impayés. Ce qu’elle cherche, c’est de la visibilité et
          moins de ressaisie, pas un système à administrer.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Beaucoup de dirigeants gèrent par ailleurs plusieurs entités. Chaque
          entreprise rattachée au compte conserve alors ses propres documents,
          ses tiers, ses articles, son stock et sa numérotation — c’est la
          séparation qui compte autant que la centralisation, et nous la
          détaillons dans notre article sur la{" "}
          <Link
            href="/blog/logiciel-gestion-multi-entreprise"
            className="font-semibold text-primary hover:underline"
          >
            gestion de plusieurs entreprises avec un seul logiciel
          </Link>
          .
        </p>
      </section>

      <section className="mt-14" aria-labelledby="pourquoi-title">
        <h2
          id="pourquoi-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Pourquoi choisir Facturance Plus pour votre gestion commerciale ?
        </h2>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map(({ title, detail, icon: Icon }) => (
            <Card
              key={title}
              className="h-full max-w-none gap-3 border-blue-100/80"
            >
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
          Le détail complet figure sur la page des{" "}
          <Link
            href="/features"
            className="font-semibold text-primary hover:underline"
          >
            fonctionnalités de Facturance Plus
          </Link>
          , et les{" "}
          <Link
            href="/pricing"
            className="font-semibold text-primary hover:underline"
          >
            tarifs de Facturance Plus
          </Link>{" "}
          précisent les trois modes et la remise multi-entreprises.
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
          Découvrir Facturance Plus
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
