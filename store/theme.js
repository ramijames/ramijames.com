import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: typeof window !== 'undefined' && window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : 'dark',
  }),
  actions: {
    toggleTheme() {
      const newTheme = this.theme === 'dark' ? 'light' : 'dark'
      this.$patch({ theme: newTheme })
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('theme', newTheme)
      }
    },
  },
  getters: {
    currentTheme() {
      return this.theme
    }
  }
})