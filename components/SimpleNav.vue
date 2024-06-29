<template>
  <nav class="simple-nav-bar">
    <section class="navigation">
      <div 
        class="menu"
        :class="`${mobileMenuOpen}`"
        @click="toggleMenu"
      ></div>
      <nuxt-link to="/"><img :src="`/logo-${currentTheme}.svg`" alt="Rami James" /></nuxt-link>
      <div class="nav-links">
        <nuxt-link to="/" class="nav-link">Home</nuxt-link>
        <nuxt-link to="/thoughts" class="nav-link">Thoughts</nuxt-link>
        <nuxt-link to="/labs" class="nav-link">Labs</nuxt-link>
        <nuxt-link to="/illustrations" class="nav-link">Illustrations</nuxt-link>
        <nuxt-link to="/products" class="nav-link">Recent Work</nuxt-link>
        <nuxt-link to="/about" class="nav-link">About</nuxt-link>
      </div>
    </section>
    <section class="extras">
      <ThemeSwitcher />
      <Button to="/booking" v-if="notHome" text="Contact me" type="small" />
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
      <nuxt-link to="/illustrations" @click="closeMenu">Illustrations</nuxt-link>
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
      width: 40px;
      height: 40px;
      position: relative;
      display:none;

      @media screen and (max-width: 1000px){
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
        background: $black;
        transform-origin: center;
        transition: all 0.24s ease-in-out;

        @media screen and (max-width: 1000px){
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
        background: $black;
        transform-origin: center;
        transition: all 0.24s ease-in-out;

        @media screen and (max-width: 1000px){
          width: 30px;
        }
      }

    }

    .nav-links {
      display: flex;
      gap: $spacing-md;

      @media screen and (max-width: 1000px) {
        gap: $spacing-sm;
      }

      .nav-link {
        color: $black-dark;
        text-decoration: none;
        font-weight: 500;
        font-size: $font-size-md;
        transition: color 0.3s;
        padding: $spacing-xxs 0;
        border-bottom:2px solid transparent;
        transition: all 0.3s ease-in-out;

        @media screen and (max-width: 1000px) {
          display: none;
        }

        &:hover {
          color: $black;
          border-bottom:2px solid rgba($blue, 1);
        }
        
        &.router-link-exact-active {
          color: $blue-dark;
          background-color: transparent;
          border-bottom:2px solid $blue;
        }
      }
    }
  }

  img {
    width: 56px;
    cursor: pointer;
  }

  .nav-links {
    display: flex;
    gap: $spacing-md;
  }
}

.dark .simple-nav-bar {
  .menu {
    &::before {
      background: $white;
    }

    &::after {
      background: $white;
    }
  }

  .navigation {
    .nav-link {
      color: $white-light;

      &.router-link-exact-active {
          color: $white;
          border-color: $white;
      }

      &:hover {
        color: $white;
        border-color: rgba($white,0.4);
      }
    }
  }
}

.dark .mobile-nav-panel.open {
  background: rgba($black, 0.2);
}

.extras {
  display: flex;
  flex-direction: row;
  gap: $spacing-md;
  align-items: center;

  @media screen and (max-width: 1000px) {
    gap: $spacing-xs;
  }

}

.bread-crumbs {
  border-top: 1px solid rgba($black-dark, 0.1);
  padding: $spacing-md $spacing-md;
  display: flex;
  flex-direction: row;
  gap: $spacing-sm;
  text-transform: capitalize;
  font-weight: 600;
  font-size: $font-size-xs;
  color: $black-dark;

  .bread-crumb {
    position: relative;
    text-decoration: none;
    color: $black-dark;
    text-decoration: underline;

    &:after {
      content: '/';
      position: absolute;
      right: -10px;
      color: rgba($black-dark, 0.2);
    }
  }

  .current {
    color: $black-light;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    transition: color 0.3s;

    &:hover {
      color: $black;
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
  background: rgba(255, 255, 255, 0.2);
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
          color: $black-dark;
          font-size: 8dvw;
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

.dark .bread-crumbs {
  border-top: 1px solid rgba($white-dark, 0.2);
  padding: $spacing-md;
  display: flex;
  flex-direction: row;
  gap: $spacing-sm;
  text-transform: capitalize;
  font-weight: 600;
  font-size: $font-size-xs;
  color: $white-dark;

  .bread-crumb {
    position: relative;
    text-decoration: none;
    color: $white-dark;
    text-decoration: underline;

    &:after {
      content: '/';
      position: absolute;
      right: -10px;
      color: rgba($white-dark, 0.2);
    }
  }

  .current {
    color: $white-light;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    transition: color 0.3s;

    &:hover {
      color: $white;
    }
  }
}

</style>