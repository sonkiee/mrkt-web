"use client";

import { Ellipsis, EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../molecules/table";
import { useFetchOrders } from "@/queries/admin";
import { naira } from "@/utils/naira";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import StatusBadge, { OrderStatus } from "../../../../../components/status";

export default function OrdersTable() {
  const { data, isLoading, error } = useFetchOrders();

  const orders = data?.data;

  console.log("returning", orders);
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>order id</TableHeaderCell>
            <TableHeaderCell>customer</TableHeaderCell>
            <TableHeaderCell>date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>total</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* <TableRow> */}
          {orders?.map(
            (order: {
              id?: string;
              user?: { firstName?: string };
              createdAt?: string;
              status?: OrderStatus;
              total?: number;
            }) => (
              <TableRow key={order.id}>
                <TableCell className="px-6 py-4 font-medium text-gray-900">
                  {order.id}
                </TableCell>
                <TableCell>{order.user?.firstName}</TableCell>
                <TableCell>
                  {new Date(order.createdAt ?? "").toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>{naira(order.total ?? 0)}</TableCell>
                <TableCell>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className={buttonVariants({
                      variant: "default",
                      size: "sm",
                    })}
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ),
          )}
          {/* </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}
