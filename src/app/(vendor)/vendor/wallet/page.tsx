"use client";

import { Wallet, Download, RefreshCw, Landmark, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VendorWalletPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Store Wallet</h2>
          <p className="text-body-md text-on-surface-variant">
            Initiate payout bank transfers, verify active settlement bank cards, and monitor wallet locks.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          <Download size={16} className="mr-1.5" /> Request Payout
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-outline-variant/30 bg-gradient-to-br from-primary to-[#005c53] text-white p-6 rounded-2xl shadow-md lg:col-span-1">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider text-white/80 font-bold">Lumina Seller Balance</span>
              <Wallet size={20} className="text-white/80" />
            </div>
            <div>
              <p className="text-3xl font-bold">₦420,000</p>
              <p className="text-[10px] text-white/70 mt-1">Settlement Cycle: Every 24 Hours</p>
            </div>
            <div className="border-t border-white/20 pt-4 flex justify-between items-center text-xs">
              <span>Next Auto-Payout: July 8</span>
              <span className="bg-white/10 px-2 py-0.5 rounded font-bold">Standard Account</span>
            </div>
          </div>
        </Card>

        {/* Bank account details card */}
        <Card className="border border-outline-variant/30 shadow-soft lg:col-span-2">
          <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-headline-md font-bold text-on-surface flex items-center gap-2">
              <Landmark size={18} /> Verified Settlement Account
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Receiving Bank</span>
                <span className="font-bold text-on-surface text-base">Access Bank Plc</span>
              </div>
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Account Number</span>
                <span className="font-mono font-bold text-on-surface text-base">0723849102</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Account Holder Name</span>
                <span className="font-bold text-on-surface">LUMINA INTEGRATED SERVICES LTD</span>
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
    </div>
  );
}
