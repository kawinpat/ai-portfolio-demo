<script setup lang="ts">
const workflows = [
  {
    tool: 'NotebookLM', title: 'สรุปความรู้และทำสไลด์', tag: 'KNOWLEDGE → PRESENTATION',
    task: 'อ่านเอกสาร รวบรวมสาระสำคัญ วางลำดับเนื้อหา และช่วยเตรียม Presentation / Slide',
    context: 'เอกสาร, ข้อมูล Project หรือหัวข้อที่ต้องนำเสนอ',
    output: 'Summary, โครงสร้าง Presentation และเนื้อหาสำหรับนำไปทำ Slide',
    review: 'ตรวจความถูกต้องของเนื้อหา ปรับลำดับเรื่อง และเลือกสิ่งที่จะนำเสนอเอง'
  },
  {
    tool: 'ChatGPT + Gemini', title: 'ถามคำถาม ช่วยเขียน และตรวจโค้ด', tag: 'QUESTION → CONTEXT → ANSWER',
    task: 'ถาม Technical Question, อธิบายโค้ด, ช่วยเขียนโค้ด, หาแนวทางแก้ปัญหา และ Review Code',
    context: 'Requirement, โค้ดที่เกี่ยวข้อง, Error / Log ที่ปกปิดข้อมูลแล้ว และข้อจำกัดของระบบ',
    output: 'คำอธิบาย, แนวทางแก้ไข, Code ตัวอย่าง, ข้อเสนอแนะ และมุมมองเปรียบเทียบ',
    review: 'ตรวจ logic, ความเข้ากันกับระบบ, security, edge cases และทดสอบก่อนใช้จริง'
  },
  {
    tool: 'OpenAI Codex', title: 'เขียนโค้ดและตรวจโค้ดใน Project', tag: 'PROJECT CONTEXT → CODE → REVIEW',
    task: 'อ่านหลายไฟล์ใน Project, Implement feature, แก้ไขโค้ดเดิม, Refactor, Review และแก้ bug',
    context: 'Requirement, Project context, โครงสร้างไฟล์ และขอบเขตการเปลี่ยนแปลงที่ต้องการ',
    output: 'Source code ที่แก้ไข, Diff สำหรับ Review, ข้อสังเกต และแนวทางแก้ปัญหา',
    review: 'Review Diff, ตรวจ Architecture และ Business Logic, Run / Test แล้วตัดสินใจ merge เอง'
  },
  {
    tool: 'ChatGPT', title: 'สร้าง HTML Interactive Demo', tag: 'IDEA → HTML PROTOTYPE → FEEDBACK',
    task: 'เปลี่ยน Requirement หรือ Flow ของระบบให้เป็น HTML Interactive Demo เพื่อสื่อสารไอเดีย',
    context: 'User flow, ข้อมูลที่อยากให้เห็น, รูปแบบผลลัพธ์ และสิ่งที่เป็น Mock data',
    output: 'ไฟล์ HTML / CSS / JavaScript ที่เปิดทดลอง Interaction ได้',
    review: 'ตรวจ Flow, ปรับข้อความและข้อมูลจำลอง, ใช้ Demo เพื่อรับ Feedback ก่อนพัฒนาต่อ'
  },
  {
    tool: 'Claude AI', title: 'สร้าง Dashboard Prototype', tag: 'REQUIREMENT → DASHBOARD → FEEDBACK',
    task: 'ช่วยเปลี่ยน Requirement และข้อมูลที่ต้องการแสดงให้เป็น Dashboard เพื่อมองภาพรวมของระบบและ User flow ได้เร็วขึ้น',
    context: 'หัวข้อ Dashboard, รายการข้อมูลหรือสถานะที่ต้องแสดง, ลำดับการใช้งาน และข้อมูลจำลองที่ใช้สื่อสาร',
    output: 'Dashboard Prototype ที่มี Layout, Cards, ตารางหรือสถานะ และ Interaction สำหรับนำไปคุยต่อกับทีม',
    review: 'ตรวจความถูกต้องของข้อมูลที่แสดง ปรับลำดับความสำคัญของหน้าจอ และใช้ Feedback เพื่อพัฒนาต่อ'
  }
]

const evidence = [
  { title: 'สรุปข้อมูลและเตรียม Slide', tool: 'NotebookLM', text: 'ใช้ NotebookLM ช่วยอ่านและจัดระเบียบข้อมูลจำนวนมากให้เป็นประเด็นสำคัญ จากนั้นนำ Summary และ Slide Outline ไปตรวจความถูกต้อง ปรับลำดับการเล่าเรื่อง และทำ Presentation ต่อด้วยตัวเอง' },
  { title: 'ถามคำถาม ช่วยโค้ด และ Review Code', tool: 'ChatGPT + Gemini', text: 'ใช้ ChatGPT และ Gemini สำหรับถามปัญหาเชิงเทคนิค อธิบายโค้ด หาแนวทางแก้ Error และเปรียบเทียบทางเลือกในการพัฒนา โดยส่งเฉพาะ Context ที่จำเป็นและปกปิดข้อมูลสำคัญก่อนเสมอ' },
  { title: 'พัฒนาและตรวจหลายไฟล์ใน Project', tool: 'OpenAI Codex', text: 'ใช้ Codex อ่าน Context ของ Project เพื่อช่วย Implement feature, แก้ไขโค้ดเดิม, Refactor และ Review การเปลี่ยนแปลงหลายไฟล์ แล้ว Developer ตรวจ Diff, ทดสอบ และตัดสินใจนำโค้ดไปใช้เอง' },
  { title: 'สร้าง HTML Interactive Demo', tool: 'ChatGPT', text: 'ใช้ ChatGPT ช่วยแปลง Idea และ User flow ให้เป็น HTML Interactive Demo เพื่อสื่อสารวิธีทำงานของระบบได้ชัดเจนขึ้น ตัวอย่างคือ FreightLink AI Shipping Rate Agent ที่เปิดทดลอง Interaction ได้' },
  { title: 'สร้าง Dashboard Prototype', tool: 'Claude AI', text: 'ใช้ Claude AI ช่วยสร้าง Dashboard Prototype จาก Requirement และข้อมูลที่ต้องการแสดง เพื่อเห็นภาพ Layout, สถานะ, Cards และ Flow ของหน้าจอได้รวดเร็ว แล้วนำไปปรับตาม Feedback ก่อนพัฒนาต่อ' }
]

const promptSamples = [
  { tool: 'ChatGPT', type: 'ตัวอย่าง Prompt ที่ปกปิดข้อมูลแล้ว', prompt: 'ช่วย Review logic ของ endpoint สำหรับสร้างรายการ Asset\n\nพิจารณา validation, edge cases และ error handling\n\nContext: ระบบใช้ REST API และมีการตรวจสอบข้อมูลก่อนบันทึก\nCode: [แสดงเฉพาะ service method ที่เกี่ยวข้อง]', output: 'AI ชี้จุดที่ควรตรวจ input, กรณีข้อมูลซ้ำ และเสนอ test cases ที่ควรเพิ่ม' },
  { tool: 'Gemini', type: 'ตัวอย่าง Prompt ที่ปกปิดข้อมูลแล้ว', prompt: 'กำลังเลือกวิธีประมวลผล Import Excel 2 แบบ\nA: ประมวลผลทันทีใน API\nB: ส่งเข้า Queue เพื่อประมวลผลเบื้องหลัง\n\nช่วยเปรียบเทียบด้าน maintainability, error handling และความซับซ้อน', output: 'AI สรุป trade-off ของแต่ละแนวทาง และคำถามที่ Developer ต้องใช้ตัดสินใจ' },
  { tool: 'OpenAI Codex', type: 'ตัวอย่าง Prompt ที่ปกปิดข้อมูลแล้ว', prompt: 'อ่าน Project context แล้วเพิ่ม validation ให้ API นี้\n\nRequirement:\n- ตรวจ required fields\n- คืน error ที่เข้าใจได้เมื่อไม่พบข้อมูล\n- แก้เฉพาะไฟล์ที่เกี่ยวข้อง\n\nหลังทำเสร็จ สรุป diff และรัน build', output: 'AI แก้ไฟล์ในขอบเขตงาน สรุป Diff และรายงานผล Build เพื่อให้ Developer review ต่อ' },
  { tool: 'NotebookLM', type: 'ตัวอย่าง Prompt ที่ปกปิดข้อมูลแล้ว', prompt: 'จากเอกสาร Project ที่ให้ ช่วยจัด Slide Outline สำหรับนำเสนอ\n\nต้องมี: ปัญหา, แนวทางแก้, System Workflow, Demo, ผลลัพธ์ และ Next Step\n\nไม่ใส่ชื่อบริษัท ลูกค้า หรือข้อมูลภายใน', output: 'AI สรุปเป็นลำดับ Slide ที่ใช้ตั้งต้นในการทำ Presentation ได้' }
]

const demoOpen = ref(false)
const navOpen = ref(false)
const closeNav = () => { navOpen.value = false }
</script>

<template>
  <header class="nav"><a class="brand" href="#top">Kawinpat <small>AI-ASSISTED DEVELOPMENT PORTFOLIO</small></a><button class="menu" :aria-expanded="navOpen" aria-label="เปิด/ปิดเมนู" @click="navOpen = !navOpen">☰</button><nav :class="{ open: navOpen }"><a href="#workflows" @click="closeNav">AI ช่วยอะไรบ้าง</a><a href="#demo" @click="closeNav">Demo</a><a href="#evidence" @click="closeNav">หลักฐาน</a></nav></header>
  <main id="top">
    <section class="hero wrap portfolio-hero"><div><p class="eyebrow">BACKEND / FULL-STACK DEVELOPER</p><h1>สิ่งที่ AI <em>ช่วยในการทำงาน</em><br>และสิ่งที่เคยทำ</h1><p class="lede">Portfolio นี้รวบรวมรูปแบบการใช้ AI ในงานจริง ตั้งแต่การค้นหาคำตอบ เขียนและตรวจโค้ด สรุปความรู้ทำสไลด์ ไปจนถึงสร้าง Interactive HTML Demo และ Dashboard Prototype</p><div class="actions"><a class="button primary" href="#workflows">ดู AI Workflows</a><button class="button" @click="demoOpen = true">เปิด FreightLink Demo</button></div></div><aside class="terminal portfolio-summary"><div class="terminal-bar"><span>● ● ●</span><b>AI WORK SUMMARY</b><em>ACTIVE</em></div><div class="summary-list"><p><i>01</i><span>NotebookLM<br><small>สรุปข้อมูลและทำ Slide</small></span></p><p><i>02</i><span>ChatGPT + Gemini<br><small>ถามคำถาม ช่วยเขียน และ Review Code</small></span></p><p><i>03</i><span>OpenAI Codex<br><small>เขียนโค้ด แก้ไข และตรวจหลายไฟล์</small></span></p><p><i>04</i><span>ChatGPT HTML Demo<br><small>สร้าง Prototype ที่กดลองได้</small></span></p><p><i>05</i><span>Claude AI Dashboard<br><small>สร้าง Dashboard Prototype</small></span></p></div></aside></section>

    <section id="workflows" class="section dark"><div class="wrap"><p class="eyebrow">AI ช่วยอะไรบ้าง</p><h2>ใช้ AI เป็นผู้ช่วยในงานแต่ละประเภท</h2><p class="section-lede">แต่ละส่วนแสดง Tool ที่ใช้, งานที่ให้ช่วย, Context ที่ส่ง, Output ที่ได้ และสิ่งที่ Developer ตรวจเอง</p><div class="workflows"><article v-for="(item, index) in workflows" :key="item.tool" class="work-card"><div class="work-head"><span>{{ String(index + 1).padStart(2, '0') }}</span><div><p class="label">{{ item.tag }}</p><h3>{{ item.title }}</h3></div><b>{{ item.tool }}</b></div><dl><div><dt>งานที่ให้ AI ช่วย</dt><dd>{{ item.task }}</dd></div><div><dt>Prompt / Context ที่ส่ง</dt><dd>{{ item.context }}</dd></div><div><dt>AI Output</dt><dd>{{ item.output }}</dd></div><div><dt>สิ่งที่ Developer ตรวจเอง</dt><dd>{{ item.review }}</dd></div></dl></article></div></div></section>

    <section class="section"><div class="wrap"><p class="eyebrow">PROMPT / CONTEXT EXAMPLES</p><h2>ตัวอย่าง Prompt ที่ปกปิดข้อมูลแล้ว</h2><p class="section-lede">ตัวอย่างประกอบเพื่อแสดงรูปแบบ Context ที่ส่งให้ AI โดยใช้ข้อมูลทั่วไป ไม่มีชื่อระบบ ลูกค้า หรือข้อมูลสำคัญ</p><div class="prompt-grid"><article v-for="item in promptSamples" :key="item.tool" class="prompt-card"><p class="label">{{ item.tool }} · {{ item.type }}</p><pre>{{ item.prompt }}</pre><p><b>ตัวอย่าง AI Output:</b> {{ item.output }}</p></article></div></div></section>

    <section class="section dark"><div class="wrap evidence-layout"><div><p class="eyebrow">CODE REVIEW EXAMPLE</p><h2>ตัวอย่าง Before / After สำหรับ Review Code</h2><p class="section-lede">ตัวอย่างประกอบของการใช้ AI ช่วยชี้จุดที่ต้องตรวจ และ Developer เป็นผู้ตรวจ/ทดสอบก่อนนำไปใช้จริง</p><div class="diff-card"><div><p class="label">BEFORE</p><pre>- const asset = await repository.findOne(id);
- return { data: asset.name };</pre></div><div><p class="label">AFTER</p><pre>+ const asset = await repository.findOne({ where: { id } });
+ if (!asset) throw new NotFoundException();
+ return { data: asset.name };</pre></div></div></div><aside class="slide-outline"><p class="eyebrow">NOTEBOOKLM RESULT EXAMPLE</p><h3>ตัวอย่าง Slide Outline</h3><ol><li>Problem / Context</li><li>Approach และ Workflow</li><li>สิ่งที่พัฒนา หรือสิ่งที่ค้นพบ</li><li>Demo / Result</li><li>Next Step</li></ol><p class="todo">ตัวอย่าง Outline สำหรับตั้งต้นทำ Slide โดยตรวจและปรับเนื้อหาจริงก่อนนำเสนอ</p></aside></div></section>

    <section id="demo" class="section"><div class="wrap"><p class="eyebrow">DEMO RESULT</p><h2>FreightLink AI — Shipping Rate Agent</h2><article class="demo-card main-demo"><div><p class="label">EXISTING INTERACTIVE HTML DEMO</p><h3>ตัวอย่างผลลัพธ์จากการทำ HTML Interactive Demo</h3><p>Demo จำลอง Flow ตั้งแต่ผู้ใช้ส่งคำขอทาง LINE → AI Orchestration → Browser Automation → ดึง Shipping Rate → ส่ง Result กลับ LINE</p><div class="flow"><span>LINE Request</span><i>→</i><span>AI Orchestration</span><i>→</i><span>Browser Automation</span><i>→</i><span>Structured Result</span></div><div class="card-actions"><button class="button primary" @click="demoOpen = true">ดู Demo ในหน้าเว็บ</button><a class="button" href="demos/freightlink_ai_shipping_rate_demo.html" target="_blank" rel="noopener">เปิด Demo เต็มหน้า ↗</a></div></div><aside class="demo-note"><b>Developer Review</b><p>ตรวจ User flow, ปรับข้อมูลจำลอง, ตรวจ Interaction และใช้ Demo เพื่อสื่อสารแนวคิดของระบบ</p></aside></article></div></section>

    <section id="evidence" class="section dark"><div class="wrap"><p class="eyebrow">PAST AI-ASSISTED WORK</p><h2>สิ่งที่เคยทำจริง</h2><p class="section-lede">รายการด้านล่างเป็นงานที่เคยใช้ AI ช่วย โดยระบุ Tool ที่ใช้และบทบาทของ Developer ในการตรวจสอบหรือพัฒนาต่อ</p><div class="evidence"><article v-for="item in evidence" :key="item.title" class="evidence-card"><p class="label">AI TOOL · {{ item.tool }}</p><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article></div></div></section>
  </main>
  <footer>AI-Assisted Development Portfolio · Backend / Full-stack Developer</footer>
  <Teleport to="body"><div v-if="demoOpen" class="modal" role="dialog" aria-modal="true" aria-label="ตัวอย่าง FreightLink Demo"><div class="modal-content"><button class="close" aria-label="ปิดตัวอย่าง Demo" @click="demoOpen = false">×</button><h2>FreightLink AI — Shipping Rate Agent</h2><p>Existing Interactive HTML Demo ที่ใช้สื่อสาร AI-assisted workflow</p><iframe src="demos/freightlink_ai_shipping_rate_demo.html" title="FreightLink AI Shipping Rate Demo" /><div class="card-actions"><a class="button primary" href="demos/freightlink_ai_shipping_rate_demo.html" target="_blank" rel="noopener">เปิด Demo เต็มหน้า ↗</a></div></div></div></Teleport>
</template>
