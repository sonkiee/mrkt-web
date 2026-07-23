export default function OrderTimeline() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="text-lg font-bold mb-6">Order Timeline</h3>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold">Package Delivered</p>
          <p className="text-xs text-slate-500">Oct 27, 2023 - 10:45 AM</p>
        </div>

        <div>
          <p className="text-sm font-bold">Shipped from Distribution Center</p>
          <p className="text-xs text-slate-500">Oct 25, 2023</p>
        </div>

        <div>
          <p className="text-sm font-bold">Order Confirmed</p>
          <p className="text-xs text-slate-500">Oct 24, 2023</p>
        </div>
      </div>
    </div>
  );
}
