import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  ChevronRight,
  CircleHelp,
  Database,
  Download,
  FileText,
  Heart,
  LayoutGrid,
  LogIn,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

import {
  getSupportEmail,
  getSupportPhone,
  getSupportPhoneHref,
  getWhatsAppUrl,
  publicSiteConfig,
} from "@/lib/public-site-config";
import {
  CLIENT_DOWNLOADS_URL,
  CLIENT_LOGIN_URL,
  CLIENT_SIGNUP_URL,
} from "@/lib/urls";

/**
 * Ported from the customer application's PublicSiteLayout footer.
 *
 * No interactivity, so it stays a server component. The three links the
 * client application owns - updates, trial signup and login - became
 * cross-origin `external` entries pointing at the centralized client URLs.
 */

type FooterLinkKind = "route" | "anchor" | "external";

type FooterLinkItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  kind: FooterLinkKind;
  openInNewTab?: boolean;
};

const productFooterLinks: FooterLinkItem[] = [
  {
    label: "Fonctionnalités",
    href: "/#features",
    icon: LayoutGrid,
    kind: "anchor",
  },
  {
    label: "Tarifs",
    href: "/#pricing",
    icon: BadgeDollarSign,
    kind: "anchor",
  },
  {
    label: "Mises à jour",
    href: CLIENT_DOWNLOADS_URL,
    icon: Download,
    kind: "external",
  },
  {
    label: "Essai gratuit",
    href: CLIENT_SIGNUP_URL,
    icon: UserPlus,
    kind: "external",
  },
  {
    label: "Se connecter",
    href: CLIENT_LOGIN_URL,
    icon: LogIn,
    kind: "external",
  },
];

const legalFooterLinks: FooterLinkItem[] = [
  {
    label: "Conditions d’utilisation",
    href: "/terms",
    icon: FileText,
    kind: "route",
  },
  {
    label: "Politique de confidentialité",
    href: "/privacy",
    icon: ShieldCheck,
    kind: "route",
  },
  {
    label: "Mentions légales",
    href: "/legal",
    icon: Scale,
    kind: "route",
  },
  {
    label: "Demandes relatives aux données",
    href: "/data-requests",
    icon: Database,
    kind: "route",
  },
];

function FooterBrandMark() {
  return (
    <Image
      src="/facturance-plus-icon.svg"
      alt=""
      width={44}
      height={44}
      className="size-11 object-contain"
      aria-hidden="true"
    />
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H8v3h2.6v8h3.1Z"
      />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.4 8.3A1.9 1.9 0 1 0 6.4 4.5a1.9 1.9 0 0 0 0 3.8ZM4.8 20h3.3V10H4.8v10Zm5.4 0h3.3v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20h3.3v-6.2c0-3-0.7-5.3-4.2-5.3-1.7 0-2.8.9-3.3 1.8h-.1V10h-3.2c.1 1 .1 10 .1 10Z"
      />
    </svg>
  );
}

function YouTubeMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z"
      />
    </svg>
  );
}

function FooterNavigationColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLinkItem[];
}) {
  return (
    <section>
      <h2 className="text-[18px] font-bold leading-none text-white">{title}</h2>

      <span
        className="mt-3 block h-[2px] w-12 rounded-full bg-[#58a6ff]"
        aria-hidden="true"
      />

      <nav className="mt-5 grid gap-2.5" aria-label={title}>
        {links.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <span className="flex min-w-0 items-center gap-3">
                <Icon
                  className="size-[18px] shrink-0 stroke-[1.8] text-slate-300 transition-colors group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="leading-5">{item.label}</span>
              </span>

              <ChevronRight
                className="size-4 shrink-0 stroke-[1.8] text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-white"
                aria-hidden="true"
              />
            </>
          );
          const className =
            "group flex min-h-9 items-center justify-between gap-4 rounded-md text-sm font-normal leading-5 text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]";

          if (item.kind === "route") {
            return (
              <Link
                key={`${title}-${item.label}`}
                href={item.href}
                className={className}
              >
                {content}
              </Link>
            );
          }

          return (
            <a
              key={`${title}-${item.label}`}
              href={item.href}
              target={item.openInNewTab ? "_blank" : undefined}
              rel={item.openInNewTab ? "noreferrer" : undefined}
              className={className}
            >
              {content}
            </a>
          );
        })}
      </nav>
    </section>
  );
}

export function PublicSiteFooter() {
  const currentYear = new Date().getFullYear();
  const supportEmail = getSupportEmail();
  const supportPhone = getSupportPhone();
  const supportPhoneHref = getSupportPhoneHref();
  const whatsAppUrl = getWhatsAppUrl();
  const footerLocation =
    publicSiteConfig.postalAddress ?? publicSiteConfig.country;
  const socialButtonClassName =
    "grid size-10 shrink-0 place-items-center rounded-full border border-white/[0.06] bg-[#132b46] text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#3f6388] hover:bg-[#193553] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]";

  const supportFooterLinks: FooterLinkItem[] = [
    {
      label: "Centre d’aide",
      href: "/support",
      icon: CircleHelp,
      kind: "route",
    },
    ...(whatsAppUrl
      ? [
          {
            label: "WhatsApp",
            href: whatsAppUrl,
            icon: MessageCircle,
            kind: "external" as const,
            openInNewTab: true,
          },
        ]
      : []),
    ...(supportEmail
      ? [
          {
            label: "Nous contacter par e-mail",
            href: `mailto:${supportEmail}`,
            icon: Mail,
            kind: "external" as const,
          },
        ]
      : []),
    ...(supportPhone && supportPhoneHref
      ? [
          {
            label: `Téléphone : ${supportPhone}`,
            href: supportPhoneHref,
            icon: Phone,
            kind: "external" as const,
          },
        ]
      : []),
    {
      label: "Demandes relatives aux données",
      href: "/data-requests",
      icon: Database,
      kind: "route",
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#071b32] px-5 py-10 text-slate-200 sm:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-9 md:grid-cols-2 xl:grid-cols-[1.05fr_0.85fr_1.05fr_1fr] xl:gap-x-12">
          <section>
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center">
                <FooterBrandMark />
              </span>
              <h2 className="text-xl font-bold tracking-[-0.02em] text-white">
                {publicSiteConfig.brandName}
              </h2>
            </div>

            <p className="mt-5 max-w-[300px] text-sm font-normal leading-7 text-slate-300">
              La solution de gestion complète pour votre entreprise. Facturation,
              devis, stock et bien plus encore.
            </p>

            {supportPhone && supportPhoneHref && (
              <a
                href={supportPhoneHref}
                className="mt-6 flex w-fit items-center gap-3 rounded-md text-sm font-normal text-slate-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]"
              >
                <Phone
                  className="size-[19px] shrink-0 stroke-[1.8] text-slate-300"
                  aria-hidden="true"
                />
                {supportPhone}
              </a>
            )}

            {supportEmail && (
              <a
                href={`mailto:${supportEmail}`}
                className="mt-3 flex w-fit items-center gap-3 rounded-md text-sm font-normal text-slate-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]"
              >
                <Mail
                  className="size-[19px] shrink-0 stroke-[1.8] text-slate-300"
                  aria-hidden="true"
                />
                {supportEmail}
              </a>
            )}

            {footerLocation && (
              <p className="mt-3 flex items-center gap-3 text-sm font-normal text-slate-200">
                <MapPin
                  className="size-[19px] shrink-0 stroke-[1.8] text-slate-300"
                  aria-hidden="true"
                />
                {footerLocation}
              </p>
            )}
          </section>

          <FooterNavigationColumn title="Produit" links={productFooterLinks} />
          <FooterNavigationColumn title="Support" links={supportFooterLinks} />
          <FooterNavigationColumn title="Légal" links={legalFooterLinks} />
        </div>

        <div className="my-8 border-t border-[#28435e]/70" aria-hidden="true" />

        <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_1fr_auto] lg:gap-10">
          <div className="text-sm font-normal leading-6 text-slate-300">
            <p>
              © {currentYear} {publicSiteConfig.brandName}. Tous droits réservés.
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-2">
              <span>Conçu avec</span>
              <Heart
                className="size-4 fill-[#58a6ff] text-[#58a6ff]"
                aria-hidden="true"
              />
              <span>en {publicSiteConfig.country}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 lg:justify-center">
            <ShieldCheck
              className="size-7 shrink-0 stroke-[1.8] text-[#4c91ff]"
              aria-hidden="true"
            />
            <p className="max-w-[210px] text-sm font-normal leading-5 text-slate-300">
              Accès au compte et sessions sécurisés
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            <span className="whitespace-nowrap text-sm font-normal text-slate-300">
              Suivez-nous
            </span>

            <div className="flex items-center gap-2">
              {publicSiteConfig.facebookUrl && (
                <a
                  href={publicSiteConfig.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className={socialButtonClassName}
                >
                  <FacebookMark />
                </a>
              )}

              {publicSiteConfig.linkedInUrl && (
                <a
                  href={publicSiteConfig.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className={socialButtonClassName}
                >
                  <LinkedInMark />
                </a>
              )}

              {publicSiteConfig.youtubeUrl && (
                <a
                  href={publicSiteConfig.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className={socialButtonClassName}
                >
                  <YouTubeMark />
                </a>
              )}

              {supportEmail && (
                <a
                  href={`mailto:${supportEmail}`}
                  aria-label="Envoyer un e-mail"
                  className={socialButtonClassName}
                >
                  <Mail className="size-[18px] stroke-[1.8]" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
