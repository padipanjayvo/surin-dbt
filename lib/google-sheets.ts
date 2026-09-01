export type SheetName = "programs" | "teachers" | "news" | "applicants";
export type Row = Record<string, string | number | boolean | null>;
const API_URL = process.env.GOOGLE_SHEETS_API_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL || "";
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY || "";

export async function getRows<T extends Row>(sheet: SheetName): Promise<T[]> {
  if (!API_URL) return [];
  try {
    const url = new URL(API_URL); url.searchParams.set("sheet", sheet);
    const response = await fetch(url, { next: { revalidate: 60 }, redirect: "follow" });
    if (!response.ok) throw new Error(`Google Sheets HTTP ${response.status}`);
    const json = await response.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) { console.error("Google Sheets read failed:", error); return []; }
}

export async function findRow<T extends Row>(sheet: SheetName, field: string, value: string) {
  return (await getRows<T>(sheet)).find((row) => String(row[field]) === value) || null;
}

export async function mutateSheet(sheet: SheetName, action: "create" | "update" | "delete", data: Row, publicWrite = false) {
  if (!API_URL) throw new Error("ยังไม่ได้ตั้งค่า GOOGLE_SHEETS_API_URL");
  const response = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ sheet, action, data, apiKey: publicWrite ? "" : API_KEY }), cache: "no-store", redirect: "follow" });
  const json = await response.json().catch(() => ({}));
  if (!response.ok || !json.ok) throw new Error(json.error || "บันทึก Google Sheets ไม่สำเร็จ");
  return json;
}
