// import { Button } from "@/components/ui/button";
// // import { useGetProductById } from "@/hooks/query";
// import { naira } from "@/utils/naira";
// import Image from "next/image";
// import Link from "next/link";

// const OrderProductItem = ({
//   productId,
//   quantity,
//   price,
//   variant,
//   status,
// }: {
//   productId: string;
//   quantity: number;
//   price: number;
//   variant?: string;
//   status: string;
// }) => {
//   // const { data, isLoading } = useGetProductById(productId);

//   if (isLoading) return <p> loading </p>; // or show a skeleton loader

//   // const product = data?.data;
//   console.log("product fetched", product);
//   console.log("p id", productId);

//   return (
//     <div className="flex flex-wrap gap-4 sm:flex-nowrap">
//       <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border">
//         <Image
//           src={
//             product.images[0] ||
//             `/placeholder.svg?height=96&width=96&text=${encodeURIComponent(
//               product.name,
//             )}`
//           }
//           alt={product.name}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <div className="flex flex-1 flex-col justify-between">
//         <div>
//           <Link
//             href={`/product/${productId}`}
//             className="font-medium hover:underline"
//           >
//             {product.name}
//           </Link>
//           <div className="mt-1 flex flex-wrap gap-4">
//             <span className="text-sm text-muted-foreground">
//               Qty: {quantity}
//             </span>
//             {variant && (
//               <span className="text-sm text-muted-foreground">
//                 Variant: {variant}
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="mt-2 flex items-center gap-4">
//           <span className="font-medium">{naira(price)}</span>
//           {status === "Delivered" && (
//             <Button variant="outline" size="sm" asChild>
//               <Link href={`/review/product/${productId}`}>Write a Review</Link>
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderProductItem;
