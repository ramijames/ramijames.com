<template>
  <div class="footer-summary general-main" v-if="isThoughtsSubPage">
    <h3>Article Addendum</h3>
    <p>I hope you enjoyed this article!</p>
    <p>Without direct feedback it can be hard to iterate, and I value your thoughts immensely. Please <a href="mailto:rami@ramijames.com">send me an email</a> if you find a typo or disagree with the content. I'm always up for a vigorous and lively debate!</p>
  </div>
  <footer>
      <div class="footer-content general-main">
        <div class="footer-links" v-if="notHome">
          <nuxt-link href="/">Home</nuxt-link>
          <nuxt-link href="/products">Products</nuxt-link>
          <nuxt-link href="/thoughts">Thoughts</nuxt-link>
          <nuxt-link href="/labs">Labs</nuxt-link>
          <nuxt-link href="/about">About</nuxt-link>
        </div>
        <div class="footer-links" v-if="notHome">
          <nuxt-link href="/privacy-policy" class="dim">Privacy Policy</nuxt-link>
          <nuxt-link href="/terms-and-conditions" class="dim">Terms & Conditions</nuxt-link>
        </div>
        <section class="footer-social">
          <a href="https://github.com/ramijames"><img src="/github-dark.svg" alt="Github" /></a>
          <a href="https://www.linkedin.com/in/rami-james/"><img src="/linkedin-dark.svg" alt="LinkedIn" /></a>
          <a href="mailto:rami@ramijames.com"><img src="/mail-dark.svg" alt="Send Rami an email" /></a>
          <a href="https://twitter.com/ramijames"><img src="/twitter-dark.svg" alt="Check out Rami's Twitter" /></a>
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


.footer-summary {
  border-top: 2px solid rgba($black-dark, 0.1) ;
}

.dark .footer-summary {
  border-top: 2px solid rgba($white, 0.1) ;
}

footer {
  width: 100dvw;
  font-size: $font-size-sm;
  font-family: $font-family-main;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: $black-dark;
  padding: $spacing-lg 0;

  @media screen and (max-width: 768px){
    align-items: center;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100vw;
    padding-top: 0;
    padding-bottom: 0;

    @media screen and (max-width: 768px){
      align-items: center;
    }
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
    margin-bottom: $spacing-md;
    width: 100%;

    @media screen and (max-width: 768px){
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: $spacing-sm;
    }

    a {
      text-decoration: none;
      font-weight:500;
      color: $white;
      font-size: $font-size-xl;

      @media screen and (max-width: 1000px){
        font-size: $font-size-md;
      }

      &.dim {
        color: $white;
        opacity: 0.3;
        font-size: $font-size-sm;
      }
    }
  }

  .footer-social {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: $spacing-lg;
    width: 100%;

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

.dark footer {
  background-color: $black-dark;

  .footer-links {
    a {
      color: $blue;
    }
  }

  .footer-social {
    a {
      img {

      }
    }
  }
}

</style>