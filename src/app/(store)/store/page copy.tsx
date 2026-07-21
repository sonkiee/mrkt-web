"use client";

import { useState } from "react";

export default function StorePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    "Smartphones",
    "iPhone",
    "Samsung",
    "Accessories",
    "Repairs",
  ];

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-variant">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Burger + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-full hover:bg-surface-variant"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="font-bold text-lg tracking-tight">ELECTRA</div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <input
              type="text"
              placeholder="Search phones, accessories..."
              className="w-full px-4 py-2 rounded-full bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-surface-variant">
              👤
            </button>
            <button className="p-2 rounded-full hover:bg-surface-variant relative">
              🛒
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* SIDE DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          {/* drawer */}
          <div className="absolute left-0 top-0 h-full w-80 bg-surface shadow-xl flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b border-surface-variant">
              <span className="font-bold">ELECTRA</span>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-surface-variant"
              >
                ✕
              </button>
            </div>

            <nav className="p-4 flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="text-left px-3 py-2 rounded-lg hover:bg-surface-variant"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="max-w-6xl mx-auto w-full px-4 py-10 space-y-12">
        {/* CATEGORY GRID */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat}
              className="p-4 rounded-xl border bg-surface-container-low hover:shadow-sm transition"
            >
              <div className="h-24 bg-surface-container rounded-lg mb-3" />
              <p className="font-medium text-sm">{cat}</p>
            </div>
          ))}
        </section>

        {/* FEATURED */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Featured</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 bg-surface-container-low flex flex-col"
              >
                <div className="h-40 bg-surface-container rounded-lg mb-3" />

                <p className="text-xs text-on-surface-variant">Smartphone</p>
                <h3 className="font-medium">Product Name</h3>

                <p className="text-sm text-on-surface-variant flex-1">
                  Short product description
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-semibold">$999</span>
                  <button className="text-sm px-3 py-1 rounded bg-primary text-white">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-surface-container-low mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-on-surface-variant">
          © {new Date().getFullYear()} Electra
        </div>
      </footer>
    </div>
  );
}
