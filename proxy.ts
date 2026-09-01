import { createHash } from "crypto";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const email = process.env.ADMIN_EMAIL || "admin@srvc.ac.th";
  const password = process.env.ADMIN_PASSWORD || "";
  const expected = password ? createHash("sha256").update(`${email}:${password}:surin-dbt`).digest("hex") : "";
  const user = Boolean(expected && request.cookies.get("dbt_admin")?.value === expected);
  const path = request.nextUrl.pathname;

  if (!user && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (user && path === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/login"] };
