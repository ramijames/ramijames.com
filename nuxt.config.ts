export default defineNuxtConfig({
  css: [
    '~/assets/main.css'
  ],
  devtools: { enabled: true },
  components: true,
  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt'],
  googleFonts: {
    families: {
      'IBM Plex Mono': [400, 500, 700],
      'Open Sans': [400, 600, 700]
    }
  }
})
