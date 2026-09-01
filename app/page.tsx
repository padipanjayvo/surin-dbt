import Link from "next/link";
import { getRows } from "@/lib/google-sheets";

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
  const [allNews, dbPrograms] = await Promise.all([getRows<any>("news"), getRows<any>("programs")]);
  const news = allNews.filter(n => n.published === true || String(n.published).toLowerCase() === "true").sort((a,b) => String(b.published_at).localeCompare(String(a.published_at))).slice(0,3);
  const programs = dbPrograms?.length ? dbPrograms : fallbackPrograms;

  return (
    <div className="space-y-24 pb-8">
      <section className="hero-grid relative isolate overflow-hidden rounded-[2.5rem] bg-[#050816] px-6 py-20 text-white shadow-2xl shadow-cyan-950/30 md:px-14 md:py-28">
        <div className="absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[.18em] text-cyan-200">SRVC • DIGITAL INNOVATION ECOSYSTEM</p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight md:text-7xl">สร้างคนดิจิทัล<br/><span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">ที่โลกการทำงานต้องการ</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">พื้นที่เรียนรู้ที่เชื่อมซอฟต์แวร์ AI ข้อมูล ดีไซน์ และธุรกิจเข้ากับโจทย์จริง เรียนด้วยการสร้างผลงาน แข่งขัน และฝึกประสบการณ์วิชาชีพ</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/admission" className="rounded-full bg-white px-7 py-3.5 font-bold text-indigo-700 transition hover:-translate-y-0.5 hover:shadow-xl">สมัครเรียนออนไลน์</Link><Link href="/programs" className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-semibold transition hover:bg-white/10">สำรวจหลักสูตร →</Link></div>
        </div>
      </section>

      <section aria-labelledby="skills-heading"><div className="mb-8 max-w-2xl"><p className="eyebrow">Future-ready capability</p><h2 id="skills-heading" className="mt-2 text-3xl font-black md:text-4xl">เรียนจริง สร้างจริง ใช้งานจริง</h2><p className="mt-3 text-slate-600">สร้างแฟ้มผลงานและทักษะที่ต่อยอดสู่มหาวิทยาลัย อาชีพ และธุรกิจของตนเอง</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{skills.map((s, i) => <article key={s.title} className="tech-card"><span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 font-black text-cyan-300">{s.icon}</span><p className="mt-5 text-xs font-bold text-slate-400">0{i+1}</p><h3 className="mt-1 font-bold">{s.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{s.text}</p></article>)}</div></section>

      <section className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-7 md:grid-cols-3 md:p-10"><div><p className="text-4xl font-black text-indigo-700">2</p><p className="mt-1 text-sm text-slate-500">ระดับหลักสูตร ปวช. และ ปวส.</p></div><div><p className="text-4xl font-black text-indigo-700">Project-based</p><p className="mt-1 text-sm text-slate-500">เรียนผ่านโครงงานและโจทย์จากโลกจริง</p></div><div><p className="text-4xl font-black text-indigo-700">Portfolio</p><p className="mt-1 text-sm text-slate-500">จบพร้อมหลักฐานทักษะที่นำเสนอได้</p></div></section>

      <section aria-labelledby="program-heading"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Programs</p><h2 id="program-heading" className="mt-2 text-3xl font-black">หลักสูตรที่เปิดสอน</h2></div><Link href="/programs" className="text-sm font-semibold text-indigo-700">ดูรายละเอียดทั้งหมด →</Link></div><div className="grid gap-6 md:grid-cols-2">{programs.map((p) => <article key={p.id} className="relative overflow-hidden rounded-3xl border bg-white p-8"><div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-indigo-50"/><span className="relative rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-bold text-white">{p.level}</span><h3 className="relative mt-5 text-xl font-black">{p.name}</h3><p className="relative mt-3 max-w-lg leading-7 text-slate-600">{p.description}</p><p className="relative mt-5 text-sm font-semibold text-indigo-700">ระยะเวลา {p.duration}</p></article>)}</div></section>

      <section aria-labelledby="news-heading"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Latest updates</p><h2 id="news-heading" className="mt-2 text-3xl font-black">ข่าวประชาสัมพันธ์</h2></div><Link href="/news" className="text-sm font-semibold text-indigo-700">ดูข่าวทั้งหมด →</Link></div><div className="grid gap-5 md:grid-cols-3">{news?.length ? news.map((n) => <Link key={n.id} href={`/news/${n.slug}`} className="group rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><time className="text-xs font-medium text-slate-400">{n.published_at ? new Date(n.published_at).toLocaleDateString("th-TH", { dateStyle: "long" }) : ""}</time><h3 className="mt-3 font-bold leading-7 group-hover:text-indigo-700">{n.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{n.excerpt}</p></Link>) : <div className="col-span-full rounded-2xl border border-dashed bg-white p-10 text-center text-slate-400">ติดตามข่าวสารและกิจกรรมใหม่ได้เร็ว ๆ นี้</div>}</div></section>

      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white md:flex md:items-center md:justify-between md:p-12"><div><h2 className="text-3xl font-black">พร้อมสร้างอนาคตดิจิทัลแล้วหรือยัง?</h2><p className="mt-3 text-indigo-100">สมัครเรียนออนไลน์ได้ทุกที่ ระบบบันทึกข้อมูลและเจ้าหน้าที่จะติดต่อกลับ</p></div><Link href="/admission" className="mt-6 inline-block shrink-0 rounded-full bg-white px-7 py-3.5 font-bold text-indigo-700 md:mt-0">เริ่มสมัครเรียน</Link></section>
    </div>
  );
}
