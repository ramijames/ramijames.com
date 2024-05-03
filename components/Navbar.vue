<template>
  <nav class="main-nav">
    <section class="dark-side">
      <ThemeSwitcher /> 
      <!-- <span v-if="currentTheme !== 'dark'">Come to the dark side</span> -->
    </section>
    <section class="links">
      <nuxt-link to="/">Home</nuxt-link>
      <div class="dot"></div>
      <nuxt-link to="/products">Products</nuxt-link>
      <div class="dot"></div>
      <img :src="`/logo-${currentTheme}.svg`" alt="Rami James" class="logo" />
      <div class="dot"></div>
      <nuxt-link to="/thoughts">Thoughts</nuxt-link>
      <div class="dot"></div>
      <nuxt-link to="/about">About</nuxt-link>
    </section>
    <section class="contact">
      <a href="mailto:rami@ramijames.com"><img :src="`/mail-${currentTheme}.svg`" alt="Send Rami an email" /></a>
      <a href="https://twitter.com/ramijames"><img :src="`/twitter-${currentTheme}.svg`" alt="Check out Rami's Twitter" /></a>
    </section>
  </nav>
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { watch, onMounted, computed } from 'vue'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'

export default {
  setup() {
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
}
</script>

<style scoped>

.main-nav {
  z-index: 10;
  position: relative;
  height:120px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width:100%;
  backdrop-filter: blur(1px);
  background: linear-gradient(180deg, rgb(66, 57, 89,0.2) 0%, rgb(0, 0, 0, 0) 100%);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  mask-image: linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
}

    .main-nav::after {
      content:'';
      width:100%;
      height: 80%;
      position: absolute;
      top:0;
      left: 0;
      bottom:0;
      z-index: -1;
      backdrop-filter: blur(8px);
      background: linear-gradient(180deg, rgba(30, 26, 40, 0.2) 0%, rgb(0, 0, 0, 0) 100%);
      mask-image: linear-gradient(180deg, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
    }

    .dark-side {
      position:absolute;
      left:2rem;
      height: 80px;
      display:flex;
      flex-direction: row;
      align-items: center;
    }

    .contact {
      position:absolute;
      right:2rem;
      height: 80px;
      display:flex;
      flex-direction: row;
      align-items: center;
    }

    .main-nav .links {
      max-width:1000px;
      width:100%;
      margin:0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height:80px;
      gap:4rem;
      margin:0 auto;
      text-shadow: 0px 1px 1px rgba(255,255,255,0.24);
    }

    .main-nav .logo {
      width:80px;
    }

        .main-nav .dot {
          min-width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: black;
          content:'';
          opacity: 0.2;
        }

            .dark .main-nav .dot {
              background-color: white;
            }
    
        .main-nav .links a {
          color: black;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: .2rem;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: .6rem;
        }

            .dark .main-nav .links a {
              color: white;
            }

</style>