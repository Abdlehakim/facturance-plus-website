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
  Package,
  RefreshCw,
  TriangleAlert,
  Warehouse,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicSiteConfig } from "@/lib/public-site-config";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

const PATH = "/logiciel-gestion-stock-tunisie";

export const metadata: Metadata = buildPageMetadata({
  title: "Logiciel de gestion de stock en Tunisie",
  description:
    "Gérez articles, stocks, dépôts, seuils et alertes avec Facturance Plus, logiciel de gestion de stock relié à vos documents commerciaux pour les entreprises en Tunisie.",
  path: PATH,
});

/**
 * Third SEO landing page, on the stock query.
 *
 * Every capability below was read off the application's own article record:
 * ref, product, desc, unit, stockQty, stockMin, stockMax, stockAlert,
 * allowNegative, blockInsufficient and a per-depot stock array, plus the depot
 * entity (code, name, address, emplacements). Depot-to-depot transfer is NOT
 * claimed - the "transfer" module in the app is file import/export, not
 * movement between warehouses.
 */

const stockSignals = [
  "Les quantités affichées ne correspondent plus à ce que vous trouvez en rayon.",
  "Le même article existe sous deux ou trois libellés différents.",
  "Vous découvrez une rupture au moment où un client commande.",
  "Les quantités vivent dans plusieurs fichiers, et aucun ne fait autorité.",
  "Aucun seuil n’est défini : rien ne signale qu’un article descend trop bas.",
];

const strengths: { title: string; detail: string; icon: LucideIcon }[] = [
  {
    title: "Fiches articles complètes",
    detail:
      "Référence, désignation, description et unité, avec prix d’achat, prix de vente et marge.",
    icon: Package,
  },
  {
    title: "Seuils et alertes",
    detail:
      "Stock minimum, stock maximum et alerte activable article par article.",
    icon: TriangleAlert,
  },
  {
    title: "Dépôts et emplacements",
    detail:
      "Dépôts avec code et adresse, emplacements internes, et une quantité par dépôt.",
    icon: Warehouse,
  },
  {
    title: "Stock relié aux documents",
    detail:
      "Les articles alimentent devis, commandes, livraisons et factures depuis la même fiche.",
    icon: FileText,
  },
  {
    title: "Contrôle à la vente",
    detail:
      "Autoriser ou non le stock négatif, et bloquer une sortie quand la quantité est insuffisante.",
    icon: Boxes,
  },
  {
    title: "Un stock par entreprise",
    detail:
      "Chaque entreprise du compte conserve ses propres articles, dépôts et quantités.",
    icon: Building2,
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Qu’est-ce qu’un logiciel de gestion de stock ?",
    answer:
      "C’est une application qui tient le catalogue des articles et leurs quantités à un seul endroit, et qui relie ces quantités à l’activité commerciale plutôt que de les laisser dans un fichier séparé que quelqu’un doit penser à mettre à jour.",
  },
  {
    question: "Pourquoi remplacer Excel pour gérer le stock ?",
    answer:
      "Un tableur suffit tant qu’une seule personne saisit et que les volumes sont faibles. Au-delà, la quantité doit être reportée à la main après chaque vente et chaque réception : c’est cette double saisie qui finit par être sautée, et l’écart se creuse sans que rien ne le signale.",
  },
  {
    question: "Peut-on gérer les articles avec Facturance Plus ?",
    answer:
      "Oui. Chaque article porte une référence, une désignation, une description et une unité, ainsi que son prix d’achat, son prix de vente, sa marge et sa TVA. Les services et les charges sont tenus dans des catalogues distincts.",
  },
  {
    question: "Facturance Plus permet-il de définir des seuils de stock ?",
    answer:
      "Oui. Un stock minimum et un stock maximum peuvent être renseignés par article, et l’alerte associée s’active article par article depuis l’onglet « Seuils & alertes » de la fiche.",
  },
  {
    question: "Peut-on gérer plusieurs dépôts ou magasins ?",
    answer:
      "Oui. Les dépôts sont des fiches à part entière, avec un code, un nom, une adresse et des emplacements internes. Un article peut porter une quantité propre à chaque dépôt.",
  },
  {
    question: "Peut-on utiliser la gestion de stock avec la facturation ?",
    answer:
      "C’est le principe : les articles alimentent les devis, bons de commande, bons de livraison et factures. Les quantités découlent de l’activité enregistrée plutôt que d’une saisie parallèle.",
  },
  {
    question: "Facturance Plus fonctionne-t-il sur Windows ?",
    answer:
      "Oui. L’application de bureau fonctionne sur Windows 10 et Windows 11 en 64 bits, en mode Local uniquement ou en mode Local + serveur avec synchronisation.",
  },
  {
    question: "Existe-t-il une version Web ?",
    answer:
      "Oui. La Version web s’utilise depuis un navigateur, sans installation sur le poste, avec les données hébergées sur le serveur Facturance.",
  },
  {
    question: "Un logiciel de stock convient-il aux PME ?",
    answer:
      "C’est le cas d’usage le plus courant : assez d’articles et de mouvements pour qu’un tableau devienne faux, mais pas de quoi justifier un système lourd à déployer et à administrer.",
  },
  {
    question: "Comment éviter les ruptures de stock ?",
    answer:
      "En définissant un seuil minimum sur les articles qui comptent, en enregistrant les mouvements au moment où ils ont lieu plutôt qu’en fin de semaine, et en comptant physiquement une partie du stock à intervalle régulier pour corriger les écarts avant qu’ils ne grandissent.",
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
            name: "Logiciel de gestion de stock en Tunisie",
            item: pageUrl,
          },
        ],
      },
      {
        // References the product entity the homepage already defines rather
        // than declaring a second SoftwareApplication with its own offers.
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: "Logiciel de gestion de stock en Tunisie",
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

export default function LogicielGestionStockTunisiePage() {
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
          <li aria-current="page">Logiciel de gestion de stock en Tunisie</li>
        </ol>
      </nav>

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          ARTICLES ET STOCKS
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl lg:text-5xl">
          Logiciel de gestion de stock en Tunisie pour organiser vos articles et
          dépôts
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          Un stock se dérègle rarement d’un coup. Il se dérègle parce qu’une
          sortie n’a pas été reportée, parce que le même article a été créé deux
          fois, ou parce que la quantité vit dans un fichier que personne ne met
          à jour après une vente. L’écart grandit sans bruit, et se découvre au
          pire moment : quand un client commande.
        </p>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Facturance Plus tient les articles, leurs quantités, leurs seuils et
          leurs dépôts dans la même application que vos documents commerciaux —
          de sorte que le stock soit la conséquence de l’activité enregistrée,
          et non une saisie de plus.
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

      <section className="mt-14" aria-labelledby="pourquoi-title">
        <h2
          id="pourquoi-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Pourquoi utiliser un logiciel de gestion de stock ?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Le problème que résout un logiciel de stock n’est pas le comptage :
          c’est la synchronisation. Tant que la quantité doit être reportée à la
          main après chaque vente et chaque réception, elle dépend de la mémoire
          d’une personne un jour chargé. Quand elle découle des documents déjà
          saisis, elle cesse d’être une tâche.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Le second apport est la visibilité : savoir ce qui reste, où il se
          trouve, et ce qui approche d’un seuil critique — sans ouvrir trois
          fichiers ni descendre au dépôt.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100/80 bg-white p-3 shadow-[0_18px_50px_rgba(11,41,77,0.09)] sm:p-4">
          <Image
            src="/img-main-page.png"
            alt="Gestion des articles et du stock dans Facturance Plus"
            width={1350}
            height={875}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>
      </section>

      <section className="mt-14" aria-labelledby="articles-title">
        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <Package className="size-5" aria-hidden="true" />
        </span>
        <h2
          id="articles-title"
          className="mt-4 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Centralisez vos articles
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Tout commence par le catalogue, et c’est l’étape la plus souvent
          négligée. Un article créé trois fois sous trois libellés répartit sa
          quantité sur trois fiches dont aucune ne dit la vérité — aucun suivi
          n’est possible à partir de là.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Dans Facturance Plus, chaque article porte une référence, une
          désignation, une description et une unité, avec son prix d’achat, son
          prix de vente, sa marge et sa TVA. Les services et les charges sont
          tenus séparément, ce qui évite de mélanger ce qui se stocke et ce qui
          ne se stocke pas.
        </p>

        <ul className="mt-5 grid max-w-3xl gap-2 pl-5 marker:text-primary [&>li]:list-disc">
          <li className="leading-7 text-muted-foreground">
            Référence, désignation, description et unité de mesure
          </li>
          <li className="leading-7 text-muted-foreground">
            Prix d’achat, prix de vente, marge, TVA et remises
          </li>
          <li className="leading-7 text-muted-foreground">
            Catalogues distincts pour les articles, les services et les charges
          </li>
          <li className="leading-7 text-muted-foreground">
            Champs de fiche configurables selon votre activité
          </li>
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="niveaux-title">
        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <Boxes className="size-5" aria-hidden="true" />
        </span>
        <h2
          id="niveaux-title"
          className="mt-4 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Suivez vos niveaux de stock
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Chaque article porte sa quantité en stock, et cette quantité découle
          des documents que vous enregistrez plutôt que d’une saisie séparée.
          C’est ce qui fait la différence entre un chiffre que l’on consulte et
          un chiffre que l’on recalcule.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Deux réglages méritent d’être connus, parce qu’ils déterminent le
          comportement de l’application au moment d’une sortie : vous pouvez
          autoriser ou interdire un stock négatif, et bloquer une sortie lorsque
          la quantité disponible est insuffisante. Le choix dépend de votre
          métier — un négociant qui vend sur commande ne le règle pas comme un
          commerce de détail.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="seuils-title">
        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <TriangleAlert className="size-5" aria-hidden="true" />
        </span>
        <h2
          id="seuils-title"
          className="mt-4 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Définissez des seuils et alertes de stock
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          La fiche article comporte un onglet « Seuils &amp; alertes » : vous y
          renseignez un stock minimum, éventuellement un stock maximum, et vous
          activez l’alerte article par article. Tout n’a pas besoin d’un seuil —
          une dizaine bien choisis sur les références qui portent l’essentiel de
          vos ventes valent mieux que trois cents valeurs approximatives que
          personne ne tient à jour.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Le seuil minimum n’a rien de théorique : il correspond à ce que vous
          vendez pendant le délai que met votre fournisseur à livrer, augmenté
          d’une marge de sécurité. Il mérite d’être relu une ou deux fois par an,
          ou dès qu’un délai fournisseur change durablement.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="depots-title">
        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <Warehouse className="size-5" aria-hidden="true" />
        </span>
        <h2
          id="depots-title"
          className="mt-4 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Organisez vos dépôts et magasins
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Dès qu’une entreprise stocke à deux endroits, « combien en
          reste-t-il ? » devient une question incomplète : il faut savoir où. Les
          dépôts sont ici des fiches à part entière, avec un code, un nom, une
          adresse et des emplacements internes pour décrire l’organisation
          physique du lieu.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Un article peut porter une quantité propre à chaque dépôt, ce qui
          permet de distinguer ce qui se trouve en magasin de ce qui attend en
          réserve, plutôt que de raisonner sur un total qui ne correspond à aucun
          rayon.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="commercial-title">
        <h2
          id="commercial-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Reliez stock et gestion commerciale
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Un stock isolé du reste de l’activité redevient un fichier à tenir. Ici
          les articles alimentent directement les devis, les bons de commande,
          les bons de livraison et les factures, à partir des mêmes fiches
          clients et fournisseurs. Une livraison fait sortir la marchandise, une
          réception la fait entrer.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          C’est la raison pour laquelle le stock se traite rarement seul :
          il n’est qu’une facette d’un ensemble que nous détaillons sur la page{" "}
          <Link
            href="/logiciel-gestion-commerciale-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            logiciel de gestion commerciale en Tunisie
          </Link>
          . Si votre besoin se limite en revanche à l’émission des documents, la
          page{" "}
          <Link
            href="/logiciel-facturation-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            logiciel de facturation en Tunisie
          </Link>{" "}
          couvre ce périmètre.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="erreurs-title">
        <h2
          id="erreurs-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Évitez les erreurs fréquentes de gestion de stock
        </h2>

        <div className="mt-6 max-w-3xl rounded-2xl border border-blue-100/80 bg-white p-6">
          <p className="text-base font-bold text-[#0b294d]">
            5 signes que votre suivi de stock devient difficile
          </p>
          <ul className="mt-4 grid gap-3">
            {stockSignals.map((signal, index) => (
              <li key={signal} className="flex items-start gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span className="text-sm leading-6 text-muted-foreground">
                  {signal}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground">
          Les deux premiers points se corrigent une fois pour toutes en
          nettoyant le catalogue : une référence unique par article, une
          convention de nommage que tout le monde applique, et les doublons
          fusionnés plutôt que laissés en place. Les trois suivants relèvent
          d’une habitude de suivi, que nous détaillons dans nos{" "}
          <Link
            href="/blog/gestion-stock-bonnes-pratiques"
            className="font-semibold text-primary hover:underline"
          >
            sept bonnes pratiques de gestion de stock
          </Link>
          .
        </p>
      </section>

      <section className="mt-14" aria-labelledby="minimum-title">
        <h2
          id="minimum-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Stock minimum et stock disponible : deux notions à ne pas confondre
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Le <strong className="font-semibold text-[#0b294d]">stock
          disponible</strong> est la quantité que vous avez réellement :
          c’est un constat, il change à chaque entrée et à chaque sortie.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Le <strong className="font-semibold text-[#0b294d]">stock
          minimum</strong> est une décision : le niveau en dessous duquel vous
          voulez être prévenu. Il ne décrit rien de la réalité, il définit le
          moment où réapprovisionner. C’est pour cela qu’il se calcule à partir
          d’un délai fournisseur, pas d’une moyenne de ventes.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Confondre les deux conduit à l’erreur classique : fixer le seuil au
          niveau où l’on serait en rupture, plutôt qu’au niveau où il est encore
          temps de commander.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="excel-title">
        <h2
          id="excel-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Excel ou logiciel de gestion de stock ?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Le tableur reste un choix défendable quand une seule personne gère un
          catalogue réduit et que les mouvements sont rares. Sa limite n’est pas
          la capacité, c’est la double saisie : la quantité doit être reportée
          après chaque document, et c’est ce report qui saute en premier quand la
          journée est chargée.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          S’ajoutent les difficultés habituelles du fichier partagé — plusieurs
          versions, une formule cassée qui n’alerte personne, et aucun historique
          exploitable. Nous comparons les deux approches critère par critère dans{" "}
          <Link
            href="/blog/logiciel-facturation-ou-excel"
            className="font-semibold text-primary hover:underline"
          >
            logiciel de facturation ou Excel
          </Link>
          .
        </p>
      </section>

      <section className="mt-14" aria-labelledby="modes-title">
        <h2
          id="modes-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Gestion de stock locale, Web ou synchronisée
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          La question compte particulièrement pour le stock, parce qu’un dépôt
          n’est pas toujours l’endroit où la connexion est la meilleure.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-3">
          {[
            {
              icon: MonitorDown,
              title: "Local uniquement",
              detail:
                "Les données restent sur le poste. L’application continue de fonctionner sans connexion.",
            },
            {
              icon: Globe,
              title: "Version web",
              detail:
                "Accès depuis un navigateur, sans installation, données hébergées sur le serveur.",
            },
            {
              icon: RefreshCw,
              title: "Local + serveur",
              detail:
                "Travail local et synchronisation avec le serveur, espace client web en complément.",
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
          Le détail des trois modes et le profil d’entreprise auquel chacun
          convient sont comparés dans notre article{" "}
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
          Gestion de stock pour les PME en Tunisie
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Le besoin apparaît rarement au démarrage. Il apparaît quand le
          catalogue dépasse ce qu’une personne retient, quand deux sites stockent
          la même référence, ou quand une deuxième personne commence à sortir de
          la marchandise. À partir de là, le tableau devient faux plus vite qu’il
          n’est corrigé.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Lorsque plusieurs entités sont gérées depuis un même compte, chacune
          conserve ses propres articles, ses dépôts et ses quantités : le stock
          appartient à l’entreprise qui l’a acheté. Nous développons cette
          séparation dans notre article sur la{" "}
          <Link
            href="/blog/logiciel-gestion-multi-entreprise"
            className="font-semibold text-primary hover:underline"
          >
            gestion de plusieurs entreprises avec un seul logiciel
          </Link>
          .
        </p>
      </section>

      <section className="mt-14" aria-labelledby="facturance-title">
        <h2
          id="facturance-title"
          className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl"
        >
          Pourquoi utiliser Facturance Plus pour gérer votre stock ?
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
          La liste complète figure sur la page des{" "}
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
            tarifs
          </Link>{" "}
          précisent les trois modes de fonctionnement. Et si vous évaluez
          plusieurs outils, notre{" "}
          <Link
            href="/comparatif-logiciel-facturation-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            comparatif des logiciels de facturation
          </Link>{" "}
          indique lesquels annoncent une gestion de stock et un multi-dépôt.
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
