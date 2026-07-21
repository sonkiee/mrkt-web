"use client";

import { HelpCircle, Search, MessageSquare, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SupportTicketsPage() {
  const tickets = [
    {
      id: "TCK-4819",
      subject: "Refund claim for delayed smartphone parcel",
      user: "Gabriel John (Customer)",
      priority: "High",
      status: "Open",
      date: "30 mins ago",
    },
    {
      id: "TCK-4818",
      subject: "Failed to upload multi-variant product image",
      user: "Sarah Jenkins (Vendor)",
      priority: "Medium",
      status: "In Progress",
      date: "3 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Customer &amp; Vendor Support Tickets</h2>
        <p className="text-body-md text-on-surface-variant">
          Respond to marketplace disputes, delivery failures, merchant panel errors, and general feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tickets.map((t) => (
          <Card key={t.id} className="border border-outline-variant/30 shadow-soft">
            <CardContent className="pt-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                    <HelpCircle size={16} />
                  </span>
                  <h3 className="text-headline-md font-bold text-on-surface">{t.subject}</h3>
                  <Badge
                    className={`border-none ${
                      t.priority === "High" ? "bg-status-error/15 text-status-error" : "bg-status-warning/15 text-status-warning"
                    } text-[10px] font-bold px-2 py-0.5 rounded`}
                  >
                    {t.priority} Priority
                  </Badge>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Submitted by: <span className="font-semibold">{t.user}</span> • Ticket: <span className="font-mono">{t.id}</span>
                </p>
                <p className="text-xs text-on-surface-variant/80 flex items-center gap-1.5 mt-1">
                  <Clock size={12} /> Last updated {t.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-primary text-on-primary hover:opacity-95 h-9">
                  <MessageSquare size={14} className="mr-1.5" /> Reply to Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
