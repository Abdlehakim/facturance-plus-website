import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  CheckCircle2,
  Cloud,
  Globe,
  HardDrive,
  Layers,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

/**
 * The pricing offers, and the cards that render them.
 *
 * Both /pricing and the homepage tariff section mount `PricingOffers`, so a
 * price, a badge or a feature is edited once here and the two pages stay in
 * step. Only the surrounding section - heading, container width, background -
 * belongs to each page.
 */

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

/**
 * The four per-entreprise offers in one row, then the custom offer full width
 * beneath them. The wrapping section supplies its own container and spacing.
 */
export function PricingOffers() {
  return (
    <>
      <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>

      <div className="mt-5">
        <CustomPlanCard plan={customPlan} />
      </div>
    </>
  );
}
