"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFetchVendorProfile } from "@/hooks/queries";
import { updateVendorProfile } from "@/actions";
import { VendorProfileData, vendorProfileSchema } from "@/schema";
import { Camera, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/spinner";

export default function VendorProfilePage() {
  const queryClient = useQueryClient();
  const { data: vendor, isLoading } = useFetchVendorProfile();

  const form = useForm<VendorProfileData>({
    resolver: zodResolver(vendorProfileSchema),
    defaultValues: {
      businessName: "",
      businessEmail: "",
      phone: "",
      description: "",
      address: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (vendor) {
      form.reset({
        businessName: vendor.businessName || "",
        businessEmail: vendor.businessEmail || "",
        phone: vendor.phone || "",
        description: vendor.description || "",
        address: vendor.address || "",
      });
    }
  }, [vendor, form]);

  const { execute: executeUpdate, isPending } = useAction(updateVendorProfile, {
    onSuccess() {
      toast.success("Store profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["vendor-profile"] });
    },
    onError({ error }) {
      toast.error(error.serverError || "Failed to update profile. Please try again.");
    },
  });

  const onSubmit = (values: VendorProfileData) => {
    executeUpdate(values);
  };

  if (isLoading) {
    return <Spinner infoText="Loading store details..." />;
  }

  const logoInitial = vendor?.businessName?.[0]?.toUpperCase() || "L";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface">Store Profile</h2>
            <p className="text-body-md text-on-surface-variant">
              Update your public storefront banners, brand logo image, and description bio.
            </p>
          </div>
          <Button type="submit" disabled={isPending} className="bg-primary text-on-primary">
            {isPending ? "Saving..." : "Save Profile Changes"}
          </Button>
        </div>

        <div className="relative group">
          {/* Banner */}
          <div className="w-full h-48 rounded-2xl overflow-hidden bg-primary/20 relative border border-outline-variant/30">
            {vendor?.banner ? (
              <img src={vendor.banner} alt="Store Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-primary flex items-center gap-1.5 shadow">
                  <Camera size={14} /> Change Store Banner
                </span>
              </div>
            )}
          </div>

          {/* Logo overlay */}
          <div className="absolute -bottom-6 left-6 flex items-end gap-4">
            <div className="w-20 h-20 rounded-xl bg-white p-1 border shadow-md relative group/logo">
              {vendor?.logo ? (
                <img src={vendor.logo} alt="Store Logo" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xl font-bold">
                  {logoInitial}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center rounded-xl cursor-pointer">
                <Camera size={14} className="text-white" />
              </div>
            </div>
            <div className="pb-1">
              <h3 className="text-headline-md font-bold text-on-surface flex items-center gap-1.5">
                {vendor?.businessName} <ShieldCheck size={18} className="text-primary" />
              </h3>
              <p className="text-xs text-on-surface-variant capitalize">
                {vendor?.status === "APPROVED" ? "Certified Premium Marketplace Vendor" : "Pending Approval"}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-outline-variant/30 shadow-soft">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-headline-md font-bold text-on-surface">Storefront Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-on-surface">Public Storefront Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-surface-container-lowest" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-on-surface">Full Store Description</FormLabel>
                      <FormControl>
                        <Textarea rows={6} {...field} className="bg-surface-container-lowest leading-relaxed" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border border-outline-variant/30 shadow-soft">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-headline-md font-bold text-on-surface">Contact &amp; Location</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="businessEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                        <Mail size={14} className="text-primary" /> Store Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-surface-container-lowest text-xs" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                        <Phone size={14} className="text-primary" /> Store Phone
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-surface-container-lowest text-xs" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                        <MapPin size={14} className="text-primary" /> Storefront Hub Address
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-surface-container-lowest text-xs" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
