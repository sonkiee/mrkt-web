export interface JWTPayload {
  id?: string;
  sub?: string;
  email?: string;
  role?: "admin" | "vendor" | "user" | string;
  exp?: number;
  [key: string]: any;
}

/**
 * Safely decodes a JWT payload across Node, Edge, and Browser runtimes.
 */
export function decodeJwtPayload(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    let jsonPayload: string;
    if (typeof atob === "function") {
      jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } else if (typeof Buffer !== "undefined") {
      jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    } else {
      return null;
    }

    const parsed = JSON.parse(jsonPayload);

    // Check expiration if exp is present
    if (parsed.exp && parsed.exp * 1000 < Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * Extracts the user role from a JWT token string.
 */
export function getUserRoleFromToken(token: string): string | null {
  const payload = decodeJwtPayload(token);
  return payload?.role || null;
}
