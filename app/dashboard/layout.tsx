import Link from "next/link";
import LogoutButton from "./logout-button";

const menu = [
  { href: "/dashboard", label: "ภาพรวม" },
  { href: "/dashboard/news", label: "จัดการข่าว" },
  { href: "/dashboard/programs", label: "จัดการหลักสูตร" },
  { href: "/dashboard/teachers", label: "จัดการบุคลากร" },
  { href: "/dashboard/applicants", label: "ใบสมัครเรียน" },
  { href: "/", label: "ดูหน้าเว็บจริง" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-8">
      <aside className="bg-white rounded-2xl border p-4 h-fit">
        <p className="text-xs text-slate-400 px-3">เข้าใช้งานโดย</p>
        <p className="text-sm font-medium px-3 truncate mb-4">ผู้ดูแลระบบ DBT</p>
        <nav className="space-y-1">
          {menu.map((m) => (
            <Link key={m.href} href={m.href}
              className="block px-3 py-2 rounded-lg text-sm hover:bg-indigo-50 hover:text-indigo-700 transition">
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 pt-4 border-t"><LogoutButton /></div>
      </aside>
      <div>{children}</div>
    </div>
  );
}
