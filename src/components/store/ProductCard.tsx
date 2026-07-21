// import Link from "next/link";
// import { Badge } from "../ui/badge";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import { ShoppingCart } from "lucide-react";
// import { naira } from "@/utils/naira";
// import { Product } from "@/types";

// export function ProductCard({
//   index,
//   category = "",
//   product,
// }: {
//   index: number;
//   category?: string;
//   product: Product;
// }) {
//   const isNew = index % 5 === 0;
//   const isLowStock = index % 7 === 0;

//   return (
//     <Link href={`/store/product/${product._id}`} className="group">
//       <div className="relative overflow-hidden rounded-lg border bg-background">
//         <div className="relative aspect-square overflow-hidden">
//           {isNew && <Badge className="absolute left-2 top-2 z-10">New</Badge>}
//           {isLowStock && (
//             <Badge
//               variant="outline"
//               className="absolute left-2 top-2 z-10 bg-yellow-100 text-yellow-800"
//             >
//               Low Stock
//             </Badge>
//           )}
//           <Image
//             src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
//               product.name,
//             )}`}
//             alt={product.name}
//             width={300}
//             height={300}
//             className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//           <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
//           <Button
//             variant="secondary"
//             size="sm"
//             className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
//           >
//             Quick View
//           </Button>
//         </div>
//         <div className="p-4">
//           <h3 className="font-medium">{product.name}</h3>
//           <p className="mt-1 text-sm text-muted-foreground">
//             {category ||
//               (index % 3 === 0
//                 ? "Smartphone"
//                 : index % 3 === 1
//                   ? "Laptop"
//                   : "Accessory")}
//           </p>
//           <div className="mt-2 flex items-center justify-between">
//             <span className="font-semibold">{naira(product.price)}</span>
//             <Button variant="ghost" size="icon" className="h-8 w-8">
//               <ShoppingCart className="h-4 w-4" />
//               <span className="sr-only">Add to cart</span>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
