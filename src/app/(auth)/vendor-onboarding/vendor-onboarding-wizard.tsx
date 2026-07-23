"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Store,
  User,
  Building2,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  vendorOnboardingSchema,
  VendorOnboardingData,
} from "@/schema";
import { toast } from "sonner";

export default function VendorOnboardingWizard() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  const form = useForm<VendorOnboardingData>({
    resolver: zodResolver(vendorOnboardingSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      storeName: "",
      category: "electronics",
      storeBio: "",
      address: "",
      city: "Kaduna",
      state: "Kaduna",
      bankName: "Access Bank",
      accountNumber: "",
      accountName: "",
      businessType: "individual",
      cacNumber: "",
      idNumber: "",
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof VendorOnboardingData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ["fullName", "email", "phone", "password"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["storeName", "category", "storeBio", "address", "city", "state"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => (prev + 1) as any);
    } else {
      toast.error("Please fill in all required fields accurately.");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1) as any);
  };

  const onSubmit = (data: VendorOnboardingData) => {
    console.log("Submitting Vendor Onboarding Application:", data);
    toast.success("Vendor application submitted successfully!");
    setCurrentStep(4); // Move to completion step
  };

  return (
    <div className="min-h-screen bg-surface-background flex flex-col justify-center py-10 px-4">
      <div className="max-w-3xl mx-auto w-full space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-black text-2xl">
            <Store size={28} />
            <span>MRKT Vendor Partner Program</span>
          </Link>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto">
            Join Kaduna's premier multi-vendor network. Sell your devices, phones, and tech to thousands of verified buyers.
          </p>
        </div>

        {/* Step Indicator Pills */}
        {currentStep <= 3 && (
          <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-2xl border border-outline-variant/30 shadow-xs text-xs">
            <div
              className={`flex items-center gap-2 p-2.5 rounded-xl font-bold transition-all ${
                currentStep === 1
                  ? "bg-primary text-on-primary shadow-sm"
                  : currentStep > 1
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface-variant/60"
              }`}
            >
              <User size={16} />
              <span className="hidden sm:inline">1. Account Info</span>
            </div>

            <div
              className={`flex items-center gap-2 p-2.5 rounded-xl font-bold transition-all ${
                currentStep === 2
                  ? "bg-primary text-on-primary shadow-sm"
                  : currentStep > 2
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface-variant/60"
              }`}
            >
              <Building2 size={16} />
              <span className="hidden sm:inline">2. Store Profile</span>
            </div>

            <div
              className={`flex items-center gap-2 p-2.5 rounded-xl font-bold transition-all ${
                currentStep === 3
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant/60"
              }`}
            >
              <Landmark size={16} />
              <span className="hidden sm:inline">3. Bank & ID</span>
            </div>
          </div>
        )}

        {/* Form Container Card */}
        <Card className="border border-outline-variant/30 shadow-soft bg-white p-6 sm:p-8 rounded-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* STEP 1: Account Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <h3 className="text-headline-md font-bold text-on-surface flex items-center gap-2">
                      <User size={20} className="text-primary" /> Primary Account & Contact Details
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Provide details of the store owner or primary contact administrator.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">Full Legal Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Aminu Ibrahim" {...field} />
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
                          <FormLabel className="text-xs font-semibold">Phone / WhatsApp Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+234 803 123 4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">Business Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="vendor@arewatech.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">Account Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="button" onClick={nextStep} className="bg-primary text-on-primary px-6 font-bold">
                      Next: Store Profile <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Storefront Profile */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <h3 className="text-headline-md font-bold text-on-surface flex items-center gap-2">
                      <Building2 size={20} className="text-primary" /> Public Storefront Profile
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      This information will be displayed to customers on your public storefront page.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="storeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">Public Storefront Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Arewa Tech Hub" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">Primary Product Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select primary category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="electronics">Electronics & Gadgets</SelectItem>
                              <SelectItem value="smartphones">Smartphones & Tablets</SelectItem>
                              <SelectItem value="computers">Computers & Laptops</SelectItem>
                              <SelectItem value="services">Repairs & Technical Services</SelectItem>
                              <SelectItem value="accessories">Accessories & Audio</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="storeBio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold">Storefront Bio & Description</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            placeholder="Tell buyers about your shop, warranty policies, and specialty items..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel className="text-xs font-semibold">Physical Store/Hub Address</FormLabel>
                          <FormControl>
                            <Input placeholder="12 Isa Kaita Road" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">City</FormLabel>
                          <FormControl>
                            <Input placeholder="Kaduna" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ChevronLeft size={16} className="mr-1" /> Previous
                    </Button>
                    <Button type="button" onClick={nextStep} className="bg-primary text-on-primary px-6 font-bold">
                      Next: Settlement & Identity <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Settlement Bank & Identity Verification */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <h3 className="text-headline-md font-bold text-on-surface flex items-center gap-2">
                      <Landmark size={20} className="text-primary" /> Settlement Bank & Verification
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Enter your bank payout account and verification details for audit approval.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">Settlement Bank</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Bank" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Access Bank">Access Bank Plc</SelectItem>
                              <SelectItem value="GTBank">Guaranty Trust Bank</SelectItem>
                              <SelectItem value="Zenith Bank">Zenith Bank Plc</SelectItem>
                              <SelectItem value="First Bank">First Bank Nigeria</SelectItem>
                              <SelectItem value="UBA">United Bank for Africa</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">10-Digit Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="0723849102" maxLength={10} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">Account Holder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="LUMINA TECH LTD" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">Business Entity Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Entity Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="individual">Sole Trader / Individual</SelectItem>
                              <SelectItem value="corporate">Registered Corporate Business (CAC)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">NIN / Government ID Number</FormLabel>
                          <FormControl>
                            <Input placeholder="11-digit NIN or ID number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ChevronLeft size={16} className="mr-1" /> Previous
                    </Button>
                    <Button type="submit" className="bg-primary text-on-primary px-8 font-extrabold shadow-md">
                      Submit Vendor Application <ShieldCheck size={16} className="ml-1.5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 4: Application Received Confirmation */}
              {currentStep === 4 && (
                <div className="text-center py-6 space-y-5">
                  <div className="w-16 h-16 bg-status-success/15 text-status-success rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <h3 className="text-headline-lg font-bold text-on-surface">
                      Application Submitted Successfully!
                    </h3>
                    <p className="text-sm text-on-surface-variant max-w-md mx-auto mt-1 leading-relaxed">
                      Your vendor partner application is currently <strong>Pending Audit Review</strong> by our compliance team. Review takes approximately 12-24 hours.
                    </p>
                  </div>

                  <div className="bg-surface-container-low/40 p-4 rounded-xl border border-outline-variant/30 text-xs text-left max-w-md mx-auto space-y-2">
                    <div className="flex items-center gap-2 font-bold text-on-surface">
                      <Sparkles size={16} className="text-primary" /> What happens next?
                    </div>
                    <ul className="list-disc list-inside text-on-surface-variant space-y-1">
                      <li>Compliance audits your bank details and ID.</li>
                      <li>You will receive an email confirmation upon approval.</li>
                      <li>Once approved, you can start listing products immediately.</li>
                    </ul>
                  </div>

                  <div className="pt-4 flex justify-center gap-3">
                    <Button asChild variant="outline">
                      <Link href="/">Back to Marketplace</Link>
                    </Button>
                    <Button asChild className="bg-primary text-on-primary font-bold">
                      <Link href="/vendor">Preview Vendor Portal</Link>
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
