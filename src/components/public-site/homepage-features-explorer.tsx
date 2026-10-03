"use client";

import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
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
    <li className="flex min-w-0 items-center gap-3 rounded-[1.25rem] bg-white/90 px-3 py-3 shadow-[0_2px_10px_rgba(15,50,90,0.015)] transition-[background-color,box-shadow] duration-200 hover:bg-white hover:shadow-[0_4px_14px_rgba(15,50,90,0.035)] motion-reduce:transition-none sm:min-h-[5.75rem] sm:px-4 xl:min-h-19 xl:gap-2.25 xl:rounded-[1.125rem] xl:px-3.25 xl:py-2.5">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-blue-100/80 to-blue-50 text-blue-600 sm:size-14 xl:size-[2.875rem]">
        <Icon className="size-7 stroke-[1.8] xl:size-5.5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-semibold leading-5 tracking-[-0.01em] text-[#071b35] xl:text-[0.84375rem] xl:leading-[1.0625rem]">
          {title}
        </h4>
        <p className="mt-1 text-[0.8125rem] leading-5 text-[#526782] xl:mt-0.5 xl:text-[0.78125rem] xl:leading-[1.0625rem]">
          {description}
        </p>
      </div>
      <ArrowRight className="size-4 shrink-0 text-blue-600 xl:size-[0.9375rem]" aria-hidden="true" />
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
      className="relative min-w-0 rounded-[1.75rem] border border-blue-100/60 bg-[radial-gradient(ellipse_at_85%_15%,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_60%),linear-gradient(135deg,#f8fbff_0%,#f2f8ff_50%,#eaf4ff_100%)] p-5 shadow-[0_18px_55px_rgba(30,80,140,0.07),inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-7 xl:flex xl:h-[clamp(37rem,calc(100svh-8.5rem-1px),40rem)] xl:flex-col xl:p-[clamp(1rem,2.5svh,1.625rem)]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 select-none text-7xl font-semibold leading-none tracking-[-0.07em] text-blue-500/15 sm:right-7 sm:top-6 sm:text-[6.5rem] xl:right-6.5 xl:text-[5.375rem]"
      >
        {category.number}
      </span>
      <div className="relative flex min-w-0 items-center gap-4 sm:gap-5 xl:shrink-0 xl:gap-3.5">
        <span
          className={`grid size-14 shrink-0 place-items-center rounded-[1.25rem] border border-blue-200/70 bg-linear-to-br from-white/90 to-white/20 shadow-[0_4px_12px_rgba(37,99,235,0.07)] sm:size-16 xl:size-14 ${category.accentClassName}`}
        >
          <Icon className="size-7 stroke-[1.8] sm:size-8 xl:size-6" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-blue-600 sm:text-xs xl:text-[0.65625rem]">
            CATÉGORIE {category.number}
          </p>
          <h3
            id="homepage-feature-category"
            className="mt-1.5 text-[1.75rem] font-bold leading-[1.1] tracking-tight text-[#071b35] sm:text-3xl xl:mt-1.25 xl:text-[2.125rem]"
          >
            {category.title}
          </h3>
        </div>
      </div>
      <p
        id="homepage-feature-description"
        className="relative mt-4 max-w-3xl text-base leading-7 text-[#526782] xl:mt-[clamp(0.5rem,1.2svh,0.6875rem)] xl:shrink-0 xl:text-[0.9375rem] xl:leading-[1.40625rem]"
      >
        {category.description}
      </p>

      <ul className={`relative mt-5 grid gap-3 xl:mt-[clamp(0.5rem,calc(3svh-1rem),0.9375rem)] xl:min-h-0 xl:flex-1 xl:content-start xl:gap-2 ${featureColumns}`}>
        {category.features.map((feature) => (
          <FeatureItem key={feature.title} {...feature} />
        ))}
      </ul>

      <div className="relative mt-5 flex flex-col gap-4 border-t border-blue-200/60 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 xl:mt-[clamp(0.5rem,calc(3svh-1rem),0.9375rem)] xl:shrink-0 xl:pt-[clamp(0.5rem,1.2svh,0.6875rem)]">
        <p className="flex items-center gap-2 text-xs font-semibold text-primary sm:text-sm xl:text-[0.78125rem]">
          <LayoutGrid className="size-6 shrink-0 text-blue-600 xl:size-5" aria-hidden="true" />
          {count}{" "}
          {count === 1
            ? "fonctionnalité essentielle"
            : "fonctionnalités essentielles"}
        </p>
        <Link
          href="/features"
          className="group inline-flex min-h-12 w-fit max-w-full items-center justify-between gap-3 rounded-full bg-[#071b35] py-1.5 pl-4 pr-1.5 text-xs font-medium text-white shadow-[0_5px_14px_rgba(15,50,90,0.12)] transition-colors duration-200 hover:bg-[#0b294d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none sm:pl-5 sm:text-sm xl:min-h-11 xl:gap-2.25 xl:py-1.25 xl:pl-4.5 xl:text-[0.78125rem]"
        >
          <span>Voir toutes les fonctionnalités</span>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-600 text-white transition-colors duration-200 group-hover:bg-blue-500 motion-reduce:transition-none xl:size-8.5">
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
    ? "scale-100 blur-none border-transparent bg-linear-to-br from-white to-blue-50 opacity-100 shadow-[0_10px_28px_rgba(15,41,77,0.14),0_3px_10px_rgba(37,99,235,0.10)]"
    : "mx-auto scale-[0.88] blur-[0.8px] border-transparent bg-white/90 opacity-65 shadow-[0_1px_6px_rgba(15,50,90,0.01)] hover:bg-white hover:opacity-70 focus-visible:blur-none";
  const iconSize = isActive ? "xl:size-13" : "xl:size-12";
  const desktopSize = isActive
    ? "xl:min-h-[clamp(4.75rem,10svh,5.25rem)] xl:py-[clamp(0.625rem,1.5svh,0.8125rem)]"
    : "xl:min-h-[clamp(4.5rem,9.5svh,5rem)] xl:py-[clamp(0.5rem,1.4svh,0.75rem)]";

  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-controls="homepage-feature-panel"
      aria-label={`Catégorie ${category.number} : ${category.title}`}
      onClick={onSelect}
      className={`relative block min-h-24 ${isActive ? "w-full" : "w-[90%]"} cursor-pointer rounded-[1.25rem] border px-3 py-4 text-left transition-[scale,filter,opacity,box-shadow,background-color,border-color] duration-300 ease-out focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none sm:px-4 xl:px-3.25 ${desktopSize} ${appearance}`}
    >
      {isActive && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px overflow-hidden rounded-[inherit] p-[3.5px]"
          style={{
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
          }}
        >
          <span
            className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-spin bg-[conic-gradient(from_0deg,transparent_0deg_245deg,#2563eb_275deg_305deg,#38bdf8_318deg,rgba(249,115,22,0.85)_328deg_331deg,transparent_350deg_360deg)] [animation-duration:5s] motion-reduce:animate-none motion-reduce:bg-[linear-gradient(135deg,#2563eb_0%,#38bdf8_55%,#2563eb_100%)]"
          />
        </span>
      )}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[3.5rem] font-semibold leading-none tracking-[-0.07em] ${isActive ? "opacity-65" : "opacity-20"} xl:right-3.25 xl:text-5xl ${category.numberClassName}`}
      >
        {category.number}
      </span>
      <span className="relative flex items-center gap-3 pr-12 sm:gap-4 sm:pr-14 xl:gap-2.75 xl:pr-11">
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-[1.125rem] bg-linear-to-br from-white/40 to-transparent sm:size-15 ${iconSize} ${category.accentClassName}`}
        >
          <Icon className="size-7 stroke-[1.8] xl:size-5.5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className={`block text-xs font-bold tracking-[0.1em] xl:text-[0.65625rem] ${category.numberClassName}`}>
            {category.number}
          </span>
          <span className={`mt-1.5 block text-base font-semibold leading-tight tracking-tight sm:text-[1.0625rem] xl:mt-1 xl:text-[0.9375rem] ${isActive ? "text-[#071b35]" : "text-[#425b7b]"}`}>
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
  onSelect: Dispatch<SetStateAction<number>>;
}) {
  const categoryOffsets = [-1, 0, 1, 2];
  const selectorRef = useRef<HTMLDivElement>(null);
  const wheelGesture = useRef({ delta: 0, lastEvent: 0, lockedUntil: 0 });

  useEffect(() => {
    const selector = selectorRef.current;
    if (!selector) return;

    const handleWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        !Number.isFinite(event.deltaY) ||
        event.deltaY === 0 ||
        Math.abs(event.deltaX) >= Math.abs(event.deltaY)
      ) return;

      // A native non-passive listener keeps scrolling local to the carousel.
      if (event.cancelable) event.preventDefault();

      const now = performance.now();
      const gesture = wheelGesture.current;
      const delta = event.deltaY * (
        event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 :
        event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? selector.clientHeight : 1
      );

      if (
        now - gesture.lastEvent > 200 ||
        Math.sign(delta) !== Math.sign(gesture.delta)
      ) gesture.delta = 0;
      gesture.lastEvent = now;

      if (now < gesture.lockedUntil) {
        gesture.delta = 0;
        return;
      }

      gesture.delta += delta;
      if (Math.abs(gesture.delta) < 50) return;

      const direction = Math.sign(gesture.delta);
      gesture.delta = 0;
      gesture.lockedUntil = now + 400;
      onSelect((currentIndex) => wrapCategoryIndex(currentIndex + direction));
    };
    const resetWheelDelta = () => {
      wheelGesture.current.delta = 0;
    };

    selector.addEventListener("wheel", handleWheel, { passive: false });
    selector.addEventListener("pointerleave", resetWheelDelta);
    return () => {
      selector.removeEventListener("wheel", handleWheel);
      selector.removeEventListener("pointerleave", resetWheelDelta);
    };
  }, [onSelect]);

  return (
    <div
      ref={selectorRef}
      role="group"
      aria-label="Explorer les catégories de fonctionnalités"
      className="group/category-selector relative mx-auto grid w-full max-w-[26rem] gap-3 pl-5 xl:max-w-[24rem] xl:gap-[clamp(0.5rem,1.2svh,0.75rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-0 w-[3px] overflow-hidden rounded-full bg-blue-100/80"
      >
        <style>{`
          @keyframes homepage-category-rail-scroll {
            from { transform: translateY(-48px); }
            to { transform: translateY(100%); }
          }
          @keyframes homepage-category-indicator-bob {
            0%, 100% { transform: translateY(-6px) scale(1); opacity: 0.8; }
            50% { transform: translateY(6px) scale(1.08); opacity: 1; }
          }
        `}</style>
        <span className="absolute inset-0 animate-[homepage-category-rail-scroll_2.8s_linear_infinite] opacity-55 transition-opacity duration-300 group-hover/category-selector:opacity-95 motion-reduce:animate-none motion-reduce:transition-none">
          <span className="absolute left-0 top-0 h-12 w-full rounded-full bg-linear-to-b from-transparent via-blue-600 to-transparent" />
        </span>
      </div>
      {categoryOffsets.map((offset) => {
        const index = wrapCategoryIndex(activeIndex + offset);

        return (
          <div key={featureCategories[index].id} className="relative min-w-0">
            {offset === 0 && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[calc(1.5px-1.25rem)] top-1/2 z-10 h-4 w-1.5 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="block h-full w-full animate-[homepage-category-indicator-bob_2s_ease-in-out_infinite] rounded-full bg-[#f97316] motion-reduce:animate-none" />
              </span>
            )}
            <CategorySelectorItem
              category={featureCategories[index]}
              isActive={offset === 0}
              onSelect={() => onSelect(index)}
            />
          </div>
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
      <div className="mx-auto w-full max-w-[77rem] px-5 py-10 sm:px-6 sm:py-12 xl:flex xl:min-h-[calc(100svh-4.5rem-1px)] xl:flex-col xl:justify-center xl:px-[clamp(1.5rem,calc(8svh-2rem),4rem)] xl:py-[clamp(1rem,3svh,3rem)]">
        <div className="grid w-full min-w-0 items-start gap-9 xl:grid-cols-[minmax(0,1.6fr)_minmax(20rem,0.9fr)] xl:items-center xl:gap-[clamp(1.5rem,3svh,2.25rem)]">
          <FeaturePanel category={activeCategory} />
          <div className="min-w-0">
            <header className="max-w-[26rem] xl:max-w-[24.375rem]">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-blue-600 xl:text-[0.65625rem]">
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rotate-45 rounded-[1px] border-2 border-blue-600"
                />
                UNE VUE D’ENSEMBLE
              </p>
              <h2
                id="homepage-features-title"
                className="mt-4 max-w-[26rem] text-[1.875rem] font-bold leading-[1.1] tracking-tight text-[#071b35] sm:text-[2rem] xl:mt-2.75 xl:max-w-[24.375rem] xl:text-[1.8125rem] xl:leading-[1.08]"
              >
                Tout le cycle commercial réuni dans un seul outil.
              </h2>
              <p className="mt-3 text-base leading-[1.55] text-[#526782] xl:mt-2.75 xl:text-sm">
                Du premier devis au règlement, Facturance Plus centralise les
                documents, partenaires, articles, stocks et paiements nécessaires
                à votre activité.
              </p>
            </header>
            <div className="mt-8 xl:mt-[clamp(1rem,2.5svh,1.375rem)]">
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
