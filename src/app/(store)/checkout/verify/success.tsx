import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function Success({ reference }: { reference: string }) {
  return (
    <div className="min-h-[70vh] pt-5 flex items-center justify-center bg-[#F5F5F7] px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="bg-emerald-100 p-3 rounded-full">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            Payment Successful
          </h1>

          <p className="text-sm text-gray-500 max-w-sm">
            Your payment has been confirmed. We’re preparing your order and will
            notify you when it ships.
          </p>
        </div>

        {/* Order Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 text-sm">
          <div className="flex justify-between items-start gap-4 min-w-0">
            <span className="text-gray-500 whitespace-nowrap">Order ID</span>

            <span className="font-mono text-gray-800 text-right break-all min-w-0">
              {reference}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
              Confirmed
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button className="w-full">View Order</Button>

          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </div>

        {/* Subtle helper text */}
        <p className="text-xs text-gray-400 text-center">
          If you don’t see your order in a few minutes, refresh or check your
          email for confirmation.
        </p>
      </div>
    </div>
  );
}
