import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SitePreferencesProvider } from "@/components/layout/site-preferences-provider";
import { publicSiteConfig } from "@/lib/public-site-config";

import "./globals.css";

/**
 * Document shell only.
 *
 * The site chrome deliberately does NOT live here any more: the Facturance
 * Plus pages and the older marketing pages have different headers and footers,
 * and a root layout nests inside every route rather than being replaced by
 * one. Each route group brings its own chrome - see (facturance)/layout.tsx
 * and (public)/layout.tsx.
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

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteConfig.siteUrl),
  title: {
    default: `${publicSiteConfig.brandName} — Facturation et gestion commerciale`,
    template: `%s | ${publicSiteConfig.brandName}`,
  },
  description:
    "Toute votre facturation et votre gestion commerciale dans une seule application : devis, factures, stock, clients et règlements.",
  applicationName: publicSiteConfig.brandName,
  publisher: publicSiteConfig.publisherName,
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
      <body className="min-h-full">
        <SitePreferencesProvider>{children}</SitePreferencesProvider>
      </body>
    </html>
  );
}
