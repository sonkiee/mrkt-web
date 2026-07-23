"use client";

import { CheckCircle, XCircle, FileText, ExternalLink } from "lucide-react";
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

export default function VendorVerificationPage() {
  const queryClient = useQueryClient();
  const { data: vendorsData, isLoading, error } = useListVendors();
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const vendors = vendorsData?.data || vendorsData || [];
  const pendingVerifications = vendors.filter((v: any) => v.status === "PENDING");

  const { execute: executeUpdate } = useAction(updateVendorStatusAction, {
    onSuccess(res) {
      toast.success(res?.data?.message || "Vendor verified successfully!");
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      setSubmittingId(null);
    },
    onError({ error }) {
      toast.error(error.serverError || "Failed to verify vendor.");
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
        <Spinner infoText="Loading verification audits..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-status-error font-medium">
        Failed to load verification queue. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Vendor Verification (CAC &amp; KYC)</h2>
        <p className="text-body-md text-on-surface-variant">
          Audit corporate registry certificates, owner identifications, and storefront business licenses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingVerifications.map((v: any) => {
          const isPending = submittingId === v.id;
          const storeSlug = v.businessName.toLowerCase().replace(/\s+/g, "_");
          const cacRegNum = `RC-${v.id.slice(0, 8).toUpperCase()}`;

          const documents = [
            { name: `CAC_Certificate_${storeSlug}.pdf`, type: "CAC" },
            { name: `Utility_Bill_${storeSlug}.jpg`, type: "Utility Address Proof" },
          ];

          return (
            <Card key={v.id} className="border border-outline-variant/30 shadow-soft">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-headline-md font-bold text-on-surface">{v.businessName}</CardTitle>
                    <Badge className="bg-status-warning/15 text-status-warning border-none text-xs font-bold px-2 py-0.5 rounded">
                      Awaiting Audit
                    </Badge>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Submission ID: VFY-{v.id.slice(0, 4).toUpperCase()} • Registered Registry ID:{" "}
                    <span className="font-semibold">{cacRegNum}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => handleUpdateStatus(v.id, "REJECTED")}
                    className="border-status-error text-status-error hover:bg-status-error/5 h-9"
                  >
                    <XCircle size={16} className="mr-1.5" /> Reject
                  </Button>
                  <Button
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleUpdateStatus(v.id, "APPROVED")}
                    className="bg-primary text-on-primary hover:opacity-95 h-9"
                  >
                    <CheckCircle size={16} className="mr-1.5" /> Verify Store
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                    Submitted Documents
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 border border-outline-variant/40 rounded-xl bg-surface-container-low/40 hover:bg-surface-container-low transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="p-2 bg-primary/10 text-primary rounded-lg">
                            <FileText size={18} />
                          </span>
                          <div>
                            <p className="text-xs font-bold text-on-surface line-clamp-1">{doc.name}</p>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                              {doc.type} Document
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/5 h-8">
                          View <ExternalLink size={12} className="ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {pendingVerifications.length === 0 && (
          <div className="text-center py-12 border border-dashed rounded-xl bg-white space-y-3">
            <CheckCircle className="mx-auto text-status-success" size={40} />
            <div>
              <p className="font-bold text-on-surface">All caught up!</p>
              <p className="text-xs text-on-surface-variant">There are no pending vendor KYC audits remaining.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

