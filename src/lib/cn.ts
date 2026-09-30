/**
 * Class-name joiner with the conflict resolution the ported public site needs.
 *
 * The customer application uses clsx + tailwind-merge for this. Neither is a
 * dependency here, and adding one would desynchronize package-lock.json from
 * package.json, which breaks the `npm ci` the production image runs. So this
 * is a small, explicit substitute rather than a general re-implementation.
 *
 * What it has to handle: a later class overriding an earlier one from the same
 * utility family. `<Button className="bg-white text-[#0b294d]">` must drop the
 * variant's `bg-primary text-primary-foreground`, or both land in the class
 * attribute and the winner is decided by stylesheet order instead of intent.
 *
 * Only the families the ported markup actually overrides are grouped. Anything
 * unrecognized is kept verbatim and never removed, so an unmodelled utility
 * degrades to plain concatenation rather than disappearing.
 */

type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, unknown>;

/** Font sizes share the `text-` prefix with colors but never conflict with them. */
const FONT_SIZES = new Set([
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
]);

/**
 * The family a utility belongs to, or null when it is not modelled. The
 * responsive/state prefix is part of the key: `hover:bg-x` must not displace a
 * plain `bg-y`.
 */
function groupKey(token: string): string | null {
  const separator = token.lastIndexOf(":");
  const prefix = separator === -1 ? "" : token.slice(0, separator + 1);
  const base = separator === -1 ? token : token.slice(separator + 1);
  const bare = base.startsWith("-") ? base.slice(1) : base;

  const named = (family: string) => `${prefix}${family}`;

  if (bare.startsWith("bg-")) return named("bg");
  if (bare.startsWith("border-")) {
    // Width and style keep their own slots; everything else is the color.
    const value = bare.slice("border-".length);
    if (/^\d+$/.test(value)) return named("border-width");
    if (["solid", "dashed", "dotted", "double", "hidden", "none"].includes(value)) {
      return named("border-style");
    }
    if (["x", "y", "t", "r", "b", "l"].some((side) => value.startsWith(`${side}-`))) {
      return null;
    }
    return named("border-color");
  }
  if (bare.startsWith("text-")) {
    const value = bare.slice("text-".length);
    if (FONT_SIZES.has(value)) return named("font-size");
    if (["left", "center", "right", "justify", "start", "end"].includes(value)) {
      return named("text-align");
    }
    return named("text-color");
  }
  if (/^h-/.test(bare)) return named("h");
  if (/^w-/.test(bare)) return named("w");
  if (/^min-h-/.test(bare)) return named("min-h");
  if (/^max-w-/.test(bare)) return named("max-w");
  if (/^rounded(-|$)/.test(bare)) {
    return /^rounded-(t|r|b|l|tl|tr|br|bl)-/.test(bare) ? null : named("rounded");
  }

  return null;
}

function flatten(value: ClassValue, out: string[]): void {
  if (!value) return;
  if (typeof value === "string" || typeof value === "number") {
    out.push(String(value));
    return;
  }
  if (Array.isArray(value)) {
    for (const entry of value) flatten(entry, out);
    return;
  }
  for (const [key, enabled] of Object.entries(value)) {
    if (enabled) out.push(key);
  }
}

export function cn(...inputs: ClassValue[]): string {
  const parts: string[] = [];
  flatten(inputs, parts);

  const tokens = parts.join(" ").split(/\s+/).filter(Boolean);
  // Walked backwards so the last occurrence of a family is the one kept.
  const seen = new Set<string>();
  const kept: string[] = [];

  for (let index = tokens.length - 1; index >= 0; index -= 1) {
    const token = tokens[index];
    const key = groupKey(token);
    if (key !== null) {
      if (seen.has(key)) continue;
      seen.add(key);
    }
    kept.push(token);
  }

  return kept.reverse().join(" ");
}
