"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr("");
    const f = new FormData(e.currentTarget);

    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: String(f.get("email")), password: String(f.get("password")) }) });

    setLoading(false);
    if (!response.ok) return setErr("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    router.push("/dashboard");
    router.refresh();
  }

  const input = "w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none";

  return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="bg-white p-8 rounded-2xl border shadow-sm">
        <h1 className="text-2xl font-bold">เข้าสู่ระบบผู้ดูแล</h1>
        <p className="text-sm text-slate-500 mt-1">สำหรับครูและเจ้าหน้าที่แผนกเท่านั้น</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">อีเมล</label>
            <input name="email" type="email" required className={input} />
          </div>
          <div>
            <label className="text-sm font-medium">รหัสผ่าน</label>
            <input name="password" type="password" required className={input} />
          </div>
          <button disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50">
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
          {err && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{err}</p>}
        </form>
      </div>
    </div>
  );
}
