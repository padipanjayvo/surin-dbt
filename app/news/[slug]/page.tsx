import Image from "next/image";
import { notFound } from "next/navigation";
import { findRow } from "@/lib/google-sheets";

export const revalidate = 60;

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await findRow<any>("news", "slug", slug);
  if (!data) notFound();
  return <article className="mx-auto max-w-3xl"><p className="text-sm text-indigo-600">ข่าวประชาสัมพันธ์</p><h1 className="mt-2 text-3xl font-bold leading-tight">{data.title}</h1><p className="mt-3 text-sm text-slate-400">{data.published_at ? new Date(data.published_at).toLocaleDateString("th-TH", { dateStyle: "long" }) : ""}</p>{data.cover_url && <div className="relative mt-7 aspect-video overflow-hidden rounded-2xl"><Image src={data.cover_url} alt={data.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>}<div className="mt-7 whitespace-pre-wrap leading-8 text-slate-700">{data.content}</div></article>;
}
