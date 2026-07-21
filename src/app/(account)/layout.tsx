import { SiteHeader } from "@/components/site-header";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-background min-h-screen">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
