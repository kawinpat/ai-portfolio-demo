<script setup lang="ts">
defineProps<{ number: number; title: string; tool: string; task: string; input: string; output: string; decision: string; result: string }>()
</script>
<template>
  <article class="workflow-card">
    <div class="step-title"><span>{{ String(number).padStart(2, '0') }}</span><div><p class="label">WORKFLOW STEP</p><h3>{{ title }}</h3></div><b class="status">{{ tool }}</b></div>
    <div class="workflow-grid"><div><small>AI Tool</small><p>{{ tool }}</p></div><div><small>งาน</small><p>{{ task }}</p></div><div><small>Input / Prompt / Context</small><p>{{ input }}</p></div><div><small>AI Output</small><p>{{ output }}</p></div><div><small>สิ่งที่ Developer ตัดสินใจ</small><p>{{ decision }}</p></div><div><small>ผลลัพธ์</small><p>{{ result }}</p></div></div>
  </article>
</template>
