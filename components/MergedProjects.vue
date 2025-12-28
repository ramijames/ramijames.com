<template>
  <Loading v-if="loading" />
  <section id="Products" v-if="filteredProjects && loading == false">
    <nuxt-link
        :class="['project', 'w-full', product.class]"
        v-for="product in filteredProjects" 
        :key="product.title" 
        :to="product.slug" 
        :style="{ backgroundColor: product.color }"
      >
      <section :class="['info', product.class]">
        <img :src="product.logo" alt="Logo" class="logo" />
      </section>
      <section class="bg" :style="{ backgroundImage: 'url(' + product.bg + ')' }"></section>
    </nuxt-link>
  </section>
</template>

<script setup>

import { useRoute } from 'vue-router';
const route = useRoute();

const filteredProjects = ref(null);

const loading = ref(true);

onMounted(() => {
  filteredProjects.value = products.filter(product => product.slug !== route.path);
  loading.value = false;
})

const products = [
                  {
                    title: 'Vewrite',
                    description: 'Open-source project management for content creators',
                    image: '/products/vewrite/ve-thumb.png',
                    logo: '/products/vewrite/ve-logo.svg',
                    bg: '/homepage/hp-vewrite.png',
                    status: 'past',
                    slug: '/products/vewrite/',
                    color: '#0D1E38',
                    class: 'vewrite',
                    type: 'Product Case Study'
                  }, 
                  {
                    title: 'Scatter',
                    description: 'Open-source web3 wallet for EOS, Ethereum, and Tron',
                    image: '/products/scatter/scatter-thumb.png',
                    logo: '/products/scatter/scatter-logo.png',
                    bg: '/homepage/hp-scatter.png',
                    status: 'past',
                    slug: '/products/scatter/',
                    color: '#0899FE',
                    class: 'scatter',
                    type: 'Product Case Study'
                  },  
                  {
                    title: 'Ultra',
                    description: 'Tokenized gaming platform',
                    image: '/products/ultra/ultra-prime-thumb.png',
                    logo: '/products/ultra/ultra-logo.svg',
                    bg: '/homepage/hp-ultra.png',
                    status: 'past',
                    slug: '/products/ultra/',
                    color: '#2E2667',
                    class: 'ultra',
                    type: 'Product Case Study'
                  },  
                  {
                    title: 'Doodledapp',
                    description: 'No-code smart contract development and deployment',
                    image: '/products/doodledapp/doodledapp-thumb.png',
                    logo: '/products/doodledapp/doodledapp-logo.svg',
                    bg: '/homepage/hp-doodledapp.png',
                    status: 'past',
                    slug: '/products/doodledapp/',
                    color: '#3E74FF',
                    class: 'doodledapp',
                    type: 'Product Case Study'
                  },
                  {
                    title: 'Climbing Monster',
                    description: 'Training application for rock climbers',
                    image: '/products/climbingmonster/cm-mobile-example.png',
                    logo: '/products/climbingmonster/climbingmonster-logo.png',
                    bg: '/homepage/hp-climbingmonster.png',
                    status: 'past',
                    slug: '/products/climbingmonster/',
                    color: '#990000',
                    class: 'climbingmonster',
                    type: 'Product Case Study'
                  },
                  {
                    title: 'Food For Future',
                    description: 'Decentralized data for funding farmers',
                    image: '/products/food-for-future/fff-thumb.png',
                    logo: '/products/food-for-future/fff-logo.svg',
                    bg: '/homepage/hp-fff.png',
                    status: 'past',
                    slug: '/products/food-for-future/',
                    color: '#9446BD',
                    class: 'foodforfuture',
                    type: 'Product Case Study'
                  },
                  {
                    title: 'Telos Open Block Explorer',
                    description: 'The best way to view transactions and manage your wallets',
                    image: '/products/telos/telos-thumb.png',
                    logo: '/products/telos/telos-logo.png',
                    bg: '/homepage/hp-telos.png',
                    status: 'past',
                    slug: '/products/telos-obe/',
                    color: '#571AFF',
                    class: 'telos',
                    type: 'Product Case Study'
                  },
                  {
                    title: 'TouchSpin',
                    description: 'A new way to play',
                    image: '/products/telos/telos-thumb.png',
                    logo: '/products/touchspin/touchspin-logo.svg',
                    bg: '/products/touchspin/touchspin-bg.png',
                    status: 'past',
                    slug: '/products/touchspin/',
                    color: '#17265F',
                    class: 'touchspin',
                    type: 'Product Case Study'
                  },
                  {
                    title: 'Tonara',
                    description: 'Interactive sheet music',
                    image: '/products/telos/telos-thumb.png',
                    logo: '/products/tonara/tonara-logo.png',
                    bg: '/products/touchspin/tonara-bg.png',
                    status: 'past',
                    slug: '/products/tonara/',
                    color: '#4B6FFF',
                    class: 'tonara',
                    type: 'Product Case Study'
                  }      
                ];

</script>

<style lang="scss" scoped>

@import './assets/variables';

#Products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.3s forwards ease-in-out;
  animation-delay: 0s;
  border-bottom: $border;

  @media screen and (max-width: 1600px){
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media screen and (max-width: 1180px){
    grid-template-columns: 1fr 1fr;
  }
  
  @media screen and (max-width: 768px){
    padding: 0;
  }

  .project {
    width: 100%;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    position: relative;
    background-size: cover;
    margin: 0;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    padding: 0;
    overflow: hidden;

    @media screen and (max-width: 1024px){
      height: 200px;
    }

    .preview {
      position: absolute;
      bottom: -60px;
      left: 50%;
      max-width: 60%;
      transform: translateX(-50%);
      z-index: 1;
      transition: all 0.3s ease;
      border-radius: $br-sm;
    }

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      z-index: 0;
      opacity: 0.2;
      transform: scale(1);
      transition: all 0.3s ease;
    }

    &.scatter {
      .bg {
        background-position: center left;
      }
    }

    &.foodforfuture {
      .bg {
        background-position: center right;
      }
    }

    &.telos {
      .bg {
        background-position: center left;
      }
    }

    &:hover {
      opacity: 1;

      img.preview {
        bottom: -40px;
        opacity: 1;
      }

      .bg {
        opacity: 0.1;
        transform: scale(1.1);
      }

      .info {
        opacity: 1;
        transform: translateY(0);
      }

      &:before {
        background: radial-gradient(circle, rgba(255,255,255,0.6) 20%, rgba(0, 0, 0, 0.5) 100%);
        opacity: 1;
      }
    }

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255,255,255,0.6) 20%, rgba(0, 0, 0, 0.25) 100%);
      z-index: 1;
      opacity: .6;
      transition: all 0.3s ease;
      mix-blend-mode: soft-light;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 1;
      transition: all 0.3s ease-in-out;
      z-index: 1;
      padding: $spacing-sm;
      width: 100%;
      height: 100%;
      mix-blend-mode: plus-lighter;

      img.logo {
        width: 100%;
        max-width: 100px;

        @media screen and (max-width: 1024px){
          max-width: 60px;
        }
      }

      @media screen and (max-width: 768px){
        align-items: center;
        opacity: 1;
        width: 100%;
      }

      p {
        color: $white;
        font-size: $font-size-sm;
        margin: 0;
        padding: 0;
        position: relative;
        opacity: 0.6;
      }

    }

    h3 {
      color: $white;
      border: 0;
      line-height: 100%;
      padding: 0;
      margin: 0;
      text-wrap: balance;
      position: relative;

      @media screen and (max-width: 768px){
        font-size: 6vw;
        text-wrap: balance;
        text-align: center;

        span {
          margin-bottom: 0.5rem;
          display: block;
        }
      }
    }
  }
}

</style>