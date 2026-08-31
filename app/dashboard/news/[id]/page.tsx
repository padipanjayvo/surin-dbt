import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NewsForm from "../news-form";

export default async function EditNews({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("news").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">แก้ไขข่าว</h1>
      <NewsForm news={data} />
    </div>
  );
}