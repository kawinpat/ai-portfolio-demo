<script setup lang="ts">
defineProps<{ tool: string; usedFor: string[]; how: string; output: string }>()
</script>
<template>
  <article class="tool-card">
    <p class="label">AI TOOL</p><h3>{{ tool }}</h3>
    <dl><dt>ใช้สำหรับ</dt><dd>{{ usedFor.join(' · ') }}</dd><dt>วิธีที่ใช้</dt><dd>{{ how }}</dd><dt>ตัวอย่าง Output</dt><dd>{{ output }}</dd></dl>
  </article>
</template>
