import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrderState = {
  orderId: string | null;

  setOrderId: (id: string | null) => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orderId: null,
      setOrderId: (id) => set({ orderId: id }),
    }),
    {
      name: "order-store",
    },
  ),
);
