"use client";

import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { dummyProducts, defaultCategories } from "@/constants/dummy-data";

export const useFetchProductById = (id: string) => {
  return useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      try {
        const response = await api.get(`/products/${id}`);
        if (response.data && response.data.data) {
          return response.data;
        }
      } catch (err) {
        console.warn("Using fallback for product detail:", id, err);
      }
      const found = dummyProducts.find((p) => p.id === id || p.slug === id);
      return found ? { data: found } : { data: null };
    },
  });
};

export const useFeatured = () => {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      try {
        const response = await api.get("/products?filter=featured");
        const data = response?.data?.data ?? response?.data ?? [];
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn("Using fallback for featured products:", err);
      }
      return dummyProducts.filter((p) => p.isNewArrival);
    },
    initialData: dummyProducts.filter((p) => p.isNewArrival),
  });
};

export const useProductBycategory = ({ slug }: { slug: string }) => {
  console.log("Hook called with category:", slug);

  return useQuery({
    queryKey: ["productsByCategory", slug],
    queryFn: async ({ queryKey }) => {
      const [, categoryName] = queryKey;
      console.log("Querying API for category:", categoryName);
      try {
        const response = await api.get(`/categories/name/${categoryName}`);
        const data = response?.data?.data ?? response?.data ?? [];
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn("Using fallback for category products:", categoryName, err);
      }
      return dummyProducts.filter(
        (p) =>
          p.category.slug === slug ||
          p.category.name.toLowerCase() === slug.toLowerCase(),
      );
    },
    enabled: !!slug,
  });
};

export const useListProducts = (filter: any) => {
  const qs = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined) {
      qs.append(key, String(value));
    }
  });
  console.log("Fetching products with params:", qs);
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      try {
        const response = await api.get(`/products?${qs.toString()}`);
        const data = response?.data?.data ?? response?.data ?? [];
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn("Using fallback for list products:", filter, err);
      }

      let list = [...dummyProducts];
      if (filter) {
        if (filter.category) {
          list = list.filter(
            (p) =>
              p.category.slug === filter.category ||
              p.category.name.toLowerCase() === filter.category.toLowerCase(),
          );
        }
        if (filter.brand) {
          list = list.filter((p) => p.brand.name.toLowerCase() === filter.brand.toLowerCase());
        }
        if (filter.search) {
          const q = filter.search.toLowerCase();
          list = list.filter(
            (p) => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q),
          );
        }
      }
      return list;
    },
    initialData: dummyProducts,
  });
};

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
