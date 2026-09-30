import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ChevronRight,
  CircleHelp,
  Database,
  Download,
  FileText,
  Mail,
  MessageCircle,
  Newspaper,
  Scale,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getSupportEmail,
  getWhatsAppUrl,
} from "@/lib/public-site-config";
import { CLIENT_DOWNLOADS_URL } from "@/lib/urls";

export const metadata: Metadata = {
  title: "Ressources utiles",
  description:
    "Le blog, le centre d’aide, le contact et les documents légaux de Facturance Plus, réunis au même endroit.",
  alternates: { canonical: "/resources" },
};

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
          L’aide, les actualités du produit et les documents légaux de
          Facturance Plus.
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
