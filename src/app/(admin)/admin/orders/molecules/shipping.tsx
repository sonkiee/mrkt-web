export default function ShippingSummaryCard({
  shipping,
}: {
  shipping?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}) {
  return (
    <div className="bg-white rounded-2xl border p-6 space-y-6">
      {/* Customer Info */}
      <div>
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-bold">Customer</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-xs text-slate-400 uppercase">Name</p>
            <p className="font-medium">
              {shipping?.firstName} {shipping?.lastName}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase">Email</p>
            <p>{shipping?.email}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase">Phone</p>
            <p>{shipping?.phone ?? "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div>
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-bold">Shipping</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-xs text-slate-400 uppercase">Address</p>
            <p className="font-medium">
              {shipping?.address ?? "Store Pickup"}
              <br />
              {shipping?.addressLine2 && (
                <>
                  {shipping.addressLine2}
                  <br />
                </>
              )}
              {shipping?.city}, {shipping?.state} {shipping?.zip}
              <br />
              {shipping?.country}
            </p>
          </div>
          {/* <div>
            <p className="text-xs text-slate-400 uppercase">Carrier</p>
            <p className="font-medium">{shipping?.carrier ?? "N/A"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase">Tracking Number</p>
            <p className="font-medium">{shipping?.trackingNumber ?? "N/A"}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
