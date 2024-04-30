<template>
  <section class="home">
    <section class="core">
      <ThemeSwitcher />
      <div class="text">
        <h1 class="title">Rami James</h1>
        <h3 class="sub-title">Product Development & Design</h3>
        <p><nuxt-link class="main-links" to="/products">Products in Development</nuxt-link></p>
        <p><nuxt-link class="main-links" to="/thoughts">Thoughts on Software</nuxt-link></p>
      </div>
      <div class="nav-extras">
        <img 
          :src="`/mail-${currentTheme}.svg`" 
          alt="home" 
        />
        <img 
          :src="`/twitter-${currentTheme}.svg`" 
          alt="home" 
        />
      </div>
    </section>
    <div class="cube">
      <div class="top"></div>
      <div class="right"></div>
      <div class="bottom"></div>
      <div class="left"></div>
      <div class="front"></div>
      <div class="back"></div>
    </div>
    <div class="slivers">
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
      <div class="four"></div>
      <div class="five"></div>
      <div class="six"></div>
      <div class="seven"></div>
      <div class="eight"></div>
      <div class="nine"></div>
      <div class="ten"></div>
      <div class="eleven"></div>
      <div class="twelve"></div>
      <div class="thirteen"></div>
      <div class="fourteen"></div>
    </div>
  </section>
</template>

<script>
import { useThemeStore } from '~/store/theme'
import { watch, onMounted, computed } from 'vue'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'

export default {
  setup() {
    
    definePageMeta({
      layout: 'home'
    })

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
  components: {
    ThemeSwitcher
  }
}
</script>

<style scoped>

.home {
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 100vh;
  width:100vw;
}

.core {
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  padding:4rem;
  position: absolute;
  bottom:0;
  top:0;
  left:0;
}

    @media screen and (max-width: 768px) {
      .core {
        padding-top:4rem;
        align-items: flex-start;
      }
    }

    .core .text {
      color:black;
      font-size:2.4dvw;
      font-family: 'Libre Baskerville';
      z-index:1;
    }

        .dark .core .text {
          color:white;
        }

        .core .text .title {
          font-size:4dvw;
        }

        .core .text .sub-title {
          font-size:2dvw;
          margin-bottom:2rem;
        }

        @media screen and (max-width: 768px) {
          .core .text {
            font-size:4dvw;
          }
        }

.content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  align-content: start;
  width:50%;
  position: fixed;
  left: 50%;
}

.sections {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width:1200px;
}

  .building {
    width:50%;
    padding:2rem;
  }

      .single-product {
        margin:0 0 2rem;
      }

      .single-product small {
        font-size:0.65rem;
        margin-bottom: 1rem;
      }

      .single-product .button-link {
        display:inline-block;
        margin-top:1rem;
        margin-right:0.5rem;
        font-size:0.65rem;
        padding:0.25rem 0.5rem;
        font-weight: bold;
        border:1px solid black;
        color:black;
        text-decoration:none;
      }

      .dark .single-product .button-link {
        border:1px solid white;
        color:white;
      }

  .thinking {
    width:50%;
    padding:2rem;
  }

.main-links {
  text-decoration: underline;
  font-family: 'Libre Baskerville';
  color:black;
  font-size: 1.5dvw;
}

    .dark .main-links {
      color:white;
    }

.cube {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  animation: spin 90s infinite;
  position: fixed;
  width: 200px;
  height: 200px;
  scale:1;
  top:300px;
  right:100px;
}

    @media screen and (max-width: 768px) {
      .cube {
        scale:0.005;
        top:500px;
      }
    }

.cube div {
  width: 400px;
  height: 400px;
  text-align: center;
  border:2px solid rgba(0,0,0);
  border-radius: 2px;
  display: block;
  position: absolute;
  background: transparent;
}

    .dark .cube div {
      width: 400px;
      height: 400px;
      text-align: center;
      border:2px solid rgba(248, 168, 255, 0.8);
      border-radius: 2px;
      box-shadow: inset 0px 4px 10px rgba(255, 247, 0, 0.1), 0px 0px 20px rgba(211, 99, 252, 0.832), 0px 100px 100px rgba(240, 221, 255, 0.3), inset 0px 0px 20px rgba(99, 252, 148, 0.832);
      display: block;
      position: absolute;
      background: rgba(255, 255, 255, 0.13);
      background: linear-gradient(45deg, rgb(255, 255, 255, 0.4) 4%, rgba(187, 164, 255, 0.282) 20%, rgba(0, 0, 0, 0.341) 100%);
    }

.cube div.top {
  -webkit-transform: rotateX(90deg); 
  transform: rotateX(90deg); 
  margin-top: -200px;
}

.cube div.right {
  -webkit-transform: rotateY(90deg); 
  transform: rotateY(90deg); 
  margin-left: 200px;
}

.cube div.bottom {
  -webkit-transform: rotateX(-90deg); 
  transform: rotateX(-90deg); 
  margin-top: 200px;
}

.cube div.left {
  -webkit-transform: rotateY(-90deg); 
  margin-left: -200px;
  transform: rotateY(-90deg); 
}

.cube div.front {
  -webkit-transform: translateZ(200px);
  transform: translateZ(200px);
}

.cube div.back {
  -webkit-transform: translateZ(-200px) rotateX(180deg);
  transform: translateZ(-200px) rotateX(180deg);
}

@keyframes spin {
  0% {
    -webkit-transform: rotateX(-60deg) rotateY(0deg);
    transform: rotateX(-60deg) rotateY(0deg);
    scale:2;
  }
  50% {
    -webkit-transform: rotateX(-60deg) rotateY(180deg);
    transform: rotateX(-60deg) rotateY(180deg);
    scale:1;
  }
  100% {
    -webkit-transform: rotateX(-60deg) rotateY(360deg);
    transform: rotateX(-60deg) rotateY(360deg);
    scale:2;
  }
}

.slivers {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  animation: spin 120s infinite;
  position: fixed;
  width: 200px;
  height: 200px;
  scale:1;
  top:300px;
  right:400px;
}

    .slivers div {
      width: 400px;
      height: 400px;
      text-align: center;
      border:2px solid rgba(0,0,0);
      border-radius: 2px;
      display: block;
      position: absolute;
      background: transparent;
    }

    .dark .slivers div {
      width: 400px;
      height: 400px;
      text-align: center;
      border:2px solid rgba(255,255,255, 0.8);
      border-radius: 2px;
      box-shadow: inset 0px 4px 10px rgba(255, 247, 0, 0.1), 0px 0px 20px rgba(99, 252, 148, 0.832), 0px 100px 100px rgba(221, 255, 255, 0.3), inset 0px 0px 20px rgba(99, 252, 148, 0.832);
      display: block;
      position: absolute;
      background: rgba(255, 255, 255, 0.13);
      background: linear-gradient(45deg, rgb(255, 255, 255, 0.4) 4%, rgba(187, 164, 255, 0.282) 20%, rgba(0, 0, 0, 0.341) 100%);
    }

    .slivers div.one {
      transform: translateZ(0px);
      opacity:0;
    }

    .slivers div.two {
      transform: translateZ(40px);
      opacity:0.1;
    }

    .slivers div.three {
      transform: translateZ(80px);
      opacity:0.2;
    }

    .slivers div.four {
      transform: translateZ(120px);
      opacity:0.3;
    }

    .slivers div.five {
      transform: translateZ(160px);
      opacity:0.4;
    }

    .slivers div.six {
      transform: translateZ(200px);
      opacity:0.5;
    }

    .slivers div.seven {
      transform: translateZ(240px);
      opacity:0.6;
    }

    .slivers div.eight {
      transform: translateZ(280px);
      opacity:0.7;
    }

    .slivers div.nine {
      transform: translateZ(320px);
      opacity:0.8;
    }

    .slivers div.ten {
      transform: translateZ(360px);
      opacity:0.9;
    }

    .slivers div.eleven {
      transform: translateZ(400px);
      opacity:1;
    }

    .slivers div.twelve {
      transform: translateZ(440px);
      opacity:0.9;
    }

    .slivers div.thirteen {
      transform: translateZ(480px);
      opacity:0.8;
    }

    .slivers div.fourteen {
      transform: translateZ(520px);
      opacity:0.7;
    }

</style>