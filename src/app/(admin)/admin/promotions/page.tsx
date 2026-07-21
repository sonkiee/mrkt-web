"use client";

import { Gift, Plus, Calendar, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PromotionsPage() {
  const promos = [
    {
      code: "KADUNAFEST15",
      discount: "15% Off",
      category: "Site-wide",
      minPurchase: "₦20,000",
      activeUntil: "July 20, 2026",
      status: "Active",
    },
    {
      code: "WELCOME5000",
      discount: "₦5,000 Flat",
      category: "New Customers",
      minPurchase: "₦50,000",
      activeUntil: "Dec 31, 2026",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Platform Promotions &amp; Coupons</h2>
          <p className="text-body-md text-on-surface-variant">
            Create site-wide coupon codes, manage flat discount events, and configure customer loyalty banners.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          <Plus size={16} className="mr-1.5" /> Add Coupon
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promos.map((p, idx) => (
          <Card key={idx} className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                  <Gift size={16} />
                </span>
                <span className="font-mono font-bold text-on-surface text-lg">{p.code}</span>
              </div>
              <Badge className="bg-status-success/15 text-status-success border-none text-xs font-bold px-2 py-0.5 rounded">
                {p.status}
              </Badge>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-on-surface-variant block">Discount Value</span>
                  <span className="font-bold text-on-surface text-sm">{p.discount}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Min Purchase Requirement</span>
                  <span className="font-bold text-on-surface text-sm">{p.minPurchase}</span>
                </div>
              </div>
              <div className="border-t pt-3 flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Expires: {p.activeUntil}</span>
                <Button size="sm" variant="ghost" className="text-status-error hover:bg-status-error/5 h-8">
                  <Trash2 size={14} className="mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
