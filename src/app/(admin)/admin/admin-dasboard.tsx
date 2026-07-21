"use client";

import { useState } from "react";
import {
  TrendingUp,
  Users,
  Store,
  DollarSign,
  AlertCircle,
  Clock,
  ArrowUpRight,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Revenue (Market-Wide)",
      value: "₦4,829,350",
      change: "+14.2% from last month",
      icon: <DollarSign size={20} className="text-primary" />,
      bg: "bg-primary/10",
    },
    {
      title: "Active Vendors",
      value: "142",
      change: "+8 new this week",
      icon: <Store size={20} className="text-status-success" />,
      bg: "bg-status-success/10",
    },
    {
      title: "Platform Customers",
      value: "2,845",
      change: "+22.5% YoY",
      icon: <Users size={20} className="text-secondary" />,
      bg: "bg-secondary/10",
    },
    {
      title: "Pending Verification",
      value: "7",
      change: "Requires immediate review",
      icon: <AlertCircle size={20} className="text-status-warning animate-pulse" />,
      bg: "bg-status-warning/10",
    },
  ];

  const pendingApplications = [
    {
      id: "APP-029",
      storeName: "Arewa Tech Hub",
      owner: "Aminu Ibrahim",
      category: "Electronics",
      date: "2 hours ago",
    },
    {
      id: "APP-028",
      storeName: "Kaduna Gadgets",
      owner: "Faith Joshua",
      category: "Mobile Phones",
      date: "5 hours ago",
    },
    {
      id: "APP-027",
      storeName: "Zaria Repairs & Parts",
      owner: "Musa Bello",
      category: "Services / Repairs",
      date: "1 day ago",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN-8490",
      vendor: "Lumina Official Store",
      amount: "₦142,000",
      commission: "₦14,200 (10%)",
      status: "Successful",
      date: "Just now",
    },
    {
      id: "TXN-8489",
      vendor: "Digital Depot",
      amount: "₦85,500",
      commission: "₦8,550 (10%)",
      status: "Successful",
      date: "15 mins ago",
    },
    {
      id: "TXN-8488",
      vendor: "QuickFix Kaduna",
      amount: "₦12,000",
      commission: "₦1,200 (10%)",
      status: "Successful",
      date: "1 hour ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Marketplace Platform Admin</h2>
          <p className="text-body-md text-on-surface-variant">
            Platform-wide operations, vendor management, verification, commission monitoring, and compliance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/vendor-applications">
            <Button className="bg-primary text-on-primary">
              Review Applications
              <Badge className="ml-2 bg-on-primary text-primary" variant="secondary">
                {pendingApplications.length}
              </Badge>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-on-surface-variant truncate">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-on-surface mt-1">{stat.value}</div>
              <p className="text-xs text-on-surface-variant/80 mt-1 flex items-center gap-1">
                <TrendingUp size={12} className="text-status-success" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Platform Revenue Chart */}
        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Platform Growth &amp; Commissions</CardTitle>
            <p className="text-xs text-on-surface-variant">Monthly breakdown of gross merchandise value (GMV) vs platform commission fees (10%)</p>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Visual SVG chart representation */}
            <div className="h-64 flex flex-col justify-between">
              <div className="flex-1 flex items-end gap-6 pb-2">
                {[
                  { month: "Jan", gmv: 65, comm: 30 },
                  { month: "Feb", gmv: 75, comm: 35 },
                  { month: "Mar", gmv: 55, comm: 28 },
                  { month: "Apr", gmv: 90, comm: 45 },
                  { month: "May", gmv: 110, comm: 55 },
                  { month: "Jun", gmv: 140, comm: 70 },
                ].map((d, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full flex justify-center gap-1.5 h-44 items-end">
                      {/* GMV Bar */}
                      <div
                        className="w-4 bg-primary/20 group-hover:bg-primary/30 rounded-t-sm transition-all relative"
                        style={{ height: `${d.gmv}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[9px] font-bold px-1 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                          ₦{d.gmv * 10}k
                        </span>
                      </div>
                      {/* Commission Bar */}
                      <div
                        className="w-4 bg-primary group-hover:bg-primary-container rounded-t-sm transition-all relative"
                        style={{ height: `${d.comm}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[9px] font-bold px-1 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                          ₦{d.comm}k
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-on-surface-variant font-medium">{d.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 border-t pt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary/30 rounded" />
                  <span className="text-on-surface-variant font-medium">Gross Merchandise Value (GMV)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded" />
                  <span className="text-on-surface-variant font-medium">Marketplace Commission (10%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status Summary */}
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Vendor Distribution</CardTitle>
            <p className="text-xs text-on-surface-variant">Verification status across all registered storefronts</p>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-3">
              {[
                { label: "Verified Vendors", count: 128, percentage: 90, color: "bg-status-success" },
                { label: "Pending Verification", count: 7, percentage: 5, color: "bg-status-warning" },
                { label: "Suspended/Restricted", count: 7, percentage: 5, color: "bg-status-error" },
              ].map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-on-surface">{item.label}</span>
                    <span className="text-on-surface-variant">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-6">
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Compliance Action Required</div>
              <p className="text-xs text-on-surface-variant/90 leading-relaxed">
                7 vendors have submitted new verification documents (business registration details / CAC certificate). These storefronts will remain locked for new product listing publications until approved.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Double Column Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Applications Section */}
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4 space-y-0">
            <div>
              <CardTitle className="text-headline-md font-bold text-on-surface">Vendor Applications</CardTitle>
              <p className="text-xs text-on-surface-variant">New merchants wanting to join Kaduna's premier market</p>
            </div>
            <Link href="/admin/vendor-applications">
              <Button size="sm" variant="ghost" className="text-xs text-primary font-bold hover:bg-primary/5">
                View All <ChevronRight size={14} />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="divide-y pt-2">
            {pendingApplications.map((app) => (
              <div key={app.id} className="flex justify-between items-center py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body-md font-bold text-on-surface">{app.storeName}</span>
                    <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold capitalize">
                      {app.category}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Owner: {app.owner} • Requested {app.date}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/vendor-applications`}>
                    <Button size="sm" variant="outline" className="text-xs border-outline-variant hover:bg-surface-container-high h-8">
                      Review
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions & Commission Collection */}
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4 space-y-0">
            <div>
              <CardTitle className="text-headline-md font-bold text-on-surface">Recent Platform Revenue</CardTitle>
              <p className="text-xs text-on-surface-variant">Split collection details across successful checkout orders</p>
            </div>
            <Link href="/admin/payments">
              <Button size="sm" variant="ghost" className="text-xs text-primary font-bold hover:bg-primary/5">
                View Payments <ChevronRight size={14} />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="divide-y pt-2">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body-md font-bold text-on-surface">{tx.vendor}</span>
                    <span className="text-[10px] text-on-surface-variant font-medium">{tx.id}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Sale Value: {tx.amount} • {tx.date}
                  </p>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="text-xs font-bold text-primary">+{tx.commission}</div>
                  <Badge className="bg-status-success/15 text-status-success border-none text-[9px] py-0 px-1 font-bold">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
