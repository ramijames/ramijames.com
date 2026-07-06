<template>
  <nav ref="navEl" :class="['max-nav', { hidden: isMenuHidden }]">

    <div class="nav-left">
      <nuxt-link to="/" class="brand" aria-label="Home">
        <img src="/logo-light.svg" alt="Rami James" class="brand-logo brand-logo--light" />
        <img src="/logo-dark.svg" alt="Rami James" class="brand-logo brand-logo--dark" />
      </nuxt-link>
    </div>

    <div class="nav-center">
      <nuxt-link to="/products" class="nav-item">Work</nuxt-link>
      <nuxt-link to="/thoughts" class="nav-item">Thoughts</nuxt-link>

      <div
        class="nav-dropdown"
        @mouseenter="learnOpen = true"
        @mouseleave="learnOpen = false"
      >
        <span :class="['nav-item', 'nav-dropdown-trigger', { open: learnOpen }]" tabindex="0">
          Learn
          <svg class="nav-caret" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>

        <div class="mega-menu" v-show="learnOpen">
          <nuxt-link to="/learn-threejs" class="mega-item" @click="learnOpen = false">
            <span class="mega-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                <path d="M3 7L12 12L21 7M12 12V22" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="mega-text">
              <span class="mega-title">Learn Three.js</span>
              <span class="mega-desc">Learn 3D graphics and WebGL on the web.</span>
            </span>
          </nuxt-link>

          <nuxt-link to="/learn-solidity" class="mega-item" @click="learnOpen = false">
            <span class="mega-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 3H15L19 7V21H6V3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                <path d="M14 3V8H19M9 13H16M9 17H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="mega-text">
              <span class="mega-title">Learn Solidity</span>
              <span class="mega-desc">Smart contracts, tokens, and Web3.</span>
            </span>
          </nuxt-link>
        </div>
      </div>

      <nuxt-link to="/tools" class="nav-item">Tools</nuxt-link>
      <nuxt-link to="/about" class="nav-item">About</nuxt-link>
    </div>

    <div class="nav-right">
      <button class="nav-contact" @click="openContactModal">Start discussion</button>
      <button
        :class="['menu-toggle', { open: state.mobileMenuOpen }]"
        @click="toggleMenu"
        aria-label="Menu"
      >
        <svg v-if="!state.mobileMenuOpen" width="24" height="24" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 19H41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M17 29H33" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M17 39H41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L37.9706 37.9706" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M37.9707 21L21.0001 37.9706" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

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
        <nuxt-link to="/learn-threejs" class="nav-link" @click="toggleMenu">
          <span>Learn Three.js</span>
        </nuxt-link>
        <nuxt-link to="/learn-solidity" class="nav-link" @click="toggleMenu">
          <span>Learn Solidity</span>
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
const navEl = ref(null);
const learnOpen = ref(false);

// Expose the header height globally so page heros / the card-morph can sit below
// it instead of scrolling under it.
const setNavHeight = () => {
  if (!navEl.value) return;
  document.documentElement.style.setProperty('--nav-h', navEl.value.getBoundingClientRect().height + 'px');
};

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
  setNavHeight();
  window.addEventListener('resize', setNavHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', setNavHeight);
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
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-sm $spacing-lg;
  color: var(--fg);
  background: var(--bg);
  animation: fadeInDown 0.4s ease-in-out forwards;
  transition: transform 0.34s cubic-bezier(0.355, 0.965, 0.670, 0.970),
              opacity 0.34s cubic-bezier(0.355, 0.965, 0.670, 0.970);

  /* Center links hide here, so drop to two columns (logo | menu) — otherwise the
     menu toggle auto-places into the empty middle column and looks centered. */
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr auto;
    padding-inline: $spacing-sm;
  }

  .nav-left {
    display: flex;
    align-items: center;
    justify-self: start;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover { opacity: 0.7; }

    .brand-logo {
      display: block;
      height: 44px;
      width: auto;

      @media screen and (max-width: 700px) {
        height: 36px;
      }
    }

    /* Dark logo on the dark theme, light logo on the light theme. */
    .brand-logo--light { display: none; }
  }

  .nav-center {
    display: flex;
    align-items: center;
    justify-self: center;
    gap: $spacing-md;

    @media screen and (max-width: 900px) {
      display: none;
    }
  }

  .nav-item {
    font-family: $font-family-main, sans-serif;
    font-size: 15.75px;
    font-weight: 400;
    line-height: 1;
    color: var(--fg);
    text-decoration: none;
    padding: 0.5em 0.2em;
    opacity: 0.85;
    transition: opacity 0.2s ease;

    &:hover,
    &:focus-visible,
    &.router-link-active { opacity: 1; outline: none; }
  }

  /* Learn dropdown + mega-menu. */
  .nav-dropdown {
    position: relative;
    display: flex;
    align-items: center;
  }

  .nav-dropdown-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    background: none;
    border: none;
    cursor: pointer;

    .nav-caret {
      transition: transform 0.2s ease;
    }

    &.open {
      opacity: 1;
      .nav-caret { transform: rotate(180deg); }
    }
  }

  .mega-menu {
    position: absolute;
    top: calc(100% + 0.9rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 120;
    width: min(90vw, 560px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-xs;
    padding: $spacing-sm;
    border-radius: 20px;
    background: var(--bg);
    border: 1px solid rgb(var(--fg-rgb) / 0.12);
    box-shadow: 0 24px 60px -20px rgb(0 0 0 / 0.5);

    /* Transparent bridge over the gap so the hover doesn't drop on the way down. */
    &::before {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      height: 1rem;
    }

    @media screen and (max-width: 640px) {
      grid-template-columns: 1fr;
      width: min(92vw, 360px);
    }
  }

  .mega-item {
    display: flex;
    align-items: flex-start;
    gap: $spacing-sm;
    padding: $spacing-sm;
    border-radius: 14px;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover { background: rgb(var(--fg-rgb) / 0.06); }
  }

  .mega-icon {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    border: 1px solid rgb(var(--fg-rgb) / 0.15);
    color: var(--fg);
  }

  .mega-text {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }

  .mega-title {
    font-family: $font-family-main, sans-serif;
    font-size: 15.75px;
    font-weight: 600;
    line-height: 1.2;
    color: var(--fg);
  }

  .mega-desc {
    font-family: $font-family-main, sans-serif;
    font-size: 13.5px;
    line-height: 1.35;
    color: var(--fg);
    opacity: 0.55;
  }

  .nav-right {
    display: flex;
    align-items: center;
    justify-self: end;
    gap: $spacing-sm;
  }

  .nav-contact {
    font-family: $font-family-main, sans-serif;
    font-size: 15.75px;
    font-weight: 500;
    line-height: 1;
    color: var(--bg);
    background: var(--fg);
    border: none;
    border-radius: 999px;
    padding: 0.7em 1.3em;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.2s ease, opacity 0.2s ease;

    &:hover {
      transform: scale(1.04);
    }

    @media screen and (max-width: 900px) {
      display: none;
    }
  }

  .menu-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    gap: 0.4em;
    background: none;
    border: none;
    color: var(--fg);
    cursor: pointer;
    font-family: $font-family-main, sans-serif;
    font-size: 15.75px;
    font-weight: 400;
    padding: 0.4em 0;

    svg { display: none; }

    &::after { content: 'Menu'; }
    &.open::after { content: 'Close'; }

    @media screen and (max-width: 900px) {
      display: inline-flex;
    }
  }
}

/* Light theme: swap to the light logo. */
.light .max-nav .brand-logo--dark { display: none; }
.light .max-nav .brand-logo--light { display: block; }

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
      padding: $spacing-xl $spacing-md $spacing-md;
      gap: $spacing-md;
      justify-content: flex-start;
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

        &:nth-child(1) { transition-delay: 0.08s; }
        &:nth-child(2) { transition-delay: 0.14s; }
        &:nth-child(3) { transition-delay: 0.2s; }
        &:nth-child(4) { transition-delay: 0.26s; }
        &:nth-child(5) { transition-delay: 0.32s; }
        &:nth-child(6) { transition-delay: 0.38s; }
        &:nth-child(7) { transition-delay: 0.44s; }
        &:nth-child(8) { transition-delay: 0.5s; }

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
        gap: $spacing-md;
        line-height: 1.2;
      }

      h3 {
        font-size: $font-size-xl;
        color: $black;
        margin: 0 0 $spacing-md;

        @media screen and (max-width: 1000px){
          font-size: $font-size-md;
          margin: 0 0 $spacing-xs 0;
          line-height: 1.1;
        }
      }

      p {
        margin: 0 0 $spacing-sm 0;
        font-size: $font-size-lg;

        @media screen and (max-width: 1000px){
          font-size: $font-size-sm;
          margin: 0 0 2px 0;
          line-height: 1.2;
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
            margin: 0 0 2px 0;
            line-height: 1.2;
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
