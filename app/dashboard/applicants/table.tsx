"use client";
import { useState, useMemo } from "react";
import * as XLSX from "xlsx";

type Row = {
  id: string; full_name: string; citizen_id: string; phone: string;
  email: string | null; level: string; prev_school: string | null;
  gpa: string | null; status: string; created_at: string;
};

const STATUS: Record<string, { label: string; cls: string }> = {
  pending:  { label: "รอตรวจสอบ", cls: "bg-amber-100 text-amber-700" },
  approved: { label: "ผ่าน",       cls: "bg-green-100 text-green-700" },
  rejected: { label: "ไม่ผ่าน",    cls: "bg-red-100 text-red-700" },
};

export default function ApplicantsTable({ rows }: { rows: Row[] }) {
  const [data, setData] = useState(rows);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  const view = useMemo(() =>
    data.filter((r) =>
      (filter === "all" || r.status === filter) &&
      (q === "" || r.full_name.includes(q) || r.phone.includes(q))
    ), [data, filter, q]);

  async function changeStatus(id: string, status: string) {
    setData((d) => d.map((r) => (r.id === id ? { ...r, status } : r)));
    await fetch("/api/admin/applicants", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
  }

  function exportExcel() {
    const sheet = XLSX.utils.json_to_sheet(
      view.map((r, i) => ({
        "ลำดับ": i + 1,
        "ชื่อ-นามสกุล": r.full_name,
        "เลขบัตรประชาชน": r.citizen_id,
        "เบอร์โทร": r.phone,
        "อีเมล": r.email ?? "",
        "ระดับ": r.level,
        "โรงเรียนเดิม": r.prev_school ?? "",
        "เกรดเฉลี่ย": r.gpa ?? "",
        "สถานะ": STATUS[r.status]?.label ?? r.status,
        "วันที่สมัคร": new Date(r.created_at).toLocaleDateString("th-TH"),
      }))
    );
    sheet["!cols"] = [{ wch: 6 }, { wch: 26 }, { wch: 18 }, { wch: 14 }, { wch: 24 },
                      { wch: 8 }, { wch: 26 }, { wch: 10 }, { wch: 12 }, { wch: 14 }];

    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "ผู้สมัคร");
    XLSX.writeFile(book, `ใบสมัคร-${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  const ctl = "border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">ใบสมัครเรียน <span className="text-slate-400 text-base">({view.length})</span></h1>
        <button onClick={exportExcel}
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700">
          ⬇ ดาวน์โหลด Excel
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหาชื่อ / เบอร์โทร" className={`${ctl} flex-1 min-w-52`} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className={ctl}>
          <option value="all">ทุกสถานะ</option>
          <option value="pending">รอตรวจสอบ</option>
          <option value="approved">ผ่าน</option>
          <option value="rejected">ไม่ผ่าน</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 text-left">
            <tr>
              {["ชื่อ-นามสกุล", "เบอร์โทร", "ระดับ", "เกรด", "วันที่สมัคร", "สถานะ"].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {view.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{r.full_name}</td>
                <td className="px-4 py-3">{r.phone}</td>
                <td className="px-4 py-3">{r.level}</td>
                <td className="px-4 py-3">{r.gpa || "-"}</td>
                <td className="px-4 py-3 text-slate-500">{new Date(r.created_at).toLocaleDateString("th-TH")}</td>
                <td className="px-4 py-3">
                  <select value={r.status} onChange={(e) => changeStatus(r.id, e.target.value)}
                    className={`text-xs rounded-full px-3 py-1.5 border-0 outline-none cursor-pointer ${STATUS[r.status]?.cls}`}>
                    <option value="pending">รอตรวจสอบ</option>
                    <option value="approved">ผ่าน</option>
                    <option value="rejected">ไม่ผ่าน</option>
                  </select>
                </td>
              </tr>
            ))}
            {!view.length && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-400">ไม่พบข้อมูล</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
