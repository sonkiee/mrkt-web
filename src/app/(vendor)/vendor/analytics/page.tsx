"use client";

import { BarChart3, TrendingUp, Eye, ShoppingBag, Percent } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFetchVendorDashboardStats, useFetchVendorOrders } from "@/hooks/queries";
import { naira } from "@/utils/naira";
import Spinner from "@/components/spinner";
import { useMemo } from "react";

export default function VendorAnalyticsPage() {
  const { data: statsData, isLoading: isStatsLoading, error: statsError } = useFetchVendorDashboardStats();
  const { data: ordersData, isLoading: isOrdersLoading, error: ordersError } = useFetchVendorOrders();

  const stats = statsData?.data || statsData || {};
  const orders = ordersData?.data || ordersData || [];

  // Dynamically calculate top selling storefront products from order items
  const topProducts = useMemo(() => {
    const productMap: Record<string, { name: string; qty: number; sales: number }> = {};
    let totalRevenue = 0;

    orders.forEach((item: any) => {
      const title = item.productTitleSnapshot || "Product Details";
      const qty = Number(item.qty || 1);
      const val = Number(item.total || item.unitPrice || 0);

      totalRevenue += val;

      if (!productMap[title]) {
        productMap[title] = { name: title, qty: 0, sales: 0 };
      }
      productMap[title].qty += qty;
      productMap[title].sales += val;
    });

    const list = Object.values(productMap).sort((a, b) => b.sales - a.sales);

    return list.map((p) => {
      const share = totalRevenue > 0 ? `${Math.round((p.sales / totalRevenue) * 100)}%` : "0%";
      return {
        name: p.name,
        qty: p.qty,
        sales: naira(p.sales),
        share,
      };
    });
  }, [orders]);

  const isPageLoading = isStatsLoading || isOrdersLoading;

  if (isPageLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading metrics..." />
      </div>
    );
  }

  if (statsError || ordersError) {
    return (
      <div className="text-center py-24 text-status-error font-medium">
        Failed to load analytics dashboard. Please try again later.
      </div>
    );
  }

  const grossSales = Number(stats.revenue || 0);
  const itemsSold = Number(stats.itemsSold || 0);

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
                <p className="text-xs font-semibold text-on-surface-variant">Storefront Revenue</p>
                <h3 className="text-2xl font-bold text-on-surface mt-0.5">{naira(grossSales)}</h3>
                <span className="text-[10px] text-status-success font-semibold flex items-center gap-0.5 mt-0.5">
                  <TrendingUp size={10} /> Live balance revenue
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
                <p className="text-xs font-semibold text-on-surface-variant">Total Units Sold</p>
                <h3 className="text-2xl font-bold text-on-surface mt-0.5">{itemsSold}</h3>
                <span className="text-[10px] text-status-success font-semibold flex items-center gap-0.5 mt-0.5">
                  <TrendingUp size={10} /> Handled checkouts count
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
                <p className="text-xs font-semibold text-on-surface-variant">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-on-surface mt-0.5">3.42%</h3>
                <span className="text-[10px] text-status-success font-semibold flex items-center gap-0.5 mt-0.5">
                  <TrendingUp size={10} /> +0.5% last week
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
        <CardContent className="p-0 overflow-x-auto">
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
              {topProducts.map((p: any, idx: number) => (
                <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-semibold text-on-surface">{p.name}</td>
                  <td className="p-4 text-center text-on-surface">{p.qty}</td>
                  <td className="p-4 text-right text-primary font-bold">{p.sales}</td>
                  <td className="p-4 text-center text-on-surface-variant font-semibold">{p.share}</td>
                </tr>
              ))}

              {topProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <BarChart3 size={32} className="text-on-surface-variant/40" />
                      <p className="font-bold text-on-surface">No Analytics Data</p>
                      <p className="text-xs text-on-surface-variant">Once you make sales, detailed graphs will appear here.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

