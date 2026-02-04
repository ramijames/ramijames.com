import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(_to, _from, savedPosition) {
    // Browser back/forward - restore saved position
    if (savedPosition) {
      return savedPosition
    }

    // Hash navigation is handled by the scroll plugin
    // Regular navigation scroll is also handled by the scroll plugin
    // Return false to prevent default scroll behavior
    return false
  }
}
