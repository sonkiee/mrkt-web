"use server";

import { cookies as nextcookies } from "next/headers";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  path: "/",
};

export const cookies = async (value: string) => {
  const store = await nextcookies();
  store.set("access_token", value, options);
};
