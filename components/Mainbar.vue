<template>
  <section class="mainbar">
    <section class="dark-side">
      <ThemeSwitcher /> 
      <span v-if="currentTheme !== 'dark'">Come to the dark side</span>
    </section>
    <section class="contact">
      <a href="mailto:rami@ramijames.com"><img :src="`/mail-${currentTheme}.svg`" alt="Send Rami an email" /></a>
      <a href="https://twitter.com/ramijames"><img :src="`/twitter-${currentTheme}.svg`" alt="Check out Rami's Twitter" /></a>
    </section>
  </section>
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { watch, onMounted, computed } from 'vue'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'

export default {
  setup() {
    
    definePageMeta({
      layout: 'home'
    })

    const themeStore = useThemeStore()

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
      currentTheme: computed(() => themeStore.currentTheme)
    }
  },
  components: {
    ThemeSwitcher
  }
}
</script>

<style>

.mainbar {
  padding:24px 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  bottom:0;
  width: 48px;
}

.dark-side {
  display:flex;
  flex-direction: row;
  font-size:.6rem;
  text-transform: uppercase;
  align-items: center;
  gap:1rem;
}

    .dark-side span {
      animation: pulse 2s infinite;
      position: fixed;
      left:98px;
      top:1.6rem;
    }

    .contact {
      display:flex;
      flex-direction: column;
      gap:1rem;
    }

.dark .mainbar {
  background-color: white;
}

@keyframes pulse {
  0% {
    margin-left:0.5rem;
  }
  50% {
    margin-left:0rem;
  }
  100% {
    margin-left:0.5rem;
  }
}

</style>