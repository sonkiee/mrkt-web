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

  // Only consider active variants (optional but recommended)
  const activeVariants = useMemo(
    () => product.variants.filter((v) => v.isActive),
    [product.variants],
  );

  // option lists
  const colors = useMemo(
    () =>
      [
        ...new Set(activeVariants.map((v) => v.color).filter(Boolean)),
      ] as string[],
    [activeVariants],
  );

  const storages = useMemo(
    () =>
      [
        ...new Set(
          activeVariants
            .map((v) => v.storage)
            .filter((x): x is number => typeof x === "number"),
        ),
      ].sort((a, b) => a - b),
    [activeVariants],
  );

  const conditions = useMemo(
    () => [...new Set(activeVariants.map((v) => v.condition))],
    [activeVariants],
  );

  const [qty, setQty] = useState(1);
  // selection state
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<
    ProductVariant["condition"] | null
  >(null);

  // optional: set sensible defaults when product loads
  useEffect(() => {
    if (!activeVariants.length) return;

    // default to first available condition
    if (selectedCondition == null) setSelectedCondition(conditions[0] ?? null);

    // default storage/color if only one exists
    if (selectedStorage == null && storages.length === 1)
      setSelectedStorage(storages[0]);
    if (selectedColor == null && colors.length === 1)
      setSelectedColor(colors[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVariants.length, conditions, storages, colors]);

  // resolved variant
  const selectedVariant = useMemo(() => {
    return activeVariants.find(
      (v) =>
        (selectedColor == null || (v.color ?? null) === selectedColor) &&
        (selectedStorage == null || (v.storage ?? null) === selectedStorage) &&
        (selectedCondition == null || v.condition === selectedCondition),
    );
  }, [activeVariants, selectedColor, selectedStorage, selectedCondition]);

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
        //   condition: selectedVariant.condition,
        storage: selectedVariant.storage ?? undefined,
        color: selectedVariant.color ?? undefined,
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

      {/* Condition */}
      {conditions.length > 0 && (
        <div className="space-y-2">
          <div className="font-medium">Condition</div>
          <div className="flex flex-wrap gap-2">
            {conditions.map((c) => (
              <Button
                key={c}
                type="button"
                variant={selectedCondition === c ? "default" : "outline"}
                onClick={() => setSelectedCondition(c)}
              >
                {c.replace("_", " ")}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Storage */}
      {storages.length > 0 && (
        <div className="space-y-2">
          <div className="font-medium">Storage</div>
          <div className="flex flex-wrap gap-2">
            {storages.map((s) => (
              <Button
                key={s}
                type="button"
                variant={selectedStorage === s ? "default" : "outline"}
                onClick={() => setSelectedStorage(s)}
              >
                {s}GB
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      {colors.length > 0 && (
        <div className="space-y-2">
          <div className="font-medium">Color</div>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <Button
                key={c}
                type="button"
                variant={selectedColor === c ? "default" : "outline"}
                onClick={() => setSelectedColor(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="text-xs font-semibold text-on-surface-variant">
        {selectedVariant ? (
          selectedVariant.stockQty > 0 ? (
            <span className="text-status-success bg-status-success/10 px-2 py-0.5 rounded">In stock ({selectedVariant.stockQty} available)</span>
          ) : (
            <span className="text-status-error bg-status-error/10 px-2 py-0.5 rounded">Out of stock</span>
          )
        ) : (
          <span className="text-on-surface-variant/80">Select options to see availability</span>
        )}
      </div>

      <div>
        <h3 className="mb-1.5 text-xs font-bold text-on-surface uppercase tracking-wider">Quantity</h3>
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

      {/* If you need the variantId for cart: */}
      {/* selectedVariant?.id */}
    </div>
  );
}
