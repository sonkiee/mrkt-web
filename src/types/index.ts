export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type ProductFilter = {
  priceRange?: [number, number];
  brand?: string;
  storage?: number;
  condition?: string;
  processor?: string;
  ram?: number;
  category?: string;
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
};

export type ProductVariant = {
  id: string;
  productId: string;
  condition: "new" | "used" | "nigerian_used" | "refurbished";
  storage?: number | null;
  color?: string | null;
  price: number; // numeric -> string
  compareAtPrice?: string | null;
  stockQty: number;
  isActive: boolean;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;

  specs?: Record<string, string | number> | null;

  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  inStock: boolean;

  brand: { id: string; name: string };
  category: { id: string; name: string };

  images: { url: string }[];
  variants: ProductVariant[];

  isNewArrival: boolean;
  discount: number;
};

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "paid"
  | "pending_payment"
  | "failed_payment"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "initiated"
  | "success"
  | "failed"
  | "refunded"
  | "converted"
  | "abandoned"
  | undefined;

export type OrderItem = {
  id: string;
  orderId?: string;
  variantId?: string;
  productTitleSnapshot?: string;
  qty?: number;
  unitPrice?: string;
  createdAt: string;

  orderNumber: string;

  total: string;

  status: Status;

  variantSnapshot?: {
    sku: string;
    color: string;
    storage: number;
    condition: string;
  };
};

export type Order = {
  id: string;
  userId: string;
  orderNumber: string;

  status: Status;
  deliveryMethod: "pickup" | "delivery";

  items: OrderItem[];

  subtotal: string;
  total: string;
  shippingFee: string;
  discountTotal: string;

  createdAt: string;
  updatedAt: string;

  addressId: string | null;

  shippingAddressSnapshot?: {
    address: string;
    city: string;
    state: string;
    phone: string;
    addressLine?: string;
  };
};
