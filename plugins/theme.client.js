import { useThemeStore } from '~/store/theme'

export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()

  // Hydrate saved theme from localStorage into the Pinia store.
  // The body class is already set by the inline script in <head> (see app.vue),
  // so we only need to sync the store here.
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme && savedTheme !== themeStore.currentTheme) {
    themeStore.$patch({ theme: savedTheme })
  }

  // Keep the body class in sync when the user toggles the theme
  // immediate: true ensures the class is applied on initial load/navigation
  watch(
    () => themeStore.currentTheme,
    (newTheme, oldTheme) => {
      if (oldTheme) {
        document.body.classList.remove(oldTheme)
      }
      document.body.classList.add(newTheme)
    },
    { immediate: true }
  )
})
