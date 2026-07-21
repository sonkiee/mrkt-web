import { SiteHeader } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-background min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">{children}</main>

      <SiteFooter />
    </div>
  );
}
