<template>
  <nav :class="['max-nav', { hidden: isMenuHidden }]">

    <section class="nav-left-section">
      <nuxt-link to="/" class="logo-link" aria-label="Home">
        <svg width="44" height="44" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M41.6492 27.2521C46.0072 27.2521 50.4345 23.8378 51.5379 19.626C52.6412 15.4143 50.0028 12 45.6448 12C43.3509 12 40.5896 12.8841 38.235 13.4079C34.9228 14.1448 32.3003 14.8457 30.6837 15.3147C29.9858 15.5171 29.427 15.0553 29.5987 14.4L29.9115 13.2058C30.0718 12.594 29.5934 12.1457 28.9404 12.2958L10.0807 16.631C9.62206 16.7364 9.22203 17.1113 9.10947 17.5409L9.03517 17.8245C8.95239 18.1405 9.05119 18.4322 9.29392 18.589C9.50465 18.725 9.7979 18.7424 10.0871 18.636L11.4073 18.1506C11.8618 17.9835 12.3048 18.1079 12.482 18.4525L12.5345 18.5545C12.618 18.717 12.6343 18.9146 12.5811 19.1177L5.78471 45.0609C5.62511 45.6702 6.09891 46.1179 6.74924 45.9724L21.451 42.68C21.912 42.5768 22.3157 42.2006 22.4288 41.7686L28.5036 18.5802C28.6141 18.1583 29.0022 17.7883 29.4526 17.6757L36.3585 15.9485C36.8046 15.837 37.1905 16.0371 37.2662 16.419C37.2738 16.458 37.2646 16.5025 37.2365 16.5415C36.5574 17.4846 36.0438 18.5282 35.7562 19.626C34.6529 23.8378 37.2913 27.2521 41.6492 27.2521Z" fill="currentColor"/>
        </svg>
      </nuxt-link>

      <!-- Learn section back button -->
      <nuxt-link
          class="go-back"
          tabindex="0"
          role="button"
          v-if="learnParent"
          :to="learnParent"
        >
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.8847 1.00001L1.41409 8.47067L9.41406 16.4706" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M2.41406 8.47064H18.4141" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </nuxt-link>

      <!-- Products back button -->
      <nuxt-link
          class="go-back"
          tabindex="0"
          role="button"
          v-if="isProductsSubPage"
          to="/products"
        >
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.8847 1.00001L1.41409 8.47067L9.41406 16.4706" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M2.41406 8.47064H18.4141" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </nuxt-link>

      <!-- Thoughts back button -->
      <nuxt-link
          class="go-back"
          tabindex="0"
          role="button"
          v-if="isThoughtsSubPage"
          to="/thoughts"
        >
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.8847 1.00001L1.41409 8.47067L9.41406 16.4706" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M2.41406 8.47064H18.4141" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </nuxt-link>
    </section>

    <section class="nav-right-section">
      <ThemeSwitcher v-if="state.mobileMenuOpen" class="nav-theme-switcher" />
      <nuxt-link v-if="!state.mobileMenuOpen" to="/about" class="nav-link-text">About</nuxt-link>
      <a v-if="!state.mobileMenuOpen" href="mailto:ramijames@gmail.com" class="nav-link-text">Contact</a>
      <div
        :class="['menu-switch', state.mobileMenuOpen ? 'open' : '' ]"
        @click="toggleMenu"
        tabindex="0"
        role="button"
        v-if="!state.mobileMenuOpen"
      >
        <svg width="44" height="44" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
          <path d="M17 19H41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M17 29H33" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M17 39H41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div
        class="menu-close"
        @click="toggleMenu"
        tabindex="0"
        role="button"
        v-else
      >
        <svg width="44" height="44" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-icon">
          <path d="M21 21L37.9706 37.9706" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M37.9707 21L21.0001 37.9706" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </section>

  </nav>

  <ContactModal :isOpen="isContactModalOpen" @close="closeContactModal" />

  <section
    :class="['menu-shade', state.mobileMenuOpen ? 'open' : '' ]"
  >
    <section class="shade-content">
      <div class="nav-links">
        <nuxt-link to="/" class="nav-link" v-if="!isHome" @click="toggleMenu">
          <span>Home</span>
        </nuxt-link>
        <nuxt-link to="/products" :class="['nav-link', isProductsPage ? 'router-link-active' : '']" v-if="!isProductsPage" @click="toggleMenu">
          <span>Products</span>
        </nuxt-link>
        <nuxt-link to="/thoughts" :class="['nav-link', isThoughtsSubPage ? 'router-link-active' : '']" v-if="!isThoughtsPage" @click="toggleMenu">
          <span>Thoughts</span>
        </nuxt-link>
        <nuxt-link to="/tools" :class="['nav-link', isToolsPage ? 'router-link-active' : '']" v-if="!isToolsPage" @click="toggleMenu">
          <span>Tools</span>
        </nuxt-link>
        <nuxt-link to="/about" class="nav-link" v-if="!isAboutPage" @click="toggleMenu">
          <span>About</span>
        </nuxt-link>
      </div>

      <section class="shade-info" >
        <section class="contact-info">
          <h3>Contact</h3>
          <p><a href="mailto:ramijames@gmail.com">ramijames@gmail.com</a></p>
          <p>IL +972 58 4192939</p>
          <p>US +1 508 360 7982</p>
        </section>
        <section class="links">
          <h3>External</h3>
          <a href="https://github.com/ramijames">Github</a>
          <a href="https://dribbble.com/ramijames">Dribbble</a>
          <a href="https://www.linkedin.com/in/rami-james/">LinkedIn</a>
        </section>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import ThemeSwitcher from './ThemeSwitcher.vue';
import ContactModal from './ContactModal.vue';
import { useThemeStore } from '~/store/theme';
import { useUIStore } from '~/store/ui';

const themeStore = useThemeStore()
const uiStore = useUIStore()
const currentTheme = computed(() => themeStore.currentTheme)
const footerCtaVisible = computed(() => uiStore.footerCtaVisible)

const route = useRoute();

const state = reactive({
  mobileMenuOpen: false,
});

const isMenuHidden = ref(false);
const isContactModalOpen = ref(false);

const openContactModal = () => {
  closeMenu();
  isContactModalOpen.value = true;
};

const closeContactModal = () => {
  isContactModalOpen.value = false;
};

let lastScrollY = 0;

const handleScroll = () => {
  const scroll = window.scrollY || window.pageYOffset;
  if (scroll > lastScrollY && scroll > 100) {
    isMenuHidden.value = true; // Hide menu on scroll down
  } else {
    isMenuHidden.value = false; // Show menu on scroll up
  }
  lastScrollY = scroll;
};

onMounted(() => {
  lastScrollY = window.scrollY || window.pageYOffset;
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const closeMenu = () => {
  state.mobileMenuOpen = false;
};

const toggleMenu = () => {
  state.mobileMenuOpen = !state.mobileMenuOpen;
};

const learnParent = computed(() => {
  const match = route.path.match(/^(\/learn-[^/]+)\//)
  return match ? match[1] : null
})
const isThoughtsSubPage = computed(() => route.path.startsWith('/thoughts/'));
const isProductsSubPage = computed(() => route.path.startsWith('/products/'));
const isProductsPage = computed(() => route.path === '/products');
const isThoughtsPage = computed(() => route.path === '/thoughts');
const isAboutPage = computed(() => route.path === '/about');
const isToolsPage = computed(() => route.path === '/tools');
const isHome = computed(() => route.path === '/');
</script>


<style scoped lang="scss">
.max-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-xs;
  color: $black;
  animation: fadeInDown 0.4s ease-in-out forwards;
  transition: transform 0.34s cubic-bezier(0.355, 0.965, 0.670, 0.970),
              opacity 0.34s cubic-bezier(0.355, 0.965, 0.670, 0.970);

  .nav-left-section {
    position: relative;
    z-index: 100;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: $spacing-xxs;

    .logo-link {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: var(--fg);
      color: var(--bg);
      border: 1px solid rgb(var(--fg-rgb) / 0.15);
      border-radius: 50%;
      transition: transform 0.24s ease-in-out;

      @media screen and (max-width: 1000px) {
        width: 44px;
        height: 44px;
      }

      &:hover {
        transform: scale(1.05);
      }

      svg {
        width: 75%;
        height: 75%;
        display: block;

        path {
          fill: currentColor;
          stroke: none;
        }
      }
    }

    .go-back {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: var(--fg);
      color: var(--bg);
      border: 1px solid rgb(var(--fg-rgb) / 0.15);
      border-radius: 50%;
      transition: transform 0.24s ease-in-out;

      @media screen and (max-width: 1000px) {
        width: 44px;
        height: 44px;
      }

      &:hover {
        transform: scale(1.05);
      }

      svg {
        width: 40%;
        height: auto;
        display: block;

        path {
          fill: $black;
          stroke: $white;
          stroke-width: 2;
        }
      }
    }
  }

  .nav-right-section {
    position: relative;
    z-index: 100;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $spacing-xxs;

    .nav-theme-switcher {
      color: inherit;
    }

    .nav-link-text {
      font-family: 'Roboto', sans-serif;
      font-size: 17px;
      font-weight: 400;
      line-height: 1;
      color: var(--fg);
      text-decoration: none;
      padding: 0.55em 0.9em;
      border-radius: 999px;
      transition: background 0.2s ease;

      &:hover,
      &:focus-visible {
        outline: none;
        background: rgb(var(--fg-rgb) / 0.08);
      }

      &:last-of-type {
        margin-right: $spacing-sm;
      }

      @media screen and (max-width: 700px) {
        display: none;
      }
    }
  }


  .menu-switch,
  .menu-close {
    width: 60px;
    height: 60px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--fg);
    color: var(--bg);
    border: 1px solid rgb(var(--fg-rgb) / 0.15);
    border-radius: 50%;
    transition: transform 0.24s ease-in-out;

    @media screen and (max-width: 1000px) {
      width: 44px;
      height: 44px;
    }

    &:hover {
      transform: scale(1.05);
    }

    .menu-icon,
    .close-icon {
      width: 100%;
      height: 100%;
      display: block;
      transition: transform 0.4s ease-in-out;
    }
  }

}

.dark {
  .max-nav {
    color: $white;

    .nav-left-section {
      .logo-link {
        background: var(--fg);
        color: var(--bg);

        svg {
          path {
            fill: currentColor;
            stroke: none;
          }
        }
      }

      .go-back {
        color: $white;

        svg {
          path {
            fill: $white;
            stroke: $black;
          }
        }
      }
    }
  }
}

.menu-shade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 99;
  overflow: hidden;
  color: $black;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0s linear 0.4s;

  @media screen and (max-width: 1000px){
    padding: 0 0 $spacing-md;
  }

  &.open {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.4s ease, visibility 0s linear 0s;

    .shade-content .nav-links .nav-link,
    .shade-content .shade-info .contact-info,
    .shade-content .shade-info .links {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .shade-content {
    padding: $spacing-xl;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: $spacing-lg;
    height: 100%;

    @media screen and (max-width: 1000px){
      padding: $spacing-md;
      gap: $spacing-lg;
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: 100%;

      .nav-link {
        font-family: $font-family-main, sans-serif;
        font-size: calc(8.31579px + 4.94737vw);
        font-weight: 300;
        letter-spacing: -0.03em;
        line-height: 1.2;
        text-align: left;
        color: $black;
        text-decoration: none;
        width: 100%;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.4s ease, transform 0.4s ease, color 0.3s ease-in-out;

        &:nth-child(1) { transition-delay: 0.1s; }
        &:nth-child(2) { transition-delay: 0.2s; }
        &:nth-child(3) { transition-delay: 0.3s; }
        &:nth-child(4) { transition-delay: 0.4s; }
        &:nth-child(5) { transition-delay: 0.5s; }

        &.router-link-active span {
          text-decoration: underline;
          text-underline-offset: 8px;
        }

        span {
          transition: color 0.3s ease-in-out;
        }

        &:hover span {
          color: rgba($black, 0.7);
        }
      }
    }

    .shade-info {
      color: rgba($black, 0.6);
      font-size: $font-size-sm;
      line-height: 150%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      gap: $spacing-xl;
      width: 100%;
      max-width: 800px;

      @media screen and (max-width: 1000px){
        gap: $spacing-lg;
      }

      h3 {
        font-size: $font-size-xl;
        color: $black;
        margin: 0 0 $spacing-md;

        @media screen and (max-width: 1000px){
          font-size: $font-size-md;
          margin: 0 0 $spacing-sm 0;
        }
      }

      p {
        margin: 0 0 $spacing-sm 0;
        font-size: $font-size-lg;

        @media screen and (max-width: 1000px){
          font-size: $font-size-sm;
          margin: 0 0 $spacing-xs 0;
        }
      }

      .contact-info {
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.4s ease 0.5s, transform 0.4s ease 0.5s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        @media screen and (max-width: 1000px){
          width: 50%;
        }

        a {
          color: $black;
        }
      }

      .links {
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        @media screen and (max-width: 1000px){
          width: 50%;
        }

        a {
          color: rgba($black, 0.6);
          text-decoration: none;
          margin: 0 0 $spacing-sm 0;
          font-size: $font-size-lg;
          transition: color 0.3s ease-in-out;

          @media screen and (max-width: 1000px){
            font-size: $font-size-sm;
            margin: 0 0 $spacing-xs 0;
          }

          &:hover {
            color: rgba($black, 0.9);
          }
        }
      }

    }
  }
}

.dark .menu-shade {
  background: rgba(0, 0, 0, 0.8);
  color: $white;

  .shade-content {

    .nav-links {

      .nav-link {
        color: $white;

        &:hover span {
          color: rgba($white, 0.7);
        }
      }
    }

    .shade-info {
      color: rgba($white, 0.6);

      h3 {
        color: $white;
      }

      .contact-info a {
        color: $white;
      }

      .links {

        a {
          color: rgba($white, 0.6);

          &:hover {
            color: rgba($white, 0.9);
          }
        }
      }

    }
  }
}

</style>
