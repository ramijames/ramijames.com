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
          strength: <span class="tint-blue">'product development & design'</span>,
          available: <span class="tint-green">true</span>
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
          <div class="single-product">
            <p><strong>Random-sandwich.com</strong></p>
            <p><small>A community of sandwich lovers who are coming together to find the weirdest, most unique sandwiches of all time.</small></p>
            <p>
              <a class="button-link" href="https://crisptools.dev/">Live</a>
              <a class="button-link" href="https://github.com/ramijames/CrispTools">Github</a>
            </p>
          </div>
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
  position: fixed;
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}

.core .text {
  color:white;
  font-size:1.4dvw;
  font-family: 'IBM Plex Mono';
  position: absolute;
  top:2rem;
  left:0rem;
  right:2rem;
  text-shadow: 0 2px 2px rgba(0,0,0,0.8), 0 5px 6px rgba(0,0,0,0.3),  0 8px 12px rgba(91, 29, 216, 0.2);
}

    .tint-yellow {
      color:rgb(253, 255, 211);
    }

    .tint-blue {
      color:rgb(169, 204, 247);
    }

    .tint-green {
      color:rgb(132, 213, 97);
    }

.content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  align-content: start;
  padding: 0 2rem;
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
  animation: spin 90s infinite;
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
  border:20px solid white;
  border-radius: 10px;
  box-shadow: inset 0px 40px 100px rgba(255, 247, 0, 0.4), 0px 40px 800px rgba(255, 241, 184, 1), inset 0px 120px 1800px rgba(168, 156, 255, 1);
  display: block;
  scale:.99;
  position: absolute;
  background: rgb(255,255,255);
  background: linear-gradient(45deg, rgb(255, 255, 255) 0%, rgba(187, 164, 255, 0.482) 20%, rgba(0, 0, 0, 0.341) 100%);
}

.cube div.top {
  -webkit-transform: rotateX(90deg); 
  transform: rotateX(90deg); 
  margin-top: -100vw;
}

.cube div.right {
  -webkit-transform: rotateY(90deg); 
  transform: rotateY(90deg); 
  margin-left: 100vw;
}

.cube div.bottom {
  -webkit-transform: rotateX(-90deg); 
  transform: rotateX(-90deg); 
  margin-top: 100vw;
}

.cube div.left {
  -webkit-transform: rotateY(-90deg); 
  margin-left: -100vw;
  transform: rotateY(-90deg); 
}

.cube div.front {
  -webkit-transform: translateZ(100vw);
  transform: translateZ(100vw);
}

.cube div.back {
  -webkit-transform: translateZ(-100vw) rotateX(180deg);
  transform: translateZ(-100vw) rotateX(180deg);
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