"use client";

import { useParams } from "next/navigation";
import CustomerCard from "../../customers/_components/customer-card";
import OrderHeader from "../_components/order-header";
import OrderItems from "../_components/order-items";
import OrderSummary from "../_components/order-summary";
import OrderTimeline from "../_components/order-timeline";
import { useGetOrderDetails } from "@/hooks/queries";
import ShippingSummaryCard from "../_components/shipping";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrderDetails(orderId as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  console.log("Order ID from URL:", orderId); // ✅ Debug URL param
  console.log("Order data:", orders); // ✅ Debug fetched data
  return (
    <div className="max-w-[1200px] mx-auto w-full p-6 lg:p-10 space-y-8">
      <OrderHeader order={orders.data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <OrderItems items={orders.data?.items} />
          <OrderTimeline />
        </div>

        <div className="flex flex-col gap-8">
          <ShippingSummaryCard
            shipping={orders.data?.shippingAddressSnapshot}
          />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
