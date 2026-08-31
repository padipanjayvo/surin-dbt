"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admission() {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const f = new FormData(e.currentTarget);
    const payload = {
      full_name: String(f.get("full_name")),
      citizen_id: String(f.get("citizen_id")),
      phone: String(f.get("phone")),
      email: String(f.get("email") || ""),
      level: String(f.get("level")),
      prev_school: String(f.get("prev_school") || ""),
      gpa: String(f.get("gpa") || ""),
    };

    if (payload.citizen_id.length !== 13) {
      setMsg({ ok: false, text: "เลขบัตรประชาชนต้องมี 13 หลัก" });
      setLoading(false); return;
    }

    const { error } = await supabase.from("applicants").insert(payload);
    setLoading(false);
    if (error) setMsg({ ok: false, text: "เกิดข้อผิดพลาด: " + error.message });
    else {
      setMsg({ ok: true, text: "ส่งใบสมัครเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับภายใน 3 วันทำการ" });
      e.currentTarget.reset();
    }
  }

  const input = "w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none";

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">สมัครเรียนออนไลน์</h1>
      <p className="text-slate-600 mt-2">กรอกข้อมูลให้ครบถ้วน ระบบจะบันทึกใบสมัครของคุณทันที</p>

      <form onSubmit={onSubmit} className="mt-8 bg-white p-7 rounded-2xl border space-y-4">
        <div>
          <label className="text-sm font-medium">ชื่อ-นามสกุล *</label>
          <input name="full_name" required className={input} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">เลขบัตรประชาชน *</label>
            <input name="citizen_id" required maxLength={13} className={input} />
          </div>
          <div>
            <label className="text-sm font-medium">เบอร์โทรศัพท์ *</label>
            <input name="phone" required className={input} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">อีเมล</label>
          <input name="email" type="email" className={input} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">ระดับที่สมัคร *</label>
            <select name="level" required className={input}>
              <option value="ปวช.">ปวช.</option>
              <option value="ปวส.">ปวส.</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">เกรดเฉลี่ย</label>
            <input name="gpa" className={input} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">โรงเรียนเดิม</label>
          <input name="prev_school" className={input} />
        </div>

        <p className="text-xs text-slate-500">
          ข้อมูลของท่านจะถูกใช้เพื่อการรับสมัครเท่านั้น ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)
        </p>

        <button disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50">
          {loading ? "กำลังส่ง..." : "ส่งใบสมัคร"}
        </button>

        {msg && (
          <div className={`p-3 rounded-lg text-sm ${msg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {msg.text}
          </div>
        )}
      </form>
    </div>
  );
}