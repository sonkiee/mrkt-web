"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { naira } from "@/utils/naira";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const imageSrc = product?.images?.[0]?.url || `https://placehold.co/400x400/e5eeff/00685f?text=${encodeURIComponent(product.title?.slice(0, 10) || "Product")}`;

  const hasDiscount = product.discount > 0;
  const discountedMin = hasDiscount
    ? Math.round((product.minPrice ?? 0) * (1 - product.discount / 100))
    : product.minPrice;

  return (
    <Link href={`/p/${product.slug}`} className="group block h-full">
      <div className="bg-white rounded-lg overflow-hidden border border-outline-variant/15 shadow-[0_1px_4px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full relative">
        
        {/* Product Image */}
        <div className="relative aspect-square bg-white flex items-center justify-center p-1">
          <Image
            src={imageSrc}
            alt={product?.title ?? "Product image"}
            fill
            priority={priority}
            className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-200"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />

          {/* Discount Badge */}
          {hasDiscount && (
            <span className="absolute top-1.5 left-1.5 bg-flash-sale-red text-white text-[8px] font-bold px-1.5 py-0.5 rounded leading-none z-10 shadow-sm">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Content Area */}
        <div className="p-2 flex flex-col flex-grow justify-between gap-1.5 border-t border-outline-variant/5">
          {/* Title */}
          <h3 className="text-xs font-bold text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="flex items-baseline justify-between gap-1 flex-wrap">
            <span className="text-xs sm:text-sm font-extrabold text-on-surface">
              {naira(discountedMin ?? 0)}
            </span>
            {hasDiscount && product.minPrice && (
              <span className="text-[10px] text-on-surface-variant/50 line-through leading-none">
                {naira(product.minPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
