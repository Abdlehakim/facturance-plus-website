"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { CLIENT_LOGIN_URL, CLIENT_SIGNUP_URL } from "@/lib/urls";

const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/pricing", labelKey: "pricing" },
  { href: "/blog", labelKey: "blog" },
  { href: "/contact", labelKey: "contact" },
] as const;

type NavigationItem = {
  href: string;
  label: string;
};

type MobileNavigationLabels = {
  closeNavigation: string;
  mobileNavigation: string;
  homeAria: string;
  login: string;
  startFree: string;
};

type MobileNavigationModalProps = {
  isOpen: boolean;
  pathname: string;
  items: NavigationItem[];
  labels: MobileNavigationLabels;
  onClose: () => void;
  modalRef: RefObject<HTMLDivElement | null>;
};

function MobileNavigationModal({
  isOpen,
  pathname,
  items,
  labels,
  onClose,
  modalRef,
}: MobileNavigationModalProps) {
  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-99999 lg:hidden">
      <button
        type="button"
        aria-label={labels.closeNavigation}
        className="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="absolute inset-0 overflow-y-auto px-4 pb-6 pt-24">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={labels.mobileNavigation}
          className="mx-auto w-full max-w-md rounded-[2rem] border border-white/20 bg-white/95 p-5 text-text-strong shadow-2xl backdrop-blur-md"
        >
          <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-zinc-300" />

          <div className="mb-5 flex items-center justify-between gap-4">
            <Link
              href="/"
              onClick={onClose}
              className="flex min-w-0 items-center gap-3"
              aria-label={labels.homeAria}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-linear-to-br from-brand-gradient-from-bright to-brand-gradient-to text-xl font-bold text-white shadow-sm">
                F
              </span>

              <span className="truncate text-panel-title font-extrabold tracking-tight text-text-strong">
                Facturance
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-zinc-100 text-text-strong transition hover:bg-zinc-200"
              aria-label={labels.closeNavigation}
            >
              <X size={22} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>

          <nav className="grid gap-2.5" aria-label={labels.mobileNavigation}>
            {items.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-14 items-center rounded-2xl border px-4 text-nav font-bold transition ${
                    isActive
                      ? "border-brand-primary/25 bg-brand-soft text-brand-primary"
                      : "border-border-soft bg-white text-text-muted hover:bg-surface-hover hover:text-text-strong"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 grid gap-3 border-t border-border-soft pt-5">
            {/* Another origin in production, so a plain anchor rather than a
                Next.js route transition. */}
            <a
              href={CLIENT_LOGIN_URL}
              onClick={onClose}
              className="btn btn-outline btn-md"
            >
              {labels.login}
            </a>

            <a
              href={CLIENT_SIGNUP_URL}
              onClick={onClose}
              className="btn btn-primary btn-md"
            >
              {labels.startFree}
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const translatedNavItems = navItems.map((item) => ({
    href: item.href,
    label: t.nav[item.labelKey],
  }));

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((current) => !current);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    if (typeof window === "undefined") return;

    const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobileOrTablet) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className="relative z-900 border-b border-border-soft bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-304 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 xl:px-0">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label={t.nav.homeAria}
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-linear-to-br from-brand-gradient-from-bright to-brand-gradient-to text-lg font-bold text-white shadow-sm sm:h-9 sm:w-9 sm:text-xl">
            F
          </span>

          <span className="truncate text-logo font-bold tracking-tight text-text-strong sm:text-panel-title">
            Facturance
          </span>
        </Link>

        <nav
          className="hidden h-16 items-center gap-7 lg:flex xl:gap-10"
          aria-label={t.nav.primaryNavigation}
        >
          {translatedNavItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-full items-center border-b-2 text-nav font-medium transition ${
                  isActive
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-text-muted hover:text-text-strong"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Another origin in production, so a plain anchor rather than a
              Next.js route transition. */}
          <a
            href={CLIENT_LOGIN_URL}
            onClick={closeMenu}
            className="btn btn-outline btn-sm hidden lg:inline-flex"
          >
            {t.nav.login}
          </a>

          <a
            href={CLIENT_SIGNUP_URL}
            onClick={closeMenu}
            className="btn btn-primary btn-sm hidden sm:inline-flex"
          >
            {t.nav.startFree}
          </a>

          <button
            type="button"
            aria-label={
              isMenuOpen ? t.nav.closeNavigation : t.nav.openNavigation
            }
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="inline-flex size-10 touch-manipulation items-center justify-center rounded-lg border border-border-subtle bg-white text-text-strong transition hover:border-brand-primary hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 lg:hidden"
          >
            {isMenuOpen ? (
              <X size={20} strokeWidth={2.4} aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={2.4} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <MobileNavigationModal
        isOpen={isMenuOpen}
        pathname={pathname}
        items={translatedNavItems}
        labels={{
          closeNavigation: t.nav.closeNavigation,
          mobileNavigation: t.nav.mobileNavigation,
          homeAria: t.nav.homeAria,
          login: t.nav.login,
          startFree: t.nav.startFree,
        }}
        onClose={closeMenu}
        modalRef={modalRef}
      />
    </header>
  );
}
