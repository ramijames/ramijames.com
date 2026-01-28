<template>
  <nav :class="['max-nav', { hidden: isMenuHidden }]">

    <section class="nav-left-section">
      <!-- Products back button -->
      <nuxt-link
          class="go-back"
          tabindex="0"
          role="button"
          v-if="isProductsSubPage"
          to="/products"
        >
        <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.4706 21.5294L21 29L29 37" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M22 29H38" stroke="white" stroke-width="2" stroke-linecap="round"/>
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
        <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.4706 21.5294L21 29L29 37" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M22 29H38" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </nuxt-link>

      <!-- Home Logo -->
      <nuxt-link to="/" class="logo-link">
        <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M41.6492 27.2521C46.0072 27.2521 50.4345 23.8378 51.5379 19.626C52.6412 15.4143 50.0028 12 45.6448 12C43.3509 12 40.5896 12.8841 38.235 13.4079C34.9228 14.1448 32.3003 14.8457 30.6837 15.3147C29.9858 15.5171 29.427 15.0553 29.5987 14.4L29.9115 13.2058C30.0718 12.594 29.5934 12.1457 28.9404 12.2958L10.0807 16.631C9.62206 16.7364 9.22203 17.1113 9.10947 17.5409L9.03517 17.8245C8.95239 18.1405 9.05119 18.4322 9.29392 18.589C9.50465 18.725 9.7979 18.7424 10.0871 18.636L11.4073 18.1506C11.8618 17.9835 12.3048 18.1079 12.482 18.4525L12.5345 18.5545C12.618 18.717 12.6343 18.9146 12.5811 19.1177L5.78471 45.0609C5.62511 45.6702 6.09891 46.1179 6.74924 45.9724L21.451 42.68C21.912 42.5768 22.3157 42.2006 22.4288 41.7686L28.5036 18.5802C28.6141 18.1583 29.0022 17.7883 29.4526 17.6757L36.3585 15.9485C36.8046 15.837 37.1905 16.0371 37.2662 16.419C37.2738 16.458 37.2646 16.5025 37.2365 16.5415C36.5574 17.4846 36.0438 18.5282 35.7562 19.626C34.6529 23.8378 37.2913 27.2521 41.6492 27.2521Z" stroke="white" stroke-width="2"/>
        </svg>

      </nuxt-link>
    </section>

    <section class="nav-right-section">
      <button class="start-project small" @click="openContactModal" v-show="!footerCtaVisible">Start Project</button>
      <ThemeSwitcher />
      <div
        :class="['menu-switch', state.mobileMenuOpen ? 'open' : '' ]"
        @click="toggleMenu"
        tabindex="0"
        role="button"
        v-if="!state.mobileMenuOpen"
      >
        <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
          <path d="M17 19H41" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M17 29H33" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M17 39H41" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div
        class="menu-close"
        @click="toggleMenu"
        tabindex="0"
        role="button"
        v-else
      >
        <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-icon">
          <path d="M21 21L37.9706 37.9706" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M37.9707 21L21.0001 37.9706" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </section>

    <ContactModal :isOpen="isContactModalOpen" @close="closeContactModal" />

    <section
      :class="['menu-shade', state.mobileMenuOpen ? 'open' : '' ]"
    >
      <section class="shade-content">
        <div class="nav-links">
          <nuxt-link to="/" class="nav-link" v-if="!isHome" @click="toggleMenu">
            <span>Home</span>
          </nuxt-link>
          <!-- <nuxt-link to="/services" :class="['nav-link', isServicesPage ? 'router-link-active' : '']" v-if="!isServicesPage" @click="toggleMenu">
            <span>Services</span>
          </nuxt-link> -->
          <nuxt-link to="/products" :class="['nav-link', isProductsPage ? 'router-link-active' : '']" v-if="!isProductsPage" @click="toggleMenu">
            <span>Products</span>
          </nuxt-link>
          <nuxt-link to="/thoughts" :class="['nav-link', isThoughtsSubPage ? 'router-link-active' : '']" v-if="!isThoughtsPage" @click="toggleMenu">
            <span>Thoughts</span>
          </nuxt-link>
          <nuxt-link to="/about" class="nav-link" v-if="!isAboutPage" @click="toggleMenu">
            <span>About</span>
          </nuxt-link>
          <button class="start-project-mobile large white" @click="openContactModal">Start Project</button>
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
  </nav>
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

const isThoughtsSubPage = computed(() => route.path.startsWith('/thoughts/'));
const isProductsSubPage = computed(() => route.path.startsWith('/products/'));
const isProductsPage = computed(() => route.path === '/products');
const isThoughtsPage = computed(() => route.path === '/thoughts');
const isAboutPage = computed(() => route.path === '/about');
const isHome = computed(() => route.path === '/');
</script>


<style scoped lang="scss">
.max-nav {

  @media screen and (max-width: 1000px){
    padding: $spacing-sm;
  }

  .nav-left-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0;
    background: $white;
    border-radius: $br-md;
    padding: 0 0.35rem;
    position: fixed;
    top: $spacing-sm;
    left: $spacing-sm;
    z-index: 100;

    .go-back {
      display: block;
      width: 58px;
      height: 58px;
      margin-left: -$spacing-sm;

      &:hover {
        transform: scale(1.05);
      }

      svg {
        width: 100%;
        height: auto;
        display: block;

        rect {
          transition: stroke 0.3s ease-in-out;
          stroke: none;
          fill: $white;
        }

        path {
          transition: stroke 0.3s ease-in-out;
          stroke: $black;
        }
      }
    }

    .logo-link {
      display: block;
      width: 58px;
      height: 58px;
      margin: 0;

      @media screen and (max-width: 1000px){
        transform: scale(0.8);
      }

      svg {
        width: 100%;
        height: auto;
        display: block;

        rect {
          fill: $white;
          stroke: none;
        }

        path {
          fill: $black;
          stroke: none;
        }
      }
    }
  }

  .nav-right-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0;
    background: $white;
    border-radius: $br-md;
    padding: 0 0.35rem;
    position: fixed;
    top: $spacing-sm;
    right: $spacing-sm;
    z-index: 100;

    .start-project {
      font-family: $font-family-main;
      cursor: pointer;
      transition: color 0.3s ease-in-out;
      text-decoration: none;
      border: none;
      margin-right: $spacing-xs;

      @media screen and (max-width: 1000px){
        display: none;
      }
    }
  }

  .menu-switch,
  .menu-close {
    width: 56px;
    height: 56px;
    cursor: pointer;
    position: relative;

    &:hover {
      transform: scale(1.05);
    }

    .menu-icon,
    .close-icon {
      width: 56px;
      height: 56px;
      display: block;
      transition: transform 0.4s ease-in-out;

      rect {
        fill: $white;
        stroke: none;
        transition: fill 0.3s ease-in-out, stroke 0.3s ease-in-out;
      }

      path {
        stroke: $black;
        transition: stroke 0.3s ease-in-out;
      }
    }
    
  }

  .menu-shade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($black, 1);
    transition: all 0.34s;
    transition-timing-function: cubic-bezier(0.355, 0.965, 0.670, 0.970);
    z-index: 99;
    overflow: hidden;
    clip-path: inset(0 0 100% 0);

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: rgba($white, .15);
      opacity: 0.6;
      transition: all 0.18s;
      transition-timing-function: cubic-bezier(0.355, 0.965, 0.670, 0.970);
      transform-origin: top;
    }

    &.open {
      clip-path: inset(0 0 0 0);


      &:after {
        animation: flipOpen 1.2s forwards;
      }

      .shade-content .nav-links .nav-link {
        animation: reveal 0.4s ease-in-out forwards;
      }

      .shade-content .shade-info .contact-info,
      .shade-content .shade-info .links,
      .shade-content .shade-info .theme-switcher,
      .shade-content .nav-links .start-project-mobile {
        animation: reveal 0.4s ease-in-out forwards;
      }
    }

    .shade-content {
      padding: $spacing-xl;
      display: grid;
      grid-template-columns: 2fr 1fr;
      align-items: center;
      justify-content: center;
      height: 100%;

      @media screen and (max-width: 1000px){
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        gap: 0;
        padding: 0
      }

      .nav-links {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        container-type: inline-size;
        height: 100%;
        width: 100%;

        .start-project-mobile {
          display: none;

          @media screen and (max-width: 1000px){
            display: block;
            margin: $spacing-md 0;
            width: 100%;
            opacity: 0;
            animation-delay: .4s !important;
          }
        }

        @media screen and (max-width: 1000px){
          padding: 5rem $spacing-lg 0;
        }

        .nav-link {
          font-size: 13cqw;
          font-weight: 600;
          overflow: visible;
          color: $white;
          text-decoration: none;
          transition: color 0.3s ease-in-out;
          line-height: 120%;
          width: 100%;
          opacity: 0;

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

          &.router-link-active span {
            text-decoration: underline;
            text-underline-offset: 8px;
            font-weight: 700;
          }

          span {
            transition: color 0.3s ease-in-out;
          }

          &:hover span {
            color: rgba($white, 0.7);
          }
        }
      }

      .shade-info {
        padding-left: $spacing-lg;
        color: rgba($white, 0.6);
        font-size: $font-size-sm;
        line-height: 150%;
        display: flex;
        flex-direction: column;
        gap: $spacing-md;

        @media screen and (max-width: 1000px){
          gap: $spacing-sm;
        }

        h3 {
          font-size: $font-size-xl;
          color: $white;
          margin-bottom: $spacing-md;

          @media screen and (max-width: 1000px){
            font-size: $font-size-lg;
            margin: 0 0 $spacing-sm 0;
          }
        }

        p {
          margin: 0 0 $spacing-sm 0;
          font-size: $font-size-lg;

          @media screen and (max-width: 1000px){
            font-size: $font-size-md;
            margin: 0 0 $spacing-xs 0;
          }
        }

        .contact-info {
          animation-delay: .5s !important;
          opacity: 0;
        }

        .links {
          display: flex;
          flex-direction: column;
          animation-delay: .6s !important;
          opacity: 0;

          a {
            color: rgba($white, 0.6);
            text-decoration: none;
            transition: color 0.3s ease-in-out;
            margin: 0 0 $spacing-sm 0;
            font-size: $font-size-lg;

            @media screen and (max-width: 1000px){
              font-size: $font-size-md;
              margin: 0 0 $spacing-xs 0;
            }

            &:hover {
              color: rgba($white, 0.9);
            }
          }
        }

        .theme-switcher {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          animation-delay: .8s !important;
          opacity: 0;
        }

      }
    }
  }
}

.dark {
  .max-nav {

    .nav-left-section {
      background: $black;

      .go-back {

        svg {

          rect {
            fill: $black;
          }

          path {
            stroke: $white;
          }
        }
      }
    }

    .logo-link {
      svg {
        rect {
          fill: $white;
          stroke: none;
        }

        path {
          fill: $white;
        }
      }
    }

    .nav-right-section {
      background: $black;

      .start-project {
        color: rgba($white, 1);
        background: $black;

        &:after {
          background: rgba($white, 1);
        }

        &:hover {
          color: rgba($white, 0.6);
        }
      }
    }

    .menu-switch,
    .menu-close {
      
      .menu-icon,
      .close-icon {
      
        rect {
          fill: $black !important;
        }

        path {
          stroke: $white !important;
        }
      }
      
    }

    .menu-shade {
      background: rgba($white, 1);

      &:after {
        background: rgba($black, .15);
      }

      .shade-content {

        .nav-links {

          .nav-link {
            color: $black;
            
            &:hover span {
              color: rgba($black, 0.7);
            }
          }
        }

        .shade-info {
          color: rgba($black, 0.6);

          h3 {
            color: $black;
          }

          a {
            color: $blue;
          }

          .links {

            a {
              color: rgba($black, 0.6);

              &:hover {
                color: rgba($black, 0.9);
              }
            }
          }

        }
      }
    }
  }
}

@keyframes flipOpen {
  0% {
    top: 0;
    bottom: 100%;
  }
  24% {
    top:0;
    bottom: 0;  
  }
  100% {
    top: 100%;
    bottom: 0%;
  }
}

</style>