"use client";

import { useState } from "react";
import { Plus, Search, Folder, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: "CAT-1", name: "Laptops & Computers", slug: "laptops", count: 48 },
    { id: "CAT-2", name: "Smartphones & Tablets", slug: "smartphones", count: 72 },
    { id: "CAT-3", name: "Gadgets & Accessories", slug: "accessories", count: 110 },
    { id: "CAT-4", name: "Repairs & Services", slug: "services", count: 24 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Categories Management</h2>
          <p className="text-body-md text-on-surface-variant">
            Create, update, and organize categories for the marketplace product listing tree.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          <Plus size={16} className="mr-1.5" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category List */}
        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b">
                  <th className="p-4 font-bold text-on-surface-variant">Category Name</th>
                  <th className="p-4 font-bold text-on-surface-variant">Slug</th>
                  <th className="p-4 font-bold text-on-surface-variant text-center">Active Products</th>
                  <th className="p-4 font-bold text-on-surface-variant text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-4 font-bold text-on-surface flex items-center gap-2.5">
                      <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                        <Folder size={16} />
                      </span>
                      {cat.name}
                    </td>
                    <td className="p-4 text-on-surface-variant font-mono">/{cat.slug}</td>
                    <td className="p-4 text-center font-semibold text-on-surface">{cat.count} items</td>
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

        {/* Quick Add Card */}
        <Card className="border border-outline-variant/30 shadow-soft h-fit">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Quick Add Category</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface">Category Title</label>
              <Input placeholder="e.g. Smart Watches" className="bg-surface-container-lowest" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface font-mono">URL Slug</label>
              <Input placeholder="smart-watches" className="bg-surface-container-lowest" />
            </div>
            <Button className="w-full bg-primary text-on-primary mt-2">
              Save Category
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
