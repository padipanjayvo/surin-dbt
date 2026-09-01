import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

const fallbackPrograms = [
  { id: "voc", level: "ปวช.", name: "เทคโนโลยีธุรกิจดิจิทัล", description: "สร้างพื้นฐานเว็บไซต์ สื่อดิจิทัล ฐานข้อมูล และการทำธุรกิจยุคใหม่", duration: "3 ปี" },
  { id: "high-voc", level: "ปวส.", name: "เทคโนโลยีธุรกิจดิจิทัล", description: "ต่อยอดการพัฒนาระบบ การวิเคราะห์ข้อมูล AI และโครงงานวิชาชีพ", duration: "2 ปี" },
];

const skills = [
  { icon: "</>", title: "พัฒนาเว็บไซต์", text: "HTML, CSS, JavaScript และเว็บแอปพลิเคชัน" },
  { icon: "AI", title: "AI และข้อมูล", text: "ใช้ปัญญาประดิษฐ์และข้อมูลแก้โจทย์จริง" },
  { icon: "UX", title: "ออกแบบดิจิทัล", text: "สร้างสื่อ กราฟิก และประสบการณ์ผู้ใช้งาน" },
  { icon: "Biz", title: "ธุรกิจออนไลน์", text: "การตลาดดิจิทัล อีคอมเมิร์ซ และผู้ประกอบการ" },
];

export default async function Home() {
  const [{ data: news }, { data: dbPrograms }] = await Promise.all([
    supabase.from("news").select("id,title,slug,excerpt,published_at").eq("published", true).order("published_at", { ascending: false }).limit(3),
    supabase.from("programs").select("id,level,name,description,duration").order("sort_order"),
  ]);
  const programs = dbPrograms?.length ? dbPrograms : fallbackPrograms;

  return (
    <div className="space-y-24 pb-8">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-white shadow-2xl shadow-indigo-950/20 md:px-14 md:py-24">
        <div className="absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-cyan-200">DIGITAL BUSINESS TECHNOLOGY • SRVC</p>
          <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">เปลี่ยนไอเดียให้เป็น<br/><span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">ผลงานดิจิทัลที่ใช้ได้จริง</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">เรียนรู้เทคโนโลยี ธุรกิจ และความคิดสร้างสรรค์ ผ่านการลงมือทำ โครงงาน การแข่งขัน และประสบการณ์จากสถานประกอบการ</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/admission" className="rounded-full bg-white px-7 py-3.5 font-bold text-indigo-700 transition hover:-translate-y-0.5 hover:shadow-xl">สมัครเรียนออนไลน์</Link><Link href="/programs" className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-semibold transition hover:bg-white/10">สำรวจหลักสูตร →</Link></div>
        </div>
      </section>

      <section aria-labelledby="skills-heading"><div className="mb-8 max-w-2xl"><p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Skills for the future</p><h2 id="skills-heading" className="mt-2 text-3xl font-black">ทักษะที่ได้เรียนรู้</h2><p className="mt-3 text-slate-600">สร้างพื้นฐานที่นำไปศึกษาต่อ ทำงาน หรือเริ่มต้นธุรกิจของตนเองได้</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{skills.map((s) => <article key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"><span className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 font-black text-indigo-700">{s.icon}</span><h3 className="mt-5 font-bold">{s.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{s.text}</p></article>)}</div></section>

      <section aria-labelledby="program-heading"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Programs</p><h2 id="program-heading" className="mt-2 text-3xl font-black">หลักสูตรที่เปิดสอน</h2></div><Link href="/programs" className="text-sm font-semibold text-indigo-700">ดูรายละเอียดทั้งหมด →</Link></div><div className="grid gap-6 md:grid-cols-2">{programs.map((p) => <article key={p.id} className="relative overflow-hidden rounded-3xl border bg-white p-8"><div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-indigo-50"/><span className="relative rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-bold text-white">{p.level}</span><h3 className="relative mt-5 text-xl font-black">{p.name}</h3><p className="relative mt-3 max-w-lg leading-7 text-slate-600">{p.description}</p><p className="relative mt-5 text-sm font-semibold text-indigo-700">ระยะเวลา {p.duration}</p></article>)}</div></section>

      <section aria-labelledby="news-heading"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Latest updates</p><h2 id="news-heading" className="mt-2 text-3xl font-black">ข่าวประชาสัมพันธ์</h2></div><Link href="/news" className="text-sm font-semibold text-indigo-700">ดูข่าวทั้งหมด →</Link></div><div className="grid gap-5 md:grid-cols-3">{news?.length ? news.map((n) => <Link key={n.id} href={`/news/${n.slug}`} className="group rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><time className="text-xs font-medium text-slate-400">{n.published_at ? new Date(n.published_at).toLocaleDateString("th-TH", { dateStyle: "long" }) : ""}</time><h3 className="mt-3 font-bold leading-7 group-hover:text-indigo-700">{n.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{n.excerpt}</p></Link>) : <div className="col-span-full rounded-2xl border border-dashed bg-white p-10 text-center text-slate-400">ติดตามข่าวสารและกิจกรรมใหม่ได้เร็ว ๆ นี้</div>}</div></section>

      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white md:flex md:items-center md:justify-between md:p-12"><div><h2 className="text-3xl font-black">พร้อมสร้างอนาคตดิจิทัลแล้วหรือยัง?</h2><p className="mt-3 text-indigo-100">สมัครเรียนออนไลน์ได้ทุกที่ ระบบบันทึกข้อมูลและเจ้าหน้าที่จะติดต่อกลับ</p></div><Link href="/admission" className="mt-6 inline-block shrink-0 rounded-full bg-white px-7 py-3.5 font-bold text-indigo-700 md:mt-0">เริ่มสมัครเรียน</Link></section>
    </div>
  );
}
