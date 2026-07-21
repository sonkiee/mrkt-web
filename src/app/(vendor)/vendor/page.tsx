"use client";

import { useState } from "react";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  AlertCircle,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function VendorDashboard() {
  const stats = [
    {
      title: "Store Earnings (This Month)",
      value: "₦1,842,500",
      change: "+18.4% from last month",
      icon: <DollarSign size={20} className="text-primary" />,
      bg: "bg-primary/10",
    },
    {
      title: "Active Orders",
      value: "14",
      change: "4 pending dispatch",
      icon: <ShoppingCart size={20} className="text-status-success" />,
      bg: "bg-status-success/10",
    },
    {
      title: "Total Listings",
      value: "48",
      change: "All products active",
      icon: <Package size={20} className="text-secondary" />,
      bg: "bg-secondary/10",
    },
    {
      title: "Payout Balance",
      value: "₦420,000",
      change: "Available for withdrawal",
      icon: <CheckCircle2 size={20} className="text-status-warning" />,
      bg: "bg-status-warning/10",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-9421",
      customer: "Kamilu Isa",
      amount: "₦145,000",
      items: "1x iPhone 13 Pro Max (128GB)",
      status: "Pending Dispatch",
      date: "25 mins ago",
    },
    {
      id: "ORD-9420",
      customer: "Blessing Audu",
      amount: "₦48,000",
      items: "2x Original Lightning Cable, 1x Power Adapter",
      status: "Shipped",
      date: "3 hours ago",
    },
    {
      id: "ORD-9419",
      customer: "Bello Abubakar",
      amount: "₦280,000",
      items: "1x Lenovo ThinkPad L14",
      status: "Delivered",
      date: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Welcome Back, Lumina Tech</h2>
          <p className="text-body-md text-on-surface-variant">
            Here's a summary of your store storefront performance and orders in Kaduna.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/vendor/products/new">
            <Button className="bg-primary text-on-primary">
              Add New Product
            </Button>
          </Link>
          <Link href="/vendor/wallet">
            <Button variant="outline" className="border-outline-variant hover:bg-surface-container-high">
              Withdraw Funds
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
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

      {/* Store Visitors Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Store Visitors &amp; Conversion</CardTitle>
            <p className="text-xs text-on-surface-variant font-medium">Daily traffic pattern for your storefront</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64 flex flex-col justify-between">
              <div className="flex-1 flex items-end gap-6 pb-2">
                {[
                  { day: "Mon", visitors: 45 },
                  { day: "Tue", visitors: 58 },
                  { day: "Wed", visitors: 70 },
                  { day: "Thu", visitors: 52 },
                  { day: "Fri", visitors: 85 },
                  { day: "Sat", visitors: 95 },
                  { day: "Sun", visitors: 65 },
                ].map((d, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-primary/10 rounded-t-sm transition-all h-44 flex items-end justify-center">
                      <div
                        className="w-5 bg-primary group-hover:bg-primary-container rounded-t-sm transition-all relative"
                        style={{ height: `${d.visitors}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[9px] font-bold px-1 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                          {d.visitors * 12}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-on-surface-variant font-medium">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store alerts and actions */}
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Store Performance Audit</CardTitle>
            <p className="text-xs text-on-surface-variant">Vitals calculated from customer reviews and logistics</p>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-4">
              {[
                { label: "Dispatch SLA Rate", score: "98.5%", progress: 98, color: "bg-status-success" },
                { label: "Customer Review Rating", score: "4.8 / 5.0", progress: 96, color: "bg-status-success" },
                { label: "Inventory Stock Accuracy", score: "92.0%", progress: 92, color: "bg-status-warning" },
              ].map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-on-surface">{item.label}</span>
                    <span className="text-on-surface">{item.score}</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="border border-outline-variant/30 shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4 space-y-0">
          <div>
            <CardTitle className="text-headline-md font-bold text-on-surface">Recent Storefront Orders</CardTitle>
            <p className="text-xs text-on-surface-variant">Last orders received from buyers</p>
          </div>
          <Link href="/vendor/orders">
            <Button size="sm" variant="ghost" className="text-xs text-primary font-bold hover:bg-primary/5">
              View All Orders <ArrowUpRight size={14} className="ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Order ID</th>
                <th className="p-4 font-bold text-on-surface-variant">Buyer Name</th>
                <th className="p-4 font-bold text-on-surface-variant">Items Ordered</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Total Price</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Status</th>
                <th className="p-4 font-bold text-on-surface-variant">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs sm:text-sm">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-on-surface">{order.id}</td>
                  <td className="p-4 text-on-surface font-semibold">{order.customer}</td>
                  <td className="p-4 text-on-surface-variant truncate max-w-[200px]">{order.items}</td>
                  <td className="p-4 text-right text-primary font-bold">{order.amount}</td>
                  <td className="p-4 text-center">
                    <Badge
                      className={`border-none ${
                        order.status === "Delivered"
                          ? "bg-status-success/15 text-status-success"
                          : order.status === "Shipped"
                            ? "bg-primary/15 text-primary"
                            : "bg-status-warning/15 text-status-warning"
                      } text-xs px-2.5 py-0.5 rounded font-bold`}
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-on-surface-variant">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
