// "use client";
// import { ShoppingCart } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export function CartIcon() {
//   const pathname = usePathname();
//   const hasCartPage = pathname.includes("/store/cart");

//   if (cart.length === 0 || hasCartPage) return null;

//   return (
//     <Link href={"/store/cart"}>
//       <button className="fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition">
//         <div className="relative">
//           <ShoppingCart size={30} />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
//             {cart.length}
//           </span>
//         </div>
//       </button>
//     </Link>
//   );
// }
