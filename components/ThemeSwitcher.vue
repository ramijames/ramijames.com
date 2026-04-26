<template>
  <div class="theme-switcher-box" @click="toggleTheme">
    <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29" cy="29" r="14" stroke="currentColor" stroke-width="2"/>
      <path d="M29 43C21.268 43 15 36.732 15 29C15 21.268 21.268 15 29 15C29 25.5 29 32.5 29 43Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
    </svg>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '~/store/theme'

const themeStore = useThemeStore()

const currentTheme = computed(() => themeStore.currentTheme)

function toggleTheme() {
  themeStore.toggleTheme()
}

</script>

<style scoped lang="scss">
.theme-switcher-box {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 6px;

  svg {
    width: 44px;
    height: 44px;
    transition: transform 0.24s ease-in-out;
    color: currentColor;

    @media screen and (max-width: 1000px) {
      width: 40px;
      height: 40px;
    }
  }
}

.dark .theme-switcher-box svg {
  transform: rotate(180deg);
}
</style>
