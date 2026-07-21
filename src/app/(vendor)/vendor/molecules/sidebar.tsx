"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  Star,
  BarChart3,
  DollarSign,
  Wallet,
  ArrowDownToLine,
  Ticket,
  TrendingUp,
  Truck,
  RotateCcw,
  Store,
  Settings,
  Bell,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/vendor", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/vendor/products", label: "Products", icon: <Package size={18} /> },
  { href: "/vendor/inventory", label: "Inventory", icon: <Boxes size={18} /> },
  { href: "/vendor/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  { href: "/vendor/customers", label: "Customers", icon: <Users size={18} /> },
  { href: "/vendor/reviews", label: "Reviews", icon: <Star size={18} /> },
  { href: "/vendor/analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { href: "/vendor/earnings", label: "Earnings", icon: <DollarSign size={18} /> },
  { href: "/vendor/wallet", label: "Wallet", icon: <Wallet size={18} /> },
  {
    href: "/vendor/withdrawals",
    label: "Withdrawals",
    icon: <ArrowDownToLine size={18} />,
  },
  { href: "/vendor/coupons", label: "Coupons", icon: <Ticket size={18} /> },
  { href: "/vendor/promotions", label: "Promotions", icon: <TrendingUp size={18} /> },
  { href: "/vendor/shipping", label: "Shipping", icon: <Truck size={18} /> },
  { href: "/vendor/returns", label: "Returns", icon: <RotateCcw size={18} /> },
  { href: "/vendor/profile", label: "Store Profile", icon: <Store size={18} /> },
  { href: "/vendor/settings", label: "Store Settings", icon: <Settings size={18} /> },
  { href: "/vendor/notifications", label: "Notifications", icon: <Bell size={18} /> },
  { href: "/vendor/messages", label: "Messages", icon: <MessageSquare size={18} /> },
  { href: "/vendor/support", label: "Help & Support", icon: <HelpCircle size={18} /> },
];

export function VendorSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/vendor") return pathname === "/vendor";
    return pathname.startsWith(path);
  };

  return (
    <aside className="border-r bg-background p-4 w-64 shrink-0 flex flex-col h-screen overflow-y-auto">
      <div className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
        <Store size={22} />
        <span>Vendor Portal</span>
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
