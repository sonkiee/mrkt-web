import { date } from "@/utils/date";
import StatusBadge, { OrderStatus } from "../../../../../components/status";

export default function OrderHeader({
  order,
}: {
  order?: { status?: OrderStatus; createdAt?: string };
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-black tracking-tight">
            Order #ORD-8821
          </h1>

          <StatusBadge status={order?.status ?? "pending"} />
        </div>

        <p className="text-slate-500 text-base">
          Placed on {date(order?.createdAt ?? "")}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="px-5 h-11 rounded-xl border text-sm font-bold">
          Print Invoice
        </button>

        <button className="px-5 h-11 rounded-xl border text-red-600 text-sm font-bold">
          Refund Order
        </button>

        <button className="px-6 h-11 rounded-xl bg-primary text-white text-sm font-bold">
          Track Shipment
        </button>
      </div>
    </div>
  );
}
