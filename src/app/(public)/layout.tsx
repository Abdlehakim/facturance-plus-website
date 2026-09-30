import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/Navbar";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";

/**
 * Chrome for the older marketing pages (blog, contact). It used to sit in the
 * root layout, which meant every route inherited it - including the ported
 * Facturance Plus pages, which have their own header and footer.
 */
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-col bg-surface-page text-zinc-950">
      <TopUtilityBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
