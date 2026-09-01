import Image from "next/image";
import { getRows } from "@/lib/google-sheets";

export const revalidate = 60;

export default async function TeachersPage() {
  const data = (await getRows<any>("teachers")).sort((a,b) => Number(a.sort_order)-Number(b.sort_order));
  return <div><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Our team</p><h1 className="mt-2 text-4xl font-black">บุคลากรของเรา</h1><p className="mt-4 leading-7 text-slate-600">ทีมครูผู้สอนที่พร้อมส่งเสริมทักษะวิชาชีพ ให้คำปรึกษา และดูแลผู้เรียน</p></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{data?.length ? data.map((t) => <article key={t.id} className="overflow-hidden rounded-3xl border bg-white"><div className="relative aspect-[4/3] bg-gradient-to-br from-indigo-100 to-violet-100">{t.image_url ? <Image src={t.image_url} alt={t.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover"/> : <div className="grid h-full place-items-center text-3xl font-black text-indigo-300">DBT</div>}</div><div className="p-6"><h2 className="text-lg font-black">{t.name}</h2><p className="mt-1 text-sm text-indigo-600">{t.position}</p></div></article>) : <div className="col-span-full rounded-3xl border border-dashed bg-white p-12 text-center text-slate-400">ผู้ดูแลระบบสามารถเพิ่มรายชื่อและรูปบุคลากรได้จาก Dashboard</div>}</div></div>;
}
