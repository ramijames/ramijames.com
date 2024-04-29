<template>
  <section class="home">
    <section class="core">
      <pre class="text">
        <strong>Owner</strong> = <span class="tint-yellow"> {
            name: <span class="tint-blue">"Rami James"</span>,
            strength: <span class="tint-blue">"product development & design"</span>,
            available: <span class="tint-green">true</span>
        }</span>

        <strong>Links</strong> = <span class="tint-yellow"> [
            <a class="main-links tint-blue" href="/products">"Products",</a>
            <a class="main-links tint-blue" href="/thoughts">"Thoughts"</a>
        ]</span>
      </pre>
      <div class="cube">
        <div class="top"></div>
        <div class="right"></div>
        <div class="bottom"></div>
        <div class="left"></div>
        <div class="front"></div>
        <div class="back"></div>
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
  flex-direction: row;
  justify-content: flex-start;
  height: 100vh;
  width:100vw;
}

.core {
  display: flex;
  align-items: center;
  justify-content: start;
  height:100%;
  background-color: black;
  width:100%;
  overflow: hidden;
  position: fixed;
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}

    .core .text {
      color:white;
      font-size:2.4dvw;
      font-family: 'IBM Plex Mono';
      text-shadow: 0 2px 2px rgba(0,0,0,0.8), 0 5px 6px rgba(0,0,0,0.3),  0 8px 12px rgba(91, 29, 216, 0.2);
      z-index:1;
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
  text-decoration: underline;
  font-family: 'IBM Plex Mono';
}

    .dark a.main-links {
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

.cube div {
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
    scale:1;
  }
  50% {
    -webkit-transform: rotateX(-60deg) rotateY(180deg);
    transform: rotateX(-60deg) rotateY(180deg);
    scale:2;
  }
  100% {
    -webkit-transform: rotateX(-60deg) rotateY(360deg);
    transform: rotateX(-60deg) rotateY(360deg);
    scale:1;
  }
}

</style>