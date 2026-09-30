import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CheckCircle2,
  FileText,
  PackageCheck,
  Printer,
  ReceiptText,
  RefreshCw,
  UserRoundCheck,
} from "lucide-react";

import { PricingOffers } from "@/components/public-site/pricing-offers";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

export const metadata: Metadata = buildPageMetadata({
  title: "Tarifs du logiciel de facturation en Tunisie",
  description:
    "Les tarifs de Facturance Plus : Local uniquement, Version web ou Local + serveur, remise à partir de trois entreprises, et trois jours d’essai gratuit.",
  path: "/pricing",
});

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
        <PricingOffers />
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
