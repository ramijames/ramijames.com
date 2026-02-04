export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    // Get the current route
    const route = nuxtApp.$router.currentRoute.value

    // Don't scroll if navigating to a hash
    if (route.hash) {
      const el = document.querySelector(route.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }

    // Scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  })
})
