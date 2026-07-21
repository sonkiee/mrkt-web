// app/store/account/orders/page.tsx
"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import OrderItem from "./molecules/order-item";
import { useFetchUserOrders } from "@/queries";
import { Order, OrderItem as OItem } from "@/types";

export default function OrdersPage() {
  const { data, isLoading } = useFetchUserOrders();
  const orders = data?.data as Order[] | undefined;

  console.log("Orders fetched", orders);
  const is = orders;
  return (
    <main className="bg-[#F5F5F7] min-h-screen">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Orders
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your recent purchases.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/">Continue shopping</Link>
          </Button>
        </div>

        {/* List */}
        {/* <Card className="rounded-2xl"> */}
        {/* <CardContent className="p-0"> */}
        <div className="divide-y space-y-1">
          {orders?.map((o) => (
            <OrderItem key={o.id} item={o} />
          ))}
        </div>
        {/* </CardContent> */}
        {/* </Card> */}

        {/* Empty state (optional) */}
        {orders?.length === 0 && (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">No orders yet.</p>
              <Button asChild>
                <Link href="/">Start shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
