"use client";

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
import DashboardSidebar, { SidebarLink } from "@/components/dashboard/dashboard-sidebar";

const links: SidebarLink[] = [
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
  return <DashboardSidebar title="Market Admin" links={links} basePath="/admin" />;
}
