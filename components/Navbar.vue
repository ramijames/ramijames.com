<template>
  <span class="vader" v-if="currentTheme !== 'dark'">Come to the dark side</span>
  <nav class="main-nav">
    <section class="dark-side anim-2">
      <ThemeSwitcher /> 
    </section>
    <section class="links">
      <nuxt-link class="anim-2" to="/">Home</nuxt-link>
      <div class="dot anim-3"></div>
      <nuxt-link class="anim-1" to="/products">Products</nuxt-link>
      <div class="dot anim-3"></div>
      <svg class="logo" width="60" height="60" viewBox="0 0 116 114" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="path" d="M40.5 3.49999C17 -0.500011 27.5 23 39.5 48.5C51.5 74 69.5 101.5 64.5 108C59.5 114.5 42 112 51.5 91C61 70 116 20 112.5 11C109 2 70 -1 68 11C66 23 100.5 89.5 94.5 95C88.5 100.5 66.5 94.5 73 78.5" stroke="black" stroke-width="5" stroke-linecap="round"/>
        <path class="path" d="M18 28.5C55 14.5 56 3 58.5 4.5C61 6 41.5 40 3 64" stroke="black" stroke-width="5" stroke-linecap="round"/>
      </svg>

      <div class="dot anim-3"></div>
      <nuxt-link class="anim-1" to="/thoughts">Thoughts</nuxt-link>
      <div class="dot anim-3"></div>
      <nuxt-link class="anim-2" to="/about">About</nuxt-link>
    </section>
    <section class="contact anim-2">
      <a href="https://github.com/ramijames"><img :src="`/github-${currentTheme}.svg`" alt="Github" /></a>
      <a href="https://www.linkedin.com/in/rami-james/"><img :src="`/linkedin-${currentTheme}.svg`" alt="LinkedIn" /></a>
      <a href="mailto:rami@ramijames.com"><img :src="`/mail-${currentTheme}.svg`" alt="Send Rami an email" /></a>
      <a href="https://twitter.com/ramijames"><img :src="`/twitter-${currentTheme}.svg`" alt="Check out Rami's Twitter" /></a>
    </section>
  </nav>
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { watch, onMounted, computed } from 'vue'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'

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

.logo {
  animation: logo .6s ease-out;
}

    .dark .logo {
      filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.75));
    }

    .dark .logo path {
      stroke: white;
    }

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

@keyframes logo {
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

@keyframes vader {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.main-nav {
  z-index: 100;
  position: relative;
  height:120px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width:100%;
  backdrop-filter: blur(3px);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.612) 30%, rgb(255,255,255, 0) 100%);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  mask-image: linear-gradient(180deg, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%);
}

    .main-nav::after {
      content:'';
      width:100%;
      height: 80%;
      position: absolute;
      top:0;
      left: 0;
      bottom:0;
      z-index: -1;
      backdrop-filter: blur(15px);
      background: linear-gradient(180deg, rgba(255, 255, 255, .7) 60%, rgb(255,255,255, 0) 100%);
      mask-image: linear-gradient(180deg, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
    }

    .dark .main-nav {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.612) 30%, rgb(0,0,0, 0) 100%);
    }

    .dark .main-nav::after {
      background: linear-gradient(180deg, rgba(0, 0, 0, .7) 60%, rgb(0,0,0, 0) 100%);
    }

    .dark-side {
      position:absolute;
      left:2rem;
      height: 80px;
      display:flex;
      flex-direction: row;
      align-items: center;
    }

        .vader {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: .6rem;
          text-transform: uppercase;
          position: fixed;
          z-index: 100;
          left: -18px;
          top: 120px;
          z-index: 101;
          rotate: -90deg;
          animation: vader 10s ease-in;
          opacity: 0;
        }

            .dark .vader {
              color: white;
            }

    .contact {
      position:absolute;
      right:2rem;
      height: 80px;
      display:flex;
      flex-direction: row;
      align-items: center;
    }

    .main-nav .links {
      max-width:1000px;
      width:100%;
      margin:0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height:80px;
      gap:4rem;
      margin:0 auto;
      text-shadow: 0px 1px 1px rgba(255,255,255,0.24);
    }

        .dark .main-nav .links {
          text-shadow: 0px 2px 2px rgba(0,0,0,0.75);
        }

    .main-nav .logo {
      width:80px;
    }

        .main-nav .dot {
          min-width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: black;
          content:'';
          opacity: 0.2;
        }

            .dark .main-nav .dot {
              background-color: white;
            }
    
        .main-nav .links a {
          color: black;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: .2rem;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: .6rem;
          opacity: 0.5;
        }

            .main-nav .links a:hover {
              opacity: 1;
            }

            .main-nav .links a.router-link-active, 
            .main-nav .links a.router-link-exact-active {
              opacity: 1;
            }

            .anim-1 {
              animation: headerelements 0.35s ease-in;
            }

            .anim-2 {
              animation: headerelements .55s ease-in;
            }

            .anim-3 {
              animation: headerelements .75s ease-in;
            }

            .dark .main-nav .links a {
              color: white;
            }

</style>