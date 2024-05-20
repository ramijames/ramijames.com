<template>
  <nav class="mobile-nav-bar">
    <section class="menu-switch">
      <section class="menu-right">
        <img width="40" height="40" :src="`/menu-${currentTheme}.svg`" alt="Open menu" @click="openMenu" />
        <ThemeSwitcher />
      </section>
    </section>
  </nav>
  <section class="mobile-nav-panel" :class="mobileMenuOpen ? 'open' : ''">
    <section class="mobile-nav-panel-header">
      <div class="close">
        <img :src="`/close-${currentTheme}.svg`" width="40" alt="Close menu" @click="closeMenu" />
        <ThemeSwitcher />
      </div>
    </section>
    <section class="mobile-nav-panel-links">
      <nuxt-link to="/" @click="closeMenu">Home</nuxt-link>
      <nuxt-link to="/products" @click="closeMenu">Products</nuxt-link>
      <nuxt-link to="/thoughts" @click="closeMenu">Thoughts</nuxt-link>
      <nuxt-link to="/about" @click="closeMenu">About</nuxt-link>
    </section>
    <section class="mobile-nav-panel-contact">
      <a href="https://github.com/ramijames"><img :src="`/github-${currentTheme}.svg`" alt="Github" /></a>
      <a href="https://www.linkedin.com/in/rami-james/"><img :src="`/linkedin-${currentTheme}.svg`" alt="LinkedIn" /></a>
      <a href="mailto:rami@ramijames.com"><img :src="`/mail-${currentTheme}.svg`" alt="Send Rami an email" /></a>
      <a href="https://twitter.com/ramijames"><img :src="`/twitter-${currentTheme}.svg`" alt="Check out Rami's Twitter" /></a>
    </section>
  </section>
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { reactive, computed, onMounted, watch } from 'vue';
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'

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

    const openMenu = () => {
      state.mobileMenuOpen = true;
    };

    const closeMenu = () => {
      state.mobileMenuOpen = false;
    };

    return {
      currentTheme: computed(() => themeStore.currentTheme),
      openMenu,
      closeMenu,
      ...toRefs(state),
    }
  }
}
</script>

<style scoped lang="scss">

@import './assets/variables';

.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 2s linear forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes svgline {
  0% {
    /* transform: scale(0.8); */
    -webkit-transform: translateY(-20px) rotateX(120deg);
    transform: translateY(-20px) rotateX(120deg);
  }
  100% {
    transform: scale(1);
    -webkit-transform: translateY(0px) rotateX(0deg);
    transform: translateY(0px) rotateX(0deg);
  }
}

@keyframes headerelements {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: auto;
  }
}

/* Don't show nav-panel by default */
.mobile-nav-panel {
  display: none;
}

.menu-switch {
  width:100%;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  gap: $spacing-sm;
  cursor: pointer;
}

.menu-right {
  display:flex;
  flex-direction: row;
  gap:1rem;
}

.mobile-nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: $spacing-lg;
  width:100%;
  z-index: 1000;
  position:fixed;
  top:0;

  @media screen and (max-width: 768px) {
    padding: $spacing-md;
  }
}

.mobile-nav-panel {
  display:none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 100;
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
          color: $black;
          font-size: $font-size-xl;
          font-weight:bold;
          text-transform: uppercase;
          text-decoration: none;
          color: $blue;
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

        .dark .mobile-nav-panel-links a {
          color: $blue-light;
        }
        
.mobile-nav-panel-contact {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width:100%;
}

.dark .mobile-nav-panel {
  background: rgba(0, 0, 0, 0.8);

}

@keyframes enter {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>