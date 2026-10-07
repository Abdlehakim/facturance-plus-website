import Link from "next/link";
import { CheckCircle2, Layers, Sparkles } from "lucide-react";

import { plans, type Offer } from "@/components/public-site/pricing-data";
import { PricingBillingSelector } from "@/components/public-site/pricing-billing-selector";

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

type MultiCompanyPricing = Offer & {
  heading: string;
  introduction: string;
  explanation: string;
  pricingNote: string;
};

type CustomPlan = Offer & {
  price: string;
};

const multiCompanyPricing: MultiCompanyPricing = {
  name: "Tarif multi-entreprises",
  heading: "Profitez de 10 % de réduction dès 3 entreprises",
  description:
    "Gérez plusieurs entreprises et profitez d’une remise supplémentaire.",
  icon: Layers,
  badge: {
    label: "-10 % dès 3 entreprises",
    tone: "border-emerald-300 bg-emerald-100 text-emerald-800",
  },
  introduction:
    "À partir de 3 entreprises, bénéficiez de 10 % de réduction supplémentaire sur le tarif choisi.",
  explanation:
    "La remise s’applique au mode choisi — Local uniquement, Version web ou Local + serveur — et au cycle de paiement choisi. Elle se cumule avec le tarif annuel.",
  pricingNote:
    "Tarifs indiqués par entreprise. La remise de 10 % s’applique à partir de 3 entreprises. Le paiement annuel est facturé une fois par an.",
  features: [
    "Remise appliquée dès 3 entreprises",
    "Applicable aux trois modes",
    "Cumulable avec le tarif annuel",
    "Un seul compte client",
  ],
};

/**
 * Kept out of `plans` because it is not priced per entreprise and does not
 * belong in the operating-mode grid: it is rendered once, full width, below
 * the multi-enterprise section.
 */
const customPlan: CustomPlan = {
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

export function MultiEnterprisePricingSection() {
  const Icon = multiCompanyPricing.icon;

  return (
    <section
      id="tarif-multi-entreprises"
      className="scroll-mt-24 border-y border-blue-100 bg-gradient-to-br from-blue-50 via-white to-slate-50 py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                MULTI-ENTREPRISES
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl">
                {multiCompanyPricing.heading}
              </h2>
              <p className="mt-2 text-sm font-semibold text-primary">
                {multiCompanyPricing.name}
              </p>
            </div>
          </div>
          {multiCompanyPricing.badge && (
            <span
              className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${multiCompanyPricing.badge.tone}`}
            >
              {multiCompanyPricing.badge.label}
            </span>
          )}
        </div>

        <p className="mt-5 text-base leading-7 text-[#0b294d] sm:text-lg">
          {multiCompanyPricing.description}
        </p>
        <p className="mt-3 text-sm font-semibold leading-6 text-[#0b294d]">
          {multiCompanyPricing.introduction}
        </p>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
          {multiCompanyPricing.explanation}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="min-w-0 rounded-xl border border-blue-100 bg-white p-4"
            >
              <h3 className="text-base font-bold text-[#0b294d]">
                {plan.name}
              </h3>
              <div className="mt-3">
                <p className="text-sm font-semibold text-[#0b294d]">
                  Paiement mensuel
                </p>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-sm text-slate-400 line-through">
                    {plan.monthlyPrice}
                  </span>
                  <span className="text-sm text-muted-foreground">→</span>
                  <span className="text-xl font-bold text-primary">
                    {plan.volumeMonthlyPrice}
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  par entreprise / mois
                </p>
              </div>
              <div className="mt-4 border-t border-blue-100 pt-3">
                <p className="text-sm font-semibold text-[#0b294d]">
                  Paiement annuel
                </p>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-sm text-slate-400 line-through">
                    {plan.annualMonthlyEquivalent}
                  </span>
                  <span className="text-sm text-muted-foreground">→</span>
                  <span className="text-xl font-bold text-primary">
                    {plan.volumeAnnualMonthlyEquivalent}
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  / mois équivalent, par entreprise
                </p>
                <p className="mt-2 text-sm font-semibold leading-5 text-[#0b294d]">
                  {plan.volumeAnnualTotal} facturés par an / entreprise
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {multiCompanyPricing.pricingNote}
        </p>
        <div className="mt-5 flex flex-col gap-5 border-t border-blue-100 pt-5 lg:flex-row lg:items-center lg:justify-between">
          <ul className="grid gap-3 sm:grid-cols-2">
            {multiCompanyPricing.features.map((feature) => (
              <li key={feature} className="flex min-w-0 items-center gap-2">
                <CheckCircle2
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-[#0b294d]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          <Button asChild className="h-11 w-full lg:w-auto">
            <a href={CLIENT_SIGNUP_URL}>Démarrer l’essai gratuit</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * The custom offer reads across rather than down: identity on the left, the
 * price box in the middle, the checklist and its call to action on the right.
 * Same tokens as PlanCard - only the arrangement differs, because the stacked
 * card stretched to the container width would have been mostly empty space.
 */
function CustomPlanCard({ plan }: { plan: CustomPlan }) {
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
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
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

/** One offer, in the machine-readable form the homepage structured data needs. */
export type StructuredPricingOffer = {
  name: string;
  price: number;
  priceCurrency: string;
  unitText: string;
};

/**
 * The offers as structured data, parsed from the very strings the cards render
 * so a price can never be published with two different values.
 *
 * Only the three operating modes qualify. These are the normal monthly rates;
 * annual commitments and volume discounts have separate commercial conditions.
 */
export function getStructuredPricingOffers(): StructuredPricingOffer[] {
  return plans.flatMap((plan) => {
    // Parse the normal monthly amount, never the annual monthly equivalent.
    const amount = Number(
      plan.monthlyPrice.replace(/[^\d,.]/g, "").replace(",", "."),
    );

    return Number.isFinite(amount) && amount > 0
      ? [
          {
            name: plan.name,
            price: amount,
            priceCurrency: "TND",
            unitText: plan.monthlySuffix,
          },
        ]
      : [];
  });
}

/** The three operating modes; page-level sections own all surrounding content. */
export function PricingOffers() {
  return <PricingBillingSelector />;
}

export function CustomPricingOfferSection() {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <CustomPlanCard plan={customPlan} />
      </div>
    </section>
  );
}
