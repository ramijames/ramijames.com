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
          <h3>{{ product.title }}</h3>
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
  }

}

</script>

<style lang="scss" scoped>

@import './assets/variables';

#Products {
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    
  }

  .project {
    background-size: 100%;
    height: 50vh;
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

    @media screen and (max-width: 768px) {
      height: 50vh;
      width: 100vw;
    }

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
      background: rgba($black, .9);
      transition: all 0.8s ease-in-out;
      mix-blend-mode: multiply;
    }

    &:hover {
      &::after {
        background: rgba($black, .15);
      }

      .info {
        img {
          bottom: -30px;
          opacity: 1;
          mix-blend-mode: reset;
        }

        .text {
          transform: scale(1);
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
        margin-top: $spacing-md;
        display: flex;
        flex-direction: column;
        gap: $spacing-xs;
        transform: scale(.9);
        transition: all 0.5s ease-in-out;

        @media screen and (max-width: 768px) {
          margin-top: $spacing-lg;
        }

        h3 {
          text-align: center;
          font-weight: 700;
          line-height: 100%;
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
        max-width: 30vw;
        margin: $spacing-xl 0 0;
        border-radius: 6px 6px 0 0;
        transform: translateY(0vw);
        mix-blend-mode: luminosity;
        transition: all 0.38s ease-in-out;
        position: absolute;
        bottom:0;

        @media screen and (max-width: 768px) {
          transform: none !important;
          max-width: 80vw;
        }
      }

    }
  }
}

</style>