"use client";

import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await api.get("/user/profile");
      return response.data;
    },
  });
};

export const useGetUserAddress = () => {
  return useQuery({
    queryKey: ["user-address"],
    queryFn: async () => {
      const response = await api.get("/user/address");
      return response.data;
    },
  });
};

export const useFetchUserOrders = () => {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      const response = await api.get("/orders");
      return response.data;
    },
  });
};

export const useGetUserOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["user-orders", orderId],
    queryFn: async () => {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
  });
};

export const useGetProductById = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await api.get(`/product/${productId}`);
      return response.data;
    },
    enabled: !!productId,
  });
};

export const useFetchPaymentStatus = (reference: string) => {
  return useQuery({
    queryKey: ["payment-status", reference],
    queryFn: async () => {
      const response = await api.get(
        `/order/payment/verify?reference=${encodeURIComponent(reference)}`,
      );
      return response.data;
    },
    enabled: !!reference,
  });
};
