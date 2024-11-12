<template>
  <nav class="simple-nav-bar">
    <section :class="['navigation', mobileMenuOpen ? 'open' : '']">
      <nuxt-link to="/" class="logo-link"><img :src="`/logo-dark.svg`" alt="Rami James" /></nuxt-link>
      <div class="nav-links">
        <nuxt-link to="/" class="nav-link">Home</nuxt-link>
        <nuxt-link to="/services" class="nav-link">Services</nuxt-link>
        <nuxt-link to="/products" :class="['nav-link', isProductsSubPage ? 'router-link-active' : '']">Recent Work</nuxt-link>
        <nuxt-link to="/thoughts" :class="['nav-link', isThoughtsSubPage ? 'router-link-active' : '']">Thoughts</nuxt-link>
        <nuxt-link to="/about" class="nav-link">About</nuxt-link>
      </div>
      <button 
        :class="['menu', mobileMenuOpen ]"
        @click="toggleMenu"
        tabindex="0"
        role="button"
      ></button>
    </section>
  </nav>

  <section class="mobile-nav-panel" :class="mobileMenuOpen ? 'open' : ''">
    <button class="close"@click="closeMenu"></button>
    <section class="mobile-nav-panel-links">
      <nuxt-link to="/" @click="closeMenu">Home</nuxt-link>
      <nuxt-link to="/services" @click="closeMenu">Services</nuxt-link>
      <nuxt-link to="/products" @click="closeMenu">Recent Work</nuxt-link>
      <nuxt-link to="/thoughts" @click="closeMenu">Thoughts</nuxt-link>
      <nuxt-link to="/about" @click="closeMenu">About</nuxt-link>
    </section>
  </section>
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { reactive, computed, onMounted, watch } from 'vue';
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
      if (state.mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    const toggleMenu = () => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
      if (state.mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      
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
@import './assets/animation';

.simple-nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm $spacing-md;
  position: relative;
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInDown 0.3s forwards ease-in-out;
  animation-delay: 0.4s;

  &.open {
    pointer-events: none;
  }

  .navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .menu {
      width: 40px;
      height: 40px;
      position: relative;
      display:none;
      background: none;
      border: none;
      color: $black;
      text-transform: uppercase;
      border-radius: 0.5rem;
      margin-right: $spacing-xs;
      padding: 0;

      &::before {
        content: '';
        position: absolute;
        top: 10px;
        right: 0px;
        width: 50px;
        height: 2px;
        background: $white;
        transition: all 0.3s;
      }

      &::after {
        content: '';
        position: absolute;
        top: 20px;
        right: 0px;
        width: 50px;
        height: 2px;
        background: $white;
        transition: all 0.3s;
      }

      &:hover {
        
        &::before {
          top: 6px;
        }

        &::after {
          top: 24px;
        }
      }

      @media screen and (max-width: 1000px){
        display: block;
        cursor: pointer;
      }

    }

    .nav-links {
      display: flex;
      gap: $spacing-sm;

      .nav-link {
        text-decoration: none;
        background: transparent;
        color: $blue;
        padding: $spacing-xxs $spacing-xs;
        border: 0;
        opacity: 0;
        animation: fadeInDown 0.2s ease-in-out forwards;
        transition: all 0.3s;
        overflow: hidden;
        border-radius: 0.2rem;
        font-size: $font-size-md;
        font-weight: 400;

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba($blue, 0.2);
          transition: all 0.3s;
          transform: scaleX(0);
          mix-blend-mode: screen;
        }

        &:nth-child(1) {
          animation-delay: 0.1s;
        }

        &:nth-child(2) {
          animation-delay: 0.2s;
        }

        &:nth-child(3) {
          animation-delay: 0.3s;
        }

        &:nth-child(4) {
          animation-delay: 0.4s;
        }

        &:nth-child(5) {
          animation-delay: 0.5s;
        }

        &:nth-child(6) {
          animation-delay: 0.6s;
        }

        @media screen and (max-width: 1000px) {
          display: none;
        }

        &:hover {
          &:after {
            transform: scaleX(1);
          }
        }
        
        &.router-link-exact-active,
        &.router-link-active {
          color: $white;
        }
      }
    }
  }

  img {
    width: 56px;
    cursor: pointer;
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

.dark .simple-nav-bar {
  background: rgba($black, 0.48);
  backdrop-filter: blur(6px);
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

.mobile-nav-panel {
  display:none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($black, 0.8);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 10000;
  padding: $spacing-lg;
  backdrop-filter: blur(80px);
  animation: fade 0.24s ease-in-out;
}

    .close {
      width: 40px;
      height: 40px;
      position: absolute;
      top: $spacing-md;
      right: $spacing-md;
      padding: 0;
      background: none;
      border: none;
      margin-right: $spacing-xs;
      margin-top: -8px;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 2px;
        background: $white;
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 2px;
        background: $white;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
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
          color: $white;
          font-size: 8dvw;
          font-weight:500;
          text-decoration: none;
          text-align: center;
          border-bottom: none;
          opacity: 0;
          animation: fadeInUp 0.2s ease-in-out forwards;

          &:nth-child(1) {
            animation-delay: 0.1s;
          }

          &:nth-child(2) {
            animation-delay: 0.2s;
          }

          &:nth-child(3) {
            animation-delay: 0.3s;
          }

          &:nth-child(4) {
            animation-delay: 0.4s;
          }

          &:nth-child(5) {
            animation-delay: 0.5s;
          }

          &:nth-child(6) {
            animation-delay: 0.6s;
          }
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