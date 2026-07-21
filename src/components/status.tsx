import { Status } from "@/types";
import { Badge } from "./ui/badge";

export default function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700",
    paid: "bg-blue-100 text-blue-700",
    pending_payment: "bg-orange-100 text-orange-700",
    failed_payment: "bg-red-100 text-red-700",
    processing: "bg-purple-100 text-purple-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refunded: "bg-pink-100 text-pink-700",
    initiated: "bg-teal-100 text-teal-700",
    success: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    converted: "bg-yellow-100 text-yellow-700",
    abandoned: "bg-gray-100 text-gray-700",
  };

  const styles =
    statusStyles[status?.toLowerCase() ?? "inactive"] ||
    "bg-gray-100 text-gray-700";

  return (
    <Badge
      className={`inline-flex rounded-full ${styles} px-2 py-1 text-xs font-medium ${className || ""}`}
    >
      {status}
    </Badge>
  );
}
