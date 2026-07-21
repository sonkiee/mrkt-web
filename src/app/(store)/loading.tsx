import Spinner from "@/components/spinner";
import React from "react";

export const metadata = {
  title: "Account - DeMatrix",
};

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  );
}
