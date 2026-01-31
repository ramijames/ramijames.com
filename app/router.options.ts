import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else if (to.hash) {
          resolve({ el: to.hash, top: 0, behavior: 'smooth' })
        } else {
          resolve({ top: 0 })
        }
      }, 0)
    })
  }
}
