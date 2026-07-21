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
