import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  CircleHelp,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getSupportEmail,
  getSupportPhone,
  getSupportPhoneHref,
  getWhatsAppUrl,
  publicSiteConfig,
} from "@/lib/public-site-config";
import { buildPageMetadata } from "@/lib/seo";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Une question sur Facturance Plus ou besoin d’assistance ? Contactez l’équipe par e-mail, par téléphone ou sur WhatsApp.",
  path: "/contact",
});

/**
 * Only the channels the public site config actually defines are rendered. The
 * previous contact page carried a form that posted nowhere, so it is not
 * reproduced here: every route below reaches a real inbox or number.
 */
type Channel = {
  label: string;
  value: string;
  href: string;
  description: string;
  icon: LucideIcon;
  openInNewTab?: boolean;
};

export default function ContactPage() {
  const supportEmail = getSupportEmail();
  const supportPhone = getSupportPhone();
  const supportPhoneHref = getSupportPhoneHref();
  const whatsAppUrl = getWhatsAppUrl();

  const channels: Channel[] = [
    ...(supportEmail
      ? [
          {
            label: "E-mail",
            value: supportEmail,
            href: `mailto:${supportEmail}`,
            description:
              "Pour toute question sur le produit, une offre ou votre compte.",
            icon: Mail,
          },
        ]
      : []),
    ...(supportPhone && supportPhoneHref
      ? [
          {
            label: "Téléphone",
            value: supportPhone,
            href: supportPhoneHref,
            description: "Pour joindre directement l’équipe Facturance Plus.",
            icon: Phone,
          },
        ]
      : []),
    ...(whatsAppUrl && supportPhone
      ? [
          {
            label: "WhatsApp",
            value: supportPhone,
            href: whatsAppUrl,
            description: "Pour échanger par message avec l’assistance.",
            icon: MessageCircle,
            openInNewTab: true,
          },
        ]
      : []),
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          CONTACT
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl lg:text-5xl">
          Parlons de votre activité
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          L’équipe {publicSiteConfig.brandName} répond à vos questions sur le
          produit, les tarifs et l’installation.
        </p>
      </header>

      <section className="mt-12 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel) => {
          const Icon = channel.icon;

          return (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.openInNewTab ? "_blank" : undefined}
              rel={channel.openInNewTab ? "noreferrer" : undefined}
              className="flex h-full flex-col rounded-2xl border border-blue-100/80 bg-white p-6 transition-colors hover:border-primary/30"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>

              <h2 className="mt-4 text-lg font-bold text-[#0b294d]">
                {channel.label}
              </h2>
              <p className="mt-1 break-words text-base font-semibold text-primary">
                {channel.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {channel.description}
              </p>
            </a>
          );
        })}
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-blue-100/80 bg-white p-6">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <CircleHelp className="size-4" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-[#0b294d]">
            Une question sur l’application ?
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Le centre d’aide rassemble les réponses aux questions les plus
            fréquentes.
          </p>
          <Link
            href="/support"
            className="mt-4 inline-flex text-sm font-semibold text-primary"
          >
            Consulter le centre d’aide
          </Link>
        </div>

        <div className="rounded-2xl border border-blue-100/80 bg-white p-6">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <MapPin className="size-4" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-[#0b294d]">Éditeur</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {publicSiteConfig.publisherName}
            {publicSiteConfig.postalAddress
              ? ` — ${publicSiteConfig.postalAddress}`
              : ""}
            {` — ${publicSiteConfig.country}`}
          </p>
          <Link
            href="/legal"
            className="mt-4 inline-flex text-sm font-semibold text-primary"
          >
            Voir les mentions légales
          </Link>
        </div>
      </section>

      <section className="mt-14 overflow-hidden rounded-2xl bg-[#0b294d] px-6 py-10 text-center sm:px-10">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Prêt à essayer {publicSiteConfig.brandName} ?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-blue-100">
          Créez votre compte et découvrez l’application pendant trois jours,
          sans engagement.
        </p>
        <Button
          asChild
          className="mt-7 h-11 bg-white px-6 text-[#0b294d] hover:bg-blue-50"
        >
          <a href={CLIENT_SIGNUP_URL}>Démarrer l’essai gratuit</a>
        </Button>
      </section>
    </div>
  );
}
