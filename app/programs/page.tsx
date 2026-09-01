import Link from "next/link";
import { getRows } from "@/lib/google-sheets";

export const revalidate = 60;
const fallback = [{ id: "voc", level: "ปวช.", duration: "3 ปี", name: "เทคโนโลยีธุรกิจดิจิทัล", description: "เรียนพื้นฐานธุรกิจดิจิทัล เว็บไซต์ สื่อ ฐานข้อมูล และเทคโนโลยีเพื่อการทำงาน" }, { id: "high-voc", level: "ปวส.", duration: "2 ปี", name: "เทคโนโลยีธุรกิจดิจิทัล", description: "ต่อยอดระบบสารสนเทศ การตลาดดิจิทัล การวิเคราะห์ข้อมูล AI และโครงงาน" }];

export default async function ProgramsPage() {
  const data = (await getRows<any>("programs")).sort((a,b) => Number(a.sort_order)-Number(b.sort_order));
  const programs = data?.length ? data : fallback;
  return <div><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Programs</p><h1 className="mt-2 text-4xl font-black">หลักสูตรที่เปิดสอน</h1><p className="mt-4 leading-7 text-slate-600">เรียนรู้จากการลงมือปฏิบัติจริง พร้อมฝึกงานและสร้างแฟ้มสะสมผลงานสำหรับศึกษาต่อหรือทำงาน</p></div><div className="mt-10 grid gap-6 md:grid-cols-2">{programs.map((p) => <article key={p.id} className="rounded-3xl border bg-white p-8 shadow-sm"><span className="rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-bold text-indigo-700">{p.level}</span><h2 className="mt-5 text-2xl font-black">{p.name}</h2><p className="mt-4 leading-7 text-slate-600">{p.description}</p><div className="mt-6 border-t pt-5 text-sm"><span className="text-slate-400">ระยะเวลาเรียน</span><strong className="ml-3 text-indigo-700">{p.duration}</strong></div></article>)}</div><div className="mt-10 rounded-3xl bg-indigo-600 p-8 text-white md:flex md:items-center md:justify-between"><div><h2 className="text-2xl font-black">สนใจเรียนกับเรา?</h2><p className="mt-2 text-indigo-100">กรอกใบสมัครออนไลน์ได้ทันที</p></div><Link href="/admission" className="mt-5 inline-block rounded-full bg-white px-6 py-3 font-bold text-indigo-700 md:mt-0">สมัครเรียน</Link></div></div>;
}
