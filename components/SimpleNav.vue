<template>
  <nav :class="['simple-nav-bar', { hidden: isMenuHidden }]">
    <section :class="['navigation', state.mobileMenuOpen ? 'open' : '']">
      <div class="top">
        <nuxt-link to="/" class="logo-link">
          <img :src="`/logo-light.svg`" alt="Rami James" v-if="currentTheme == 'dark'" />
          <img :src="`/logo-dark.svg`" alt="Rami James" v-else />
        </nuxt-link>
      </div>
      <div class="nav-links">
        <nuxt-link to="/" class="nav-link">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.26074 0.335938C7.93254 -0.111928 8.80867 -0.111928 9.48047 0.335938L15.8506 4.58301C16.4069 4.95389 16.7411 5.57847 16.7412 6.24707V15.3379C16.7412 15.8902 16.2935 16.3379 15.7412 16.3379H1C0.447715 16.3379 0 15.8902 0 15.3379V6.24707C9.407e-05 5.57847 0.334306 4.95389 0.890625 4.58301L7.26074 0.335938Z" fill="white"/>
          </svg>
          <span>Home</span>
        </nuxt-link>
        <nuxt-link to="/products" :class="['nav-link', isProductsSubPage ? 'router-link-active' : '']">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.38586 0.690968C8.68521 -0.230343 9.98862 -0.230344 10.288 0.690966L11.8066 5.36473C11.9404 5.77675 12.3244 6.05571 12.7576 6.05571H17.6719C18.6406 6.05571 19.0434 7.29533 18.2597 7.86473L14.284 10.7533C13.9335 11.0079 13.7868 11.4593 13.9207 11.8713L15.4393 16.5451C15.7386 17.4664 14.6842 18.2325 13.9004 17.6631L9.9247 14.7746C9.57421 14.5199 9.09962 14.5199 8.74913 14.7746L4.77339 17.6631C3.98968 18.2325 2.9352 17.4664 3.23455 16.5451L4.75314 11.8713C4.88702 11.4593 4.74036 11.0079 4.38987 10.7533L0.414135 7.86473C-0.369579 7.29533 0.0331966 6.05571 1.00192 6.05571H5.9162C6.34943 6.05571 6.73339 5.77675 6.86726 5.36473L8.38586 0.690968Z" fill="white"/>
          </svg>
          <span>Products</span>
        </nuxt-link>
        <nuxt-link to="/thoughts" :class="['nav-link', isThoughtsSubPage ? 'router-link-active' : '']">
          <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V10.2353C16 11.3399 15.1046 12.2353 14 12.2353H8H5.07037C4.40166 12.2353 3.7772 12.5695 3.40627 13.1259L1.83205 15.4872C1.28322 16.3105 0 15.9219 0 14.9325V2Z" fill="white"/>
          </svg>
          <span>Thoughts</span>
        </nuxt-link>
        <nuxt-link to="/about" class="nav-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="4" r="4" fill="white"/>
            <path d="M8 9C3.96817 9 0.63295 11.6098 0.080365 15.004C-0.00837912 15.5491 0.447715 16 1 16H15C15.5523 16 16.0084 15.5491 15.9196 15.004C15.3671 11.6098 12.0318 9 8 9Z" fill="white"/>
          </svg>
          <span>About</span>
        </nuxt-link>
        <a class="nav-link" href="mailto:ramijames@gmail.com?subject=Set up a call">
          <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.6377 6.76758C7.813 7.26379 9.14379 7.23798 10.2988 6.69629L16 4.02148V10.2354C16 11.3399 15.1046 12.2354 14 12.2354H1C0.447737 12.2353 3.08465e-05 11.7876 0 11.2354V3.96484L6.6377 6.76758Z" fill="white"/>
            <path d="M14 0C15.1046 0 16 0.895431 16 2V2.91602L9.875 5.79102C8.97653 6.21252 7.94064 6.23271 7.02637 5.84668L0 2.87891V2C7.05425e-06 0.895457 0.895465 3.53405e-05 2 0H14Z" fill="white"/>
          </svg>
          <span>Contact</span>
        </a>
      </div>
      <div class="theme-switcher-box">
        <theme-switcher />
      </div>
      <div 
        :class="['menu', state.mobileMenuOpen ]"
        @click="toggleMenu"
        tabindex="0"
        role="button"
      ></div>
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
    border-right: 1px solid rgba($white, 0.2);
    background: rgba($black, 0.1);

    .nav-links {

      .nav-link {
          border: rgba(255,255,255,0.2);
          color: rgba($white, 0.4) !important;

          svg {

            path, circle {
              fill: $white !important;
            }
          }

          &:hover {
            color: $white !important;
            background: rgba($white,0.1) !important;
          }
          
          &.router-link-exact-active,
          &.router-link-active {
            color: $white !important;
            border: 1px solid rgba($white, 0.2) !important;
          }
        }
    }
  }

  .menu {

    &::before {
      background: $white !important;
    }

    &::after {
      background: $white !important;
    }

  }
}

.simple-nav-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm 0;
  position: fixed;
  width: 140px;
  background: rgba($white, 0.1);
  backdrop-filter: blur(58px);
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  opacity:1;
  transition: background 0.6s ease-in-out;
  border-right: 1px solid rgba($black, 0.2);

  @media screen and (max-width: 1000px){
    top: 0;
    left:0;
    right:0;
    width: 100%;
    height: 80px;
    flex-direction: row;
    padding: $spacing-sm;
    border-bottom: $border;
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
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 1000px){
      width: 100%;
      height: 80px;
      flex-direction: row;
    }

    .top {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .contact {

      @media screen and (max-width: 1000px){
        display: none;
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
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: $spacing-xs;

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
        width: 100px;
        border-radius: $br-sm;
        text-align: center;
        border: rgba($black,0.1);
        color: rgba($black, 0.4);
        font-family: $font-family-secondary;
        text-transform: uppercase;
        letter-spacing: 1px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: $spacing-xs;
        
        span {
          opacity: 0.9;
        }

        svg {
          opacity: 0.4;

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
          border: 1px solid rgba($black, 0.2);
          background: transparent;

          svg {
            opacity: 1;
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
  background: rgba($white, .6);
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
      top: $spacing-sm;
      right: $spacing-sm;
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
      top: $spacing-sm;
      right: $spacing-sm;
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