"use client";

import { useMemo } from "react";
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
import { useListVendors, useListUsers, useListPayments } from "@/hooks/queries";
import { naira } from "@/utils/naira";
import { date } from "@/utils/date";
import Spinner from "@/components/spinner";

export default function AdminDashboard() {
  const { data: vendorsData, isLoading: isVendorsLoading } = useListVendors();
  const { data: usersData, isLoading: isUsersLoading } = useListUsers();
  const { data: paymentsData, isLoading: isPaymentsLoading } = useListPayments();

  const vendors = vendorsData?.data || vendorsData || [];
  const users = usersData?.data || usersData || [];
  const payments = paymentsData?.data || paymentsData || [];

  const isPageLoading = isVendorsLoading || isUsersLoading || isPaymentsLoading;

  // 1. Calculate stats bento grid values
  const activeVendorsCount = vendors.filter((v: any) => v.status === "APPROVED").length;
  const pendingVerificationCount = vendors.filter((v: any) => v.status === "PENDING").length;
  const suspendedVendorsCount = vendors.filter((v: any) => v.status === "SUSPENDED").length;
  const platformCustomersCount = users.filter((u: any) => u.role === "customer" || u.role === "vendor").length;

  const successfulPayments = payments.filter(
    (p: any) => p.status === "successful" || p.status === "completed" || p.status === "success"
  );
  const totalRevenueVal = successfulPayments.reduce((acc: number, p: any) => acc + Number(p.amount || 0), 0);

  const stats = [
    {
      title: "Total Revenue (Market-Wide)",
      value: naira(totalRevenueVal),
      change: "Gross platform GMV",
      icon: <DollarSign size={20} className="text-primary" />,
      bg: "bg-primary/10",
    },
    {
      title: "Active Vendors",
      value: activeVendorsCount.toString(),
      change: `${pendingVerificationCount} awaiting approval`,
      icon: <Store size={20} className="text-status-success" />,
      bg: "bg-status-success/10",
    },
    {
      title: "Platform Customers",
      value: platformCustomersCount.toString(),
      change: "Active user profiles",
      icon: <Users size={20} className="text-secondary" />,
      bg: "bg-secondary/10",
    },
    {
      title: "Pending Verification",
      value: pendingVerificationCount.toString(),
      change: "Requires review",
      icon: <AlertCircle size={20} className={`text-status-warning ${pendingVerificationCount > 0 ? "animate-pulse" : ""}`} />,
      bg: "bg-status-warning/10",
    },
  ];

  // 2. Compute dynamic chart data for visual bar representation
  const monthlyData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthStats = months.map((m) => ({ month: m, gmv: 0, comm: 0 }));

    successfulPayments.forEach((p: any) => {
      if (!p.createdAt) return;
      const d = new Date(p.createdAt);
      const mIdx = d.getMonth();
      const val = Number(p.amount || 0);
      monthStats[mIdx].gmv += val;
      monthStats[mIdx].comm += val * 0.1; // 10% platform commission fee
    });

    const currentMonth = new Date().getMonth();
    const startIdx = Math.max(0, currentMonth - 5);
    return monthStats.slice(startIdx, currentMonth + 1);
  }, [successfulPayments]);

  const maxChartVal = useMemo(() => {
    const vals = monthlyData.map((d) => d.gmv);
    return Math.max(...vals, 1);
  }, [monthlyData]);

  // 3. pending applications list
  const pendingApplications = vendors.filter((v: any) => v.status === "PENDING").slice(0, 3);

  // 4. recent transactions mapping
  const recentTransactions = successfulPayments.slice(0, 3).map((p: any) => {
    const val = Number(p.amount || 0);
    const comm = val * 0.1;
    return {
      id: p.reference ? `TXN-${p.reference.slice(-4).toUpperCase()}` : `TXN-${p.id.slice(0, 4).toUpperCase()}`,
      vendor: p.user ? `${p.user.firstName} ${p.user.lastName}` : "Platform Customer",
      amount: naira(val),
      commission: `${naira(comm)} (10%)`,
      status: "Successful",
      date: p.createdAt ? date(p.createdAt, false) : "N/A",
    };
  });

  // Calculate Vendor Distribution percentages
  const totalVendors = vendors.length || 1;
  const verifiedPercentage = Math.round((activeVendorsCount / totalVendors) * 100);
  const pendingPercentage = Math.round((pendingVerificationCount / totalVendors) * 100);
  const suspendedPercentage = Math.round((suspendedVendorsCount / totalVendors) * 100);

  if (isPageLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading platform metrics..." />
      </div>
    );
  }

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
                {monthlyData.map((d, index) => {
                  const gmvPercent = (d.gmv / maxChartVal) * 80;
                  const commPercent = (d.comm / maxChartVal) * 80;

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full flex justify-center gap-1.5 h-44 items-end">
                        {/* GMV Bar */}
                        <div
                          className="w-4 bg-primary/20 group-hover:bg-primary/30 rounded-t-sm transition-all relative"
                          style={{ height: `${Math.max(2, gmvPercent)}%` }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[9px] font-bold px-1 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {naira(d.gmv)}
                          </span>
                        </div>
                        {/* Commission Bar */}
                        <div
                          className="w-4 bg-primary group-hover:bg-primary-container rounded-t-sm transition-all relative"
                          style={{ height: `${Math.max(2, commPercent)}%` }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[9px] font-bold px-1 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {naira(d.comm)}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-on-surface-variant font-medium">{d.month}</span>
                    </div>
                  );
                })}
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
                { label: "Verified Vendors", count: activeVendorsCount, percentage: verifiedPercentage, color: "bg-status-success" },
                { label: "Pending Verification", count: pendingVerificationCount, percentage: pendingPercentage, color: "bg-status-warning" },
                { label: "Suspended/Restricted", count: suspendedVendorsCount, percentage: suspendedPercentage, color: "bg-status-error" },
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
                {pendingVerificationCount} vendors have submitted new verification documents (business registration details / CAC certificate). These storefronts will remain locked for new product listing publications until approved.
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
            {pendingApplications.map((app: any) => (
              <div key={app.id} className="flex justify-between items-center py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body-md font-bold text-on-surface">{app.businessName}</span>
                    <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold capitalize">
                      {app.businessEmail || "Store"}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Owner: {app.user ? `${app.user.firstName} ${app.user.lastName}` : "N/A"} • Requested {app.createdAt ? date(app.createdAt, false) : "N/A"}
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

            {pendingApplications.length === 0 && (
              <div className="py-6 text-center text-on-surface-variant text-xs font-semibold">
                No pending vendor applications found.
              </div>
            )}
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
            {recentTransactions.map((tx: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center py-4">
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

            {recentTransactions.length === 0 && (
              <div className="py-6 text-center text-on-surface-variant text-xs font-semibold">
                No recent checkout collections recorded.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
