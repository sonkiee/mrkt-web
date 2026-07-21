import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function Failed({ reference }: { reference: string }) {
  return (
    <div className="min-h-[70vh] pt-5 flex items-center justify-center bg-[#F5F5F7] px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="bg-red-100 p-3 rounded-full">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            Payment Unsuccessful
          </h1>

          <p className="text-sm text-gray-500 max-w-sm">
            We couldn’t process your payment. Please verify your card details,
            ensure sufficient funds are available, and try again.
          </p>
        </div>

        {/* Order Info */}

        <div className="flex justify-between items-start gap-4 min-w-0">
          <span className="text-gray-500 whitespace-nowrap">Order ID</span>

          <span className="font-mono text-gray-800 text-right break-all min-w-0">
            {reference}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button className="w-full">Try Again</Button>

          <Button variant="outline" className="w-full">
            Back to Store
          </Button>
        </div>
      </div>
    </div>
  );
}
