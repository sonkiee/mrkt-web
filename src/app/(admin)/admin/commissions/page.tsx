"use client";

import { Coins, Settings, ArrowUpRight, TrendingUp, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CommissionsPage() {
  const customRates = [
    { vendor: "Lumina Official Store", category: "Electronics", rate: "8.5%", baseRate: "10%" },
    { vendor: "Arewa Mobile Shop", category: "Smartphones", rate: "9.0%", baseRate: "10%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Platform Commission Settings</h2>
          <p className="text-body-md text-on-surface-variant">
            Set default and override commission rules collected from marketplace order payments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <Card className="lg:col-span-1 border border-outline-variant/30 shadow-soft h-fit">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center gap-2">
              <Coins className="text-primary" />
              <CardTitle className="text-headline-md font-bold text-on-surface">Base Marketplace Fee</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface">Global Commission Rate (%)</label>
              <div className="relative">
                <Input type="number" defaultValue="10" className="pr-8 bg-surface-container-lowest" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm font-bold">%</span>
              </div>
              <p className="text-[10px] text-on-surface-variant">Applied automatically to all vendor sales unless overridden.</p>
            </div>

            <Button className="w-full bg-primary text-on-primary mt-2">
              Update Base Settings
            </Button>
          </CardContent>
        </Card>

        {/* Vendor commission rate overrides */}
        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Store Commission Overrides</CardTitle>
            <p className="text-xs text-on-surface-variant">Special contract agreements or lower fees for highly active vendors</p>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b">
                  <th className="p-4 font-bold text-on-surface-variant">Vendor Store</th>
                  <th className="p-4 font-bold text-on-surface-variant">Primary Category</th>
                  <th className="p-4 font-bold text-on-surface-variant text-right">Base Standard</th>
                  <th className="p-4 font-bold text-on-surface-variant text-right">Negotiated Rate</th>
                  <th className="p-4 font-bold text-on-surface-variant text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customRates.map((c, index) => (
                  <tr key={index} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-4 font-bold text-on-surface">{c.vendor}</td>
                    <td className="p-4 text-on-surface-variant">{c.category}</td>
                    <td className="p-4 text-right text-on-surface-variant line-through">{c.baseRate}</td>
                    <td className="p-4 text-right text-primary font-bold">{c.rate}</td>
                    <td className="p-4 text-center">
                      <Button size="sm" variant="ghost" className="text-xs text-primary hover:bg-primary/5 h-8">
                        Edit Rate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
