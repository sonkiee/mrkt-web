import { date } from "@/utils/date";

export default function PaymentInfo({
  payment,
}: {
  payment?: {
    createdAt?: string;
    provider?: string;
  };
}) {
  return (
    <div className="bg-white rounded-xl border">
      <div className="px-6 py-4 border-b">
        <h3 className="font-bold">Payment Information</h3>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-slate-400 uppercase font-bold">
            Date & Time
          </p>

          <p className="font-medium">{date(payment?.createdAt ?? "")}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400 uppercase font-bold">
            Payment Method
          </p>

          <p className="font-medium">{payment?.provider}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400 uppercase font-bold">
            Descriptor
          </p>

          <p className="text-sm text-muted-foreground">No description</p>
        </div>

        <div>
          <p className="text-xs text-slate-400 uppercase font-bold">Currency</p>

          <p className="font-medium">NGN</p>
        </div>
      </div>
    </div>
  );
}
