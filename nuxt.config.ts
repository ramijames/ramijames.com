export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'IBM Plex Mono': [400, 500, 700],
      'Open Sans': [400, 600, 700]
    }
  }
})
