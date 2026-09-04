<script setup lang="ts">
defineProps<{ title: string; flow: string[]; description: string }>()
const open = defineModel<boolean>('open', { default: false })
</script>
<template>
  <article class="demo-card"><p class="label">EXISTING RESULT / INTERACTIVE PROTOTYPE</p><h3>{{ title }}</h3><p>{{ description }}</p><div class="flow"><template v-for="(item, index) in flow" :key="item"><span>{{ item }}</span><i v-if="index < flow.length - 1">→</i></template></div><div class="card-actions"><button class="button primary" @click="open = true">ดู Demo</button><a class="button" href="/demos/freightlink_ai_shipping_rate_demo.html" target="_blank" rel="noopener">เปิด Demo เต็มหน้า ↗</a></div></article>
</template>
