<template>
  <section id="Products">
    <nuxt-link
        :class="['project', product.class]"
        v-for="product in products" 
        :key="product.title" 
        :to="product.slug" 
        :style="{ backgroundColor: product.color }"
      >
      <section class="info">
        <section class="text">
          <h3>{{ product.title }}</h3>
          <p>{{ product.description }}</p>
        </section>
        <section class="image-wrapper">
          <img class="product-image-thumb" :src="product.image" :alt="product.title" />
        </section>
      </section>
    </nuxt-link>
  </section>
</template>

<script>

import SectionTitle from './SectionTitle.vue';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      products: [
        {
          title: 'Scatter',
          description: 'Open-source web3 wallet for EOS, Ethereum, and Tron',
          image: '/products/scatter/scatter-thumb.png',
          bg: '/scatter-bg.jpg',
          status: 'past',
          slug: '/products/scatter',
          color: '#0899FE',
          class: 'scatter'
        },  
        {
          title: 'Ultra',
          description: 'Tokenized gaming platform',
          image: '/products/ultra/ultra-prime-thumb.png',
          bg: '/ultra-bg.jpg',
          status: 'past',
          slug: '/products/ultra',
          color: '#2E2667',
          class: 'ultra'
        },  
        {
          title: 'Food For Future',
          description: 'Decentralized data for funding farmers',
          image: '/products/food-for-future/fff-thumb.png',
          bg: '/fff-bg.jpg',
          status: 'past',
          slug: '/products/food-for-future',
          color: '#9446BD',
          class: 'foodforfuture'
        },
        {
          title: 'Doodledapp',
          description: 'No-code smart contract development and deployment',
          image: '/products/doodledapp/doodledapp-thumb.png',
          bg: '/doodledapp-bg.jpg',
          status: 'past',
          slug: '/products/doodledapp',
          color: '#3E74FF',
          class: 'doodledapp'
        },
        {
          title: 'Telos Open Block Explorer',
          description: 'The best way to view transactions and manage your wallets',
          image: '/products/telos/telos-thumb.png',
          bg: '/homepage/hp-telos.png',
          status: 'past',
          slug: '/products/telos-obe',
          color: '#571AFF',
          class: 'telos'
        },
        {
          title: 'Illustrations',
          description: 'Various illustrations during my journey',
          image: '/products/illustrations/illustrations-thumb.png',
          bg: '/illustrations-bg.jpg',
          status: 'past',
          slug: '/products/illustrations',
          color: '#0899FE',
          class: 'illustrations'
        },          
        // {
        //   title: 'Crisp Tools',
        //   description: 'A collection of useful tools for designers and developers',
        //   image: '/crisp-tools.png',
        //   bg: '/crisp-tools-bg.jpg',
        //   status: 'current',
        //   slug: '/products/crisp-tools',
        //   color: '#D5E7FD'
        // },
      ]
    }
  },
  setup() {
    const route = useRoute();
    const notHome = computed(() => route.path !== '/');

    return {
      notHome,
    }
  },
  components: {
    SectionTitle
  },

}

</script>

<style lang="scss" scoped>

@import './assets/variables';

#Products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: $black;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  .project {
    background-size: 100%;
    height: 520px;
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    overflow: hidden;
    position: relative;
    text-decoration: none;
    perspective: 1000rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    transition: all 0.38s ease-in-out;

    @media screen and (max-width: 1200px) {
      height: 420px;
    }

    @media screen and (max-width: 1000px) {
      height: 420px;
      width: 100vw;
    }

    @media screen and (max-width: 600px) {
      height: 320px;
    }

    @media screen and (max-width: 420px) {
      height: 280px;
    }


    .right {
      background-position: center right;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 150%;
      height: 100%;
      background: rgba($black, .9);
      transition: all 0.8s ease-in-out;
      mix-blend-mode: multiply;

      @media screen and (max-width: 768px){
        background: rgba($black, .25);
      }
    }

    &:hover {

      @media screen and (max-width: 1000px){
        flex: 1 0 0;
      }

      &::after {
        background: rgba($black, .15);
      }

      .info {

        .image-wrapper {
          bottom: -30px;
          opacity: 1;

          @media screen and (orientation: landscape) and (max-height: 768px) {
            bottom: -80px;
          }

          &::after {
            top:3px;
          }

          &::before {
            top:-4px;
          }
        }
      }
    }

    &.ultra {
      background-image: url('/homepage/hp-ultra.png');
    }

    &.illustrations {
      background-image: url('/homepage/hp-illustrations.jpg');
      background-position: bottom center;
    }

    &.scatter {
      background-image: url('/homepage/hp-scatter.png');
    }

    &.doodledapp {
      background-image: url('/homepage/hp-doodledapp.png');
    }

    &.foodforfuture {
      background-image: url('/homepage/hp-fff.png');
      background-position: center right;
    }

    .info {
      height: 100%;
      width: 100dvw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      position: relative;
      z-index: 10;
      overflow: hidden;

      @media screen and (max-width: 768px) {
        padding: 0 $spacing-sm;
      }

      .text {
        position: absolute;
        bottom: -2px;
        left:0;
        z-index: 100;
        width: 100%;
        display:flex;
        flex-direction: column;
        color: $white;
        text-wrap: balance;
        padding: $spacing-md $spacing-md;
        background: linear-gradient(to bottom, rgba($black,0.6), rgba($black,0.9) 100%);
        backdrop-filter: blur(20px);

        h3 {
          text-align: center;
          line-height: 100%;
          margin: 0 0 $spacing-xs 0;

          @media screen and (max-width: 1000px){
            font-size: $font-size-xl;
          }

          @media screen and (max-width: 600px){
            padding: $spacing-sm;
            font-size: $font-size-lg;
          }
        }

        p {
          text-align: center;
          margin:0;
          opacity: 0.4;

          @media screen and (max-width: 768px){
            display: none;
          }
        }
      }
      
      .image-wrapper {
        position: absolute;
        bottom:0;
        z-index: 10;
        width: 100%;
        max-width: 40vw;
        border-radius: 6px 6px 0 0;
        transition: all 0.38s ease-in-out;

        @media screen and (orientation: landscape) and (max-width: 600px) and (max-height: 768px) {
          width: 30vw;
          max-width: 300px;
          bottom: -100px;
        }

        @media screen and (orientation: landscape) and (max-height: 400px) {
          width: 90vw;
          bottom: 0;
          bottom: 0px;
        }

        @media screen and (max-width: 1000px) {
          max-width: 50vw;
        }

        @media screen and (max-width: 600px) {
          max-width: 66vw;
        }

        @media screen and (max-width: 420px) {
          max-width: 82vw;
        }

        img {
          width: 100%;
          bottom:-10px;
          position: relative;
          z-index: 10;
        }

        &::after {
          content: '';
          position: absolute;
          top: 10px;
          left: 5%;
          width: 90%;
          height: 40px;
          background: darken($white, 15%);
          z-index: 9;  
          transition: all 0.18s ease-in-out;
          mix-blend-mode: overlay;
        }

        &::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 10%;
          width: 80%;
          height: 40px;
          background: darken($white, 30%);
          z-index: 8;
          transition: all 0.18s ease-in-out;
          mix-blend-mode: overlay;
        }
      }

    }
  }
}

</style>