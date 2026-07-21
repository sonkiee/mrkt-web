"use client";

import { useState } from "react";
import { Search, Plus, Filter, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VendorInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const items = [
    {
      sku: "IPH13PM-128-BLK",
      name: "iPhone 13 Pro Max (128GB, Space Black)",
      category: "Smartphones",
      stock: 4,
      alertThreshold: 5,
      price: "₦580,000",
    },
    {
      sku: "THINK-L14-256",
      name: "Lenovo ThinkPad L14 (AMD Ryzen 5, 256GB)",
      category: "Laptops",
      stock: 12,
      alertThreshold: 3,
      price: "₦280,000",
    },
    {
      sku: "AP-PODS-PRO2",
      name: "Apple AirPods Pro (2nd Generation)",
      category: "Audio",
      stock: 0,
      alertThreshold: 10,
      price: "₦145,000",
    },
    {
      sku: "SAM-S22U-256",
      name: "Samsung Galaxy S22 Ultra (256GB, Phantom Black)",
      category: "Smartphones",
      stock: 8,
      alertThreshold: 5,
      price: "₦460,000",
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h3 className="text-2xl font-bold text-on-surface mt-1">42</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Out of Stock SKU Warnings</p>
            <h3 className="text-2xl font-bold text-status-error mt-1">3</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Low Stock Warning</p>
            <h3 className="text-2xl font-bold text-status-warning mt-1">5</h3>
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
              {filteredItems.map((item) => (
                <tr key={item.sku} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-on-surface text-xs">{item.sku}</td>
                  <td className="p-4 text-on-surface font-semibold max-w-[240px] truncate">{item.name}</td>
                  <td className="p-4 text-on-surface-variant">{item.category}</td>
                  <td className="p-4 text-right text-on-surface font-semibold">{item.price}</td>
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
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
