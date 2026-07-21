import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const JWT_SECRET = process.env.JWT_SECRET;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

async function me(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  // Authentication guards are temporarily disabled for development purposes.
  // Allow unrestricted access to all pages (Profile, Wishlist, Orders, dashboards, etc.).
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/signin", "/admin/:path*"],
};
