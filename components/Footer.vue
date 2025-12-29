<template>
  <footer>
    <div class="footer-content w-full">
      <div class="footer-links">
        <section class="footer-social">
          <a href="https://github.com/ramijames"><img src="/github-dark.svg" alt="Github" /></a>
          <a href="https://www.linkedin.com/in/rami-james/"><img src="/linkedin-dark.svg" alt="LinkedIn" /></a>
          <a href="mailto:ramijames@gmail.com"><img src="/mail-dark.svg" alt="Send Rami an email" /></a>
        </section>
        <!-- <nuxt-link class="link" href="/" v-if="notHome">Home</nuxt-link>
        <nuxt-link class="link" href="/thoughts">Thoughts</nuxt-link>
        <nuxt-link class="link" href="/products">Recent Work</nuxt-link>
        <nuxt-link class="link" href="/about">About</nuxt-link> -->
        <nuxt-link class="link" href="/privacy-policy">Privacy</nuxt-link>
        <nuxt-link class="link" href="/terms-and-conditions">Terms</nuxt-link>
      </div>
      <section class="copyright">
        <span>&copy; Rami James 2003-2025</span>
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

footer {
  width: 100%;
  font-family: $font-family-secondary;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: $black;
  border-bottom: $border;

  @media screen and (max-width: 768px){
    align-items: center;
    flex-direction: column;
    border-bottom: none;
  }

  .footer-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;

    @media screen and (max-width: 768px){
      align-items: center;
      flex-direction: column;
    }
  }

  .copyright {
    font-size: 11px;
    opacity: 0.3;
    padding: $spacing-sm;
  }

  .footer-links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-md;
    opacity: 0.7;
    
    @media screen and (max-width: 768px){
      .link {
        display: none;
      }
    }
    
    &:hover {
      opacity: 1;
    }

    @media screen and (max-width: 1000px){
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: $spacing-sm;
      opacity: 1;
      width: 100%;
    }

    a {
      text-decoration: none;
      color: $white;
      font-size: $font-size-sm;
      transition: all 0.5s ease-in-out;
      font-size: 9px;
      font-weight: 500;
      color: rgba($white, 0.4);
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: $spacing-sm 0;

      &:hover {
        color: rgba($white, 1);
      }

    }
  }

  .footer-social {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: $spacing-md;
    transition: opacity 0.5s ease-in-out;
    border-right: $border;
    padding-right: $spacing-md;

    @media screen and (max-width: 768px){
      border-right: none;
      padding: 0 $spacing-md;
      border-bottom: $border;
      width: 100%;
    }
    
    &:hover {
      opacity: 1;
    }

    a {
      img {
        width: 30px;
      }
    }
  }
}

</style>
