import { SiteHeader } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import React from "react";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-background">
      <SiteHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
