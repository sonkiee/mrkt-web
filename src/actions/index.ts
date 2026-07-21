import { actionClient } from "@/lib/safe-action";
import {
  createOrderSchema,
  initPaymentSchema,
  signinSchema,
  signupSchema,
} from "@/schema";
import { api } from "@/lib/axios";

export const signin = actionClient
  .inputSchema(signinSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/auth/signin", parsedInput);
    return response.data;
  });

export const signup = actionClient
  .inputSchema(signupSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/auth/signup", parsedInput);
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
  const response = await api.post("/auth/logout");
  return response.data;
});
