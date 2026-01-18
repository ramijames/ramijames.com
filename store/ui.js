import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    footerCtaVisible: false
  }),
  actions: {
    setFooterCtaVisible(visible) {
      this.footerCtaVisible = visible
    }
  }
})
