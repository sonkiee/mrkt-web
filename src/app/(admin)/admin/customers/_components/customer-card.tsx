export default function CustomerCard({
  customer,
}: {
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
}) {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">Customer</h3>

        {/* <button className="text-primary text-sm font-bold">Edit</button> */}
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <p className="text-xs text-slate-400 uppercase">Name</p>
          <p className="font-medium">
            {customer?.firstName} {customer?.lastName}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400 uppercase">Email</p>
          <p>{customer?.email}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400 uppercase">Phone</p>
          <p>{customer?.phone ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
