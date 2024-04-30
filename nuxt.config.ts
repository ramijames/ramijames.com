export default defineNuxtConfig({
  css: [
    '~/assets/main.css'
  ],
  devtools: { enabled: true },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  modules: [
    '@nuxtjs/google-fonts', 
    '@pinia/nuxt', 
    '@nuxt/content'
  ],
  googleFonts: {
    families: {
      'Open Sans': [400, 600, 700],
      'Libre Baskerville': [400, 700]
    }
  }
})