import { NextResponse } from "next/server";
import { mutateSheet } from "@/lib/google-sheets";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (["full_name", "citizen_id", "phone", "level"].some((key) => !String(body[key] || "").trim())) return NextResponse.json({ error: "กรอกข้อมูลไม่ครบ" }, { status: 400 });
    if (!/^\d{13}$/.test(String(body.citizen_id))) return NextResponse.json({ error: "เลขบัตรประชาชนต้องมี 13 หลัก" }, { status: 400 });
    await mutateSheet("applicants", "create", { ...body, status: "pending" }, true);
    return NextResponse.json({ ok: true });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด" }, { status: 500 }); }
}
