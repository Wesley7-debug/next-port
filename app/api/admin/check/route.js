import { verifyToken, isAuthorizedAdmin } from "@/libs/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload = await verifyToken(token);
    if (!payload || !isAuthorizedAdmin(payload.email)) {
      return new Response(JSON.stringify({ authenticated: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ authenticated: true, email: payload.email }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
