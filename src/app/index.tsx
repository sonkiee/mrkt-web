"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ProductCard from "@/components/product-card";
import { useListProducts, useFeatured, useFetchCategory } from "@/queries";
import { defaultCategories, dummyProducts } from "@/constants/dummy-data";
import type { Product } from "@/types";
import { ChevronRight, Sparkles, Flame, Clock, RefreshCw, ShoppingCart, Tag, ShieldCheck } from "lucide-react";
import { naira } from "@/utils/naira";

// ─── Flash sale dummy timer ────────────────────────────────────────
function FlashTimer() {
  const [timeLeft, setTimeLeft] = useState({ hrs: 5, mins: 42, secs: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hrs > 0) return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        return { hrs: 0, mins: 0, secs: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-1 bg-surface-container/60 px-2 py-0.5 rounded-lg border border-outline-variant/20">
      <span className="text-[10px] text-on-surface-variant font-bold flex items-center gap-1">
        <Clock className="h-3 w-3 text-primary" /> Ends in:
      </span>
      {["hrs", "mins", "secs"].map((unit) => (
        <span key={unit} className="flex items-center">
          <span className="bg-primary text-white text-[11px] font-bold px-1.5 py-0.5 rounded min-w-[22px] text-center tabular-nums shadow-sm">
            {format((timeLeft as any)[unit])}
          </span>
          {unit !== "secs" && <span className="mx-0.5 text-primary font-bold animate-pulse">:</span>}
        </span>
      ))}
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────
function SectionHeader({
  title,
  subtitle,
  href,
  hrefLabel = "View all",
  badge,
  badgeIcon: BadgeIcon,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  badge?: string;
  badgeIcon?: any;
}) {
  return (
    <div className="flex items-end justify-between mb-2.5 border-b border-outline-variant/10 pb-1">
      <div>
        <div className="flex items-center gap-1">
          {badge && (
            <span className="inline-flex items-center gap-1 text-[8px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-1.5 py-0.5 rounded mb-0.5">
              {BadgeIcon && <BadgeIcon className="h-2.5 w-2.5" />}
              {badge}
            </span>
          )}
        </div>
        <h2 className="text-base font-bold text-on-surface leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-[10px] text-on-surface-variant/80 mt-0.5">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-0.5 text-[11px] text-primary font-bold hover:opacity-75 transition-opacity"
        >
          {hrefLabel}
          <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const [showAllCategories, setShowAllCategories] = useState(false);

  const { data: catData } = useFetchCategory();
  const { data: featuredData, isLoading: featuredLoading } = useFeatured();
  const { data: allData, isLoading: allLoading } = useListProducts({});

  const categories = useMemo(() => {
    const raw = catData ?? [];
    return Array.isArray(raw) ? raw : defaultCategories;
  }, [catData]);

  const visibleCategories = useMemo(() => {
    return showAllCategories ? categories : categories.slice(0, 8);
  }, [categories, showAllCategories]);

  const products: Product[] = useMemo(() => {
    const raw = (allData as any)?.data ?? allData ?? [];
    return Array.isArray(raw) ? raw : dummyProducts;
  }, [allData]);

  // Derived lists to fit 5 per row
  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.isNewArrival).slice(0, 5);
  }, [products]);

  const flashSaleProducts = useMemo(() => {
    return products.filter((p) => p.discount > 0).slice(0, 5);
  }, [products]);

  const recommendedProducts = useMemo(() => {
    return products.slice(2, 7);
  }, [products]);

  const newArrivals = useMemo(() => {
    return products.filter((p) => p.isNewArrival).slice(0, 4);
  }, [products]);

  const bestSellers = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  const recentlyViewed = useMemo(() => {
    return products.slice(4, 9);
  }, [products]);

  return (
    <div className="min-h-screen bg-surface-background text-on-surface flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-4 w-full space-y-5">
        
        {/* TOP ROW: Categories Sidebar + Banner Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Left Categories Sidebar (Desktop) */}
          <aside className="hidden lg:block bg-white p-4 rounded-xl border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.02)] h-fit space-y-3 shrink-0">
            <h3 className="text-sm font-extrabold text-on-surface border-b pb-1.5 flex items-center gap-1.5">
              <span className="bg-primary/10 text-primary p-1 rounded-md">
                <Tag className="h-3.5 w-3.5" />
              </span>
              Top Categories
            </h3>
            <nav className="flex flex-col gap-0.5">
              {visibleCategories.map((cat: any) => (
                <Link
                  key={cat.slug || cat.id}
                  href={`/category/${cat.slug || cat.name}`}
                  className="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-surface-container-low text-xs text-on-surface-variant hover:text-primary transition-all capitalize group"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="h-3 w-3 text-on-surface-variant/40 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </nav>
            {categories.length > 8 && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-surface-container-low text-[10px] text-primary font-bold transition-all flex items-center justify-between group border-t border-dashed mt-1 pt-2"
              >
                <span>{showAllCategories ? "Show Less" : "Show More"}</span>
                <ChevronRight className={`h-3 w-3 text-primary transition-transform duration-250 ${showAllCategories ? "rotate-90" : ""}`} />
              </button>
            )}
          </aside>

          {/* Right Hero / Main Promotional Banner */}
          <div className="lg:col-span-3 space-y-3 flex flex-col justify-between">
            {/* Redesigned Shorter Hero Banner */}
            <div className="relative bg-gradient-to-br from-primary to-[#004e47] rounded-xl p-5 text-white overflow-hidden shadow-sm flex-grow min-h-[170px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4" />
              <div className="absolute bottom-0 right-10 w-28 h-28 bg-white/5 rounded-full translate-y-1/2" />
              
              <div className="relative z-10 max-w-sm space-y-2">
                <span className="inline-flex items-center gap-1 bg-white/15 border border-white/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <Sparkles className="h-2.5 w-2.5 text-primary-fixed" /> Mid-Year Deals
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">
                  Authentic Devices &amp; Tech
                </h1>
                <p className="text-white/80 text-[10px] max-w-xs leading-relaxed hidden sm:block">
                  Shop directly from Kaduna's verified marketplace vendors.
                </p>
                <div className="pt-0.5 flex items-center gap-2.5">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1 bg-white text-primary font-bold text-[10px] px-3.5 py-1.5 rounded-lg hover:opacity-95 shadow-sm transition-all"
                  >
                    Browse Market
                  </Link>
                  <Link
                    href="/products?sort=newest"
                    className="inline-flex items-center gap-1 text-white border border-white/30 hover:bg-white/10 font-bold text-[10px] px-3.5 py-1.5 rounded-lg transition-all"
                  >
                    New Arrivals
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Benefits row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { icon: ShieldCheck, title: "100% Verified", desc: "No counterfeit goods" },
                { icon: Flame, title: "Best Price", desc: "Kaduna's lowest prices" },
                { icon: RefreshCw, title: "Easy Return", desc: "Vetted refund policy" },
                { icon: ShoppingCart, title: "Fast Delivery", desc: "Kaduna-wide shipping" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-2 border border-outline-variant/15 flex items-center gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.01)]"
                >
                  <span className="bg-primary/5 text-primary p-1 rounded-md shrink-0">
                    <b.icon className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="text-[10px] font-extrabold text-on-surface leading-tight">{b.title}</p>
                    <p className="text-[8px] text-on-surface-variant/80 leading-none mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Horizontal Tag Chips (Mobile & Tablet view) */}
        <div className="lg:hidden space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant/60">
            Browse Categories
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
            {categories.map((cat: any) => (
              <Link
                key={cat.slug || cat.id}
                href={`/category/${cat.slug || cat.name}`}
                className="bg-white border border-outline-variant/35 hover:border-primary px-3 py-1 rounded-full text-xs text-on-surface-variant hover:text-primary whitespace-nowrap transition-colors capitalize font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* FLASH SALE STRIP */}
        <section className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3 border-b pb-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-flash-sale-red text-white p-1 rounded-md flex items-center justify-center">
                <Flame className="h-3.5 w-3.5 fill-current animate-pulse" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-on-surface leading-tight">Flash Sale</h2>
                <p className="text-[10px] text-on-surface-variant">Top deals matching the lowest prices online</p>
              </div>
            </div>
            <FlashTimer />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {flashSaleProducts.map((p) => {
              const discountedPrice = Math.round((p.minPrice ?? 0) * (1 - p.discount / 100));
              return (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="bg-white rounded-lg overflow-hidden border border-outline-variant/15 hover:border-primary group transition-all duration-200 flex flex-col h-full relative"
                >
                  <div className="aspect-square relative overflow-hidden bg-white flex items-center justify-center p-1">
                    <span className="absolute top-1.5 left-1.5 bg-flash-sale-red text-white text-[8px] font-bold px-1.5 py-0.5 rounded leading-none z-10">
                      -{p.discount}%
                    </span>
                    <Image
                      src={p.images?.[0]?.url || "https://placehold.co/200x200"}
                      alt={p.title}
                      width={100}
                      height={100}
                      className="object-contain max-h-full group-hover:scale-[1.02] transition-transform duration-200 p-1"
                    />
                  </div>
                  <div className="p-2 flex flex-col flex-grow justify-between gap-1 border-t border-outline-variant/5">
                    <p className="text-xs font-bold text-on-surface line-clamp-2 leading-snug">
                      {p.title}
                    </p>
                    <div className="flex items-baseline justify-between gap-1 flex-wrap pt-1 border-t border-outline-variant/5">
                      <span className="text-xs font-extrabold text-flash-sale-red">
                        {naira(discountedPrice)}
                      </span>
                      <span className="text-[9px] text-on-surface-variant/50 line-through">
                        {naira(p.minPrice ?? 0)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section>
          <SectionHeader
            title="Featured Products"
            subtitle="Verified flagship smartphones, gadgets, and tech essentials"
            badge="Featured"
            badgeIcon={Sparkles}
            href="/products"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* NEW ARRIVALS & BEST SELLERS (TWO COLUMN ROW) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* New Arrivals */}
          <section className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <SectionHeader
              title="New Arrivals"
              subtitle="The latest additions to the marketplace"
              href="/products?sort=newest"
            />
            <div className="grid grid-cols-2 gap-2.5">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>

          {/* Best Sellers */}
          <section className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <SectionHeader
              title="Best Sellers"
              subtitle="Marketplace favorites with top ratings"
              href="/products?sort=popular"
            />
            <div className="grid grid-cols-2 gap-2.5">
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>

        {/* RECOMMENDED PRODUCTS & DUMMY RECENTLY VIEWED */}
        <section>
          <SectionHeader
            title="Recommended For You"
            subtitle="Tailored matches based on your interest"
            href="/products"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {recommendedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Recently Viewed (Dummy Data) */}
        <section className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <SectionHeader
            title="Recently Viewed"
            subtitle="Pick up where you left off"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {recentlyViewed.map((p) => {
              return (
                <Link href={`/product/${p.slug}`} key={p.id} className="flex items-center gap-2 p-1.5 border rounded-lg hover:border-primary bg-surface-container-lowest transition-colors">
                  <div className="w-8 h-8 bg-white flex items-center justify-center shrink-0 relative p-0.5 rounded border">
                    <Image
                      src={p.images?.[0]?.url || ""}
                      alt={p.title}
                      width={28}
                      height={28}
                      className="object-contain max-h-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-bold text-on-surface truncate leading-tight">{p.title}</h4>
                    <p className="text-[8px] text-on-surface-variant capitalize leading-none">{p.category.name}</p>
                    <p className="text-[9px] font-extrabold text-primary mt-0.5 leading-none">{naira(p.minPrice ?? 0)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* MAIN PRODUCT GRID WITH PAGINATION */}
        <section className="space-y-3">
          <div className="border-t border-outline-variant/15 pt-3.5">
            <SectionHeader
              title="Explore More Products"
              subtitle="Endless discovery of items in Lumina Marketplace"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center pt-2">
            <nav className="flex items-center gap-1.5">
              <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-on-surface-variant">
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs shadow-sm">
                1
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-xs font-medium">
                2
              </button>
              <span className="px-0.5 text-on-surface-variant text-xs font-bold">…</span>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-on-surface-variant">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </nav>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
