"use client";

import { Bell, Plus, Calendar, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function NotificationsPage() {
  const broadcasts = [
    {
      title: "Scheduled Server Maintenance",
      target: "All Users (Sellers &amp; Buyers)",
      sentDate: "July 2, 2026",
      desc: "Platform will undergo routine database updates on Sunday at 02:00 AM WAT. Minimal downtime expected.",
    },
    {
      title: "New Commission Tier Launch",
      target: "Vendors Only",
      sentDate: "June 25, 2026",
      desc: "Lumina is lowering mobile device category commissions to 8% for high-volume vendors this quarter.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Platform Notification Broadcasts</h2>
          <p className="text-body-md text-on-surface-variant">
            Send real-time alerts, email digests, and banner notifications to vendors and customers.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          <Plus size={16} className="mr-1.5" /> New Broadcast
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {broadcasts.map((b, idx) => (
          <Card key={idx} className="border border-outline-variant/30 shadow-soft">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                    <Radio size={16} />
                  </span>
                  <h3 className="text-headline-md font-bold text-on-surface">{b.title}</h3>
                </div>
                <Badge className="bg-secondary-container text-on-secondary-container border-none text-[10px] font-bold px-2 py-0.5 rounded">
                  {b.target}
                </Badge>
              </div>
              <p className="text-xs text-on-surface-variant/90 leading-relaxed mb-4">
                {b.desc}
              </p>
              <div className="border-t pt-3 text-xs text-on-surface-variant flex items-center gap-1.5">
                <Calendar size={12} /> Broadcasted on: {b.sentDate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
