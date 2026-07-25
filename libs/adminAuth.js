import { verifyToken, isAuthorizedAdmin } from "@/libs/auth";
import { cookies } from "next/headers";

/**
 * Verify admin authentication from cookie.
 * Returns the admin email if authenticated, or throws a Response error.
 */
export async function requireAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Response(
      JSON.stringify({ error: "Authentication required" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const payload = await verifyToken(token);
  if (!payload || !isAuthorizedAdmin(payload.email)) {
    throw new Response(
      JSON.stringify({ error: "Unauthorized: Admin access required" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  return payload.email;
}
