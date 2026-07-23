"use client";

import { useState } from "react";
import { Plus, Search, Tag, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useListBrands } from "@/hooks/queries";
import { createBrand } from "@/actions/admin";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Spinner from "@/components/spinner";

export default function BrandsPage() {
  const queryClient = useQueryClient();
  const { data: brandsData, isLoading } = useListBrands();

  const [name, setName] = useState("");

  const brands = brandsData?.data || brandsData || [];

  const { execute: addBrand, isPending } = useAction(createBrand, {
    onSuccess() {
      toast.success("Brand created successfully!");
      setName("");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError({ error }) {
      toast.error(error.serverError || "Failed to create brand.");
    },
  });

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a brand title.");
      return;
    }
    addBrand({ name });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading product brands..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Brands Management</h2>
          <p className="text-body-md text-on-surface-variant">
            Register and curate product brands used by vendors to catalog inventory.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b">
                  <th className="p-4 font-bold text-on-surface-variant">Brand Name</th>
                  <th className="p-4 font-bold text-on-surface-variant">Slug</th>
                  <th className="p-4 font-bold text-on-surface-variant text-center">Brand ID</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {brands.map((brand: any) => (
                  <tr key={brand.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-4 font-bold text-on-surface flex items-center gap-2.5">
                      <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                        <Tag size={16} />
                      </span>
                      {brand.name}
                    </td>
                    <td className="p-4 text-on-surface-variant font-mono">/{brand.slug}</td>
                    <td className="p-4 text-center text-on-surface-variant text-xs font-mono">
                      {brand.id.slice(0, 8).toUpperCase()}
                    </td>
                  </tr>
                ))}

                {brands.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-on-surface-variant">
                      No brands cataloged yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Quick Add */}
        <Card className="border border-outline-variant/30 shadow-soft h-fit">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Quick Add Brand</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSaveBrand} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface">Brand Title</label>
                <Input
                  placeholder="e.g. Lenovo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isPending}
                  className="bg-surface-container-lowest"
                  required
                />
              </div>

              <Button type="submit" disabled={isPending} className="w-full bg-primary text-on-primary mt-2">
                {isPending ? "Saving..." : "Save Brand"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

