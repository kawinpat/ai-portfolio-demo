<script setup lang="ts">
defineProps<{ title: string; text: string }>()
</script>
<template>
  <article class="evidence-card"><p class="label">EVIDENCE AREA</p><h3>{{ title }}</h3><p>{{ text }}</p></article>
</template>
