import StatusBadge, { OrderStatus } from "../../../../../components/status";

export default function TransactionHeader({
  status,
}: {
  status?: OrderStatus;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Transaction Details</h1>

          <StatusBadge status={status} />
        </div>

        <p className="text-slate-500 mt-2">ID: TXN-984210</p>
      </div>

      <div className="flex gap-3">
        <button className="px-5 h-11 border rounded-xl text-sm font-bold">
          Print
        </button>

        <button className="px-5 h-11 bg-primary text-white rounded-xl text-sm font-bold">
          Download Receipt
        </button>
      </div>
    </div>
  );
}
