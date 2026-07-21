"use client";

import { History, Search, Terminal, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AuditLogsPage() {
  const logs = [
    {
      action: "Vendor Approved",
      details: "Approved 'Arewa Tech Hub' storefront registration and activated inventory listing.",
      user: "Alex Danjuma (Admin)",
      ip: "192.168.1.104",
      date: "2 mins ago",
    },
    {
      action: "Commission Changed",
      details: "Updated primary base commission fee parameter to 10% globally.",
      user: "Alex Danjuma (Admin)",
      ip: "192.168.1.104",
      date: "1 hour ago",
    },
    {
      action: "Role Modified",
      details: "Added verification permission node to 'Compliance Auditor' staff group.",
      user: "Fatima Aliyu (Compliance)",
      ip: "192.168.1.120",
      date: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Security Audit Logs</h2>
        <p className="text-body-md text-on-surface-variant">
          Real-time ledger of administrative adjustments, vendor verifications, policy edits, and payouts.
        </p>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Event</th>
                <th className="p-4 font-bold text-on-surface-variant">Details</th>
                <th className="p-4 font-bold text-on-surface-variant">Actor</th>
                <th className="p-4 font-bold text-on-surface-variant">IP Address</th>
                <th className="p-4 font-bold text-on-surface-variant">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-bold text-on-surface flex items-center gap-2">
                    <span className="p-1 bg-primary/10 text-primary rounded-md">
                      <Terminal size={12} />
                    </span>
                    {log.action}
                  </td>
                  <td className="p-4 text-on-surface-variant leading-relaxed">{log.details}</td>
                  <td className="p-4 text-on-surface font-semibold">{log.user}</td>
                  <td className="p-4 text-on-surface-variant font-mono">{log.ip}</td>
                  <td className="p-4 text-on-surface-variant">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
