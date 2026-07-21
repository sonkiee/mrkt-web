import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserRoleFromToken } from "@/utils/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;
  const role = token ? getUserRoleFromToken(token) : null;
  // console.log("Middleware: ", { pathname, token, role });

  // 1. Guard Admin Routes: Only 'admin' role allowed
  if (pathname.startsWith("/admin")) {
    if (!token || role !== "admin") {
      const signinUrl = new URL("/signin", req.url);
      signinUrl.searchParams.set("callback", pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // 2. Guard Vendor Routes: Only 'vendor' role allowed
  if (pathname.startsWith("/vendor")) {
    if (!token || role !== "vendor") {
      const signinUrl = new URL("/signin", req.url);
      signinUrl.searchParams.set("callback", pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // 3. Guard Account Routes: Must be authenticated
  if (pathname.startsWith("/account")) {
    if (!token) {
      const signinUrl = new URL("/signin", req.url);
      signinUrl.searchParams.set("callback", pathname);
      return NextResponse.redirect(signinUrl);
    }
  }

  // 4. Redirect Authenticated Users Away from Auth Pages
  if ((pathname === "/signin" || pathname === "/signup") && token && role) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (role === "vendor") {
      return NextResponse.redirect(new URL("/vendor", req.url));
    }
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/signin",
    "/signup",
    "/admin/:path*",
    "/vendor/:path*",
  ],
};
