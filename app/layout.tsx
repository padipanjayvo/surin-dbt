import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล | วิทยาลัยอาชีวศึกษาสุรินทร์",
  description: "หลักสูตร ปวช. และ ปวส. เทคโนโลยีธุรกิจดิจิทัล วิทยาลัยอาชีวศึกษาสุรินทร์",
};

const nav = [
  { href: "/", label: "หน้าแรก" },
  { href: "/programs", label: "หลักสูตร" },
  { href: "/teachers", label: "บุคลากร" },
  { href: "/portfolio", label: "ผลงาน" },
  { href: "/news", label: "ข่าวสาร" },
  { href: "/admission", label: "สมัครเรียน" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-slate-50 text-slate-800">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
          <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-indigo-700 leading-tight">
              แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล
              <span className="block text-xs font-normal text-slate-500">วิทยาลัยอาชีวศึกษาสุรินทร์</span>
            </Link>
            <nav className="hidden md:flex gap-5 text-sm">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-indigo-600 transition">{n.label}</Link>
              ))}
            </nav>
          </div>
          <nav className="md:hidden overflow-x-auto border-t bg-white px-4 py-2 flex gap-4 text-sm whitespace-nowrap">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-indigo-600">{n.label}</Link>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10 min-h-[70vh]">{children}</main>

        <footer className="bg-slate-900 text-slate-300 py-8 text-sm">
          <div className="mx-auto max-w-6xl px-4">
            <p className="font-semibold text-white">แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล</p>
            <p>วิทยาลัยอาชีวศึกษาสุรินทร์ จังหวัดสุรินทร์</p>
            <p className="mt-3 text-slate-500">© {new Date().getFullYear()} สงวนลิขสิทธิ์</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
