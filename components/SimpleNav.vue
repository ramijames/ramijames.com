<template>
  <nav class="simple-nav-bar">
    <section class="navigation">
      <div 
        class="menu"
        :class="`${mobileMenuOpen}`"
        @click="toggleMenu"
      ></div>
      <img :src="`/logo-${currentTheme}.svg`" alt="Rami James" @click="toggleMenu" />
      <div class="nav-links">
        <nuxt-link to="/" class="nav-link">Home</nuxt-link>
        <nuxt-link to="/thoughts" class="nav-link">Thoughts</nuxt-link>
        <nuxt-link to="/labs" class="nav-link">Labs</nuxt-link>
        <nuxt-link to="/products" class="nav-link">Products</nuxt-link>
        <nuxt-link to="/about" class="nav-link">About</nuxt-link>
      </div>
    </section>
    <section class="extras">
      <Button to="/booking" text="Get Started" type="small" />
      <ThemeSwitcher />
    </section>
  </nav>
  <section class="bread-crumbs" v-if="notHome">
    <nuxt-link to="/" v-if="notHome" class="bread-crumb">Home</nuxt-link>
    <nuxt-link to="/thoughts" v-if="isThoughtsSubPage" class="bread-crumb">Thoughts</nuxt-link>
    <nuxt-link to="/labs" v-if="isLabsSubPage" class="bread-crumb">Labs</nuxt-link>
    <nuxt-link to="/products" v-if="!isProductsPage && isProductsSubPage" class="bread-crumb">Products</nuxt-link>
    <div class="current" v-if="notHome">{{ routeName }}</div>
  </section>

  <section class="mobile-nav-panel" :class="mobileMenuOpen ? 'open' : ''">
    <section class="mobile-nav-panel-links">
      <nuxt-link to="/" @click="closeMenu">Home</nuxt-link>
      <nuxt-link to="/products" @click="closeMenu">Recent Work</nuxt-link>
      <nuxt-link to="/thoughts" @click="closeMenu">Thoughts</nuxt-link>
      <nuxt-link to="/labs" @click="closeMenu">Labs</nuxt-link>
      <nuxt-link to="/about" @click="closeMenu">About</nuxt-link>
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
    isLabsPage() {
      return this.$route.path === '/labs';
    },
    isLabsSubPage() {
      return this.$route.path.startsWith('/labs/');
    },
    isProductsPage() {
      return this.$route.path === '/products';
    },
    isProductsSubPage() {
      return this.$route.path.startsWith('/products/');
    },
    routeName() {
      let pathParts = this.$route.path.split('/');
      pathParts = pathParts.map(part => part.replace(/-/g, ' '));
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

.simple-nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $spacing-md;

    @media screen and (max-width: 768px){
      gap: $spacing-xs;
    }

    .menu {
      width: 30px;
      height: 30px;
      position: relative;
      display:none;

      @media screen and (max-width: 768px){
        display: block;
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

    .nav-links {
      display: flex;
      gap: $spacing-xs;

      @media screen and (max-width: 1000px) {
        gap: 0;
      }

      .nav-link {
        color: $teal-dark;
        text-decoration: none;
        font-weight: 600;
        font-size: $font-size-sm;
        transition: color 0.3s;
        padding: $spacing-xs $spacing-sm;

        @media screen and (max-width: 768px) {
          display: none;
        }

        &:hover {
          color: $teal;
        }
        
        &.router-link-exact-active {
          color: $teal-dark;
          background-color: rgba($teal, 0.1);
          border-radius: $br-lg;
        }
      }
    }
  }

  img {
    width: 40px;
    cursor: pointer;
  }

  .nav-links {
    display: flex;
    gap: $spacing-md;
  }
}

.dark .simple-nav-bar {
  .navigation {
    .nav-link {
      color: $teal-light;

      &.router-link-exact-active {
          color: $white;
      }

      &:hover {
        color: $white;
      }
    }
  }
}

.extras {
  display: flex;
  flex-direction: row;
  gap: $spacing-md;
  align-items: center;

  @media screen and (max-width: 768px) {
    gap: $spacing-xs;
  }

}

.bread-crumbs {
  border-top: 1px solid rgba($teal-dark, 0.2);
  border-bottom: 1px solid rgba($teal-dark, 0.2);
  padding: $spacing-sm $spacing-md;
  display: flex;
  flex-direction: row;
  gap: $spacing-sm;
  text-transform: capitalize;
  font-weight: 600;
  font-size: $font-size-xs;
  color: $teal-dark;

  .bread-crumb {
    position: relative;
    text-decoration: none;

    &:after {
      content: '/';
      position: absolute;
      right: -10px;
      color: rgba($teal-dark, 0.2);
    }
  }

  .current {
    color: $teal-light;
  }

  a {
    transition: color 0.3s;

    &:hover {
      color: $teal;
    }
  }
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
  z-index: 10000;
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
          color: $teal-dark;
          font-size: 10dvw;
          font-weight:500;
          text-decoration: none;
          text-align: center;
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

        .mobile-nav-panel-links a:nth-child(5) {
          animation: enter 1s ease-in-out;
        }

        .dark .mobile-nav-panel-links a {
          color: $white;
        }

</style>