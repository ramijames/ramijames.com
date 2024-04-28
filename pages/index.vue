<template>
  <section class="home">
    <section class="core">
      <div class="cube">
        <div class="top"></div>
        <div class="right"></div>
        <div class="bottom"></div>
        <div class="left"></div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <pre class="text">
      <strong>Owner</strong> = <span class="tint-yellow"> {
          name: <span class="tint-blue">'Rami James'</span>,
          strength: <span class="tint-blue">'product development & design'</span>
      }</span></pre>
    </section>
    <section class="content">
      <section class="sections">
        <div class="building">
          <nuxt-link to="/build" class="main-links">Things I'm building →</nuxt-link>
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
          <nuxt-link to="/thoughts" class="main-links">Things I'm thinking →</nuxt-link>
        </div>
      </section>
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
  flex-direction: row;
  justify-content: flex-start;
  height: 100vh;
  width:100vw;
}

.core {
  display: flex;
  align-items: center;
  justify-content: center;
  height:100%;
  background-color: black;
  width:50%;
  overflow: hidden;
  position: relative;
}

    .dark .core {
      background-color: white;
    }

.core .text {
  color:white;
  font-size:1dvw;
  font-family: 'IBM Plex Mono';
  position: absolute;
  top:2rem;
  left:2rem;
  right:2rem;
}

    .tint-yellow {
      color:rgb(253, 255, 211);
    }

    .tint-blue {
      color:rgb(169, 204, 247);
    }

    .dark .core .text {
      color:black;
    }

.content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  align-content: start;
  padding: 0 2rem;
  width:50%;

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

a.main-links {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
  font-size: 1.5rem;
  font-family: 'IBM Plex Mono';
  font-weight: bold;
  display: flex;
  align-items: center;
  margin:0 0 1rem;
}

    .dark a.main-links {
      color:white;
    }

.cube {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  animation: spin 90s infinite ease-out;
  position: relative;
  width: 100vw;
  height: 100vw;
  margin: 0 4rem;
  scale:0.2;
  top:30%;
  left:20%
}

.cube div {
   width: 200vw;
   height: 200vw;
   line-height: 100vw;
   text-align: center;
   box-shadow: inset 0px 0px 0px 40px rgb(255, 255, 255, 0.7);
   background: transparent;
   display: block;
   position: absolute;
}

    .dark .cube div {
      box-shadow: inset 0px 0px 0px 40px rgb(0, 0, 0, 0.7);
    }

.cube div.top {
  box-shadow: inset 0px 0px 0px 40px rgb(255, 255, 255);
  -webkit-transform: rotateX(90deg); 
  transform: rotateX(90deg); 
  margin-top: -100vw;
}

.cube div.right {
  box-shadow: inset 0px 0px 0px 40px rgb(255, 255, 255, 0.5);
  -webkit-transform: rotateY(90deg); 
  transform: rotateY(90deg); 
  margin-left: 100vw;
  opacity: 0.6;
}

.cube div.bottom {
  -webkit-transform: rotateX(-90deg); 
  transform: rotateX(-90deg); 
  margin-top: 100vw;
  opacity: 0.4;
}

.cube div.left {
  -webkit-transform: rotateY(-90deg); 
  margin-left: -100vw;
  transform: rotateY(-90deg); 
  opacity: 0.6;
}

.cube div.front {
  box-shadow: inset 0px 0px 0px 40px rgb(255, 255, 255, 0.3);
  -webkit-transform: translateZ(100vw);
  transform: translateZ(100vw);
  opacity: 0.6;
}

.cube div.back {
  -webkit-transform: translateZ(-100vw) rotateX(180deg);
  transform: translateZ(-100vw) rotateX(180deg);
  opacity: 0.6;
}

@keyframes spin {
  0% {
    -webkit-transform: rotateX(-60deg) rotateY(0deg);
    transform: rotateX(-60deg) rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateX(-60deg) rotateY(180deg);
    transform: rotateX(-60deg) rotateY(180deg);
  }
  100% {
    -webkit-transform: rotateX(-60deg) rotateY(360deg);
    transform: rotateX(-60deg) rotateY(360deg);
  }
}

</style>