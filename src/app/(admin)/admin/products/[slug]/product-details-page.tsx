"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useFetchProductById } from "@/queries";
import { naira } from "@/utils/naira";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function AdminProductDetailsPage() {
  const slug = useParams()?.slug;
  console.log("slug", slug);

  const router = useRouter();

  const { data, error, isLoading } = useFetchProductById(slug as string);
  console.log("data", data);
  const details = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <a className="text-sm text-gray-500 hover:text-gray-700"></a>

        <div className="flex gap-3">
          <Button
            variant="destructive"
            className="border border-red-300 text-red-700 bg-white"
          >
            Archive
          </Button>

          <Button
            variant="default"
            onClick={() => router.push(`/admin/products/${slug}/edit`)}
          >
            Edit Product
          </Button>

          <Button
            variant="outline"
            onClick={() => window.open(`/${slug}`, "_blank")}
          >
            View on Store
          </Button>
        </div>
      </div>

      {/* Product Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Image */}
        <div className="lg:col-span-5 bg-white border rounded-xl p-4">
          <Image
            width={100}
            height={100}
            src={details?.images?.[0]?.url || "/placeholder.svg"}
            alt="Product"
            className="w-full rounded-lg aspect-square object-cover"
          />
        </div>

        {/* Details */}
        <div className="lg:col-span-7 bg-white border rounded-xl p-8 space-y-6">
          <div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              Active
            </span>

            <h1 className="text-3xl font-bold mt-2">
              {details?.title || "Premium Wireless Noise-Cancelling Headphones"}
            </h1>

            <p className="text-sm text-gray-500 uppercase mt-1">
              SKU: {details?.sku || "WH-1000XM5-BLK"}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Current Price</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">
                {details.maxPrice > details.minPrice ? (
                  <>From {naira(details.minPrice)}</>
                ) : (
                  <>{naira(details.minPrice)}</>
                )}
              </p>
              <p className="text-xs text-gray-400">MSRP: $399.99</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Stock Level</p>
              <p className="text-2xl font-bold mt-1">1,240</p>
              <p className="text-xs text-green-600">In Stock</p>
              <p className="text-xs text-gray-400">Across 3 warehouses</p>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold border-b pb-2">
              Category & Classification
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-medium">
                  {details?.category.name ?? "Uncategorized"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Brand</p>
                <p className="text-sm font-medium">
                  {details?.brand.name ?? "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Variants  */}
      <section className="rounded-xl border bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold">Variants</h2>

        {/* EMPTY STATE */}
        {!details?.variants?.length ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No variants available for this product
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Variant</th>
                  <th className="pb-3 font-medium">SKU</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Stock</th>
                  <th className="pb-3 font-medium">Condition</th>
                </tr>
              </thead>

              <tbody>
                {details.variants.map((variant) => (
                  <tr
                    key={variant.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    {/* Variant */}
                    <td className="py-3 font-medium capitalize">
                      {variant.color ?? "Variant"}
                    </td>

                    {/* SKU */}
                    <td className="py-3 text-gray-500">{variant.sku}</td>

                    {/* Price */}
                    <td className="py-3 font-medium">
                      ₦{Number(variant.price).toLocaleString()}
                    </td>

                    {/* Stock */}
                    <td className="py-3">{variant.stockQty ?? 0}</td>

                    {/* Condition */}
                    <td className="py-3 capitalize text-gray-500">
                      {variant.condition}
                    </td>

                    <td className="p-3">
                      <StockBadge qty={variant.stockQty} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StockBadge({ qty }: { qty: number }) {
  if (qty <= 0) {
    return (
      <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
        Out of stock
      </span>
    );
  }

  if (qty < 5) {
    return (
      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
        Low stock
      </span>
    );
  }

  return (
    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
      In stock
    </span>
  );
}
