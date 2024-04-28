<template>
  <section class="home">
    <section class="core">
      <!-- <nuxt-link to="/build">Things I'm building</nuxt-link> -->
      <div class="cube">
        <div class="top"></div>
        <div class="right"></div>
        <div class="bottom"></div>
        <div class="left"></div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <!-- <nuxt-link to="/thoughts">Things I'm thinking</nuxt-link> -->
    </section>
    <p>Hi, I'm <strong>Rami</strong>, a <strong>developer</strong> and <strong>designer</strong> based in <strong>Boston</strong> and <strong>Israel</strong>.</p>
    <section class="sections">
      <div class="building">
        <nuxt-link to="/build" class="main-links">Things I'm building</nuxt-link>
        <div class="single-product">
          <p><strong>CrispTools.dev</strong></p>
          <p><small>A collection of useful tools for designers and developers.</small></p>
          <p>
            <a class="button-link" href="https://crisptools.dev/">Live</a>
            <a class="button-link" href="https://github.com/ramijames/CrispTools">Github</a>
          </p>
        </div>
        <p>Random-sandwich.com</p>
      </div>
      <div class="thinking">
        <nuxt-link to="/thoughts" class="main-links">Things I'm thinking</nuxt-link>
      </div>
    </section>
    <ThemeSwitcher />
  </section>
</template>

<script>

import ThemeSwitcher from '~/components/ThemeSwitcher.vue'

export default {
  setup() {
    
    definePageMeta({
      layout: 'home'
    })
    
    return {
      theme: 'light'
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.core {
  display: flex;
  align-items: center;
  height:200px;
}

.sections {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin:2rem 0;
  width: 100%;
  max-width:1200px;
}

  .building {
    padding:0 2rem;
    border-right:2px solid black;
    width:50%;
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
    padding:0 2rem;
    width:50%;
  }

a.main-links {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
  font-size: 1.5rem;
  font-family: 'IBM Plex Mono';
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin:0 0 1rem;
}

.cube {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-animation: spin 30s infinite ease-out;
  animation: spin 30s infinite ease-out;
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 4rem;
}

.cube div {
   width: 100px;
   height: 100px;
   line-height: 100px;
   text-align: center;
   box-shadow: inset 0px 0px 0px 2px rgba(0,0,0);
   background: transparent;
   display: block;
   position: absolute;
}

.cube div.top {
  -webkit-transform: rotateX(90deg); 
  transform: rotateX(90deg); 
  margin-top: -50px;
}

.cube div.right {
  -webkit-transform: rotateY(90deg); 
  transform: rotateY(90deg); 
  margin-left: 50px;
}

.cube div.bottom {
  -webkit-transform: rotateX(-90deg); 
  transform: rotateX(-90deg); 
  margin-top: 50px;
}

.cube div.left {
  -webkit-transform: rotateY(-90deg); 
  margin-left: -50px;
  transform: rotateY(-90deg); 
}

.cube div.front {
  -webkit-transform: translateZ(50px);
  transform: translateZ(50px);
}

.cube div.back {
  -webkit-transform: translateZ(-50px) rotateX(180deg);
  transform: translateZ(-50px) rotateX(180deg);
}

@keyframes spin {
  0% {
    -webkit-transform: rotateX(-20deg) rotateY(20deg);
    transform: rotateX(-20deg) rotateY(20deg);
  }
  100% {
    -webkit-transform: rotateX(-20deg) rotateY(740deg);
    transform: rotateX(-20deg) rotateY(740deg);
  }
}

</style>