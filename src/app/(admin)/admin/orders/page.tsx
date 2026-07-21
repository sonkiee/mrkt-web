import { Card } from "@/components/ui/card";
import OrdersTable from "./molecules/orders-table";

export default function OrdersPage() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Orders</h2>

      <div className="border rounded-md p-1 text-muted-foreground">
        <OrdersTable />
      </div>
    </Card>
  );
}
