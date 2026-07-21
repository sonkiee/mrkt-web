"use client";

import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

import { defaultCategories } from "@/constants/dummy-data";

export const useFetchCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      try {
        const response = await api.get(`/categories`);
        const data = response?.data?.data ?? response?.data ?? [];
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn("Using fallback categories:", err);
      }
      return defaultCategories;
    },
    initialData: defaultCategories,
  });
};
