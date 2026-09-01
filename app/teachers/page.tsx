const roles = ["หัวหน้าแผนกวิชา", "ครูประจำแผนก", "ครูผู้สอน", "เจ้าหน้าที่สนับสนุน"];

export default function TeachersPage() {
  return <div><h1 className="text-3xl font-bold">บุคลากรของเรา</h1><p className="mt-2 text-slate-600">ทีมครูผู้สอนที่พร้อมส่งเสริมทักษะวิชาชีพและดูแลผู้เรียน</p><div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{roles.map((role, i) => <article key={role} className="rounded-2xl border bg-white p-6 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-2xl font-bold text-indigo-700">DBT</div><h2 className="mt-4 font-bold">บุคลากรลำดับที่ {i + 1}</h2><p className="text-sm text-slate-500">{role}</p></article>)}</div><p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">ผู้ดูแลระบบสามารถเชื่อมข้อมูลรายชื่อและรูปบุคลากรจากตาราง teachers ใน Supabase ได้ภายหลัง</p></div>;
}
