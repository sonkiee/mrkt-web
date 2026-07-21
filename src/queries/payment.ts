import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPaymentStatus = (reference: string) => {
  return useQuery({
    queryKey: ["payment-status", reference],
    queryFn: async () => {
      const response = await api.get(
        `/order/payment/verify?reference=${encodeURIComponent(reference)}`,
      );
      return response.data;
    },
    enabled: !!reference, // Only run if reference is provided
    // refetchInterval: 5000, // Poll every 5 seconds
  });
};
