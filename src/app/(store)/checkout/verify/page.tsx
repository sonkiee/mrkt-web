"use client";

import Spinner from "@/components/spinner";
import Failed from "./failed";
import Success from "./success";
import { useSearchParams } from "next/navigation";
import { useFetchPaymentStatus } from "@/queries/payment";
import { useCartStore } from "@/store";
import { useEffect, useRef } from "react";
import { stat } from "fs";

export default function VerifyPage() {
  const sp = useSearchParams();

  const trxref = sp.get("trxref") || sp.get("reference"); // support both query params for flexibility.
  const reason = sp.get("reason"); // "cancelled" | "error" | etc.
  const orderId = sp.get("orderId");

  const clear = useCartStore((s) => s.clear);
  const clearRef = useRef(false);

  const { data, isError, isPending, error } = useFetchPaymentStatus(
    trxref as string,
  );

  const status = data?.payment?.status;

  useEffect(() => {
    if (status === "success" && !clearRef.current) {
      clearRef.current = true;
      clear(); // clear cart on successful payment
    }
  }, [status, clear]);

  if (reason === "cancelled") {
    return (
      <CenterWrapper>
        <Failed reference={trxref ?? orderId ?? "cancelled"} />
      </CenterWrapper>
    );
  }

  if (!trxref) {
    return (
      <CenterWrapper>
        <h1 className="text-lg font-medium text-gray-800">
          Invalid Transaction Reference
        </h1>
      </CenterWrapper>
    );
  }

  if (isPending) {
    return (
      <CenterWrapper>
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <p className="text-sm text-gray-500">Verifying your payment...</p>
        </div>
      </CenterWrapper>
    );
  }

  if (isError) {
    return (
      <CenterWrapper>
        <p className="text-sm text-red-600">
          {error?.message || "Something went wrong."}
        </p>
      </CenterWrapper>
    );
  }

  if (status === "failed" || status === "cancelled" || status === "abandoned") {
    return (
      <CenterWrapper>
        <Failed reference={trxref} />
      </CenterWrapper>
    );
  }

  if (status === "success") {
    clear(); // clear cart on successful payment
    return (
      <CenterWrapper>
        <Success reference={trxref} />
      </CenterWrapper>
    );
  }

  // fallback if API returns unexpected shape/status
  return (
    <CenterWrapper>
      <p className="text-sm text-gray-600">
        Unable to determine payment status.
      </p>
    </CenterWrapper>
  );
}

const CenterWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[70vh] flex items-center justify-center bg-[#F5F5F7] ">
    <div className="w-full max-w-lg text-center">{children}</div>
  </div>
);
