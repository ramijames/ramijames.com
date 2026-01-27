<template>
  <div class="theme-switcher-box" @click="toggleTheme">
    <!-- <div class="label">{{ currentTheme }}</div> -->
    <!-- <div class="theme-switcher"
      :class="`${currentTheme}`"
    >
      <img :src="`/${currentTheme}.svg`" alt="theme icon" />
    </div> -->
    <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="29" cy="29" r="14" stroke="white" stroke-width="2"/>
      <path d="M29 43C21.268 43 15 36.732 15 29C15 21.268 21.268 15 29 15C29 25.5 29 32.5 29 43Z" fill="white" stroke="white" stroke-width="2"/>
    </svg>

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
.dark {
  .theme-switcher-box {

    svg {
      transform: rotate(180deg);
      
      circle {
        stroke: $white;
      }

      path {
        stroke: $white;
        fill: $white;
      }
    }
  }
}

.theme-switcher-box {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  gap: 6px;

  svg {
    width: 56px;
    height: 56px;
    transition: all 0.24s ease-in-out;
    
    circle {
      stroke: $black;
    }

    path {
      stroke: $black;
      fill: $black;
    }
  }

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
    color: rgba($black, 0.4);
    font-family: $font-family-main;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: $font-size-xs;
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
      background: #534a4a;

      img {
        left: 2px;
        top: 1px;
      }
    }

    &.dark {
      background: #ccc;

      img {
        left: 16px;
        top: 1px;
      }
    }
  }
}

.dark .theme-switcher-box {

  .label {
    color: rgba($black, 0.4);
  }
}

</style>