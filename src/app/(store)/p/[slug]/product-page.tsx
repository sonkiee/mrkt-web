"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, Fragment } from "react";
import {
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  AlertCircle,
  Sparkles,
  Heart,
  Share2,
  BadgeCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";

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

import { useFetchProductById } from "@/hooks/queries";
import { ProductVariantSelector } from "../../_components/product-varient-selctor";
import Spinner from "@/components/spinner";
import { naira } from "@/utils/naira";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;

  const { data, error, isLoading } = useFetchProductById(slug as string);
  const product = data?.data ?? null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Loading State
  if (isLoading) {
    return <Spinner infoText="Loading product details..." />;
  }

  // Empty State
  if (!product) {
    return <EmptyState />;
  }

  // Error State
  if (error) {
    return (
      <ErrorState
        title="Error Fetching Product"
        message="We encountered an unexpected error while fetching the product details. Please try again later."
      />
    );
  }

  const images = product.images ?? [];
  const activeImage =
    images[selectedImageIndex]?.url || images[0]?.url || "/placeholder.svg";

  const discount = product.discount ?? 0;
  const minPrice = product.minPrice ?? 0;
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(minPrice * (1 - discount / 100))
    : minPrice;

  return (
    <div className="min-h-screen bg-surface-background flex flex-col">
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-6 py-6 w-full space-y-6">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs text-on-surface-variant/80 border-b pb-3 flex-wrap">
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
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* LEFT COLUMN: Large Image Gallery & Buyer Protection (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Large Stage Main Image */}
            <div className="relative aspect-square w-full rounded-2xl border border-outline-variant/30 bg-white overflow-hidden shadow-soft flex items-center justify-center p-4">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                className="object-contain p-4 transition-all duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
              />
              {hasDiscount && (
                <Badge className="absolute top-3 left-3 bg-flash-sale-red text-white text-xs font-extrabold px-2.5 py-1 rounded shadow-sm">
                  -{discount}% OFF
                </Badge>
              )}
            </div>

            {/* Clickable Image Thumbnails Bar */}
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
                {images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl border-2 overflow-hidden bg-white shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? "border-primary ring-2 ring-primary/20 scale-95"
                        : "border-outline-variant/30 hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={img.url || "/placeholder.svg"}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* AliExpress-Style Buyer Protection Box */}
            <div className="p-4 rounded-xl bg-surface-container-low/40 border border-outline-variant/30 space-y-3 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2 font-extrabold text-on-surface text-sm">
                <ShieldCheck className="text-primary h-5 w-5" />
                <span>AliExpress Buyer Protection</span>
              </div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-status-success h-4 w-4 shrink-0" />
                  <span>
                    <strong>Full Refund</strong> if product is not as described
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="text-primary h-4 w-4 shrink-0" />
                  <span>
                    <strong>100% Genuine</strong> verified product guarantee
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="text-status-warning h-4 w-4 shrink-0" />
                  <span>
                    <strong>Fast Dispatch</strong> within 24 hours
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: Purchasing, Price Banner & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-5 bg-white p-5 sm:p-7 rounded-2xl border border-outline-variant/30 shadow-soft">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {product.category?.name}
                </span>
                <div className="flex items-center gap-2 text-on-surface-variant/70">
                  <button className="p-1.5 hover:text-primary rounded-full hover:bg-surface-container-low transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="p-1.5 hover:text-primary rounded-full hover:bg-surface-container-low transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface mt-2.5 leading-tight">
                {product?.title}
              </h1>

              <div className="mt-3 flex items-center gap-3.5 flex-wrap text-xs">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-status-warning text-status-warning"
                    />
                  ))}
                  <span className="ml-1.5 font-extrabold text-on-surface">
                    4.8
                  </span>
                  <span className="ml-1 text-on-surface-variant/70">
                    (1,420 Sold)
                  </span>
                </div>

                <span className="text-on-surface-variant/40">|</span>

                <Badge
                  className={`border-none ${
                    product.inStock
                      ? "bg-status-success/15 text-status-success"
                      : "bg-status-error/15 text-status-error"
                  } text-xs font-bold px-2.5 py-0.5`}
                >
                  {product.inStock
                    ? "In Stock (Ready to Ship)"
                    : "Out of Stock"}
                </Badge>
              </div>
            </div>

            {/* AliExpress Highlighted Price Banner */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-surface-container-low/70 to-surface-container-low/20 border border-primary/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-on-surface-variant/70 block">
                  Promotional Deal Price
                </span>
                <div className="flex items-baseline gap-2.5 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-primary">
                    {naira(discountedPrice)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs sm:text-sm text-on-surface-variant/50 line-through font-medium">
                      {naira(minPrice)}
                    </span>
                  )}
                </div>
              </div>
              {hasDiscount && (
                <div className="text-right">
                  <span className="inline-block bg-flash-sale-red text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow-xs">
                    Save {naira(minPrice - discountedPrice)} ({discount}%)
                  </span>
                </div>
              )}
            </div>

            {/* Vendor Affiliation */}
            <div className="text-xs text-on-surface-variant flex items-center justify-between bg-surface-container-low/30 p-3 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Verified Storefront:</span>
                <span className="text-primary font-extrabold flex items-center gap-1">
                  {product.brand?.name}
                  <ShieldCheck size={16} className="text-primary" />
                </span>
              </div>
              <span className="text-[11px] text-status-success font-bold bg-status-success/10 px-2 py-0.5 rounded">
                98.4% Positive Feedback
              </span>
            </div>

            {/* Variant Selector */}
            <ProductVariantSelector product={product} />

            <Separator className="bg-outline-variant/20" />

            {/* Courier & Delivery Location */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                  <Truck size={15} className="text-primary" /> Estimated
                  Delivery
                </span>
                <span className="text-on-surface-variant text-[11px]">
                  Ships to Kaduna
                </span>
              </div>
              <Select defaultValue="standard">
                <SelectTrigger className="w-full bg-surface-container-lowest border-outline-variant/60 h-10 text-xs">
                  <SelectValue placeholder="Select delivery option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">
                    Standard Express (2-3 days) - ₦1,500
                  </SelectItem>
                  <SelectItem value="express">
                    Same-Day Instant Delivery - ₦3,500
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Specifications & Reviews Tab container */}
        <div className="bg-white p-5 sm:p-7 rounded-2xl border border-outline-variant/30 shadow-soft overflow-hidden">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-fit p-0 gap-4 sm:gap-6 overflow-x-auto max-w-full scrollbar-none flex-nowrap shrink-0">
              <TabsTrigger
                value="specifications"
                className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-0 py-2.5 text-sm font-bold bg-transparent shadow-none"
              >
                Attributes
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-0 py-2.5 text-sm font-bold bg-transparent shadow-none"
              >
                Customer Reviews (1,420)
              </TabsTrigger>
              <TabsTrigger
                value="description"
                className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-0 py-2.5 text-sm font-bold bg-transparent shadow-none"
              >
                Store Details
              </TabsTrigger>
            </TabsList>

            {/* Tab: Specifications */}
            <TabsContent value="specifications" className="mt-6">
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                  Product Attributes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm max-w-4xl border border-outline-variant/30 p-5 sm:p-6 rounded-2xl bg-surface-container-low/10">
                  <div className="grid grid-cols-2 gap-y-3.5 text-xs sm:text-sm">
                    <span className="text-on-surface-variant font-medium">Brand</span>
                    <span className="font-bold text-on-surface">{product.brand?.name || "Generic"}</span>

                    <span className="text-on-surface-variant font-medium">Category</span>
                    <span className="font-bold text-on-surface capitalize">{product.category?.name}</span>

                    <span className="text-on-surface-variant font-medium">Model / Type</span>
                    <span className="font-bold text-on-surface">{product.model || "Standard"}</span>

                    <span className="text-on-surface-variant font-medium">Origin</span>
                    <span className="font-bold text-on-surface">{product.origin || "Imported"}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3.5 text-xs sm:text-sm border-t md:border-t-0 md:border-l md:pl-8 border-outline-variant/20 pt-4 md:pt-0">
                    {/* Variant-specific attributes */}
                    {product.variants?.[0]?.attributes &&
                      Object.entries(product.variants[0].attributes).map(([key, val]) => (
                        <Fragment key={key}>
                          <span className="text-on-surface-variant font-medium capitalize">{key}</span>
                          <span className="font-bold text-on-surface capitalize">{val as string}</span>
                        </Fragment>
                      ))}
                  </div>
                </div>

                {/* Key Highlights / Features */}
                {product.keyFeatures && Array.isArray(product.keyFeatures) && product.keyFeatures.length > 0 && (
                  <div className="max-w-4xl border border-outline-variant/30 p-5 rounded-2xl bg-surface-container-low/10 space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-primary">
                      Key Highlights &amp; Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm pl-4 list-disc text-on-surface-variant/90">
                      {product.keyFeatures.map((feature: string, idx: number) => (
                        <li key={idx} className="capitalize">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Tab: Store Bio / Description */}
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-4">
                <p>
                  {product.description ??
                    "No description available for this product."}
                </p>
                <div className="bg-surface-container-low/40 p-4 rounded-xl border border-dashed border-primary/30 text-primary font-medium flex items-center gap-3">
                  <ShieldCheck size={20} className="shrink-0" />
                  <span>
                    Certified Authenticity: This device is backed by our
                    verified store warranty program and official brand coverage.
                  </span>
                </div>
              </div>
            </TabsContent>

            {/* Tab: Reviews */}
            <TabsContent value="reviews" className="mt-6 space-y-6">
              {/* Star Rating Breakdown */}
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-surface-container-low/20 p-5 rounded-xl border border-outline-variant/30">
                <div>
                  <h3 className="text-base font-bold text-on-surface">
                    Storefront Ratings
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4.5 w-4.5 fill-status-warning text-status-warning"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-on-surface">
                      4.8 / 5.0
                    </span>
                    <span className="text-xs text-on-surface-variant/80">
                      (1,420 verified sales)
                    </span>
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
                      <span className="w-8 text-on-surface-variant font-medium">
                        {row.stars} Star
                      </span>
                      <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                        <div
                          className="h-full bg-status-warning"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-on-surface-variant font-bold">
                        {row.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mockup Reviews List */}
              <div className="space-y-4 divide-y">
                {[
                  {
                    name: "Aminu I. (Verified Buyer)",
                    comment:
                      "Super fast shipping! The device came sealed in the original factory box, Sierra Blue color, 100% battery health. Very professional vendor storefront.",
                    rating: 5,
                    date: "July 2, 2026",
                  },
                  {
                    name: "Faith J. (Verified Buyer)",
                    comment:
                      "Audio clarity is brilliant. Active noise cancellation blocks noise from my generator perfectly. Highly recommended.",
                    rating: 5,
                    date: "June 28, 2026",
                  },
                ].map((r, idx) => (
                  <div key={idx} className="pt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface">
                        {r.name}
                      </span>
                      <span className="text-on-surface-variant">{r.date}</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < r.rating
                              ? "fill-status-warning text-status-warning"
                              : "text-outline-variant"
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
