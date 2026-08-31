import { saveNews } from "./actions";
import ImageUpload from "@/components/image-upload";


type News = { id: string; title: string; excerpt: string | null; content: string; cover_url: string | null; published: boolean };

export default function NewsForm({ news }: { news?: News }) {
  const input = "w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none";

  return (
    <form action={saveNews} className="bg-white p-7 rounded-2xl border space-y-4 max-w-3xl">
      {news && <input type="hidden" name="id" value={news.id} />}
      <div>
        <label className="text-sm font-medium">หัวข้อข่าว *</label>
        <input name="title" required defaultValue={news?.title} className={input} />
      </div>
      <div>
        <label className="text-sm font-medium">คำโปรย (แสดงในหน้าแรก)</label>
        <input name="excerpt" defaultValue={news?.excerpt ?? ""} className={input} />
      </div>
     
    <div>
       <label className="text-sm font-medium block mb-2">รูปหน้าปก</label>
        <ImageUpload name="cover_url" defaultValue={news?.cover_url} folder="news" />
    </div>

      {/* <div>
        <label className="text-sm font-medium">ลิงก์รูปหน้าปก</label>
        <input name="cover_url" defaultValue={news?.cover_url ?? ""} placeholder="https://..." className={input} />
      </div> */}
      <div>
        <label className="text-sm font-medium">เนื้อหา *</label>
        <textarea name="content" required rows={12} defaultValue={news?.content} className={input} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={news?.published ?? false} className="w-4 h-4" />
        เผยแพร่ทันที
      </label>
      <button className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700">
        บันทึก
      </button>
    </form>
  );
}