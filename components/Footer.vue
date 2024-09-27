<template>
  <footer>
    <section class="w-three-quarters">
      <div class="footer-content ">
        <div class="footer-links">
          <nuxt-link href="/" v-if="notHome">Home</nuxt-link>
          <nuxt-link href="/thoughts">Thoughts</nuxt-link>
          <nuxt-link href="/illustrations">Illustrations</nuxt-link>
          <nuxt-link href="/products">Recent Work</nuxt-link>
          <nuxt-link href="/about">About</nuxt-link>
        </div>
        <div class="footer-links" v-if="notHome">
          <nuxt-link href="/privacy-policy" class="dim">Privacy Policy</nuxt-link>
          <nuxt-link href="/terms-and-conditions" class="dim">Terms & Conditions</nuxt-link>
        </div>
        <section class="footer-social">
          <a href="https://github.com/ramijames"><img src="/github-dark.svg" alt="Github" /></a>
          <a href="https://www.linkedin.com/in/rami-james/"><img src="/linkedin-dark.svg" alt="LinkedIn" /></a>
          <a href="mailto:ramijames@gmail.com"><img src="/mail-dark.svg" alt="Send Rami an email" /></a>
          <a href="https://twitter.com/ramijames"><img src="/twitter-dark.svg" alt="Check out Rami's Twitter" /></a>
        </section>
      </div>
    </section>
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
  },
  computed: {
    route() {
      return useRoute();
    },
    isThoughtsSubPage() {
      return this.$route.path.startsWith('/thoughts/');
    },
    notHome() {
      return this.$route.path !== '/';
    },
  }
}
</script>

<style scoped lang="scss">

@import './assets/variables';

footer {
  width: 100%;
  font-size: $font-size-sm;
  font-family: $font-family-main;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: $black-dark;

  @media screen and (max-width: 768px){
    align-items: center;
  }

  .general-main {
    padding-top: 0;
    position: relative;

    @media screen and (max-width: 768px){
      border-left: none;
      border-right: none;
    }
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: $spacing-lg 0;
    width: 100%;

    @media screen and (max-width: 768px){
      align-items: center;
    }
  }

  .footer-links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: $spacing-lg;
    margin-bottom: $spacing-lg;
    width: 100%;
    opacity: 0.5;
    transition: opacity 0.5s ease-in-out;
    
    &:hover {
      opacity: 1;
    }

    @media screen and (max-width: 1000px){
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: $spacing-sm;
      opacity: 1;
    }

    a {
      text-decoration: none;
      font-weight:500;
      color: $white;
      font-size: $font-size-md;
      border-bottom: 2px solid transparent;
      transition: all 0.5s ease-in-out;

      &:hover {
        border-bottom: 2px solid $blue;
      }

    }
  }

  .footer-social {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: $spacing-lg;
    width: 100%;
    opacity: 0.5;
    transition: opacity 0.5s ease-in-out;
    
    &:hover {
      opacity: 1;
    }

    @media screen and (max-width: 1000px){
      opacity: 1;
    }

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