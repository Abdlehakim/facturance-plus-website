"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { CLIENT_SIGNUP_URL } from "@/lib/urls";

function DashboardMockup({ alt }: { alt: string }) {
  return (
    <div className="pointer-events-none absolute right-3 top-1/2 z-10 hidden aspect-16/10 w-md -translate-y-1/2 overflow-visible lg:block xl:w-lg 2xl:w-xl">
      <div className="absolute bottom-6 right-8 h-56 w-md rounded-full bg-black/20 blur-3xl" />
      <div className="absolute bottom-10 right-12 h-64 w-md rounded-full bg-teal-300/16 blur-3xl" />

      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 16%, black 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 16%, black 100%)",
        }}
      >
        <Image
          src="/images/pricing-device-mockup.png"
          alt={alt}
          fill
          sizes="(min-width: 1536px) 36rem, (min-width: 1280px) 30rem, (min-width: 1024px) 26rem, 0px"
          style={{
            objectPosition: "right center",
          }}
          className="object-contain opacity-100]"
        />
      </div>
    </div>
  );
}

export function PricingCta() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto mb-20 mt-16 w-full max-w-304 px-4 sm:mb-24 sm:mt-20 sm:px-6 lg:mb-28 lg:mt-24 xl:px-0">
      <div className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-brand-deep via-brand-forest to-brand-vivid text-white shadow-[0_28px_80px_rgba(0,63,54,0.28)] sm:rounded-4xl lg:shadow-[0_36px_100px_rgba(0,63,54,0.32)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,rgba(255,255,255,0.14)_1.2px,transparent_1.2px)] bg-size-[28px_28px] opacity-40" />

        <div className="absolute -left-24 -top-24 size-72 rounded-full bg-emerald-300/12 blur-3xl sm:size-80" />
        <div className="absolute right-10 top-8 size-80 rounded-full bg-teal-300/18 blur-3xl sm:size-96" />
        <div className="absolute bottom-0 right-0 h-64 w-lg rounded-full bg-emerald-300/12 blur-3xl sm:w-180" />

        <div className="relative z-10 px-5 py-10 sm:px-8 sm:py-12 lg:min-h-108 lg:px-16 lg:py-16">
          <div className="relative z-20 max-w-140 text-center sm:text-start lg:max-w-lg">
            <h2 className="max-w-lg text-section-title font-extrabold leading-tight tracking-tight sm:text-section-title-lg lg:text-section-title-md">
              {t.pricing.ctaTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-base font-semibold leading-7 text-white/90 sm:mx-0 sm:mt-7 sm:text-card-title sm:leading-8">
              {t.pricing.ctaDescription}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:items-center sm:gap-5">
              <a
                href={CLIENT_SIGNUP_URL}
                className="btn btn-white btn-lg w-full sm:w-auto sm:min-w-55"
              >
                {t.pricing.ctaPrimary}
                <ArrowRight size={23} strokeWidth={2.7} aria-hidden="true" />
              </a>

              <Link
                href="/contact"
                className="btn btn-outline btn-lg w-full sm:w-auto sm:min-w-55"
              >
                {t.pricing.ctaSecondary}
              </Link>
            </div>

            <div className="mt-8 flex flex-col gap-4 text-start text-sm font-bold text-white/92 sm:mt-12 sm:flex-row sm:items-center sm:gap-10 sm:text-body">
              {t.pricing.ctaChecks.map((check) => (
                <span key={check} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Check size={18} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {check}
                </span>
              ))}
            </div>
          </div>

          <DashboardMockup alt={t.pricing.ctaImageAlt} />
        </div>
      </div>
    </section>
  );
}