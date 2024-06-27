<template>
  <section id="Products">
    <nuxt-link 
        :class="['project', product.class]"
        v-for="(product, index) in products" 
        :key="product.title" 
        :to="product.slug" 
        :style="{ 
          animationDelay: index * 0.2 + 's', 
          backgroundColor: product.color, 
        }"
      >
      <section class="info">
        <h1>{{ product.title }}</h1>
        <p>{{ product.description }}</p>
        <!-- <Button to="/products/doodledapp" text="View project" type="big" /> -->
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
          title: 'Food For Future',
          description: 'Decentralized data for funding farmers',
          image: '/fff.png',
          bg: '/fff-bg.jpg',
          status: 'past',
          slug: '/products/food-for-future',
          color: '#9446BD',
          class: 'foodforfuture'
        },
        {
          title: 'Doodledapp',
          description: 'No-code smart contract development and deployment',
          image: '/doodledapp.png',
          bg: '/doodledapp-bg.jpg',
          status: 'past',
          slug: '/products/doodledapp',
          color: '#3E74FF',
          class: 'doodledapp flipped'
        },
        {
          title: 'Ultra',
          description: 'Tokenized gaming platform',
          image: '/ultra.png',
          bg: '/ultra-bg.jpg',
          status: 'past',
          slug: '/products/ultra',
          color: '#2E2667',
          class: 'ultra'
        },
        {
          title: 'Scatter',
          description: 'Open-source web3 wallet for EOS, Ethereum, and Tron',
          image: '/scatter.png',
          bg: '/scatter-bg.jpg',
          status: 'past',
          slug: '/products/scatter',
          color: '#0899FE',
          class: 'scatter flipped'
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
    height: 580px;
    width: 100dvw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: white;
    padding: $spacing-xl;
    position: relative;
    text-decoration: none;
    perspective: 1000rem;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 150%;
      height: 100%;
      background: rgba($black, 0.5);
      transition: all 0.8s ease-in-out;
    }

    &:hover {
      background-size: 80%;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba($black, 0);
      }

      .info {
        transform: scale(1) !important;
      }

    }

    @media screen and (max-width: 1000px){
      align-items: center;
    }

    &.ultra {
      background: url('/homepage/hp-ultra.png') no-repeat center center;

      @media screen and (max-width: 1000px){
        align-items: center;
        background-position: center right;
      }
    }

    &.scatter {
      background: url('/homepage/hp-scatter.png') no-repeat center center;
      align-items: flex-end;

      .info {
        transform: scale(0.9) rotate3d(1,-1,0,-36deg);

        @media screen and (max-width: 1000px){
          transform: none;
        }
      }

      @media screen and (max-width: 1000px){
        align-items: center;
      }
    }

    &.doodledapp {
      background: url('/homepage/hp-doodledapp.png') no-repeat center center;
      align-items: flex-end;

      .info {
        transform: scale(0.9) rotate3d(1,-1,0,-36deg);

        @media screen and (max-width: 1000px){
          transform: none;
        }
      }

      @media screen and (max-width: 1000px){
        align-items: center;
      }
    }

    &.foodforfuture {
      background: url('/homepage/hp-fff.png') no-repeat center center;

      @media screen and (max-width: 1000px){
        align-items: center;
        background-position: center right;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: $spacing-sm 0;
      text-align: center;
      position: relative;
      z-index: 10;
      transform: scale(0.9) rotate3d(1,1,0,36deg);
      transition: all 0.4s ease-in-out;

      @media screen and (max-width: 1000px){
        transform: none;
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
  }
}

.flipped {
  &.info {
    transform: scale(0.9) rotate3d(1,1,0,-36deg);

    @media screen and (max-width: 1000px){
      transform: none;
    }
  }
}

</style>