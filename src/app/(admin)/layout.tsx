"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "./admin/molecules/sidebar";
import { AdminHeader } from "./admin/molecules/header";
import PcOnly from "./admin/molecules/pc-only";

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
