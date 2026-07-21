"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { Trash2, ShoppingCart, Share2, Heart, PlusCircle, ArrowLeft } from "lucide-react";
import { naira } from "@/utils/naira";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function WishlistPage() {
  const { items, remove, clear } = useWishlistStore();
  const { add: addToCart } = useCartStore();

  const handleAddToCart = (item: any) => {
    // Adapter to match CartItem type
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      vendor: item.vendor || "Lumina Vendor",
      qty: 1,
    });
    toast.success(`${item.title} added to cart!`);
  };

  const handleAddAllToCart = () => {
    if (items.length === 0) return;
    items.forEach((item) => {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        vendor: item.vendor || "Lumina Vendor",
        qty: 1,
      });
    });
    toast.success(`All items added to cart!`);
  };

  return (
    <div className="min-h-screen bg-surface-background flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8 w-full space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-on-surface-variant/80">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-on-surface-variant/40">/</span>
          <span className="font-medium text-on-surface">Wishlist</span>
        </div>

        {/* Wishlist Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b">
          <div>
            <h1 className="text-headline-xl font-bold text-on-surface">Your Wishlist</h1>
            <p className="text-body-md text-on-surface-variant mt-1">
              Manage your saved items and add them to your cart whenever you're ready.
            </p>
          </div>
          <div className="flex gap-2">
            {items.length > 0 && (
              <>
                <button
                  onClick={() => {
                    toast.success("Wishlist link copied to clipboard!");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-outline-variant/30 rounded-xl text-label-md font-semibold text-on-surface hover:bg-surface-container-low transition-colors shadow-sm"
                >
                  <Share2 className="h-4 w-4" />
                  Share List
                </button>
                <button
                  onClick={handleAddAllToCart}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-label-md font-semibold hover:opacity-90 transition-opacity shadow-sm"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add All to Cart
                </button>
              </>
            )}
          </div>
        </div>

        {/* Wishlist Items Grid */}
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white border border-outline-variant/20 rounded-2xl p-8 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-headline-md font-bold text-on-surface">Your wishlist is empty</h3>
            <p className="text-body-md text-on-surface-variant">
              Explore our marketplace and tap the heart icon on any product to save it here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white rounded-lg text-label-md font-semibold hover:opacity-95"
            >
              <ArrowLeft className="h-4 w-4" />
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const hasDiscount = item.originalPrice && item.originalPrice > item.price;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-outline-variant/25 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-square overflow-hidden bg-surface-container-low flex items-center justify-center p-4 border-b">
                    <Image
                      src={item.image || "https://placehold.co/300x300"}
                      alt={item.title}
                      width={240}
                      height={240}
                      className="object-contain max-h-full"
                    />
                    
                    {/* Delete button */}
                    <button
                      onClick={() => {
                        remove(item.id);
                        toast.success(`${item.title} removed from wishlist`);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur shadow-sm rounded-full text-status-error hover:bg-white transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full text-white ${
                          item.status === "LOW STOCK"
                            ? "bg-status-warning"
                            : item.status === "OUT OF STOCK"
                            ? "bg-status-error"
                            : "bg-primary"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-1 flex-1">
                    <span className="text-label-sm font-bold text-primary uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-body-md font-semibold text-on-surface line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-on-surface-variant">by {item.vendor}</p>

                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-headline-md font-bold text-on-surface">
                          {naira(item.price)}
                        </span>
                        {hasDiscount && (
                          <span className="text-label-sm text-on-surface-variant line-through">
                            {naira(item.originalPrice ?? 0)}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.status === "OUT OF STOCK"}
                      className="mt-4 w-full bg-primary text-white py-2.5 rounded-lg text-label-md font-semibold flex items-center justify-center gap-2 active:scale-[0.98] disabled:bg-surface-container disabled:text-on-surface-variant/40 transition-all shadow-sm"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Empty State Suggestion Placeholder */}
            <div className="bg-surface-container-low/40 rounded-xl border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center p-6 text-center gap-3 min-h-[300px]">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <PlusCircle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-body-lg font-bold text-on-surface">Find More Items</h4>
                <p className="text-body-md text-on-surface-variant max-w-[200px] mx-auto">
                  Browse our categories and save more items.
                </p>
              </div>
              <Link href="/" className="text-label-md text-primary font-bold hover:underline">
                Explore Store
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
