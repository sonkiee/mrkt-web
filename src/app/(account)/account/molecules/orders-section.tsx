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
import { useFetchUserOrders } from "@/queries";
import { Order } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OrderItem from "../orders/molecules/order-item";

const OrdersSection = ({ activeTab }: { activeTab: string }) => {
  const router = useRouter();
  const { data, isLoading } = useFetchUserOrders();
  const orders = data?.data as Order[] | undefined;

  console.log("Orders fetched", orders);
  const is = orders;

  return (
    <>
      {activeTab === "orders" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and manage your orders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {!orders && <NoOrders />}

              {orders?.length &&
                orders
                  .slice(0, 3)
                  .map((order) => <OrderItem key={order.id} item={order} />)}
            </CardContent>
            <CardFooter className="flex justify-center">
              {is && (
                <Button
                  onClick={() => router.push("/account/orders")}
                  variant="outline"
                >
                  View All Orders
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </>
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
