<template>
  <div class="footer-summary general-main" v-if="isThoughtsSubPage">
    <h3>Article Addendum</h3>
    <p>I hope you enjoyed this article!</p>
    <p>Without direct feedback it can be hard to iterate, and I value your thoughts immensely. Please <a href="mailto:rami@ramijames.com">send me an email</a> if you find a typo or disagree with the content. I'm always up for a vigorous and lively debate!</p>
  </div>
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

</style>