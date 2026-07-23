"use client";

import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchVendorProfile = () => {
  return useQuery({
    queryKey: ["vendor-profile"],
    queryFn: async () => {
      const response = await api.get("/vendors/profile");
      return response.data;
    },
  });
};

export const useFetchVendorOrders = () => {
  return useQuery({
    queryKey: ["vendor-orders"],
    queryFn: async () => {
      const response = await api.get("/vendors/orders");
      return response.data;
    },
  });
};

export const useFetchVendorOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["vendor-orders", orderId],
    queryFn: async () => {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
  });
};

export const useFetchVendorBalance = () => {
  return useQuery({
    queryKey: ["vendor-balance"],
    queryFn: async () => {
      const response = await api.get("/payouts/balance");
      return response.data;
    },
  });
};

export const useFetchVendorBank = () => {
  return useQuery({
    queryKey: ["vendor-bank"],
    queryFn: async () => {
      const response = await api.get("/payouts/bank");
      return response.data;
    },
  });
};

export const useFetchVendorPayouts = () => {
  return useQuery({
    queryKey: ["vendor-payouts"],
    queryFn: async () => {
      const response = await api.get("/payouts/requests");
      return response.data;
    },
  });
};

export const useFetchVendorReviews = (vendorId: string) => {
  return useQuery({
    queryKey: ["vendor-reviews", vendorId],
    queryFn: async () => {
      const response = await api.get(`/reviews/vendor/${vendorId}`);
      return response.data;
    },
    enabled: !!vendorId,
  });
};

export const useFetchVendorDashboardStats = () => {
  return useQuery({
    queryKey: ["vendor-dashboard-stats"],
    queryFn: async () => {
      const response = await api.get("/vendors/dashboard");
      return response.data;
    },
  });
};
