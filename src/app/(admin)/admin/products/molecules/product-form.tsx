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
import { createProduct, deleteImage } from "@/actions/admin";
import { useListBrands, useListCategories } from "@/queries/admin";
import { toast } from "sonner";
import { useRef, useState } from "react";
import Image from "next/image";
import FileUploadThing from "@/components/file-upload-thing";
import { handleActionError } from "@/lib/handle-error";

type ProductFormProps =
  | {
      mode: "create";
      initialData?: undefined;
    }
  | {
      mode: "edit";
      initialData: UpdateProductData;
    };

export default function ProductForm({
  mode = "create",
  initialData,
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
          condition: "",
          storage: undefined,
          color: "",
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

  //   console.log("Brands:", brands);
  //   console.log("Categories:", categories);

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

  const images = initialData?.images ?? [];

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
            {/* {mode === "edit" && (
              <div className="text-sm text-muted-foreground">
                Editing product:{" "}
                <span className="font-medium">{initialData.title}</span>
              </div>
            )} */}
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

          {/* <section className="space-y-6">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              Product Specs
            </h2>

            {form.watch("specs") &&
              Object.entries(form.watch("specs")).map(([key, value], index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-2 items-center mb-2"
                >
                  <FormField
                    control={form.control}
                    name={`specs.${key}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value for {key}</FormLabel>
                        <FormControl>
                          <Input placeholder="Value" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button
                    type="button"
                    className="text-red-600 hover:underline"
                    onClick={() => {
                      const currentSpecs = { ...form.getValues("specs") };
                      delete currentSpecs[key];
                      form.setValue("specs", currentSpecs);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}

            <div className="flex gap-2">
              <Input
                placeholder="Spec key"
                value={form.watch("newSpecKey") || ""}
                onChange={(e) => form.setValue("newSpecKey", e.target.value)}
              />
              <Input
                placeholder="Spec value"
                value={form.watch("newSpecValue") || ""}
                onChange={(e) => form.setValue("newSpecValue", e.target.value)}
              />
              <button
                type="button"
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={() => {
                  const key = form.getValues("newSpecKey");
                  const value = form.getValues("newSpecValue");
                  if (!key) return;
                  form.setValue("specs", {
                    ...form.getValues("specs"),
                    [key]: value,
                  });
                  form.setValue("newSpecKey", "");
                  form.setValue("newSpecValue", "");
                }}
              >
                Add Spec
              </button>
            </div>
          </section> */}
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
                            {categories?.map(
                              (category: { id: string; name: string }) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
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
                            {brands?.map(
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
                  name={`variants.${index}.condition`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Condition</FormLabel>
                      <Controller
                        control={form.control}
                        name={`variants.${index}.condition`}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              {["new", "used"].map((condition) => (
                                <SelectItem key={condition} value={condition}>
                                  {condition}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
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
                          // value={field.value ?? ""}
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
                  name={`variants.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="Color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`variants.${index}.storage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="128"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  condition: "",
                  storage: undefined,
                  color: "",
                  price: "",
                  compareAtPrice: undefined,
                  stockQty: "",
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
                {images.map((img, i) => (
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
              //   className="px-6 py-2.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
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
