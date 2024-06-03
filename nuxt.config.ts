export default defineNuxtConfig({
  css: [
    '~/assets/main.scss'
  ],
  devtools: { enabled: true },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxt/content',
    "nuxt-newsletter",
    "nuxt-calendly",
    "nuxt-gtag",
    "@nuxtjs/sitemap"
  ],
  gtag: {
    id: 'G-420689865'
  },
  newsletter: {    
    mailchimp: {      
    apiKey: process.env.MAILCHIMP_API_KEY,      
    serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX,      
    audienceId: process.env.MAILCHIMP_AUDIENCE_ID,      
    component: true     
    }  
  },
  googleFonts: {
    families: {
      'Montserrat': [400, 500, 600, 700],
      'Noto Sans': [400, 600, 700, 900],
    }
  }
})