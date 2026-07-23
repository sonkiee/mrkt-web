"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/dashboard-table";
import { useAdminListProducts } from "@/hooks/queries";
import Prdt from "./prdt";
import { naira } from "@/utils/naira";
import Spinner from "@/components/spinner";

type Product = {
  id?: string;
  title?: string;
  category?: {
    name?: string;
  };
  price?: number;
  inStock?: boolean;
  isActive?: boolean;
  slug?: string;
};

interface ProductsTableProps {
  role: "admin" | "vendor";
}

export default function ProductsTable({ role }: ProductsTableProps) {
  const { data, isLoading, error } = useAdminListProducts();

  const products: Product[] = data?.data ?? [];

  console.log("returning", products);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-status-error font-medium">
        Failed to load products.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white border border-outline-variant/20 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Stock</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="px-6 py-4 font-medium text-gray-900">
                  <Prdt
                    name={product.title ?? "Product Name"}
                    category={product.category?.name}
                  />
                </TableCell>

                <TableCell>
                  {product.category?.name ?? "Uncategorized"}
                </TableCell>

                <TableCell>{naira(product.price ?? 0)}</TableCell>

                <TableCell>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </TableCell>

                <TableCell>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    product.isActive 
                      ? "bg-green-50 text-green-700 ring-green-600/20" 
                      : "bg-gray-50 text-gray-600 ring-gray-500/10"
                  }`}>
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>

                <TableCell>
                  <Link
                    href={role === "admin" ? `/admin/products/${product.slug}` : `/vendor/products/${product.slug}`}
                    className={buttonVariants({
                      variant: "default",
                      size: "sm",
                    })}
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
