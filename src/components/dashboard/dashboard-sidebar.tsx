"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Store, LogOut } from "lucide-react";
import React from "react";
import { useAction } from "next-safe-action/hooks";
import { logout } from "@/actions";
import { toast } from "sonner";

export interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  title: string;
  links: SidebarLink[];
  basePath: string;
}

export default function DashboardSidebar({
  title,
  links,
  basePath,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { execute: logoutExecute, status } = useAction(logout, {
    onSuccess() {
      toast.warning("Logged out successfully!");
      router.replace("/signin");
    },
  });

  const isActive = (path: string) => {
    if (path === basePath) return pathname === basePath;
    return pathname.startsWith(path);
  };

  const isLoggingOut = status === "executing";

  return (
    <aside className="border-r bg-background p-4 w-64 shrink-0 flex flex-col h-screen overflow-y-auto">
      <div className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
        <Store size={22} />
        <span>{title}</span>
      </div>

      <nav className="space-y-1 w-full flex-1">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive(link.href)
                ? "bg-primary text-on-primary shadow-sm shadow-primary/20"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-4 border-t mt-auto">
        <button
          onClick={() => logoutExecute()}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-destructive hover:bg-destructive/10 hover:text-destructive transition-all disabled:opacity-50 cursor-pointer"
        >
          <LogOut size={18} />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </aside>
  );
}
