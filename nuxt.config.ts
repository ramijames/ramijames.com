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
      script: [
        {
          innerHTML: `(function sessionsight(w,i,n,s){var q=w._ssq=[],p=P=>new Proxy(function(){},{get:(_,k)=>k=='then'||typeof k=='symbol'?void 0:p(P.concat(k)),apply:(_,__,a)=>new Promise((rs,rj)=>q.push({p:P,a,rs,rj}))});w.SessionSight=p([]);var e=i.createElement('script');e.async=1;e.src=n;i.head.appendChild(e);w.SessionSight.init(s);})(window,document,'https://cdn.sessionsight.com/sessionsight.js',{publicApiKey:'sessionsight_pub_64cce878885dfb3db50fa3c35b97fb3c57dd6a53082bd6088d8d98f6660ebfed',propertyId:'a66ffc71-e122-489c-877e-c821391a80ee'});`,
          tagPosition: 'head',
          type: 'text/javascript'
        }
      ],
    }
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  site: {
    url: 'https://www.ramijames.com',
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/content',
    "nuxt-newsletter",
    "nuxt-calendly",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-highcharts",
    "nuxt-gtag",
    "@nuxt/fonts",
    "@nuxt/image",
  ],
  image: {
    format: ['avif', 'webp', 'png', 'jpg'],
    quality: 80,
    densities: [1, 2],
    screens: {
      xs: 360,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1600,
      xxl: 1920,
    },
  },
  fonts: {
    families: [
      { name: 'Noto Serif', provider: 'google', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
      { name: 'Roboto', provider: 'google', weights: [300, 400, 500, 600, 700] },
    ],
  },
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
    '/learn-solidity/foundational-solidity': { redirect: '/learn-solidity/' },
    '/learn-solidity/building-blocks': { redirect: '/learn-solidity/' },
    '/learn-solidity/working-with-ether': { redirect: '/learn-solidity/' },
    '/learn-solidity/security': { redirect: '/learn-solidity/' },
    '/learn-solidity/defi-patterns': { redirect: '/learn-solidity/' },
    '/learn-solidity/production': { redirect: '/learn-solidity/' },
    '/design-process': { redirect: '/' },
    '/app-icon-mockup': { redirect: '/tools/app-icon-mockup' },
  },
})