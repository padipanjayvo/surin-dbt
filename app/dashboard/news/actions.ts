"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function makeSlug(title: string) {
  const base = title.toLowerCase().trim()
    .replace(/[^\u0E00-\u0E7Fa-z0-9\s-]/g, "")
    .replace(/\s+/g, "-").slice(0, 60);
  return `${base || "news"}-${Date.now().toString(36)}`;
}

export async function saveNews(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string | null;

  const payload = {
    title: String(formData.get("title")),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content")),
    cover_url: String(formData.get("cover_url") || "") || null,
    published: formData.get("published") === "on",
  };

  if (id) {
    await supabase.from("news").update(payload).eq("id", id);
  } else {
    await supabase.from("news").insert({ ...payload, slug: makeSlug(payload.title) });
  }

  revalidatePath("/dashboard/news");
  revalidatePath("/");
  redirect("/dashboard/news");
}

export async function deleteNews(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("news").delete().eq("id", String(formData.get("id")));
  revalidatePath("/dashboard/news");
  revalidatePath("/");
}