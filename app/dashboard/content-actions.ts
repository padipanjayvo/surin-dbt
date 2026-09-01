"use server";

import { revalidatePath } from "next/cache";
import { mutateSheet } from "@/lib/google-sheets";
import { requireAdmin } from "@/lib/admin-auth";

export async function saveProgram(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const payload = { level: String(formData.get("level") || "").trim(), name: String(formData.get("name") || "").trim(), description: String(formData.get("description") || "").trim(), duration: String(formData.get("duration") || "").trim(), sort_order: Number(formData.get("sort_order") || 0) };
  if (!payload.level || !payload.name) throw new Error("กรุณากรอกระดับและชื่อหลักสูตร");
  await mutateSheet("programs", id ? "update" : "create", id ? { id, ...payload } : payload);
  revalidatePath("/"); revalidatePath("/programs"); revalidatePath("/dashboard/programs");
}

export async function deleteProgram(formData: FormData) {
  await requireAdmin();
  await mutateSheet("programs", "delete", { id: String(formData.get("id")) });
  revalidatePath("/"); revalidatePath("/programs"); revalidatePath("/dashboard/programs");
}

export async function saveTeacher(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const payload = { name: String(formData.get("name") || "").trim(), position: String(formData.get("position") || "").trim(), image_url: String(formData.get("image_url") || "").trim() || null, sort_order: Number(formData.get("sort_order") || 0) };
  if (!payload.name) throw new Error("กรุณากรอกชื่อบุคลากร");
  await mutateSheet("teachers", id ? "update" : "create", id ? { id, ...payload } : payload);
  revalidatePath("/teachers"); revalidatePath("/dashboard/teachers");
}

export async function deleteTeacher(formData: FormData) {
  await requireAdmin();
  await mutateSheet("teachers", "delete", { id: String(formData.get("id")) });
  revalidatePath("/teachers"); revalidatePath("/dashboard/teachers");
}
