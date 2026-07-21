"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Printer, Truck, Check, PackageOpen, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VendorOrderDetailsPage() {
  const params = useParams();
  const id = params?.id || "ORD-9421";

  const order = {
    id: id,
    customer: {
      name: "Kamilu Isa",
      email: "kamilu.isa@outlook.com",
      phone: "+234 803 987 6543",
    },
    shipping: {
      address: "14 Isa Kaita Road, Kaduna North",
      city: "Kaduna State",
      courier: "Lumina Standard Logistics",
    },
    items: [
      { name: "iPhone 13 Pro Max (128GB, Space Black)", price: "₦580,000", qty: 1, total: "₦580,000" },
    ],
    summary: {
      subtotal: "₦580,000",
      shippingFee: "₦2,500",
      commission: "-₦58,000 (10%)",
      payoutAmount: "₦524,500",
    },
    status: "Pending Dispatch",
    date: "July 6, 2026 11:34 AM",
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
              <Badge className="bg-status-warning/15 text-status-warning border-none text-xs font-bold px-2 py-0.5 rounded">
                {order.status}
              </Badge>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Order ID: <span className="font-mono font-semibold">{order.id}</span> • Placed {order.date}
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
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="p-4 font-semibold text-on-surface">{item.name}</td>
                      <td className="p-4 text-right text-on-surface-variant">{item.price}</td>
                      <td className="p-4 text-center text-on-surface">{item.qty}</td>
                      <td className="p-4 text-right text-on-surface font-bold">{item.total}</td>
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
                <span className="font-semibold text-on-surface">{order.summary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Fulfillment &amp; Courier Fee</span>
                <span className="font-semibold text-on-surface">{order.summary.shippingFee}</span>
              </div>
              <div className="flex justify-between text-status-error font-medium">
                <span>Lumina Platform Fee (10% commission)</span>
                <span>{order.summary.commission}</span>
              </div>
              <div className="flex justify-between border-t pt-3 font-bold text-primary text-base">
                <span>Final Store Earnings</span>
                <span>{order.summary.payoutAmount}</span>
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
                <span className="font-bold text-on-surface">{order.customer.name}</span>
              </div>
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Email</span>
                <span className="text-on-surface">{order.customer.email}</span>
              </div>
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Phone</span>
                <span className="text-on-surface font-semibold">{order.customer.phone}</span>
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
                <span className="text-on-surface leading-relaxed">{order.shipping.address}</span>
              </div>
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Region / State</span>
                <span className="text-on-surface font-semibold">{order.shipping.city}</span>
              </div>
              <div>
                <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Courier Hub</span>
                <span className="text-on-surface">{order.shipping.courier}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
