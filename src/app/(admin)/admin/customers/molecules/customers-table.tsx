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
import { useListUsers } from "@/queries/admin";
import Person from "./person";
import { User } from "@/types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import StatusBadge, { OrderStatus } from "../../../../../components/status";

export default function CustomersTable() {
  const { data, isLoading, error } = useListUsers();

  const users = data?.data ?? [];

  console.log("returning", users);
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>customer</TableHeaderCell>
            <TableHeaderCell>email address</TableHeaderCell>
            <TableHeaderCell>total orders</TableHeaderCell>
            <TableHeaderCell>total spent</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map(
            (
              user: User & { id: string; status?: OrderStatus; role?: string },
            ) => (
              <TableRow key={user.id}>
                <TableCell className="px-6 py-4 font-medium text-gray-900">
                  <Person
                    fname={user.firstName}
                    lname={user.lastName}
                    email={user.email}
                  />
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>10</TableCell>
                <TableCell>$100.00</TableCell>
                <TableCell>
                  <StatusBadge status={user?.status ?? "active"} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={user?.role ?? "customer"} />
                </TableCell>

                <TableCell>
                  <Link
                    href={`/admin/customers/${user.id}`}
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
