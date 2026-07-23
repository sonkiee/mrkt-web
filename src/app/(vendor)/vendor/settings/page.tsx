"use client";

import { Settings, Shield, Bell, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useFetchVendorProfile } from "@/hooks/queries";
import Spinner from "@/components/spinner";

export default function VendorSettingsPage() {
  const { data: profileData, isLoading } = useFetchVendorProfile();
  
  const vendor = profileData?.data || profileData || {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading configurations..." />
      </div>
    );
  }

  const isVerified = vendor.status === "APPROVED";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Store Settings</h2>
          <p className="text-body-md text-on-surface-variant">
            Configure system configurations, email alerts, order dispatch notifications, and passwords.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-primary" />
                <CardTitle className="text-headline-md font-bold text-on-surface">Notification Channels</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox id="email-orders" defaultChecked />
                <div className="space-y-0.5 leading-none">
                  <label htmlFor="email-orders" className="text-sm font-bold text-on-surface">Email on New Orders</label>
                  <p className="text-xs text-on-surface-variant">Receive a copy of buyer packing slips as soon as they pay.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="email-disputes" defaultChecked />
                <div className="space-y-0.5 leading-none">
                  <label htmlFor="email-disputes" className="text-sm font-bold text-on-surface">Email on Return Disputes</label>
                  <p className="text-xs text-on-surface-variant">Get notified immediately when a buyer reports an item problem.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-primary" />
                <CardTitle className="text-headline-md font-bold text-on-surface">Store Verification Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-3 text-xs leading-relaxed">
              {isVerified ? (
                <>
                  <div className="flex items-center gap-1.5 text-status-success font-bold mb-2">
                    <CheckCircle2 size={16} /> Fully Verified Account
                  </div>
                  <p className="text-on-surface-variant">
                    Your business registry (CAC) audit has been validated by Lumina Platform operations. You have full listing rights.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 text-status-warning font-bold mb-2">
                    <Clock size={16} /> Verification Pending Audit
                  </div>
                  <p className="text-on-surface-variant">
                    Your business documents (government ID/CAC) are currently being reviewed by compliance. Standard storefront restrictions apply.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

