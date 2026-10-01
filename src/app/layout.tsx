import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { publicSiteConfig } from "@/lib/public-site-config";
import { OG_LOCALE, SOCIAL_IMAGE } from "@/lib/seo";

import "./globals.css";

/**
 * Document shell for the public Facturance Plus website.
 *
 * The chrome lives in (facturance)/layout.tsx with the pages it wraps; the
 * only routes outside it are the two compatibility redirects, which render
 * nothing.
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const SITE_TITLE = `${publicSiteConfig.brandName} — Logiciel de facturation et gestion commerciale en Tunisie`;

const SITE_DESCRIPTION =
  "Facturance Plus est un logiciel de facturation et de gestion commerciale pour les entreprises en Tunisie : devis, factures, clients, fournisseurs, articles, stocks et paiements.";

/**
 * Defaults for every route. Pages that call `buildPageMetadata` replace the
 * title, description, canonical and the social tags with their own; the ones
 * that do not - there are none indexable today - still inherit a correct card.
 */
export const metadata: Metadata = {
  metadataBase: new URL(publicSiteConfig.siteUrl),
  title: {
    default: SITE_TITLE,
    template: `%s | ${publicSiteConfig.brandName}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: publicSiteConfig.brandName,
  publisher: publicSiteConfig.publisherName,
  /*
   * The brand mark, declared explicitly. create-next-app had left its default
   * favicon.ico in src/app, and that file convention outranks anything set
   * here, so it was the only icon the pages emitted.
   *
   * The SVG is the navy tile version, which stays legible on a dark tab. The
   * .ico is kept for the clients that request /favicon.ico regardless of the
   * link tags, and Apple devices get a PNG because iOS does not take SVG.
   */
  icons: {
    icon: [
      { url: "/facturance-plus-icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: OG_LOCALE,
    siteName: publicSiteConfig.brandName,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: publicSiteConfig.siteUrl,
    images: [{ ...SOCIAL_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
