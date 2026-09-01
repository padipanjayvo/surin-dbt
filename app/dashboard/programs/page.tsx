import { createClient } from "@/lib/supabase/server";
import { deleteProgram, saveProgram } from "../content-actions";

export const dynamic = "force-dynamic";
const input = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500";

export default async function ManagePrograms() {
  const supabase = await createClient();
  const { data } = await supabase.from("programs").select("*").order("sort_order");
  return <div><h1 className="text-2xl font-bold">จัดการหลักสูตร</h1><p className="mt-1 text-sm text-slate-500">ข้อมูลที่บันทึกจะแสดงหน้าแรกและหน้าหลักสูตร</p><form action={saveProgram} className="mt-6 grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-2"><input name="level" required placeholder="ระดับ เช่น ปวช." className={input}/><input name="name" required placeholder="ชื่อหลักสูตร" className={input}/><input name="duration" placeholder="ระยะเวลา เช่น 3 ปี" className={input}/><input name="sort_order" type="number" defaultValue="0" placeholder="ลำดับ" className={input}/><textarea name="description" placeholder="รายละเอียดหลักสูตร" className={`${input} md:col-span-2`}/><button className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white md:w-fit">เพิ่มหลักสูตร</button></form><div className="mt-5 space-y-4">{data?.map((p) => <form key={p.id} action={saveProgram} className="grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-2"><input type="hidden" name="id" value={p.id}/><input name="level" required defaultValue={p.level} className={input}/><input name="name" required defaultValue={p.name} className={input}/><input name="duration" defaultValue={p.duration ?? ""} className={input}/><input name="sort_order" type="number" defaultValue={p.sort_order ?? 0} className={input}/><textarea name="description" defaultValue={p.description ?? ""} className={`${input} md:col-span-2`}/><div className="flex gap-3"><button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">บันทึก</button><button formAction={deleteProgram} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">ลบ</button></div></form>)}</div></div>;
}
