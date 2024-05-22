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
    "nuxt-calendly"
  ],
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
      'Inter': [400, 600, 700, 900],
      'Roboto': [400, 600, 700, 900],
    }
  }
})