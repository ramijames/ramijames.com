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
      <a href="mailto:rami@ramijames.com"><img 
          :src="`/mail-${currentTheme}.svg`" 
          alt="Send Rami an email" 
        /></a>
      <a href="https://twitter.com/ramijames"><img 
          :src="`/twitter-${currentTheme}.svg`" 
          alt="Check out Rami's Twitter" 
        /></a>
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
  font-family: 'Libre Baskerville';
  font-weight: bold;
  display: flex;
  align-items: center;
  padding:0.2rem 0.5rem;
}

.main-nav a:hover,
.main-nav img:hover {
  scale:1.1;
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
  background:black;
  color:white !important;
  border-radius: .2rem;
}

    .dark .router-link-active, 
    .dark .router-link-exact-active {
      background:white;
      color:black !important;
      border-radius: .2rem;
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

    .dark .cube div {
      border:2px solid rgba(255,255,255, 0.8);
      border-radius: 2px;
      box-shadow: inset 0px 4px 10px rgba(255, 247, 0, 0.1), 0px 0px 20px rgba(99, 252, 148, 0.832), 0px 10px 20px rgba(221, 255, 255, 0.3), inset 0px 0px 10px rgba(99, 252, 148, 0.832);
      display: block;
      position: absolute;
      background: rgba(255, 255, 255, 0.13);
      background: linear-gradient(45deg, rgb(255, 255, 255, 0.4) 4%, rgba(187, 164, 255, 0.282) 40%, rgba(0, 0, 0, 0.341) 100%);
    }

    .dark .cube div.top,
    .dark .cube div.right,
    .dark .cube div.bottom,
    .dark .cube div.left,
    .dark .cube div.front,
    .dark .cube div.back {
      background: linear-gradient(45deg, rgb(255, 255, 255, 0.4) 4%, rgba(187, 164, 255, 0.282) 40%, rgba(0, 0, 0, 0.341) 100%);
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