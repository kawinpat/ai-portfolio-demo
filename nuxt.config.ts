export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css',
    '~/assets/css/overrides.css',
    '~/assets/css/portfolio.css',
    '~/assets/css/workflows.css',
    '~/assets/css/evidence.css',
    '~/assets/css/readability.css',
    '~/assets/css/visual-polish.css',
    '~/assets/css/scroll-reveal.css',
    '~/assets/css/responsive.css',
    '~/assets/css/route-map.css'
  ],
  runtimeConfig: {
    googleMapsServerKey: process.env.GOOGLE_MAPS_SERVER_KEY,
    companyLat: process.env.COMPANY_LAT,
    companyLng: process.env.COMPANY_LNG,
    public: { googleMapsBrowserKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY }
  },
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
