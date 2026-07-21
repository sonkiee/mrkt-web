// "use client";
// import { ShoppingCart, User } from "lucide-react";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { useCart } from "@/context/cart-context";
// import { cn } from "@/utils/cn";
// import { usePathname } from "next/navigation";

// export const navLinks = [
//   "smartphones",
//   "laptops",
//   "tablets",
//   "accessories",
//   "parts",
//   "deals",
// ];

// export function StoreHeader() {
//   const pathname = usePathname();
//   const { cart } = useCart();
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background">
//       <div className="container flex h-16 items-center justify-between px-4 py-4">
//         <div className="flex items-center gap-2">
//           <Link href="/" className="flex items-center gap-2">
//             <span className="text-xl font-bold">TechGadgets</span>
//           </Link>
//         </div>

//         <nav className="container hidden m-auto justify-center items-center pb-3 md:block">
//           <ul className="flex items-center justify-center content-center text-center gap-6">
//             {navLinks.map((item, index) => {
//               // const href = `/store/category/${item}`;
//               const href = `/store/category/${item}`;

//               const isActive = pathname === href;

//               return (
//                 <li key={index}>
//                   <Link
//                     href={href}
//                     className={cn(
//                       "text-sm font-medium hover:text-primary",
//                       item === "deals"
//                         ? "text-rose-500 hover:text-rose-600"
//                         : "",
//                       isActive && "text-primary underline",
//                     )}
//                   >
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         <div className="flex items-center gap-4">
//           <Link href="/store/account">
//             <Button variant="ghost" size="icon" className="rounded-full">
//               <User className="h-5 w-5" />
//               <span className="sr-only">Account</span>
//             </Button>
//           </Link>
//           {/* <Link href="/cart">
//             <Button variant="ghost" size="icon" className="rounded-full">
//               <ShoppingCart className="h-5 w-5" />
//               <span className="sr-only">Cart</span>
//             </Button>
//           </Link> */}
//           <Link href="/store/cart">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="relative rounded-full"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               <span className="sr-only">Cart</span>
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
//                   {cart.length}
//                 </span>
//               )}
//             </Button>
//           </Link>
//         </div>
//       </div>
//       {/* serach box */}
//       {/* <div className="hidden flex-1 items-center justify-center px-8 md:flex">
//         <div className="relative w-full max-w-md">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search for products..."
//             className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
//           />
//         </div>
//       </div> */}
//     </header>
//   );
// }
