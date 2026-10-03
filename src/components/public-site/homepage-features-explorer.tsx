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
    accentClassName: "bg-blue-100/80 text-primary",
    features: Object.values(features),
  },
  {
    id: "documents",
    number: "02",
    title: "Documents commerciaux",
    description:
      "Les pièces commerciales de votre activité, créées et suivies au même endroit.",
    icon: ReceiptText,
    accentClassName: "bg-sky-100/80 text-sky-800",
    features: [features.invoices, features.orders, features.pdf],
  },
  {
    id: "partners",
    number: "03",
    title: "Clients & partenaires",
    description:
      "Centralisez les coordonnées et les informations de vos partenaires. Accédez aux entreprises autorisées depuis un même compte client.",
    icon: UserRoundCheck,
    accentClassName: "bg-cyan-100/70 text-cyan-800",
    features: [features.partners, features.companies],
  },
  {
    id: "stock",
    number: "04",
    title: "Stock & catalogue",
    description: "Organisez votre catalogue et suivez les mouvements de stock.",
    icon: PackageCheck,
    accentClassName: "bg-blue-100/80 text-blue-800",
    features: [features.stock],
  },
  {
    id: "management",
    number: "05",
    title: "Paiements & gestion",
    description:
      "Gardez une vision claire des règlements et des dates importantes. L’accès et la configuration suivent votre compte client Facturance Plus.",
    icon: CheckCircle2,
    accentClassName: "bg-indigo-100/70 text-indigo-800",
    features: [features.payments, features.companies, features.sync],
  },
];

function wrapCategoryIndex(index: number): number {
  const count = featureCategories.length;
  return ((index % count) + count) % count;
}

function FeatureItem({ title, description, icon: Icon }: Feature) {
  return (
    <li className="flex min-w-0 items-center gap-3 rounded-[1.25rem] border border-white/80 bg-white/80 px-3 py-2.5 shadow-[0_2px_8px_rgba(11,41,77,0.015)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-blue-200/70 hover:bg-white hover:shadow-[0_4px_14px_rgba(11,41,77,0.04)] motion-reduce:transition-none 2xl:px-4 2xl:py-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-blue-100 to-blue-50 text-primary ring-1 ring-inset ring-blue-200/35 2xl:size-12">
        <Icon className="size-6 stroke-[1.8]" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-semibold leading-5 tracking-[-0.01em] text-[#0b294d]">
          {title}
        </h4>
        <p className="mt-0.5 text-[0.8125rem] leading-[1.125rem] text-muted-foreground 2xl:text-sm 2xl:leading-5">
          {description}
        </p>
      </div>
      <ArrowRight className="size-4 shrink-0 text-primary/80" aria-hidden="true" />
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
      className="relative min-w-0 rounded-[2rem] border border-white/95 bg-linear-to-br from-white/75 via-blue-50/65 to-blue-100/45 p-5 shadow-[0_20px_55px_rgba(11,41,77,0.09),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-sm sm:p-6 lg:grid lg:h-[clamp(38rem,calc(100svh-7.5rem),48rem)] lg:grid-rows-[4rem_3rem_minmax(0,1fr)_auto] lg:gap-y-3 xl:p-7 2xl:gap-y-4 2xl:p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 select-none text-8xl font-semibold leading-none tracking-[-0.07em] text-blue-500/[0.12] sm:right-7 sm:text-9xl 2xl:right-8 2xl:text-[9rem]"
      >
        {category.number}
      </span>
      <div className="relative flex min-w-0 items-center gap-4 lg:h-16">
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-[1.25rem] border border-blue-200/80 bg-linear-to-br from-white/90 to-white/40 shadow-[0_5px_15px_rgba(37,99,235,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] sm:size-14 lg:size-16 ${category.accentClassName}`}
        >
          <Icon className="size-6 stroke-[1.8] lg:size-7" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary sm:text-xs">
            CATÉGORIE {category.number}
          </p>
          <h3
            id="homepage-feature-category"
            className="mt-1 text-2xl font-bold leading-[1.1] tracking-tight text-[#0b294d] sm:text-3xl xl:text-4xl 2xl:text-[2.5rem]"
          >
            {category.title}
          </h3>
        </div>
      </div>
      <p
        id="homepage-feature-description"
        className="relative mt-3 max-w-3xl text-sm leading-6 text-muted-foreground lg:mt-0 2xl:text-base"
      >
        {category.description}
      </p>

      <div className="relative mt-4 lg:mt-0 lg:flex lg:min-h-0 lg:overflow-y-auto">
        <ul className={`grid w-full gap-2.5 lg:my-auto lg:shrink-0 2xl:gap-3 ${featureColumns}`}>
          {category.features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </ul>
      </div>

      <div className="relative mt-4 flex flex-col gap-3 border-t border-blue-200/65 pt-3 sm:flex-row sm:items-center sm:justify-between lg:mt-0 2xl:pt-4">
        <p className="flex items-center gap-2 text-xs font-semibold text-[#0b294d] sm:text-sm">
          <LayoutGrid className="size-5 shrink-0 text-primary" aria-hidden="true" />
          {count}{" "}
          {count === 1
            ? "fonctionnalité essentielle"
            : "fonctionnalités essentielles"}
        </p>
        <Link
          href="/features"
          className="group inline-flex w-fit max-w-full items-center justify-between gap-3 rounded-full bg-linear-to-r from-[#0b294d] to-[#071b35] py-1 pl-4 pr-1 text-xs font-semibold text-white shadow-[0_7px_20px_rgba(11,41,77,0.17)] transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(11,41,77,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none sm:pl-5 sm:text-sm 2xl:py-1.5 2xl:pr-1.5"
        >
          <span>Voir toutes les fonctionnalités</span>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)] transition-colors duration-300 group-hover:bg-blue-500 motion-reduce:transition-none 2xl:size-10">
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
  desktopOnly,
  onSelect,
}: {
  category: FeatureCategory;
  isActive: boolean;
  desktopOnly: boolean;
  onSelect: () => void;
}) {
  const Icon = category.icon;
  const appearance = isActive
    ? "z-10 scale-100 border-blue-400/85 bg-linear-to-br from-white via-white/95 to-blue-100/70 opacity-100 shadow-[0_14px_36px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,0.95)] blur-none xl:py-6"
    : "-my-2 scale-[0.78] border-white/80 bg-white/80 opacity-35 shadow-[0_4px_12px_rgba(11,41,77,0.035)] blur-[1px] hover:opacity-65 hover:blur-none xl:my-0 xl:py-4";
  const visibility = desktopOnly ? "hidden xl:block" : "block";

  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-controls="homepage-feature-panel"
      aria-label={`Catégorie ${category.number} : ${category.title}`}
      onClick={onSelect}
      className={`relative w-full cursor-pointer rounded-[1.75rem] border px-4 py-5 text-left transition-[scale,opacity,filter,box-shadow,background-color,border-color] duration-300 ease-out focus-visible:z-20 focus-visible:opacity-100 focus-visible:blur-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none sm:px-5 2xl:px-6 ${visibility} ${appearance}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-6xl font-semibold tracking-[-0.07em] text-blue-500/[0.12] 2xl:text-7xl"
      >
        {category.number}
      </span>
      <span className="relative flex items-center gap-3 sm:gap-4">
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-[1.125rem] border border-blue-200/65 bg-linear-to-br from-white/85 to-white/30 shadow-[0_3px_10px_rgba(37,99,235,0.06)] sm:size-14 ${category.accentClassName}`}
        >
          <Icon className="size-6 stroke-[1.8]" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-bold tracking-[0.2em] text-primary">
            {category.number}
          </span>
          <span className="mt-1.5 block text-lg font-semibold leading-tight tracking-tight text-[#0b294d] sm:text-xl">
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
  const categoryOffsets = [-1, 0, 1, 2, 3];

  return (
    <div
      role="group"
      aria-label="Explorer les catégories de fonctionnalités"
      className="relative mx-auto grid w-full max-w-[29rem] gap-3 py-2 xl:h-full xl:content-between xl:gap-2 xl:py-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 bottom-8 top-8 hidden w-1 rounded-full bg-white/80 xl:block"
      >
        <span
          className="absolute left-1/2 top-[28%] h-4 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500"
        />
      </div>
      {categoryOffsets.map((offset) => {
        const index = wrapCategoryIndex(activeIndex + offset);

        return (
          <CategorySelectorItem
            key={featureCategories[index].id}
            category={featureCategories[index]}
            isActive={offset === 0}
            desktopOnly={offset > 1}
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
      className="relative isolate scroll-mt-24 overflow-hidden bg-linear-to-br from-[#e2f0ff] via-[#f4f9ff] to-[#deeeff]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 -top-1/2 h-[110%] w-[140%] -rotate-18 rounded-[50%] border-[3rem] border-white/35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3/4 -right-1/4 h-[120%] w-[150%] -rotate-18 rounded-[50%] border-[3rem] border-blue-100/30"
      />
      <h2 id="homepage-features-title" className="sr-only">
        Tout le cycle commercial réuni dans un seul outil.
      </h2>
      <p className="sr-only">
        Du premier devis au règlement, Facturance Plus centralise les documents,
        partenaires, articles, stocks et paiements nécessaires à votre activité.
      </p>
      <div className="relative mx-auto flex w-full max-w-[96rem] items-center px-4 py-5 sm:px-6 lg:min-h-[calc(100svh-4.5rem)] lg:px-8 lg:py-4 xl:py-3 2xl:py-5">
        <div className="grid w-full min-w-0 items-center gap-5 xl:grid-cols-[minmax(0,1.9fr)_minmax(380px,0.85fr)] xl:items-stretch xl:gap-8 2xl:gap-10">
          <FeaturePanel category={activeCategory} />
          <CategorySelector activeIndex={activeIndex} onSelect={setActiveIndex} />
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
