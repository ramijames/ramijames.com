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
        siteName: 'Rami James - Principal Product Designer'
      },
      charset: 'utf-8',
      meta: [
        { name: 'author', content: 'Rami James' },
        { name: 'description', content: 'My name is Rami James, and I work as a user-interface, user-experience, interaction, and design professional.' }
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
      'Libre Baskerville': [400, 500, 600, 700],
      'Roboto Sans': [400, 600, 700, 900],
      'Poppins': [400, 500, 600, 700, 800, 900],
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