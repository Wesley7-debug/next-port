import { createToken } from "@/libs/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check email against authorized list
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase());
    if (!adminEmails.includes(email.toLowerCase())) {
      return new Response(JSON.stringify({ error: "Email not authorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create JWT token
    const token = await createToken({
      email,
      role: "admin",
      loginTime: Date.now(),
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return new Response(
      JSON.stringify({ success: true, message: "Login successful" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
