# เชื่อม Google Sheets ภายใน 10 นาที

1. สร้าง Google Sheet ใหม่ แล้วคัดลอก ID จาก URL
2. เปิด **ส่วนขยาย → Apps Script** และวาง `Code.gs`
3. แก้ `spreadsheetId` และ `apiKey` จากนั้นกด Run ฟังก์ชัน `setupSheets` หนึ่งครั้ง
4. กด **Deploy → New deployment → Web app** เลือก Execute as: Me และ Who has access: Anyone
5. คัดลอก URL `/exec` ไปใส่ `.env.local` ตาม `.env.example`
6. ตั้ง `GOOGLE_SHEETS_API_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` ใน Vercel แล้ว Redeploy

ชีตที่ระบบสร้างให้อัตโนมัติ: `programs`, `teachers`, `news`, `applicants`

> ห้ามเผยแพร่ `GOOGLE_SHEETS_API_KEY` หรือ `ADMIN_PASSWORD` ใน GitHub
