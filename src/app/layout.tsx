import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { publicSiteConfig } from "@/lib/public-site-config";

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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
