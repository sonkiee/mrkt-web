"use client";

import Spinner from "@/components/spinner";
import { useFetchProductById } from "@/hooks/queries";
import { useParams } from "next/navigation";
import ProductForm from "@/components/products/product-form";

export default function EditProductPage() {
  const slug = useParams()?.slug;
  console.log("slug", slug);

  const { data, isLoading } = useFetchProductById(slug as string);
  console.log("data", data);
  const details = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  return <ProductForm mode="edit" initialData={details} role="admin" />;
}
