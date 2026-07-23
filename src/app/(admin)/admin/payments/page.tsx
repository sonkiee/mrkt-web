import { Card } from "@/components/ui/card";
import PaymentsTable from "./_components/payments-table";

export default function PaymentsPage() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Payments</h2>

      <div className="border rounded-md p-1 text-muted-foreground">
        <PaymentsTable />
      </div>
    </Card>
  );
}
