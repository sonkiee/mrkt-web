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
import { useListPayments } from "@/queries/admin";
import { date } from "@/utils/date";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import StatusBadge, { OrderStatus } from "../../../../../components/status";

export default function PaymentsTable() {
  const { data, isLoading, error } = useListPayments();

  const payments = data?.data || [];

  console.log("returning paymets", payments);
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>transaction id</TableHeaderCell>
            <TableHeaderCell>customer</TableHeaderCell>
            <TableHeaderCell>date</TableHeaderCell>
            <TableHeaderCell>amount</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments.map(
            (payment: {
              id?: string;
              user?: { firstName?: string };
              createdAt?: string;
              amount?: number;
              status?: OrderStatus;
            }) => (
              <TableRow key={payment.id}>
                <TableCell className="px-6 py-4 font-medium text-gray-900">
                  {payment.id}
                </TableCell>
                <TableCell>{payment.user?.firstName}</TableCell>
                <TableCell>{date(payment.createdAt ?? "")}</TableCell>
                <TableCell className="text-xs">{payment.amount}</TableCell>
                <TableCell>
                  <StatusBadge status={payment.status} />
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/payments/${payment.id}`}
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
        </TableBody>
      </Table>
    </div>
  );
}
