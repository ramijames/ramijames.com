import type { RouterConfig } from '@nuxt/schema'
import { useNuxtApp } from '#app'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:finish', () => {
        if (savedPosition) {
          resolve(savedPosition)
        } else if (to.hash) {
          resolve({ el: to.hash, top: 0, behavior: 'smooth' })
        } else {
          resolve({ top: 0 })
        }
      })
    })
  }
}
