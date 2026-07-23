"use client";

import { useState } from "react";
import { Plus, Folder, Edit2, Tag, X, ChevronRight, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useListCategories } from "@/hooks/queries";
import { createCategoryAction, updateCategoryAction } from "@/actions/admin";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Spinner from "@/components/spinner";

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const { data: categoriesData, isLoading } = useListCategories();

  // Selected category state for managing attributes
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Quick Add state
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newParentId, setNewParentId] = useState<string | null>(null);

  // Attribute editing states
  const [newVariantOpt, setNewVariantOpt] = useState("");
  const [newSpecField, setNewSpecField] = useState("");

  const categories = categoriesData?.data ?? categoriesData ?? [];

  // Actions
  const { execute: createCategory, isPending: isCreating } = useAction(createCategoryAction, {
    onSuccess: () => {
      toast.success("Category created successfully!");
      setNewName("");
      setNewDescription("");
      setNewParentId(null);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(err.error?.serverError ?? "Failed to create category");
    },
  });

  const { execute: updateCategory, isPending: isUpdating } = useAction(updateCategoryAction, {
    onSuccess: () => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => {
      toast.error(err.error?.serverError ?? "Failed to update category");
    },
  });

  const handleSaveCategory = () => {
    if (!newName.trim()) return;
    createCategory({
      name: newName,
      description: newDescription || undefined,
      parentId: newParentId || undefined,
      allowedAttributes: {
        variantOptions: [],
        specFields: [],
      },
    });
  };

  const selectedCategory = categories.find((c: any) => c.id === selectedCategoryId);

  const handleAddAttribute = (type: "variantOptions" | "specFields", value: string) => {
    if (!selectedCategory || !value.trim()) return;

    const val = value.trim().toLowerCase();
    const current = selectedCategory.allowedAttributes?.[type] || [];
    if (current.includes(val)) {
      toast.warning(`Attribute "${val}" already exists`);
      return;
    }

    const updatedAttributes = {
      ...selectedCategory.allowedAttributes,
      [type]: [...current, val],
    };

    updateCategory({
      id: selectedCategory.id,
      name: selectedCategory.name,
      description: selectedCategory.description ?? undefined,
      parentId: selectedCategory.parentId ?? undefined,
      allowedAttributes: updatedAttributes,
    });

    if (type === "variantOptions") setNewVariantOpt("");
    else setNewSpecField("");
  };

  const handleRemoveAttribute = (type: "variantOptions" | "specFields", value: string) => {
    if (!selectedCategory) return;

    const current = selectedCategory.allowedAttributes?.[type] || [];
    const updatedAttributes = {
      ...selectedCategory.allowedAttributes,
      [type]: current.filter((v: string) => v !== value),
    };

    updateCategory({
      id: selectedCategory.id,
      name: selectedCategory.name,
      description: selectedCategory.description ?? undefined,
      parentId: selectedCategory.parentId ?? undefined,
      allowedAttributes: updatedAttributes,
    });
  };

  if (isLoading) {
    return <Spinner infoText="Loading categories taxonomy..." />;
  }

  // Filter top-level categories
  const mainCategories = categories.filter((c: any) => !c.parentId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Categories & Attributes</h2>
          <p className="text-body-md text-on-surface-variant">
            Organize products and configure allowed attributes/specifications for each category.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category List & Tree */}
        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-headline-md font-bold text-on-surface">Taxonomy tree</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {mainCategories.map((main: any) => {
                const subs = categories.filter((c: any) => c.parentId === main.id);

                return (
                  <div key={main.id} className="p-4 space-y-3">
                    <div className="flex justify-between items-center bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/10">
                      <div className="flex items-center gap-2 font-bold text-on-surface">
                        <span className="p-1.5 bg-primary/10 text-primary rounded-md">
                          <Folder size={16} />
                        </span>
                        {main.name}
                      </div>
                      <Button
                        size="sm"
                        variant={selectedCategoryId === main.id ? "default" : "outline"}
                        className="h-8 text-xs gap-1"
                        onClick={() => setSelectedCategoryId(main.id)}
                      >
                        <Settings size={12} />
                        Manage Attributes
                      </Button>
                    </div>

                    {/* Subcategories */}
                    <div className="pl-6 space-y-2">
                      {subs.map((sub: any) => (
                        <div
                          key={sub.id}
                          className="flex justify-between items-center p-2 hover:bg-surface-container-low/40 rounded-md transition-colors text-sm text-on-surface-variant"
                        >
                          <div className="flex items-center gap-1.5 font-medium">
                            <ChevronRight size={14} className="text-outline-variant" />
                            {sub.name}
                          </div>
                          <Button
                            size="sm"
                            variant={selectedCategoryId === sub.id ? "default" : "outline"}
                            className="h-7 text-xs px-2 gap-1 border-outline-variant/30"
                            onClick={() => setSelectedCategoryId(sub.id)}
                          >
                            <Tag size={10} />
                            Attributes ({sub.allowedAttributes?.variantOptions?.length || 0})
                          </Button>
                        </div>
                      ))}

                      {subs.length === 0 && (
                        <p className="text-xs text-outline-variant/80 pl-6 italic">No subcategories defined.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Detail Card or Quick Add Card */}
        <div className="space-y-6">
          {/* Attributes Management Card */}
          {selectedCategory ? (
            <Card className="border border-outline-variant shadow-soft border-l-4 border-l-primary bg-white">
              <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-headline-md font-bold text-on-surface capitalize">
                    {selectedCategory.name}
                  </CardTitle>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {selectedCategory.parentId ? "Subcategory" : "Main Category"}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-on-surface-variant"
                  onClick={() => setSelectedCategoryId(null)}
                >
                  <X size={16} />
                </Button>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* 1. Variant Attributes */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                      Variant Options
                    </label>
                    <span className="text-[10px] text-primary bg-primary/5 px-2 py-0.5 rounded font-medium">
                      Creates variations
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-surface-container-lowest border rounded-lg min-h-[50px] items-center">
                    {(selectedCategory.allowedAttributes?.variantOptions || []).map((opt: string) => (
                      <span
                        key={opt}
                        className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded"
                      >
                        {opt}
                        <button
                          type="button"
                          className="hover:text-status-error text-primary/60"
                          onClick={() => handleRemoveAttribute("variantOptions", opt)}
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                    {(selectedCategory.allowedAttributes?.variantOptions || []).length === 0 && (
                      <span className="text-xs text-outline-variant pl-1">No variant options configured.</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g. size, color, weight"
                      value={newVariantOpt}
                      onChange={(e) => setNewVariantOpt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddAttribute("variantOptions", newVariantOpt);
                      }}
                      className="bg-surface-container-lowest h-9 text-xs"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAddAttribute("variantOptions", newVariantOpt)}
                      disabled={isUpdating}
                      className="h-9 px-3 text-xs"
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* 2. Specification Fields */}
                <div className="space-y-3 pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                      Specification Fields
                    </label>
                    <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded font-medium">
                      Additional specs
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-surface-container-lowest border rounded-lg min-h-[50px] items-center">
                    {(selectedCategory.allowedAttributes?.specFields || []).map((spec: string) => (
                      <span
                        key={spec}
                        className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded"
                      >
                        {spec}
                        <button
                          type="button"
                          className="hover:text-status-error text-purple-500"
                          onClick={() => handleRemoveAttribute("specFields", spec)}
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                    {(selectedCategory.allowedAttributes?.specFields || []).length === 0 && (
                      <span className="text-xs text-outline-variant pl-1">No specs configured.</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g. battery, wattage, speed"
                      value={newSpecField}
                      onChange={(e) => setNewSpecField(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddAttribute("specFields", newSpecField);
                      }}
                      className="bg-surface-container-lowest h-9 text-xs"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAddAttribute("specFields", newSpecField)}
                      disabled={isUpdating}
                      className="h-9 px-3 text-xs"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-outline-variant/30 shadow-soft bg-surface-container-lowest p-5 text-center flex flex-col items-center justify-center gap-3 min-h-[220px]">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Info size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface">Manage Category Attributes</h4>
                <p className="text-xs text-on-surface-variant max-w-[200px] mx-auto mt-1 leading-relaxed">
                  Select a category from the tree on the left to configure variant options and specification inputs.
                </p>
              </div>
            </Card>
          )}

          {/* Quick Add Card */}
          <Card className="border border-outline-variant/30 shadow-soft h-fit">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-headline-md font-bold text-on-surface">Add Category / Subcategory</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface">Name</label>
                <Input
                  placeholder="e.g. Smartwatches"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-surface-container-lowest"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface">Parent Category (Optional)</label>
                <select
                  value={newParentId || ""}
                  onChange={(e) => setNewParentId(e.target.value || null)}
                  className="w-full rounded-md border border-input bg-surface-container-lowest px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">-- None (Top Level Main Category) --</option>
                  {mainCategories.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface">Description (Optional)</label>
                <Input
                  placeholder="Short description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="bg-surface-container-lowest"
                />
              </div>
              <Button
                className="w-full bg-primary text-on-primary mt-2"
                onClick={handleSaveCategory}
                disabled={isCreating}
              >
                {isCreating ? "Saving..." : "Save Category"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
