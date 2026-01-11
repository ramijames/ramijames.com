<template>
  <nav :class="['simple-nav-bar', { hidden: isMenuHidden }]">
    <section :class="['navigation', state.mobileMenuOpen ? 'open' : '']">
      <div class="top">
        <nuxt-link to="/" class="logo-link">
          <img :src="`/logo-dark.svg`" alt="Rami James" v-if="currentTheme == 'dark'" />
          <img :src="`/logo-light.svg`" alt="Rami James" v-else />
        </nuxt-link>
      </div>
      <div class="nav-links">
        <nuxt-link to="/" class="nav-link">
          <span>Home</span>
        </nuxt-link>
        <nuxt-link to="/products" :class="['nav-link', isProductsSubPage ? 'router-link-active' : '']">
          <span>Products</span>
        </nuxt-link>
        <nuxt-link to="/thoughts" :class="['nav-link', isThoughtsSubPage ? 'router-link-active' : '']">
          <span>Thoughts</span>
        </nuxt-link>
        <nuxt-link to="/about" class="nav-link">
          <span>About</span>
        </nuxt-link>
        <a class="nav-link" href="mailto:ramijames@gmail.com?subject=Set up a call">
          <span>Contact</span>
        </a>
      </div>
      <div 
        :class="['menu', state.mobileMenuOpen ]"
        @click="toggleMenu"
        tabindex="0"
        role="button"
      ></div>
      <div class="theme-switcher-box">
        <theme-switcher />
      </div>
    </section>
  </nav>

  <section class="mobile-nav-panel" :class="state.mobileMenuOpen ? 'open' : ''">
    <div class="close" @click="closeMenu"></div>
    <section class="mobile-nav-panel-links">
      <nuxt-link to="/" @click="closeMenu">Home</nuxt-link>
      <nuxt-link to="/products" @click="closeMenu">Products</nuxt-link>
      <nuxt-link to="/thoughts" @click="closeMenu">Thoughts</nuxt-link>
      <nuxt-link to="/about" @click="closeMenu">About</nuxt-link>
      <a href="mailto:ramijames@gmail.com" @click="closeMenu">Contact</a>
      <hr>
      <theme-switcher />
    </section>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import ThemeSwitcher from './ThemeSwitcher.vue';
import { useThemeStore } from '~/store/theme';

const themeStore = useThemeStore()
const currentTheme = computed(() => themeStore.currentTheme)

const route = useRoute();

const state = reactive({
  mobileMenuOpen: false,
});

const isMenuHidden = ref(false);
let lastScrollY = 0;

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY) {
    isMenuHidden.value = true; // Hide menu on scroll down
  } else {
    isMenuHidden.value = false; // Show menu on scroll up
  }
  lastScrollY = currentScrollY;
};

onMounted(() => {
  lastScrollY = window.scrollY; // Initialize lastScrollY on mount
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const closeMenu = () => {
  state.mobileMenuOpen = false;
  document.body.style.overflow = 'auto';
};

const toggleMenu = () => {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  if (state.mobileMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
};

const isThoughtsSubPage = computed(() => {
  return route.path.startsWith('/thoughts/');
});

const isProductsSubPage = computed(() => {
  return route.path.startsWith('/products/');
});

const isProductsPage = computed(() => {
  return route.path === '/products';
});

const isThoughtsPage = computed(() => {
  return route.path === '/thoughts';
});

const notHome = computed(() => {
  return route.path !== '/';
});

</script>

<style scoped lang="scss">

@import './assets/variables';
@import './assets/animation';

.dark {
  .simple-nav-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    background: rgba($black, 1);
    border-top: 0;
    backdrop-filter: blur(8px) saturate(10%) contrast(30%);
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    opacity:1;
    transition: background 0.6s ease-in-out;
    border-radius: 0;
    padding: $spacing-sm $spacing-md;
    outline-offset:-2px;
    transition: all 0.42s ease;
    animation-timing-function: linear;
    min-height: 84px;

    &.hidden {
      background: rgba($black, .8);
    }

    .menu {
      width: 40px;
      height: 40px;
      position: relative;
      display:none;
      background: none;
      text-transform: uppercase;
      padding: 0;

      &::before {
        content: '';
        position: absolute;
        top: 12px;
        right: 0px;
        width: 30px;
        height: 2px;
        background: $white !important;
        transition: all 0.3s;
      }

      &::after {
        content: '';
        position: absolute;
        top: 24px;
        right: 0px;
        width: 30px;
        height: 2px;
        background: $white !important;
        transition: all 0.3s;
      }

      &:hover {
        
        &::before {
          top: 10px;
        }

        &::after {
          top: 28px;
        }
      }

      @media screen and (max-width: 1000px){
        display: block;
        cursor: pointer;
      }

    }

    .nav-links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: $spacing-xs;

      @media screen and (max-width: 1000px){
        display: none;
      }

      .nav-link {
        color: rgba($white, 0.8) !important;
        text-shadow: 1px 1px 0px rgba($black, 0.4);

        &:hover {
          color: $white !important;
          background: rgba($white,0.1) !important;
        }
        
        &.router-link-exact-active,
        &.router-link-active {
          color: $black !important;
          background: rgba($yellow,1);
          text-shadow: 1px 1px 0px rgba($black, 0);

          svg {
            opacity: 1;
            
            path, circle {
              fill: $white;
            }
          }
        }
      }
    }
  }
}

.simple-nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background: #cccccc;
  border-top: 0;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  opacity:1;
  transition: all 0.6s ease-in-out;
  backdrop-filter: blur(8px) saturate(10%) contrast(30%);
  padding: $spacing-sm $spacing-md;
  transition: all 0.42s ease;
  animation-timing-function: linear;
  min-height: 84px;

  &.hidden {

    .navigation {

      .nav-links {
        .nav-link {
          width: 80px;
          text-shadow: 1px 1px 0 rgba($white, 0.2);
        }
      }
    }
  }

  &:hover {
    opacity:1 !important;
  }

  &.hidden {
    opacity: 1;
  }

  &.open {
    pointer-events: none;
  }

  .navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-md;
    width: 100%;
    height: 100%;
    transition: all 0.42s ease;
    animation-timing-function: linear;

    @media screen and (max-width: 1000px){
      flex-direction: row;
    }

    .top {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .logo-link {

        width: 44px;
        height: 44px;

        img {
          width: 44px;
          height: 44px;
        }
      }
    }

    .theme-switcher-box {
      @media screen and (max-width: 1000px){
        display: none;
      }
    }

    .menu {
      width: 40px;
      height: 40px;
      position: relative;
      display:none;
      background: none;
      text-transform: uppercase;
      margin-right: $spacing-xs;
      padding: 0;

      &::before {
        content: '';
        position: absolute;
        top: 12px;
        right: 0px;
        width: 30px;
        height: 2px;
        background: $black;
        transition: all 0.3s;
      }

      &::after {
        content: '';
        position: absolute;
        top: 24px;
        right: 0px;
        width: 30px;
        height: 2px;
        background: $black;
        transition: all 0.3s;
      }

      &:hover {
        
        &::before {
          top: 10px;
        }

        &::after {
          top: 28px;
        }
      }

      @media screen and (max-width: 1000px){
        display: block;
        cursor: pointer;
      }

    }

    .nav-links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: $spacing-xs;

      @media screen and (max-width: 1000px){
        display: none;
      }

      .nav-link {
        text-decoration: none;
        background: transparent;
        padding: $spacing-sm;
        opacity: 0;
        animation: fadeInDown 0.2s ease-in-out forwards;
        transition: all 0.3s;
        overflow: hidden;
        font-size: 9px;
        font-weight: 500;
        width: 86px;
        border-radius: $br-sm;
        text-align: center;
        color: rgba($black, 0.8);
        font-family: $font-family-secondary;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: $spacing-xs;

        svg {
          opacity: 0.8;

          path, circle {
            fill: $black;
          }
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
          color: $black;
          background: rgba($black,0.1);
        }
        
        &.router-link-exact-active,
        &.router-link-active {
          color: $black;
          background: rgba($yellow,1);

          svg {
            opacity: 1;
            
            path, circle {
              fill: $black;
            }
          }
        }
      }
    }
  }

  img {
    width: 56px;
    cursor: pointer;
  }
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

.dark {
  .mobile-nav-panel {
    background: rgba($black, .6);
  }
}

.mobile-nav-panel {
  display:none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($white, .85);
  outline-offset:-2px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 10000;
  padding: $spacing-lg;
  backdrop-filter: blur(10px);
  animation: fade 0.24s ease-in-out;
}

    .close {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 22px;
      right: 38px;
      padding: 0;
      background: none;
      border: none;
      margin-right: 6px;
      margin-top: 6px;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 2px;
        background: $black;
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 2px;
        background: $black;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }

    .dark .close {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 22px;
      right: 38px;
      padding: 0;
      background: none;
      border: none;
      margin-right: 6px;
      margin-top: 6px;

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

      hr {
        margin: $spacing-md auto;
        width: 120px;
      }
    }

        .dark .mobile-nav-panel-links a {
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

        .mobile-nav-panel-links a {
          display:flex;
          flex-direction: column;
          justify-content: center;
          gap: $spacing-sm;
          color: $black;
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

</style>