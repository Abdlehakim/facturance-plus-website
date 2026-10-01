import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Boxes,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileSignature,
  FileText,
  Globe,
  MonitorDown,
  ReceiptText,
  Store,
  Truck,
  UserRoundCheck,
  Wallet,
} from "lucide-react";

import { getStructuredPricingOffers } from "@/components/public-site/pricing-offers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicSiteConfig } from "@/lib/public-site-config";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

const PATH = "/logiciel-facturation-tunisie";

/**
 * When the product and regulatory statements on this page were last checked
 * against the application and the official sources. It drives both the visible
 * line under the intro and `dateModified` in the structured data, so the two
 * can never disagree. Bump it only after actually re-checking.
 */
const LAST_REVIEWED_ISO = "2026-10-01";
const LAST_REVIEWED_LABEL = "octobre 2026";

export const metadata: Metadata = buildPageMetadata({
  // The layout template appends " | Facturance Plus"; passing the brand here
  // too would print it twice.
  title: "Logiciel de facturation en Tunisie 2026",
  description:
    "Logiciel de facturation et de gestion commerciale en Tunisie : devis, factures, clients, fournisseurs, articles, stocks et paiements, sur Windows et sur le web.",
  path: PATH,
});

/**
 * Primary SEO landing page.
 *
 * Every capability described here is one the application actually ships, and
 * every figure comes from the pricing cards rather than being restated. The
 * electronic-invoicing section states the exact current status - TEIF file
 * generated and signed on the desktop, no transmission to TTN - because that
 * is the claim a reader is most likely to be misled about.
 */

const quickFacts: { icon: LucideIcon; label: string; detail: string }[] = [
  {
    icon: ReceiptText,
    label: "Documents commerciaux",
    detail:
      "Devis, factures, proforma, bons de livraison et avoirs, numérotés par l’application.",
  },
  {
    icon: UserRoundCheck,
    label: "Tiers",
    detail: "Fiches clients, fournisseurs et transporteurs réutilisées partout.",
  },
  {
    icon: Boxes,
    label: "Catalogue et stock",
    detail: "Articles, services, charges, dépôts et seuils par article.",
  },
  {
    icon: CreditCard,
    label: "Règlements",
    detail:
      "Paiements clients et fournisseurs, y compris partiels, rattachés aux documents.",
  },
  {
    icon: Globe,
    label: "Windows et web",
    detail:
      "Application Windows ou navigateur, plusieurs entreprises sur un même compte.",
  },
  {
    icon: Wallet,
    label: "Tarifs",
    detail:
      "À partir de 25 DT par entreprise et par mois, après trois jours d’essai gratuit.",
  },
];

/**
 * The two chains the application really models. `bc` is a supplier-side
 * document in the data model (its conversions target bon d'entrée and facture
 * d'achat), so it belongs to the purchase chain and not to the sale.
 */
const salesChain: { step: string; title: string; detail: string }[] = [
  {
    step: "1",
    title: "Devis",
    detail:
      "La proposition chiffrée envoyée au client. Elle se convertit ensuite en facture, en facture proforma ou en bon de livraison.",
  },
  {
    step: "2",
    title: "Bon de livraison",
    detail:
      "Ce qui est effectivement remis au client. Il se convertit à son tour en facture ou en facture proforma.",
  },
  {
    step: "3",
    title: "Facture",
    detail:
      "La demande de règlement, reprise du devis ou du bon de livraison, avec son propre numéro dans sa propre série.",
  },
  {
    step: "4",
    title: "Règlement",
    detail:
      "L’encaissement s’enregistre sur la facture qu’il solde. Le solde restant dû est recalculé à partir du montant saisi.",
  },
];

const purchaseChain: { step: string; title: string; detail: string }[] = [
  {
    step: "1",
    title: "Bon de commande",
    detail:
      "La commande passée à un fournisseur. Elle se convertit en bon d’entrée ou en facture d’achat.",
  },
  {
    step: "2",
    title: "Bon d’entrée",
    detail:
      "La réception de la marchandise, avec son dépôt et sa date, qui alimente le stock.",
  },
  {
    step: "3",
    title: "Facture d’achat",
    detail:
      "La facture du fournisseur, identifiée par le numéro que celui-ci lui a donné.",
  },
  {
    step: "4",
    title: "Règlement fournisseur",
    detail:
      "Le paiement enregistré côté fournisseur, avec le solde et les avances associés.",
  },
];

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
      "Côté ventes, Facturance Plus couvre le devis que vous proposez, le bon de livraison qui prouve la remise, la facture qui demande le règlement, et la facture proforma lorsqu’elle est demandée. Côté achats, le bon de commande adressé au fournisseur se prolonge en bon d’entrée ou en facture d’achat.",
      "Comme ils partagent les mêmes fiches, les informations restent cohérentes d’une étape à la suivante. C’est ce chaînage qui permet de remonter d’une facture contestée jusqu’au devis accepté.",
    ],
    points: [
      "Devis, factures proforma et bons de livraison",
      "Bons de commande, bons d’entrée et factures d’achat",
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
      "Catalogue d’articles, de services et de charges",
      "Gestion par dépôt ou magasin",
      "Seuils minimum et maximum, et alertes paramétrables par article",
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
      "Comptes de trésorerie et échéances visibles sur les documents",
    ],
  },
];

const centralisedGroups: {
  icon: LucideIcon;
  title: string;
  items: string[];
}[] = [
  {
    icon: FileText,
    title: "Documents",
    items: [
      "Devis et factures",
      "Factures proforma",
      "Bons de livraison et de sortie",
      "Bons de commande et d’entrée",
      "Factures d’achat et dépenses",
      "Factures d’avoir",
    ],
  },
  {
    icon: Truck,
    title: "Partenaires",
    items: [
      "Clients",
      "Fournisseurs",
      "Transporteurs",
      "Champs de fiche configurables",
    ],
  },
  {
    icon: Store,
    title: "Catalogue",
    items: ["Articles", "Services", "Charges", "Modèles de document"],
  },
  {
    icon: Boxes,
    title: "Stock",
    items: [
      "Dépôts et magasins",
      "Seuils minimum et maximum",
      "Alertes par article",
      "Blocage ou tolérance du stock négatif",
    ],
  },
  {
    icon: CreditCard,
    title: "Règlements",
    items: [
      "Paiements clients",
      "Paiements fournisseurs",
      "Paiements partiels et annulation d’un règlement",
      "Comptes de trésorerie",
    ],
  },
  {
    icon: BarChart3,
    title: "Suivi",
    items: [
      "Historique des documents par exercice",
      "Relevés clients et fournisseurs",
      "Historique des règlements",
      "Export PDF et envoi par e-mail",
    ],
  },
];

/**
 * The decision guide. Each criterion is written to be useful to someone who
 * will not choose Facturance Plus, which is why the product note is a separate
 * field: it stays out of the way of the advice.
 */
const criteria: { title: string; advice: string; product: string }[] = [
  {
    title: "1. Les documents dont vous avez réellement besoin",
    advice:
      "Listez les pièces que vous émettez vraiment : certaines activités s’arrêtent à la facture, d’autres ont besoin du devis, du bon de livraison et du suivi des achats. Un outil qui ne couvre pas un maillon vous ramènera au tableur pour celui-là.",
    product:
      "Facturance Plus couvre le devis, la facture, la facture proforma, le bon de livraison, l’avoir, et côté achats le bon de commande, le bon d’entrée, la facture d’achat et la dépense.",
  },
  {
    title: "2. La numérotation",
    advice:
      "C’est le point de rupture le plus fréquent. Une numérotation tenue à la main produit des doublons dès que deux personnes émettent des documents. Vérifiez que l’outil attribue lui-même la séquence, et qu’il la tient séparément par type de document.",
    product:
      "Chaque type de document tire son numéro de son propre compteur, par entreprise et par exercice, avec son propre préfixe.",
  },
  {
    title: "3. Les fiches clients et fournisseurs",
    advice:
      "Les informations qui apparaissent sur vos documents doivent venir d’une fiche unique, pas d’une saisie répétée. C’est ce qui évite trois orthographes du même nom d’entreprise et un identifiant fiscal manquant au mauvais moment.",
    product:
      "Les fiches clients, fournisseurs et transporteurs alimentent les documents, et leurs champs sont configurables selon votre activité.",
  },
  {
    title: "4. Le catalogue et le stock",
    advice:
      "Si vous vendez des marchandises, demandez comment le stock bouge : une saisie séparée des documents finit toujours par être sautée. Regardez aussi la gestion par dépôt si vous avez plusieurs lieux de stockage.",
    product:
      "Articles, services et charges alimentent les documents ; les dépôts, les seuils minimum et maximum et les alertes sont paramétrables par article.",
  },
  {
    title: "5. Le suivi des règlements",
    advice:
      "Savoir ce qui est facturé ne suffit pas. L’outil doit dire ce qui est encaissé, ce qui reste dû et depuis quand, en tenant compte des paiements partiels.",
    product:
      "Les règlements s’enregistrent sur la facture qu’ils soldent ; le solde restant est recalculé, et un règlement peut être annulé.",
  },
  {
    title: "6. Windows, navigateur, ou les deux",
    advice:
      "C’est une question d’organisation plus que de goût : un poste fixe unique, plusieurs postes, du travail hors du bureau, ou une connexion irrégulière n’appellent pas la même réponse.",
    product:
      "Trois modes existent : Local uniquement, Version web, et Local + serveur. Ils sont détaillés plus bas.",
  },
  {
    title: "7. Le comportement sans connexion",
    advice:
      "Si votre connexion est irrégulière, posez la question franchement : que se passe-t-il quand elle tombe en pleine facturation ? Une application entièrement hébergée s’arrête ; une application locale continue.",
    product:
      "En mode Local uniquement et en mode Local + serveur, le travail se fait sur la base locale. La Version web, elle, s’utilise depuis un navigateur et suppose une connexion.",
  },
  {
    title: "8. Plusieurs entreprises",
    advice:
      "Si vous gérez plus d’une société, vérifiez que chacune garde ses propres documents, ses propres numéros et ses propres stocks — et que le passage de l’une à l’autre ne demande pas une réinstallation.",
    product:
      "Un même compte peut gérer plusieurs entreprises, chacune avec ses documents, sa numérotation et ses stocks. Une remise s’applique à partir de trois entreprises.",
  },
  {
    title: "9. Les sorties : PDF, e-mail, exports",
    advice:
      "Vos documents doivent sortir de l’outil : un PDF propre à envoyer, un e-mail au client, et la possibilité de récupérer vos données si vous changez de solution un jour.",
    product:
      "Les documents se prévisualisent, s’exportent en PDF, s’impriment et s’envoient par e-mail depuis l’application.",
  },
  {
    title: "10. La facturation électronique",
    advice:
      "C’est le critère le plus mal posé. Demandez précisément ce que l’éditeur prend en charge : produire un fichier au format attendu, le signer, et le transmettre à la plateforme officielle sont trois choses distinctes, et beaucoup d’outils n’en font qu’une.",
    product:
      "La section dédiée plus bas détaille exactement ce que Facturance Plus fait et ne fait pas sur ce sujet.",
  },
  {
    title: "11. Ce que vous pourrez relire plus tard",
    advice:
      "Un historique consultable vaut plus qu’une fonctionnalité supplémentaire. Vérifiez que vous pourrez retrouver un document d’il y a deux ans, savoir d’où il vient et ce qui a été payé dessus.",
    product:
      "L’historique est consultable par exercice, et un document issu d’une conversion garde la référence de celui dont il provient.",
  },
  {
    title: "12. Le prix réel",
    advice:
      "Comparez sur la même base : par entreprise, par mois, et en incluant ce que vous devrez ajouter. Un tarif affiché par utilisateur et un tarif affiché par entreprise ne se comparent pas directement.",
    product:
      "Les tarifs sont exprimés par entreprise et par mois, avec un essai gratuit de trois jours. Ils figurent sur la page des tarifs.",
  },
];

const audiences: { icon: LucideIcon; title: string; detail: string }[] = [
  {
    icon: UserRoundCheck,
    title: "TPE et indépendants",
    detail:
      "Quelques dizaines de documents par mois, une seule personne qui facture. L’intérêt principal est la fin de la ressaisie et une numérotation qui ne demande plus d’attention.",
  },
  {
    icon: Building2,
    title: "PME",
    detail:
      "Plusieurs personnes émettent des documents, les clients se comptent en centaines. La numérotation automatique et l’historique partagé deviennent les points décisifs.",
  },
  {
    icon: Store,
    title: "Commerce et distribution",
    detail:
      "Un catalogue d’articles qui vit, des quantités à suivre, parfois plusieurs lieux de stockage. Les dépôts, les seuils et les alertes par article répondent à ce besoin.",
  },
  {
    icon: FileText,
    title: "Services et prestations",
    detail:
      "Peu ou pas de stock, mais des devis à suivre et des règlements souvent étalés. Le catalogue de services et le suivi des paiements partiels sont ici l’essentiel.",
  },
];

const differentiators: string[] = [
  "Deux usages pour un même produit : une application Windows et une version web, selon le mode choisi.",
  "Un mode local, où le travail se fait sur la base de données du poste plutôt que sur un serveur distant.",
  "Un mode Local + serveur, qui conserve le travail local et le synchronise avec le serveur Facturance.",
  "La facturation et le stock dans la même application, sans double saisie des mouvements.",
  "Les règlements clients et fournisseurs suivis au même endroit que les documents.",
  "Plusieurs entreprises sur un même compte, chacune avec ses documents, ses numéros et ses stocks.",
  "Des tarifs publiés, exprimés par entreprise et par mois, sans devis préalable obligatoire.",
];

const guides: { href: string; label: string }[] = [
  {
    href: "/blog/mentions-obligatoires-facture-tunisie",
    label: "Les mentions à vérifier sur une facture",
  },
  {
    href: "/blog/facture-electronique-tunisie-2026",
    label: "Facture électronique en Tunisie : guide pratique",
  },
  {
    href: "/blog/devis-bon-commande-bon-livraison-facture",
    label: "Devis, bon de commande, bon de livraison et facture",
  },
  {
    href: "/blog/facture-avoir-tunisie",
    label: "Facture d’avoir : corriger ou annuler une facture",
  },
  {
    href: "/blog/logiciel-facturation-ou-excel",
    label: "Logiciel de facturation ou Excel ?",
  },
  {
    href: "/blog/logiciel-facturation-local-web-synchronise-tunisie",
    label: "Local, web ou synchronisé : quel mode choisir ?",
  },
];

const officialSources: { href: string; label: string; detail: string }[] = [
  {
    href: "https://www.finances.gov.tn/fr/node/952",
    label: "Ministère des Finances — obligations relatives aux factures",
    detail:
      "Les informations que les factures des assujettis à la TVA doivent comporter, dont le numéro pris dans une série ininterrompue.",
  },
  {
    href: "https://www.finances.gov.tn/fr/node/75",
    label:
      "Ministère des Finances — obligations des assujettis à la TVA relatives à la facturation",
    detail:
      "L’obligation d’utiliser des factures numérotées dans une série ininterrompue et les documents accompagnant les marchandises.",
  },
  {
    href: "https://www.finances.gov.tn/fr/actualites-evenements/ttn-prix-de-la-digitalisation-du-secteur-public-2019",
    label: "Ministère des Finances — Tunisie TradeNet et El Fatoora",
    detail:
      "Le ministère y présente Tunisie TradeNet comme organisme autorisé pour le traitement des factures électroniques depuis 2016, et El Fatoora comme son projet de facture électronique.",
  },
  {
    href: "https://www.tradenet.com.tn/",
    label: "Tunisie TradeNet (TTN)",
    detail:
      "Le site de l’opérateur, qui publie ses avis et les modalités d’adhésion au service de facture électronique.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Qu’est-ce qu’un logiciel de facturation ?",
    answer:
      "C’est une application qui produit vos documents commerciaux à partir de données structurées — clients, articles, prix — au lieu de les recomposer à chaque fois. Elle attribue les numéros, conserve l’historique et relie les documents entre eux, ce qu’un tableur ne fait pas.",
  },
  {
    question:
      "Quel logiciel de facturation choisir pour une PME en Tunisie ?",
    answer:
      "Il n’y a pas de réponse unique. Partez de vos documents réels, du nombre de personnes qui facturent, de la présence ou non de stock, et de votre connexion internet. Les douze critères détaillés plus haut sur cette page sont faits pour être parcourus dans cet ordre, y compris si votre choix final se porte ailleurs.",
  },
  {
    question: "Facturance Plus fonctionne-t-il sur Windows ?",
    answer:
      "Oui. L’application de bureau fonctionne sur Windows 10 et Windows 11 en 64 bits, soit en mode Local uniquement, soit en mode Local + serveur avec synchronisation.",
  },
  {
    question: "Facturance Plus est-il disponible sur le Web ?",
    answer:
      "Oui. La Version web s’utilise depuis un navigateur, sans installation sur le poste, et les données sont hébergées sur le serveur Facturance.",
  },
  {
    question: "Quelle différence entre la Version web et l’application Windows ?",
    answer:
      "La Version web s’utilise depuis un navigateur et suppose une connexion ; elle couvre les documents, les tiers, le catalogue, les dépôts, les règlements enregistrés sur les factures, l’export PDF, l’envoi par e-mail et l’historique. L’application Windows travaille sur la base locale et ajoute les traitements qui lui sont propres : relevés et historiques de règlements, modules de paiements fournisseurs et de trésorerie, inventaire et mouvements de stock, et la génération des fichiers XML.",
  },
  {
    question: "Peut-on gérer les stocks avec Facturance Plus ?",
    answer:
      "Oui. Le catalogue d’articles et de services, les dépôts et magasins, les seuils minimum et maximum, les alertes par article et le comportement en cas de stock insuffisant sont gérés dans l’application, séparément pour chaque entreprise rattachée au compte.",
  },
  {
    question: "Peut-on suivre les paiements clients et fournisseurs ?",
    answer:
      "Oui. Les règlements s’enregistrent sur les factures qu’ils soldent, y compris lorsqu’ils sont partiels : le solde restant dû est recalculé, et un règlement peut être annulé. Les paiements fournisseurs et les comptes de trésorerie sont également suivis.",
  },
  {
    question:
      "Facturance Plus prend-il en charge la facture électronique et TTN ?",
    answer:
      "En partie, et il faut être précis. L’application Windows génère le fichier XML au format TEIF à partir d’une facture, et permet de le signer électroniquement avec un certificat IDTrust que votre entreprise détient. En revanche, elle ne transmet pas la facture à la plateforme El Fatoora de TTN : cette étape reste à effectuer par vos moyens habituels. Facturance Plus n’est ni une plateforme de transmission officielle, ni un dispositif homologué ou certifié.",
  },
  {
    question: "Peut-on gérer plusieurs entreprises avec un seul compte ?",
    answer:
      "Oui. Chaque entreprise rattachée au compte conserve ses propres documents, sa propre numérotation, son catalogue et ses stocks. Une remise s’applique à partir de trois entreprises.",
  },
  {
    question: "Combien de temps dure l’essai gratuit ?",
    answer:
      "Trois jours. L’inscription permet d’associer entre une et trois entreprises au compte, et l’essai fonctionne uniquement avec la base de données locale : le mode Local + serveur n’est pas disponible pendant cette période.",
  },
];

/** "25" -> "25 DT", "67.5" -> "67,50 DT": French decimals, as the cards print. */
function formatPrice(amount: number): string {
  return `${new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount)} DT`;
}

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
        // The page itself. `dateModified` is the date the statements here were
        // last checked, which is the same constant the visible line prints.
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: "Logiciel de facturation en Tunisie",
        description:
          "Logiciel de facturation et de gestion commerciale en Tunisie : devis, factures, clients, fournisseurs, articles, stocks et paiements.",
        inLanguage: "fr",
        dateModified: LAST_REVIEWED_ISO,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${homeUrl}#website`,
          url: homeUrl,
          name: publicSiteConfig.brandName,
        },
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

const H2 = "text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl";
const LEAD = "mt-4 max-w-3xl text-base leading-7 text-muted-foreground";

function ChainStep({
  step,
  title,
  detail,
}: {
  step: string;
  title: string;
  detail: string;
}) {
  return (
    <li className="relative rounded-xl border border-blue-100/80 bg-white p-4">
      <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
        {step}
      </span>
      <h4 className="mt-3 text-sm font-bold text-[#0b294d]">{title}</h4>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{detail}</p>
    </li>
  );
}

export default function LogicielFacturationTunisiePage() {
  const pricingOffers = getStructuredPricingOffers();

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
          Facturance Plus réunit vos devis, factures, bons de livraison et
          documents d’achat, vos fiches clients et fournisseurs, vos articles,
          vos stocks et vos règlements dans une seule application. Les
          informations sont saisies une fois et réutilisées partout, ce qui
          supprime la ressaisie et les écarts qu’elle produit.
        </p>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          L’application existe en version Windows et en version web, et un même
          compte peut gérer plusieurs entreprises, chacune avec ses propres
          documents et sa propre numérotation.
        </p>

        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1.5 text-xs font-semibold text-[#0b294d]">
          <CalendarCheck className="size-3.5 text-primary" aria-hidden="true" />
          <span>
            Informations produit et sources vérifiées en {LAST_REVIEWED_LABEL}
          </span>
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

      <section className="mt-12" aria-labelledby="en-bref-title">
        <h2 id="en-bref-title" className={H2}>
          En bref
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickFacts.map(({ icon: Icon, label, detail }) => (
            <li
              key={label}
              className="rounded-xl border border-blue-100/80 bg-white p-4"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-sm font-bold text-[#0b294d]">{label}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="centraliser-title">
        <h2 id="centraliser-title" className={H2}>
          Centralisez votre facturation et votre gestion commerciale
        </h2>
        <p className={LEAD}>
          La difficulté quotidienne d’une TPE ou d’une PME n’est pas d’émettre
          une facture : c’est de retrouver, six mois plus tard, le devis qui l’a
          précédée, de savoir si elle a été réglée, et d’avoir la certitude que
          le prix appliqué était le bon. Ces questions se règlent quand les
          documents, les tiers et les articles vivent au même endroit.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100/80 bg-white p-3 shadow-[0_18px_50px_rgba(11,41,77,0.09)] sm:p-4">
          <Image
            src="/img-main-page.png"
            alt="Écran principal de Facturance Plus : documents, modèles, clients et articles"
            width={1350}
            height={875}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>
      </section>

      <section className="mt-14" aria-labelledby="workflow-title">
        <h2 id="workflow-title" className={H2}>
          Du devis au paiement : un workflow commercial centralisé
        </h2>
        <p className={LEAD}>
          Les documents ne sont pas indépendants : chacun peut être repris pour
          produire le suivant, sans ressaisir le client ni les lignes. C’est ce
          chaînage qui permet de remonter d’un règlement jusqu’au devis
          d’origine.
        </p>

        <h3 className="mt-8 text-lg font-bold text-[#0b294d]">
          Côté ventes
        </h3>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {salesChain.map((entry) => (
            <ChainStep key={entry.title} {...entry} />
          ))}
        </ol>

        <h3 className="mt-8 text-lg font-bold text-[#0b294d]">
          Côté achats
        </h3>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {purchaseChain.map((entry) => (
            <ChainStep key={entry.title} {...entry} />
          ))}
        </ol>

        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground">
          La conversion d’un document en un autre est une action explicite : vous
          choisissez le document source et la pièce à produire. Le document créé
          garde la référence de celui dont il provient, et reçoit son propre
          numéro dans sa propre série. Une facture peut également être convertie
          en facture d’avoir pour la corriger, ce que détaille notre article sur
          la{" "}
          <Link
            href="/blog/facture-avoir-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            facture d’avoir en Tunisie
          </Link>
          .
        </p>
      </section>

      {workflowSections.map(({ id, title, icon: Icon, paragraphs, points }) => (
        <section key={id} className="mt-14" aria-labelledby={`${id}-title`}>
          <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </span>

          <h2 id={`${id}-title`} className={`mt-4 ${H2}`}>
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

      <section className="mt-14" aria-labelledby="centralise-title">
        <h2 id="centralise-title" className={H2}>
          Ce que Facturance Plus centralise
        </h2>
        <p className={LEAD}>
          Le détail de ce que l’application tient, par famille. Tout ce qui
          figure ici correspond à une fonctionnalité de la version actuelle.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {centralisedGroups.map(({ icon: Icon, title, items }) => (
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
                <ul className="grid gap-1.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                    >
                      <CheckCircle2
                        className="mt-1 size-3.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="tunisie-title">
        <h2 id="tunisie-title" className={H2}>
          Web ou Windows : quel mode choisir ?
        </h2>
        <p className={LEAD}>
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

        <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100/80 bg-white p-3 shadow-[0_18px_50px_rgba(11,41,77,0.09)] sm:p-4">
          <Image
            src="/facturance-plus-hero.webp"
            alt="Facturance Plus sur un poste Windows, avec les menus Documents, Stock, Paiements et Trésorerie"
            width={1672}
            height={941}
            sizes="(min-width: 1024px) 70vw, 100vw"
            loading="lazy"
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>

        <h3 className="mt-10 text-lg font-bold text-[#0b294d]">
          Ce que couvre chaque usage
        </h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-blue-100/80 bg-white p-5">
            <h4 className="text-base font-bold text-[#0b294d]">
              Depuis un navigateur
            </h4>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              La Version web couvre les documents commerciaux et leurs
              conversions, les fiches clients, fournisseurs et transporteurs, les
              articles, services et charges, les dépôts, les modèles de
              document, l’enregistrement des règlements sur les factures,
              l’export PDF, l’envoi par e-mail et l’historique par exercice.
              Elle suppose une connexion internet.
            </p>
          </div>
          <div className="rounded-xl border border-blue-100/80 bg-white p-5">
            <h4 className="text-base font-bold text-[#0b294d]">
              Sur un poste Windows
            </h4>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              L’application de bureau reprend ces fonctions en travaillant sur
              la base locale, et ajoute les traitements qui lui sont propres :
              relevés clients et fournisseurs, historiques de règlements,
              modules de paiements fournisseurs et de trésorerie, inventaire et
              mouvements de stock, et la génération des fichiers XML. Si vous
              avez besoin de ces traitements, c’est le mode à retenir.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground">
          En mode Local + serveur, les données du poste sont synchronisées avec
          le serveur Facturance par cycles d’envoi et de récupération ; il ne
          s’agit pas d’une réplication permanente. Le détail des trois modes,
          leurs contraintes et le profil d’entreprise auquel chacun convient
          sont comparés dans notre article{" "}
          <Link
            href="/blog/logiciel-facturation-local-web-synchronise-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            logiciel de facturation local, web ou synchronisé
          </Link>
          .
        </p>
      </section>

      <section className="mt-14" aria-labelledby="choisir-title">
        <h2 id="choisir-title" className={H2}>
          Comment choisir un logiciel de facturation en Tunisie ?
        </h2>
        <p className={LEAD}>
          Les douze points qui suivent sont ceux qui font réellement la
          différence à l’usage. Ils sont écrits pour vous servir même si votre
          choix se porte sur une autre solution : la remarque sur Facturance
          Plus est chaque fois séparée du critère lui-même.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {criteria.map(({ title, advice, product }) => (
            <div
              key={title}
              className="rounded-xl border border-blue-100/80 bg-white p-5"
            >
              <h3 className="text-base font-bold text-[#0b294d]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {advice}
              </p>
              <p className="mt-3 border-t border-blue-100/80 pt-3 text-sm leading-6 text-muted-foreground">
                <span className="font-semibold text-[#0b294d]">
                  Avec Facturance Plus :{" "}
                </span>
                {product}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground">
          Pour situer Facturance Plus parmi les autres solutions disponibles,
          notre{" "}
          <Link
            href="/comparatif-logiciel-facturation-tunisie"
            className="font-semibold text-primary hover:underline"
          >
            comparatif des logiciels de facturation en Tunisie
          </Link>{" "}
          applique des critères équivalents à plusieurs produits, sources à
          l’appui.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="pour-qui-title">
        <h2 id="pour-qui-title" className={H2}>
          Pour qui ?
        </h2>
        <p className={LEAD}>
          Facturance Plus s’adresse aux entreprises qui émettent des documents
          commerciaux de façon régulière. Le besoin n’est pas le même selon le
          profil.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2">
          {audiences.map(({ icon: Icon, title, detail }) => (
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
      </section>

      <section className="mt-14" aria-labelledby="electronique-title">
        <h2 id="electronique-title" className={H2}>
          Facturation électronique en Tunisie
        </h2>
        <p className={LEAD}>
          C’est le sujet sur lequel les promesses commerciales sont les plus
          approximatives, parce qu’il recouvre plusieurs étapes distinctes que
          l’on présente souvent comme une seule.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: FileText,
              title: "Un PDF n’est pas une facture électronique",
              detail:
                "Un PDF envoyé par e-mail est un document lisible par une personne. Une facture électronique au sens réglementaire porte les données elles-mêmes, dans des champs identifiés, exploitables directement par le système du destinataire.",
            },
            {
              icon: ReceiptText,
              title: "Le format structuré : TEIF",
              detail:
                "En Tunisie, le format d’échange attendu est le TEIF, un fichier XML normalisé. Produire ce fichier est une première étape, distincte de sa signature et de sa transmission.",
            },
            {
              icon: FileSignature,
              title: "La signature électronique",
              detail:
                "Le fichier doit être signé électroniquement au moyen d’un certificat détenu par l’entreprise. C’est une étape à part entière, qui suppose de disposer de ce certificat.",
            },
            {
              icon: Globe,
              title: "La transmission à TTN",
              detail:
                "Le fichier signé doit ensuite être transmis à la plateforme El Fatoora. Le ministère des Finances présente Tunisie TradeNet comme l’organisme autorisé pour le traitement des factures électroniques depuis 2016.",
            },
          ].map(({ icon: Icon, title, detail }) => (
            <div
              key={title}
              className="rounded-xl border border-blue-100/80 bg-white p-5"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-base font-bold text-[#0b294d]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {detail}
              </p>
            </div>
          ))}
        </div>

        <h3 className="mt-10 text-lg font-bold text-[#0b294d]">
          Où en est Facturance Plus exactement
        </h3>
        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
          <ul className="grid gap-3">
            <li className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
              <CheckCircle2
                className="mt-1 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="font-semibold text-[#0b294d]">
                  Génération du fichier TEIF :
                </span>{" "}
                l’application Windows produit le fichier XML au format TEIF à
                partir d’une facture.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
              <CheckCircle2
                className="mt-1 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="font-semibold text-[#0b294d]">
                  Signature électronique :
                </span>{" "}
                le fichier généré peut être signé avec un certificat IDTrust que
                votre entreprise détient et configure dans l’application.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
              <CheckCircle2
                className="mt-1 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="font-semibold text-[#0b294d]">
                  Déclaration de retenue à la source :
                </span>{" "}
                l’application génère également le fichier XML de retenue à la
                source à partir des factures d’achat sélectionnées.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
              <span
                className="mt-1 grid size-4 shrink-0 place-items-center rounded-full border-2 border-slate-400 text-slate-500"
                aria-hidden="true"
              >
                <span className="block h-0.5 w-2 rounded bg-current" />
              </span>
              <span className="min-w-0">
                <span className="font-semibold text-[#0b294d]">
                  Transmission à El Fatoora / TTN : non prise en charge.
                </span>{" "}
                Facturance Plus ne transmet pas vos factures à la plateforme
                officielle. Cette étape reste à effectuer par vos moyens
                habituels auprès de TTN.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
              <span
                className="mt-1 grid size-4 shrink-0 place-items-center rounded-full border-2 border-slate-400 text-slate-500"
                aria-hidden="true"
              >
                <span className="block h-0.5 w-2 rounded bg-current" />
              </span>
              <span className="min-w-0">
                <span className="font-semibold text-[#0b294d]">
                  Homologation ou certification : non revendiquée.
                </span>{" "}
                Facturance Plus n’est pas une plateforme de transmission
                officielle et ne se présente pas comme un dispositif homologué
                ou certifié.
              </span>
            </li>
          </ul>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground">
          Ces fonctions relèvent de l’application Windows ; elles ne sont pas
          disponibles depuis la Version web. Par ailleurs, aucun logiciel ne peut
          garantir à votre place la conformité fiscale de votre entreprise : le
          périmètre, le calendrier et les modalités applicables se vérifient
          auprès des sources officielles citées en fin de page ou de votre
          conseiller comptable.
        </p>

        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          Pour préparer ce sujet sans se tromper de priorité, notre article sur
          les{" "}
          <Link
            href="/blog/facture-electronique-tunisie-erreurs-2026"
            className="font-semibold text-primary hover:underline"
          >
            dix erreurs à éviter sur la facture électronique
          </Link>{" "}
          traite la qualité des fiches, la numérotation et l’archivage, qui
          conditionnent toute démarche ultérieure.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="tarifs-title">
        <h2 id="tarifs-title" className={H2}>
          Combien coûte Facturance Plus ?
        </h2>
        <p className={LEAD}>
          Les tarifs sont publics et exprimés par entreprise et par mois. Le
          mode de fonctionnement détermine le prix ; le nombre d’entreprises
          détermine la remise.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-3">
          {pricingOffers.map((offer) => (
            <div
              key={offer.name}
              className="rounded-xl border border-blue-100/80 bg-white p-5"
            >
              <h3 className="text-sm font-bold text-[#0b294d]">{offer.name}</h3>
              <p className="mt-2 text-2xl font-bold tracking-tight text-[#0b294d]">
                {formatPrice(offer.price)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {offer.unitText}
              </p>
            </div>
          ))}
        </div>

        <ul className="mt-6 grid max-w-3xl gap-2 pl-5 marker:text-primary [&>li]:list-disc">
          <li className="leading-7 text-muted-foreground">
            Une remise supplémentaire s’applique à partir de trois entreprises
            rattachées au compte.
          </li>
          <li className="leading-7 text-muted-foreground">
            L’essai gratuit dure trois jours et permet d’associer entre une et
            trois entreprises.
          </li>
          <li className="leading-7 text-muted-foreground">
            L’essai fonctionne uniquement avec la base de données locale : le
            mode Local + serveur n’y est pas disponible.
          </li>
          <li className="leading-7 text-muted-foreground">
            Une offre personnalisée existe pour les périmètres qui ne rentrent
            pas dans ces formules.
          </li>
        </ul>

        <div className="mt-7">
          <Button asChild variant="outline" className="h-11 px-6">
            <Link href="/pricing">Voir les tarifs</Link>
          </Button>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="pourquoi-title">
        <h2 id="pourquoi-title" className={H2}>
          Pourquoi Facturance Plus est différent ?
        </h2>
        <p className={LEAD}>
          Sans superlatif : voici les différences concrètes, celles qui se
          vérifient en utilisant le produit.
        </p>
        <ul className="mt-5 grid max-w-3xl gap-2 pl-5 marker:text-primary [&>li]:list-disc">
          {differentiators.map((item) => (
            <li key={item} className="leading-7 text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
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
          traite le suivi des quantités.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="guides-title">
        <h2 id="guides-title" className={H2}>
          Guides utiles
        </h2>
        <p className={LEAD}>
          Nos articles de fond sur la facturation en Tunisie, pour approfondir
          un point précis.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {guides.map(({ href, label }) => (
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

      <section className="mt-14" aria-labelledby="faq-title">
        <h2 id="faq-title" className={H2}>
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

      <section className="mt-14" aria-labelledby="sources-title">
        <h2 id="sources-title" className={H2}>
          Sources officielles
        </h2>
        <p className={LEAD}>
          Les affirmations réglementaires de cette page s’appuient sur ces
          sources. Elles peuvent évoluer : vérifiez ce qui s’applique à votre
          entreprise.
        </p>

        <ul className="mt-6 grid gap-3">
          {officialSources.map(({ href, label, detail }) => (
            <li
              key={href}
              className="rounded-xl border border-blue-100/80 bg-white p-4"
            >
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-semibold text-primary hover:underline"
              >
                {label}
              </a>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {detail}
              </p>
            </li>
          ))}
        </ul>
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
