export default defineNuxtConfig({
  css: [
    '~/assets/main.scss',
    '~/assets/labs.scss',
    '~/assets/highcharts.scss',
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
    "@nuxtjs/sitemap",
    "nuxt-module-hotjar",
    "@nuxtjs/robots",
    "nuxt-highcharts",
    "nuxt-gtag",
  ],
  gtag: {
    id: 'G-N9MEGS1HSD'
  },
  hotjar: {
    hotjarId: 5004344,
    scriptVersion: 6,
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
      'Montserrat': [400, 500, 600, 700, 800, 900],
      'Noto Sans': [400, 600, 700, 900],
    }
  },
  routeRules: {
    '/thoughts/on-ethical-pricing': { redirect: '/thoughts/how-to-make-product-decisions-based-on-business-needs' },
  },
})