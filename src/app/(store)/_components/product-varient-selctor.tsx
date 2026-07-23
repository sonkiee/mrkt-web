"use client";

import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { naira } from "@/utils/naira";
import { Product, ProductVariant } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";

export function ProductVariantSelector({ product }: { product: Product }) {
  const add = useCartStore((state) => state.add);

  // Only consider active variants
  const activeVariants = useMemo(
    () => product.variants.filter((v) => v.isActive),
    [product.variants],
  );

  // Option lists map: e.g. { "size": ["S", "M", "L"], "color": ["Red", "Blue"] }
  const optionsMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    activeVariants.forEach((v) => {
      const attrs = v.attributes || {};
      Object.entries(attrs).forEach(([key, val]) => {
        if (!map[key]) map[key] = [];
        if (!map[key].includes(val)) map[key].push(val);
      });
    });
    return map;
  }, [activeVariants]);

  const [qty, setQty] = useState(1);
  
  // Selection state
  const [selections, setSelections] = useState<Record<string, string>>({});

  // Default selections when product loads
  useEffect(() => {
    if (!activeVariants.length) return;

    const initialSelections: Record<string, string> = {};
    Object.entries(optionsMap).forEach(([key, values]) => {
      if (values.length === 1) {
        initialSelections[key] = values[0];
      }
    });
    setSelections((prev) => ({ ...initialSelections, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVariants.length, optionsMap]);

  // Resolved variant
  const selectedVariant = useMemo(() => {
    return activeVariants.find((v) => {
      const attrs = v.attributes || {};
      for (const [key, val] of Object.entries(selections)) {
        if (attrs[key] !== val) return false;
      }
      return true;
    });
  }, [activeVariants, selections]);

  const priceText = selectedVariant
    ? naira(Number(selectedVariant.price))
    : product.minPrice && product.maxPrice
      ? product.minPrice === product.maxPrice
        ? naira(Number(product.minPrice))
        : `${naira(Number(product.minPrice))} - ${naira(Number(product.maxPrice))}`
      : "—";

  const onSubmit = () => {
    if (!selectedVariant) return;

    add(
      {
        productId: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        price: Number(selectedVariant.price),
        image: product.images[0]?.url,
        attributes: selectedVariant.attributes,
      },
      qty,
    );

    toast.success("Added to cart!");
  };

  return (
    <div className="space-y-4">
      {/* Price */}
      <div className="text-2xl font-bold">{priceText}</div>

      <Separator />

      {/* Dynamic Attributes (Size, Color, Storage, etc.) */}
      {Object.entries(optionsMap).map(([optionName, values]) => (
        <div key={optionName} className="space-y-2">
          <div className="font-medium capitalize">{optionName}</div>
          <div className="flex flex-wrap gap-2">
            {values.map((val) => (
              <Button
                key={val}
                type="button"
                variant={selections[optionName] === val ? "default" : "outline"}
                onClick={() =>
                  setSelections((prev) => ({
                    ...prev,
                    [optionName]: val,
                  }))
                }
              >
                {optionName === "storage" ? `${val}GB` : val}
              </Button>
            ))}
          </div>
        </div>
      ))}

      {/* Availability */}
      <div className="text-xs font-semibold text-on-surface-variant">
        {selectedVariant ? (
          selectedVariant.stockQty > 0 ? (
            <span className="text-status-success bg-status-success/10 px-2 py-0.5 rounded">
              In stock ({selectedVariant.stockQty} available)
            </span>
          ) : (
            <span className="text-status-error bg-status-error/10 px-2 py-0.5 rounded">
              Out of stock
            </span>
          )
        ) : (
          <span className="text-on-surface-variant/80">
            Select options to see availability
          </span>
        )}
      </div>

      <div>
        <h3 className="mb-1.5 text-xs font-bold text-on-surface uppercase tracking-wider">
          Quantity
        </h3>
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-r-none border-outline-variant"
            onClick={() => setQty(Math.max(1, qty - 1))}
            disabled={!selectedVariant || selectedVariant.stockQty <= 0}
          >
            <Minus className="h-4.5 w-4.5" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex h-9 w-12 items-center justify-center border-y border-outline-variant text-sm font-extrabold text-on-surface">
            {qty}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-l-none border-outline-variant"
            onClick={() => setQty(Math.min(selectedVariant?.stockQty ?? 99, qty + 1))}
            disabled={!selectedVariant || selectedVariant.stockQty <= 0}
          >
            <Plus className="h-4.5 w-4.5" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row pt-3 border-t">
        <Button
          size="lg"
          onClick={onSubmit}
          disabled={!selectedVariant || selectedVariant.stockQty <= 0}
          className="flex-1 bg-primary text-on-primary hover:opacity-95 shadow-sm font-bold text-sm h-11"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-outline-variant hover:bg-surface-container-high font-semibold text-sm h-11"
        >
          <Heart className="h-4.5 w-4.5" />
          Wishlist
        </Button>
      </div>
    </div>
  );
}
