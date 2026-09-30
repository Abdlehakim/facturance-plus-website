import { PublicSiteFooter } from "@/components/public-site/public-site-footer";
import { PublicSiteHeader } from "@/components/public-site/public-site-header";

/**
 * Chrome for the public Facturance Plus pages, ported from the customer
 * application's PublicSiteLayout. `children` replaces react-router's Outlet.
 *
 * `facturance-public` scopes the theme tokens the ported markup relies on
 * (primary, muted-foreground, ring, and the default border colour) so they do
 * not leak into the older marketing pages - see globals.css.
 */
export default function FacturancePublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="facturance-public min-h-svh bg-[#f5f8fc] text-foreground">
      <PublicSiteHeader />
      <main className="min-h-[calc(100svh-4rem)]">{children}</main>
      <PublicSiteFooter />
    </div>
  );
}
