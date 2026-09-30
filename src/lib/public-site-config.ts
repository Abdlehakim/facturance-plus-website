/**
 * Public site identity, ported from the customer application.
 *
 * Only siteUrl changed: the canonical home of these pages is the marketing
 * domain now, not the client application. Every other value - brand,
 * publisher, contacts, country, and the legal fields that are deliberately
 * null - is preserved exactly as it was.
 */

export interface PublicSiteConfig {
  brandName: string
  publisherName: string
  legalEntityName: string | null
  siteUrl: string
  supportEmail: string | null
  privacyEmail: string | null
  supportPhone: string | null
  facebookUrl: string | null
  linkedInUrl: string | null
  youtubeUrl: string | null
  postalAddress: string | null
  country: string
  registrationNumber: string | null
  taxNumber: string | null
  governingLaw: string | null
  lastUpdated: string
}

export const publicSiteConfig: PublicSiteConfig = {
  brandName: "Facturance Plus",
  publisherName: "Smartwebify",
  legalEntityName: null,
  siteUrl: "https://facturance.com",
  supportEmail: "contact@smartwebify.com",
  privacyEmail: "contact@smartwebify.com",
  supportPhone: "+216 54 555 688",
  facebookUrl: null,
  linkedInUrl: null,
  youtubeUrl: null,
  postalAddress: null,
  country: "Tunisie",
  registrationNumber: null,
  taxNumber: null,
  governingLaw: null,
  lastUpdated: "31 août 2026",
}

export function getSupportEmail(): string | null {
  return publicSiteConfig.supportEmail
}

export function getPrivacyEmail(): string | null {
  return publicSiteConfig.privacyEmail ?? publicSiteConfig.supportEmail
}

export function getSupportPhone(): string | null {
  return publicSiteConfig.supportPhone
}

export function getSupportPhoneHref(): string | null {
  if (!publicSiteConfig.supportPhone) {
    return null
  }

  const normalizedPhone = publicSiteConfig.supportPhone.replace(
    /[^\d+]/g,
    "",
  )

  return normalizedPhone ? `tel:${normalizedPhone}` : null
}

export function getWhatsAppUrl(): string | null {
  if (!publicSiteConfig.supportPhone) {
    return null
  }

  const normalizedPhone = publicSiteConfig.supportPhone.replace(
    /\D/g,
    "",
  )

  return normalizedPhone
    ? `https://wa.me/${normalizedPhone}`
    : null
}
