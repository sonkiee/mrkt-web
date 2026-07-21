"use client";

import { HelpCircle, Plus, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function VendorSupportPage() {
  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Store Support Hub</h2>
        <p className="text-body-md text-on-surface-variant">
          Submit dispute tickets to platform admins regarding commission payouts, catalog errors, or shipping problems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft h-fit">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Create Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface">Subject Summary</label>
              <Input placeholder="e.g. Settlement payment delay" className="bg-surface-container-lowest" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface">Details / Explanation</label>
              <Textarea rows={5} placeholder="Describe the issue you are experiencing..." className="bg-surface-container-lowest leading-relaxed" />
            </div>
            <Button className="w-full bg-primary text-on-primary">
              Submit Ticket to Admins
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-headline-md font-bold text-on-surface">Contact Platform Admin</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-xs">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <div>
                  <span className="text-on-surface-variant block uppercase tracking-wider font-semibold">Admin Hotline Email</span>
                  <span className="text-on-surface font-semibold">ops@lumina.com</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" />
                <div>
                  <span className="text-on-surface-variant block uppercase tracking-wider font-semibold">Typical Response SLA</span>
                  <span className="text-on-surface font-semibold">Within 4 Hours (Business Days)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
