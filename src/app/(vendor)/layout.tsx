"use client";

import { ReactNode } from "react";
import { VendorSidebar } from "./vendor/molecules/sidebar";
import { VendorHeader } from "./vendor/molecules/header";

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row h-screen bg-surface-background">
      <VendorSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <VendorHeader />
        <main className="p-6 overflow-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
