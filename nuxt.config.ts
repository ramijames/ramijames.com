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
    '@nuxt/content',
    "nuxt-newsletter",
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
      'Open Sans': [400, 600, 700],
      'Libre Baskerville': [400, 700]
    }
  }
})