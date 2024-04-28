<template>
  <img
    @click="toggleTheme"
    :src="`/${currentTheme}.svg`"
    :alt="`${currentTheme} theme`"
  />
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { watch, onMounted, computed } from 'vue'

export default {
  setup() {
    const themeStore = useThemeStore()

    function toggleTheme() {
      themeStore.toggleTheme()
    }

    onMounted(() => {
      watch(
        () => themeStore.currentTheme,
        (newTheme, oldTheme) => {
          if (typeof document !== 'undefined') {
            document.body.classList.remove(`${oldTheme}`)
            document.body.classList.add(`${newTheme}`)
          }
        },
        { immediate: true }
      )
    })

    return {
      toggleTheme,
      currentTheme: computed(() => themeStore.currentTheme)
    }
  },
}
</script>

<style scoped>

img {
  cursor: pointer;
  width: 28px;
  height: 28px;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 20px;
  padding: .3rem;
}

</style>