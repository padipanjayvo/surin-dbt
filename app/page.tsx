import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export default async function Home() {
  const { data: news } = await supabase
    .from("news").select("*").eq("published", true)
    .order("published_at", { ascending: false }).limit(3);

  const { data: programs } = await supabase
    .from("programs").select("*").order("sort_order");

  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-10 md:p-16">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          เรียนรู้ธุรกิจยุคดิจิทัล<br />ลงมือทำจริงตั้งแต่วันแรก
        </h1>
        <p className="mt-4 text-indigo-100 max-w-xl">
          หลักสูตร ปวช. และ ปวส. เทคโนโลยีธุรกิจดิจิทัล วิทยาลัยอาชีวศึกษาสุรินทร์
        </p>
        <Link href="/admission"
          className="inline-block mt-8 bg-white text-indigo-700 font-semibold px-7 py-3 rounded-full hover:scale-105 transition">
          สมัครเรียนออนไลน์
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">หลักสูตรที่เปิดสอน</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {programs?.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-2xl border hover:shadow-lg transition">
              <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{p.level}</span>
              <h3 className="text-lg font-bold mt-3">{p.name}</h3>
              <p className="text-sm text-slate-600 mt-2">{p.description}</p>
              <p className="text-sm text-slate-500 mt-3">⏱ ระยะเวลา {p.duration}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">ข่าวประชาสัมพันธ์</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {news?.map((n) => (
            <Link key={n.id} href={`/news/${n.slug}`}
              className="bg-white p-5 rounded-2xl border hover:shadow-lg transition">
              <p className="text-xs text-slate-400">
                {new Date(n.published_at).toLocaleDateString("th-TH", { dateStyle: "long" })}
              </p>
              <h3 className="font-semibold mt-2">{n.title}</h3>
              <p className="text-sm text-slate-600 mt-2 line-clamp-3">{n.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}