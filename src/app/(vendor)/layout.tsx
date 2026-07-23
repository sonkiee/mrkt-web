"use client";

import { ReactNode } from "react";
import { usePathname, notFound } from "next/navigation";
import { VendorSidebar, links } from "./vendor/_components/sidebar";
import { VendorHeader } from "./vendor/_components/header";

export default function VendorLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Normalize path by removing trailing slash if any
  const normalizedPath =
    pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;

  // Check if current route is allowed (either matching an active link, a nested sub-path, or allowed exceptions)
  const isAllowed =
    normalizedPath === "/vendor" ||
    normalizedPath === "/vendor/earnings" ||
    normalizedPath === "/vendor/withdrawals" ||
    links.some(
      (link) =>
        link.href !== "/vendor" &&
        (normalizedPath === link.href || normalizedPath.startsWith(link.href + "/")),
    );

  if (!isAllowed) {
    notFound();
  }

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
