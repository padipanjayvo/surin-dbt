import { getRows } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [apps, news, teachers] = await Promise.all([getRows<any>("applicants"), getRows<any>("news"), getRows<any>("teachers")]);

  const cards = [
    { label: "ใบสมัครทั้งหมด", value: apps.length, color: "bg-indigo-50 text-indigo-700" },
    { label: "รอตรวจสอบ", value: apps.filter(a => a.status === "pending").length, color: "bg-amber-50 text-amber-700" },
    { label: "ข่าวทั้งหมด", value: news.length, color: "bg-emerald-50 text-emerald-700" },
    { label: "บุคลากร", value: teachers.length, color: "bg-violet-50 text-violet-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ภาพรวมระบบ</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`${c.color} p-5 rounded-2xl`}>
            <p className="text-3xl font-bold">{c.value}</p>
            <p className="text-sm mt-1">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
