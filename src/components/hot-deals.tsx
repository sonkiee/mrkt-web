// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Card } from "./ui/card";
// import { Button } from "./ui/button";
// import { useFeatured } from "@/queries/product";
// import { naira } from "@/utils/naira";
// // if you have it, else remove

// type Product = {
//   id: string;
//   name: string;
//   slug?: string;
//   image?: string; // url
//   price: number;
//   oldPrice?: number; // for discount UI
//   badge?: "NEW" | "SALE";
//   shortDescription?: string;
// };

// export const dummyHotDeals = [
//   {
//     id: "1",
//     name: "iPhone 15 Pro Max",
//     slug: "iphone-15-pro-max",
//     image: "/products/iphone-15-pro.jpg",
//     price: 1250000,
//     oldPrice: 1399000,
//     badge: "SALE",
//     shortDescription:
//       "Titanium build. A17 Pro chip. Advanced triple-camera system.",
//   },
//   {
//     id: "2",
//     name: "Samsung Galaxy S24 Ultra",
//     slug: "samsung-galaxy-s24-ultra",
//     image: "/products/s24-ultra.jpg",
//     price: 1180000,
//     oldPrice: 1295000,
//     badge: "SALE",
//     shortDescription: "200MP camera. Snapdragon 8 Gen 3. Built-in S Pen.",
//   },
//   {
//     id: "3",
//     name: "Apple Watch Series 9",
//     slug: "apple-watch-series-9",
//     image: "/products/apple-watch-9.jpg",
//     price: 385000,
//     oldPrice: 420000,
//     badge: "NEW",
//     shortDescription:
//       "Brighter display. Double-tap gesture. All-day battery life.",
//   },
//   {
//     id: "4",
//     name: "Sony WH-1000XM5 Headphones",
//     slug: "sony-wh-1000xm5",
//     image: "/products/sony-xm5.jpg",
//     price: 420000,
//     oldPrice: 480000,
//     badge: "SALE",
//     shortDescription:
//       "Industry-leading noise cancellation. Premium sound clarity.",
//   },
//   {
//     id: "5",
//     name: "MacBook Air M3 13-inch",
//     slug: "macbook-air-m3-13",
//     image: "/products/macbook-m3.jpg",
//     price: 1650000,
//     oldPrice: 1750000,
//     badge: "NEW",
//     shortDescription: "Supercharged by M3. Lightweight. All-day battery life.",
//   },
//   {
//     id: "6",
//     name: "Bose SoundLink Flex Speaker",
//     slug: "bose-soundlink-flex",
//     image: "/products/bose-flex.jpg",
//     price: 185000,
//     oldPrice: 210000,
//     badge: "SALE",
//     shortDescription: "Portable Bluetooth speaker with deep, clear sound.",
//   },
// ];

// function clamp(text?: string, fallback = "") {
//   return (text || fallback).trim();
// }

// function ProductCard({ p }: { p: Product }) {
//   const hasDiscount =
//     typeof p.oldPrice === "number" && p.oldPrice > p.price && p.oldPrice > 0;

//   const percentOff = hasDiscount
//     ? Math.round(((p.oldPrice! - p.price) / p.oldPrice!) * 100)
//     : null;

//   return (
//     <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-black/5">
//       {/* image */}
//       <div className="relative aspect-[4/3] bg-gray-100">
//         <Image
//           src={p.image || "/placeholder.svg?height=360&width=480&text=Product"}
//           alt={p.name}
//           fill
//           className="object-cover"
//           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//         />

//         {/* badge */}
//         {(p.badge || hasDiscount) && (
//           <div className="absolute left-3 top-3 flex gap-2">
//             {p.badge && (
//               <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-gray-900 ring-1 ring-black/5">
//                 {p.badge}
//               </span>
//             )}
//             {hasDiscount && (
//               <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-gray-900 ring-1 ring-black/5">
//                 SAVE {percentOff}%
//               </span>
//             )}
//           </div>
//         )}

//         {/* add button floating */}
//         <Button
//           variant="secondary"
//           size="icon"
//           className="absolute right-3 bottom-3 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-sm ring-1 ring-black/5"
//           aria-label="Add to cart"
//           onClick={() => {
//             // hook into your AddToCartButton or handler
//             console.log("add", p.id);
//           }}
//         >
//           +
//         </Button>
//       </div>

//       {/* content */}
//       <div className="p-4">
//         <div className="flex items-start justify-between gap-3">
//           <Link href={p.slug ? `/products/${p.slug}` : "#"} className="min-w-0">
//             <h4 className="truncate text-sm font-semibold text-gray-900">
//               {p.name}
//             </h4>
//           </Link>
//         </div>

//         <p className="mt-1 line-clamp-2 text-xs text-gray-500">
//           {clamp(p.shortDescription, "Limited-time deal — while stock lasts.")}
//         </p>

//         <div className="mt-3 flex items-center justify-between">
//           <div className="flex items-baseline gap-2">
//             <span className="text-sm font-bold text-gray-900">
//               {naira(p.price)}
//             </span>

//             {hasDiscount && (
//               <span className="text-xs text-gray-400 line-through">
//                 {naira(p.oldPrice!)}
//               </span>
//             )}
//           </div>

//           {hasDiscount && (
//             <span className="text-xs font-semibold text-gray-700">
//               -{percentOff}%
//             </span>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// }

// function CardSkeleton() {
//   return (
//     <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-black/5">
//       <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
//       <div className="p-4 space-y-2">
//         <div className="h-4 w-2/3 bg-gray-100 animate-pulse rounded" />
//         <div className="h-3 w-full bg-gray-100 animate-pulse rounded" />
//         <div className="h-3 w-4/5 bg-gray-100 animate-pulse rounded" />
//         <div className="h-4 w-1/3 bg-gray-100 animate-pulse rounded mt-2" />
//       </div>
//     </Card>
//   );
// }

// export function HotDeals() {
//   const { data, isLoading, isError } = useFeatured();

//   // adapt to your api shape
//   // const products: Product[] = (data?.data ?? []).slice(0, 4);
//   const products = dummyHotDeals.slice(0, 4);

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="px-6 md:px-10">
//         <div className="flex items-end justify-between gap-4">
//           <div>
//             <h3 className="text-2xl font-semibold">Hot Deals</h3>
//             <p className="mt-1 text-sm text-gray-400">
//               Limited time offers on selected items.
//             </p>
//           </div>

//           <Button
//             asChild
//             variant="link"
//             size="sm"
//             className="underline-offset-4 hover:underline"
//           >
//             <Link href="/deals">View All</Link>
//           </Button>
//         </div>

//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {/* {isLoading &&
//             Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)} */}

//           {/* {!isLoading &&
//             !isError &&
//             products.map((p) => <ProductCard key={p.id} p={p} />)} */}

//           {products.map((p) => (
//             <ProductCard key={p.id} p={p} />
//           ))}

//           {/* {!isLoading && (isError || products.length === 0) && (
//             <div className="col-span-full rounded-2xl bg-white p-6 text-sm text-gray-600 ring-1 ring-black/5">
//               No deals right now. Check back soon.
//             </div>
//           )} */}
//         </div>
//       </div>
//     </section>
//   );
// }
