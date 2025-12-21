export default defineNuxtConfig({
  css: [
    '~/assets/main.scss',
    '~/assets/products.scss',
    '~/assets/animation.scss',
    '~/assets/labs.scss',
    '~/assets/highcharts.scss',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
          lang: 'en',
      },
      titleTemplate: '%s %separator %siteName',
      templateParams: {
        separator: '—',
        siteName: 'Rami James'
      },
      charset: 'utf-8',
      meta: [
        { name: 'author', content: 'Rami James' },
        { name: 'description', content: 'My core focus over the last decade has been building technical tools that are easy to use and loved by developers. Much of that work has been developer advocacy and relations. I have developed some strong opinions on the right and wrong way to do things. You can read more about them here.' }
      ],
    }
  },
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
    "@nuxt/fonts"
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
      'Host Grotesk': [400, 500, 600, 700],
      'Roboto Sans': [400, 600, 700, 900],
      'Rokkitt': [400, 600, 700, 900],
    },
    preconnect: true,
    preload: true,
  },
  plugins: ['~/plugins/spline-viewer.client.ts'],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag === 'spline-viewer';
      }
    }
  },
  routeRules: {
    '/thoughts/on-ethical-pricing': { redirect: '/thoughts/how-to-make-product-decisions-based-on-business-needs' },
    '/labs/css-mesh-gradients': { redirect: '/thoughts/css-mesh-gradients' },
    '/labs/supabase-email-authentication-with-google-workspace': { redirect: '/thoughts/supabase-email-authentication-with-google-workspace' },
    '/illustrations': { redirect: '/products/illustrations' },
  },
})