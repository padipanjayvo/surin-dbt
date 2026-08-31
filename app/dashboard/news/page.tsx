import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteNews } from "./actions";

export const dynamic = "force-dynamic";

export default async function NewsList() {
  const supabase = await createClient();
  const { data } = await supabase.from("news").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">จัดการข่าว</h1>
        <Link href="/dashboard/news/new"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700">
          + เพิ่มข่าวใหม่
        </Link>
      </div>

      <div className="bg-white rounded-2xl border divide-y">
        {data?.length ? data.map((n) => (
          <div key={n.id} className="p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-medium truncate">{n.title}</p>
              <p className="text-xs text-slate-400 mt-1">
                {new Date(n.created_at).toLocaleDateString("th-TH", { dateStyle: "medium" })}
                <span className={`ml-2 px-2 py-0.5 rounded-full ${n.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {n.published ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link href={`/dashboard/news/${n.id}`} className="text-sm text-indigo-600 hover:underline">แก้ไข</Link>
              <form action={deleteNews}>
                <input type="hidden" name="id" value={n.id} />
                <button className="text-sm text-red-600 hover:underline">ลบ</button>
              </form>
            </div>
          </div>
        )) : <p className="p-8 text-center text-slate-400 text-sm">ยังไม่มีข่าว</p>}
      </div>
    </div>
  );
}