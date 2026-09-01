"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function authenticatedClient() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

export async function saveProgram(formData: FormData) {
  const supabase = await authenticatedClient();
  const id = String(formData.get("id") || "");
  const payload = { level: String(formData.get("level") || "").trim(), name: String(formData.get("name") || "").trim(), description: String(formData.get("description") || "").trim(), duration: String(formData.get("duration") || "").trim(), sort_order: Number(formData.get("sort_order") || 0) };
  if (!payload.level || !payload.name) throw new Error("กรุณากรอกระดับและชื่อหลักสูตร");
  if (id) await supabase.from("programs").update(payload).eq("id", id); else await supabase.from("programs").insert(payload);
  revalidatePath("/"); revalidatePath("/programs"); revalidatePath("/dashboard/programs");
}

export async function deleteProgram(formData: FormData) {
  const supabase = await authenticatedClient();
  await supabase.from("programs").delete().eq("id", String(formData.get("id")));
  revalidatePath("/"); revalidatePath("/programs"); revalidatePath("/dashboard/programs");
}

export async function saveTeacher(formData: FormData) {
  const supabase = await authenticatedClient();
  const id = String(formData.get("id") || "");
  const payload = { name: String(formData.get("name") || "").trim(), position: String(formData.get("position") || "").trim(), image_url: String(formData.get("image_url") || "").trim() || null, sort_order: Number(formData.get("sort_order") || 0) };
  if (!payload.name) throw new Error("กรุณากรอกชื่อบุคลากร");
  if (id) await supabase.from("teachers").update(payload).eq("id", id); else await supabase.from("teachers").insert(payload);
  revalidatePath("/teachers"); revalidatePath("/dashboard/teachers");
}

export async function deleteTeacher(formData: FormData) {
  const supabase = await authenticatedClient();
  await supabase.from("teachers").delete().eq("id", String(formData.get("id")));
  revalidatePath("/teachers"); revalidatePath("/dashboard/teachers");
}
