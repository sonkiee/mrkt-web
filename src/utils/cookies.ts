"use server";

import { cookies as nextCookies } from "next/headers";

const COOKIE_NAME = "access_token";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  path: "/",
};

/**
 * Set the authentication token in an HTTP-only cookie
 */
export const setAuthToken = async (value: string) => {
  const store = await nextCookies();
  store.set(COOKIE_NAME, value, cookieOptions);
};

/**
 * Retrieve the authentication token from cookies
 */
export const getAuthToken = async (): Promise<string | undefined> => {
  const store = await nextCookies();
  return store.get(COOKIE_NAME)?.value;
};

/**
 * Remove the authentication token cookie (logout)
 */
export const removeAuthToken = async () => {
  const store = await nextCookies();
  store.delete(COOKIE_NAME);
};

// Backward compatibility alias
export const cookies = setAuthToken;
