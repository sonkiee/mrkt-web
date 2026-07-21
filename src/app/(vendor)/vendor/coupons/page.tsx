"use client";

import { Ticket, Plus, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function VendorCouponsPage() {
  const coupons = [
    {
      code: "LUMINATECH10",
      discount: "10% Off",
      minPurchase: "₦15,000",
      activeUntil: "July 31, 2026",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Storefront Coupons</h2>
          <p className="text-body-md text-on-surface-variant">
            Create promotional coupon discount vouchers applicable only to your products.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-outline-variant/30 shadow-soft h-fit">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Create New Coupon</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface">Coupon Code</label>
              <Input placeholder="e.g. SAVE5K" className="bg-surface-container-lowest" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface">Discount Value</label>
              <Input placeholder="e.g. 10% or 5000" className="bg-surface-container-lowest" />
            </div>
            <Button className="w-full bg-primary text-on-primary">
              Generate Voucher
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {coupons.map((c, idx) => (
            <Card key={idx} className="border border-outline-variant/30 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                    <Ticket size={16} />
                  </span>
                  <span className="font-mono font-bold text-on-surface text-lg">{c.code}</span>
                </div>
                <Badge className="bg-status-success/15 text-status-success border-none text-xs font-bold px-2 py-0.5 rounded">
                  {c.status}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4 flex justify-between items-center text-xs">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-on-surface">{c.discount} discount</p>
                  <p className="text-on-surface-variant">Min purchase required: {c.minPurchase}</p>
                  <p className="text-on-surface-variant/80">Expires: {c.activeUntil}</p>
                </div>
                <Button size="sm" variant="ghost" className="text-status-error hover:bg-status-error/5 h-8">
                  <Trash2 size={14} className="mr-1" /> Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
