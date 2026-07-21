// "use client";

// import { useAllProducts } from "@/queries/product";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { ProductCard } from "./ProductCard";
// import { useCategory } from "@/queries/category";
// import { Category, Product } from "@/types";

// export function StoreProducts() {
//   const { data, error, isLoading } = useAllProducts();
//   const { data: categories } = useCategory();
//   // const category = categories?.data;

//   // .[0]?.name || "all";
//   console.log("Categories fetched", categories);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   console.log("Products fetched", data);
//   const products = data?.data;

//   const filterByCategory = (category: string) =>
//     category === "all"
//       ? products
//       : products.filter((product: Product) => product.category === category);
//   return (
//     <section className="py-8 md:py-12">
//       <div className="container">
//         <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
//           Featured Products
//         </h2>
//         <Tabs defaultValue="all" className="mt-6">
//           <TabsList>
//             <TabsTrigger value="all">All</TabsTrigger>
//             {categories?.data.map((category: Category) => (
//               <TabsTrigger key={category._id} value={category._id}>
//                 {category.name}
//               </TabsTrigger>
//             ))}
//           </TabsList>
//           {/* <TabsContent value="all" className="mt-6">
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//               {[...Array(10)].map((_, i) => (
//                 <ProductCard key={i} index={i} />
//               ))}
//             </div>
//           </TabsContent> */}
//           <TabsContent value="all" className="mt-6">
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//               {products?.map((product: Product, index: number) => (
//                 <ProductCard
//                   key={product._id}
//                   product={product}
//                   index={index}
//                 />
//               ))}
//             </div>
//           </TabsContent>

//           {categories?.data.map((cat: { _id: string; name: string }) => (
//             <TabsContent key={cat._id} value={cat._id} className="mt-6">
//               <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//                 {filterByCategory(cat._id).map(
//                   (product: Product, index: number) => (
//                     <ProductCard
//                       key={product._id}
//                       product={product}
//                       index={index}
//                     />
//                   ),
//                 )}
//               </div>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </div>
//     </section>
//   );
// }
