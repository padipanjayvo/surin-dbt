import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export default async function NewsPage() {
  const { data } = await supabase.from("news").select("id,title,slug,excerpt,published_at").eq("published", true).order("published_at", { ascending: false });
  return <div><h1 className="text-3xl font-bold">ข่าวประชาสัมพันธ์</h1><div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">{data?.length ? data.map((n) => <Link key={n.id} href={`/news/${n.slug}`} className="rounded-2xl border bg-white p-6 hover:shadow-lg"><p className="text-xs text-slate-400">{n.published_at ? new Date(n.published_at).toLocaleDateString("th-TH", { dateStyle: "long" }) : ""}</p><h2 className="mt-2 font-bold">{n.title}</h2><p className="mt-2 text-sm text-slate-600 line-clamp-3">{n.excerpt}</p></Link>) : <p className="col-span-full rounded-2xl border bg-white p-10 text-center text-slate-400">ยังไม่มีข่าวประชาสัมพันธ์</p>}</div></div>;
}
