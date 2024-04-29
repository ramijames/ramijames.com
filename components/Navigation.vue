<template>
  <nav class="main-nav">
    <section class="extras">
      <nuxt-link to="/">
        <img 
          :src="`/home-${currentTheme}.svg`" 
          alt="home" 
        />
      </nuxt-link>
      <ThemeSwitcher />
    </section>
    <section class="core">
      <nuxt-link to="/products">Products</nuxt-link>
      <div class="cube">
        <div class="top"></div>
        <div class="right"></div>
        <div class="bottom"></div>
        <div class="left"></div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <nuxt-link to="/thoughts">Thoughts</nuxt-link>
    </section>
    <section class="extras">
      <img 
          :src="`/mail-${currentTheme}.svg`" 
          alt="home" 
        />
      <img 
          :src="`/twitter-${currentTheme}.svg`" 
          alt="home" 
        />
    </section>
  </nav>
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { watch, onMounted, computed } from 'vue'

export default {
  setup() {
    const themeStore = useThemeStore()

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

    return {
      currentTheme: computed(() => themeStore.currentTheme)
    }
  },
}
</script>

<style scoped>

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin:1rem auto;
  padding: 0 1rem;
}

.main-nav a {
  text-decoration: none;
  color: #000;
  font-size: 1rem;
  font-family: 'IBM Plex Mono';
  font-weight: bold;
  display: flex;
  align-items: center;
}

    @media screen and (max-width: 768px) {
      .main-nav a {
        font-size: .8rem;
        margin:0 0.5rem;
      }
    }

  .dark .main-nav a {
    color: white;
  }

.extras {
  display:flex;
  flex-direction: row;
  gap:.3rem;
}

    @media screen and (max-width: 768px) {
      .extras {
        gap:.15rem;
      }
    }

.router-link-active, 
.router-link-exact-active {
  text-decoration: underline !important;
}

.core {
  display: flex;
  align-items: center;
}

.cube {
  transform-style: preserve-3d;
  animation: spin 60s infinite;
  position: relative;
  width: 100px;
  height: 100px;
  scale: 0.5;
  margin: 0 2rem;
}

    @media screen and (max-width: 768px) {
      .cube {
        display:none;
      }
    }

.cube div {
   width: 100px;
   height: 100px;
   line-height: 100px;
   text-align: center;
   box-shadow: inset 0px 0px 0px 3px rgba(0,0,0);
   display: block;
   position: absolute;
   background-size: cover;
   background-color: white;
}


.cube div.top {
  transform: rotateX(90deg); 
  margin-top: -50px;
  background-image: url('/circle-light.svg');
}

.cube div.right {
  transform: rotateY(-90deg); 
  margin-left: 50px;
  background-image: url('/side-light.svg');
}

.cube div.bottom { 
  transform: rotateX(-90deg); 
  margin-top: 50px;
}

.cube div.left {
  margin-left: -50px;
  transform: rotateY(-90deg); 
  background-image: url('/side-light.svg');
}

.cube div.front {
  transform: translateZ(50px);
  background-image: url('/face-light.svg');
}

.cube div.back {
  transform: translateZ(-50px) rotateX(0deg) rotateY(180deg);
  background-image: url('/logo-light.svg');
}

@keyframes spin {
  0% {
    transform: rotateX(-20deg) rotateY(20deg);
  }
  50% {
    transform: rotateX(-20deg) rotateY(740deg);
  }
  100% {
    transform: rotateX(-20deg) rotateY(20deg);
  }
}

</style>