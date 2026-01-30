import { useThemeStore } from '~/store/theme'

export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()

  // Apply the initial theme class immediately on the client
  document.body.classList.add(themeStore.currentTheme)

  // Watch for changes and update the body class
  watch(
    () => themeStore.currentTheme,
    (newTheme, oldTheme) => {
      if (oldTheme) {
        document.body.classList.remove(oldTheme)
      }
      document.body.classList.add(newTheme)
    }
  )
})
