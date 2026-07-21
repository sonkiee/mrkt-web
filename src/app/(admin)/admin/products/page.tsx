import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductsTable from "./molecules/products-table";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <Card className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Products</h2>

        <Link
          href="/admin/products/new"
          className={buttonVariants({ variant: "outline" })}
        >
          Add Product
        </Link>
      </div>

      <div className="border rounded-md p-1 text-muted-foreground">
        <ProductsTable />
      </div>
    </Card>
  );
}
