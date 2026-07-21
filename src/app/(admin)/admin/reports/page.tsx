"use client";

import { BarChart3, TrendingUp, Download, Eye, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Platform Reports &amp; Analytics</h2>
          <p className="text-body-md text-on-surface-variant">
            Export comprehensive sales audits, vendor distributions, tax sheets, and customer summaries.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Gross Sales Ledger",
            desc: "Complete order transactions, tax calculations, and vendor disbursement summaries.",
            type: "CSV / Excel",
          },
          {
            title: "Vendor Commission Report",
            desc: "Track marketplace revenue collected from vendor commission rates (10% platform fee).",
            type: "PDF / CSV",
          },
          {
            title: "Refunds & Dispute Log",
            desc: "Breakdown of cancelled orders, processing fees, and chargeback dispute operations.",
            type: "PDF",
          },
        ].map((report, idx) => (
          <Card key={idx} className="border border-outline-variant/30 shadow-soft flex flex-col justify-between">
            <CardHeader>
              <div className="p-2 bg-primary/10 text-primary w-fit rounded-lg mb-2">
                <BarChart3 size={18} />
              </div>
              <CardTitle className="text-headline-md font-bold text-on-surface">{report.title}</CardTitle>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-2">{report.desc}</p>
            </CardHeader>
            <CardContent className="pt-0 flex gap-2 border-t pt-4 mt-auto">
              <Button size="sm" variant="outline" className="flex-1 border-outline-variant hover:bg-surface-container-high h-9">
                <Eye size={14} className="mr-1" /> View Preview
              </Button>
              <Button size="sm" className="flex-1 bg-primary text-on-primary hover:opacity-95 h-9">
                <Download size={14} className="mr-1" /> Export {report.type.split(" ")[0]}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
