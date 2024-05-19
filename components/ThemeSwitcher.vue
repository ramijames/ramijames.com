<template>
  <img
    class="theme-switcher"
    @click="toggleTheme"
    :src="`/${currentTheme}.svg`"
    :alt="`${currentTheme} theme`"
    width="40"
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

.theme-switcher {
  z-index: 1;
}

img {
  cursor: pointer;
  width: 40px;
  height: 40px;
}

</style>