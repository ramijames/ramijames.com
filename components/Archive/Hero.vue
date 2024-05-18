<template>
  <main class="hero-for-the-zero">
    <component :is="selectedBgComponent" />
    <section class="hero-text" ref="heroText">
      <h1 class="hyper-bold">Turn your vision into an exceptional interface</h1>
      <p class="tiny-sub-title">Together, we can fast-track your project.</p>
      <Button text="Book a discovery call" type="default" class="home-button" link="#booking" />
    </section>
  </main>
  <section class="social-proof">
    <p class="tiny-sub-title">Over the years, I’ve worked with these great people</p>
    <div class="social-images">
      <img v-for="(image, index) in socialImages" :key="index" :src="image" />
      <img v-for="(image, index) in socialImages" :key="index" :src="image" />
    </div>
  </section>
</template>

<script>

import { onMounted, onUnmounted, ref } from 'vue';

import Woosh from './Woosh.vue'
import Button from './Button.vue'

export default {
  data(){
    return {
      title: 'Home',
      numberOfElements: 10,
      size: 40,
      color: '#ff9900',
      borderWidth: 10,
      animationStyle: 'defaultWoosh',
      selectedBgComponent: 'Woosh',
      socialImages: [
        '/social-proof/5ive.png',
        '/social-proof/ibm.png',
        '/social-proof/qmarkets.png',
        '/social-proof/spiral.png',
        '/social-proof/tangiblee.png',
        '/social-proof/telos.png',
        '/social-proof/ultra.png',
        '/social-proof/wix.png',
        '/social-proof/wpt.png',
      ]
    }
  },
  setup() {
    
    let heroText = ref(null);

    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scale = Math.max(0, 1 - scrollPosition / windowHeight);
      const opacity = Math.max(0, 1 - scrollPosition / (windowHeight / 2));

      heroText.value.style.transform = `scale(${scale})`;
      heroText.value.style.opacity = opacity;
    };

    onMounted(() => {
      heroText = ref(document.querySelector('.hero-text'));
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      
    }
  },
  components: {
    Woosh,
    Button
  }
}

</script>

<style scoped lang="scss">

@import './assets/variables';

.hero-for-the-zero {
  position: relative;
  padding:12rem 2rem;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:hidden;

  @media screen and (max-width: 768px) {
    top:-113px;
    padding:12rem 2rem 8rem;
  }
}

    .hero-text {
      text-align:center;    
      max-width: 800px;

      h1 {
        animation: fadeIn 0.5s ease-in-out;
        animation-delay: 0s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        opacity: 0;
      }

      p {
        animation: fadeIn 0.5s ease-in-out;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        opacity: 0;
        margin-bottom:2rem;
      }
    }

    .home-button {
      animation: fadeIn 0.5s ease-in-out;
      animation-delay: 1.5s;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      opacity: 0;
    }

.dark .hero-for-the-zero {
  .hero-talents {
    background: linear-gradient(rgb(44, 13, 63), rgb(44, 13, 63)) padding-box,
                  linear-gradient(to bottom, rgb(177, 87, 233), rgb(108, 27, 159)) border-box;
  }
}

.services-sell {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.bgSelect {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 1000;
  border-radius: 0.3rem;
  animation: fadeIn-30b0ac3d 0.5s ease-in-out;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  opacity: 0;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    font-size:0.5rem;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.1rem;
    line-height: 32px;
  }

  select {
    height:32px;
    width:120px;
    border: 2px solid rgba(161, 49, 231, 0.4);
    background: transparent;
    padding:0 0.5rem;
    border-radius: 0.15rem;
    font-size:0.6rem;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
  }
}

.dark .bgSelect {
  select {
    color:white;
  }
}

.social-proof {
  max-width: 800px;
  margin:0 auto;
  width:100%;
  padding:2rem 0;
  text-align: center;
  mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%);
  mix-blend-mode: multiply;
}

    .social-images {
      display:flex;
      gap: $spacing-md;
      animation: scrollLeft 90s linear infinite;

      img {
        width: 50px;
      }
    }

@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

</style>