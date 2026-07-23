import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useFetchUserOrders } from "@/hooks/queries";
import { Order } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OrderItem from "../orders/_components/order-item";

const OrdersSection = ({ activeTab }: { activeTab: string }) => {
  const { data, isLoading } = useFetchUserOrders();
  const orders = data?.data as Order[] | undefined;

  if (activeTab !== "orders") return null;
  if (isLoading) return null;

  return (
    <div className="space-y-6">
      <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and manage your orders.</CardDescription>
            </CardHeader>
            <CardContent className="divide-y space-y-1">
              {orders?.length === 0 && <NoOrders />}

              {orders?.map((order) => (
                <OrderItem key={order.id} item={order} />
              ))}
            </CardContent>
      </Card>
    </div>
  );
};

export default OrdersSection;

const NoOrders = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <h2 className="text-lg font-semibold">No Orders Yet</h2>
      <p className="text-sm  text-muted-foreground text-center">
        Looks like you haven&apos;t made any orders yet. Start shopping to see
        your orders here!
      </p>
      <Link href="/" className="mt-4">
        <Button variant="outline">Start Shopping</Button>
      </Link>
    </div>
  );
};
