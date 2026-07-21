"use client";

import { CheckCircle, XCircle, FileText, ExternalLink, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VendorVerificationPage() {
  const verifications = [
    {
      id: "VFY-090",
      vendor: "Arewa Mobile Shop",
      cacNumber: "RC-1849021",
      submittedDate: "June 28, 2026",
      documents: [
        { name: "CAC Certificate.pdf", type: "CAC" },
        { name: "Utility Bill (Electric).jpg", type: "Utility" },
      ],
      status: "Awaiting Audit",
    },
    {
      id: "VFY-089",
      vendor: "Kaduna Tech Services",
      cacNumber: "RC-1738492",
      submittedDate: "June 25, 2026",
      documents: [
        { name: "CAC Form 1.1.pdf", type: "CAC" },
        { name: "Owner National ID.pdf", type: "ID" },
      ],
      status: "Awaiting Audit",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Vendor Verification (CAC &amp; KYC)</h2>
        <p className="text-body-md text-on-surface-variant">
          Audit corporate registry certificates, owner identifications, and storefront business licenses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {verifications.map((v) => (
          <Card key={v.id} className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-headline-md font-bold text-on-surface">{v.vendor}</CardTitle>
                  <Badge className="bg-status-warning/15 text-status-warning border-none text-xs font-bold px-2 py-0.5 rounded">
                    {v.status}
                  </Badge>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  Submission ID: {v.id} • Registered Registry ID: <span className="font-semibold">{v.cacNumber}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="border-status-error text-status-error hover:bg-status-error/5 h-9">
                  <XCircle size={16} className="mr-1.5" /> Reject
                </Button>
                <Button size="sm" className="bg-primary text-on-primary hover:opacity-95 h-9">
                  <CheckCircle size={16} className="mr-1.5" /> Verify Store
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">Submitted Documents</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {v.documents.map((doc, idx) => (
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
        ))}

        {verifications.length === 0 && (
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
