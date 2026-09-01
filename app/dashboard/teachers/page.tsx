import { createClient } from "@/lib/supabase/server";
import { deleteTeacher, saveTeacher } from "../content-actions";

export const dynamic = "force-dynamic";
const input = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500";

export default async function ManageTeachers() {
  const supabase = await createClient();
  const { data } = await supabase.from("teachers").select("*").order("sort_order");
  return <div><h1 className="text-2xl font-bold">จัดการบุคลากร</h1><p className="mt-1 text-sm text-slate-500">เพิ่ม แก้ไข เรียงลำดับ และกำหนดรูปภาพบุคลากร</p><form action={saveTeacher} className="mt-6 grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-2"><input name="name" required placeholder="ชื่อ-นามสกุล" className={input}/><input name="position" placeholder="ตำแหน่ง" className={input}/><input name="image_url" type="url" placeholder="URL รูปภาพ" className={input}/><input name="sort_order" type="number" defaultValue="0" placeholder="ลำดับ" className={input}/><button className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white md:w-fit">เพิ่มบุคลากร</button></form><div className="mt-5 space-y-4">{data?.map((t) => <form key={t.id} action={saveTeacher} className="grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-2"><input type="hidden" name="id" value={t.id}/><input name="name" required defaultValue={t.name} className={input}/><input name="position" defaultValue={t.position ?? ""} className={input}/><input name="image_url" type="url" defaultValue={t.image_url ?? ""} className={input}/><input name="sort_order" type="number" defaultValue={t.sort_order ?? 0} className={input}/><div className="flex gap-3"><button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">บันทึก</button><button formAction={deleteTeacher} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">ลบ</button></div></form>)}</div></div>;
}
