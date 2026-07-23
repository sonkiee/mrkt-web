"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Store, Calendar, Mail, Phone, MapPin, CheckCircle, Ban, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetVendorById } from "@/hooks/queries";
import { updateVendorStatusAction } from "@/actions";
import { updateVendorByAdminAction } from "@/actions/admin";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { date } from "@/utils/date";
import Spinner from "@/components/spinner";

export default function ManageVendorPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: vendorData, isLoading, error } = useGetVendorById(id as string);
  const vendor = vendorData?.data || vendorData || {};

  // Form states
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync data to form state when loaded
  useEffect(() => {
    if (vendor && Object.keys(vendor).length > 0) {
      setBusinessName(vendor.businessName || "");
      setBusinessEmail(vendor.businessEmail || "");
      setPhone(vendor.phone || "");
      setAddress(vendor.address || "");
      setDescription(vendor.description || "");
    }
  }, [vendorData]);

  const { execute: updateProfile } = useAction(updateVendorByAdminAction, {
    onSuccess() {
      toast.success("Vendor profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["vendor", id] });
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      setIsSubmitting(false);
    },
    onError({ error }) {
      toast.error(error.serverError || "Failed to update vendor profile.");
      setIsSubmitting(false);
    },
  });

  const { execute: executeUpdateStatus } = useAction(updateVendorStatusAction, {
    onSuccess(res) {
      toast.success(res?.data?.message || "Vendor status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["vendor", id] });
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
    onError({ error }) {
      toast.error(error.serverError || "Failed to update vendor status.");
    },
  });

  const handleUpdateStatus = (status: "APPROVED" | "SUSPENDED") => {
    executeUpdateStatus({ id: id as string, status });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    updateProfile({
      id: id as string,
      businessName,
      businessEmail,
      phone,
      address,
      description,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading vendor registry profiles..." />
      </div>
    );
  }

  if (error || !vendor.id) {
    return (
      <div className="text-center py-24">
        <p className="text-status-error font-medium mb-4">Failed to load vendor profile details.</p>
        <Button onClick={() => router.push("/admin/vendors")} variant="outline">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Directory
        </Button>
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
      {/* Navigation & Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div className="space-y-2">
          <button
            onClick={() => router.push("/admin/vendors")}
            className="flex items-center text-xs text-on-surface-variant hover:text-primary gap-1 font-bold transition-colors"
          >
            <ArrowLeft size={14} /> Back to Directory
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-headline-lg font-bold text-on-surface flex items-center gap-2">
              <Store size={22} className="text-primary" /> {vendor.businessName}
            </h2>
            <Badge className={`border-none ${getStatusBadgeColor(vendor.status)} text-xs px-2.5 py-0.5 rounded font-bold`}>
              {vendor.status}
            </Badge>
          </div>
        </div>
        <a
          href={`/vendors/${vendor.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-semibold bg-surface-container-lowest text-primary hover:bg-surface-container-low border border-outline-variant/60 h-9 px-4 shadow-xs gap-1.5 transition-colors"
        >
          <ExternalLink size={14} /> View Storefront Profile
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form to manage profile */}
        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft bg-white">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Store Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Business Name</label>
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="bg-surface-container-lowest border-outline-variant"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Business Email</label>
                  <Input
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="bg-surface-container-lowest border-outline-variant"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Store Phone</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="bg-surface-container-lowest border-outline-variant"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Hub Address</label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-surface-container-lowest border-outline-variant"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Bio Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full rounded-md border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={isSubmitting} className="bg-primary text-on-primary">
                  {isSubmitting ? "Saving Updates..." : "Save Profile Details"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Registry & Actions card */}
        <div className="space-y-6">
          <Card className="border border-outline-variant/30 shadow-soft h-fit bg-white">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-headline-md font-bold text-on-surface">Registration Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant block">Date Joined</span>
                    <span className="font-bold text-on-surface">
                      {vendor.createdAt ? date(vendor.createdAt, false) : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t pt-3">
                  <Mail size={16} className="text-primary" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant block">Owner Name</span>
                    <span className="font-bold text-on-surface">
                      {vendor.user ? `${vendor.user.firstName} ${vendor.user.lastName}` : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t pt-3">
                  <Mail size={16} className="text-primary" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant block">Owner Email</span>
                    <span className="font-bold text-on-surface">
                      {vendor.user?.email || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-outline-variant/30 shadow-soft h-fit bg-white border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-extrabold uppercase text-on-surface-variant tracking-wider">Compliance Status Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-3">
              {vendor.status === "APPROVED" ? (
                <>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    This store is currently fully verified and active. You can suspend the account to temporarily lock the store's listing permissions.
                  </p>
                  <Button
                    onClick={() => handleUpdateStatus("SUSPENDED")}
                    className="w-full bg-status-error text-white hover:opacity-95 flex items-center justify-center gap-1.5 h-10 font-bold"
                  >
                    <Ban size={16} /> Suspend Seller Storefront
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    This storefront is currently restricted or suspended. You can reactivate or verify the account to grant full listing access rights.
                  </p>
                  <Button
                    onClick={() => handleUpdateStatus("APPROVED")}
                    className="w-full bg-status-success text-white hover:opacity-95 flex items-center justify-center gap-1.5 h-10 font-bold"
                  >
                    <CheckCircle size={16} /> Verify &amp; Reactivate Seller
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
