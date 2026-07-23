"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  createProductSchema,
  CreateProductData,
  UpdateProductData,
} from "@/schema";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { createProduct, deleteImage, createVendorBrand, createBrand } from "@/actions/admin";
import { useListBrands, useListCategories } from "@/hooks/queries";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Image from "next/image";
import FileUploadThing from "@/components/file-upload-thing";
import { handleActionError } from "@/lib/handle-error";

type ProductFormProps =
  | {
      mode?: "create";
      initialData?: undefined;
      role: "admin" | "vendor";
    }
  | {
      mode: "edit";
      initialData: UpdateProductData;
      role: "admin" | "vendor";
    };

export default function ProductForm({
  mode = "create",
  initialData,
  role,
}: ProductFormProps) {
  const form = useForm<CreateProductData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: initialData ?? {
      title: "",
      slug: "",
      description: "",
      categoryId: "",
      brandId: "",
      model: "",
      series: "",
      specs: {},
      isActive: true,
      isFeatured: false,
      isBestSeller: false,
      isNewArrival: false,
      files: [],
      variants: [
        {
          sku: "",
          attributes: {},
          price: 0,
          compareAtPrice: undefined,
          stockQty: 0,
          isActive: true,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const { execute: create } = useAction(createProduct, {
    onSuccess: (response) => {
      console.log("Product created successfully:", response);
      toast.success("Product created successfully!");
    },
    onError: (error) => {
      handleActionError(error, "Create Product");
    },
  });

  const { execute: deleteImageAction } = useAction(deleteImage, {
    onSuccess: (response) => {
      console.log("Image deleted successfully:", response);
      toast.success("Image deleted successfully!");
    },
    onError: (error) => {
      handleActionError(error, "Delete Image");
    },
  });

  const { data: brands } = useListBrands();
  const { data: categories } = useListCategories();

  const selectedCategoryId = form.watch("categoryId");
  const categoriesList = categories?.data ?? categories ?? [];
  const brandsList = brands?.data ?? brands ?? [];
  const selectedCategory = categoriesList.find((c: any) => c.id === selectedCategoryId);
  const variantOptions = selectedCategory?.allowedAttributes?.variantOptions || ["color", "storage"];

  const queryClient = useQueryClient();
  const { execute: createBrandAction } = useAction(
    role === "admin" ? createBrand : createVendorBrand,
    {
      onSuccess: (res) => {
        const brand = res?.data?.data ?? res?.data;
        if (brand?.id) {
          form.setValue("brandId", brand.id);
          toast.success(
            role === "admin"
              ? `Brand "${brand.name}" created successfully!`
              : `Brand "${brand.name}" submitted for approval successfully!`
          );
        } else {
          toast.success(
            role === "admin"
              ? "Brand created successfully!"
              : "Brand submitted for approval successfully!"
          );
        }
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      },
      onError: (error) => {
        handleActionError(error, "Create Brand");
      },
    }
  );

  const handleCreateBrand = (name: string) => {
    createBrandAction({ name });
  };

  const handleFormSubmit = (data: CreateProductData) => {
    console.log("Product submitted:", data);

    if (mode === "edit") {
      // updateProduct({ id: initialData.id, ...data });
      console.log("Update product with data:", {
        id: initialData?.id,
        ...data,
      });
    } else {
      create({ ...data });
    }
  };

  const images = (initialData as any)?.images ?? [];

  console.log("Initial form data:", initialData);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-10"
        >
          {/* General Information */}
          <section className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">
              {mode === "create" ? "Create New Product" : "Editing Product"}
            </h1>
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              General Information
            </h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SLUG ONLY IN EDIT MODE */}
            {mode === "edit" && (
              <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                Slug:{" "}
                <span className="font-medium text-slate-700">
                  {initialData?.slug}
                </span>
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the product..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* Inventory & Pricing */}
          <section className="space-y-6">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              Inventory & Pricing
            </h2>

            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category</FormLabel>
                    <Controller
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoriesList.map((category: any) => {
                              const parent = category.parentId
                                ? categoriesList.find((c: any) => c.id === category.parentId)
                                : null;
                              const displayName = parent
                                ? `${parent.name} > ${category.name}`
                                : category.name;

                              return (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {displayName}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex-1 flex gap-2 items-end">
                <FormField
                  control={form.control}
                  name="brandId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Brand</FormLabel>
                      <Controller
                        control={form.control}
                        name="brandId"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Brand" />
                            </SelectTrigger>
                            <SelectContent>
                              {brandsList?.map(
                                (brand: { id: string; name: string }) => (
                                  <SelectItem key={brand.id} value={brand.id}>
                                    {brand.name}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="h-9 shrink-0"
                  onClick={() => {
                    const name = window.prompt("Enter new brand name:");
                    if (name && name.trim()) {
                      handleCreateBrand(name.trim());
                    }
                  }}
                >
                  + Add
                </Button>
              </div>

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Model name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
          
          {/* Variants */}
          <section className="space-y-6">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              Product Variants
            </h2>

            {fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-3 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name={`variants.${index}.sku`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        SKU{" "}
                        {mode === "edit" && (
                          <span className="text-xs text-muted-foreground ml-2">
                            (system generated)
                          </span>
                        )}
                      </FormLabel>

                      <FormControl>
                        {mode === "edit" ? (
                          <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                            {field.value}
                          </div>
                        ) : (
                          <Input
                            placeholder="Auto generated on save"
                            disabled
                          />
                        )}
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={(field.value as any) ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.stockQty`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Qty</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          value={(field.value as any) ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {variantOptions.map((opt: string) => (
                  <FormField
                    key={opt}
                    control={form.control}
                    name={`variants.${index}.attributes.${opt}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">{opt}</FormLabel>
                        <FormControl>
                          <Input placeholder={opt} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <div className="flex items-end gap-2">
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:underline"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              className="text-green-600 hover:underline"
              variant={"secondary"}
              onClick={() =>
                append({
                  sku: "",
                  attributes: {},
                  price: 0,
                  compareAtPrice: undefined,
                  stockQty: 0,
                  isActive: true,
                })
              }
            >
              Add Variant
            </Button>
          </section>

          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
                Product Media
              </h2>
            </div>

            {mode === "edit" && images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {images.map((img: any, i: number) => (
                  <div key={i} className="relative group">
                    <Image
                      src={img.url}
                      alt="product image"
                      width={120}
                      height={120}
                      className="rounded-md object-cover aspect-square"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        deleteImageAction({
                          imageId: img.id,
                          productId: initialData!.id,
                        })
                      }
                      className="absolute top-1 hidden group-hover:block bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Files</FormLabel>
                  <FormControl>
                    <FileUploadThing
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* Actions */}
          <footer className="pt-8 flex items-center justify-end gap-4 border-t border-slate-200">
            <Button
              type="button"
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button type="submit" variant={"default"}>
              Save Product
            </Button>
          </footer>
        </form>
      </Form>
    </main>
  );
}
