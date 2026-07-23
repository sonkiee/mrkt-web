"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { Search, ShoppingBag, User, Heart, Package, ChevronDown, Menu, X, ChevronRight } from "lucide-react";
import { defaultCategories } from "@/constants/dummy-data";
import { useFetchCategory } from "@/hooks/queries";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { items } = useCartStore();
  const pathname = usePathname();
  const router = useRouter();

  const { data: rawCategories = [] } = useFetchCategory();
  const mainCategories = rawCategories.filter((c: any) => !c.parentId);

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="flex justify-between items-center w-full px-4 md:px-6 py-3.5 max-w-7xl mx-auto gap-4">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-[24px] font-extrabold tracking-tight text-primary flex items-center gap-1.5"
          >
            <span className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span>MRKT</span>
          </Link>

          {/* Categories Dropdown (Desktop) */}
          <div className="hidden lg:relative lg:block">
            <button
              onClick={toggleCategories}
              className="flex items-center gap-1.5 text-label-md text-on-surface hover:text-primary font-bold transition-colors py-2 px-3 rounded-lg hover:bg-surface-container-low"
            >
              <span>Categories</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`} />
            </button>

            {categoriesOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setCategoriesOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-56 bg-white border border-outline-variant/30 rounded-2xl shadow-xl z-20 flex flex-col overflow-hidden p-1.5 animate-in fade-in slide-in-from-top-1 duration-150 max-h-[380px] overflow-y-auto">
                  {mainCategories.map((cat: any) => (
                    <Link
                      key={cat.id || cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors capitalize"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="h-3 w-3 opacity-40 transition-opacity" />
                    </Link>
                  ))}
                  {mainCategories.length === 0 && (
                    <p className="text-xs text-outline-variant italic p-3 text-center">
                      No categories available.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center: Search Bar (Desktop / Tablet) */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="hidden md:flex flex-1 max-w-lg bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden px-3 py-2 items-center focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all"
        >
          <Search className="h-4.5 w-4.5 text-on-surface-variant/60 shrink-0" />
          <input
            type="text"
            placeholder="Search for products, brands, and categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-sm px-2 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs text-on-surface-variant hover:text-on-surface px-1.5"
            >
              Clear
            </button>
          )}
          <button 
            type="submit" 
            className="text-label-md text-primary font-bold hover:opacity-80 px-2 border-l border-outline-variant/40"
          >
            Search
          </button>
        </form>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 md:gap-3">
          
          {/* Wishlist */}
          <Link
            href="/account?tab=wishlist"
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Orders */}
          <Link
            href="/account?tab=orders"
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors relative"
            aria-label="Orders"
          >
            <Package className="h-5 w-5" />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors relative"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {items.length}
              </span>
            )}
          </Link>

          {/* Profile / Account */}
          <Link
            href="/account"
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg lg:hidden transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-outline-variant/30 px-4 py-4 space-y-4 shadow-inner">
          {/* Mobile Search */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden px-3 py-2 items-center"
          >
            <Search className="h-4.5 w-4.5 text-on-surface-variant/60" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none text-sm px-2 text-on-surface"
            />
            <button type="submit" className="text-label-md text-primary font-bold">
              Go
            </button>
          </form>

          {/* Mobile Categories list */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider px-3 mb-1">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto p-1 border rounded-lg bg-surface-container-lowest">
              {(mainCategories.length > 0 ? mainCategories : defaultCategories).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 px-3 rounded-lg text-body-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low capitalize"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-outline-variant/30 pt-3 flex flex-col gap-1">
            <Link
              href="/account?tab=wishlist"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-body-md font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
            >
              My Wishlist
            </Link>
            <Link
              href="/account?tab=orders"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-body-md font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
            >
              Track Orders
            </Link>
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-body-md font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
            >
              Account Settings
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
