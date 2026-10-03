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
      "Du premier devis au règlement, Facturance Plus centralise les documents, partenaires, articles, stocks et paiements nécessaires à votre activité.",
    icon: LayoutGrid,
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
    <li className="flex min-w-0 items-start gap-3 rounded-2xl border border-blue-100/80 bg-white/80 p-4 transition-colors duration-300 hover:border-blue-200 hover:bg-white motion-reduce:transition-none">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-blue-100/70 bg-blue-50 text-primary">
        <Icon className="size-[1.125rem]" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h4 className="text-sm font-semibold leading-5 text-[#0b294d]">
          {title}
        </h4>
        <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </li>
  );
}

function FeaturePanel({ category }: { category: FeatureCategory }) {
  const Icon = category.icon;
  const count = category.features.length;

  return (
    <div
      id="homepage-feature-panel"
      role="region"
      aria-labelledby="homepage-feature-category"
      aria-describedby="homepage-feature-description"
      className="relative flex min-w-0 flex-col rounded-[2rem] border border-white/90 bg-linear-to-br from-white/85 to-blue-50/60 p-5 shadow-[0_20px_60px_rgba(11,41,77,0.08)] backdrop-blur-sm sm:p-7 lg:min-h-[48rem] lg:p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-4 select-none text-8xl font-semibold leading-none tracking-tighter text-blue-900/[0.05] sm:right-7 sm:text-9xl"
      >
        {category.number}
      </span>
      <div className="relative flex items-center gap-4">
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-2xl shadow-sm sm:size-14 ${category.accentClassName}`}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">
            Catégorie {category.number}
          </p>
          <h3
            id="homepage-feature-category"
            className="mt-2 text-2xl font-bold leading-tight tracking-tight text-[#0b294d] sm:text-3xl"
          >
            {category.title}
          </h3>
        </div>
      </div>
      <p
        id="homepage-feature-description"
        className="relative mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base"
      >
        {category.description}
      </p>

      <ul className="relative mt-7 grid content-start gap-3 sm:grid-cols-2 lg:flex-1">
        {category.features.map((feature) => (
          <FeatureItem key={feature.title} {...feature} />
        ))}
      </ul>

      <div className="relative mt-7 flex flex-col gap-5 border-t border-blue-200/60 pt-6 xl:flex-row xl:items-center xl:justify-between xl:gap-3">
        <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
          <LayoutGrid className="size-4 shrink-0 text-primary" aria-hidden="true" />
          {count}{" "}
          {count === 1
            ? "fonctionnalité essentielle"
            : "fonctionnalités essentielles"}
        </p>
        <Link
          href="/features"
          className="group inline-flex w-fit max-w-full items-center justify-between gap-3 rounded-full bg-[#0b294d] py-2 pl-4 pr-2 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(11,41,77,0.15)] transition-colors duration-300 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none sm:pl-5 sm:text-sm"
        >
          <span>Voir toutes les fonctionnalités</span>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-white/20 motion-reduce:transition-none">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}

type SelectorPosition = "previous" | "active" | "next";

const selectorPositions: Record<SelectorPosition, string> = {
  previous: "top-[4%] scale-[0.78]",
  active: "top-1/2 -translate-y-1/2 scale-100",
  next: "top-[96%] -translate-y-full scale-[0.78]",
};

function CategorySelectorItem({
  category,
  position,
  onSelect,
}: {
  category: FeatureCategory;
  position: SelectorPosition;
  onSelect: () => void;
}) {
  const Icon = category.icon;
  const isActive = position === "active";
  const appearance = isActive
    ? "z-10 border-blue-200 bg-white/95 opacity-100 shadow-[0_16px_45px_rgba(11,41,77,0.12)] blur-none"
    : "border-blue-100 bg-white/70 opacity-30 shadow-sm blur-[1px] hover:opacity-65 hover:blur-none";

  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-controls="homepage-feature-panel"
      aria-label={`Catégorie ${category.number} : ${category.title}`}
      onClick={onSelect}
      className={`absolute left-0 w-full cursor-pointer rounded-[1.75rem] border px-5 py-7 text-left transition-[top,translate,scale,opacity,filter,box-shadow,background-color,border-color] duration-300 ease-out focus-visible:z-20 focus-visible:opacity-100 focus-visible:blur-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none sm:px-6 sm:py-9 ${selectorPositions[position]} ${appearance}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-8xl font-semibold tracking-tighter text-blue-900/[0.05]"
      >
        {category.number}
      </span>
      <span className="relative flex items-start gap-4">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-2xl sm:size-12 ${category.accentClassName}`}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-bold tracking-[0.2em] text-primary">
            {category.number}
          </span>
          <span className="mt-2 block text-xl font-semibold leading-snug tracking-tight text-[#0b294d] sm:text-2xl">
            {category.title}
          </span>
          {isActive && (
            <span className="mt-3 flex items-center gap-2 text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              Catégorie sélectionnée
            </span>
          )}
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
  const visibleCategories: { index: number; position: SelectorPosition }[] = [
    { index: wrapCategoryIndex(activeIndex - 1), position: "previous" },
    { index: activeIndex, position: "active" },
    { index: wrapCategoryIndex(activeIndex + 1), position: "next" },
  ];

  return (
    <div
      role="group"
      aria-label="Explorer les catégories de fonctionnalités"
      className="relative mx-auto h-[27rem] w-full max-w-sm sm:h-[31rem] lg:h-full lg:min-h-[40rem]"
    >
      {visibleCategories.map(({ index, position }) => (
        <CategorySelectorItem
          key={featureCategories[index].id}
          category={featureCategories[index]}
          position={position}
          onSelect={() => onSelect(index)}
        />
      ))}
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
      className="relative isolate scroll-mt-24 overflow-hidden bg-linear-to-br from-blue-50/80 via-white to-blue-50/80"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 size-80 rounded-full bg-blue-100/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 size-80 rounded-full bg-sky-100/40 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <header className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Une vue d’ensemble
          </p>
          <h2
            id="homepage-features-title"
            className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl"
          >
            Tout le cycle commercial réuni dans un seul outil.
          </h2>
        </header>

        <div className="mt-9 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.85fr)_minmax(260px,0.8fr)] lg:gap-10">
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
