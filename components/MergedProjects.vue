<template>
  <section id="Products">
    <nuxt-link 
        :class="['project', product.class]"
        v-for="(product, index) in products" 
        :key="product.title" 
        :to="product.slug" 
        :style="{ 
          backgroundColor: product.color, 
        }"
      >
      <section class="info">
        <section class="text">
          <h1>{{ product.title }}</h1>
          <p>{{ product.description }}</p>
        </section>
        <img class="product-image-thumb" :src="product.image" :alt="product.title" />
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
  }

}

</script>

<style lang="scss" scoped>

@import './assets/variables';

#Products {
  .project {
    background-size: 100%;
    height: 100vh;
    width: 100dvw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    position: relative;
    text-decoration: none;
    perspective: 1000rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    .right {
      background-position: center right;
    }

    @media screen and (max-width: 768px) {
      height: 70vh;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 150%;
      height: 100%;
      background: linear-gradient(20deg, rgba($black, 0) 45%, rgba($black, .8) 90%);
      transition: all 0.8s ease-in-out;
      mix-blend-mode: multiply;
    }

    &:hover .info {
       img {
        transform: translateY(0px);
        opacity: 1;
        mix-blend-mode: reset;
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
      padding: 0 $spacing-xl;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      position: relative;
      z-index: 10;
      overflow: hidden;
      perspective: 150em;

      @media screen and (max-width: 768px) {
        padding: 0 $spacing-sm;
      }

      .text {
        margin-top: $spacing-xl;
        display: flex;
        flex-direction: column;
        gap: $spacing-xs;

        @media screen and (max-width: 768px) {
          margin-top: $spacing-lg;
        }

        h1 {
          text-align: center;
          margin: 0;
          text-shadow: 0 4px 10px rgba($black, 0.25), 0 2px 2px rgba($black, 0.25), 0 1px 1px rgba($black, 0.5);

          @media screen and (max-width: 768px){
            font-size: $font-size-xxl;
          }
        }

        p {
          text-align: center;
          text-shadow: 0 4px 10px rgba($black, 0.25), 0 2px 2px rgba($black, 0.25), 0 1px 1px rgba($black, 0.5);
        }
      }

      img {
        width: 100%;
        max-width: 600px;
        margin: $spacing-xl 0 0;
        border-radius: 6px 6px 0 0;
        box-shadow: 0 0px 100px rgba($black, 0.25), 0 0px 10px rgba($blue, 0.18), 0 -2px 4px rgba($blue, 0.12);
        transform: translateY(80px);
        mix-blend-mode: luminosity;
        transition: all 0.38s ease-in-out;
        border: 1px solid rgba($white, 0.2);

        @media screen and (max-width: 768px) {
          transform: translateY(0px);
        }
      }

    }
  }
}

</style>