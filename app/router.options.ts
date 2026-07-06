import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  // Wait until the new page has actually rendered (and laid out its full height)
  // before scrolling, otherwise the saved position can't be reached on back/
  // forward navigation. Handles: back/forward → restore, hash → smooth scroll,
  // everything else → top.
  scrollBehavior(to, _from, savedPosition) {
    const nuxtApp = useNuxtApp()
    // 'instant' so the jump isn't animated by `html { scroll-behavior: smooth }`
    // (which would visibly scroll the page). Hash links keep the smooth scroll.
    const target: any = savedPosition
      ? { ...savedPosition, behavior: 'instant' }
      : to.hash
        ? { el: to.hash, behavior: 'smooth' }
        : { left: 0, top: 0, behavior: 'instant' }

    return new Promise((resolve) => {
      let done = false
      const finish = () => {
        if (done) return
        done = true
        // Two frames so the transition-stage / stacked cards have laid out.
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(target)))
      }
      nuxtApp.hooks.hookOnce('page:finish', finish)
      // Fallback in case page:finish already fired.
      setTimeout(finish, 1200)
    })
  },
}
