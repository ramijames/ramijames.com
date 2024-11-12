<template>
  <section id="Products" class="w-three-quarters">
    <nuxt-link
        :class="['project', 'w-full', product.class]"
        v-for="product in products" 
        :key="product.title" 
        :to="product.slug" 
        :style="{ backgroundColor: product.color }"
      >
      <section :class="['info', product.class]">
        <img :src="product.logo" alt="Logo" class="logo" />
        <h3>{{ product.title }}</h3>
      </section>
      <img :src="product.image" alt="preview screenshot" class="preview" />
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
          logo: '/products/scatter/scatter-logo.png',
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
          logo: '/products/ultra/ultra-logo.svg',
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
          logo: '/products/doodledapp/doodledapp-logo.svg',
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
          logo: '/products/food-for-future/fff-logo.svg',
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
          logo: '/products/telos/telos-logo.png',
          bg: '/homepage/hp-telos.png',
          status: 'past',
          slug: '/products/telos-obe',
          color: '#571AFF',
          class: 'telos',
          type: 'Product Case Study'
        },
        // {
        //   title: 'Illustrations',
        //   description: 'Various illustrations during my journey',
        //   image: '/products/illustrations/illustrations-thumb.png',
        //   bg: '/homepage/hp-illustrations.jpg',
        //   status: 'past',
        //   slug: '/products/illustrations',
        //   color: '#0899FE',
        //   class: 'illustrations',
        //   type: 'Skillset Showcase'
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  position: relative;
  gap: $spacing-md;
  opacity: 0;
  animation: fadeInUp 0.3s forwards ease-in-out;
  animation-delay: 0.4s;

  @media screen and (max-width: 768px){
    padding: 0;
    gap: $spacing-sm;
  }

  .project {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-decoration: none;
    position: relative;
    background-size: cover;
    margin: 0;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    padding: 0;
    overflow: hidden;

    @media screen and (max-width: 768px){
      height: 400px;
    }

    .preview {
      position: absolute;
      bottom: -200px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      transition: all 0.3s ease;

      @media screen and (max-width: 768px){
        width: 80%;
        bottom: -100px;
      }
    }

    &:hover {
      opacity: 1;

      img.preview {
        bottom: -100px;
        opacity: 1;
      }

      .info {
        opacity: 1;
        transform: translateY(0);
      }

      &:before {
        background: radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0, 0, 0, 0.25) 100%);
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
      background: radial-gradient(circle, rgba(0,0,0,0.1) 40%, rgba(0, 0, 0, 0.25) 100%);
      z-index: 1;
      opacity: .6;
      transition: all 0.3s ease;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      opacity: 1;
      transition: all 0.3s ease-in-out;
      z-index: 1;
      padding: $spacing-md;
      width: 100%;
      height: 100%;

      img.logo {
        width: 100%;
        max-width: 100px;
        margin-top: $spacing-lg;
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