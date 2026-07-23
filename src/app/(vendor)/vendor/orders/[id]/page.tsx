"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Printer, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFetchVendorOrderDetails } from "@/hooks/queries";
import { naira } from "@/utils/naira";
import { date } from "@/utils/date";

export default function VendorOrderDetailsPage() {
  const params = useParams();
  const id = (params?.id as string) || "";

  const { data, isLoading, error } = useFetchVendorOrderDetails(id);

  const orderData = data?.data || data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="p-6 text-center text-status-error bg-status-error/5 border border-status-error/15 rounded-xl text-sm">
        Failed to load order details. Please try again later.
      </div>
    );
  }

  // Resilient mapping of items
  const items = (orderData.items || [orderData]).map((item: any) => ({
    name: item.productTitleSnapshot || item.name || "Product details",
    price: Number(item.unitPrice || item.price || item.total || 0),
    qty: item.qty || 1,
    total: Number(item.total || (Number(item.unitPrice || 0) * (item.qty || 1)) || 0),
  }));

  // Calculations
  const subtotal = items.reduce((acc: number, item: any) => acc + item.total, 0);
  const shippingFee = Number(orderData.shippingFee || orderData.order?.shippingFee || 0);
  const commission = subtotal * 0.1;
  const payoutAmount = subtotal - commission;

  // Buyer Name
  const getBuyerName = (item: any) => {
    if (item.buyerName) return item.buyerName;
    if (item.customerName) return item.customerName;
    if (item.order?.shippingAddressSnapshot) {
      const { firstName, lastName } = item.order.shippingAddressSnapshot;
      return `${firstName || ""} ${lastName || ""}`.trim() || "Customer";
    }
    if (item.shippingAddressSnapshot) {
      const { firstName, lastName } = item.shippingAddressSnapshot;
      return `${firstName || ""} ${lastName || ""}`.trim() || "Customer";
    }
    if (item.user) {
      return `${item.user.firstName || ""} ${item.user.lastName || ""}`.trim() || item.user.email || "Customer";
    }
    return "Customer";
  };

  const getBuyerEmail = (item: any) => {
    return item.customerEmail || item.customer?.email || item.order?.user?.email || item.user?.email || "N/A";
  };

  const getBuyerPhone = (item: any) => {
    return item.customerPhone || item.customer?.phone || item.order?.shippingAddressSnapshot?.phone || item.shippingAddressSnapshot?.phone || "N/A";
  };

  const getShippingAddress = (item: any) => {
    const snap = item.shippingAddressSnapshot || item.order?.shippingAddressSnapshot;
    if (snap) {
      return snap.address || snap.addressLine || `${snap.street || ""} ${snap.city || ""}`;
    }
    return item.shippingAddress || item.order?.shippingAddress || "N/A";
  };

  const getShippingCityState = (item: any) => {
    const snap = item.shippingAddressSnapshot || item.order?.shippingAddressSnapshot;
    if (snap) {
      return `${snap.city || ""}, ${snap.state || ""}`.trim().replace(/^,\s*|,\s*$/g, "") || "N/A";
    }
    return item.shippingCity || item.order?.shippingCity || "N/A";
  };

  const getShippingCourier = (item: any) => {
    return item.shippingMethod || item.order?.deliveryMethod || "Lumina Standard Logistics";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div className="flex items-center gap-3">
          <Link href="/vendor/orders">
            <Button variant="outline" className="border-outline-variant hover:bg-surface-container-high h-9 w-9 p-0">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-headline-lg font-bold text-on-surface">Order Details</h2>
              <Badge
                className={`border-none ${
                  orderData.status === "delivered" || orderData.status === "success"
                    ? "bg-status-success/15 text-status-success"
                    : orderData.status === "shipped"
                      ? "bg-primary/15 text-primary"
                      : "bg-status-warning/15 text-status-warning"
                } text-xs px-2.5 py-0.5 rounded font-bold capitalize`}
              >
                {orderData.status || "pending"}
              </Badge>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Order ID: <span className="font-mono font-semibold">{orderData.orderNumber || orderData.id || id}</span> • Placed {orderData.createdAt ? date(orderData.createdAt) : "N/A"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-outline-variant hover:bg-surface-container-high h-9">
            <Printer size={16} className="mr-1.5" /> Print Packing Slip
          </Button>
          <Button className="bg-primary text-on-primary hover:opacity-95 h-9">
            <Truck size={16} className="mr-1.5" /> Dispatch Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-headline-md font-bold text-on-surface">Items to Dispatch</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b text-xs font-bold text-on-surface-variant">
                    <th className="p-4">Product details</th>
                    <th className="p-4 text-right">Price</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm">
                  {items.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="p-4 font-semibold text-on-surface">{item.name}</td>
                      <td className="p-4 text-right text-on-surface-variant">{naira(item.price)}</td>
                      <td className="p-4 text-center text-on-surface">{item.qty}</td>
                      <td className="p-4 text-right text-on-surface font-bold">{naira(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Financial summary */}
          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-headline-md font-bold text-on-surface">Payout Estimation Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-semibold text-on-surface">{naira(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Fulfillment &amp; Courier Fee</span>
                <span className="font-semibold text-on-surface">{naira(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-status-error font-medium">
                <span>Lumina Platform Fee (10% commission)</span>
                <span>-{naira(commission)}</span>
              </div>
              <div className="flex justify-between border-t pt-3 font-bold text-primary text-base">
                <span>Final Store Earnings</span>
                <span>{naira(payoutAmount)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer and shipping details */}
        <div className="space-y-6">
          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-headline-md font-bold text-on-surface">Customer Contact</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3 text-sm">
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Name</span>
                <span className="font-bold text-on-surface">{getBuyerName(orderData)}</span>
              </div>
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Email</span>
                <span className="text-on-surface">{getBuyerEmail(orderData)}</span>
              </div>
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Phone</span>
                <span className="text-on-surface font-semibold">{getBuyerPhone(orderData)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-headline-md font-bold text-on-surface">Delivery Address</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3 text-sm">
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Address</span>
                <span className="text-on-surface leading-relaxed">{getShippingAddress(orderData)}</span>
              </div>
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Region / State</span>
                <span className="text-on-surface font-semibold">{getShippingCityState(orderData)}</span>
              </div>
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Courier Hub</span>
                <span className="text-on-surface">{getShippingCourier(orderData)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
