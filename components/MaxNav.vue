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
          <rect x="1" y="1" width="56" height="56" rx="5" stroke="white" stroke-width="2"/>
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
          <rect x="1" y="1" width="56" height="56" rx="5" stroke="white" stroke-width="2"/>
          <path d="M28.4706 21.5294L21 29L29 37" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M22 29H38" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </nuxt-link>

      <!-- Home Logo -->
      <nuxt-link to="/" class="logo-link">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="56" height="56" rx="5" stroke="white" stroke-width="2"/>
          <path d="M58.4366 37.5324C64.589 37.5324 70.8393 32.7122 72.397 26.7662C73.9547 20.8202 70.2299 16 64.0774 16C60.8389 16 56.9406 17.2481 53.6165 17.9876C48.9405 19.0279 45.2382 20.0175 42.9559 20.6796C41.9705 20.9654 41.1816 20.3134 41.424 19.3882L41.8657 17.7023C42.0919 16.8386 41.4165 16.2057 40.4947 16.4176L13.8693 22.5379C13.2217 22.6867 12.657 23.2159 12.4981 23.8225L12.3932 24.2229C12.2763 24.669 12.4158 25.0808 12.7585 25.3022C13.056 25.4942 13.47 25.5187 13.8782 25.3685L15.7421 24.6832C16.3837 24.4472 17.0092 24.623 17.2593 25.1094L17.3334 25.2534C17.4514 25.4828 17.4743 25.7618 17.3992 26.0485L7.80432 62.6742C7.57899 63.5344 8.24789 64.1665 9.16601 63.961L29.9215 59.313C30.5722 59.1672 31.1421 58.6362 31.3019 58.0263L39.878 25.2897C40.034 24.6941 40.5819 24.1717 41.2177 24.0127L50.9673 21.5744C51.5971 21.4169 52.142 21.6994 52.2488 22.2386C52.2595 22.2936 52.2465 22.3564 52.2069 22.4115C51.2482 23.743 50.523 25.2163 50.117 26.7662C48.5593 32.7122 52.2841 37.5324 58.4366 37.5324Z" stroke="white" stroke-width="2"/>
        </svg>
      </nuxt-link>
    </section>

    <section class="nav-right-section">
      <button class="start-project" @click="openContactModal" v-show="!footerCtaVisible">Start Project</button>
      <div
        :class="['menu-switch', state.mobileMenuOpen ? 'open' : '' ]"
        @click="toggleMenu"
        tabindex="0"
        role="button"
        v-if="!state.mobileMenuOpen"
      >
        <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
          <rect x="1" y="1" width="56" height="56" rx="5" stroke="white" stroke-width="2"/>
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
          <rect x="1" y="1" width="56" height="56" rx="5" stroke="white" stroke-width="2"/>
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
          <div class="theme-switcher">
            <h3>Theme</h3>
            <theme-switcher />
          </div>
        </section>
      </section>
    </section>
  </nav>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
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

// Use Lenis scroll instead of window scroll
onMounted(() => {
  const { getLenis } = useLenis();
  const lenis = getLenis();

  if (lenis) {
    lastScrollY = lenis.scroll; // Initialize with Lenis scroll position

    lenis.on('scroll', ({ scroll }) => {
      if (scroll > lastScrollY && scroll > 100) {
        isMenuHidden.value = true; // Hide menu on scroll down
      } else {
        isMenuHidden.value = false; // Show menu on scroll up
      }
      lastScrollY = scroll;
    });
  }
});

const closeMenu = () => {
  state.mobileMenuOpen = false;
  // document.body.style.overflow = 'auto';
};

const toggleMenu = () => {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  // if (state.mobileMenuOpen) {
  //   document.body.style.overflow = 'hidden';
  // } else {
  //   document.body.style.overflow = 'auto';
  // }
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

const isAboutPage = computed(() => {
  return route.path === '/about';
});

const isHome = computed(() => {
  return route.path === '/';
});

</script>

<style scoped lang="scss">
.max-nav {
  padding: $spacing-md;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 100;

  @media screen and (max-width: 1000px){
    padding: $spacing-sm;
  }

  .nav-left-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $spacing-sm;

    .go-back {
      display: block;
      width: 58px;
      height: 58px;

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
      width: 80px;
      margin: 0;

      @media screen and (max-width: 1000px){
        width: 60px;
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
    gap: $spacing-md;

    @media screen and (max-width: 1000px){
      transform: scale(0.8);
    }

    .start-project {
      font-size: $font-size-lg;
      font-weight: 600;
      font-family: $font-family-main;
      color: rgba($black, 1);
      cursor: pointer;
      transition: color 0.3s ease-in-out;
      text-decoration: none;
      background: white;
      border: none;
      padding: 0 $spacing-sm !important;
      height: 54px;
      border-radius: 5px;

      @media screen and (max-width: 1000px){
        display: none;
      }

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 4px;
        background: rgba($black, 1);
        margin-top: 4px;
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
        transform-origin: left;
      }

      &:hover {
        color: rgba($black, 0.6);

        &:after {
          transform: scaleX(1);
        }
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
    z-index: -1;
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
          stroke: $black;
        }
      }
    }

    .nav-right-section {
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