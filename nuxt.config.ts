export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: { preset: 'static' },
  css: ['~/assets/css/main.css', '~/assets/css/overrides.css', '~/assets/css/portfolio.css', '~/assets/css/workflows.css', '~/assets/css/evidence.css', '~/assets/css/readability.css', '~/assets/css/visual-polish.css', '~/assets/css/scroll-reveal.css', '~/assets/css/responsive.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'th' },
      title: 'Kawinpat | พอร์ตโฟลิโอ Nuxt 4 แบบ AI-Assisted',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'พอร์ตโฟลิโอ Nuxt 4 ที่อธิบายกระบวนการพัฒนาซอฟต์แวร์ด้วย AI อย่างชัดเจน' }
      ]
    }
  }
})
