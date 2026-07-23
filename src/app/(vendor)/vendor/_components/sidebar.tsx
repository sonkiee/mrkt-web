"use client";

import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  Star,
  BarChart3,
  Wallet,
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
import DashboardSidebar, {
  SidebarLink,
} from "@/components/dashboard/dashboard-sidebar";

export const links: SidebarLink[] = [
  { href: "/vendor", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/vendor/products", label: "Products", icon: <Package size={18} /> },
  { href: "/vendor/inventory", label: "Inventory", icon: <Boxes size={18} /> },
  { href: "/vendor/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  // { href: "/vendor/customers", label: "Customers", icon: <Users size={18} /> },
  { href: "/vendor/reviews", label: "Reviews", icon: <Star size={18} /> },
  {
    href: "/vendor/analytics",
    label: "Analytics",
    icon: <BarChart3 size={18} />,
  },
  {
    href: "/vendor/wallet",
    label: "Finance & Wallet",
    icon: <Wallet size={18} />,
  },
  // { href: "/vendor/coupons", label: "Coupons", icon: <Ticket size={18} /> },
  // { href: "/vendor/promotions", label: "Promotions", icon: <TrendingUp size={18} /> },
  // { href: "/vendor/shipping", label: "Shipping", icon: <Truck size={18} /> },
  // { href: "/vendor/returns", label: "Returns", icon: <RotateCcw size={18} /> },
  {
    href: "/vendor/profile",
    label: "Store Profile",
    icon: <Store size={18} />,
  },
  {
    href: "/vendor/settings",
    label: "Store Settings",
    icon: <Settings size={18} />,
  },
  {
    href: "/vendor/notifications",
    label: "Notifications",
    icon: <Bell size={18} />,
  },
  {
    href: "/vendor/messages",
    label: "Messages",
    icon: <MessageSquare size={18} />,
  },
  {
    href: "/vendor/support",
    label: "Help & Support",
    icon: <HelpCircle size={18} />,
  },
];

export function VendorSidebar() {
  return (
    <DashboardSidebar title="Vendor Portal" links={links} basePath="/vendor" />
  );
}
