"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { ChevronRight, Star, ArrowLeft, ShieldCheck, Truck, RotateCcw, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFetchProductById } from "@/queries/product";
import { ProductVariantSelector } from "../../molecules/product-varient-selctor";
import Spinner from "@/components/spinner";

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;

  const { data, error, isLoading } = useFetchProductById(slug as string);
  const product = data?.data ?? null;


  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-background">
        <div className="space-y-3 text-center">
          <Spinner />
          <p className="text-xs text-on-surface-variant font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 bg-surface-background">
        <div className="max-w-sm space-y-4 text-center bg-white p-6 rounded-xl border border-outline-variant/30 shadow-soft">
          <AlertCircle className="mx-auto text-status-error" size={40} />
          <h2 className="text-headline-md font-bold text-on-surface">Product Not Found</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            The product catalog item might have been unlisted or removed by the vendor storefront.
          </p>
          <Button asChild className="bg-primary text-on-primary">
            <Link href="/">Back to Marketplace</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 bg-surface-background">
        <div className="max-w-sm space-y-4 text-center bg-white p-6 rounded-xl border border-outline-variant/30 shadow-soft">
          <AlertCircle className="mx-auto text-status-error" size={40} />
          <h2 className="text-headline-md font-bold text-on-surface">Connection Error</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            We encountered a problem fetching this device's specs. Please check your network connection.
          </p>
          <Button asChild className="bg-primary text-on-primary">
            <Link href="/">Try Again</Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images ?? [];

  return (
    <div className="min-h-screen bg-surface-background flex flex-col">
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-6 py-6 w-full space-y-6">
        
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs text-on-surface-variant/80 border-b pb-3">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-on-surface-variant/40" />
          <Link
            href={`/products?category=${product.category?.name}`}
            className="hover:text-primary transition-colors capitalize"
          >
            {product.category?.name ?? "Category"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-on-surface-variant/40" />
          <span className="font-bold text-on-surface truncate max-w-[200px]">
            {product.title}
          </span>
        </div>

        {/* Product Showcase columns */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          
          {/* Horizontally Scrollable Compact Image Gallery */}
          <div className="lg:col-span-4 w-full">
            <div className="relative rounded-xl border border-outline-variant/20 bg-white overflow-hidden shadow-soft h-72">
              <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth h-full w-full scrollbar-none scroll-hide">
                {images.map((img: any, i: number) => (
                  <div
                    key={i}
                    className="w-full h-full flex-shrink-0 snap-center relative flex items-center justify-center p-4 bg-white"
                  >
                    <Image
                      src={img.url || "/placeholder.svg"}
                      alt={`${product?.title} image ${i + 1}`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                  </div>
                ))}
                {images.length === 0 && (
                  <div className="w-full h-full flex items-center justify-center bg-white relative">
                    <Image
                      src="/placeholder.svg"
                      alt="Placeholder"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                )}
              </div>

              {/* Indicator Dot overlay */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full z-10">
                  {images.map((_: any, i: number) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/60"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Purchasing Control Panel */}
          <div className="lg:col-span-8 space-y-5 bg-white p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-soft">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                {product.category?.name}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface mt-2 leading-tight">
                {product?.title}
              </h1>

              <div className="mt-2.5 flex items-center gap-3.5 flex-wrap">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4.5 w-4.5 fill-status-warning text-status-warning"
                    />
                  ))}
                  <span className="ml-1.5 text-xs font-bold text-on-surface">4.8</span>
                  <span className="ml-1 text-xs text-on-surface-variant/70">
                    (48 reviews)
                  </span>
                </div>

                <Badge
                  className={`border-none ${
                    product.inStock
                      ? "bg-status-success/15 text-status-success"
                      : "bg-status-error/15 text-status-error"
                  } text-xs font-bold px-2 py-0.5`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </div>

            {/* Vendor Affiliation */}
            <div className="text-xs text-on-surface-variant flex items-center gap-1.5 bg-surface-container-low/40 p-2.5 rounded-lg border">
              <span className="font-semibold">Store Vendor:</span>
              <span className="text-primary font-extrabold flex items-center gap-1">
                {product.brand?.name}
                <ShieldCheck size={14} className="text-primary" />
              </span>
            </div>

            <ProductVariantSelector product={product} />

            <Separator className="bg-outline-variant/20" />

            {/* Courier Settings */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">Estimated Delivery</h3>
              <Select defaultValue="standard">
                <SelectTrigger className="w-full bg-surface-container-lowest border-outline-variant/60">
                  <SelectValue placeholder="Select delivery option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">
                    Standard Shipping (2-3 days) - ₦1,500
                  </SelectItem>
                  <SelectItem value="express">
                    Express Shipping (1 day) - ₦3,500
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Specifications & Reviews Tab container */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-outline-variant/30 shadow-soft">
          <Tabs defaultValue="specifications">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-fit p-0 gap-6">
              <TabsTrigger
                value="specifications"
                className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-0 py-2.5 text-sm font-bold bg-transparent shadow-none"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-0 py-2.5 text-sm font-bold bg-transparent shadow-none"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="description"
                className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-0 py-2.5 text-sm font-bold bg-transparent shadow-none"
              >
                Store Bio
              </TabsTrigger>
            </TabsList>

            {/* Tab: Specifications */}
            <TabsContent value="specifications" className="mt-5">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Device Spec Sheet</h3>
                <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs sm:text-sm max-w-lg border p-4 rounded-xl bg-surface-container-low/10">
                  <dt className="text-on-surface-variant font-medium">Brand Manufacturer</dt>
                  <dd className="font-bold text-on-surface">{product.brand?.name}</dd>

                  <dt className="text-on-surface-variant font-medium">Platform Category</dt>
                  <dd className="font-bold text-on-surface">{product.category?.name}</dd>

                  <dt className="text-on-surface-variant font-medium">Primary Condition</dt>
                  <dd className="font-bold text-on-surface capitalize">{product.variants?.[0]?.condition?.replace("_", " ") ?? "New"}</dd>

                  {product.variants?.[0]?.storage && (
                    <>
                      <dt className="text-on-surface-variant font-medium">Internal Storage Capacity</dt>
                      <dd className="font-bold text-on-surface font-mono">{product.variants?.[0]?.storage} GB</dd>
                    </>
                  )}
                </dl>
              </div>
            </TabsContent>

            {/* Tab: Store Bio / Description */}
            <TabsContent value="description" className="mt-5">
              <div className="prose max-w-none text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-3">
                <p>{product.description ?? "No description available for this product."}</p>
                <p className="bg-surface-container-low/40 p-3 rounded-lg border border-dashed text-primary font-medium flex items-center gap-2">
                  <ShieldCheck size={16} /> Certified Authenticity: This device is backed by our verified store warranty program.
                </p>
              </div>
            </TabsContent>

            {/* Tab: Reviews */}
            <TabsContent value="reviews" className="mt-5 space-y-6">
              {/* Star Rating Breakdown */}
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-surface-container-low/20 p-5 rounded-xl border">
                <div>
                  <h3 className="text-base font-bold text-on-surface">Storefront Ratings</h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4.5 w-4.5 fill-status-warning text-status-warning"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-on-surface">4.8 / 5.0</span>
                    <span className="text-xs text-on-surface-variant/80">(48 verified sales)</span>
                  </div>
                </div>

                <div className="w-full md:max-w-xs space-y-1 text-xs">
                  {[
                    { stars: 5, pct: 85 },
                    { stars: 4, pct: 10 },
                    { stars: 3, pct: 3 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 1 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2">
                      <span className="w-8 text-on-surface-variant font-medium">{row.stars} Star</span>
                      <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-status-warning" style={{ width: `${row.pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-on-surface-variant font-bold">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mockup Reviews List */}
              <div className="space-y-4 divide-y">
                {[
                  {
                    name: "Aminu I. (Verified Buyer)",
                    comment: "Super fast shipping Kaduna-wide! The device came sealed in the original factory box, Sierra Blue color, 100% battery health. Very professional vendor storefront.",
                    rating: 5,
                    date: "July 2, 2026",
                  },
                  {
                    name: "Faith J. (Verified Buyer)",
                    comment: "Audio clarity is brilliant. Active noise cancellation blocks noise from my generator perfectly. Highly recommended.",
                    rating: 5,
                    date: "June 28, 2026",
                  },
                ].map((r, idx) => (
                  <div key={idx} className="pt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface">{r.name}</span>
                      <span className="text-on-surface-variant">{r.date}</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < r.rating ? "fill-status-warning text-status-warning" : "text-outline-variant"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      "{r.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

      </main>
    </div>
  );
}
