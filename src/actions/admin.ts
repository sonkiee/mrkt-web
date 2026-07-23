import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import {
  createProductSchema,
  deleteImageSchema,
  inviteAdminSchema,
  updateProductSchema,
  createBrandSchema,
  createCategorySchema,
  updateCategorySchema,
} from "@/schema";
import { api } from "@/lib/axios";

export const createProduct = actionClient
  .inputSchema(createProductSchema)
  .action(async ({ parsedInput }) => {
    const formData = new FormData();

    const { files, ...rest } = parsedInput;

    formData.append("data", JSON.stringify(rest));

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await api.post("/admin/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  });

export const deleteImage = actionClient
  .inputSchema(deleteImageSchema)
  .action(async ({ parsedInput: { imageId, productId } }) => {
    const response = await api.delete(
      `/admin/products/${productId}/images/${imageId}`,
    );
    return response.data;
  });

export const updateProduct = actionClient
  .inputSchema(updateProductSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...rest } = parsedInput;
    const formData = new FormData();

    const { files, ...dataWithoutFiles } = rest;

    formData.append("data", JSON.stringify(dataWithoutFiles));

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await api.post(`/admin/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  });

export const inviteAdmin = actionClient
  .inputSchema(inviteAdminSchema)
  .action(async ({ parsedInput: { email } }) => {
    const response = await api.post("/admin/promote", { email });
    return response.data;
  });

export const createBrand = actionClient
  .inputSchema(createBrandSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/admin/brands", parsedInput);
    return response.data;
  });

export const createVendorBrand = actionClient
  .inputSchema(createBrandSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/vendor/brands", parsedInput);
    return response.data;
  });

export const createCategoryAction = actionClient
  .inputSchema(createCategorySchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/admin/categories", parsedInput);
    return response.data;
  });

export const updateCategoryAction = actionClient
  .inputSchema(updateCategorySchema)
  .action(async ({ parsedInput }) => {
    const { id, ...rest } = parsedInput;
    const response = await api.put(`/admin/categories/${id}`, rest);
    return response.data;
  });

export const updateVendorByAdminAction = actionClient
  .inputSchema(
    z.object({
      id: z.string().uuid("Invalid vendor ID"),
      businessName: z.string().min(1, "Business name is required"),
      businessEmail: z.string().email("Invalid email address"),
      phone: z.string().min(1, "Phone number is required"),
      description: z.string().optional(),
      address: z.string().optional(),
    })
  )
  .action(async ({ parsedInput }) => {
    const { id, ...rest } = parsedInput;
    const response = await api.put(`/admin/vendors/${id}`, rest);
    return response.data;
  });
