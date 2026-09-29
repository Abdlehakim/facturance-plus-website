/**
 * The plan ids the public pricing CTAs may carry in `?plan=`.
 *
 * These mirror the pricing plans whose call to action points at /register
 * (the enterprise plan deliberately routes to /contact instead). Kept as one
 * list so the website has a single answer to "is this a plan we offer", rather
 * than each caller inventing its own.
 */
export const selectablePlanIds = ["starter", "professional", "business"] as const;

export type SelectablePlanId = (typeof selectablePlanIds)[number];

/**
 * Narrows an untrusted query value to a plan we actually offer.
 *
 * Returns null rather than falling back to a default: this value is forwarded
 * to another origin, and substituting a plan the visitor never chose would
 * invent an intent instead of preserving one.
 */
export function parseSelectablePlan(value: unknown): SelectablePlanId | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (typeof candidate !== "string") return null;

  return selectablePlanIds.includes(candidate as SelectablePlanId)
    ? (candidate as SelectablePlanId)
    : null;
}
