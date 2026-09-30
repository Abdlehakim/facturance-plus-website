"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeDollarSign,
  LayoutGrid,
  Library,
  LogIn,
  Menu,
  MessageCircle,
  Newspaper,
  UserPlus,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { CLIENT_LOGIN_URL, CLIENT_SIGNUP_URL } from "@/lib/urls";

/**
 * Ported from the customer application's PublicSiteLayout header.
 *
 * Interactive, so this is the one client component in the public chrome: it
 * holds the mobile menu state and reads the pathname for the active link.
 * react-router's NavLink became an explicit pathname comparison, and the
 * login/signup buttons now cross the origin to the client application.
 */

/**
 * Home is the logo, so it is deliberately not a menu item - an "/" entry would
 * also match every route under the prefix test below.
 */
const publicNavigation = [
  { label: "Tarifs", href: "/pricing", icon: BadgeDollarSign },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "Fonctionnalités", href: "/features", icon: LayoutGrid },
  { label: "Ressources utiles", href: "/resources", icon: Library },
  { label: "Contactez-nous", href: "/contact", icon: MessageCircle },
];

/** A section stays active on its nested routes, e.g. /blog/some-article. */
function isSectionActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicSiteHeader() {
  const pathname = usePathname();
  const [mobileNavigationOpen, setMobileNavigationOpen] = React.useState(false);

  // Closing on navigation, as the router-based effect did before. Adjusted
  // during render rather than in an effect: the menu must already be closed in
  // the same commit that paints the new route, and an effect would both render
  // it open for a frame and trip react-hooks/set-state-in-effect.
  const [renderedPathname, setRenderedPathname] = React.useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setMobileNavigationOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm shadow-slate-900/[0.03] backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-18 lg:px-10">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Facturance Plus — Accueil"
        >
          <Image
            src="/facturance-plus-logo.svg"
            alt="Facturance Plus"
            width={220}
            height={40}
            priority
            className="h-10 w-auto max-w-[220px] shrink-0 object-contain"
          />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigation publique"
        >
          {publicNavigation.map(({ label, href }) => {
            const isActive = isSectionActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive && "bg-blue-50 text-primary",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline">
            <a href={CLIENT_LOGIN_URL}>
              <LogIn />
              Se connecter
            </a>
          </Button>
          <Button asChild>
            <a href={CLIENT_SIGNUP_URL}>
              <UserPlus />
              Essai gratuit
            </a>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-expanded={mobileNavigationOpen}
          aria-controls="public-mobile-navigation"
          aria-label={
            mobileNavigationOpen
              ? "Fermer le menu de navigation"
              : "Ouvrir le menu de navigation"
          }
          onClick={() => setMobileNavigationOpen((current) => !current)}
        >
          {mobileNavigationOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileNavigationOpen && (
        <div
          id="public-mobile-navigation"
          className="border-t bg-white px-5 py-4 lg:hidden"
        >
          <nav
            className="mx-auto grid max-w-7xl gap-1"
            aria-label="Navigation publique mobile"
          >
            {publicNavigation.map(({ label, href, icon: Icon }) => {
              const isActive = isSectionActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-primary",
                    isActive && "bg-blue-50 text-primary",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              );
            })}
            <div className="mt-3 grid gap-2 border-t pt-4 sm:grid-cols-2">
              <Button asChild variant="outline">
                <a href={CLIENT_LOGIN_URL}>
                  <LogIn />
                  Se connecter
                </a>
              </Button>
              <Button asChild>
                <a href={CLIENT_SIGNUP_URL}>
                  <UserPlus />
                  Essai gratuit
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
