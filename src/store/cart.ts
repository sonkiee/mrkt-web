import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  variantId: string;
  productId: string;
  qty: number;

  // snapshot for display
  title: string;
  image?: string;
  price: number;

  condition?: "new" | "used" | "refurbished";
  storage?: number;
  color?: string;
};

type CartState = {
  items: CartItem[];

  totalItems: () => number;
  subtotal: () => number;

  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (productId: string, variantId: string) => void;

  setQty: (productId: string, variantId: string, qty: number) => void;

  increment: (productId: string, variantId: string) => void;
  decrement: (productId: string, variantId: string) => void;
  clear: () => void;
};

const keyOf = (id: string, variant?: string) =>
  variant ? `${id}::${variant}` : id;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      totalItems: () =>
        get().items.reduce((total, item) => total + item.qty, 0),

      subtotal: () =>
        get().items.reduce((total, item) => total + item.price * item.qty, 0),

      add: (item, qty = 1) => {
        const safeQty = Math.max(1, Math.floor(qty));
        const k = keyOf(item.productId, item.variantId);

        set((state) => {
          const idx = state.items.findIndex(
            (i) => keyOf(i.productId, i.variantId) === k,
          );

          if (idx === -1) {
            return { items: [...state.items, { ...item, qty: safeQty }] };
          }
          const items = [...state.items];
          items[idx] = { ...items[idx], qty: items[idx].qty + safeQty };
          return { items };
        });
      },

      remove: (productId, variantId) => {
        const k = keyOf(productId, variantId);
        set((state) => ({
          items: state.items.filter(
            (x) => keyOf(x.productId, x.variantId) !== k,
          ),
        }));
      },

      setQty: (productId, variantId, qty) => {
        const k = keyOf(productId, variantId);
        const safeQty = Math.max(0, Math.floor(qty));

        set((state) => {
          const items = state.items
            .map((x) =>
              keyOf(x.productId, x.variantId) === k
                ? { ...x, qty: safeQty }
                : x,
            )
            .filter((x) => x.qty > 0);
          return { items };
        });
      },

      increment: (productId, variantId) => {
        const k = keyOf(productId, variantId);
        set((state) => ({
          items: state.items.map((x) =>
            keyOf(x.productId, x.variantId) === k
              ? { ...x, qty: x.qty + 1 }
              : x,
          ),
        }));
      },

      decrement: (productId, variantId) => {
        const k = keyOf(productId, variantId);

        set((state) => {
          const items = state.items
            .map((x) =>
              keyOf(x.productId, x.variantId) === k
                ? { ...x, qty: x.qty - 1 }
                : x,
            )
            .filter((x) => x.qty > 0);
          return { items };
        });
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
