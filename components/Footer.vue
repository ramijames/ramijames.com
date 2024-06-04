<template>
  <footer>
      <div class="footer-content general-main">
        <div class="footer-logo">
          <img src="/logo-transparent.png" alt="logo" />
        </div>
        <div class="footer-links">
          <nuxt-link href="/">Home</nuxt-link>
          <nuxt-link href="/products">Products</nuxt-link>
          <nuxt-link href="/thoughts">Thoughts</nuxt-link>
          <nuxt-link href="/about">About</nuxt-link>
        </div>
        <div class="footer-links">
          <nuxt-link href="/privacy-policy">Privacy Policy</nuxt-link>
          <nuxt-link href="/terms-and-conditions">Terms & Conditions</nuxt-link>
        </div>
        <section class="footer-social">
          <a href="https://github.com/ramijames"><img :src="`/github-${currentTheme}.svg`" alt="Github" /></a>
          <a href="https://www.linkedin.com/in/rami-james/"><img :src="`/linkedin-${currentTheme}.svg`" alt="LinkedIn" /></a>
          <a href="mailto:rami@ramijames.com"><img :src="`/mail-${currentTheme}.svg`" alt="Send Rami an email" /></a>
          <a href="https://twitter.com/ramijames"><img :src="`/twitter-${currentTheme}.svg`" alt="Check out Rami's Twitter" /></a>
        </section>
      </div>
  </footer>
</template>
<script>
import { useThemeStore } from '~/store/theme'
import { reactive, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'

export default {
  setup() {
    const themeStore = useThemeStore();

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
      currentTheme: computed(() => themeStore.currentTheme),
    }
  },
  components: {
    ThemeSwitcher
  }
}
</script>

<style scoped lang="scss">

@import './assets/variables';

footer {
  width: 100%;
  font-size: $font-size-md;
  font-family: $font-family-main;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px){
    font-size: $font-size-sm;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    padding-top: 0;
  }

  .footer-logo {
    img {
      width: 120px;
      margin-bottom: $spacing-lg;
    }
  }

  .footer-links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: $spacing-lg;

    @media screen and (max-width: 768px){
      gap: 10vw;
    }

    a {
      text-decoration: none;
      font-weight: 500;
    }
  }

  .footer-social {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: $spacing-lg;

    @media screen and (max-width: 768px){
      gap: 10vw;
    }

    a {
      img {
        width: 30px;
      }
    }
  }
}

</style>