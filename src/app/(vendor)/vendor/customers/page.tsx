"use client";

import { Search, UserCheck, Star, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VendorCustomersPage() {
  const customers = [
    {
      id: "CST-840",
      name: "Kamilu Isa",
      email: "kamilu.isa@outlook.com",
      orders: 8,
      spent: "₦1,420,000",
      lastOrder: "25 mins ago",
    },
    {
      id: "CST-839",
      name: "Blessing Audu",
      email: "blessing@gmail.com",
      orders: 3,
      spent: "₦112,000",
      lastOrder: "3 hours ago",
    },
    {
      id: "CST-838",
      name: "Bello Abubakar",
      email: "bello.abubakar@arewacorp.org",
      orders: 14,
      spent: "₦3,850,000",
      lastOrder: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Storefront Customers</h2>
        <p className="text-body-md text-on-surface-variant">
          View customer profiles, loyalty details, purchase histories, and contact cards.
        </p>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Customer ID</th>
                <th className="p-4 font-bold text-on-surface-variant">Full Name</th>
                <th className="p-4 font-bold text-on-surface-variant">Email Address</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Orders Placed</th>
                <th className="p-4 font-bold text-on-surface-variant text-right">Total Spent</th>
                <th className="p-4 font-bold text-on-surface-variant">Last Purchase</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-on-surface text-xs">{c.id}</td>
                  <td className="p-4 font-bold text-on-surface flex items-center gap-2">
                    <span className="p-1 bg-primary/10 text-primary rounded-md">
                      <UserCheck size={14} />
                    </span>
                    {c.name}
                  </td>
                  <td className="p-4 text-on-surface-variant">{c.email}</td>
                  <td className="p-4 text-center text-on-surface font-semibold">{c.orders} orders</td>
                  <td className="p-4 text-right text-primary font-bold">{c.spent}</td>
                  <td className="p-4 text-on-surface-variant">{c.lastOrder}</td>
                  <td className="p-4 text-center">
                    <Button size="sm" variant="ghost" className="text-xs text-primary hover:bg-primary/5 h-8">
                      View Logs
                    </Button>
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
