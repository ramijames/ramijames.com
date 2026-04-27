<template>
  <div class="theme-switcher-box" @click="toggleTheme" :aria-label="ariaLabel" role="button" tabindex="0">
    <svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
    </svg>
    <svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" fill="currentColor"/>
      <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="12" y1="2" x2="12" y2="5"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="5" y2="12"/>
        <line x1="19" y1="12" x2="22" y2="12"/>
        <line x1="4.5" y1="4.5" x2="6.6" y2="6.6"/>
        <line x1="17.4" y1="17.4" x2="19.5" y2="19.5"/>
        <line x1="4.5" y1="19.5" x2="6.6" y2="17.4"/>
        <line x1="17.4" y1="6.6" x2="19.5" y2="4.5"/>
      </g>
    </svg>
    <svg class="btn-trace" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle class="btn-trace-circle" cx="50" cy="50" r="49" fill="none" stroke="currentColor" stroke-width="2" pathLength="100"/>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '~/store/theme'

const themeStore = useThemeStore()

const currentTheme = computed(() => themeStore.currentTheme)
const ariaLabel = computed(() => currentTheme.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')

function toggleTheme() {
  themeStore.toggleTheme()
}
</script>

<style scoped lang="scss">
.theme-switcher-box {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: var(--fg);
  color: var(--bg);
  border: 1px solid rgb(var(--fg-rgb) / 0.15);
  border-radius: 50%;
  transition: transform 0.24s ease-in-out;

  @media screen and (max-width: 1000px) {
    width: 44px;
    height: 44px;
  }

  &:hover {
    .btn-trace {
      opacity: 1;

      .btn-trace-circle {
        animation: theme-btn-trace 0.5s ease forwards;
      }
    }
  }
}

.theme-icon {
  width: 50%;
  height: 50%;
  display: block;

  path, circle, line {
    fill: $white;
  }
}

.dark .theme-icon {
  width: 50%;
  height: 50%;
  display: block;

  path, circle {
    fill: $black;
  }

  g {
    stroke: $black;
    
  }
}

.theme-icon-sun {
  display: none;
}

.dark .theme-icon-moon,
.dark .theme-icon-moon {
  display: none;
}

.dark .theme-icon-sun,
.dark .theme-icon-sun {
  display: block;
}

.btn-trace {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.btn-trace-circle {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  vector-effect: non-scaling-stroke;
}

@keyframes theme-btn-trace {
  to { stroke-dashoffset: 0; }
}
</style>
