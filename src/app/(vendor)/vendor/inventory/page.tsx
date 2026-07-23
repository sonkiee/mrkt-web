"use client";

import { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdminListProducts } from "@/hooks/queries";
import { naira } from "@/utils/naira";
import Spinner from "@/components/spinner";

export default function VendorInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: productsData, isLoading, error } = useAdminListProducts();

  const products = productsData?.data ?? [];

  // Flatten products and variants to get individual SKU listings
  const inventoryItems = products.flatMap((product: any) => {
    return (product.variants || []).map((variant: any) => ({
      sku: variant.sku || `${product.id.slice(0, 8)}-${variant.id.slice(0, 4)}`.toUpperCase(),
      name: `${product.title} (${variant.condition ? variant.condition.replace('_', ' ') : 'Standard'}${variant.attributes ? ', ' + Object.entries(variant.attributes).map(([k,v]) => `${k}: ${v}`).join(', ') : ''})`,
      category: product.category?.name || "Uncategorized",
      stock: variant.stockQty || 0,
      alertThreshold: 5, // Default low stock warning threshold
      price: Number(variant.price || 0),
    }));
  });

  const filteredItems = inventoryItems.filter(
    (item: any) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSKUs = inventoryItems.length;
  const outOfStockCount = inventoryItems.filter((item: any) => item.stock === 0).length;
  const lowStockCount = inventoryItems.filter((item: any) => item.stock > 0 && item.stock <= item.alertThreshold).length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading inventory details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-status-error font-medium">
        Failed to load inventory. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Product Inventory</h2>
          <p className="text-body-md text-on-surface-variant">
            Monitor SKU listings, update available stock counts, and configure alerts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Total SKU Variations</p>
            <h3 className="text-2xl font-bold text-on-surface mt-1">{totalSKUs}</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Out of Stock SKU Warnings</p>
            <h3 className="text-2xl font-bold text-status-error mt-1">{outOfStockCount}</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Low Stock Warning</p>
            <h3 className="text-2xl font-bold text-status-warning mt-1">{lowStockCount}</h3>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <Input
              placeholder="Search SKU or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-surface-container-lowest border-outline-variant"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">SKU Code</th>
                <th className="p-4 font-bold text-on-surface-variant">Product Name</th>
                <th className="p-4 font-bold text-on-surface-variant">Category</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Price</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Stock Count</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Alert Limit</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Status</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredItems.map((item: any) => (
                <tr key={item.sku} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-on-surface text-xs">{item.sku}</td>
                  <td className="p-4 text-on-surface font-semibold max-w-[240px] truncate">{item.name}</td>
                  <td className="p-4 text-on-surface-variant">{item.category}</td>
                  <td className="p-4 text-right text-on-surface font-semibold">{naira(item.price)}</td>
                  <td className="p-4 text-center font-bold text-on-surface">{item.stock}</td>
                  <td className="p-4 text-center text-on-surface-variant">{item.alertThreshold}</td>
                  <td className="p-4 text-center">
                    <Badge
                      className={`border-none ${
                        item.stock === 0
                          ? "bg-status-error/15 text-status-error"
                          : item.stock <= item.alertThreshold
                            ? "bg-status-warning/15 text-status-warning"
                            : "bg-status-success/15 text-status-success"
                      } text-xs px-2.5 py-0.5 rounded font-bold`}
                    >
                      {item.stock === 0 ? "Out of Stock" : item.stock <= item.alertThreshold ? "Low Stock" : "Healthy"}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Button size="sm" variant="outline" className="border-outline-variant hover:bg-surface-container-high h-8 text-xs">
                      Update Stock
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-on-surface-variant">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <ShoppingBag size={32} className="text-on-surface-variant/40" />
                      <p className="font-bold text-on-surface">No SKUs Found</p>
                      <p className="text-xs text-on-surface-variant">Your product listings will appear here.</p>
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

