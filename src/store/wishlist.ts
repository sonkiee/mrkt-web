import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  image?: string;
  vendor?: string;
  status: "IN STOCK" | "OUT OF STOCK" | "LOW STOCK";
};

type WishlistState = {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: "1",
          title: 'Lumina Pro Book 14"',
          category: "Computers",
          price: 1299,
          originalPrice: 1499,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDncB-7kaJThlOMbjF2NN4r_-LHpmark1yjwfo_OI-kys5gIAoCXqwfIf_dnSqI_aH_VMhYYFe5W3Po08P0io8zRhMlj82OWZADVRK-mR39oZVVWl4dEEGtEc9qW6iaKHsCnnOcuoPAJSI-IttPaH5w1MK4z_cjDKiKHrgyFXtNJOaRfuuJWSdJBOs_Ey55NM7oQOzvXvvAHL7HZh7hB54CE_C7LICYHtRK1a8Yp4dHKydC7KQ1PqHFySLnMILX0Ed0V4zPHjNwU9A6",
          vendor: "Lumina Official",
          status: "IN STOCK",
        },
        {
          id: "2",
          title: "SonicWave ANC Headphones",
          category: "Audio",
          price: 349,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCuWeuCwrQvZ2HUYJQ4XTXSZreNOkU-7ep8FpHqLfrdZociqYfdQa-yTuYecR8_6ycpl4B4Q6rjmXCM6x9W1IIXXx8ICvACn2P6O_YHARyiNQNLRv-tEmVovbbhP-2QivoiVBgjZgtT02HIEH8joP701e2LON5pgymYgs3rVezI24VYW2XhfYv4EkKL7pWKspL7e9Dm6_nmCeLvwmeUfkMYmeoc7QGhC1kyXgNvqUp5gAM_b8rkE9RBDlef1LfVJ6GXxSUUwpPdtsVy",
          vendor: "SonicWave Store",
          status: "IN STOCK",
        },
        {
          id: "3",
          title: "Lumina Watch Series 5",
          category: "Wearables",
          price: 399,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDwOJAK3o8_aC75qSumA_xLgQBoTDSRS0ToEJcIAX0U3Ru_CJ5vqaDVu-HBgiAPwh_ECGRw7nTbytPcYll3fMolkUMhzf4EvxbwLUzgxFdkeDpteStR8iS1ZCkyV3HfKtBDko1GJBoZgzORz2f0kq-2y13kVrugt3WFjkMYqEBAH7KPwPi1ZJQx_1pYUlicniSvD1Pp1IbWR-VWI3alSWVMMA0EbtQXW7kIeUNLAuymCBqedsTDwRtX0wBc5zaFaEhIJMK4n-wynhbP",
          vendor: "Lumina Official",
          status: "LOW STOCK",
        },
        {
          id: "4",
          title: "Optic X-Pro Mirrorless",
          category: "Photography",
          price: 1899,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBdskVv-STaOuc0JYVComuAzsukCiecsKRLo9t8P_zN9ZbuaOcFaXP0qIhRlxRPdFI5RrPDu68Q6nge64hkk58zC3tRdvAlibQ_Tr4wvx2eS_HCfIpflWuDIqpCnp2pKUt9476xFm-Q5y6KvehRgEctXfCwPzm2kLtQtcT4ojk1RUQLkakFRV6pRc_OG_77ILacakQ-Wi6fFi4eyIDTti9wSXjA3LPg-v0FlWnxxlSUzYUNuyBySEvdUPlTRYcD73aL-zSx38LLXH40",
          vendor: "OpticPro Deals",
          status: "IN STOCK",
        },
        {
          id: "5",
          title: 'VistaCurv 34" Ultrawide',
          category: "Peripherals",
          price: 849,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuByUfCFhlGnul5mXFxiEtnw_rX2oVbyh7k2dLOt8WWJF5WMmx9JgdAqBg-CqYs2-236S0ouT1IG_lTgGAhlOHZ-8FYbJVnG7Aty3phYmEXpuvaAMOwpRAKdHkhGNsArm7ECqApzg8pnZUO4dwEmGdoGWRzAeo362GJLZfpJB_NQOW_asMAV7YjTTy9XUv2835vgdrGWimplNJFhSe3EwVYqWYY8aITZTvzae_wC1hUfVNR8g057Vd8joKhQKQTiRmT0YgNIkl-aHMEx",
          vendor: "VistaTech",
          status: "OUT OF STOCK",
        },
      ],

      add: (item) => {
        set((state) => {
          if (state.items.find((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        });
      },

      remove: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      has: (id) => !!get().items.find((i) => i.id === id),

      clear: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    },
  ),
);
