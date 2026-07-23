"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "./admin/_components/sidebar";
import { AdminHeader } from "./admin/_components/header";
import PcOnly from "./admin/_components/pc-only";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="md:hidden">
        <PcOnly />
      </div>
      <div className="flex flex-row h-screen">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <AdminHeader />
          <main className="p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
