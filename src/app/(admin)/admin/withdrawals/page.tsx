"use client";

import { Download, CheckCircle, XCircle, ArrowUpRight, DollarSign, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PayoutWithdrawalsPage() {
  const requests = [
    {
      id: "WTH-092",
      vendor: "Lumina Official Store",
      amount: "₦420,000",
      bank: "Access Bank",
      accountNo: "0723849102",
      date: "July 5, 2026",
      status: "Pending Approval",
    },
    {
      id: "WTH-091",
      vendor: "Digital Depot",
      amount: "₦185,000",
      bank: "Guaranty Trust Bank",
      accountNo: "0112849204",
      date: "July 4, 2026",
      status: "Pending Approval",
    },
    {
      id: "WTH-090",
      vendor: "Arewa Mobile Shop",
      amount: "₦42,000",
      bank: "Zenith Bank",
      accountNo: "1018274920",
      date: "June 30, 2026",
      status: "Approved & Transferred",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Vendor Payouts &amp; Withdrawals</h2>
          <p className="text-body-md text-on-surface-variant">
            Process bank transfers, view withdrawal logs, and authorize vendor wallet settlements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <Wallet size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">Awaiting Transfer</p>
                <h3 className="text-2xl font-bold text-on-surface mt-0.5">₦605,000</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-status-success/10 text-status-success rounded-xl">
                <CheckCircle size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">Settled Payouts (This Month)</p>
                <h3 className="text-2xl font-bold text-on-surface mt-0.5">₦3,150,000</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-secondary/10 text-secondary rounded-xl">
                <Download size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">Total Transactions Audited</p>
                <h3 className="text-2xl font-bold text-on-surface mt-0.5">342</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Request ID</th>
                <th className="p-4 font-bold text-on-surface-variant">Vendor Store</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Amount</th>
                <th className="p-4 font-bold text-on-surface-variant">Bank Destination</th>
                <th className="p-4 font-bold text-on-surface-variant">Account Number</th>
                <th className="p-4 font-bold text-on-surface-variant">Requested Date</th>
                <th className="p-4 font-bold text-on-surface-variant">Status</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-on-surface">{r.id}</td>
                  <td className="p-4 text-on-surface font-semibold">{r.vendor}</td>
                  <td className="p-4 text-right text-primary font-bold">{r.amount}</td>
                  <td className="p-4 text-on-surface-variant">{r.bank}</td>
                  <td className="p-4 text-on-surface-variant font-mono">{r.accountNo}</td>
                  <td className="p-4 text-on-surface-variant">{r.date}</td>
                  <td className="p-4">
                    <Badge
                      className={`border-none ${
                        r.status.startsWith("Approved")
                          ? "bg-status-success/15 text-status-success"
                          : "bg-status-warning/15 text-status-warning"
                      } text-xs px-2.5 py-0.5 rounded font-bold`}
                    >
                      {r.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    {r.status.startsWith("Pending") ? (
                      <div className="flex justify-center gap-1">
                        <Button size="sm" className="bg-primary text-on-primary hover:opacity-95 h-8">
                          Approve
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-outline font-semibold">Processed</span>
                    )}
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
