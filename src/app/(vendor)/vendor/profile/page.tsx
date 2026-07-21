"use client";

import { Store, Camera, Edit2, ShieldCheck, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function VendorProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Store Profile</h2>
          <p className="text-body-md text-on-surface-variant">
            Update your public storefront banners, brand logo image, and description bio.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          Save Profile Changes
        </Button>
      </div>

      <div className="relative group">
        {/* Banner */}
        <div className="w-full h-48 rounded-2xl overflow-hidden bg-primary/20 relative border border-outline-variant/30">
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-primary flex items-center gap-1.5 shadow">
              <Camera size={14} /> Change Store Banner
            </span>
          </div>
        </div>

        {/* Logo overlay */}
        <div className="absolute -bottom-6 left-6 flex items-end gap-4">
          <div className="w-20 h-20 rounded-xl bg-white p-1 border shadow-md relative group/logo">
            <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xl font-bold">
              L
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center rounded-xl cursor-pointer">
              <Camera size={14} className="text-white" />
            </div>
          </div>
          <div className="pb-1">
            <h3 className="text-headline-md font-bold text-on-surface flex items-center gap-1.5">
              Lumina Tech Store <ShieldCheck size={18} className="text-primary" />
            </h3>
            <p className="text-xs text-on-surface-variant">Certified Premium Marketplace Vendor</p>
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
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface">Public Storefront Name</label>
                <Input defaultValue="Lumina Tech Store" className="bg-surface-container-lowest" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface">Store Bio Slogan</label>
                <Input defaultValue="Your one-stop boutique for certified smartphones and gadgets in Kaduna." className="bg-surface-container-lowest" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface">Full Store Description</label>
                <Textarea rows={4} className="bg-surface-container-lowest leading-relaxed">
                  Lumina is Kaduna's premier digital retailer. We source original iPhones, iPads, and accessories directly from manufacturers. All items are rigorously checked by our in-house engineering team before publishing to the Kaduna marketplace.
                </Textarea>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-headline-md font-bold text-on-surface">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-xs">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <div>
                  <span className="text-on-surface-variant block uppercase tracking-wider font-semibold">Store Email</span>
                  <span className="text-on-surface font-semibold">sales@luminastore.com</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <div>
                  <span className="text-on-surface-variant block uppercase tracking-wider font-semibold">Storefront Hub Address</span>
                  <span className="text-on-surface font-semibold">12 Isa Kaita Road, Kaduna North</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
