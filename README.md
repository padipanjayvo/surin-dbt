# เว็บไซต์แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล

เว็บไซต์ประชาสัมพันธ์และรับสมัครนักเรียน–นักศึกษา แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล วิทยาลัยอาชีวศึกษาสุรินทร์ พัฒนาด้วย Next.js 16 และใช้ Google Sheets เป็นฐานข้อมูลผ่าน Google Apps Script Web App

## ความสามารถหลัก

- หน้าแนะนำหลักสูตร ปวช. และ ปวส.
- ข่าวประชาสัมพันธ์ บุคลากร และผลงานนักเรียน
- แบบฟอร์มสมัครเรียนที่บันทึกเข้า Google Sheets โดยตรง
- Dashboard สำหรับจัดการหลักสูตร บุคลากร ข่าว และผู้สมัคร
- ระบบเข้าสู่ Dashboard ด้วยคุกกี้แบบ HttpOnly
- รองรับโทรศัพท์ แท็บเล็ต และคอมพิวเตอร์

## การตั้งค่า

1. คัดลอก `.env.example` เป็น `.env.local`
2. สร้าง Google Sheet และติดตั้งโค้ดใน `google-apps-script/Code.gs`
3. แทนค่า `spreadsheetId` และ `apiKey` ใน Apps Script
4. เรียก `setupSheets()` หนึ่งครั้ง แล้ว Deploy เป็น Web App
5. กำหนดตัวแปรสภาพแวดล้อมให้ครบ:

```env
GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
NEXT_PUBLIC_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SHEETS_API_KEY=secret-key-for-server-writes
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong-admin-password
```

อย่านำค่า `GOOGLE_SHEETS_API_KEY` หรือ `ADMIN_PASSWORD` ขึ้น GitHub

## เริ่มพัฒนา

```bash
npm install
npm run dev
```

ตรวจสอบก่อนเผยแพร่:

```bash
npm run lint
npm run build
```

## โครงสร้างชีต

ระบบสร้างแท็บ `programs`, `teachers`, `news` และ `applicants` พร้อมหัวตารางให้อัตโนมัติเมื่อเรียก `setupSheets()`
