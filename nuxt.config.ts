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
      'IBM Plex Mono': [400, 500, 700],
      'Open Sans': [400, 600, 700]
    }
  }
})