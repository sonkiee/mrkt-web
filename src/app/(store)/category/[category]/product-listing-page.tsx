"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import ProductCard from "@/components/product-card";
import Breadcrumb from "@/components/breadcrumb";

import { useListProducts, useFetchCategory } from "@/hooks/queries";

import type { Product, ProductFilter } from "@/types";

type SortKey = "featured" | "price-low" | "price-high" | "newest" | "rating";

// ─── Sidebar filter state ────────────────────────────────────────────────────
const PRICE_RANGES = [
  { label: "Under ₦50,000", min: 0, max: 50_000 },
  { label: "₦50,000 – ₦200,000", min: 50_000, max: 200_000 },
  { label: "₦200,000 – ₦500,000", min: 200_000, max: 500_000 },
  { label: "Over ₦500,000", min: 500_000, max: Infinity },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProductListingPage() {
  const params = useParams();
  const category =
    typeof params?.category === "string" ? params.category : undefined;

  const [filter, setFilter] = useState<ProductFilter>({
    storage: undefined,
    category,
  });

  const [sort, setSort] = useState<SortKey>("featured");
  const [search, setSearch] = useState("");
  const [selectedPriceIdx, setSelectedPriceIdx] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: p = [], isLoading, error } = useListProducts(filter);
  const { data: categoriesData } = useFetchCategory();

  // Normalise API response
  const apiProducts = Array.isArray(p)
    ? (p as Product[])
    : Array.isArray((p as any)?.data)
      ? ((p as any).data as Product[])
      : [];
  const products: Product[] = apiProducts.length ? apiProducts : [];

  // Derive unique brands from products
  const brands = useMemo(
    () => Array.from(new Set(products.map((pr) => pr.brand?.name).filter(Boolean))),
    [products],
  );

  // Derive unique categories
  const categories: { id: string; name: string }[] = useMemo(() => {
    if (Array.isArray((categoriesData as any)?.data)) return (categoriesData as any).data;
    if (Array.isArray(categoriesData)) return categoriesData;
    return [];
  }, [categoriesData]);

  // Client-side filtering + sorting
  const filteredProducts = useMemo(() => {
    let arr = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(
        (pr) =>
          pr.title?.toLowerCase().includes(q) ||
          pr.brand?.name?.toLowerCase().includes(q),
      );
    }

    // Brand
    if (selectedBrand) {
      arr = arr.filter((pr) => pr.brand?.name === selectedBrand);
    }



    // Price range
    if (selectedPriceIdx !== null) {
      const range = PRICE_RANGES[selectedPriceIdx];
      arr = arr.filter(
        (pr) =>
          (pr.minPrice ?? 0) >= range.min &&
          (pr.minPrice ?? 0) <= range.max,
      );
    }

    // Category (sub-filter)
    if (selectedCategory) {
      arr = arr.filter((pr) => pr.category?.name === selectedCategory);
    }

    // Sort
    switch (sort) {
      case "price-low":
        arr.sort((a, b) => (a.minPrice ?? 0) - (b.minPrice ?? 0));
        break;
      case "price-high":
        arr.sort((a, b) => (b.maxPrice ?? 0) - (a.maxPrice ?? 0));
        break;
      case "newest":
        arr.sort(
          (a, b) =>
            Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival)),
        );
        break;
      case "featured":
      default:
        break;
    }

    return arr;
  }, [products, search, selectedBrand, selectedPriceIdx, selectedCategory, sort]);

  const categorySlug = category?.toLowerCase() || "";
  const matchedCategory = categories.find((c: any) => (c.slug || c.name || "").toLowerCase() === categorySlug);
  const categoryLabel = matchedCategory ? matchedCategory.name : (category ? category.replace(/-/g, " ") : "Products");

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      {/* Breadcrumb */}
      <div className="px-4 md:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <Link href="/category" className="hover:text-primary transition-colors">
            Category
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="text-on-surface font-medium">{categoryLabel}</span>
        </nav>
      </div>

      {/* Page Title */}
      <div className="px-4 md:px-8 pt-4 pb-6">
        <h1 className="text-headline-xl font-bold text-on-surface capitalize">
          {categoryLabel}
        </h1>
        <p className="mt-1 text-body-md text-on-surface-variant">
          {getDescription(category ?? "")}
        </p>
      </div>

      {/* Main Layout */}
      <div className="px-4 md:px-8 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24 lg:self-start">

          {/* Price Range Filter */}
          <div className="bg-white rounded-xl border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-6">
            <h3 className="text-headline-md font-semibold text-on-surface mb-4">
              Price Range
            </h3>
            <div className="space-y-1">
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low cursor-pointer group">
                <input
                  type="radio"
                  name="price-range"
                  checked={selectedPriceIdx === null}
                  onChange={() => setSelectedPriceIdx(null)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-body-md font-medium group-hover:text-primary transition-colors">
                  Any Price
                </span>
              </label>
              {PRICE_RANGES.map((range, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="price-range"
                    checked={selectedPriceIdx === idx}
                    onChange={() => setSelectedPriceIdx(idx)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          {brands.length > 0 && (
            <div className="bg-white rounded-xl border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-6">
              <h3 className="text-headline-md font-semibold text-on-surface mb-4">
                Brand
              </h3>
              <div className="space-y-1">
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low cursor-pointer group">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === null}
                    onChange={() => setSelectedBrand(null)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-body-md font-medium group-hover:text-primary transition-colors">
                    All Brands
                  </span>
                </label>
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand ?? null)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {(selectedBrand ||
            selectedPriceIdx !== null ||
            selectedCategory ||
            search) && (
            <button
              onClick={() => {
                setSelectedBrand(null);
                setSelectedPriceIdx(null);
                setSelectedCategory(null);
                setSearch("");
              }}
              className="w-full py-2.5 rounded-xl border border-outline-variant/40 text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* ── Main Content ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-9">
          {/* Search & Sort Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 p-4 bg-white rounded-xl border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-body-md text-on-surface placeholder:text-on-surface-variant/60"
              />
            </div>

            {/* Sort + Count */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-body-md text-on-surface-variant whitespace-nowrap hidden sm:block">
                {isLoading
                  ? "Loading…"
                  : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
              </span>
              <span className="text-body-md text-on-surface-variant whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="w-full md:w-52 bg-surface-container-low border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-body-md py-2.5 px-3 text-on-surface cursor-pointer"
              >
                <option value="featured">Popularity</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* ── Error State ─────────────────────────────────────────────── */}
          {error && (
            <div className="bg-white rounded-xl border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.04)] px-6 py-14 text-center">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-4 block">
                error_outline
              </span>
              <h3 className="text-headline-md font-semibold text-on-surface">
                Failed to load products
              </h3>
              <p className="mt-2 text-body-md text-on-surface-variant">
                Something went wrong while fetching products.
              </p>
              <button
                onClick={() => setFilter({ storage: undefined, category })}
                className="mt-6 px-6 py-2.5 rounded-xl bg-primary text-on-primary text-label-md hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ── Loading Skeleton ─────────────────────────────────────────── */}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <div className="aspect-square animate-pulse bg-surface-container" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 w-1/3 animate-pulse rounded-full bg-surface-container" />
                    <div className="h-4 w-4/5 animate-pulse rounded-full bg-surface-container" />
                    <div className="h-4 w-2/3 animate-pulse rounded-full bg-surface-container" />
                    <div className="h-5 w-1/3 animate-pulse rounded-full bg-surface-container" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Empty State ──────────────────────────────────────────────── */}
          {!isLoading && !error && filteredProducts.length === 0 && (
            <div className="bg-white rounded-xl border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.04)] px-6 py-16 text-center">
              <span className="material-symbols-outlined text-[56px] text-on-surface-variant/30 mb-4 block">
                search_off
              </span>
              <h3 className="text-headline-md font-semibold text-on-surface">
                No products found
              </h3>
              <p className="mt-2 text-body-md text-on-surface-variant">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedBrand(null);
                  setSelectedPriceIdx(null);
                  setSelectedCategory(null);
                  setSearch("");
                  setFilter({ storage: undefined, category });
                }}
                className="mt-6 px-6 py-2.5 rounded-xl bg-primary text-on-primary text-label-md hover:opacity-90 transition-opacity"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* ── Product Grid ─────────────────────────────────────────────── */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* ── Pagination ───────────────────────────────────────────────── */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="flex justify-center mt-10">
              <nav className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_left
                  </span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-semibold text-label-md">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-label-md">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-label-md">
                  3
                </button>
                <span className="px-2 text-on-surface-variant">…</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">
                    chevron_right
                  </span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getDescription(category: string) {
  switch (category.toLowerCase()) {
    case "electronics":
      return "Discover top-tier electronics including TVs, smart devices, and high-fidelity audio equipment.";
    case "fashion":
      return "Upgrade your wardrobe with the latest style trends, apparel, and premium footwear.";
    case "home-kitchen":
      return "Everything you need for your home, from kitchen appliances to decor and smart home tools.";
    case "health-beauty":
      return "Vibrant skincare, fragrance, wellness, and self-care products for your daily routine.";
    case "supermarket":
      return "Daily essentials, groceries, beverages, and household items delivered to your doorstep.";
    case "computing":
      return "High-performance laptops, desktops, components, and computing accessories for work and play.";
    case "gaming":
      return "Consoles, video games, controllers, and immersive gaming gears for hardcore gamers.";
    case "phones-tablets":
      return "Browse flagships, smartphones, tablets, and mobile accessories from top global brands.";
    default:
      return "Browse our curated selection of quality products.";
  }
}
