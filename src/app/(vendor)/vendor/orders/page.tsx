"use client";

import { useState } from "react";
import { Search, ShoppingCart, Eye, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function VendorOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      id: "ORD-9421",
      customer: "Kamilu Isa",
      amount: "₦145,000",
      items: "1x iPhone 13 Pro Max (128GB)",
      status: "Pending Dispatch",
      date: "25 mins ago",
    },
    {
      id: "ORD-9420",
      customer: "Blessing Audu",
      amount: "₦48,000",
      items: "2x Original Lightning Cable, 1x Power Adapter",
      status: "Shipped",
      date: "3 hours ago",
    },
    {
      id: "ORD-9419",
      customer: "Bello Abubakar",
      amount: "₦280,000",
      items: "1x Lenovo ThinkPad L14",
      status: "Delivered",
      date: "1 day ago",
    },
  ];

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Store Orders</h2>
          <p className="text-body-md text-on-surface-variant">
            View customer purchases, dispatch items, and manage packing slips.
          </p>
        </div>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <Input
              placeholder="Search Order ID, buyer, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-surface-container-lowest border-outline-variant"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Order ID</th>
                <th className="p-4 font-bold text-on-surface-variant">Buyer Name</th>
                <th className="p-4 font-bold text-on-surface-variant">Items Ordered</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Total Price</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Status</th>
                <th className="p-4 font-bold text-on-surface-variant">Purchased Time</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs sm:text-sm">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-on-surface">{order.id}</td>
                  <td className="p-4 text-on-surface font-semibold">{order.customer}</td>
                  <td className="p-4 text-on-surface-variant truncate max-w-[200px]">{order.items}</td>
                  <td className="p-4 text-right text-primary font-bold">{order.amount}</td>
                  <td className="p-4 text-center">
                    <Badge
                      className={`border-none ${
                        order.status === "Delivered"
                          ? "bg-status-success/15 text-status-success"
                          : order.status === "Shipped"
                            ? "bg-primary/15 text-primary"
                            : "bg-status-warning/15 text-status-warning"
                      } text-xs px-2.5 py-0.5 rounded font-bold`}
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-on-surface-variant">{order.date}</td>
                  <td className="p-4 text-center">
                    <Link href={`/vendor/orders/${order.id}`}>
                      <Button size="sm" variant="ghost" className="text-xs text-primary hover:bg-primary/5 h-8">
                        <Eye size={14} className="mr-1" /> View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
