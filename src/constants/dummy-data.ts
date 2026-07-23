import { Product } from "@/types";

export const defaultCategories = [
  { name: "Appliances", slug: "appliances" },
  { name: "Phones & Tablets", slug: "phones-tablets" },
  { name: "Health & Beauty", slug: "health-beauty" },
  { name: "Home & Office", slug: "home-office" },
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Supermarket", slug: "supermarket" },
  { name: "Computing", slug: "computing" },
  { name: "Baby Products", slug: "baby-products" },
  { name: "Gaming", slug: "gaming" },
  { name: "Sporting Goods", slug: "sporting-goods" },
  { name: "Automobile", slug: "automobile" },
];

export const dummyProducts: Product[] = [
  // Phones & Tablets
  {
    id: "p1",
    title: "iPhone 16 Pro Max 256GB Space Black",
    slug: "iphone-16-pro-max",
    description: "Experience the ultimate iPhone with A18 Pro chip, advanced camera controls, and stunning battery life.",
    minPrice: 1650000,
    maxPrice: 1850000,
    inStock: true,
    brand: { id: "b1", name: "Apple Store" },
    category: { id: "c16", name: "Phones & Tablets" },
    images: [{ url: "https://placehold.co/600x600/e2f1ed/004e47?text=iPhone+16+Pro+Max" }],
    isNewArrival: true,
    discount: 5,
    variants: [
      { id: "v1_1", productId: "p1", condition: "new", attributes: { storage: "256", color: "Space Black" }, price: 1650000, stockQty: 12, isActive: true },
      { id: "v1_2", productId: "p1", condition: "new", attributes: { storage: "512", color: "Desert Titanium" }, price: 1850000, stockQty: 8, isActive: true },
    ]
  },
  {
    id: "p2",
    title: "Samsung Galaxy S24 Ultra 512GB",
    slug: "samsung-galaxy-s24-ultra",
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity.",
    minPrice: 1450000,
    maxPrice: 1550000,
    inStock: true,
    brand: { id: "b2", name: "Samsung Hub" },
    category: { id: "c16", name: "Phones & Tablets" },
    images: [{ url: "https://placehold.co/600x600/d7dff9/565e74?text=Galaxy+S24+Ultra" }],
    isNewArrival: false,
    discount: 8,
    variants: [
      { id: "v2_1", productId: "p2", condition: "new", attributes: { storage: "512", color: "Titanium Gray" }, price: 1450000, stockQty: 15, isActive: true },
    ]
  },
  // Electronics
  {
    id: "p3",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    slug: "sony-wh-1000xm5",
    description: "Industry-leading noise cancelling wireless headphones with premium sound, smart features and exceptional comfort.",
    minPrice: 420000,
    maxPrice: 420000,
    inStock: true,
    brand: { id: "b3", name: "Sony Center" },
    category: { id: "c1", name: "Electronics" },
    images: [{ url: "https://placehold.co/600x600/effcf8/742f13?text=Sony+WH-1000XM5" }],
    isNewArrival: false,
    discount: 10,
    variants: [
      { id: "v3_1", productId: "p3", condition: "new", attributes: { color: "Silver" }, price: 420000, stockQty: 25, isActive: true }
    ]
  },
  {
    id: "p4",
    title: "Samsung 65-Inch QLED 4K Smart TV",
    slug: "samsung-65-qled-4k-tv",
    description: "Bring your favorite content to life with vivid color and crisp contrast. Quantum Processor Lite upscale content to 4K.",
    minPrice: 850000,
    maxPrice: 920000,
    inStock: true,
    brand: { id: "b2", name: "Samsung Hub" },
    category: { id: "c1", name: "Electronics" },
    images: [{ url: "https://placehold.co/600x600/e9f7f3/00685f?text=Samsung+65+TV" }],
    isNewArrival: true,
    discount: 15,
    variants: [
      { id: "v4_1", productId: "p4", condition: "new", price: 850000, stockQty: 5, isActive: true }
    ]
  },
  // Computing
  {
    id: "p5",
    title: "MacBook Pro M4 Pro Chip 14-inch",
    slug: "macbook-pro-m4-pro",
    description: "The M4 Pro chip brings exceptional speed and power for demanding workflows, featuring a liquid retina XDR display.",
    minPrice: 2450000,
    maxPrice: 2850000,
    inStock: true,
    brand: { id: "b1", name: "Apple Store" },
    category: { id: "c6", name: "Computing" },
    images: [{ url: "https://placehold.co/600x600/ddebe7/00201d?text=MacBook+Pro+M4" }],
    isNewArrival: true,
    discount: 0,
    variants: [
      { id: "v5_1", productId: "p5", condition: "new", attributes: { storage: "512", color: "Space Gray" }, price: 2450000, stockQty: 6, isActive: true },
      { id: "v5_2", productId: "p5", condition: "new", attributes: { storage: "1024", color: "Silver" }, price: 2850000, stockQty: 4, isActive: true },
    ]
  },
  // Gaming
  {
    id: "p6",
    title: "Sony PlayStation 5 Console (Slim)",
    slug: "sony-playstation-5-slim",
    description: "Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback.",
    minPrice: 680000,
    maxPrice: 680000,
    inStock: true,
    brand: { id: "b3", name: "Sony Center" },
    category: { id: "c7", name: "Gaming" },
    images: [{ url: "https://placehold.co/600x600/ffffff/565e74?text=PlayStation+5+Slim" }],
    isNewArrival: false,
    discount: 12,
    variants: [
      { id: "v6_1", productId: "p6", condition: "new", price: 680000, stockQty: 30, isActive: true }
    ]
  },
  // Fashion
  {
    id: "p7",
    title: "Nike Air Max 270 Sneakers",
    slug: "nike-air-max-270",
    description: "Nike's first lifestyle Air Max brings you style, comfort and big attitude. An extra large window showcases Nike's greatest innovation.",
    minPrice: 120000,
    maxPrice: 120000,
    inStock: true,
    brand: { id: "b7", name: "Nike Direct" },
    category: { id: "c2", name: "Fashion" },
    images: [{ url: "https://placehold.co/600x600/ffecd2/742f13?text=Nike+Air+Max" }],
    isNewArrival: true,
    discount: 20,
    variants: [
      { id: "v7_1", productId: "p7", condition: "new", attributes: { color: "Black/Red" }, price: 120000, stockQty: 50, isActive: true }
    ]
  },
  // Home & Kitchen
  {
    id: "p8",
    title: "Philips Airfryer XXL Premium",
    slug: "philips-airfryer-xxl",
    description: "Healthy frying with Twin TurboStar technology. Fits a whole chicken or 1.4kg of fries for delicious crispy results.",
    minPrice: 280000,
    maxPrice: 280000,
    inStock: true,
    brand: { id: "b8", name: "Philips Home" },
    category: { id: "c3", name: "Home & Kitchen" },
    images: [{ url: "https://placehold.co/600x600/fce4ec/ba1a1a?text=Philips+Airfryer" }],
    isNewArrival: false,
    discount: 0,
    variants: [
      { id: "v8_1", productId: "p8", condition: "new", price: 280000, stockQty: 10, isActive: true }
    ]
  },
  // Health & Beauty
  {
    id: "p9",
    title: "Dior Sauvage Eau de Parfum 100ml",
    slug: "dior-sauvage-edp",
    description: "An intense and smooth fragrance, mysteriously powerful in its precise freshness.",
    minPrice: 185000,
    maxPrice: 185000,
    inStock: true,
    brand: { id: "b9", name: "Dior Fragrances" },
    category: { id: "c4", name: "Health & Beauty" },
    images: [{ url: "https://placehold.co/600x600/f3e5f5/742f13?text=Dior+Sauvage" }],
    isNewArrival: false,
    discount: 5,
    variants: [
      { id: "v9_1", productId: "p9", condition: "new", price: 185000, stockQty: 40, isActive: true }
    ]
  },
  // Supermarket
  {
    id: "p10",
    title: "Nescafe Gold Blend Coffee 200g",
    slug: "nescafe-gold-blend-200g",
    description: "A premium golden cup of coffee with a smooth, distinctive taste and rich aroma.",
    minPrice: 12500,
    maxPrice: 12500,
    inStock: true,
    brand: { id: "b10", name: "Nestle Store" },
    category: { id: "c5", name: "Supermarket" },
    images: [{ url: "https://placehold.co/600x600/efebe9/742f13?text=Nescafe+Gold" }],
    isNewArrival: false,
    discount: 0,
    variants: [
      { id: "v10_1", productId: "p10", condition: "new", price: 12500, stockQty: 100, isActive: true }
    ]
  },
  // Books
  {
    id: "p11",
    title: "Atomic Habits by James Clear",
    slug: "atomic-habits-book",
    description: "An easy & proven way to build good habits & break bad ones. The definitive guide to self-improvement.",
    minPrice: 8500,
    maxPrice: 8500,
    inStock: true,
    brand: { id: "b11", name: "Bookworm Hub" },
    category: { id: "c13", name: "Books" },
    images: [{ url: "https://placehold.co/600x600/ffffff/00685f?text=Atomic+Habits" }],
    isNewArrival: false,
    discount: 10,
    variants: [
      { id: "v11_1", productId: "p11", condition: "new", price: 8500, stockQty: 75, isActive: true }
    ]
  },
  // Sports & Outdoors
  {
    id: "p12",
    title: "Adidas Football League Match Ball",
    slug: "adidas-football-match-ball",
    description: "High-durability league match ball, certified quality for perfect bounce and roundness.",
    minPrice: 35000,
    maxPrice: 35000,
    inStock: true,
    brand: { id: "b12", name: "Adidas Outlets" },
    category: { id: "c10", name: "Sports & Outdoors" },
    images: [{ url: "https://placehold.co/600x600/e0f7fa/004e47?text=Adidas+Match+Ball" }],
    isNewArrival: true,
    discount: 15,
    variants: [
      { id: "v12_1", productId: "p12", condition: "new", price: 35000, stockQty: 22, isActive: true }
    ]
  }
];
