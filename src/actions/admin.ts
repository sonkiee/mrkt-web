import { actionClient } from "@/lib/safe-action";
import {
  createProductSchema,
  deleteImageSchema,
  inviteAdminSchema,
  updateProductSchema,
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
