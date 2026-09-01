import { createHash } from "crypto";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const { email, password } = await request.json();
  const validEmail = process.env.ADMIN_EMAIL || "admin@srvc.ac.th";
  const validPassword = process.env.ADMIN_PASSWORD || "";
  if (!validPassword || email !== validEmail || password !== validPassword) return NextResponse.json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
  const token = createHash("sha256").update(`${validEmail}:${validPassword}:surin-dbt`).digest("hex");
  const response = NextResponse.json({ ok: true });
  response.cookies.set("dbt_admin", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 28800, path: "/" });
  return response;
}
