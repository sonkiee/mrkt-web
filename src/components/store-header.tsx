"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { useCartStore } from "@/store/cart";
import { buttonVariants } from "./ui/button";

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items } = useCartStore();

  const categories = [
    { label: "Smartphones", href: "/category/smartphones" },
    { label: "iPhone", href: "/category/iphone" },
    { label: "Samsung", href: "/category/samsung" },
    { label: "Accessories", href: "/category/accessories" },
    { label: "Repairs", href: "/category/repairs" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* LEFT: Burger + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center">
            <Image
              src="/logo-dark-nobg.png"
              alt="Electra"
              width={36}
              height={36}
            />
          </Link>
        </div>

        {/* CENTER: Search (hidden mobile) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search phones, accessories..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-white/10 outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2">
          {/* Search mobile */}
          <button className="md:hidden h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
            <Search className="h-4 w-4" />
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <FaShoppingBag className="h-4 w-4" />

            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] bg-blue-600 text-white rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            href="/account"
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <FaUser className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* SIDE DRAWER */}

      {/* <div className="absolute left-0 bottom-0 top-0 h-full w-full bg-amber-600">
        <p className="text-xs uppercase tracking-widest text-gray-500 px-6 mt-4">
          Categories
        </p>
      </div> */}
      {menuOpen && (
        <div className="fixed h-screen inset-0 z-999">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

          {/* drawer */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="h-16 flex items-center justify-between px-4 border-b">
              <span className="font-semibold">Electra</span>

              <button
                onClick={() => setMenuOpen(false)}
                className="h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="p-4 flex flex-col gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-sm"
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
