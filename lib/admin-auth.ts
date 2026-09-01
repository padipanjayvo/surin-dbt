import { createHash } from "crypto";
import { cookies } from "next/headers";
export async function requireAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@srvc.ac.th";
  const password = process.env.ADMIN_PASSWORD || "";
  const expected = createHash("sha256").update(`${email}:${password}:surin-dbt`).digest("hex");
  if (!password || (await cookies()).get("dbt_admin")?.value !== expected) throw new Error("Unauthorized");
}
