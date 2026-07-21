export default function OrderSummary() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="text-lg font-bold mb-6">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$534.00</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>$15.00</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>$45.39</span>
        </div>
      </div>

      <div className="flex justify-between pt-4 mt-4 border-t font-bold text-lg">
        <span>Total</span>
        <span className="text-primary">$574.39</span>
      </div>
    </div>
  );
}
