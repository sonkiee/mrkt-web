"use client";

import { RotateCcw, HelpCircle, Package, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VendorReturnsPage() {
  const returns = [
    {
      id: "RET-021",
      customer: "Aminu Isa",
      product: "iPhone 13 Pro Max (128GB)",
      reason: "Buyer received wrong color (sent Space Black instead of Sierra Blue)",
      status: "Awaiting Package Return",
      date: "July 5, 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Returns &amp; Replacements</h2>
        <p className="text-body-md text-on-surface-variant">
          Audit customer refund claims, inspect returns, and dispatch replacement packages.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {returns.map((r) => (
          <Card key={r.id} className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                    <RotateCcw size={16} />
                  </span>
                  <CardTitle className="text-headline-md font-bold text-on-surface">Return ID: {r.id}</CardTitle>
                  <Badge className="bg-status-warning/15 text-status-warning border-none text-xs font-bold px-2 py-0.5 rounded">
                    {r.status}
                  </Badge>
                </div>
                <p className="text-xs text-on-surface-variant mt-1.5">
                  Submitted by: <span className="font-semibold">{r.customer}</span> • Date: {r.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="border-outline-variant hover:bg-surface-container-high h-9">
                  Reject Claim
                </Button>
                <Button size="sm" className="bg-primary text-on-primary hover:opacity-95 h-9">
                  Authorize Refund
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold mb-1">Returned Product</span>
                <span className="font-bold text-on-surface text-sm flex items-center gap-1.5">
                  <Package size={14} className="text-primary" /> {r.product}
                </span>
              </div>
              <div className="border-t pt-3">
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold mb-1">Customer Reason</span>
                <p className="text-xs text-on-surface-variant leading-relaxed bg-surface-container-low/40 p-4 rounded-xl border">
                  "{r.reason}"
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {returns.length === 0 && (
          <div className="text-center py-12 border border-dashed rounded-xl bg-white space-y-3">
            <RotateCcw className="mx-auto text-status-success" size={40} />
            <div>
              <p className="font-bold text-on-surface">No Returns Pending</p>
              <p className="text-xs text-on-surface-variant">There are no return requests awaiting review.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
