"use client";

import { BarChart3, TrendingUp, Eye, ShoppingBag, Percent } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VendorAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Store Analytics</h2>
        <p className="text-body-md text-on-surface-variant">
          Detailed metrics of storefront hits, bounce rates, conversion percentages, and search performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <Eye size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">Storefront Pageviews</p>
                <h3 className="text-2xl font-bold text-on-surface mt-0.5">14,240</h3>
                <span className="text-[10px] text-status-success font-semibold flex items-center gap-0.5 mt-0.5">
                  <TrendingUp size={10} /> +12.4% last week
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <ShoppingBag size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-on-surface mt-0.5">3.42%</h3>
                <span className="text-[10px] text-status-success font-semibold flex items-center gap-0.5 mt-0.5">
                  <TrendingUp size={10} /> +0.5% last week
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <Percent size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">Add-to-Cart Ratio</p>
                <h3 className="text-2xl font-bold text-on-surface mt-0.5">8.12%</h3>
                <span className="text-[10px] text-status-success font-semibold flex items-center gap-0.5 mt-0.5">
                  <TrendingUp size={10} /> +1.2% last week
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-headline-md font-bold text-on-surface">Top Selling Storefront Products</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Product Title</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Units Sold</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Revenue Generated</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Traffic Share</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs sm:text-sm">
              {[
                { name: "iPhone 13 Pro Max (128GB)", qty: 24, sales: "₦13,920,000", share: "45%" },
                { name: "Apple AirPods Pro (2nd Generation)", qty: 98, sales: "₦14,210,000", share: "30%" },
                { name: "Lenovo ThinkPad L14", qty: 15, sales: "₦4,200,000", share: "15%" },
              ].map((p, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-semibold text-on-surface">{p.name}</td>
                  <td className="p-4 text-center text-on-surface">{p.qty}</td>
                  <td className="p-4 text-right text-primary font-bold">{p.sales}</td>
                  <td className="p-4 text-center text-on-surface-variant font-semibold">{p.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
