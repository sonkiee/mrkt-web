"use client";

import { ArrowDownToLine, Calendar, HelpCircle, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VendorWithdrawalsPage() {
  const payouts = [
    {
      id: "WTH-092",
      amount: "₦420,000",
      bank: "Access Bank (0723849102)",
      date: "July 5, 2026",
      status: "Pending Approval",
    },
    {
      id: "WTH-090",
      amount: "₦1,850,000",
      bank: "Access Bank (0723849102)",
      date: "June 28, 2026",
      status: "Approved & Transferred",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Withdrawal Statements</h2>
        <p className="text-body-md text-on-surface-variant">
          Track individual manual withdrawal settlements requested by your store.
        </p>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Request Reference</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Settled Amount</th>
                <th className="p-4 font-bold text-on-surface-variant">Destination Bank Account</th>
                <th className="p-4 font-bold text-on-surface-variant">Request Date</th>
                <th className="p-4 font-bold text-on-surface-variant">Transfer Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs sm:text-sm">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-on-surface">{p.id}</td>
                  <td className="p-4 text-right text-primary font-bold">{p.amount}</td>
                  <td className="p-4 text-on-surface-variant">{p.bank}</td>
                  <td className="p-4 text-on-surface-variant">{p.date}</td>
                  <td className="p-4">
                    <Badge
                      className={`border-none ${
                        p.status.startsWith("Approved")
                          ? "bg-status-success/15 text-status-success"
                          : "bg-status-warning/15 text-status-warning"
                      } text-xs px-2.5 py-0.5 rounded font-bold`}
                    >
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
