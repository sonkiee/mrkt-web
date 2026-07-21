import { actionClient } from "@/lib/safe-action";
import {
  createOrderSchema,
  initPaymentSchema,
  signinSchema,
  signupSchema,
} from "@/schema";
import { api } from "@/lib/axios";
import { setAuthToken, removeAuthToken } from "@/utils/cookies";

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

export const placeOrder = actionClient
  .inputSchema(initPaymentSchema)
  .action(async ({ parsedInput }) => {
    const { orderId } = parsedInput;
    const response = await api.post("/order/payment/init", { orderId });
    return response.data;
  });

export const logout = actionClient.action(async () => {
  try {
    await api.post("/auth/logout");
  } catch {
    // Continue deleting cookie even if server request fails
  }
  await removeAuthToken();
  return { success: true };
});
