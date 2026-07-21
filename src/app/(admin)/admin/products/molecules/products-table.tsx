"use client";

import { Ellipsis, EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../molecules/table";
import Status from "../../../../../components/status";
import StatusBadge from "../../../../../components/status";
import { useListProducts } from "@/queries/admin";
import Prdt from "./prdt";
import { naira } from "@/utils/naira";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ProductsTable() {
  const { data, isLoading, error } = useListProducts();

  const products = data?.data ?? [];

  console.log("returning", products);
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Stock</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map(
            (product: {
              id?: string;
              title?: string;
              category?: { name?: string };
              price?: number;
              inStock?: boolean;
              isActive?: boolean;
              slug?: string;
            }) => (
              <TableRow key={product.id}>
                <TableCell className="px-6 py-4 font-medium text-gray-900">
                  <Prdt
                    name={product.title ?? "Product Name"}
                    category={product.category?.name}
                  />
                </TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>{naira(product.price ?? 0)}</TableCell>
                <TableCell>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </TableCell>
                <TableCell>
                  {/* <StatusBadge status={product.isActive} /> */}
                  <p>hello</p>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/products/${product.slug}`}
                    className={buttonVariants({
                      variant: "default",
                      size: "sm",
                    })}
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
