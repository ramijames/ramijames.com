<template>
  <footer>
    <div class="footer-content w-full">
      <div class="footer-links">
        <section class="footer-social" v-if="currentTheme == 'dark'">
          <a href="https://github.com/ramijames"><img src="/github-dark.svg" alt="Github" /></a>
          <a href="https://www.linkedin.com/in/rami-james/"><img src="/linkedin-dark.svg" alt="LinkedIn" /></a>
          <a href="mailto:ramijames@gmail.com"><img src="/mail-dark.svg" alt="Send Rami an email" /></a>
        </section>

        <section class="footer-social" v-else>
          <a href="https://github.com/ramijames"><img src="/github-light.svg" alt="Github" /></a>
          <a href="https://www.linkedin.com/in/rami-james/"><img src="/linkedin-light.svg" alt="LinkedIn" /></a>
          <a href="mailto:ramijames@gmail.com"><img src="/mail-light.svg" alt="Send Rami an email" /></a>
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

<script setup>
import { useThemeStore } from '~/store/theme'
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'

const themeStore = useThemeStore()
const route = useRoute()

const currentTheme = computed(() => themeStore.currentTheme)
const isThoughtsSubPage = computed(() => route.path.startsWith('/thoughts/'))
const notHome = computed(() => route.path !== '/')

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

.dark {
  footer {
    width: 100%;
    font-family: $font-family-secondary;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    background: $black;

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
      color: $yellow !important;
      
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
        font-size: $font-size-sm;
        transition: all 0.5s ease-in-out;
        font-size: 9px;
        font-weight: 500;
        color: $yellow !important;
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
}

footer {
  width: 100%;
  font-family: $font-family-secondary;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background: $yellow;

  @media screen and (max-width: 1000px){
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

    @media screen and (max-width: 1000px){
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
    
    @media screen and (max-width: 1000px){
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
      font-size: $font-size-sm;
      transition: all 0.5s ease-in-out;
      font-size: 9px;
      font-weight: 500;
      color: rgba($black, 0.6);
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: $spacing-sm 0;

      &:hover {
        color: rgba($black, 1);
      }

    }
  }

  .footer-social {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: $spacing-md;
    transition: opacity 0.5s ease-in-out;
    border-right: 1px solid rgba($black, 0.2);
    padding-right: $spacing-md;

    @media screen and (max-width: 1000px){
      border-right: none;
      padding: 0 $spacing-md;
      border-bottom: 1px solid rgba($black, 0.2);
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
