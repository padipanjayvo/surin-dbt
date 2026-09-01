const programs = [
  { level: "ปวช.", duration: "3 ปี", audience: "ผู้จบ ม.3 หรือเทียบเท่า", title: "เทคโนโลยีธุรกิจดิจิทัล", detail: "เรียนพื้นฐานธุรกิจดิจิทัล การสร้างเว็บไซต์ การออกแบบสื่อ ฐานข้อมูล และการใช้เทคโนโลยีเพื่อการทำงาน" },
  { level: "ปวส.", duration: "2 ปี", audience: "ผู้จบ ปวช. ม.6 หรือเทียบเท่า", title: "เทคโนโลยีธุรกิจดิจิทัล", detail: "ต่อยอดการพัฒนาระบบสารสนเทศ การตลาดดิจิทัล การวิเคราะห์ข้อมูล AI และโครงงานธุรกิจดิจิทัล" },
];

export default function ProgramsPage() {
  return <div><h1 className="text-3xl font-bold">หลักสูตรที่เปิดสอน</h1><p className="mt-2 text-slate-600">เรียนรู้จากการลงมือปฏิบัติจริง พร้อมฝึกงานในสถานประกอบการ</p><div className="mt-8 grid md:grid-cols-2 gap-6">{programs.map((p) => <article key={p.level} className="rounded-2xl border bg-white p-7"><span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">{p.level}</span><h2 className="mt-4 text-xl font-bold">{p.title}</h2><p className="mt-3 text-slate-600">{p.detail}</p><dl className="mt-5 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-slate-400">ระยะเวลา</dt><dd className="font-semibold">{p.duration}</dd></div><div><dt className="text-slate-400">คุณสมบัติ</dt><dd className="font-semibold">{p.audience}</dd></div></dl></article>)}</div></div>;
}
