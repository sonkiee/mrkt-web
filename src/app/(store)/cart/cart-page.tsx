"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart";
import { CartSummaryCard } from "./cart-summary";
import { naira } from "@/utils/naira";

export default function CartPage() {
  const { items, increment, decrement, remove } = useCartStore();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">Shopping Cart</span>
        </div>

        <h1 className="mt-6 text-3xl font-bold">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-lg border">
                <div className="p-6">
                  <h2 className="text-lg font-semibold">
                    Cart Items ({items.length})
                  </h2>
                </div>
                <Separator />
                {items.map((item) => (
                  <div key={item.productId} className="group">
                    <div className="flex items-start gap-4 p-6">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border">
                        <Image
                          src={
                            item.image ||
                            `/placeholder.svg?height=96&width=96&text=${encodeURIComponent(
                              item.title,
                            )}`
                          }
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex justify-between">
                          <Link
                            href={`/p/${item.productId}`}
                            className="font-medium hover:underline"
                          >
                            {item.title}
                          </Link>
                          <div className="font-semibold">
                            {naira(item.price * item.qty)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.variantId || "Standard"}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() =>
                                decrement(item.productId, item.variantId)
                              }
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease</span>
                            </Button>
                            <div className="flex h-8 w-10 items-center justify-center border-y text-sm">
                              {item.qty}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() =>
                                increment(item.productId, item.variantId)
                              }
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase</span>
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() =>
                              remove(item.productId, item.variantId)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
                <div className="flex justify-between p-6">
                  <Button variant="outline" asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      items.forEach((item) =>
                        remove(item.productId, item.variantId),
                      )
                    }
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            <CartSummaryCard />
          </div>
        )}
      </main>
    </div>
  );
}
