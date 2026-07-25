import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "omnicargo-fallback-secret"
);

// Generate JWT token
export async function createToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(JWT_SECRET);
}

// Verify JWT token
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

// Check if email is an authorized admin
export function isAuthorizedAdmin(email) {
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase());
  return adminEmails.includes(email.toLowerCase());
}

// Verify admin password
export async function verifyPassword(password) {
  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!storedHash) return false;
  return bcrypt.compare(password, storedHash);
}

// Hash password (utility for setup)
export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}
