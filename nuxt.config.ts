export default defineNuxtConfig({
  runtimeConfig: {
    resendApiKey: '',
  },
  css: [
    '~/assets/main.scss',
    '~/assets/products.scss',
    '~/assets/animation.scss',
    '~/assets/labs.scss',
    '~/assets/highcharts.scss'
  ],
  devtools: { enabled: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
          lang: 'en',
      },
      titleTemplate: '%s %separator %siteName',
      templateParams: {
        separator: '|',
        siteName: 'ramijames.com'
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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:map" as *; @use "~/assets/_variables.scss" as *;'
        }
      }
    }
  },
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
  routeRules: {
    '/thoughts/on-ethical-pricing': { redirect: '/thoughts/how-to-make-product-decisions-based-on-business-needs' },
    '/labs/css-mesh-gradients': { redirect: '/thoughts/css-mesh-gradients' },
    '/labs/supabase-email-authentication-with-google-workspace': { redirect: '/thoughts/supabase-email-authentication-with-google-workspace' },
    '/illustrations': { redirect: '/products/illustrations' },
    '/learn-threejs/assets': { redirect: '/learn-threejs/' },
    '/learn-threejs/building-blocks': { redirect: '/learn-threejs/' },
    '/learn-threejs/foundational-threejs': { redirect: '/learn-threejs/' },
    '/learn-threejs/lighting': { redirect: '/learn-threejs/' },
    '/learn-threejs/interaction': { redirect: '/learn-threejs/' },
    '/learn-threejs/shaders': { redirect: '/learn-threejs/' },
  },
})