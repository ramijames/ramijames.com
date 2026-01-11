<template>
  <div class="theme-switcher-box" @click="toggleTheme">
    <div class="theme-switcher"
      :class="`${currentTheme}`"
    >
      <img :src="`/${currentTheme}.svg`" alt="theme icon" />
    </div>
    <div class="label">{{ currentTheme }}</div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { useThemeStore } from '~/store/theme'

const themeStore = useThemeStore()

const currentTheme = computed(() => themeStore.currentTheme)

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
</script>

<style scoped lang="scss">

@import './assets/variables';

.theme-switcher-box {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  gap: 6px;
  margin: 0 auto;

  span {
    background: $white-dark;
    border-radius: $br-lg;
    padding: 4px $spacing-md 4px $spacing-xs;
    margin-right: -26px;
    font-size: 10px;
    font-weight: 500;
    color: rgba($black,0.4);
  }

  .label {
    color: rgba($black, 0.7);
    font-family: $font-family-secondary;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 9px;
    font-weight: 500;
  }

  .theme-switcher {
    position: relative;
    width: 40px;
    border-radius: 30px;
    height: 26px;
    transition: all 0.3s ease-in-out;

    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin: 1px;
      border-radius: 50%;
      position: absolute;
      transition: all 0.3s ease-in-out;
      margin-top: 2px;
    }

    &.light { 
      background: $blue;

      img {
        left: 2px;
        top: 1px;
      }
    }

    &.dark {
      background: $white;

      img {
        left: 16px;
        top: 1px;
      }
    }
  }
}

.dark .theme-switcher-box {

  .label {
    color: rgba($white, 0.7);
  }
}

</style>