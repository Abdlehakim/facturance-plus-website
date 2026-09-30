import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CheckCircle2,
  Cloud,
  FileText,
  Globe,
  HardDrive,
  Layers,
  PackageCheck,
  Printer,
  ReceiptText,
  RefreshCw,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Les tarifs de Facturance Plus : Local uniquement, Local + serveur ou Version web, remise à partir de trois entreprises, et trois jours d’essai gratuit.",
  alternates: { canonical: "/pricing" },
};

/**
 * Every figure below is the one the product section of the homepage already
 * publishes; nothing here is a new commercial claim. The trial facts come from
 * the terms page ("L'essai gratuit dure trois jours", one to three companies)
 * and the client application's own signup screen (local database only).
 */

type Plan = {
  name: string;
  description: string;
  icon: LucideIcon;
  badge?: { label: string; tone: string };
  previousPrice?: string;
  price: string;
  priceSuffix?: string;
  note?: string;
  features: string[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Local uniquement",
    description:
      "Vos données restent enregistrées localement sur votre ordinateur, sans synchronisation avec le serveur Facturance.",
    icon: HardDrive,
    badge: {
      label: "-37,5 %",
      tone: "border-emerald-300 bg-emerald-100 text-emerald-800",
    },
    previousPrice: "40 DT",
    price: "25 DT",
    priceSuffix: "par entreprise / mois",
    note: "Économisez 15 DT par entreprise",
    features: [
      "Données enregistrées localement",
      "Toutes les fonctionnalités de gestion",
      "Aucune synchronisation serveur",
    ],
  },
  {
    name: "Version web",
    description:
      "Utilisez Facturance Plus directement depuis votre navigateur, sans installation : vos données sont hébergées sur le serveur Facturance.",
    icon: Globe,
    badge: {
      label: "-33,33 %",
      tone: "border-emerald-300 bg-emerald-100 text-emerald-800",
    },
    previousPrice: "45 DT",
    price: "30 DT",
    priceSuffix: "par entreprise / mois",
    note: "Économisez 15 DT par entreprise",
    features: [
      "Accès depuis votre navigateur",
      "Aucune installation sur votre ordinateur",
      "Données hébergées sur le serveur Facturance",
    ],
  },
  {
    name: "Local + serveur",
    description:
      "Vos données restent disponibles localement et sont synchronisées avec le serveur Facturance.",
    icon: Cloud,
    badge: {
      label: "Synchronisation incluse",
      tone: "border-sky-300 bg-sky-100 text-sky-800",
    },
    previousPrice: "60 DT",
    price: "40 DT",
    priceSuffix: "par entreprise / mois",
    note: "Économisez 20 DT par entreprise",
    features: [
      "Données enregistrées localement",
      "Synchronisation sécurisée avec le serveur",
      "Accès à l’espace client web",
    ],
    highlighted: true,
  },
  {
    name: "Tarif multi-entreprises",
    description:
      "Remise sur volume, indépendante du mode de fonctionnement : 10 % de réduction supplémentaire à partir de 3 entreprises.",
    icon: Layers,
    badge: {
      label: "-43,75 % au total",
      tone: "border-emerald-300 bg-emerald-100 text-emerald-800",
    },
    previousPrice: "120 DT",
    price: "67,50 DT",
    note: "Économisez 52,50 DT",
    features: [
      "Remise appliquée dès 3 entreprises",
      "Cumulable avec les deux modes",
      "Un seul compte client",
    ],
  },
];

/**
 * Kept out of `plans` because it is not priced per entreprise and does not
 * belong in the four-card row: it is rendered once, full width, underneath.
 */
const customPlan: Plan = {
  name: "Offre personnalisée",
  description:
    "Une offre adaptée à votre organisation, à vos besoins spécifiques et à votre périmètre fonctionnel.",
  icon: Sparkles,
  badge: {
    label: "Sur devis",
    tone: "border-slate-300 bg-slate-100 text-slate-700",
  },
  price: "Tarif établi selon vos besoins",
  features: [
    "Périmètre fonctionnel défini avec vous",
    "Accompagnement dédié",
    "Devis après analyse de votre besoin",
  ],
};

/** The capabilities the product section already lists, unchanged. */
const includedFeatures: { label: string; icon: LucideIcon }[] = [
  { label: "Factures et devis", icon: ReceiptText },
  { label: "Bons de commande et de livraison", icon: FileText },
  { label: "Clients et fournisseurs", icon: UserRoundCheck },
  { label: "Articles et stocks", icon: PackageCheck },
  { label: "Paiements et échéances", icon: CheckCircle2 },
  { label: "Gestion multi-entreprises", icon: Building2 },
  { label: "Génération et impression PDF", icon: Printer },
  { label: "Synchronisation sécurisée", icon: RefreshCw },
];

/** Only questions the repository can actually answer. */
const faqs = [
  {
    question: "Combien de temps dure l’essai gratuit ?",
    answer:
      "L’essai gratuit dure trois jours. Aucune reconduction n’est appliquée automatiquement à son terme.",
  },
  {
    question: "Combien d’entreprises puis-je associer pendant l’essai ?",
    answer:
      "L’inscription à l’essai permet d’associer entre une et trois entreprises au compte.",
  },
  {
    question: "L’essai gratuit fonctionne-t-il avec la synchronisation serveur ?",
    answer:
      "Non. L’essai gratuit fonctionne uniquement avec la base de données locale ; le mode Local + serveur n’est pas disponible pendant l’essai.",
  },
  {
    question: "Sur quelles versions de Windows Facturance Plus fonctionne-t-il ?",
    answer: "Facturance Plus fonctionne sur Windows 10 et Windows 11, en 64 bits.",
  },
  {
    question: "Puis-je gérer plusieurs entreprises ?",
    answer:
      "Oui. Un même compte client donne accès aux entreprises autorisées, et une remise de 10 % s’applique à partir de trois entreprises, quel que soit le mode de fonctionnement.",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-4 shadow-[0_18px_50px_rgba(11,41,77,0.09)] sm:p-5 ${
        plan.highlighted ? "border-primary/40" : "border-blue-200"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-blue-100/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-white shadow-lg shadow-blue-900/15">
            <Icon className="size-5" aria-hidden="true" />
          </span>

          {plan.badge && (
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${plan.badge.tone}`}
            >
              {plan.badge.label}
            </span>
          )}
        </div>

        <div className="mt-3 lg:min-h-[5.75rem]">
          <h3 className="text-xl font-bold tracking-tight text-[#0b294d]">
            {plan.name}
          </h3>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            {plan.description}
          </p>
        </div>

        <div className="mt-3 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 lg:min-h-[8.5rem]">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
            {plan.previousPrice && (
              <span className="pb-0.5 text-base font-semibold text-slate-400 line-through decoration-2">
                {plan.previousPrice}
              </span>
            )}
            <span
              className={`font-bold leading-none tracking-tight text-primary ${
                plan.priceSuffix || plan.previousPrice ? "text-4xl" : "text-xl"
              }`}
            >
              {plan.price}
            </span>
          </div>

          {plan.priceSuffix && (
            <p className="mt-2 text-sm font-semibold text-[#0b294d]">
              {plan.priceSuffix}
            </p>
          )}

          {plan.note && (
            <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
              {plan.note}
            </span>
          )}
        </div>

        <ul className="mt-4 grid gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold leading-5 text-[#0b294d]">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <Button asChild className="h-11 w-full">
            <a href={CLIENT_SIGNUP_URL}>Démarrer l’essai gratuit</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * The custom offer reads across rather than down: identity on the left, the
 * price box in the middle, the checklist and its call to action on the right.
 * Same tokens as PlanCard - only the arrangement differs, because the stacked
 * card stretched to the container width would have been mostly empty space.
 */
function CustomPlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-white p-4 shadow-[0_18px_50px_rgba(11,41,77,0.09)] sm:p-5">
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-blue-100/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid items-center gap-5 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-lg shadow-blue-900/15">
              <Icon className="size-5" aria-hidden="true" />
            </span>

            {plan.badge && (
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${plan.badge.tone}`}
              >
                {plan.badge.label}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-xl font-bold tracking-tight text-[#0b294d]">
            {plan.name}
          </h3>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            {plan.description}
          </p>
        </div>

        <div className="min-w-0 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 lg:col-span-3">
          <span className="text-xl font-bold leading-tight tracking-tight text-primary">
            {plan.price}
          </span>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <ul className="grid gap-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold leading-5 text-[#0b294d]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Button asChild className="mt-5 h-11 w-full">
            <Link href="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          TARIFS
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl lg:text-5xl">
          Des tarifs simples pour Facturance Plus
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          Choisissez votre mode de fonctionnement, Local uniquement, Local +
          serveur ou Version web, puis profitez d’un tarif adapté au nombre
          d’entreprises de votre compte. L’essai gratuit dure trois jours.
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

      <section className="mt-12">
        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mt-5">
          <CustomPlanCard plan={customPlan} />
        </div>
      </section>

      <section className="mt-14">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            INCLUS DANS L’APPLICATION
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl">
            Toutes les fonctionnalités, quel que soit le mode
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Le mode choisi détermine où vos données sont enregistrées, pas ce
            que vous pouvez faire.
          </p>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {includedFeatures.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-xl border border-blue-100/80 bg-white p-4"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
              <span className="min-w-0 text-sm font-semibold leading-5 text-[#0b294d]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            QUESTIONS FRÉQUENTES
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl">
            Avant de commencer
          </h2>
        </div>

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

      <section className="mt-14 overflow-hidden rounded-2xl bg-[#0b294d] px-6 py-10 text-center sm:px-10">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Prêt à essayer Facturance Plus ?
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
