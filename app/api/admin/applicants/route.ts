import { createHash } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { mutateSheet } from "@/lib/google-sheets";
export async function PATCH(request: Request) {
  const email = process.env.ADMIN_EMAIL || "admin@srvc.ac.th"; const password = process.env.ADMIN_PASSWORD || "";
  const expected = createHash("sha256").update(`${email}:${password}:surin-dbt`).digest("hex");
  if (!password || (await cookies()).get("dbt_admin")?.value !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await request.json(); await mutateSheet("applicants", "update", { id, status });
  return NextResponse.json({ ok: true });
}
