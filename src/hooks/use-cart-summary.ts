import { useCartStore } from "@/store/cart";

export const useCartSummary = () => {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const totalItems = useCartStore((s) => s.totalItems());

  // blah
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  return {
    items,
    subtotal,
    totalItems,
    shipping,
    total,
  };
};
