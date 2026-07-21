"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type AuthRequiredDetail = { status: number };

export function AuthGateListener() {
  const r = useRouter();
  const p = usePathname();

  useEffect(() => {
    const handler = (event: Event) => {
      if (p.startsWith("/signin")) {
        // Already on signin page, no need to redirect again
        return;
      }

      const { status } = (event as CustomEvent<AuthRequiredDetail>).detail;
      console.warn("Auth-required, status:", status);
      toast.warning("Your session has expired. Please log in again.");

      setTimeout(() => {
        window.location.href = `/signin?callback=${encodeURIComponent(window.location.pathname)}`;
      }, 2000);
    };

    window.addEventListener("auth:required", handler);
    return () => window.removeEventListener("auth:required", handler);
  }, [r, p]);

  return null;
}
