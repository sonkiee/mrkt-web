export default function OrderItems({
  items,
}: {
  items?: {
    id?: string;
    productTitleSnapshot?: string;
    price?: number;
    quantity?: number;
  }[];
}) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <div className="px-6 py-5 border-b flex justify-between">
        <h3 className="text-lg font-bold">Line Items</h3>
        <span className="text-sm text-slate-500">3 Products</span>
      </div>

      <table className="w-full text-left">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4 text-center">Qty</th>
            <th className="px-6 py-4 text-right">Subtotal</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {items?.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-5 font-medium">
                {item.productTitleSnapshot}
              </td>
              {/* <td className="px-6 py-5">${item.price.toFixed(2)}</td>
              <td className="px-6 py-5 text-center">{item.quantity}</td>
              <td className="px-6 py-5 text-right font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
