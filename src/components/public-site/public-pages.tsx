/**
 * The public Facturance Plus pages, ported from the customer application.
 *
 * Markup and Tailwind classes are unchanged so the appearance is identical.
 * What changed is only what had to: react-router's Link became next/link,
 * and the three targets the client application owns - login, signup and the
 * authenticated downloads page - now cross the origin through the centralized
 * client URLs instead of resolving inside this site.
 */

import type * as React from "react"
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  CirclePlay,
  Clock3,
  Download,
  ExternalLink,
  FileLock2,
  FileText,
  HardDrive,
  Headphones,
  KeyRound,
  Mail,
  MessageCircle,
  PackageCheck,
  Phone,
  Printer,
  ReceiptText,
  RefreshCw,
  Scale,
  ShieldCheck,
  Store,
  UserRoundCheck,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { PricingOffers } from "@/components/public-site/pricing-offers"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  getPrivacyEmail,
  getSupportEmail,
  getSupportPhone,
  getSupportPhoneHref,
  getWhatsAppUrl,
  publicSiteConfig,
} from "@/lib/public-site-config"

import {
  CLIENT_DOWNLOADS_URL,
  CLIENT_LOGIN_URL,
  CLIENT_SIGNUP_URL,
} from "@/lib/urls"

function PublicPageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      {children}
    </div>
  )
}

function PublicPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </header>
  )
}

function LegalSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="scroll-mt-24 border-t pt-8">
      <h2 className="text-xl font-semibold tracking-tight text-[#0b294d] sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
        {children}
      </div>
    </section>
  )
}

function ContactEmailLink({
  email,
  label,
}: {
  email: string
  label: string
}) {
  return (
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center gap-2 rounded-md font-medium text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Mail className="size-4" />
      {label}
    </a>
  )
}

const inlineLinkClassName =
  "font-medium text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

const bulletListClassName =
  "grid gap-2 pl-5 marker:text-primary [&>li]:list-disc"

export function FacturancePlusPage() {
  const features = [
    {
      title: "Factures et devis",
      description:
        "Créez et suivez les documents essentiels de votre activité.",
      icon: ReceiptText,
    },
    {
      title: "Bons de commande et de livraison",
      description:
        "Structurez le cycle commercial, de la commande à la livraison.",
      icon: FileText,
    },
    {
      title: "Clients et fournisseurs",
      description:
        "Centralisez les coordonnées et les informations de vos partenaires.",
      icon: UserRoundCheck,
    },
    {
      title: "Articles et stocks",
      description:
        "Organisez votre catalogue et suivez les mouvements de stock.",
      icon: PackageCheck,
    },
    {
      title: "Paiements et échéances",
      description:
        "Gardez une vision claire des règlements et des dates importantes.",
      icon: CheckCircle2,
    },
    {
      title: "Gestion multi-entreprises",
      description:
        "Accédez aux entreprises autorisées depuis un même compte client.",
      icon: Building2,
    },
    {
      title: "Génération et impression PDF",
      description:
        "Prévisualisez, exportez et imprimez vos documents commerciaux.",
      icon: Printer,
    },
    {
      title: "Synchronisation sécurisée",
      description:
        "Utilisez les services activés pour votre compte et votre configuration.",
      icon: RefreshCw,
    },
  ]

  const heroBenefits = [
    {
      title: "Simple",
      description: "Interface intuitive et facile à prendre en main",
      icon: CheckCircle2,
    },
    {
      title: "Sécurisé",
      description: "Vos données sont protégées et sauvegardées",
      icon: ShieldCheck,
    },
    {
      title: "Performant",
      description: "Rapide et fiable pour gagner du temps au quotidien",
      icon: RefreshCw,
    },
  ]

  /*
   * What the application actually does, not audience or volume figures. The
   * previous bar published "50K+ factures", "70% de temps gagné" and the like,
   * which nothing in this repository backs.
   */
  const heroCapabilities = [
    {
      title: "Documents commerciaux",
      detail: "Factures, devis et bons",
      icon: FileText,
      iconClassName: "bg-blue-400/20 text-blue-200",
    },
    {
      title: "Gestion clients",
      detail: "Clients et fournisseurs",
      icon: UserRoundCheck,
      iconClassName: "bg-sky-400/20 text-sky-200",
    },
    {
      title: "Articles et stocks",
      detail: "Suivi centralisé",
      icon: PackageCheck,
      iconClassName: "bg-cyan-400/20 text-cyan-200",
    },
    {
      title: "Données",
      detail: "Sauvegarde et sécurité",
      icon: ShieldCheck,
      iconClassName: "bg-indigo-400/20 text-indigo-200",
    },
  ]

  /*
   * Floating cards drawn in HTML over the hero image, never baked into it.
   * Desktop only and marked decorative: the bar below states the same
   * capabilities for assistive technology.
   */
  /*
   * Capability widgets drawn in HTML around the product visual, never baked
   * into the image. Percentages are tuned to the reference composition: a left
   * cluster in the band between the copy and the monitor, and a right cluster
   * past the monitor's edge.
   */
  const heroFloatingCards = [
    {
      title: "Factures",
      detail: "Export PDF",
      icon: FileText,
      position: "left-[44%] top-[13%]",
      delay: "0s",
      wideOnly: false,
    },
    {
      title: "Clients",
      detail: "Gestion centralis\u00e9e",
      icon: UserRoundCheck,
      position: "left-[42%] top-[41%]",
      delay: "1.4s",
      wideOnly: false,
    },
    {
      title: "Stock",
      detail: "Suivi simplifi\u00e9",
      icon: PackageCheck,
      position: "left-[44%] top-[62%]",
      delay: "2.8s",
      wideOnly: false,
    },
    {
      title: "Paiements",
      detail: "Suivi des r\u00e8glements",
      icon: ReceiptText,
      position: "right-[1.5%] top-[44%]",
      delay: "2.1s",
      wideOnly: false,
    },
    {
      title: "Rapports",
      detail: "Vue d\u2019ensemble",
      icon: BarChart3,
      /** Fifth widget only once the viewport can carry it without crowding. */
      position: "right-[1.5%] top-[23%]",
      delay: "3.6s",
      wideOnly: true,
    },
  ]

  const whatsAppUrl = getWhatsAppUrl()

  return (
    <>
      <section className="relative flex flex-col overflow-hidden bg-[#031b35] text-white lg:block lg:min-h-[50rem] xl:min-h-[51.5rem]">
        {/*
          The product visual is a layer on the right rather than a full-bleed
          backdrop: covering the whole hero scaled the monitor far past the
          reference and cropped away its stand, keyboard and desk. Bound by the
          hero's height, the image shows its full vertical extent and the
          monitor lands at roughly 40% of the viewport width.

          Below lg the same element returns to the flow after the copy, which
          is why it is first in the DOM with `order-last`.
        */}
        <div className="relative order-last aspect-[16/10] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:aspect-auto lg:w-[70%]">
          <Image
            src="/facturance-plus-hero.webp"
            alt="Facturance Plus affich\u00e9 sur un \u00e9cran de bureau : logiciel de facturation et de gestion commerciale"
            fill
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover object-[72%_center] lg:object-right"
          />
        </div>

        {/*
          Navy wash blending the photograph into the flat left panel. Fully
          opaque under the copy, clear well before the monitor so the interface
          keeps the image's own brightness.
        */}
        <div
          className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(3,27,53,1)_0%,rgba(3,27,53,0.98)_30%,rgba(3,27,53,0.8)_40%,rgba(3,27,53,0.25)_52%,rgba(3,27,53,0)_62%)] lg:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-44 bg-gradient-to-t from-[#031b35]/80 to-transparent lg:block"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
          aria-hidden="true"
        >
          {heroFloatingCards.map(
            ({ title, detail, icon: Icon, position, delay, wideOnly }) => (
              <div
                key={title}
                style={{ animationDelay: delay }}
                className={`absolute flex w-[9.5rem] animate-[facturance-hero-float_6s_ease-in-out_infinite] items-center gap-2.5 rounded-xl border border-white/55 bg-white/90 px-3 py-2.5 shadow-[0_12px_28px_rgba(2,18,39,0.28)] backdrop-blur-sm motion-reduce:animate-none ${position} ${
                  wideOnly ? "hidden 2xl:flex" : ""
                }`}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#0b294d]/10 text-[#0b294d]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>

                <span className="min-w-0">
                  <span className="block text-[0.8125rem] font-bold leading-[1.05rem] text-[#0b294d]">
                    {title}
                  </span>
                  <span className="mt-0.5 block text-[0.6875rem] leading-[0.9rem] text-[#0b294d]/65">
                    {detail}
                  </span>
                </span>
              </div>
            ),
          )}
        </div>

        {/*
          Near-full-bleed with a 4% gutter, as in the reference: a centred
          max-width container pushed the copy too far inboard and left no room
          for the widgets between it and the monitor.
        */}
        <div className="relative z-20 mx-auto flex w-full max-w-[120rem] flex-col justify-center px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[50rem] lg:px-[4%] lg:py-14 xl:min-h-[51.5rem]">
          <div className="flex w-full min-w-0 max-w-xl flex-col gap-6 lg:max-w-[38.75rem]">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">
                LOGICIEL DE FACTURATION ET DE GESTION COMMERCIALE
              </p>
              <h1 className="mt-4 text-[1.75rem] font-bold leading-[1.08] tracking-tight sm:text-[2.05rem] lg:text-[2.35rem] xl:text-[2.6rem]">
                <span className="text-white">
                  Toute votre facturation et votre gestion commerciale
                </span>{" "}
                <span className="text-sky-300">
                  dans une seule application.
                </span>
              </h1>
              <p className="mt-4 text-sm leading-6 text-blue-50/85 sm:text-base sm:leading-7">
                Cr\u00e9ez vos factures, devis, bons de commande et de livraison, puis g\u00e9rez clients, fournisseurs, articles, stocks, paiements et entreprises depuis un seul espace.
              </p>
            </div>

            <ul className="grid min-w-0 gap-5 sm:grid-cols-3 lg:gap-5">
              {heroBenefits.map(({ title, description, icon: Icon }) => (
                <li key={title} className="flex min-w-0 items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-sky-200">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white sm:text-base">
                      {title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-blue-100/75 sm:text-sm">
                      {description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="min-w-0">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-stretch sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 w-full justify-start gap-3 rounded-md bg-white px-5 py-2 text-[#0b294d] shadow-[0_6px_16px_rgba(2,18,39,0.16)] hover:bg-blue-50 sm:w-[14.5rem] [&_svg]:size-6"
                >
                  <Link href={CLIENT_SIGNUP_URL}>
                    <Download aria-hidden="true" />
                    <span className="flex flex-col items-start gap-0.5 text-left">
                      <span className="text-sm font-semibold leading-5">
                        D\u00e9marrer l\u2019essai gratuit
                      </span>
                      <span className="text-xs font-medium leading-4 text-[#0b294d]/85">
                        3 jours d\u2019essai gratuit
                      </span>
                    </span>
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 w-full justify-start gap-3 rounded-md border border-white/60 bg-transparent px-5 py-2 text-white shadow-none hover:bg-white/10 hover:text-white sm:w-[16.5rem] [&_svg]:size-6"
                >
                  <a href="#features">
                    <CirclePlay aria-hidden="true" />
                    <span className="text-sm font-semibold leading-5">
                      D\u00e9couvrir les fonctionnalit\u00e9s
                    </span>
                  </a>
                </Button>
              </div>

              <p className="mt-3 flex items-center gap-2 text-sm text-blue-100/80">
                <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
                Aucune carte bancaire requise
              </p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-[#06223f]/80 shadow-[0_18px_44px_rgba(2,12,26,0.4)] backdrop-blur-sm lg:mt-12">
            <ul className="grid grid-cols-2 lg:grid-cols-4">
              {heroCapabilities.map(
                ({ title, detail, icon: Icon, iconClassName }, index) => (
                  <li
                    key={title}
                    className="relative flex min-w-0 items-center gap-3 px-3 py-4 sm:gap-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6"
                  >
                    {index > 0 ? (
                      <span
                        className="pointer-events-none absolute bottom-5 left-0 top-5 hidden w-px bg-white/15 lg:block"
                        aria-hidden="true"
                      />
                    ) : null}

                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-full sm:size-14 ${iconClassName}`}
                    >
                      <Icon className="size-5 sm:size-6" aria-hidden="true" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-bold leading-5 text-white sm:text-base">
                        {title}
                      </span>

                      <span className="mt-1 block text-xs leading-4 text-blue-100/80 sm:text-sm sm:leading-5">
                        {detail}
                      </span>
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24">
        <PublicPageContainer>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              UNE VUE D’ENSEMBLE
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d]">
              Tout le cycle commercial réuni dans un seul outil.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Du premier devis au règlement, Facturance Plus centralise les documents, partenaires, articles, stocks et paiements nécessaires à votre activité.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="gap-4 border-blue-100/80">
                <CardHeader>
                  <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle>
                    <h3 className="leading-snug">{title}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Link
            href="/features"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Voir toutes les fonctionnalités
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </PublicPageContainer>
      </section>

      <section
        id="pricing"
        className="scroll-mt-24 border-t bg-white lg:min-h-[calc(100svh-4.5rem)]"
      >
        <div className="mx-auto flex w-full max-w-[96rem] flex-col justify-center px-4 py-8 sm:px-6 lg:min-h-[calc(100svh-4.5rem)] lg:px-8 lg:py-5">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              TARIFICATION
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl">
              Choisissez l’offre adaptée à votre entreprise.
            </h2>

            <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              Choisissez votre mode de fonctionnement, Local uniquement, Local + serveur ou Version web, puis profitez d’un tarif adapté au nombre d’entreprises de votre compte.
            </p>
          </div>

          <div className="mx-auto mt-6 w-full max-w-[96rem]">
            <PricingOffers />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#eef6ff] via-white to-[#edf5ff]">
        <div
          className="pointer-events-none absolute -left-32 top-10 size-80 rounded-full bg-blue-200/30 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -right-32 bottom-10 size-80 rounded-full bg-sky-200/30 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              DÉMARRAGE
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl">
              Commencez avec Facturance Plus en quelques étapes.
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Créez votre compte, accédez à votre espace client, téléchargez
              l’application, puis installez Facturance Plus pour commencer à gérer
              vos factures, devis et entreprises.
            </p>
          </div>

          <div className="relative mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-8 hidden border-t-2 border-dashed border-primary/30 xl:block"
              aria-hidden="true"
            />

            <div className="relative flex h-full flex-col rounded-2xl border border-blue-200 bg-white p-5 text-center shadow-[0_18px_45px_rgba(11,41,77,0.08)] sm:p-6">
              <span className="absolute left-1/2 top-0 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#eef6ff] bg-primary text-lg font-bold text-white shadow-lg shadow-blue-900/15">
                1
              </span>

              <span className="mx-auto mt-5 grid size-14 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-primary shadow-sm">
                <UserRoundCheck className="size-7" aria-hidden="true" />
              </span>

              <h3 className="mt-5 text-lg font-bold text-[#0b294d]">
                Créer votre compte
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Inscrivez-vous et renseignez les informations nécessaires pour
                activer votre accès à Facturance Plus.
              </p>

              <div className="mt-auto pt-5">
                <Button asChild className="w-full">
                  <Link href={CLIENT_SIGNUP_URL}>
                    <UserRoundCheck />
                    Créer un compte
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative flex h-full flex-col rounded-2xl border border-blue-200 bg-white p-5 text-center shadow-[0_18px_45px_rgba(11,41,77,0.08)] sm:p-6">
              <span className="absolute left-1/2 top-0 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#eef6ff] bg-primary text-lg font-bold text-white shadow-lg shadow-blue-900/15">
                2
              </span>

              <span className="mx-auto mt-5 grid size-14 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-primary shadow-sm">
                <KeyRound className="size-7" aria-hidden="true" />
              </span>

              <h3 className="mt-5 text-lg font-bold text-[#0b294d]">
                Accéder à l’espace client
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Connectez-vous à votre tableau de bord client pour gérer votre
                compte, vos entreprises et vos accès.
              </p>

              <div className="mt-auto pt-5">
                <Button asChild className="w-full">
                  <Link href={CLIENT_LOGIN_URL}>
                    <KeyRound />
                    Ouvrir l’espace client
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative flex h-full flex-col rounded-2xl border border-blue-200 bg-white p-5 text-center shadow-[0_18px_45px_rgba(11,41,77,0.08)] sm:p-6">
              <span className="absolute left-1/2 top-0 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#eef6ff] bg-primary text-lg font-bold text-white shadow-lg shadow-blue-900/15">
                3
              </span>

              <span className="mx-auto mt-5 grid size-14 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-primary shadow-sm">
                <Download className="size-7" aria-hidden="true" />
              </span>

              <h3 className="mt-5 text-lg font-bold text-[#0b294d]">
                Télécharger l’application
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Depuis votre espace client, ouvrez la page des téléchargements et
                choisissez l’installation Windows disponible.
              </p>

              <div className="mt-auto pt-5">
                <Button asChild className="w-full">
                  <Link href={CLIENT_DOWNLOADS_URL}>
                    <Download />
                    Télécharger l’application
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative flex h-full flex-col rounded-2xl border border-blue-200 bg-white p-5 text-center shadow-[0_18px_45px_rgba(11,41,77,0.08)] sm:p-6">
              <span className="absolute left-1/2 top-0 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#eef6ff] bg-primary text-lg font-bold text-white shadow-lg shadow-blue-900/15">
                4
              </span>

              <span className="mx-auto mt-5 grid size-14 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-primary shadow-sm">
                <PackageCheck className="size-7" aria-hidden="true" />
              </span>

              <h3 className="mt-5 text-lg font-bold text-[#0b294d]">
                Installer et commencer
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Installez Facturance Plus sur votre ordinateur, ouvrez l’application
                et connectez-vous avec le même compte.
              </p>

              <div className="mt-auto pt-5">
                <Button asChild variant="outline" className="w-full">
                  <Link href={CLIENT_DOWNLOADS_URL}>
                    <PackageCheck />
                    Voir les options d’installation
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-blue-200 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-6 md:grid-cols-3">
            <div className="flex items-start gap-4 md:border-r md:border-blue-100 md:pr-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-100 text-primary">
                <Clock3 className="size-5" aria-hidden="true" />
              </span>

              <div>
                <h3 className="text-sm font-bold text-[#0b294d]">
                  Installation rapide
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Suivez les étapes et devenez opérationnel rapidement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 md:border-r md:border-blue-100 md:px-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-100 text-primary">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>

              <div>
                <h3 className="text-sm font-bold text-[#0b294d]">
                  Accès sécurisé
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Votre compte et vos accès sont protégés par une authentification
                  sécurisée.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 md:pl-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-100 text-primary">
                <RefreshCw className="size-5" aria-hidden="true" />
              </span>

              <div>
                <h3 className="text-sm font-bold text-[#0b294d]">
                  Mises à jour simples
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Accédez facilement aux nouvelles versions disponibles depuis votre
                  espace client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <PublicPageContainer>
          <div className="rounded-3xl bg-gradient-to-r from-[#0b294d] to-[#1764a4] px-6 py-10 text-white shadow-xl shadow-blue-950/10 sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0 lg:flex-1">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Prêt à simplifier votre facturation ?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                Créez votre compte d’essai, connectez-vous, puis téléchargez Facturance Plus pour Windows.
              </p>
            </div>
            <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-[1.55fr_1fr_0.9fr] lg:mt-0 lg:w-[34rem] lg:shrink-0">
              <Button asChild className="h-10 w-full bg-white text-[#0b294d] hover:bg-blue-50">
                <Link href={CLIENT_SIGNUP_URL}>Démarrer l’essai gratuit</Link>
              </Button>
              <Button asChild variant="outline" className="h-10 w-full border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link href={CLIENT_LOGIN_URL}>Se connecter</Link>
              </Button>
              {whatsAppUrl ? (
                <Button asChild variant="outline" className="h-10 w-full border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </Button>
              ) : (
                <Button asChild variant="outline" className="h-10 w-full border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link href="/support">Support</Link>
                </Button>
              )}
            </div>
          </div>
        </PublicPageContainer>
      </section>
    </>
  )
}

export function PrivacyPage() {
  const privacyEmail = getPrivacyEmail()

  return (
    <PublicPageContainer>
      <PublicPageHeader
        eyebrow="VIE PRIVÉE ET DONNÉES"
        title="Politique de confidentialité"
        description="Cette politique explique comment Facturance Plus traite les informations liées aux comptes, aux sessions, au portail client et à l’utilisation de l’application de bureau et de ses services facultatifs."
      />
      <p className="mt-5 text-sm font-medium text-muted-foreground">
        Dernière mise à jour : {publicSiteConfig.lastUpdated}
      </p>

      <div className="mt-10 space-y-4 rounded-2xl border bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <LegalSection title="Responsable du traitement">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-foreground">Produit</dt>
              <dd>{publicSiteConfig.brandName}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Éditeur</dt>
              <dd>{publicSiteConfig.publisherName}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Pays</dt>
              <dd>{publicSiteConfig.country}</dd>
            </div>
            {publicSiteConfig.legalEntityName && (
              <div>
                <dt className="font-semibold text-foreground">Entité juridique</dt>
                <dd>{publicSiteConfig.legalEntityName}</dd>
              </div>
            )}
            {publicSiteConfig.postalAddress && (
              <div>
                <dt className="font-semibold text-foreground">Adresse</dt>
                <dd>{publicSiteConfig.postalAddress}</dd>
              </div>
            )}
            {publicSiteConfig.registrationNumber && (
              <div>
                <dt className="font-semibold text-foreground">Immatriculation</dt>
                <dd>{publicSiteConfig.registrationNumber}</dd>
              </div>
            )}
          </dl>
        </LegalSection>

        <LegalSection title="Informations traitées">
          <p>
            Le portail client et les services côté serveur peuvent traiter les informations de compte, de session et de sécurité suivantes :
          </p>
          <ul className={bulletListClassName}>
            <li>le nom, le nom d’utilisateur et le numéro de téléphone ;</li>
            <li>l’adresse e-mail lorsqu’elle est fournie ;</li>
            <li>le statut du compte et sa date d’expiration ;</li>
            <li>les entreprises associées au compte ;</li>
            <li>les identifiants de session, leur expiration et leur statut de révocation ;</li>
            <li>l’agent utilisateur, l’adresse IP et les événements d’authentification ou de sécurité ;</li>
            <li>les informations techniques nécessaires aux téléchargements et mises à jour de l’application.</li>
          </ul>
          <p>
            L’application de bureau peut également traiter localement sur l’appareil les catégories de données professionnelles suivantes, sans que celles-ci soient automatiquement téléversées vers les serveurs de Facturance Plus :
          </p>
          <ul className={bulletListClassName}>
            <li>les informations d’identification et de contact des entreprises ;</li>
            <li>les informations relatives aux clients, aux fournisseurs et aux transporteurs ;</li>
            <li>les articles et les services ;</li>
            <li>les informations de stock et d’entrepôt ;</li>
            <li>les factures, les devis, les bons de commande, les bons de livraison et les factures d’achat ;</li>
            <li>les paiements, les dépenses, les informations de trésorerie, les soldes clients et les effets commerciaux ;</li>
            <li>les documents PDF ainsi que les fichiers importés ou exportés ;</li>
            <li>les fichiers de factures numérisées et les informations qui en sont extraites.</li>
          </ul>
          <p>
            Lorsque Meta Pixel est activé sur le site public, des informations techniques liées à la navigation peuvent être transmises à Meta, notamment les pages consultées, l’URL visitée, des informations relatives au navigateur et à l’appareil ainsi que des identifiants techniques utilisés pour la mesure publicitaire. Ce traitement concerne uniquement la navigation sur le site public et ne donne pas accès aux mots de passe, aux documents commerciaux ni aux données enregistrées localement par l’application de bureau.
          </p>
        </LegalSection>

        <LegalSection title="Données professionnelles et documents commerciaux">
          <p>
            L’application de bureau Electron traite les informations professionnelles saisies, importées, générées, numérisées ou gérées par l’utilisateur afin de fournir les fonctions de facturation et de gestion commerciale.
          </p>
          <p>
            Ces informations peuvent notamment concerner les fiches de entreprises, les clients, les fournisseurs, les transporteurs, les articles et services, les inventaires et mouvements de stock, les factures et documents commerciaux associés, les paiements, les dépenses, la trésorerie, les PDF générés ainsi que les factures d’achat importées ou numérisées.
          </p>
          <p>
            L’utilisateur ou l’organisation cliente est responsable de s’assurer que les informations professionnelles et personnelles saisies dans Facturance Plus sont licites, exactes et utilisées à des fins professionnelles légitimes.
          </p>
        </LegalSection>

        <LegalSection title="Stockage local sur l’appareil">
          <p>
            L’application de bureau stocke les données commerciales des entreprises localement, dans des fichiers de base de données SQLite sur l’ordinateur Windows de l’utilisateur. Ces bases locales peuvent contenir les entreprises, les clients, les fournisseurs, les articles, les documents, les informations de stock, les paiements, les informations de trésorerie, les paramètres et les enregistrements professionnels associés.
          </p>
          <p>
            Les documents générés et les fichiers exportés peuvent également être enregistrés dans les emplacements sélectionnés par l’utilisateur.
          </p>
          <p>
            Les informations liées à l’authentification utilisées par l’application de bureau, notamment le jeton de session, le numéro de téléphone mémorisé et l’enregistrement d’autorisation hors ligne, sont stockées au moyen du mécanisme sécurisé de stockage des identifiants du système d’exploitation.
          </p>
          <p>
            Les bases de données professionnelles locales sont distinctes des enregistrements de compte et de session conservés côté serveur pour le portail client. L’utilisateur reste responsable de la sécurité de son appareil et de son compte Windows, des sauvegardes et des exports, ainsi que du contrôle de l’accès aux informations professionnelles stockées localement.
          </p>
        </LegalSection>

        <LegalSection title="Services externes facultatifs">
          <p>
            Les traitements décrits dans cette section ont lieu uniquement lorsque la fonctionnalité correspondante est configurée et activement utilisée.
          </p>
          <p>
            <strong>Azure Document Intelligence.</strong> Lorsque l’utilisateur lance la numérisation d’une facture, l’image ou le PDF sélectionné est envoyé à Azure Document Intelligence pour analyse et extraction des informations de la facture. Les informations extraites peuvent comprendre les coordonnées du fournisseur, les identifiants fiscaux, les numéros et dates de facture, les totaux, les taxes, les coordonnées de contact et les lignes d’articles. Cette fonctionnalité est facultative et nécessite une configuration.
          </p>
          <p>
            <strong>Envoi par e-mail SMTP.</strong> Lorsque l’utilisateur envoie un document par e-mail, le fournisseur SMTP configuré traite les adresses de l’expéditeur et du destinataire. Il peut également traiter l’objet, le contenu du message, les pièces jointes, les PDF générés et le logo facultatif de la entreprise. Le fournisseur SMTP est choisi et configuré par l’utilisateur ou l’organisation cliente.
          </p>
          <p>
            <strong>WhatsApp.</strong> Lorsque le mode API WhatsApp Cloud est configuré et utilisé, l’application peut transmettre le numéro de téléphone du destinataire, téléverser le document PDF pour sa livraison et transmettre le nom du fichier ainsi qu’une légende facultative. Ce traitement est effectué par l’intermédiaire de l’API WhatsApp Cloud de Meta et ne s’applique pas lorsque cette fonctionnalité est désactivée ou qu’une méthode de partage limitée à l’application de bureau est utilisée.
          </p>
          <p>
            <strong>Meta Pixel.</strong> Le site public peut utiliser Meta Pixel pour mesurer les consultations de pages et évaluer les performances des campagnes publicitaires. Des informations techniques de navigation peuvent être transmises à Meta dans le cadre de ce service.
          </p>
          <p>
            Les fournisseurs externes peuvent traiter ces informations selon leurs propres conditions d’utilisation et politiques de confidentialité.
          </p>
        </LegalSection>

        <LegalSection title="Finalités">
          <ul className={bulletListClassName}>
            <li>création et gestion du compte client ;</li>
            <li>authentification et sécurité des sessions ;</li>
            <li>gestion de l’accès aux entreprises ;</li>
            <li>gestion des comptes d’essai ;</li>
            <li>distribution de l’application et de ses mises à jour ;</li>
            <li>assistance client ;</li>
            <li>prévention de la fraude et des abus ;</li>
            <li>fiabilité, maintenance et sécurité du service ;</li>
            <li>production de factures et de documents commerciaux ;</li>
            <li>gestion des clients, fournisseurs, articles, services, stocks, paiements et de la trésorerie ;</li>
            <li>génération, prévisualisation, impression et export de documents PDF ;</li>
            <li>traitement des factures numérisées lorsque l’utilisateur le demande explicitement ;</li>
            <li>envoi de documents par les services d’e-mail ou WhatsApp configurés lorsque l’utilisateur le demande explicitement ;</li>
            <li>fourniture des fonctions professionnelles locales hors ligne ;</li>
            <li>maintien de la sécurité de l’application et de l’accès autorisé aux entreprises ;</li>
            <li>mesure de l’audience, attribution et analyse des performances des campagnes publicitaires lorsque Meta Pixel est utilisé.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies et sessions">
          <p>
            Le portail client utilise un cookie d’authentification essentiel. Ce cookie est <strong>HttpOnly</strong>, est marqué <strong>Secure</strong> en production et utilise <strong>SameSite Strict</strong>. Il est nécessaire au maintien d’une session client connectée.
          </p>
          <p>
            Le site public utilise également Meta Pixel à des fins de mesure d’audience, d’attribution et d’analyse des campagnes publicitaires. Meta peut utiliser des cookies ou des technologies similaires afin de mesurer les interactions avec le site et de relier certaines visites à des campagnes publicitaires.
          </p>
          <p>
            Ces technologies publicitaires ne sont pas nécessaires au fonctionnement du compte client ou de l’application Facturance Plus.
          </p>
        </LegalSection>

        <LegalSection title="Sécurité">
          <p>
            Les mesures appliquées comprennent notamment le hachage des mots de passe, le hachage des jetons de session sur le serveur, l’utilisation de HTTPS, la restriction des accès aux comptes autorisés, l’expiration et la révocation des sessions, ainsi que le stockage des informations d’authentification de l’application de bureau au moyen du mécanisme sécurisé de stockage des identifiants du système d’exploitation.
          </p>
          <p>
            Aucune mesure technique ou organisationnelle ne peut toutefois garantir une sécurité absolue.
          </p>
        </LegalSection>

        <LegalSection title="Destinataires des données">
          <ul className={bulletListClassName}>
            <li>le personnel Facturance Plus ou Smartwebify autorisé, dans la limite de ses fonctions ;</li>
            <li>les prestataires d’hébergement et d’infrastructure lorsque cela est nécessaire au service ;</li>
            <li>Azure, lorsque la numérisation de factures est configurée et utilisée ;</li>
            <li>le fournisseur SMTP configuré par l’utilisateur, lorsque l’envoi par e-mail est utilisé ;</li>
            <li>Meta et WhatsApp, lorsque la livraison par l’API WhatsApp Cloud est configurée et utilisée ;</li>
            <li>Meta, lorsque Meta Pixel est chargé sur le site public à des fins de mesure d’audience, d’attribution et d’analyse publicitaire ;</li>
            <li>Microsoft, pour la distribution par le Microsoft Store et les services liés aux mises à jour, le cas échéant ;</li>
            <li>les autorités compétentes lorsque la loi l’exige.</li>
          </ul>
          <p>
            Ces destinataires reçoivent uniquement les données nécessaires à la fonctionnalité ou au service sélectionné.
          </p>
        </LegalSection>

        <LegalSection title="Conservation">
          <p>
            Les enregistrements de compte et de session côté serveur sont conservés pendant la durée nécessaire au fonctionnement du service, à la sécurité, au respect des obligations légales et au traitement des demandes d’assistance. Les enregistrements de sessions expirées ou révoquées peuvent être conservés temporairement à des fins de sécurité et d’audit.
          </p>
          <p>
            Les données professionnelles des bases SQLite locales restent sur l’appareil de l’utilisateur jusqu’à ce qu’elles soient supprimées, remplacées, restaurées ou autrement gérées par l’utilisateur au moyen de l’application ou du système d’exploitation.
          </p>
          <p>
            Les informations transmises à un service externe peuvent être conservées par le fournisseur tiers sélectionné conformément à ses propres conditions et à sa politique de conservation.
          </p>
        </LegalSection>

        <LegalSection title="Vos droits">
          <p>
            Selon les règles applicables, vous pouvez demander l’accès, la correction, l’export, la suppression ou la limitation du traitement de vos données, ainsi que vous opposer à certains traitements lorsque ce droit s’applique.
          </p>
          <p>
            Consultez la page{" "}
            <Link href="/data-requests" className={inlineLinkClassName}>
              Demandes relatives aux données
            </Link>{" "}
            pour connaître la procédure.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          {privacyEmail ? (
            <ContactEmailLink
              email={privacyEmail}
              label="Contacter l’équipe chargée de la confidentialité"
            />
          ) : (
            <p>
              Pour toute question relative à la confidentialité, consultez la page{" "}
              <Link href="/support" className={inlineLinkClassName}>
                Support
              </Link>.
            </p>
          )}
        </LegalSection>

        <LegalSection title="Modifications de cette politique">
          <p>
            Cette politique peut être mise à jour pour refléter l’évolution des services ou des obligations applicables. La date de dernière mise à jour affichée sur cette page sera alors modifiée.
          </p>
        </LegalSection>
      </div>

      <nav className="mt-8 flex flex-wrap gap-4 text-sm" aria-label="Pages associées">
        <Link href="/data-requests" className={inlineLinkClassName}>Demandes relatives aux données</Link>
        <Link href="/support" className={inlineLinkClassName}>Support</Link>
        <Link href="/terms" className={inlineLinkClassName}>Conditions d’utilisation</Link>
      </nav>
    </PublicPageContainer>
  )
}

export function SupportPage() {
  const supportEmail = getSupportEmail()
  const supportPhone = getSupportPhone()
  const supportPhoneHref = getSupportPhoneHref()
  const whatsAppUrl = getWhatsAppUrl()
  const supportTopics = [
    {
      title: "Connexion impossible",
      icon: KeyRound,
      content: (
        <ul className={bulletListClassName}>
          <li>Vérifiez le numéro de téléphone saisi.</li>
          <li>Vérifiez votre mot de passe sans le communiquer à un tiers.</li>
          <li>Assurez-vous que le compte est actif et qu’il n’a pas expiré.</li>
        </ul>
      ),
    },
    {
      title: "Session déjà active",
      icon: ShieldCheck,
      content: (
        <p>
          Lorsque le portail signale une session active, vous pouvez déconnecter la session client précédente puis continuer sur l’appareil actuel.
        </p>
      ),
    },
    {
      title: "Compte ou essai expiré",
      icon: RefreshCw,
      content: (
        <p>
          L’accès d’essai dure trois jours. Un compte expiré doit être renouvelé ou réactivé avec l’assistance Facturance Plus.
        </p>
      ),
    },
    {
      title: "Entreprise indisponible",
      icon: Building2,
      content: (
        <p>
          Vérifiez qu’au moins une entreprise active est associée à votre compte. Contactez l’assistance si un accès a été retiré de manière inattendue.
        </p>
      ),
    },
    {
      title: "Installation directe Windows",
      icon: Download,
      content: (
        <ol className="grid gap-2 pl-5 marker:font-semibold marker:text-primary [&>li]:list-decimal">
          <li>Connectez-vous à votre compte.</li>
          <li>Ouvrez la page <Link href={CLIENT_DOWNLOADS_URL} className={inlineLinkClassName}>Téléchargements</Link>.</li>
          <li>Téléchargez l’installateur EXE x64 publié.</li>
          <li>Vérifiez le nom du fichier et son empreinte SHA-256 affichés sur la page.</li>
        </ol>
      ),
    },
    {
      title: "Microsoft Store",
      icon: Store,
      content: (
        <p>
          Après connexion, ouvrez la page <Link href={CLIENT_DOWNLOADS_URL} className={inlineLinkClassName}>Téléchargements</Link> et utilisez l’option Microsoft Store lorsqu’elle est disponible. Les mises à jour sont alors gérées par Microsoft Store.
        </p>
      ),
    },
    {
      title: "PDF et impression",
      icon: Printer,
      content: (
        <p>
          Vérifiez que l’imprimante est disponible, relancez l’aperçu PDF puis redémarrez l’application si le problème persiste.
        </p>
      ),
    },
  ]

  return (
    <PublicPageContainer>
      <PublicPageHeader
        eyebrow="CENTRE D’AIDE"
        title="Support Facturance Plus"
        description="Trouvez les principales étapes de résolution et les moyens de contacter l’assistance Facturance Plus."
      />

      <section className="mt-10 grid gap-5 md:grid-cols-2" aria-label="Rubriques d’assistance">
        {supportTopics.map(({ title, icon: Icon, content }) => (
          <Card key={title} className="gap-4">
            <CardHeader>
              <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <CardTitle><h2 className="text-lg">{title}</h2></CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-7 text-slate-700">
              {content}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-4">
          <FileLock2 className="mt-0.5 size-6 shrink-0 text-amber-700" />
          <div>
            <h2 className="font-semibold text-amber-950">Avertissement de sécurité</h2>
            <p className="mt-2 text-sm leading-7 text-amber-900">
              Téléchargez Facturance Plus uniquement depuis <strong>client.plus.facturance.com</strong> ou depuis Microsoft Store lorsque l’option est disponible. N’utilisez pas de site tiers.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-[#0b294d] p-6 text-white sm:p-8">
        <Headphones className="size-7 text-blue-300" />
        <h2 className="mt-4 text-2xl font-semibold">Contacter l’assistance</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {supportEmail && (
            <a
              href={`mailto:${supportEmail}`}
              className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              <Mail className="size-5 shrink-0 text-blue-300" aria-hidden="true" />
              <span>{supportEmail}</span>
            </a>
          )}

          {supportPhone && supportPhoneHref && (
            <a
              href={supportPhoneHref}
              className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              <Phone className="size-5 shrink-0 text-blue-300" aria-hidden="true" />
              <span>
                Téléphone : {supportPhone}
              </span>
            </a>
          )}

          {supportPhone && whatsAppUrl && (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <MessageCircle
                className="size-5 shrink-0 text-emerald-300"
                aria-hidden="true"
              />
              <span>
                WhatsApp : {supportPhone}
              </span>
            </a>
          )}
        </div>
        <nav className="mt-6 flex flex-wrap gap-3" aria-label="Accès utiles">
          <Button asChild className="bg-white text-[#0b294d] hover:bg-blue-50">
            <Link href={CLIENT_LOGIN_URL}>Se connecter</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            <Link href="/data-requests">Demandes relatives aux données</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            <Link href="/privacy">Confidentialité</Link>
          </Button>
        </nav>
      </section>
    </PublicPageContainer>
  )
}

export function TermsPage() {
  const supportEmail = getSupportEmail()

  return (
    <PublicPageContainer>
      <PublicPageHeader
        eyebrow="CADRE D’UTILISATION"
        title="Conditions d’utilisation"
        description="Ces conditions encadrent l’accès au portail client et l’utilisation de Facturance Plus."
      />
      <p className="mt-5 text-sm font-medium text-muted-foreground">
        Dernière mise à jour : {publicSiteConfig.lastUpdated}
      </p>

      <div className="mt-10 space-y-4 rounded-2xl border bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <LegalSection title="Objet">
          <p>Ces conditions définissent les règles d’accès au portail client, à l’application et aux services Facturance Plus associés.</p>
        </LegalSection>
        <LegalSection title="Compte client">
          <p>Un compte actif et non expiré est nécessaire pour utiliser les fonctions protégées. Les informations d’inscription doivent être exactes et tenues à jour.</p>
        </LegalSection>
        <LegalSection title="Identifiants et sécurité">
          <p>Le client doit protéger ses identifiants, choisir un mot de passe confidentiel et signaler toute utilisation suspecte de son compte.</p>
        </LegalSection>
        <LegalSection title="Essai gratuit">
          <p>L’essai gratuit dure trois jours. L’inscription à l’essai permet d’associer entre une et trois entreprises au compte.</p>
        </LegalSection>
        <LegalSection title="Entreprises associées au compte">
          <p>L’accès est limité aux entreprises actives expressément associées au compte. La suppression ou la désactivation d’une association peut retirer l’accès correspondant.</p>
        </LegalSection>
        <LegalSection title="Utilisation acceptable">
          <p>Le service ne doit pas être utilisé à des fins illicites, frauduleuses, nuisibles à la sécurité ou susceptibles de perturber son fonctionnement.</p>
        </LegalSection>
        <LegalSection title="Responsabilité des données saisies">
          <p>Le client est responsable de l’exactitude, de la licéité et de l’utilisation des données qu’il saisit ou importe dans Facturance Plus.</p>
        </LegalSection>
        <LegalSection title="Fonctionnement du service">
          <p>Une connexion Internet peut être requise pour l’authentification et les services en ligne. La disponibilité peut être interrompue pour maintenance ou en raison de contraintes techniques.</p>
        </LegalSection>
        <LegalSection title="Installation et mises à jour">
          <p>La distribution directe par installateur EXE et la distribution par Microsoft Store peuvent coexister. Le client doit utiliser les canaux officiels présentés par Facturance Plus.</p>
        </LegalSection>
        <LegalSection title="Suspension et résiliation">
          <p>L’accès peut être suspendu ou retiré lorsque le compte expire, lorsque la sécurité l’exige ou en cas d’utilisation contraire aux présentes conditions ou aux obligations applicables.</p>
        </LegalSection>
        <LegalSection title="Propriété intellectuelle">
          <p>Les éléments logiciels, marques, textes, interfaces et contenus Facturance Plus restent protégés par les droits de propriété intellectuelle applicables. Aucun droit non expressément accordé n’est transféré au client.</p>
        </LegalSection>
        <LegalSection title="Sauvegardes et exports">
          <p>Le client doit organiser les sauvegardes et exports utiles à son activité selon les fonctions et services activés dans sa configuration.</p>
        </LegalSection>
        <LegalSection title="Limitation de responsabilité">
          <p>Dans les limites autorisées par les règles applicables, Facturance Plus ne peut garantir un fonctionnement permanent ou exempt d’erreur. Le client doit vérifier les documents et résultats produits avant leur utilisation professionnelle.</p>
        </LegalSection>
        <LegalSection title="Modifications des conditions">
          <p>Ces conditions peuvent évoluer avec le service ou les obligations applicables. La date de dernière mise à jour sera modifiée lorsqu’une nouvelle version est publiée.</p>
        </LegalSection>
        <LegalSection title="Droit applicable">
          <p>
            {publicSiteConfig.governingLaw ??
              "Les règles de droit applicables seront déterminées conformément aux informations contractuelles communiquées au client et aux dispositions impératives applicables."}
          </p>
        </LegalSection>
        <LegalSection title="Contact">
          {supportEmail ? (
            <ContactEmailLink email={supportEmail} label="Contacter Facturance Plus" />
          ) : (
            <p>Pour toute question, consultez la page <Link href="/support" className={inlineLinkClassName}>Support</Link>.</p>
          )}
        </LegalSection>
      </div>

      <nav className="mt-8 flex flex-wrap gap-4 text-sm" aria-label="Pages associées">
        <Link href="/privacy" className={inlineLinkClassName}>Confidentialité</Link>
        <Link href="/support" className={inlineLinkClassName}>Support</Link>
        <Link href="/legal" className={inlineLinkClassName}>Mentions légales</Link>
      </nav>
    </PublicPageContainer>
  )
}

export function LegalPage() {
  const supportEmail = getSupportEmail()
  const supportPhone = getSupportPhone()
  const supportPhoneHref = getSupportPhoneHref()

  return (
    <PublicPageContainer>
      <PublicPageHeader
        eyebrow="INFORMATIONS LÉGALES"
        title="Mentions légales"
        description="Informations relatives à l’éditeur et à l’exploitation du service Facturance Plus."
      />

      <div className="mt-10 space-y-4 rounded-2xl border bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <LegalSection title="Informations principales">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-foreground">Nom du produit</dt>
              <dd>{publicSiteConfig.brandName}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Éditeur</dt>
              <dd>{publicSiteConfig.publisherName}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Site</dt>
              <dd>
                <a
                  href={publicSiteConfig.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLinkClassName}
                >
                  {publicSiteConfig.siteUrl}
                  <ExternalLink className="ml-1 inline size-3.5" />
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Pays</dt>
              <dd>{publicSiteConfig.country}</dd>
            </div>
            {publicSiteConfig.legalEntityName && (
              <div>
                <dt className="font-semibold text-foreground">Raison sociale</dt>
                <dd>{publicSiteConfig.legalEntityName}</dd>
              </div>
            )}
            {publicSiteConfig.postalAddress && (
              <div>
                <dt className="font-semibold text-foreground">Adresse postale</dt>
                <dd>{publicSiteConfig.postalAddress}</dd>
              </div>
            )}
            {supportEmail && (
              <div>
                <dt className="font-semibold text-foreground">E-mail d’assistance</dt>
                <dd><ContactEmailLink email={supportEmail} label={supportEmail} /></dd>
              </div>
            )}
            {supportPhone && supportPhoneHref && (
              <div>
                <dt className="font-semibold text-foreground">Téléphone</dt>
                <dd>
                  <a href={supportPhoneHref} className={inlineLinkClassName}>
                    {supportPhone}
                  </a>
                </dd>
              </div>
            )}
            {publicSiteConfig.registrationNumber && (
              <div>
                <dt className="font-semibold text-foreground">Numéro d’immatriculation</dt>
                <dd>{publicSiteConfig.registrationNumber}</dd>
              </div>
            )}
            {publicSiteConfig.taxNumber && (
              <div>
                <dt className="font-semibold text-foreground">Identifiant fiscal</dt>
                <dd>{publicSiteConfig.taxNumber}</dd>
              </div>
            )}
          </dl>
        </LegalSection>
        <LegalSection title="Éditeur">
          <p>Le produit {publicSiteConfig.brandName} et ce site sont édités par {publicSiteConfig.publisherName}.</p>
        </LegalSection>
        <LegalSection title="Publication">
          <p>La publication du service et des informations présentées sur ce site est assurée par {publicSiteConfig.publisherName}.</p>
        </LegalSection>
        <LegalSection title="Hébergement">
          <p>Les informations détaillées relatives à l’infrastructure d’hébergement peuvent être communiquées sur demande légitime.</p>
        </LegalSection>
        <LegalSection title="Propriété intellectuelle">
          <p>Les marques, logiciels, textes, graphismes et interfaces associés à Facturance Plus sont protégés. Toute reproduction ou exploitation non autorisée est interdite.</p>
        </LegalSection>
        <LegalSection title="Responsabilité">
          <p>Les informations du site sont fournies avec soin, mais peuvent évoluer. L’utilisateur reste responsable de vérifier l’adéquation du service à son usage et les documents produits dans le cadre de son activité.</p>
        </LegalSection>
        <LegalSection title="Liens externes">
          <p>Les liens vers des services externes sont proposés à titre utile. Leur contenu, leur disponibilité et leurs politiques relèvent de leurs exploitants respectifs.</p>
        </LegalSection>
        <LegalSection title="Contact">
          {supportEmail ? (
            <ContactEmailLink email={supportEmail} label="Contacter l’éditeur" />
          ) : (
            <p>Les informations de contact disponibles sont publiées sur la page <Link href="/support" className={inlineLinkClassName}>Support</Link>.</p>
          )}
        </LegalSection>
        <LegalSection title="Données personnelles">
          <p>Pour connaître les traitements de données et exercer vos droits, consultez la <Link href="/privacy" className={inlineLinkClassName}>Politique de confidentialité</Link> et la page <Link href="/data-requests" className={inlineLinkClassName}>Demandes relatives aux données</Link>.</p>
        </LegalSection>
      </div>

      <nav className="mt-8 flex flex-wrap gap-4 text-sm" aria-label="Pages associées">
        <Link href="/privacy" className={inlineLinkClassName}>Confidentialité</Link>
        <Link href="/support" className={inlineLinkClassName}>Support</Link>
        <Link href="/data-requests" className={inlineLinkClassName}>Demandes relatives aux données</Link>
      </nav>
    </PublicPageContainer>
  )
}

export function DataRequestsPage() {
  const privacyEmail = getPrivacyEmail()
  const requestTypes = [
    { label: "Demande d’accès", icon: UserRoundCheck },
    { label: "Demande de correction", icon: FileText },
    { label: "Demande d’export", icon: HardDrive },
    { label: "Demande de suppression du compte", icon: FileLock2 },
    { label: "Demande de suppression de données de entreprise", icon: Building2 },
    {
      label:
        "Demande de limitation ou d’opposition, lorsque ce droit s’applique",
      icon: Scale,
    },
  ]
  const subject = encodeURIComponent(
    "Demande relative aux données — Facturance Plus",
  )

  return (
    <PublicPageContainer>
      <PublicPageHeader
        eyebrow="EXERCER VOS DROITS"
        title="Demandes relatives aux données"
        description="Découvrez comment demander l’accès, la correction, l’export ou la suppression de vos données."
      />

      <section className="mt-10" aria-labelledby="request-types-title">
        <h2 id="request-types-title" className="text-2xl font-semibold text-[#0b294d]">
          Types de demandes
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {requestTypes.map(({ label, icon: Icon }) => (
            <Card key={label} className="gap-4">
              <CardHeader>
                <span className="mb-2 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <CardTitle><h3 className="leading-snug">{label}</h3></CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <UserRoundCheck className="mt-1 size-7 shrink-0 text-primary" />
          <div>
            <h2 className="text-2xl font-semibold text-[#0b294d]">Procédure de demande</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              Contactez Facturance Plus au moyen de l’adresse de confidentialité configurée ou du canal d’assistance disponible. Indiquez :
            </p>
            <ul className={`${bulletListClassName} mt-4 text-sm leading-7 text-slate-700 sm:text-base`}>
              <li>le nom d’utilisateur du compte ;</li>
              <li>le numéro de téléphone associé ;</li>
              <li>le type de demande ;</li>
              <li>les entreprises concernées ;</li>
              <li>les détails suffisants pour comprendre et traiter la demande.</li>
            </ul>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
              <p>Facturance Plus peut demander une vérification d’identité avant de traiter la demande.</p>
              <p>Une demande peut être limitée lorsque la conservation de certaines informations est imposée par une obligation légale.</p>
              <p>La suppression d’un compte peut retirer l’accès aux entreprises associées et mettre fin aux sessions actives.</p>
              <p>Le portail client actuel ne propose pas de bouton automatique de suppression en libre-service.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <div className="flex items-start gap-4">
          <FileLock2 className="mt-0.5 size-6 shrink-0 text-rose-700" />
          <div>
            <h2 className="font-semibold text-rose-950">Protégez vos identifiants</h2>
            <p className="mt-2 text-sm leading-7 text-rose-900">
              Ne communiquez jamais votre mot de passe dans une demande d’assistance ou une demande relative aux données.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-[#0b294d] p-6 text-white sm:p-8">
        <Mail className="size-7 text-blue-300" />
        <h2 className="mt-4 text-2xl font-semibold">Envoyer une demande</h2>
        {privacyEmail ? (
          <Button asChild className="mt-5 bg-white text-[#0b294d] hover:bg-blue-50">
            <a href={`mailto:${privacyEmail}?subject=${subject}`}>
              <Mail />
              Demande relative aux données
            </a>
          </Button>
        ) : (
          <div className="mt-5">
            <Button asChild className="bg-white text-[#0b294d] hover:bg-blue-50">
              <Link href="/support">
                <Headphones />
                Consulter le support
              </Link>
            </Button>
          </div>
        )}
      </section>
    </PublicPageContainer>
  )
}
