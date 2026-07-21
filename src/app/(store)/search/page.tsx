"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";

import ProductCard from "@/components/product-card";
import { useListProducts, useFetchCategory } from "@/queries";
import { defaultCategories } from "@/constants/dummy-data";
import type { Product } from "@/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read search term
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";

  // State
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  // Sync state when params change
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  // Fetch products
  const { data: p = [], isLoading, error } = useListProducts({});
  const { data: categories = defaultCategories } = useFetchCategory();

  // Normalise products
  const products: Product[] = useMemo(() => {
    const raw = (p as any)?.data ?? p ?? [];
    return Array.isArray(raw) ? raw : [];
  }, [p]);

  // Filter products by search query and category
  const filteredProducts = useMemo(() => {
    let arr = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      arr = arr.filter(
        (pr) =>
          pr.title?.toLowerCase().includes(q) ||
          pr.brand?.name?.toLowerCase().includes(q) ||
          pr.description?.toLowerCase().includes(q) ||
          pr.category?.name?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      arr = arr.filter(
        (pr) =>
          pr.category?.slug?.toLowerCase() === selectedCategory.toLowerCase() ||
          pr.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    return arr;
  }, [products, searchQuery, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <>
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-on-surface-variant/80 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-on-surface">Search Results</span>
        </div>

        {/* Search Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-headline-xl font-bold text-on-surface">
            {query ? `Search results for "${query}"` : "Search Marketplace"}
          </h1>
          
          <form onSubmit={handleSearchSubmit} className="flex max-w-xl bg-white border border-outline-variant/30 rounded-xl overflow-hidden shadow-soft p-1 focus-within:border-primary transition-colors">
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent outline-none border-none text-body-md"
            />
            <button
              type="submit"
              className="px-6 bg-primary text-white text-label-md font-semibold hover:opacity-95 transition-opacity rounded-lg"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <aside className="space-y-4 lg:col-span-1">
            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
              <h3 className="text-body-lg font-semibold mb-3">Filter by Category</h3>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("category");
                    router.push(`/search?${params.toString()}`);
                  }}
                  className={`w-full text-left p-2 rounded text-sm transition-colors ${
                    !selectedCategory
                      ? "bg-primary/10 text-primary font-bold"
                      : "hover:bg-surface-container-low text-on-surface-variant"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat: any) => {
                  const slug = cat.slug || cat.name;
                  const isSelected = selectedCategory.toLowerCase() === slug.toLowerCase();
                  return (
                    <button
                      key={slug}
                      onClick={() => {
                        setSelectedCategory(slug);
                        const params = new URLSearchParams(searchParams.toString());
                        params.set("category", slug);
                        router.push(`/search?${params.toString()}`);
                      }}
                      className={`w-full text-left p-2 rounded text-sm transition-colors capitalize ${
                        isSelected
                          ? "bg-primary/10 text-primary font-bold"
                          : "hover:bg-surface-container-low text-on-surface-variant"
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-outline-variant/30">
              <span className="text-body-md text-on-surface-variant">
                We found <span className="font-semibold text-on-surface">{filteredProducts.length}</span> products matching your search
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-surface-container animate-pulse rounded-xl" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-outline-variant/30 p-8 space-y-4">
                <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto text-on-surface-variant/40">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-headline-md font-bold text-on-surface">No results found</h3>
                <p className="text-body-md text-on-surface-variant max-w-sm mx-auto">
                  Try checking your spelling, using more general terms, or choosing a different category.
                </p>
                <Link
                  href="/products"
                  className="inline-block px-5 py-2.5 bg-primary text-white rounded-lg text-label-md font-semibold"
                >
                  Browse All Products
                </Link>
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
    </>
  );
}
