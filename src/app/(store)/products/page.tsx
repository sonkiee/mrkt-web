"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Star, SlidersHorizontal, Search } from "lucide-react";

import ProductCard from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { useListProducts, useFetchCategory } from "@/queries";
import { defaultCategories } from "@/constants/dummy-data";
import type { Product } from "@/types";

const PRICE_RANGES = [
  { label: "Under ₦50,000", min: 0, max: 50000 },
  { label: "₦50,000 – ₦200,000", min: 50000, max: 200000 },
  { label: "₦200,000 – ₦500,000", min: 200000, max: 500000 },
  { label: "Over ₦500,000", min: 500000, max: Infinity },
];

const CONDITIONS = ["New", "Nigerian Used", "Refurbished"];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial query params
  const paramCategory = searchParams.get("category") || "";
  const paramBrand = searchParams.get("brand") || "";
  const paramPriceMin = searchParams.get("priceMin") ? Number(searchParams.get("priceMin")) : null;
  const paramPriceMax = searchParams.get("priceMax") ? Number(searchParams.get("priceMax")) : null;
  const paramSort = searchParams.get("sort") || "featured";
  const paramSearch = searchParams.get("q") || "";

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>(paramCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(paramBrand);
  const [priceMin, setPriceMin] = useState<number | null>(paramPriceMin);
  const [priceMax, setPriceMax] = useState<number | null>(paramPriceMax);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [sort, setSort] = useState<string>(paramSort);
  const [searchQuery, setSearchQuery] = useState<string>(paramSearch);

  // Sync state when params change
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
    setSelectedBrand(searchParams.get("brand") || "");
    setPriceMin(searchParams.get("priceMin") ? Number(searchParams.get("priceMin")) : null);
    setPriceMax(searchParams.get("priceMax") ? Number(searchParams.get("priceMax")) : null);
    setSort(searchParams.get("sort") || "featured");
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Fetch products & categories
  const { data: p = [], isLoading, error } = useListProducts({});
  const { data: categories = defaultCategories } = useFetchCategory();

  // Normalise API response
  const products: Product[] = useMemo(() => {
    const raw = (p as any)?.data ?? p ?? [];
    return Array.isArray(raw) ? raw : [];
  }, [p]);

  // Unique brands
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((pr) => pr.brand?.name).filter(Boolean)));
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let arr = [...products];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      arr = arr.filter(
        (pr) =>
          pr.title?.toLowerCase().includes(q) ||
          pr.brand?.name?.toLowerCase().includes(q) ||
          pr.description?.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      arr = arr.filter(
        (pr) =>
          pr.category?.slug?.toLowerCase() === selectedCategory.toLowerCase() ||
          pr.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Brand
    if (selectedBrand) {
      arr = arr.filter((pr) => pr.brand?.name?.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Price range
    if (priceMin !== null) {
      arr = arr.filter((pr) => (pr.minPrice ?? 0) >= priceMin);
    }
    if (priceMax !== null) {
      arr = arr.filter((pr) => (pr.minPrice ?? 0) <= priceMax);
    }

    // Condition
    if (selectedCondition) {
      const cond = selectedCondition.toLowerCase().replace(/\s+/g, "_");
      arr = arr.filter((pr) =>
        pr.variants?.some((v) => v.condition?.toLowerCase().includes(cond))
      );
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
        arr.sort((a, b) => Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival)));
        break;
      case "popular":
      case "featured":
      default:
        // featured order
        break;
    }

    return arr;
  }, [products, searchQuery, selectedCategory, selectedBrand, priceMin, priceMax, selectedCondition, sort]);

  // Handle filter changes and update URL
  const updateURL = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-surface-background flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-on-surface-variant/80 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-on-surface">Products</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="space-y-6 lg:col-span-1">
            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-4 text-headline-md font-bold text-on-surface">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <span>Filters</span>
              </div>

              {/* Categories */}
              <div className="mb-6 pt-4 border-t border-outline-variant/30">
                <h3 className="text-body-lg font-semibold mb-3">Categories</h3>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer p-1 rounded hover:bg-surface-container-low">
                    <input
                      type="radio"
                      name="category"
                      checked={!selectedCategory}
                      onChange={() => {
                        setSelectedCategory("");
                        updateURL("category", null);
                      }}
                      className="accent-primary"
                    />
                    <span>All Categories</span>
                  </label>
                  {categories.map((cat: any) => (
                    <label
                      key={cat.slug || cat.id}
                      className="flex items-center gap-2 text-sm cursor-pointer p-1 rounded hover:bg-surface-container-low"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory.toLowerCase() === (cat.slug || cat.name).toLowerCase()}
                        onChange={() => {
                          setSelectedCategory(cat.slug || cat.name);
                          updateURL("category", cat.slug || cat.name);
                        }}
                        className="accent-primary"
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div className="mb-6 pt-4 border-t border-outline-variant/30">
                <h3 className="text-body-lg font-semibold mb-3">Price Range</h3>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm cursor-pointer p-1 rounded hover:bg-surface-container-low">
                    <input
                      type="radio"
                      name="price"
                      checked={priceMin === null && priceMax === null}
                      onChange={() => {
                        setPriceMin(null);
                        setPriceMax(null);
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete("priceMin");
                        params.delete("priceMax");
                        router.push(`/products?${params.toString()}`);
                      }}
                      className="accent-primary"
                    />
                    <span>Any Price</span>
                  </label>
                  {PRICE_RANGES.map((range, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 text-sm cursor-pointer p-1 rounded hover:bg-surface-container-low"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={priceMin === range.min && priceMax === range.max}
                        onChange={() => {
                          setPriceMin(range.min);
                          setPriceMax(range.max);
                          const params = new URLSearchParams(searchParams.toString());
                          params.set("priceMin", String(range.min));
                          if (range.max === Infinity) {
                            params.delete("priceMax");
                          } else {
                            params.set("priceMax", String(range.max));
                          }
                          router.push(`/products?${params.toString()}`);
                        }}
                        className="accent-primary"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              {brands.length > 0 && (
                <div className="mb-6 pt-4 border-t border-outline-variant/30">
                  <h3 className="text-body-lg font-semibold mb-3">Brands</h3>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    <label className="flex items-center gap-2 text-sm cursor-pointer p-1 rounded hover:bg-surface-container-low">
                      <input
                        type="radio"
                        name="brand"
                        checked={!selectedBrand}
                        onChange={() => {
                          setSelectedBrand("");
                          updateURL("brand", null);
                        }}
                        className="accent-primary"
                      />
                      <span>All Brands</span>
                    </label>
                    {brands.map((b) => (
                      <label
                        key={b}
                        className="flex items-center gap-2 text-sm cursor-pointer p-1 rounded hover:bg-surface-container-low"
                      >
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand.toLowerCase() === b.toLowerCase()}
                          onChange={() => {
                            setSelectedBrand(b);
                            updateURL("brand", b);
                          }}
                          className="accent-primary"
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Condition */}
              <div className="mb-6 pt-4 border-t border-outline-variant/30">
                <h3 className="text-body-lg font-semibold mb-3">Condition</h3>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm cursor-pointer p-1 rounded hover:bg-surface-container-low">
                    <input
                      type="radio"
                      name="condition"
                      checked={!selectedCondition}
                      onChange={() => setSelectedCondition(null)}
                      className="accent-primary"
                    />
                    <span>Any Condition</span>
                  </label>
                  {CONDITIONS.map((cond) => (
                    <label
                      key={cond}
                      className="flex items-center gap-2 text-sm cursor-pointer p-1 rounded hover:bg-surface-container-low"
                    >
                      <input
                        type="radio"
                        name="condition"
                        checked={selectedCondition === cond}
                        onChange={() => setSelectedCondition(cond)}
                        className="accent-primary"
                      />
                      <span>{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedBrand("");
                  setPriceMin(null);
                  setPriceMax(null);
                  setSelectedCondition(null);
                  setSearchQuery("");
                  router.push("/products");
                }}
                className="w-full mt-4 py-2 bg-surface-container text-on-surface hover:bg-primary hover:text-white transition-colors text-label-md font-semibold rounded-lg"
              >
                Reset All Filters
              </button>
            </div>
          </aside>

          {/* Product Grid and Controls */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Input on page */}
            <div className="flex bg-white border border-outline-variant/30 rounded-xl overflow-hidden shadow-soft p-1 focus-within:border-primary transition-colors items-center">
              <Search className="h-5 w-5 text-on-surface-variant/60 ml-3" />
              <input
                type="text"
                placeholder="Search products in marketplace..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateURL("q", e.target.value || null);
                }}
                className="flex-1 px-3 py-2 bg-transparent outline-none border-none text-body-md focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    updateURL("q", null);
                  }}
                  className="px-3 text-on-surface-variant hover:text-on-surface text-sm"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-outline-variant/30">
              <span className="text-body-md text-on-surface-variant">
                Showing <span className="font-semibold text-on-surface">{filteredProducts.length}</span> products
              </span>

              <div className="flex items-center gap-2">
                <span className="text-body-md text-on-surface-variant">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    updateURL("sort", e.target.value);
                  }}
                  className="bg-surface-container-low border border-outline-variant/30 rounded-lg py-1 px-3 text-body-md font-medium outline-none focus:border-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">New Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Error or Empty */}
            {error && (
              <div className="text-center py-12 bg-white rounded-xl border p-6">
                <p className="text-body-lg text-on-error">Something went wrong while loading products.</p>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-surface-container animate-pulse rounded-xl" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-outline-variant/30 p-8 space-y-4">
                <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto text-on-surface-variant/40">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-headline-md font-bold text-on-surface">No products found</h3>
                <p className="text-body-md text-on-surface-variant max-w-sm mx-auto">
                  We couldn't find any products matching your active filters. Try expanding your search.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedBrand("");
                    setPriceMin(null);
                    setPriceMax(null);
                    setSelectedCondition(null);
                    setSearchQuery("");
                    router.push("/products");
                  }}
                  className="px-5 py-2.5 bg-primary text-white rounded-lg text-label-md font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
