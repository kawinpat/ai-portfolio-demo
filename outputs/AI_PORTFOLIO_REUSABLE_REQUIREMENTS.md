# แนวทางสร้าง AI-Assisted Developer Portfolio

เอกสารนี้รวบรวม Requirement สำหรับสร้าง Portfolio ส่วนตัว โดยเน้นว่าเคยใช้ AI ช่วยทำงานอะไรบ้าง และมีผลงานหรือ Demo อะไรที่เปิดให้ดูได้จริง

## เป้าหมาย

สร้างเว็บไซต์ Portfolio ด้วย **NuxtJS v4^** เพื่ออธิบายการใช้ AI ในงานจริง ไม่ใช่เว็บไซต์ที่อธิบายเหตุผลในการเลือก Nuxt หรือเลือกเครื่องมือทำเว็บไซต์

เนื้อหาหลักต้องตอบคำถามต่อไปนี้ให้ชัดเจน:

- ใช้ AI Tool อะไรบ้าง
- ใช้ AI ในขั้นตอนใดของงาน
- ส่ง Prompt หรือ Context แบบใดให้ AI
- AI ส่ง Output อะไรกลับมา
- นำ Output ไปใช้อย่างไร
- Developer ตรวจสอบ ตัดสินใจ หรือทดสอบอะไรด้วยตัวเอง
- เคยสร้างผลงานหรือ Demo อะไรจากการใช้ AI บ้าง

## AI Tools และงานที่นำเสนอ

ให้ใช้เฉพาะสิ่งที่เคยทำจริง และอธิบายเป็นภาษาไทยที่เข้าใจง่าย

1. **NotebookLM** — ใช้อ่าน สรุป และจัดระเบียบข้อมูล, ทำ Slide Outline หรือเตรียมเนื้อหาสำหรับ Presentation แล้ว Developer ตรวจความถูกต้องและปรับลำดับการนำเสนอเอง
2. **ChatGPT และ Gemini** — ใช้ถามคำถามเชิงเทคนิค อธิบายโค้ด ช่วยหาแนวทางแก้ Error และ Review Code โดยปกปิดข้อมูลสำคัญก่อนส่ง และ Developer ตรวจ logic, security, edge cases และทดสอบก่อนใช้จริง
3. **OpenAI Codex** — ใช้อ่าน Context หลายไฟล์ใน Project, Implement feature, Refactor, แก้ Bug และ Review Diff แล้ว Developer ตรวจ Diff, Architecture, Business Logic และผล Build/Test ก่อนนำไปใช้
4. **ChatGPT สำหรับ HTML Interactive Demo** — ใช้เปลี่ยน Requirement และ User Flow ให้เป็น HTML/CSS/JavaScript Prototype ที่เปิดทดลอง Interaction ได้ด้วย Mock Data
5. **Claude AI สำหรับ Dashboard Prototype** — ใช้ทำ Dashboard จาก Requirement และข้อมูลจำลอง เพื่อแสดง Layout, Cards, ตาราง, Status และ User Flow ก่อนนำ Feedback ไปปรับต่อ

## Sections ที่ควรมีใน Portfolio

1. **Hero**
   - หัวข้อชัดเจน เช่น “AI ช่วยงานอะไรบ้าง? และผลงานที่เคยทำจริง”
   - สรุปประเภทงานที่ใช้ AI ช่วย
   - ปุ่มไปยัง AI Workflows และ Existing Demo

2. **AI Workflows**
   - แสดงเป็น Card แยกตาม AI Tool
   - ในแต่ละ Card ให้มี: งานที่ให้ AI ช่วย, Prompt/Context, AI Output, สิ่งที่ Developer ตรวจเอง

3. **ตัวอย่าง Prompt ที่ปกปิดข้อมูลแล้ว**
   - มีอย่างน้อย 1 ตัวอย่างต่อ Tool ที่ใช้งานหลัก
   - ห้ามมีชื่อบริษัท ลูกค้า รหัสผ่าน API Key หรือข้อมูลภายในจริง
   - เน้นแสดงรูปแบบการสั่งงานและผลลัพธ์ที่คาดหวัง

4. **Before / After หรือ Code Diff**
   - มีตัวอย่าง 1–2 ชิ้น เช่น AI ช่วยแนะนำให้ตรวจ null, validation หรือ error handling
   - ระบุว่าเป็นตัวอย่างประกอบ และ Developer ยังเป็นผู้ Review/Test

5. **NotebookLM Slide / Outline Example**
   - ตัวอย่างลำดับ: Problem, Approach, Workflow, Demo/Result, Next Step

6. **Existing Interactive Demo**
   - ใช้ OceanLine AI — Shipping Rate Agent เป็นตัวอย่าง
   - อธิบาย Flow: LINE Request → AI Orchestration → Browser Automation → Structured Result
   - ต้องมีปุ่มเปิด Demo ใน Modal และปุ่มเปิดเต็มหน้า

7. **สิ่งที่เคยทำจริง**
   - สรุปผลงานที่เคยใช้ AI ช่วย พร้อมระบุ Tool ที่ใช้
   - หลีกเลี่ยงคำว่า TODO หรือข้อความที่บอกให้ผู้ชมมาเติมข้อมูลเอง

## แนวทางดีไซน์และ Interaction

- ใช้ Dark technical dashboard เป็น Design Language หลัก
- ใช้ Panel-based layout, status, progress, event log และ workflow card
- ใช้ขนาดตัวอักษรอ่านง่าย โดยเนื้อหาหลักไม่เล็กเกินไป
- ใช้ Animation แบบพอดี: Hero แสดงตอนเปิดเว็บ และ Section/Card ค่อย ๆ ปรากฏเมื่อ Scroll มาถึง
- รองรับ `prefers-reduced-motion` สำหรับผู้ใช้ที่ลดการเคลื่อนไหว
- เมื่อ Refresh ให้กลับไปเริ่มที่ส่วน Hero ด้านบนเสมอ

## Responsive Requirements

- Desktop: แสดง Grid หลายคอลัมน์ตามความเหมาะสม
- Tablet: ลด Grid เหลือ 2 หรือ 1 คอลัมน์โดยไม่ให้เนื้อหาล้น
- Mobile: Navbar เป็นเมนูเปิด/ปิด, การ์ดเรียงแนวตั้ง, ปุ่มกดง่าย, ข้อความไม่เล็ก
- Modal Demo บนมือถือยังต้องเปิด iframe ได้
- OceanLine Demo ต้องปรับจาก 3 คอลัมน์เป็น 2 คอลัมน์บน Tablet และ 1 คอลัมน์บนมือถือ
- ตารางที่กว้างควรเลื่อนแนวนอนได้ แทนการบีบข้อความจนอ่านไม่ออก

## Existing Demo: OceanLine

- เปลี่ยนชื่อที่แสดงจาก FreightLink เป็น **OceanLine**
- สามารถคงชื่อไฟล์เดิมไว้ได้ หากการเปลี่ยนชื่อไฟล์จะทำให้ URL หรือ Link เดิมเสีย
- ปุ่ม “เริ่มอัตโนมัติ” ควรมี Pulse Animation เพื่อให้รู้ว่ากดได้
- เอฟเฟกต์ Pulse ต้องหยุดระหว่าง Demo ทำงาน และกลับมาเมื่อ Reset
- ทุกข้อมูลใน Demo เป็น Mock Data และต้องไม่ส่งข้อมูลออกไปภายนอก

## Technical Requirements

- ใช้ NuxtJS `v4^` เท่านั้น
- ใช้ Static Generation เพื่อ Deploy ได้ง่าย
- ห้ามพึ่ง Backend, Database, API Key หรือ Internet สำหรับ Core Functionality
- Demo ใช้ Mock Data ได้
- เก็บ Existing HTML Demo ไว้ใน `public/demos/` เพื่อเรียกได้จากเว็บหลัก
- ใช้ Relative Path สำหรับลิงก์ Demo เพื่อให้ใช้งานได้ทั้ง Local, Static Output และ Vercel

## การตรวจงานก่อนส่ง

1. รัน `npm install`
2. รัน `npm run build` หรือ `npm run generate`
3. แก้ Build Error ที่พบทั้งหมด
4. ตรวจ Navigation, Modal, Animation และปุ่มต่าง ๆ
5. ตรวจการเปิด OceanLine Demo ทั้งใน Modal และเต็มหน้า
6. ตรวจ Desktop, Tablet และ Mobile
7. ตรวจ Relative Path และ JavaScript Error
8. ตรวจว่าไม่มี Secret, API Key, Password จริง หรือข้อมูลลูกค้าจริง
9. เขียน README พร้อมวิธี Run และ Build

## สิ่งที่ควรปรับเป็นข้อมูลจริงก่อนใช้งาน

- ชื่อและตำแหน่งงานของเจ้าของ Portfolio
- ผลงานที่ได้รับอนุญาตให้นำเสนอ
- Screenshot หรือ Demo ที่มีอยู่จริง
- Prompt ตัวอย่างที่ผ่านการปกปิดข้อมูลแล้ว
- ช่องทางติดต่อที่ยืนยันแล้ว
