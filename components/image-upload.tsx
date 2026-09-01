"use client";
import { useState } from "react";

type Props = { name: string; defaultValue?: string | null; folder?: string };

export default function ImageUpload({ name, defaultValue }: Props) {
  const [url, setUrl] = useState(defaultValue ?? "");

  return (
    <div>
      <input name={name} type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://... ลิงก์รูปภาพสาธารณะ" className="mb-3 w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500" />

      {url ? (
        <div className="relative w-full max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="ตัวอย่างรูป" className="w-full h-44 object-cover rounded-xl border" />
          <button type="button" onClick={() => setUrl("")} className="absolute top-2 right-2 bg-white/90 text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg border">ล้างรูป</button>
        </div>
      ) : (
        <div className="grid h-28 w-full max-w-sm place-items-center rounded-xl border-2 border-dashed text-sm text-slate-400">วางลิงก์รูปภาพด้านบน</div>
      )}

      <p className="mt-2 text-xs text-slate-400">ใช้ลิงก์รูปสาธารณะจาก Google Drive หรือบริการจัดเก็บรูปภาพ</p>
    </div>
  );
}
