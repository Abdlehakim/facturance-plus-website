import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  productFeatureCategories,
  type ProductFeature,
} from "@/lib/product-features";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

export const metadata: Metadata = buildPageMetadata({
  title: "Fonctionnalités du logiciel de facturation",
  description:
    "Documents commerciaux, achats, dépenses, partenaires, stock, paiements, trésorerie, rapports et synchronisation : découvrez les fonctionnalités de Facturance Plus.",
  path: "/features",
});

const groups = productFeatureCategories.filter((category) => category.id !== "overview");

function FeatureCard({ title, description, icon: Icon }: ProductFeature) {
  return (
    <Card className="h-full max-w-none gap-4 border-blue-100/80">
      <CardHeader>
        <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <CardTitle>
          <h3 className="leading-snug">{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function FeaturesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
          FONCTIONNALITÉS
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b294d] sm:text-4xl lg:text-5xl">
          Tout le cycle commercial réuni dans un seul outil.
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          Du premier devis au règlement, Facturance Plus centralise les
          documents, achats, dépenses, partenaires, stock, paiements et trésorerie.
          Les fonctionnalités disponibles dépendent de votre environnement et de
          votre configuration.
        </p>
      </header>

      {/* The application's own main screen, not an illustration: documents,
          models, parties and the article catalogue as they are laid out. */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-blue-100/80 bg-white p-3 shadow-[0_18px_50px_rgba(11,41,77,0.09)] sm:p-4">
        <Image
          src="/img-main-page.png"
          alt="Écran principal de Facturance Plus : documents commerciaux, modèles, fiches clients et catalogue d’articles"
          width={1350}
          height={875}
          sizes="(min-width: 1024px) 70vw, 100vw"
          loading="lazy"
          className="h-auto w-full rounded-xl object-contain"
        />
      </div>

      <div className="mt-12 space-y-12">
        {groups.map((group) => (
          <section key={group.id} className="scroll-mt-24">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                CATÉGORIE {group.number}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0b294d] sm:text-3xl">
                {group.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {group.description}
              </p>
            </div>

            <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>

            {group.more ? (
              <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {group.more.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-semibold text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </p>
            ) : null}
          </section>
        ))}
      </div>

      <section className="mt-14 overflow-hidden rounded-2xl bg-[#0b294d] px-6 py-10 text-center sm:px-10">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Essayez Facturance Plus gratuitement
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-blue-100">
          Créez votre compte et découvrez l’application pendant 3 jours, sans
          engagement.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="h-11 bg-white px-6 text-[#0b294d] hover:bg-blue-50"
          >
            <a href={CLIENT_SIGNUP_URL}>Commencer l’essai gratuit</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 border-white/40 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/pricing">Voir les tarifs</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
