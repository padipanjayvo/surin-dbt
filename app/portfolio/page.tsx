const works = ["เว็บไซต์และเว็บแอปพลิเคชัน", "สื่อกราฟิกและวิดีโอดิจิทัล", "ระบบฐานข้อมูลเพื่อธุรกิจ", "AI และนวัตกรรมดิจิทัล", "การตลาดดิจิทัล", "โครงงานวิชาชีพนักเรียน"];

export default function PortfolioPage() {
  return <div><h1 className="text-3xl font-bold">ผลงานและกิจกรรม</h1><p className="mt-2 text-slate-600">พื้นที่รวบรวมผลงานเด่น การแข่งขัน และโครงงานของนักเรียน</p><div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">{works.map((work, i) => <article key={work} className="group rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><div className="text-3xl">{["💻","🎨","📊","🤖","📱","🏆"][i]}</div><h2 className="mt-4 text-lg font-bold group-hover:text-indigo-700">{work}</h2><p className="mt-2 text-sm text-slate-500">เรียนรู้ วางแผน ออกแบบ และพัฒนาผลงานจากโจทย์จริง</p></article>)}</div></div>;
}
