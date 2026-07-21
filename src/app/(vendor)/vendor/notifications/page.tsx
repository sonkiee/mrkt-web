"use client";

import { Bell, Info, AlertCircle, ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VendorNotificationsPage() {
  const alerts = [
    {
      type: "order",
      title: "New order received (ORD-9421)",
      desc: "Buyer Kamilu Isa purchased 1x iPhone 13 Pro Max. Please prepare packing slip.",
      date: "25 mins ago",
    },
    {
      type: "system",
      title: "CAC verification validated successfully",
      desc: "Lumina Operations team has completed the audit of your registry certificate.",
      date: "2 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Store Notifications</h2>
        <p className="text-body-md text-on-surface-variant">
          Important system logs, buyer actions, and payout notices for your storefront.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alerts.map((a, idx) => (
          <Card key={idx} className="border border-outline-variant/30 shadow-soft">
            <CardContent className="pt-6 flex gap-4">
              <span className="p-2.5 bg-primary/10 text-primary rounded-xl h-fit shrink-0">
                {a.type === "order" ? <ShoppingCart size={20} /> : <Info size={20} />}
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-on-surface">{a.title}</h3>
                <p className="text-xs text-on-surface-variant/90 leading-relaxed">{a.desc}</p>
                <span className="text-[10px] text-on-surface-variant/70 block pt-1">{a.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
