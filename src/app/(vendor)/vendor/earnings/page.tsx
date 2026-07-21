"use client";

import { DollarSign, ArrowUpRight, TrendingUp, Calendar, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VendorEarningsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Store Earnings Ledger</h2>
          <p className="text-body-md text-on-surface-variant">
            Study commission deductions, gross storefront sales ledger, and next payout calculations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <DollarSign size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">Gross Sales (This Month)</p>
                <h3 className="text-2xl font-bold text-on-surface mt-0.5">₦2,150,000</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-status-error/10 text-status-error rounded-xl">
                <DollarSign size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">Platform Fee (10% standard)</p>
                <h3 className="text-2xl font-bold text-status-error mt-0.5">-₦215,000</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-status-success/10 text-status-success rounded-xl">
                <DollarSign size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">Net Earnings (To Wallet)</p>
                <h3 className="text-2xl font-bold text-status-success mt-0.5">₦1,935,000</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-headline-md font-bold text-on-surface">Payment Ledger History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Payment Reference</th>
                <th className="p-4 font-bold text-on-surface-variant">Order Value</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Commission Taken</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Net Store Payout</th>
                <th className="p-4 font-bold text-on-surface-variant">Settled Date</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs sm:text-sm">
              {[
                { ref: "PAY-84021", val: "₦145,000", fee: "₦14,500", net: "₦130,500", date: "July 5, 2026" },
                { ref: "PAY-84020", val: "₦48,000", fee: "₦4,800", net: "₦43,200", date: "July 4, 2026" },
                { ref: "PAY-84019", val: "₦280,000", fee: "₦28,000", net: "₦252,000", date: "July 1, 2026" },
              ].map((p, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-on-surface">{p.ref}</td>
                  <td className="p-4 text-on-surface">{p.val}</td>
                  <td className="p-4 text-right text-status-error font-medium">-{p.fee}</td>
                  <td className="p-4 text-right text-primary font-bold">{p.net}</td>
                  <td className="p-4 text-on-surface-variant">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
