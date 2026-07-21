"use client";

import { useGetPaymentById } from "@/queries/admin";
import CustomerCard from "../../customers/molecules/customer-card";
import PaymentInfo from "../molecules/payment-info";
import SecurityAudit from "../molecules/security-audit";
import TransactionHeader from "../molecules/transaction-header";
import TransactionSummary from "../molecules/transaction-summary";
import { useParams } from "next/navigation";

export default function TransactionDetailsPage() {
  const { paymentId } = useParams();
  const {
    data: payment,
    isLoading,
    error,
  } = useGetPaymentById(paymentId as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading payment details...</p>
      </div>
    );
  }

  console.log("Payment ID from URL:", paymentId); // ✅ Debug URL param
  console.log("Payment data:", payment); // ✅ Debug fetched data
  return (
    <div className="max-w-6xl mx-auto w-full p-4 md:p-10 space-y-8">
      <TransactionHeader status={payment.data?.status} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TransactionSummary />
          <PaymentInfo payment={payment.data} />
        </div>

        <div className="space-y-8">
          <CustomerCard customer={payment.data?.user} />
          <SecurityAudit />
        </div>
      </div>
    </div>
  );
}
