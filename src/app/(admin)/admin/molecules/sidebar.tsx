"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Store,
  CheckCircle,
  FileCheck,
  Users,
  UserCheck,
  FolderOpen,
  Bookmark,
  ShoppingCart,
  CreditCard,
  Download,
  Coins,
  BarChart3,
  Megaphone,
  Gift,
  HelpCircle,
  Bell,
  Layers,
  Settings,
  ShieldAlert,
  History,
} from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/admin/vendors", label: "Vendors", icon: <Store size={18} /> },
  {
    href: "/admin/vendor-verification",
    label: "Verification",
    icon: <CheckCircle size={18} />,
  },
  {
    href: "/admin/vendor-applications",
    label: "Applications",
    icon: <FileCheck size={18} />,
  },
  { href: "/admin/users", label: "Users", icon: <Users size={18} /> },
  { href: "/admin/customers", label: "Customers", icon: <UserCheck size={18} /> },
  { href: "/admin/categories", label: "Categories", icon: <FolderOpen size={18} /> },
  { href: "/admin/brands", label: "Brands", icon: <Bookmark size={18} /> },
  { href: "/admin/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  { href: "/admin/payments", label: "Payments", icon: <CreditCard size={18} /> },
  { href: "/admin/withdrawals", label: "Withdrawals", icon: <Download size={18} /> },
  { href: "/admin/commissions", label: "Commissions", icon: <Coins size={18} /> },
  { href: "/admin/reports", label: "Reports", icon: <BarChart3 size={18} /> },
  { href: "/admin/advertisements", label: "Ads", icon: <Megaphone size={18} /> },
  { href: "/admin/promotions", label: "Promotions", icon: <Gift size={18} /> },
  {
    href: "/admin/support-tickets",
    label: "Support Tickets",
    icon: <HelpCircle size={18} />,
  },
  { href: "/admin/notifications", label: "Notifications", icon: <Bell size={18} /> },
  { href: "/admin/cms", label: "CMS / Pages", icon: <Layers size={18} /> },
  { href: "/admin/settings", label: "Settings", icon: <Settings size={18} /> },
  {
    href: "/admin/roles-permissions",
    label: "Permissions",
    icon: <ShieldAlert size={18} />,
  },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: <History size={18} /> },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  return (
    <aside className="border-r bg-background p-4 w-64 shrink-0 flex flex-col h-screen overflow-y-auto">
      <div className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
        <Store size={22} />
        <span>Market Admin</span>
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
    </aside>
  );
}
