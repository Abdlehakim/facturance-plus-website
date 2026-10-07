"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { plans, type Plan } from "@/components/public-site/pricing-data";
import { Button } from "@/components/ui/button";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

type BillingCycle = "monthly" | "annual";

const billingOptions: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Mensuel" },
  { value: "annual", label: "Annuel" },
];

function PlanCard({
  plan,
  billingCycle,
}: {
  plan: Plan;
  billingCycle: BillingCycle;
}) {
  const Icon = plan.icon;
  const isAnnual = billingCycle === "annual";

  return (
    <div
      className={`relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-white p-4 shadow-[0_18px_50px_rgba(11,41,77,0.09)] sm:p-5 ${
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

          {isAnnual && plan.badge && (
            <span
              className={`inline-flex flex-col rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${plan.badge.tone}`}
            >
              <span>{plan.badge.label}</span>
              {plan.badge.context && (
                <span className="text-[10px] font-semibold normal-case tracking-normal">
                  {plan.badge.context}
                </span>
              )}
            </span>
          )}
        </div>

        <div className="mt-3 lg:min-h-[7rem]">
          <h3 className="text-xl font-bold tracking-tight text-[#0b294d]">
            {plan.name}
          </h3>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            {plan.description}
          </p>
        </div>

        <div className="mt-3 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4">
          <p className="text-sm font-semibold text-[#0b294d]">
            {isAnnual ? "Paiement annuel" : "Paiement mensuel"}
          </p>
          {isAnnual && (
            <p className="mt-1 text-xs text-muted-foreground">
              Équivalent mensuel du paiement annuel
            </p>
          )}
          <p className="mt-3 flex flex-wrap items-baseline gap-x-1 gap-y-1 text-primary">
            {isAnnual && (
              <span className="mr-1 shrink-0 whitespace-nowrap text-sm text-slate-400 line-through">
                {plan.monthlyPrice}
              </span>
            )}
            <span className="text-4xl font-bold leading-none tracking-tight">
              {isAnnual ? plan.annualMonthlyEquivalent : plan.monthlyPrice}
            </span>
            {isAnnual && (
              <span className="text-sm font-semibold">/ mois</span>
            )}
          </p>

          {isAnnual ? (
            <>
              <p className="mt-2 text-sm font-semibold text-[#0b294d]">
                {plan.annualTotal} facturés par an
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.annualSuffix}
              </p>
              <span className="mt-3 inline-flex rounded-xl bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                Économisez {plan.annualSaving} / an {plan.annualSuffix}
              </span>
            </>
          ) : (
            <p className="mt-2 text-sm font-semibold text-[#0b294d]">
              {plan.monthlySuffix}
            </p>
          )}
        </div>

        <ul className="mt-4 grid gap-3">
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

        <div className="mt-auto pt-5">
          <Button asChild className="h-11 w-full">
            <a href={CLIENT_SIGNUP_URL}>Démarrer l’essai gratuit</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PricingBillingSelector() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div
        role="group"
        aria-label="Mode de paiement"
        className="mx-auto mb-6 grid w-full max-w-72 grid-cols-2 gap-1 rounded-full border border-blue-200 bg-blue-50/70 p-1"
      >
        {billingOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={billingCycle === option.value}
            onClick={() => setBillingCycle(option.value)}
            className={`min-h-11 min-w-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none ${
              billingCycle === option.value
                ? "bg-primary text-white shadow-sm"
                : "text-[#0b294d] hover:bg-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} billingCycle={billingCycle} />
        ))}
      </div>
    </div>
  );
}
