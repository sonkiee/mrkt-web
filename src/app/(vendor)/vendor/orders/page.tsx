"use client";

import { useState } from "react";
import { Search, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useFetchVendorOrders } from "@/hooks/queries";
import { naira } from "@/utils/naira";
import { date } from "@/utils/date";
import Spinner from "@/components/spinner";

export default function VendorOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useFetchVendorOrders();

  const ord = data?.data ?? [];
  console.log("Vendor Orders:", ord);

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
      return (
        `${item.user.firstName || ""} ${item.user.lastName || ""}`.trim() ||
        item.user.email ||
        "Customer"
      );
    }
    return "Customer";
  };

  const filteredOrders = ord.filter((item: any) => {
    const term = searchTerm.toLowerCase();
    const orderId = (item.orderNumber || item.id || "").toLowerCase();
    const buyer = getBuyerName(item).toLowerCase();
    const product = (item.productTitleSnapshot || "").toLowerCase();
    return (
      orderId.includes(term) || buyer.includes(term) || product.includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">
            Store Orders
          </h2>
          <p className="text-body-md text-on-surface-variant">
            View customer purchases, dispatch items, and manage packing slips.
          </p>
        </div>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              size={16}
            />
            <Input
              placeholder="Search Order ID, buyer, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-surface-container-lowest border-outline-variant"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <div className="p-6 text-center text-status-error bg-status-error/5 border-t border-b border-status-error/15 text-sm">
              Failed to load vendor orders. Please try again later.
            </div>
          ) : (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b">
                  <th className="p-4 font-bold text-on-surface-variant">
                    Order ID
                  </th>
                  <th className="p-4 font-bold text-on-surface-variant">
                    Buyer Name
                  </th>
                  <th className="p-4 font-bold text-on-surface-variant">
                    Items Ordered
                  </th>
                  <th className="p-4 font-bold text-on-surface-variant text-right">
                    Total Price
                  </th>
                  <th className="p-4 font-bold text-on-surface-variant text-center">
                    Status
                  </th>
                  <th className="p-4 font-bold text-on-surface-variant">
                    Purchased Time
                  </th>
                  <th className="p-4 font-bold text-on-surface-variant text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs sm:text-sm">
                {filteredOrders.map((order: any) => (
                  <tr
                    key={order.id}
                    className="hover:bg-surface-container-low/40 transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-on-surface">
                      {order.orderNumber || order.id}
                    </td>
                    <td className="p-4 text-on-surface font-semibold">
                      {getBuyerName(order)}
                    </td>
                    <td className="p-4 text-on-surface-variant truncate max-w-[200px]">
                      {order.qty ? `${order.qty}x ` : ""}
                      {order.productTitleSnapshot || "Product details"}
                    </td>
                    <td className="p-4 text-right text-primary font-bold">
                      {naira(Number(order.total || order.unitPrice || 0))}
                    </td>
                    <td className="p-4 text-center">
                      <Badge
                        className={`border-none ${
                          order.status === "delivered" ||
                          order.status === "success"
                            ? "bg-status-success/15 text-status-success"
                            : order.status === "shipped"
                              ? "bg-primary/15 text-primary"
                              : "bg-status-warning/15 text-status-warning"
                        } text-xs px-2.5 py-0.5 rounded font-bold capitalize`}
                      >
                        {order.status || "pending"}
                      </Badge>
                    </td>
                    <td className="p-4 text-on-surface-variant">
                      {order.createdAt ? date(order.createdAt, false) : "N/A"}
                    </td>
                    <td className="p-4 text-center">
                      <Link href={`/vendor/orders/${order.orderId}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs text-primary hover:bg-primary/5 h-8"
                        >
                          <Eye size={14} className="mr-1" /> View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-8 text-center text-on-surface-variant"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <ShoppingCart
                          size={32}
                          className="text-on-surface-variant/40"
                        />
                        <p className="font-bold text-on-surface">
                          No Orders Found
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Any customer purchases will appear here.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
