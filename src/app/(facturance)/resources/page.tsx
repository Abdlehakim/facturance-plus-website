import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  BookOpen,
  Boxes,
  ChevronRight,
  CircleHelp,
  Database,
  Download,
  FileSignature,
  FileText,
  LayoutGrid,
  Mail,
  MessageCircle,
  Newspaper,
  PackageCheck,
  ReceiptText,
  Scale,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getSupportEmail,
  getWhatsAppUrl,
} from "@/lib/public-site-config";
import { buildPageMetadata } from "@/lib/seo";
import { CLIENT_DOWNLOADS_URL } from "@/lib/urls";

export const metadata: Metadata = buildPageMetadata({
  title: "Ressources utiles",
  description:
    "Guides de facturation, facturation électronique, gestion de stock, pages produit, aide et documents légaux de Facturance Plus, réunis au même endroit.",
  path: "/resources",
});

type ResourceLink = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Leaves this site: rendered as a plain anchor rather than a route. */
  external?: boolean;
  openInNewTab?: boolean;
};

type ResourceGroup = {
  title: string;
  description: string;
  links: ResourceLink[];
};

/**
 * Every entry points at something that already exists on this site or at a
 * contact channel the public site config actually defines. Nothing here
 * promises documentation or downloads that have not been published.
 */
function buildGroups(): ResourceGroup[] {
  const supportEmail = getSupportEmail();
  const whatsAppUrl = getWhatsAppUrl();

  return [
    {
      title: "Aide et accompagnement",
      description:
        "Les canaux par lesquels joindre l’équipe Facturance Plus.",
      links: [
        {
          label: "Centre d’aide",
          description:
            "Les réponses aux questions les plus fréquentes sur l’application.",
          href: "/support",
          icon: CircleHelp,
        },
        {
          label: "Contact",
          description: "Écrire à l’équipe à propos du produit ou d’une offre.",
          href: "/contact",
          icon: MessageCircle,
        },
        ...(whatsAppUrl
          ? [
              {
                label: "WhatsApp",
                description: "Joindre l’assistance directement par message.",
                href: whatsAppUrl,
                icon: MessageCircle,
                external: true,
                openInNewTab: true,
              } satisfies ResourceLink,
            ]
          : []),
        ...(supportEmail
          ? [
              {
                label: "Nous écrire par e-mail",
                description: supportEmail,
                href: `mailto:${supportEmail}`,
                icon: Mail,
                external: true,
              } satisfies ResourceLink,
            ]
          : []),
      ],
    },
    {
      title: "Guides et comparatifs",
      description:
        "Les pages qui expliquent ce que couvre Facturance Plus, et comment il se situe.",
      links: [
        {
          label: "Logiciel de facturation en Tunisie",
          description: "Ce que couvre un outil de facturation, pas à pas.",
          href: "/logiciel-facturation-tunisie",
          icon: ReceiptText,
        },
        {
          label: "Logiciel de gestion commerciale",
          description: "Tiers, catalogue, stock et règlements au même endroit.",
          href: "/logiciel-gestion-commerciale-tunisie",
          icon: LayoutGrid,
        },
        {
          label: "Logiciel de gestion de stock",
          description: "Articles, dépôts, seuils et alertes.",
          href: "/logiciel-gestion-stock-tunisie",
          icon: PackageCheck,
        },
        {
          label: "Comparatif des logiciels de facturation",
          description: "Sept solutions comparées selon les mêmes critères.",
          href: "/comparatif-logiciel-facturation-tunisie",
          icon: Scale,
        },
      ],
    },
    {
      title: "Guides de facturation",
      description:
        "Ce qu’il faut savoir pour émettre des documents corrects, et les corriger quand il le faut.",
      links: [
        {
          label: "Les mentions obligatoires d’une facture",
          description:
            "Les informations à contrôler sur chaque facture émise en Tunisie.",
          href: "/blog/mentions-obligatoires-facture-tunisie",
          icon: ReceiptText,
        },
        {
          label: "Devis, bons et factures",
          description:
            "Quatre documents, quatre rôles distincts dans une même vente.",
          href: "/blog/devis-bon-commande-bon-livraison-facture",
          icon: FileText,
        },
        {
          label: "La facture d’avoir",
          description:
            "Quand et comment corriger ou annuler une facture déjà émise.",
          href: "/blog/facture-avoir-tunisie",
          icon: BookOpen,
        },
        {
          label: "Relancer une facture impayée",
          description:
            "Une méthode progressive qui préserve la relation client.",
          href: "/blog/relance-facture-impayee",
          icon: Banknote,
        },
      ],
    },
    {
      title: "Facturation électronique",
      description:
        "Les étapes réelles du dispositif, et ce qu’il faut préparer en amont.",
      links: [
        {
          label: "Facture électronique : guide pratique",
          description:
            "Ce qu’est réellement une facture électronique, et en quoi elle diffère d’un PDF.",
          href: "/blog/facture-electronique-tunisie-2026",
          icon: FileSignature,
        },
        {
          label: "Les dix erreurs à éviter",
          description:
            "Qualité des fiches, numérotation et archivage : la préparation qui compte.",
          href: "/blog/facture-electronique-tunisie-erreurs-2026",
          icon: ShieldCheck,
        },
      ],
    },
    {
      title: "Gestion, stock et choix d’outil",
      description:
        "Organiser l’activité au-delà de l’émission des documents.",
      links: [
        {
          label: "Sept bonnes pratiques de gestion de stock",
          description:
            "Des habitudes applicables sans outil sophistiqué.",
          href: "/blog/gestion-stock-bonnes-pratiques",
          icon: Boxes,
        },
        {
          label: "Gérer plusieurs entreprises",
          description:
            "Centraliser sans mélanger les clients, documents et stocks.",
          href: "/blog/logiciel-gestion-multi-entreprise",
          icon: LayoutGrid,
        },
        {
          label: "La trésorerie d’une PME",
          description:
            "Suivre les encaissements, les échéances et les besoins réels.",
          href: "/blog/gestion-tresorerie-pme-tunisie",
          icon: Banknote,
        },
        {
          label: "Logiciel ou Excel ?",
          description:
            "À partir de quand le tableur coûte plus qu’il ne rapporte.",
          href: "/blog/logiciel-facturation-ou-excel",
          icon: Scale,
        },
        {
          label: "Local, web ou synchronisé",
          description:
            "Comment trancher sur le mode de fonctionnement.",
          href: "/blog/logiciel-facturation-local-web-synchronise-tunisie",
          icon: Database,
        },
      ],
    },
    {
      title: "Produit et actualités",
      description: "Suivre ce que devient Facturance Plus.",
      links: [
        {
          label: "Blog",
          description: "Articles, annonces et notes de publication.",
          href: "/blog",
          icon: Newspaper,
        },
        {
          label: "Télécharger l’application",
          description:
            "Installation Windows et Microsoft Store, depuis votre espace client.",
          href: CLIENT_DOWNLOADS_URL,
          icon: Download,
          external: true,
        },
      ],
    },
    {
      title: "Documents légaux",
      description:
        "Les conditions et les informations que Facturance Plus publie.",
      links: [
        {
          label: "Conditions d’utilisation",
          description: "Le cadre d’accès et d’utilisation du service.",
          href: "/terms",
          icon: FileText,
        },
        {
          label: "Politique de confidentialité",
          description: "Ce que l’application collecte et comment c’est traité.",
          href: "/privacy",
          icon: ShieldCheck,
        },
        {
          label: "Mentions légales",
          description: "L’éditeur du service et ses informations légales.",
          href: "/legal",
          icon: Scale,
        },
        {
          label: "Demandes relatives aux données",
          description: "Exercer vos droits sur vos données personnelles.",
          href: "/data-requests",
          icon: Database,
        },
      ],
    },
  ];
}

function ResourceCard({
  label,
  description,
  href,
  icon: Icon,
  external,
  openInNewTab,
}: ResourceLink) {
  const content = (
    <Card className="group h-full max-w-none gap-3 border-blue-100/80 transition-colors hover:border-primary/30">
      <CardHeader>
        <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <CardTitle>
          <h3 className="flex items-center justify-between gap-3 leading-snug">
            <span className="min-w-0">{label}</span>
            <ChevronRight
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="break-words text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );

  if (external) {
    return (
      <a
        href={href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noreferrer" : undefined}
        className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {content}
    </Link>
  );
}

export default function ResourcesPage() {
  const groups = buildGroups();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          RESSOURCES UTILES
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl lg:text-5xl">
          Tout ce dont vous avez besoin, au même endroit.
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          Les guides pratiques, les pages produit, l’aide et les documents
          légaux de Facturance Plus. Le{" "}
          <Link href="/blog" className="font-semibold text-primary hover:underline">
            blog
          </Link>{" "}
          réunit l’ensemble des articles.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {groups.map((group) => (
          <section key={group.title}>
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl">
                {group.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {group.description}
              </p>
            </div>

            <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.links.map((link) => (
                <ResourceCard key={link.label} {...link} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
