"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { naira } from "@/utils/naira";
import { toast } from "sonner";
import Link from "next/link";

const WishListSection = ({ activeTab }: { activeTab: string }) => {
  const { items, remove } = useWishlistStore();
  const { add: addToCart } = useCartStore();

  const handleAddToCart = (item: any) => {
    addToCart({
      productId: item.id,
      variantId: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      attributes: {},
    });
    toast.success(`${item.title} added to cart!`);
  };

  if (activeTab !== "wishlist") return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Wishlist</CardTitle>
            <CardDescription>
              Items you&apos;ve saved for later.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <p className="text-sm text-muted-foreground">
                Your wishlist is empty. Start adding items you love!
              </p>
              <Button asChild size="sm">
                <Link href="/">Explore Marketplace</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {items.map((item) => {
                const hasDiscount = item.originalPrice && item.originalPrice > item.price;
                return (
                  <div key={item.id} className="group relative rounded-lg border flex flex-col justify-between overflow-hidden">
                    <div className="relative aspect-square overflow-hidden bg-surface-container-low flex items-center justify-center p-2">
                      <Image
                        src={item.image || "https://placehold.co/300x300"}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          remove(item.id);
                          toast.success(`${item.title} removed from wishlist`);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                    <div className="p-4 flex flex-col flex-1 gap-1.5 justify-between">
                      <div>
                        <h3 className="font-semibold text-sm line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground capitalize">
                          {item.category}
                        </p>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-sm">
                            {naira(item.price)}
                          </span>
                          {hasDiscount && (
                            <span className="text-[10px] text-muted-foreground line-through">
                              {naira(item.originalPrice ?? 0)}
                            </span>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-3 gap-1"
                          onClick={() => handleAddToCart(item)}
                          disabled={item.status === "OUT OF STOCK"}
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WishListSection;
