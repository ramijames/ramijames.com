<template>
  <nav :class="['max-nav', { hidden: isMenuHidden }]">

    <nuxt-link to="/" class="logo-link">
      <img :src="`/logo-light.svg`" alt="Rami James Logo" v-if="currentTheme == 'dark'" />
      <img :src="`/logo-dark.svg`" alt="Rami James Logo" v-if="currentTheme == 'light'" />
    </nuxt-link>

    <section class="nav-right-section">
      <button class="start-project" @click="openContactModal">Start Project</button>
      <div
        :class="['menu-switch', state.mobileMenuOpen ? 'open' : '' ]"
        @click="toggleMenu"
        tabindex="0"
        role="button"
      ></div>
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

const themeStore = useThemeStore()
const currentTheme = computed(() => themeStore.currentTheme)

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

  .logo-link {
    display: block;
    width: 80px;
    margin: 0;

    @media screen and (max-width: 1000px){
      width: 60px;
    }

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .nav-right-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $spacing-lg;

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
      padding: calc($spacing-xs + 4px) $spacing-sm $spacing-xs $spacing-sm !important;

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

  .menu-switch {
    width: 54px;
    height: 54px;
    cursor: pointer;
    position: relative;

    &:after, &:before {
      content: '';
      position: absolute;
      left: 0px;
      right: 0px;
      height: 4px;
      background: rgba($black, 1);
      border-radius: 2px;
      transform-origin: 26px 2px;
    }

    &:after {
      bottom: 12px;
    }

    &:before {
      top: 12px;
    } 

        &:hover:before {
          top: 14px;
        }

        &:hover:after {
          bottom: 14px;
        }

    &.open:after {
      bottom: 22px;
      transform: rotate(45deg);
      background: white;
      top: 26px;
      right: 1px;
    }

    &.open:before {
      top: 22px;
      transform: rotate(-45deg);
      background: white;
      top: 26px;
      left: 1px;
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

    .menu-switch {
      &:after, &:before {
        background: rgba($white, 1);
      }

      &.open:after {
        background: $black;
      }

      &.open:before {
        background: $black;
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