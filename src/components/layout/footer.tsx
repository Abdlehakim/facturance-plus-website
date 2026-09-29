"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { CLIENT_LOGIN_URL, CLIENT_SIGNUP_URL } from "@/lib/urls";

// `external` marks the entries that leave facturance.com for the client
// application, which is another origin in production.
const productLinks = [
  { href: "/pricing", labelKey: "pricing", external: false },
  { href: CLIENT_LOGIN_URL, labelKey: "login", external: true },
] as const;

const companyLinks = [
  { href: "/blog", labelKey: "blog" },
  { href: "/contact", labelKey: "contact" },
] as const;

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-surface-soft">
      <div className="mx-auto w-full max-w-304 px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-0">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)_minmax(0,0.75fr)_minmax(260px,1.1fr)] lg:gap-10 xl:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex max-w-full items-center gap-3"
              aria-label={t.nav.homeAria}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-gradient-from-muted to-brand-gradient-to-muted text-lg font-extrabold text-white shadow-lg shadow-teal-900/15">
                F
              </span>

              <span className="truncate text-xl font-extrabold tracking-normal-0.03em] text-zinc-950">
                Facturance
              </span>
            </Link>

            <p className="mt-5 max-w-lg text-body-sm leading-7 text-zinc-600 lg:max-w-md">
              {t.footer.description}
            </p>

            <a
              href={CLIENT_SIGNUP_URL}
              className="btn btn-primary btn-md btn-full mt-7 sm:w-auto"
            >
              {t.common.startFree}
              <ArrowRight
                size={17}
                strokeWidth={2.6}
                className="shrink-0"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-extrabold uppercase tracking-normal text-zinc-950">
              {t.footer.product}
            </h3>

            <nav className="mt-5 grid gap-3" aria-label={t.footer.product}>
              {productLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="w-fit text-body-sm font-medium text-zinc-600 transition hover:text-brand-primary"
                  >
                    {t.common[link.labelKey]}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit text-body-sm font-medium text-zinc-600 transition hover:text-brand-primary"
                  >
                    {t.common[link.labelKey]}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-extrabold uppercase tracking-normal text-zinc-950">
              {t.footer.company}
            </h3>

            <nav className="mt-5 grid gap-3" aria-label={t.footer.company}>
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-body-sm font-medium text-zinc-600 transition hover:text-brand-primary"
                >
                  {t.common[link.labelKey]}
                </Link>
              ))}
            </nav>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:col-span-2 sm:p-6 lg:col-span-1">
            <h3 className="text-sm font-extrabold uppercase tracking-normal text-zinc-950">
              {t.footer.needHelp}
            </h3>

            <p className="mt-4 max-w-2xl text-body-sm leading-7 text-zinc-600 lg:max-w-none">
              {t.footer.needHelpDescription}
            </p>

            <Link
              href="/contact"
              className="btn btn-outline btn-sm mt-5"
            >
              <Mail
                size={17}
                strokeWidth={2.4}
                className="shrink-0"
                aria-hidden="true"
              />
              {t.common.contactSupport}
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-zinc-200 pt-7 text-center text-sm text-zinc-500 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:text-start">
          <p className="leading-6">
            © {year} Facturance. {t.footer.rights}
          </p>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end"
            aria-label={t.footer.secondaryLinks}
          >
            <Link href="/pricing" className="transition hover:text-zinc-950">
              {t.common.pricing}
            </Link>
            <Link href="/contact" className="transition hover:text-zinc-950">
              {t.common.contact}
            </Link>
            <a
              href={CLIENT_LOGIN_URL}
              className="transition hover:text-zinc-950"
            >
              {t.common.login}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
