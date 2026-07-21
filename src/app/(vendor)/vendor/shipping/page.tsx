"use client";

import { Truck, Settings, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function VendorShippingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Shipping &amp; Fulfillment Settings</h2>
          <p className="text-body-md text-on-surface-variant">
            Set store shipping rates, average dispatch times, and logistics integrations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border border-outline-variant/30 shadow-soft h-fit">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center gap-2">
              <Truck className="text-primary" />
              <CardTitle className="text-headline-md font-bold text-on-surface">Fulfillment SLA</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface">Average Dispatch Time (Hours)</label>
              <Input type="number" defaultValue="24" className="bg-surface-container-lowest" />
              <p className="text-[10px] text-on-surface-variant">Target speed promised to customers on product pages.</p>
            </div>
            <Button className="w-full bg-primary text-on-primary">
              Save Shipping Terms
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">State Delivery Coverage</CardTitle>
            <p className="text-xs text-on-surface-variant">Shipping costs and availability per region</p>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b">
                  <th className="p-4 font-bold text-on-surface-variant">Region / Location</th>
                  <th className="p-4 font-bold text-on-surface-variant">Delivery Fee</th>
                  <th className="p-4 font-bold text-on-surface-variant text-center">Estimated Duration</th>
                  <th className="p-4 font-bold text-on-surface-variant text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs sm:text-sm">
                {[
                  { region: "Kaduna North / Central", price: "₦1,500", duration: "1 - 2 Days", status: "Active" },
                  { region: "Zaria / Kaduna South", price: "₦3,000", duration: "2 - 3 Days", status: "Active" },
                  { region: "Abuja (FCT)", price: "₦5,000", duration: "3 - 5 Days", status: "Active" },
                ].map((s, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-4 font-bold text-on-surface">{s.region}</td>
                    <td className="p-4 text-primary font-bold">{s.price}</td>
                    <td className="p-4 text-center text-on-surface">{s.duration}</td>
                    <td className="p-4 text-center">
                      <span className="bg-status-success/15 text-status-success text-xs font-bold px-2 py-0.5 rounded">
                        {s.status}
                      </span>
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
