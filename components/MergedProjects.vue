<template>
  <section id="Products">
    <nuxt-link
        :class="['project', 'w-three-quarters', product.class]"
        v-for="product in products" 
        :key="product.title" 
        :to="product.slug" 
        :style="{ backgroundColor: product.color, backgroundImage: `url(${product.bg})` }"
      >
      <section :class="['info', product.class]">
        <h3>{{ product.title }}</h3>
        <p>View Product</p>
      </section>
    </nuxt-link>
  </section>
</template>

<script>

import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      products: [
        {
          title: 'Scatter',
          description: 'Open-source web3 wallet for EOS, Ethereum, and Tron',
          image: '/products/scatter/scatter-thumb.png',
          bg: '/homepage/hp-scatter.png',
          status: 'past',
          slug: '/products/scatter',
          color: '#0899FE',
          class: 'scatter',
          type: 'Product Case Study'
        },  
        {
          title: 'Ultra',
          description: 'Tokenized gaming platform',
          image: '/products/ultra/ultra-prime-thumb.png',
          bg: '/homepage/hp-ultra.png',
          status: 'past',
          slug: '/products/ultra',
          color: '#2E2667',
          class: 'ultra',
          type: 'Product Case Study'
        },  
        {
          title: 'Doodledapp',
          description: 'No-code smart contract development and deployment',
          image: '/products/doodledapp/doodledapp-thumb.png',
          bg: '/homepage/hp-doodledapp.png',
          status: 'past',
          slug: '/products/doodledapp',
          color: '#3E74FF',
          class: 'doodledapp',
          type: 'Product Case Study'
        },
        {
          title: 'Food For Future',
          description: 'Decentralized data for funding farmers',
          image: '/products/food-for-future/fff-thumb.png',
          bg: '/homepage/hp-fff.png',
          status: 'past',
          slug: '/products/food-for-future',
          color: '#9446BD',
          class: 'foodforfuture',
          type: 'Product Case Study'
        },
        {
          title: 'Telos Open Block Explorer',
          description: 'The best way to view transactions and manage your wallets',
          image: '/products/telos/telos-thumb.png',
          bg: '/homepage/hp-telos.png',
          status: 'past',
          slug: '/products/telos-obe',
          color: '#571AFF',
          class: 'telos',
          type: 'Product Case Study'
        },
        {
          title: 'Illustrations',
          description: 'Various illustrations during my journey',
          image: '/products/illustrations/illustrations-thumb.png',
          bg: '/homepage/hp-illustrations.jpg',
          status: 'past',
          slug: '/products/illustrations',
          color: '#0899FE',
          class: 'illustrations',
          type: 'Skillset Showcase'
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
  }
}

</script>

<style lang="scss" scoped>

@import './assets/variables';

#Products {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInUp 0.3s forwards ease-in-out;
  animation-delay: 0.4s;
  margin-bottom: $spacing-xl;

  .project {
    width: 100%;
    height: 40em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-decoration: none;
    position: relative;
    background-size: cover;
    padding: $spacing-lg;
    margin-top: 0;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    transform: scale(0.95);

    &:hover {
      opacity: 1;
      box-shadow: 0 20px 20px rgba($black, 1);
      transform: scale(1) rotate(0.5deg);

      .info {
        opacity: 1;
        transform: translateY(0);
      }

      &:after {
        opacity: 1;
      }
    }

    @media screen and (max-width: 768px){
      align-items: center;
      justify-content: center;
    }

    &.ultra,
    &.foodforfuture {
      background-position: right center;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(-120deg, rgba($black, 0) 50%, rgba($black, 1) 100%);
      mix-blend-mode: multiply;
      z-index: 0;
      opacity: .7;
      transition: all 0.3s ease-in-out;

      @media screen and (max-width: 768px){
        background: linear-gradient(-120deg, rgba($black, .6) 50%, rgba($black, 0.8) 100%);
        opacity: 1;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      z-index: 1;
      transform: translateY(100px);

      @media screen and (max-width: 768px){
        align-items: center;
        opacity: 1;
        transform: translateY(0);
      }

      p {
        color: $white;
        font-size: $font-size-sm;
        font-weight: 500;
        margin: 0;
        padding: 0;
        position: relative;
        opacity: 0.6;
      }

    }

    h3 {
      color: $white;
      font-size: 3.2vw;
      border: 0;
      font-weight: 900;
      line-height: 100%;
      padding: 0;
      margin: 0;
      text-wrap: balance;
      font-family: $font-family-secondary;
      position: relative;

      @media screen and (max-width: 768px){
        font-size: 10vw;
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