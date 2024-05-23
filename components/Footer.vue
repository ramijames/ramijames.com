<template>
  <footer>
      <div class="footer-content">
        <div class="footer-logo">
          <img src="/logo-light.svg" alt="logo" />
        </div>
        <div class="footer-links">
          <a href="#">Home</a>
          <a href="#">Projects</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
        <section class="mobile-nav-panel-contact">
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
  font-size: $font-size-xs;
  font-family: $font-family-secondary;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;

  .footer-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
  }

  .footer-logo {
    img {
      width: 100px;
    }
  }

  .footer-links {
    a {
      text-decoration: none;
      margin-right: $spacing-md;
    }
  }

  .footer-social {
    a {
      img {
        width: 20px;
        margin-right: $spacing-md;
      }
    }
  }
}

</style>