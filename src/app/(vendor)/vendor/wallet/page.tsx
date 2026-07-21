"use client";

import { useState } from "react";
import {
  Wallet,
  Download,
  Landmark,
  DollarSign,
  ArrowUpRight,
  TrendingUp,
  ArrowDownToLine,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function VendorWalletPage() {
  const [activeTab, setActiveTab] = useState("wallet");

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">
            Finance & Wallet Hub
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Manage your store balances, payout requests, earnings ledger, and bank accounts in one place.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          <Download size={16} className="mr-1.5" /> Request Payout
        </Button>
      </div>

      {/* Unified Tabs */}
      <Tabs defaultValue="wallet" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-surface-container-low p-1 rounded-xl h-auto gap-1">
          <TabsTrigger
            value="wallet"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2"
          >
            <Wallet size={16} />
            <span>Wallet & Account</span>
          </TabsTrigger>

          <TabsTrigger
            value="earnings"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2"
          >
            <DollarSign size={16} />
            <span>Earnings & Ledger</span>
          </TabsTrigger>

          <TabsTrigger
            value="withdrawals"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2"
          >
            <ArrowDownToLine size={16} />
            <span>Payout History</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Wallet & Bank Account */}
        <TabsContent value="wallet" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border border-outline-variant/30 bg-gradient-to-br from-primary to-[#005c53] text-white p-6 rounded-2xl shadow-md lg:col-span-1">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-white/80 font-bold">
                    Seller Available Balance
                  </span>
                  <Wallet size={20} className="text-white/80" />
                </div>
                <div>
                  <p className="text-3xl font-bold">₦420,000</p>
                  <p className="text-[10px] text-white/70 mt-1">
                    Settlement Cycle: Every 24 Hours
                  </p>
                </div>
                <div className="border-t border-white/20 pt-4 flex justify-between items-center text-xs">
                  <span>Next Auto-Payout: July 8</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded font-bold">
                    Standard Account
                  </span>
                </div>
              </div>
            </Card>

            {/* Bank Account Details */}
            <Card className="border border-outline-variant/30 shadow-soft lg:col-span-2">
              <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-headline-md font-bold text-on-surface flex items-center gap-2">
                  <Landmark size={18} /> Verified Settlement Account
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">
                      Receiving Bank
                    </span>
                    <span className="font-bold text-on-surface text-base">
                      Access Bank Plc
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">
                      Account Number
                    </span>
                    <span className="font-mono font-bold text-on-surface text-base">
                      0723849102
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">
                      Account Holder Name
                    </span>
                    <span className="font-bold text-on-surface">
                      LUMINA INTEGRATED SERVICES LTD
                    </span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Bank credentials must match registered corporate CAC credentials exactly. Settlement routing transfers usually clear in 15-30 minutes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Earnings & Sales Ledger */}
        <TabsContent value="earnings" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-outline-variant/30 shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-primary/10 text-primary rounded-xl">
                    <DollarSign size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-on-surface-variant">
                      Gross Sales (This Month)
                    </p>
                    <h3 className="text-2xl font-bold text-on-surface mt-0.5">
                      ₦2,150,000
                    </h3>
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
                    <p className="text-xs font-semibold text-on-surface-variant">
                      Platform Fee (10% standard)
                    </p>
                    <h3 className="text-2xl font-bold text-status-error mt-0.5">
                      -₦215,000
                    </h3>
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
                    <p className="text-xs font-semibold text-on-surface-variant">
                      Net Earnings (To Wallet)
                    </p>
                    <h3 className="text-2xl font-bold text-status-success mt-0.5">
                      ₦1,935,000
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-headline-md font-bold text-on-surface">
                Payment Ledger History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b">
                    <th className="p-4 font-bold text-on-surface-variant">
                      Payment Reference
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant">
                      Order Value
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant text-right">
                      Commission Taken
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant text-right">
                      Net Store Payout
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant">
                      Settled Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm">
                  {[
                    {
                      ref: "PAY-84021",
                      val: "₦145,000",
                      fee: "₦14,500",
                      net: "₦130,500",
                      date: "July 5, 2026",
                    },
                    {
                      ref: "PAY-84020",
                      val: "₦48,000",
                      fee: "₦4,800",
                      net: "₦43,200",
                      date: "July 4, 2026",
                    },
                    {
                      ref: "PAY-84019",
                      val: "₦280,000",
                      fee: "₦28,000",
                      net: "₦252,000",
                      date: "July 1, 2026",
                    },
                  ].map((p, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-surface-container-low/40 transition-colors"
                    >
                      <td className="p-4 font-mono font-bold text-on-surface">
                        {p.ref}
                      </td>
                      <td className="p-4 text-on-surface">{p.val}</td>
                      <td className="p-4 text-right text-status-error font-medium">
                        -{p.fee}
                      </td>
                      <td className="p-4 text-right text-primary font-bold">
                        {p.net}
                      </td>
                      <td className="p-4 text-on-surface-variant">{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Withdrawal History */}
        <TabsContent value="withdrawals" className="mt-6 space-y-6">
          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-headline-md font-bold text-on-surface">
                Withdrawal Transfers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b">
                    <th className="p-4 font-bold text-on-surface-variant">
                      Request Reference
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant text-right">
                      Settled Amount
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant">
                      Destination Bank Account
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant">
                      Request Date
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant">
                      Transfer Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm">
                  {payouts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-surface-container-low/40 transition-colors"
                    >
                      <td className="p-4 font-mono font-bold text-on-surface">
                        {p.id}
                      </td>
                      <td className="p-4 text-right text-primary font-bold">
                        {p.amount}
                      </td>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
