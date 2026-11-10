/**
 * The public "Nos clients" directory, read from the public showcase endpoint.
 *
 * SERVER SIDE ONLY. `FACTURANCE_API_BASE_URL` deliberately carries no
 * NEXT_PUBLIC_ prefix, so Next.js never inlines it into a browser bundle and
 * the API origin stays an internal detail. Nothing in this module may be
 * imported from a client component; the page that uses it is a server
 * component.
 *
 * The endpoint is the one validated in Phase 4D against PostgreSQL 17. Every
 * eligibility rule - published status, active company, LOCAL_AND_SERVER
 * account, current and unexpired consent in the current scope - is evaluated
 * there, in one SQL statement, against live state. This module adds no filter
 * of its own and holds no list: a company the server stops returning
 * disappears from the next render, which is the whole point of reading it
 * fresh every time.
 */

/**
 * The entire public surface of a customer company, as the API defines it.
 *
 * Mirrors PublicShowcaseCard in services/api. Everything absent is absent on
 * purpose: no internal identifier, pendingDescription, raw image bytes or
 * consent/approval metadata. `description` is the APPROVED text only.
 */
export interface PublicShowcaseCard {
  slug: string;
  displayName: string;
  description: string | null;
  sector: string | null;
  city: string | null;
  websiteUrl: string | null;
  logoUrl?: string | null;
}

/**
 * An unreachable or refusing API is NOT an empty directory.
 *
 * The two are reported separately so the page can say "personne n'est encore
 * publié" only when the server actually said so, and "momentanément
 * indisponible" otherwise. Collapsing them would turn a rate limit into a
 * public statement that no company uses the product.
 */
export type ShowcaseFetchResult =
  | { status: "ok"; companies: PublicShowcaseCard[] }
  | { status: "unavailable" };

/**
 * Cards per page. Well under the API's hard ceiling of 200, which is the
 * figure this must never exceed.
 */
export const SHOWCASE_PAGE_SIZE = 24;

/** The API's own cap, restated so the clamp below cannot drift past it. */
const PUBLIC_SHOWCASE_MAX_LIMIT = 200;

/** The API's offset ceiling. Beyond it the request would be rejected. */
const PUBLIC_SHOWCASE_MAX_OFFSET = 100_000;
export const SHOWCASE_MAX_PAGE =
  Math.floor(PUBLIC_SHOWCASE_MAX_OFFSET / SHOWCASE_PAGE_SIZE) + 1;

/**
 * A slow API must not hold a page render open indefinitely. Shorter than the
 * default fetch behaviour, long enough that a cold API still answers.
 */
const REQUEST_TIMEOUT_MS = 6_000;

/** Local API, for development only. Never used when NODE_ENV is production. */
const DEVELOPMENT_API_BASE_URL = "http://127.0.0.1:3101/api";

/**
 * Resolves the API origin, or refuses to.
 *
 * Read per request rather than at module load, so the value comes from the
 * environment the server is actually running in - the standalone build reads
 * runtime variables, not build-time ones.
 *
 * PRODUCTION FAILS CLOSED. A missing or malformed value returns null and no
 * request is made at all: the page then shows "momentanement indisponible"
 * and no company. Falling back to a development address in production would
 * aim the public directory at whatever happens to answer on that port, which
 * is worse than admitting the configuration is absent. In development the
 * local default stands, because there the fallback is the intended target.
 *
 * In production the expected value is the API service on the internal
 * network - see the `website` service in compose.production.yaml - and it
 * must include the API's global `/api` prefix, because the path appended
 * below starts at `/public/showcase`.
 */
export function resolveApiBaseUrl(): string | null {
  const configured = process.env.FACTURANCE_API_BASE_URL?.trim();

  if (!configured) {
    return process.env.NODE_ENV === "production"
      ? null
      : DEVELOPMENT_API_BASE_URL;
  }

  let parsed: URL;
  try {
    parsed = new URL(configured);
  } catch {
    return null;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return null;
  }

  return configured.replace(/\/+$/, "");
}

/**
 * Keeps only http and https.
 *
 * A websiteUrl is administrator-curated and the API already requires https,
 * but this page renders it as a link a visitor will click, so the protocol is
 * checked where it is used rather than assumed from a rule enforced
 * elsewhere. javascript:, data: and anything else return null and the link is
 * simply not shown.
 */
export function safeExternalUrl(value: string | null): string | null {
  if (typeof value !== "string" || !value || /[\u0000-\u0020\u007f]/.test(value)) {
    return null;
  }
  const authority = value.match(/^[a-z][a-z0-9+.-]*:\/\/([^/?#]*)/i)?.[1];
  if (authority?.includes("@")) return null;

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }

  if (
    (parsed.protocol !== "https:" && parsed.protocol !== "http:") ||
    parsed.username !== "" ||
    parsed.password !== ""
  ) {
    return null;
  }

  return parsed.toString();
}

function readString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

/**
 * Rebuilds each card field by field.
 *
 * The response is treated as untrusted shape rather than trusted data: a card
 * is kept only if it carries both a slug and a display name, and no property
 * other than the six below is ever copied. A field the API might add later
 * therefore cannot reach the page without being named here first - the same
 * reason the API itself never selects `*`.
 */
function toCards(payload: unknown, limit: number): PublicShowcaseCard[] | null {
  if (typeof payload !== "object" || payload === null) return null;

  const companies = (payload as { companies?: unknown }).companies;
  if (!Array.isArray(companies) || companies.length > limit) return null;

  const cards: PublicShowcaseCard[] = [];
  const slugs = new Set<string>();

  for (const entry of companies) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      return null;
    }

    const row = entry as Record<string, unknown>;
    const slug = readString(row.slug);
    const displayName = readString(row.displayName);

    if (
      !slug || slug.length > 120 ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      slugs.has(slug) ||
      !displayName || [...displayName].length > 200
    ) return null;

    for (const [field, max] of [
      ["description", 120], ["sector", 120], ["city", 120], ["websiteUrl", 255],
    ] as const) {
      const value = row[field];
      if (value !== null &&
          (typeof value !== "string" || [...value].length > max)) {
        return null;
      }
    }
    const websiteUrl = readString(row.websiteUrl);
    if (row.websiteUrl !== null &&
        (websiteUrl === null || !safeExternalUrl(websiteUrl) ||
         new URL(websiteUrl).protocol !== "https:")) {
      return null;
    }
    slugs.add(slug);

    // Only this company's controlled API endpoint can become an image URL.
    // External domains, query strings, traversal and other-company slugs fail closed.
    const logoUrl = safeDirectoryLogoUrl(row.logoUrl, slug);

    cards.push({
      slug,
      displayName,
      description: readString(row.description),
      sector: readString(row.sector),
      city: readString(row.city),
      websiteUrl,
      logoUrl,
    });
  }

  return cards;
}

export function safeDirectoryLogoUrl(value: unknown, slug: string): string | null {
  if (typeof value !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const prefix = `/api/public/showcase/${slug}/logo/`;
  if (!value.startsWith(prefix)) return null;
  const revision = value.slice(prefix.length);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(revision)) return null;
  return `/nos-clients/logo/${slug}/${revision}`;
}

/**
 * One page of the public directory.
 *
 * `cache: "no-store"` is not a performance choice. A consent withdrawal or a
 * storage-mode downgrade has to take effect on the very next request, and any
 * cache - Next's data cache, a proxy, a CDN - would keep serving a company
 * that asked to be taken down. There is no fallback dataset and nothing is
 * memoized: if the request fails the page says so rather than replaying an
 * older list.
 */
export async function fetchPublicShowcase({
  limit = SHOWCASE_PAGE_SIZE,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
} = {}): Promise<ShowcaseFetchResult> {
  // Reject invalid ranges instead of aliasing arbitrarily many pages to one offset.
  if (
    !Number.isSafeInteger(limit) || limit < 1 || limit > PUBLIC_SHOWCASE_MAX_LIMIT ||
    !Number.isSafeInteger(offset) || offset < 0 || offset > PUBLIC_SHOWCASE_MAX_OFFSET
  ) return { status: "unavailable" };
  const safeLimit = limit;
  const safeOffset = offset;

  const baseUrl = resolveApiBaseUrl();
  // Unconfigured is reported exactly like unreachable: no cards, no stale
  // list, and no technical detail on the page.
  if (!baseUrl) return { status: "unavailable" };

  const query = new URLSearchParams({
    limit: String(safeLimit),
    offset: String(safeOffset),
  });

  try {
    const response = await fetch(
      `${baseUrl}/public/showcase?${query.toString()}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    );

    // Includes 429. A rate-limited render reports unavailability; it never
    // reports an empty directory.
    if (!response.ok) return { status: "unavailable" };

    const payload: unknown = await response.json();
    const companies = toCards(payload, safeLimit);
    // A partial/malformed success must not impersonate an empty or short last page.
    if (companies === null || companies.length > safeLimit) {
      return { status: "unavailable" };
    }
    return { status: "ok", companies };
  } catch {
    // Network failure, timeout, or a body that is not JSON. No technical
    // detail leaves this function: the page shows a discreet message.
    return { status: "unavailable" };
  }
}
