import { notFound } from "next/navigation";
import { findRow } from "@/lib/google-sheets";
import NewsForm from "../news-form";

export default async function EditNews({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await findRow<any>("news", "id", id);
  if (!data) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">แก้ไขข่าว</h1>
      <NewsForm news={data} />
    </div>
  );
}
