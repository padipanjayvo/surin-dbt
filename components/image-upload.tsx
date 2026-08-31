"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = { name: string; defaultValue?: string | null; folder?: string };

export default function ImageUpload({ name, defaultValue, folder = "news" }: Props) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr("");

    if (!file.type.startsWith("image/")) { setErr("กรุณาเลือกไฟล์รูปภาพเท่านั้น"); return; }
    if (file.size > 5 * 1024 * 1024)     { setErr("ไฟล์ใหญ่เกิน 5 MB กรุณาย่อรูปก่อน"); return; }

    setLoading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from("media")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    setLoading(false);
    if (error) { setErr("อัปโหลดไม่สำเร็จ: " + error.message); return; }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setUrl(data.publicUrl);
    e.target.value = "";
  }

  return (
    <div>
      {/* ค่าที่จะถูกส่งไปกับฟอร์มจริงๆ */}
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="relative w-full max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="ตัวอย่างรูป" className="w-full h-44 object-cover rounded-xl border" />
          <button type="button" onClick={() => setUrl("")}
            className="absolute top-2 right-2 bg-white/90 backdrop-blur text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg border hover:bg-white">
            เปลี่ยนรูป
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full max-w-sm h-44 border-2 border-dashed rounded-xl cursor-pointer hover:bg-slate-50 hover:border-indigo-400 transition">
          <input type="file" accept="image/*" onChange={onPick} disabled={loading} className="hidden" />
          {loading ? (
            <p className="text-sm text-indigo-600">กำลังอัปโหลด...</p>
          ) : (
            <>
              <p className="text-3xl text-slate-300">＋</p>
              <p className="text-sm text-slate-500 mt-1">คลิกเพื่อเลือกรูป</p>
              <p className="text-xs text-slate-400 mt-0.5">JPG / PNG / WebP • ไม่เกิน 5 MB</p>
            </>
          )}
        </label>
      )}

      {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
    </div>
  );
}