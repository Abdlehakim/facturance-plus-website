"use client";

import { useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  LayoutGrid,
  PackageCheck,
  Printer,
  ReceiptText,
  RefreshCw,
  UserRoundCheck,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type FeatureCategory = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accentClassName: string;
  numberClassName: string;
  features: readonly Feature[];
};

const features = {
  invoices: {
    title: "Factures et devis",
    description: "Créez et suivez les documents essentiels de votre activité.",
    icon: ReceiptText,
  },
  orders: {
    title: "Bons de commande et de livraison",
    description:
      "Structurez le cycle commercial, de la commande à la livraison.",
    icon: FileText,
  },
  partners: {
    title: "Clients et fournisseurs",
    description:
      "Centralisez les coordonnées et les informations de vos partenaires.",
    icon: UserRoundCheck,
  },
  stock: {
    title: "Articles et stocks",
    description: "Organisez votre catalogue et suivez les mouvements de stock.",
    icon: PackageCheck,
  },
  payments: {
    title: "Paiements et échéances",
    description:
      "Gardez une vision claire des règlements et des dates importantes.",
    icon: CheckCircle2,
  },
  companies: {
    title: "Gestion multi-entreprises",
    description:
      "Accédez aux entreprises autorisées depuis un même compte client.",
    icon: Building2,
  },
  pdf: {
    title: "Génération et impression PDF",
    description:
      "Prévisualisez, exportez et imprimez vos documents commerciaux.",
    icon: Printer,
  },
  sync: {
    title: "Synchronisation sécurisée",
    description:
      "Utilisez les services activés pour votre compte et votre configuration.",
    icon: RefreshCw,
  },
} satisfies Record<string, Feature>;

const featureCategories: readonly FeatureCategory[] = [
  {
    id: "overview",
    number: "01",
    title: "Vue d’ensemble",
    description:
      "Les fonctions essentielles de Facturance Plus réunies dans une vue claire et structurée pour gérer efficacement votre activité.",
    icon: ReceiptText,
    accentClassName: "bg-blue-50 text-blue-600",
    numberClassName: "text-blue-600",
    features: Object.values(features),
  },
  {
    id: "documents",
    number: "02",
    title: "Documents commerciaux",
    description:
      "Les pièces commerciales de votre activité, créées et suivies au même endroit.",
    icon: ReceiptText,
    accentClassName: "bg-rose-50 text-rose-500",
    numberClassName: "text-rose-500",
    features: [features.invoices, features.orders, features.pdf],
  },
  {
    id: "partners",
    number: "03",
    title: "Clients & partenaires",
    description:
      "Centralisez les coordonnées et les informations de vos partenaires. Accédez aux entreprises autorisées depuis un même compte client.",
    icon: UserRoundCheck,
    accentClassName: "bg-teal-50 text-teal-600",
    numberClassName: "text-teal-600",
    features: [features.partners, features.companies],
  },
  {
    id: "stock",
    number: "04",
    title: "Stock & catalogue",
    description: "Organisez votre catalogue et suivez les mouvements de stock.",
    icon: PackageCheck,
    accentClassName: "bg-rose-50 text-rose-500",
    numberClassName: "text-rose-500",
    features: [features.stock],
  },
  {
    id: "management",
    number: "05",
    title: "Paiements & gestion",
    description:
      "Gardez une vision claire des règlements et des dates importantes. L’accès et la configuration suivent votre compte client Facturance Plus.",
    icon: CheckCircle2,
    accentClassName: "bg-indigo-50 text-indigo-500",
    numberClassName: "text-indigo-500",
    features: [features.payments, features.companies, features.sync],
  },
];

function wrapCategoryIndex(index: number): number {
  const count = featureCategories.length;
  return ((index % count) + count) % count;
}

function FeatureItem({ title, description, icon: Icon }: Feature) {
  return (
    <li className="flex min-w-0 items-center gap-3 rounded-[1.25rem] bg-white/90 px-3 py-3 shadow-[0_2px_10px_rgba(15,50,90,0.015)] transition-[background-color,box-shadow] duration-200 hover:bg-white hover:shadow-[0_4px_14px_rgba(15,50,90,0.035)] motion-reduce:transition-none sm:min-h-[5.75rem] sm:px-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-blue-100/80 to-blue-50 text-blue-600 sm:size-14">
        <Icon className="size-7 stroke-[1.8]" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-semibold leading-5 tracking-[-0.01em] text-[#071b35] xl:text-[0.9375rem]">
          {title}
        </h4>
        <p className="mt-1 text-[0.8125rem] leading-5 text-[#526782]">
          {description}
        </p>
      </div>
      <ArrowRight className="size-4 shrink-0 text-blue-600" aria-hidden="true" />
    </li>
  );
}

function FeaturePanel({ category }: { category: FeatureCategory }) {
  const Icon = category.icon;
  const count = category.features.length;
  const featureColumns = count === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";

  return (
    <div
      id="homepage-feature-panel"
      role="region"
      aria-labelledby="homepage-feature-category"
      aria-describedby="homepage-feature-description"
      className="relative min-w-0 rounded-[1.75rem] border border-white bg-linear-to-br from-white via-[#fbfdff] to-[#f1f7ff] p-5 shadow-[0_18px_50px_rgba(15,50,90,0.07)] sm:p-7 xl:p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 select-none text-7xl font-semibold leading-none tracking-[-0.07em] text-blue-500/15 sm:right-7 sm:top-6 sm:text-[6.5rem] xl:right-8"
      >
        {category.number}
      </span>
      <div className="relative flex min-w-0 items-center gap-4 sm:gap-5">
        <span
          className={`grid size-14 shrink-0 place-items-center rounded-[1.25rem] border border-blue-200/70 bg-linear-to-br from-white/90 to-white/20 shadow-[0_4px_12px_rgba(37,99,235,0.07)] sm:size-16 ${category.accentClassName}`}
        >
          <Icon className="size-7 stroke-[1.8] sm:size-8" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-blue-600 sm:text-xs">
            CATÉGORIE {category.number}
          </p>
          <h3
            id="homepage-feature-category"
            className="mt-1.5 text-[1.75rem] font-bold leading-[1.1] tracking-tight text-[#071b35] sm:text-3xl xl:text-[2.5rem]"
          >
            {category.title}
          </h3>
        </div>
      </div>
      <p
        id="homepage-feature-description"
        className="relative mt-4 max-w-3xl text-base leading-7 text-[#526782] xl:text-[1.0625rem]"
      >
        {category.description}
      </p>

      <ul className={`relative mt-5 grid gap-3 ${featureColumns}`}>
        {category.features.map((feature) => (
          <FeatureItem key={feature.title} {...feature} />
        ))}
      </ul>

      <div className="relative mt-5 flex flex-col gap-4 border-t border-blue-200/60 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="flex items-center gap-2 text-xs font-semibold text-primary sm:text-sm">
          <LayoutGrid className="size-6 shrink-0 text-blue-600" aria-hidden="true" />
          {count}{" "}
          {count === 1
            ? "fonctionnalité essentielle"
            : "fonctionnalités essentielles"}
        </p>
        <Link
          href="/features"
          className="group inline-flex min-h-12 w-fit max-w-full items-center justify-between gap-3 rounded-full bg-[#071b35] py-1.5 pl-4 pr-1.5 text-xs font-medium text-white shadow-[0_5px_14px_rgba(15,50,90,0.12)] transition-colors duration-200 hover:bg-[#0b294d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none sm:pl-5 sm:text-sm"
        >
          <span>Voir toutes les fonctionnalités</span>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-600 text-white transition-colors duration-200 group-hover:bg-blue-500 motion-reduce:transition-none">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}

function CategorySelectorItem({
  category,
  isActive,
  onSelect,
}: {
  category: FeatureCategory;
  isActive: boolean;
  onSelect: () => void;
}) {
  const Icon = category.icon;
  const appearance = isActive
    ? "border-blue-400/90 bg-linear-to-br from-white to-blue-50 opacity-100 shadow-[0_5px_16px_rgba(37,99,235,0.07)]"
    : "border-transparent bg-white/90 opacity-85 shadow-[0_2px_10px_rgba(15,50,90,0.015)] hover:bg-white hover:opacity-100 sm:w-[96%]";

  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-controls="homepage-feature-panel"
      aria-label={`Catégorie ${category.number} : ${category.title}`}
      onClick={onSelect}
      className={`relative min-h-24 w-full cursor-pointer rounded-[1.25rem] border px-3 py-4 text-left transition-[opacity,box-shadow,background-color,border-color] duration-200 ease-out focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none sm:px-4 ${appearance}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[3.5rem] font-semibold leading-none tracking-[-0.07em] opacity-20 ${category.numberClassName}`}
      >
        {category.number}
      </span>
      <span className="relative flex items-center gap-3 pr-12 sm:gap-4 sm:pr-14">
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-[1.125rem] bg-linear-to-br from-white/40 to-transparent sm:size-15 ${category.accentClassName}`}
        >
          <Icon className="size-7 stroke-[1.8]" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className={`block text-xs font-bold tracking-[0.1em] ${category.numberClassName}`}>
            {category.number}
          </span>
          <span className={`mt-1.5 block text-base font-semibold leading-tight tracking-tight sm:text-[1.0625rem] ${isActive ? "text-[#071b35]" : "text-[#425b7b]"}`}>
            {category.title}
          </span>
        </span>
      </span>
    </button>
  );
}

function CategorySelector({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const categoryOffsets = [0, 1, 2, 3];

  return (
    <div
      role="group"
      aria-label="Explorer les catégories de fonctionnalités"
      className="relative grid w-full gap-3.5 pl-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-blue-100/80"
      >
        <span
          className="absolute left-1/2 top-10 h-4 w-1.5 -translate-x-1/2 rounded-full bg-[#f97316]"
        />
      </div>
      {categoryOffsets.map((offset) => {
        const index = wrapCategoryIndex(activeIndex + offset);

        return (
          <CategorySelectorItem
            key={featureCategories[index].id}
            category={featureCategories[index]}
            isActive={offset === 0}
            onSelect={() => onSelect(index)}
          />
        );
      })}
    </div>
  );
}

export function HomepageFeaturesExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = featureCategories[activeIndex];

  return (
    <section
      id="features"
      aria-labelledby="homepage-features-title"
      className="scroll-mt-24 bg-linear-to-br from-[#f8fbff] via-white to-[#f5faff]"
    >
      <div className="mx-auto w-full max-w-[88rem] px-5 py-10 sm:px-6 sm:py-12 xl:px-8 xl:py-16">
        <div className="grid min-w-0 items-start gap-9 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.9fr)] xl:gap-12">
          <FeaturePanel category={activeCategory} />
          <div className="min-w-0 xl:pt-2">
            <header className="max-w-[27.5rem]">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-blue-600">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rotate-45 rounded-[1px] border-2 border-blue-600"
                />
                UNE VUE D’ENSEMBLE
              </p>
              <h2
                id="homepage-features-title"
                className="mt-4 max-w-[26.25rem] text-[1.875rem] font-bold leading-[1.1] tracking-tight text-[#071b35] sm:text-[2rem] 2xl:text-[2.125rem]"
              >
                Tout le cycle commercial réuni dans un seul outil.
              </h2>
              <p className="mt-3 text-base leading-[1.55] text-[#526782] xl:text-[1.0625rem]">
                Du premier devis au règlement, Facturance Plus centralise les
                documents, partenaires, articles, stocks et paiements nécessaires
                à votre activité.
              </p>
            </header>
            <div className="mt-8">
              <CategorySelector activeIndex={activeIndex} onSelect={setActiveIndex} />
            </div>
          </div>
        </div>
        <p role="status" aria-atomic="true" className="sr-only">
          Catégorie {activeCategory.number} : {activeCategory.title},{" "}
          {activeCategory.features.length}{" "}
          {activeCategory.features.length === 1
            ? "fonctionnalité"
            : "fonctionnalités"}.
        </p>
      </div>
    </section>
  );
}
