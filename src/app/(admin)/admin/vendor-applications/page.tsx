"use client";

import { CheckCircle, XCircle, FileCheck, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useListVendors } from "@/hooks/queries";
import { updateVendorStatusAction } from "@/actions";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { date } from "@/utils/date";
import Spinner from "@/components/spinner";
import { useState } from "react";

export default function VendorApplicationsPage() {
  const queryClient = useQueryClient();
  const { data: vendorsData, isLoading, error } = useListVendors();
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const vendors = vendorsData?.data || vendorsData || [];
  const pendingApplications = vendors.filter((v: any) => v.status === "PENDING");

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

  const handleUpdateStatus = (id: string, status: "APPROVED" | "REJECTED") => {
    setSubmittingId(id);
    executeUpdate({ id, status });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading vendor applications..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-status-error font-medium">
        Failed to load vendor applications. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Vendor Applications</h2>
        <p className="text-body-md text-on-surface-variant">
          Review details of businesses wishing to sell products on the Lumina multi-vendor platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingApplications.map((app: any) => {
          const isPending = submittingId === app.id;
          return (
            <Card key={app.id} className="border border-outline-variant/30 shadow-soft">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-headline-md font-bold text-on-surface">{app.businessName}</CardTitle>
                    <Badge className="bg-primary/10 text-primary border-none text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      Pending Review
                    </Badge>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1.5">
                    <Calendar size={12} />
                    Submitted: {app.createdAt ? date(app.createdAt, false) : "N/A"} • Application ID: {app.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => handleUpdateStatus(app.id, "REJECTED")}
                    className="border-status-error text-status-error hover:bg-status-error/5 h-9"
                  >
                    <XCircle size={16} className="mr-1.5" /> Decline
                  </Button>
                  <Button
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleUpdateStatus(app.id, "APPROVED")}
                    className="bg-primary text-on-primary hover:opacity-95 h-9"
                  >
                    <CheckCircle size={16} className="mr-1.5" /> Approve Business
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Primary Contact</div>
                    <div className="text-sm font-bold text-on-surface">
                      {app.user ? `${app.user.firstName} ${app.user.lastName}` : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Email Address</div>
                    <div className="text-sm text-on-surface flex items-center gap-1">
                      <Mail size={14} className="text-on-surface-variant" /> {app.businessEmail || app.user?.email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Phone Number</div>
                    <div className="text-sm text-on-surface font-semibold">{app.phone || "N/A"}</div>
                  </div>
                </div>
                {app.description && (
                  <div className="border-t pt-4">
                    <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Business Pitch / Description</div>
                    <p className="text-sm text-on-surface-variant leading-relaxed bg-surface-container-low/40 p-4 rounded-xl border">
                      {app.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {pendingApplications.length === 0 && (
          <div className="text-center py-12 border border-dashed rounded-xl bg-white space-y-3">
            <FileCheck className="mx-auto text-status-success" size={40} />
            <div>
              <p className="font-bold text-on-surface">No Pending Applications</p>
              <p className="text-xs text-on-surface-variant">All incoming seller applications have been audited.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

