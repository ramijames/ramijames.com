<template>
  <nav class="mobile-nav-bar">
    <div class="menu-switch">
      <div 
        class="menu"
        :class="`${mobileMenuOpen}`"
        @click="toggleMenu"
      ></div>
      <img src="/logo-transparent.png" alt="Rami James" @click="toggleMenu" />
      <div class="bread-crumbs">
        <nuxt-link to="/" v-if="notHome">Home</nuxt-link>
        <nuxt-link to="/thoughts" v-if="!isThoughtsPage && isThoughtsSubPage">Thoughts</nuxt-link>
        <nuxt-link to="/products" v-if="!isProductsPage && isProductsSubPage">Products</nuxt-link>
        <div class="current" v-if="notHome">{{ routeName }}</div>
      </div>
    </div>
    <ThemeSwitcher />
  </nav>
  <section class="mobile-nav-panel" :class="mobileMenuOpen ? 'open' : ''">
    <section class="mobile-nav-panel-links">
      <nuxt-link to="/" @click="closeMenu">Home</nuxt-link>
      <nuxt-link to="/products" @click="closeMenu">Recent Work</nuxt-link>
      <nuxt-link to="/thoughts" @click="closeMenu">Thoughts</nuxt-link>
      <nuxt-link to="/about" @click="closeMenu">About</nuxt-link>
    </section>
    <section class="mobile-nav-panel-contact">
      <a href="https://github.com/ramijames"><img :src="`/github-${currentTheme}.svg`" alt="Github" /></a>
      <a href="https://www.linkedin.com/in/rami-james/"><img :src="`/linkedin-${currentTheme}.svg`" alt="LinkedIn" /></a>
      <a href="mailto:rami@ramijames.com"><img :src="`/mail-${currentTheme}.svg`" alt="Send Rami an email" /></a>
      <a href="https://twitter.com/ramijames"><img :src="`/twitter-${currentTheme}.svg`" alt="Check out Rami's Twitter" /></a>
    </section>
  </section>
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { reactive, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'
import Button from '~/components/Button.vue'

export default {
  setup() {
    const themeStore = useThemeStore();

    const state = reactive({
      mobileMenuOpen: false,
    });

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
    const closeMenu = () => {
      state.mobileMenuOpen = false;
    };

    const toggleMenu = () => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
      console.log('click');
    };

    return {
      currentTheme: computed(() => themeStore.currentTheme),
      closeMenu,
      toggleMenu,
      mobileMenuOpen: computed(() => state.mobileMenuOpen),
      ...toRefs(state),
    }
  },
  components: {
    ThemeSwitcher,
    Button
  },
  computed: {
    notHome() {
      return this.$route.path !== '/';
    },
    isThoughtsPage() {
      return this.$route.path === '/thoughts';
    },
    isThoughtsSubPage() {
      return this.$route.path.startsWith('/thoughts/');
    },
    isProductsPage() {
      return this.$route.path === '/products';
    },
    isProductsSubPage() {
      return this.$route.path.startsWith('/products/');
    },
    routeName() {
      const pathParts = this.$route.path.split('/');
      return pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
    },
    routeArray() {
      return this.$route.path.split('/');
    }
  },
}
</script>

<style scoped lang="scss">

@import './assets/variables';

.mobile-nav-bar {
  position: sticky;
  width: 100vw;
  top: 0;
  z-index: 10000;
}

/* Don't show nav-panel by default */
.mobile-nav-panel {
  display: none;
}

.bread-crumbs {
  display: flex;
  flex-direction: row;
  gap: $spacing-xs;
  font-size: $font-size-md;
  border-left: 2px solid #ee6a33;
  transform: skewX(-10deg);
  padding: 0 $spacing-sm;

  a,
  .current {
    text-decoration: none;
    background-color: rgba($blue, 0.2);
    border-radius: $br-sm;
    padding: $spacing-xs $spacing-sm;
    backdrop-filter: blur(4px);
    text-transform: capitalize;
    font-weight: 500;
  }

  .current {
    background-color: $blue;
    color: $white;
  }

  @media screen and (max-width: 768px){
    display: none;
  }
}

.menu-switch {
  padding: $spacing-md $spacing-md;
  position:absolute;
  left: $p-desktop;
  top: $p-desktop;
  z-index: 10000;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: $spacing-md;

  @media screen and (max-width: 768px){
    left: 0;
    top: 0;
  }

  .menu {
    width: 40px;
    height: 40px;
    position: relative;

    @media screen and (max-width: 768px){
      width: 30px;
      height: 30px;
    }

    &::before {
      content: '';
      position: absolute;
      top: 12px;
      left: 0;
      width: 40px;
      height: 2px;
      backdrop-filter: blur(4px);
      background: $blue;
      transform-origin: center;
      transition: all 0.24s ease-in-out;

      @media screen and (max-width: 768px){
        width: 30px;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 22px;
      left: 0;
      width: 40px;
      height: 2px;
      backdrop-filter: blur(4px);
      background: $blue;
      transform-origin: center;
      transition: all 0.24s ease-in-out;

      @media screen and (max-width: 768px){
        width: 30px;
      }
    }

    &.true {
      &::before {
        top: 20px;
        transform: rotate(45deg);
      }

      &::after {
        top: 20px;
        transform: rotate(-45deg);
      }
    }
  }

  img {
    width: auto;
    height: 60px;

    @media screen and (max-width: 768px){
      height: 40px;
    }
  }
}

.dark .menu {
  &::before {
    background: rgba($white, 0.8);
  }

  &::after {
    background: rgba($white, 0.8);
  }
}

.menu-right {
  display:flex;
  flex-direction: row;
  gap:1rem;
}

.mobile-nav-panel {
  display:none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  padding: $spacing-lg;
  backdrop-filter: blur(80px);
  animation: fade 0.24s ease-in-out;
}

    .mobile-nav-panel.open {
      display: flex;
    }

    .mobile-nav-panel-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .mobile-nav-panel-header .close {
      display:flex;
      flex-direction: row;
      gap:1rem;
      width:100%;
      justify-content: flex-start;
      cursor: pointer;
    }

    .mobile-nav-panel-links {
      display:flex;
      flex-direction: column;
      width:100%;
      height:100%;
      justify-content: center;
      gap:1rem;
    }

        .mobile-nav-panel-links a {
          display:flex;
          flex-direction: column;
          justify-content: center;
          gap: $spacing-sm;
          color: $black;
          font-size: $font-size-xxl;
          font-weight:500;
          text-decoration: none;

          @media screen and (max-width: 768px){
            font-size: $font-size-xl;
          }
        }

        .mobile-nav-panel-links a:nth-child(1) {
          animation: enter 0.2s ease-in-out;
        }

        .mobile-nav-panel-links a:nth-child(2) {
          animation: enter 0.4s ease-in-out;
        }

        .mobile-nav-panel-links a:nth-child(3) {
          animation: enter 0.6s ease-in-out;
        }

        .mobile-nav-panel-links a:nth-child(4) {
          animation: enter 0.8s ease-in-out;
        }

        .dark .mobile-nav-panel-links a {
          color: $white;
        }
        
.mobile-nav-panel-contact {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width:100%;
}

.dark .mobile-nav-panel {
  background: rgba(0, 0, 0, 0.8);
}

.dark .menu-switch::after {
  background: rgba($white, 0.1);
}

.dark .menu-switch::before {
  background: rgba($white, 0.1);
}

@keyframes enter {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>