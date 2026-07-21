"use client";

import { useState } from "react";
import { Plus, Search, Tag, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BrandsPage() {
  const [brands, setBrands] = useState([
    { id: "BRD-1", name: "Apple", slug: "apple", count: 85 },
    { id: "BRD-2", name: "Samsung", slug: "samsung", count: 94 },
    { id: "BRD-3", name: "Dell", slug: "dell", count: 32 },
    { id: "BRD-4", name: "HP", slug: "hp", count: 28 },
    { id: "BRD-5", name: "Xiaomi", slug: "xiaomi", count: 42 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Brands Management</h2>
          <p className="text-body-md text-on-surface-variant">
            Register and curate product brands used by vendors to catalog inventory.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          <Plus size={16} className="mr-1.5" /> Add Brand
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b">
                  <th className="p-4 font-bold text-on-surface-variant">Brand Name</th>
                  <th className="p-4 font-bold text-on-surface-variant">Slug</th>
                  <th className="p-4 font-bold text-on-surface-variant text-center">Active Products</th>
                  <th className="p-4 font-bold text-on-surface-variant text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {brands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-4 font-bold text-on-surface flex items-center gap-2.5">
                      <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                        <Tag size={16} />
                      </span>
                      {brand.name}
                    </td>
                    <td className="p-4 text-on-surface-variant font-mono">/{brand.slug}</td>
                    <td className="p-4 text-center font-semibold text-on-surface">{brand.count} items</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-1.5">
                        <Button size="sm" variant="outline" className="border-outline-variant hover:bg-surface-container-high h-8 w-8 p-0">
                          <Edit2 size={12} />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-status-error hover:bg-status-error/5 h-8 w-8 p-0">
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Quick Add */}
        <Card className="border border-outline-variant/30 shadow-soft h-fit">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Quick Add Brand</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface">Brand Title</label>
              <Input placeholder="e.g. Lenovo" className="bg-surface-container-lowest" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface font-mono">URL Slug</label>
              <Input placeholder="lenovo" className="bg-surface-container-lowest" />
            </div>
            <Button className="w-full bg-primary text-on-primary mt-2">
              Save Brand
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
