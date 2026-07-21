"use client";

import { CheckCircle, XCircle, FileCheck, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VendorApplicationsPage() {
  const applications = [
    {
      id: "APP-029",
      storeName: "Arewa Tech Hub",
      owner: "Aminu Ibrahim",
      email: "aminu@arewatech.com",
      phone: "+234 803 123 4567",
      category: "Electronics",
      desc: "We supply premium wholesale accessories and networking solutions to retailers in Kaduna.",
      date: "July 5, 2026",
    },
    {
      id: "APP-028",
      storeName: "Kaduna Gadgets",
      owner: "Faith Joshua",
      email: "faith.gadgets@gmail.com",
      phone: "+234 812 345 6789",
      category: "Mobile Phones",
      desc: "Specialist retailer of certified refurbished iPhones and Samsung flagship units.",
      date: "July 4, 2026",
    },
    {
      id: "APP-027",
      storeName: "Zaria Repairs & Parts",
      owner: "Musa Bello",
      email: "musa@zariarepairs.com",
      phone: "+234 705 987 6543",
      category: "Services / Repairs",
      desc: "Professional motherboard micro-soldering repairs and original spare parts dealer.",
      date: "July 3, 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Vendor Applications</h2>
        <p className="text-body-md text-on-surface-variant">
          Review details of businesses wishing to sell products on the Lumina multi-vendor platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {applications.map((app) => (
          <Card key={app.id} className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-headline-md font-bold text-on-surface">{app.storeName}</CardTitle>
                  <Badge className="bg-primary/10 text-primary border-none text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {app.category}
                  </Badge>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1.5">
                  <Calendar size={12} />
                  Submitted: {app.date} • Application ID: {app.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="border-status-error text-status-error hover:bg-status-error/5 h-9">
                  <XCircle size={16} className="mr-1.5" /> Decline
                </Button>
                <Button size="sm" className="bg-primary text-on-primary hover:opacity-95 h-9">
                  <CheckCircle size={16} className="mr-1.5" /> Approve Business
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Primary Contact</div>
                  <div className="text-sm font-bold text-on-surface">{app.owner}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Email Address</div>
                  <div className="text-sm text-on-surface flex items-center gap-1">
                    <Mail size={14} className="text-on-surface-variant" /> {app.email}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-0.5">Phone Number</div>
                  <div className="text-sm text-on-surface font-semibold">{app.phone}</div>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">Business Pitch / Description</div>
                <p className="text-sm text-on-surface-variant leading-relaxed bg-surface-container-low/40 p-4 rounded-xl border">
                  {app.desc}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {applications.length === 0 && (
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
