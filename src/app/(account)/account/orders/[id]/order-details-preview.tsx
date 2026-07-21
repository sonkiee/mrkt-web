"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { Order, OrderItem } from "@/types";
import { useParams } from "next/navigation";
import { useGetUserOrderDetails } from "@/queries";
import { date } from "@/utils/date";
import StatusBadge from "@/components/status";
import { naira } from "@/utils/naira";

export default function OrderDetailsPreview() {
  const { id } = useParams();
  console.log("Order ID from params:", id);

  const { data, isLoading } = useGetUserOrderDetails(id as string); // you will implement this later to fetch real data
  const order = data?.data as Order | undefined; // adjust based on your actual API response structure

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  console.log("Fetched order details:", data);

  const canCancel = order?.status === "processing";
  const canReorder = order?.status === "delivered";

  const placedOn = date(order.createdAt);

  return (
    <main className="bg-[#F5F5F7] min-h-screen">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 space-y-6">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/account/orders" aria-label="Back to orders">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Order #{order.id.slice(0, 8)}
              </h1>
              <p className="text-sm text-muted-foreground">
                Placed on {date(order.createdAt, false)}
                {/* • {order.itemsCount}{" "} */}
                {/* item(s) */}
              </p>
            </div>
          </div>

          <StatusBadge status={order?.status} />
        </div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Items */}
          <Card className="lg:col-span-2 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Items</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-5">
                {order?.items?.map((item, index) => (
                  <PreviewItemRow key={index} item={item} />
                ))}
              </div>

              {(canCancel || canReorder) && (
                <>
                  <Separator />
                  <div className="flex flex-col sm:flex-row gap-3">
                    {canReorder && (
                      <Button className="sm:w-auto">Reorder</Button>
                    )}
                    {canCancel && (
                      <Button variant="outline" className="sm:w-auto">
                        Cancel order
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="rounded-2xl h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <Row label="Order ID" value={order.id} mono />
              <Row label="Date" value={placedOn} />
              <Row
                label="Items"
                value={`${order.items?.length ?? 0} item(s)`}
              />
              <Row label="Total" value={naira(Number(order.total ?? 0))} />
              {order.shippingAddressSnapshot && (
                <Row
                  label="Ship to"
                  value={[
                    order.shippingAddressSnapshot.address,
                    order.shippingAddressSnapshot.city,
                    order.shippingAddressSnapshot.state,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                />
              )}

              <Row label="Payment" value={"Paystack"} />

              <Separator />
              <Button asChild variant="outline" className="w-full">
                <Link href="/support">Contact support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

/* -------------------- Order List Page (Preview) -------------------- */

/* -------------------- Small helpers -------------------- */

function PreviewItemRow({ item }: { item: OrderItem }) {
  const qty = item.qty ?? 1;
  const price = Number(item.unitPrice ?? 0);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {item.productTitleSnapshot}
        </p>
        <p className="text-xs text-muted-foreground">Qty {qty ?? 0}</p>
      </div>

      <p className="text-sm font-semibold whitespace-nowrap">{naira(price)}</p>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 min-w-0">
      <span className="text-muted-foreground whitespace-nowrap">{label}</span>
      <span
        className={[
          "text-right min-w-0",
          mono ? "font-mono break-all" : "",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
