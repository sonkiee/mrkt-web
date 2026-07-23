"use client";

import { useState } from "react";
import { Search, ShieldAlert, CheckCircle, Ban, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useListVendors } from "@/hooks/queries";
import { updateVendorStatusAction } from "@/actions";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { date } from "@/utils/date";
import Spinner from "@/components/spinner";
import Link from "next/link";

export default function VendorsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const { data: vendorsData, isLoading, error } = useListVendors();

  const vendors = vendorsData?.data || vendorsData || [];

  const { execute: executeUpdate } = useAction(updateVendorStatusAction, {
    onSuccess(res) {
      toast.success(res?.data?.message || "Vendor status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      setSubmittingId(null);
    },
    onError({ error }) {
      toast.error(error.serverError || "Failed to update vendor status.");
      setSubmittingId(null);
    },
  });

  const handleUpdateStatus = (id: string, status: "APPROVED" | "SUSPENDED") => {
    setSubmittingId(id);
    executeUpdate({ id, status });
  };

  const filteredVendors = vendors.filter(
    (v: any) =>
      v.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${v.user?.firstName} ${v.user?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVerified = vendors.filter((v: any) => v.status === "APPROVED").length;
  const totalPending = vendors.filter((v: any) => v.status === "PENDING").length;
  const totalSuspended = vendors.filter((v: any) => v.status === "SUSPENDED").length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading vendor directories..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-status-error font-medium">
        Failed to load vendor registry. Please try again later.
      </div>
    );
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-status-success/15 text-status-success";
      case "PENDING":
        return "bg-status-warning/15 text-status-warning";
      case "SUSPENDED":
        return "bg-status-error/15 text-status-error";
      default:
        return "bg-surface-container-high text-on-surface-variant";
    }
  };

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
            <h3 className="text-2xl font-bold text-primary mt-1">{totalVerified}</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Pending CAC Verification</p>
            <h3 className="text-2xl font-bold text-status-warning mt-1">{totalPending}</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Suspended Accounts</p>
            <h3 className="text-2xl font-bold text-status-error mt-1">{totalSuspended}</h3>
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
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Store Details</th>
                <th className="p-4 font-bold text-on-surface-variant">Owner</th>
                <th className="p-4 font-bold text-on-surface-variant">Registered Email</th>
                <th className="p-4 font-bold text-on-surface-variant">Created Date</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Status</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredVendors.map((vendor: any) => {
                const isPending = submittingId === vendor.id;
                return (
                  <tr key={vendor.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-on-surface">{vendor.businessName}</div>
                        <div className="text-xs font-mono text-on-surface-variant">{vendor.id.slice(0, 8).toUpperCase()}</div>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface">
                      {vendor.user ? `${vendor.user.firstName} ${vendor.user.lastName}` : "N/A"}
                    </td>
                    <td className="p-4 text-on-surface-variant">{vendor.businessEmail}</td>
                    <td className="p-4 text-on-surface-variant">
                      {vendor.createdAt ? date(vendor.createdAt, false) : "N/A"}
                    </td>
                    <td className="p-4 text-center">
                      <Badge className={`border-none ${getStatusBadgeColor(vendor.status)} text-xs px-2.5 py-0.5 rounded font-bold`}>
                        {vendor.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-1.5 items-center">
                        <Link href={`/admin/vendors/${vendor.id}`}>
                          <Button size="sm" variant="outline" className="text-xs border-outline-variant hover:bg-surface-container-high h-8 gap-1">
                            <Settings size={12} /> Manage
                          </Button>
                        </Link>
                        {vendor.status === "APPROVED" ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={isPending}
                            onClick={() => handleUpdateStatus(vendor.id, "SUSPENDED")}
                            className="text-xs text-status-error hover:bg-status-error/5 h-8 gap-1"
                          >
                            <Ban size={12} /> Suspend
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={isPending}
                            onClick={() => handleUpdateStatus(vendor.id, "APPROVED")}
                            className="text-xs text-status-success hover:bg-status-success/5 h-8 gap-1"
                          >
                            <CheckCircle size={12} /> Reactivate
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredVendors.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                    No matching vendors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
