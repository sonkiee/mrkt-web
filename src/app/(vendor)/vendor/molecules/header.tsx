"use client";

import { Input } from "@/components/ui/input";
import { Bell, HelpCircle } from "lucide-react";

export function VendorHeader() {
  return (
    <header className="border-b p-4 flex items-center justify-between bg-surface/80 backdrop-blur-md sticky top-0 z-50">
      <h1 className="font-semibold text-lg text-on-surface">Store Manager</h1>

      <div className="flex items-center gap-4">
        <Input placeholder="Search orders, products..." className="w-64 bg-surface-container-lowest" />
        <button className="relative p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-error rounded-full"></span>
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all">
          <HelpCircle size={18} />
        </button>
      </div>
    </header>
  );
}
