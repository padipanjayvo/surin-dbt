import { getRows } from "@/lib/google-sheets";

export async function GET() {
  await getRows("programs");
  return Response.json({ ok: true, at: new Date().toISOString() });
}
