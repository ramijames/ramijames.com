<template>
  <nav class="main-nav">
    <section class="extras left">
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
    <section class="extras right">
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
  max-width: 1200px;
  margin:1rem auto;
  padding: 0 1rem;
  position: relative;
}

@media screen and (max-width: 768px) {
  .main-nav {
    width:100%;
    top:0px;
    height:66px;
    position:relative;
    margin:0;
    padding:0;
    text-align: center;
  }

      .main-nav a {
        width:50%;
        font-size: .8rem;
        margin:0;
        padding: 0;
        text-align: center;
        justify-content: center;
      }
}

.core {
  display:flex;
  justify-content: center;
  width: 100%;
}

    .core a {
      text-decoration: none;
      color: #000;
      font-size: 1rem;
      font-family: 'Montserrat', sans-serif;
      display: flex;
      align-items: center;
    }

        .core a:hover {
          border-color: black;
          color:black;
        }

        .dark .core a:hover {
          border-color: white;
          color:white;
        }

      @media screen and (max-width: 768px) {
        .core {
          width:100%;
          position:fixed;
          background-color: white;
          bottom:0;
          height:54px;
        }

        .dark .core {
          background-color: black;
        }

        .core a {
          width:50%;
          font-size: .8rem;
          margin:0;
          padding: 0;
          text-align: center;
          justify-content: center;
        }

        .core a:hover {
          background-color: transparent;
        }

        .dark .core a:hover {
          background-color: transparent;
          color: white;
        }
      }

  .main-nav a,
  .theme-switcher {
    color: black;
    display:flex;
    justify-content: center;
    height:100%;
    border: bottom 2px solid transparent;
  }
  
  .dark .main-nav a,
  .dark .theme-switcher {
    color: white;
    display:flex;
    justify-content: center;
  }

.extras {
  display:flex;
  flex-direction: row;
  gap:.3rem;
  height:100px;
  justify-content: center;
}

    .extras.left {
      position:absolute;
      left:1rem;
      top:0;
      display:flex;
      justify-content: flex-start;
    }

    .extras.right {
      position:absolute;
      right:1rem;
      top:0;
      display:flex;
      justify-content: flex-end;
    }

    @media screen and (max-width: 768px) {
      .extras.left {
        position:absolute;
        left:0;
        width:50%;
        display:flex;
        justify-content: flex-start;
      }

      .extras.right {
        position:absolute;
        right:0;
        width:50%;
        display:flex;
        justify-content: flex-end;
      }

      .extras a, .extras .theme-switcher {
        width:50%;
        height:34px;
        padding:1rem;
        display: flex;
        justify-content: center;
      }
    }

.router-link-active, 
.router-link-exact-active {
  border-bottom:2px solid black;
}

    .dark .router-link-active, 
    .dark .router-link-exact-active {
      border-bottom:2px solid white;
    }

    @media screen and (max-width: 768px) {
      .router-link-active, 
      .router-link-exact-active {
        background:white;
        border:none;
        border-bottom:2px solid black;
        border-radius: 0rem;
      }

          .dark .router-link-active, 
          .dark .router-link-exact-active {
            border:none;
            border-bottom:2px solid white;
            background:black;
            border-radius: 0rem;
          }
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