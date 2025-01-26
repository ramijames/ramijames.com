<template>
  <nav :class="['simple-nav-bar', { hidden: isMenuHidden }]">
    <section :class="['navigation', state.mobileMenuOpen ? 'open' : '']">
      <nuxt-link to="/" class="logo-link"><img :src="`/logo-light.svg`" alt="Rami James" /></nuxt-link>
      <div class="nav-links">
        <nuxt-link to="/" class="nav-link">Home</nuxt-link>
        <nuxt-link to="/products" :class="['nav-link', isProductsSubPage ? 'router-link-active' : '']">Recent Work</nuxt-link>
        <nuxt-link to="/thoughts" :class="['nav-link', isThoughtsSubPage ? 'router-link-active' : '']">Thoughts</nuxt-link>
        <nuxt-link to="/about" class="nav-link">About</nuxt-link>
      </div>
      <nuxt-link class="button primary contact" to="/booking">Book a call</nuxt-link>
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
      <nuxt-link to="/products" @click="closeMenu">Recent Work</nuxt-link>
      <nuxt-link to="/thoughts" @click="closeMenu">Thoughts</nuxt-link>
      <nuxt-link to="/about" @click="closeMenu">About</nuxt-link>
      <nuxt-link to="/booking" @click="closeMenu">Book a Call</nuxt-link>
    </section>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

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

.simple-nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-xs $spacing-md;
  position: fixed;
  width: 100%;
  margin: 0 $spacing-xs;
  background: rgba($white, .8);
  backdrop-filter: blur(28px);
  z-index: 1000;
  top: 0;
  left: calc(50% - $spacing-xs);
  transform: translateX(-50%);
  transition: all 0.3s;

  &.hidden {
    transform: translateY(-120%) translateX(-50%);
  }

  &.open {
    pointer-events: none;
  }

  .navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .contact {

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
      color: $black;
      text-transform: uppercase;
      margin-right: $spacing-xs;
      padding: 0;

      &::before {
        content: '';
        position: absolute;
        top: 10px;
        right: 0px;
        width: 50px;
        height: 2px;
        background: $black;
        transition: all 0.3s;
      }

      &::after {
        content: '';
        position: absolute;
        top: 20px;
        right: 0px;
        width: 50px;
        height: 2px;
        background: $black;
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
      gap: $spacing-md;

      .nav-link {
        text-decoration: none;
        background: transparent;
        color: rgba($black, 0.5);
        padding: $spacing-xs 0;
        opacity: 0;
        animation: fadeInDown 0.2s ease-in-out forwards;
        transition: all 0.3s;
        overflow: hidden;
        font-size: $font-size-sm;
        font-weight: 500;

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
        }
        
        &.router-link-exact-active,
        &.router-link-active {
          color: $black;
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

.mobile-nav-panel {
  display:none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($black, .6);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 10000;
  padding: $spacing-lg;
  backdrop-filter: blur(20px);
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