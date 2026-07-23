import { actionClient } from "@/lib/safe-action";
import * as z from "zod";
import {
  createOrderSchema,
  initPaymentSchema,
  profileSchema,
  signinSchema,
  signupSchema,
  vendorOnboardingSchema,
  vendorProfileSchema,
} from "@/schema";
import { api } from "@/lib/axios";
import { setAuthToken, removeAuthToken } from "@/utils/cookies";
import { useCartStore } from "@/store";

const clear = useCartStore.getState().clear;

export const submitVendorOnboarding = actionClient
  .inputSchema(vendorOnboardingSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/vendor/onboarding", parsedInput);
    return response.data;
  });

export const signin = actionClient
  .inputSchema(signinSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/auth/signin", parsedInput);
    const token = response.data?.token || response.data?.accessToken;
    if (token) {
      await setAuthToken(token);
    }
    return response.data;
  });

export const signup = actionClient
  .inputSchema(signupSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/auth/signup", parsedInput);
    const token = response.data?.token || response.data?.accessToken;
    if (token) {
      await setAuthToken(token);
    }
    return response.data;
  });

export const createOrder = actionClient
  .inputSchema(createOrderSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/orders", parsedInput);
    return response.data;
  });

export const updateProfile = actionClient
  .inputSchema(profileSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.put("/user/profile", parsedInput);
    return response.data;
  });

export const placeOrder = actionClient
  .inputSchema(initPaymentSchema)
  .action(async ({ parsedInput }) => {
    const { orderId } = parsedInput;
    const response = await api.post("/order/payment/init", { orderId });
    return response.data;
  });

export const updateVendorProfile = actionClient
  .inputSchema(vendorProfileSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.put("/vendor/profile", parsedInput);
    return response.data;
  });

export const logout = actionClient.action(async () => {
  try {
    await api.post("/auth/logout");
  } catch {
    // Continue deleting cookie even if server request fails
  }
  await removeAuthToken();
  clear();
  return { success: true };
});

export const requestPayoutAction = actionClient
  .inputSchema(
    z.object({
      amount: z.coerce.number().positive("Amount must be a positive number"),
    })
  )
  .action(async ({ parsedInput }) => {
    const response = await api.post("/payouts/request", parsedInput);
    return response.data;
  });

export const updateVendorStatusAction = actionClient
  .inputSchema(
    z.object({
      id: z.string().uuid("Invalid vendor ID"),
      status: z.enum(["PENDING", "APPROVED", "REJECTED", "SUSPENDED"]),
    })
  )
  .action(async ({ parsedInput }) => {
    const { id, status } = parsedInput;
    const response = await api.put(`/admin/vendors/${id}/status`, { status });
    return response.data;
  });
