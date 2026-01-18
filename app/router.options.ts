import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // If the user used browser back/forward, restore their position
    if (savedPosition) {
      return savedPosition
    }

    // If navigating to a hash anchor, scroll to it
    if (to.hash) {
      return {
        el: to.hash,
        top: 0,
        behavior: 'smooth'
      }
    }

    // Otherwise, scroll to the top of the page
    return { top: 0 }
  }
}
