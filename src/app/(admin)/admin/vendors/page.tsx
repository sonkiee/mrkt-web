"use client";

import { useState } from "react";
import { Search, Plus, Filter, CheckCircle, Ban, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const vendors = [
    {
      id: "VND-001",
      name: "Lumina Official Store",
      owner: "Sarah Jenkins",
      products: 48,
      sales: 1240,
      revenue: "₦2,450,000",
      commissionPaid: "₦245,000",
      status: "Verified",
    },
    {
      id: "VND-002",
      name: "Digital Depot Ltd",
      owner: "Kassim Bello",
      products: 24,
      sales: 420,
      revenue: "₦890,000",
      commissionPaid: "₦89,000",
      status: "Verified",
    },
    {
      id: "VND-003",
      name: "Arewa Mobile Shop",
      owner: "Zubairu Ali",
      products: 15,
      sales: 98,
      revenue: "₦220,000",
      commissionPaid: "₦22,000",
      status: "Pending",
    },
    {
      id: "VND-004",
      name: "Kaduna Tech Services",
      owner: "Grace Joseph",
      products: 32,
      sales: 512,
      revenue: "₦1,020,000",
      commissionPaid: "₦102,000",
      status: "Verified",
    },
    {
      id: "VND-005",
      name: "Zaria Repair Hub",
      owner: "Ibrahim Umar",
      products: 8,
      sales: 12,
      revenue: "₦24,000",
      commissionPaid: "₦2,400",
      status: "Suspended",
    },
  ];

  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Registered Vendors</h2>
          <p className="text-body-md text-on-surface-variant">
            Manage registered store owners, view storefront statistics, and change compliance statuses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Total Verified Stores</p>
            <h3 className="text-2xl font-bold text-primary mt-1">128</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Pending CAC Verification</p>
            <h3 className="text-2xl font-bold text-status-warning mt-1">7</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Suspended Accounts</p>
            <h3 className="text-2xl font-bold text-status-error mt-1">7</h3>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <Input
              placeholder="Search store name or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-surface-container-lowest border-outline-variant"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-outline-variant hover:bg-surface-container-high">
              <Filter className="mr-2" size={16} /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Store Details</th>
                <th className="p-4 font-bold text-on-surface-variant">Owner</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Products</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Sales</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Revenue</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Commission</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Status</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="font-bold text-on-surface">{vendor.name}</div>
                      <div className="text-xs text-on-surface-variant">{vendor.id}</div>
                    </div>
                  </td>
                  <td className="p-4 text-on-surface">{vendor.owner}</td>
                  <td className="p-4 text-center text-on-surface">{vendor.products}</td>
                  <td className="p-4 text-center text-on-surface">{vendor.sales}</td>
                  <td className="p-4 text-right text-on-surface font-semibold">{vendor.revenue}</td>
                  <td className="p-4 text-right text-primary font-bold">{vendor.commissionPaid}</td>
                  <td className="p-4 text-center">
                    <Badge
                      className={`border-none ${
                        vendor.status === "Verified"
                          ? "bg-status-success/15 text-status-success"
                          : vendor.status === "Pending"
                            ? "bg-status-warning/15 text-status-warning"
                            : "bg-status-error/15 text-status-error"
                      } text-xs px-2.5 py-0.5 rounded font-bold`}
                    >
                      {vendor.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-1">
                      <Button size="sm" variant="ghost" className="text-xs text-primary hover:bg-primary/5 h-8">
                        Manage
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
