"use server";
import { mutateSheet } from "@/lib/google-sheets";
import { requireAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function makeSlug(title: string) {
  const base = title.toLowerCase().trim()
    .replace(/[^\u0E00-\u0E7Fa-z0-9\s-]/g, "")
    .replace(/\s+/g, "-").slice(0, 60);
  return `${base || "news"}-${Date.now().toString(36)}`;
}

export async function saveNews(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;

  const payload = {
    title: String(formData.get("title")),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content")),
    cover_url: String(formData.get("cover_url") || "") || null,
    published: formData.get("published") === "on",
  };

  if (id) {
    await mutateSheet("news", "update", { id, ...payload });
  } else {
    await mutateSheet("news", "create", { ...payload, slug: makeSlug(payload.title) });
  }

  revalidatePath("/dashboard/news");
  revalidatePath("/");
  redirect("/dashboard/news");
}

export async function deleteNews(formData: FormData) {
  await requireAdmin();
  await mutateSheet("news", "delete", { id: String(formData.get("id")) });
  revalidatePath("/dashboard/news");
  revalidatePath("/");
}
