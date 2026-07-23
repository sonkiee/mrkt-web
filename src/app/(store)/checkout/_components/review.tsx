// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { TabsContent } from "@/components/ui/tabs";
// import { CartItem } from "@/store";
// import Image from "next/image";
// import React from "react";

// const Review = ({
//   setStep,
//   cart,
// }: {
//   setStep: (step: string) => void;
//   cart: CartItem[];
// }) => {
//   return (
//     <TabsContent value="review" className="mt-0">
//       <Card>
//         <CardContent className="p-6">
//           <h2 className="text-lg font-semibold">Review Your Order</h2>

//           <div className="mt-6 space-y-6">
//             <div>
//               <h3 className="font-medium">Shipping Information</h3>
//               <div className="mt-2 rounded-lg border p-4 text-sm">
//                 <p className="font-medium">John Doe</p>
//                 <p>123 Main Street</p>
//                 <p>San Francisco, CA 94107</p>
//                 <p>United States</p>
//                 <p className="mt-2">john.doe@example.com</p>
//                 <p>(123) 456-7890</p>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-medium">Payment Method</h3>
//               <div className="mt-2 rounded-lg border p-4 text-sm">
//                 <div className="flex items-center justify-between">
//                   <p>Credit Card ending in 3456</p>
//                   <Image
//                     src="/placeholder.svg?height=24&width=36"
//                     alt="Visa"
//                     width={36}
//                     height={24}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-medium">Items</h3>
//               <div className="mt-2 space-y-4 rounded-lg border p-4">
//                 {cart.map((item) => (
//                   <div key={item.id} className="flex items-center gap-4">
//                     <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
//                       <Image
//                         src={
//                           item.image ||
//                           `/placeholder.svg?height=64&width=64&text=${
//                             encodeURIComponent(item.name) || "/placeholder.svg"
//                           }`
//                         }
//                         alt={item.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex flex-1 flex-col">
//                       <span className="font-medium">{item.name}</span>
//                       <span className="text-sm text-muted-foreground">
//                         {item.variant || "Standard"} × {item.quantity}
//                       </span>
//                     </div>
//                     <div className="font-medium">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 flex justify-between">
//             <Button variant="outline" onClick={() => setStep("payment")}>
//               Back to Payment
//             </Button>
//             <Button>Place Order</Button>
//           </div>
//         </CardContent>
//       </Card>
//     </TabsContent>
//   );
// };

// export default Review;
