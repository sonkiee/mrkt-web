import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get("/admin/orders");
      return response.data;
    },
  });
};

export const useListPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await api.get("/admin/payments");
      return response.data;
    },
  });
};

export const useListCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response.data;
    },
  });
};

export const useListBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await api.get("/brands");
      return response.data;
    },
  });
};

export const useListUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get("/admin/users");
      return response.data;
    },
  });
};

export const useAdminListProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/vendors/products");
      return response.data;
    },
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await api.get(`/admin/users/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};

export const useGetPaymentById = (paymentId: string) => {
  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: async () => {
      const response = await api.get(`/admin/payments/${paymentId}`);
      return response.data;
    },
    enabled: !!paymentId,
  });
};

export const useGetOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["order-details", orderId],
    queryFn: async () => {
      const response = await api.get(`/admin/orders/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
  });
};

export const useListVendors = (status?: string) => {
  return useQuery({
    queryKey: ["vendors", status],
    queryFn: async () => {
      const response = await api.get("/admin/vendors", { params: { status } });
      return response.data;
    },
  });
};

export const useGetVendorById = (vendorId: string) => {
  return useQuery({
    queryKey: ["vendor", vendorId],
    queryFn: async () => {
      const response = await api.get(`/admin/vendors/${vendorId}`);
      return response.data;
    },
    enabled: !!vendorId,
  });
};
