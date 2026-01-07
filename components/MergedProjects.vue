<template>
  <Loading v-if="loading" />

  <section id="Products" v-if="filteredProjects && loading == false && !vertical" :class="['w-consistent'], mobile ? 'mobile-only' : ''">
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

  <section id="ProductsVertical" v-if="products && loading == false && vertical">
    <!-- <h3>Products</h3> -->
    <nuxt-link
        :class="['vertical-project', 'w-full', product.class, { selected: product.title === matchingProject.title }]"
        v-for="product in products" 
        :key="product.title" 
        :to="product.slug" 
      >
      <section :class="['vertical-info', product.class]">
        <h4>{{ product.title }}</h4>
      </section>
    </nuxt-link>
  </section>


</template>

<script setup>

import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({
  vertical: Boolean,
  mobile: Boolean
});

const filteredProjects = ref(null);
const matchingProject = ref(null);

const loading = ref(true);

onMounted(() => {
  filteredProjects.value = products.filter(product => product.slug !== route.path);
  matchingProject.value = products.filter(product => product.slug == route.path)
  loading.value = false;
})

const products = [
                  // {
                  //   title: 'Vewrite',
                  //   description: 'Open-source project management for content creators',
                  //   image: '/products/vewrite/ve-thumb.png',
                  //   logo: '/products/vewrite/ve-logo.svg',
                  //   bg: '/homepage/hp-vewrite.png',
                  //   status: 'past',
                  //   slug: '/products/vewrite/',
                  //   color: '#0D1E38',
                  //   class: 'vewrite',
                  //   type: 'Product Case Study'
                  // }, 
                  {
                    title: 'Scatter',
                    description: 'Open-source web3 wallet',
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
                    description: 'No-code smart contract builder',
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
                    title: 'Telos OBE',
                    description: 'Open source block explorer',
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
                    description: 'iGaming on your iPad',
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
                  },
                  {
                    title: 'Qmarkets',
                    description: 'Stop Wasting Time on Innovation Without Impact',
                    image: '/products/telos/telos-thumb.png',
                    logo: '/products/qmarkets/qmarkets-logo.svg',
                    bg: '/products/touchspin/tonara-bg.png',
                    status: 'past',
                    slug: '/products/qmarkets/',
                    color: '#182043',
                    class: 'qmarkets',
                    type: 'Product Case Study'
                  }      
                ];

</script>

<style lang="scss" scoped>

@import './assets/variables';

#Products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: $spacing-sm;
  grid-template-rows: 1fr;
  position: relative;

  &.mobile-only {
    display: none;

    @media screen and (max-width: 1000px){
      display: grid;
    }
  }

  @media screen and (max-width: 1000px) {
    margin: $spacing-sm;
    width: calc(100% - $spacing-md);
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
    border-radius: $br-sm;

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

.dark {

  .vertical-project {
    color: $white !important;
    border-left: 1px solid rgba($white,0.2) !important;

    &.router-link-active, 
    &.router-link-exact-active,
    &:hover {
      background: $white !important;
      color: $black !important;
      border-left: 4px solid $blue !important;
    }

  }
}

#ProductsVertical {
  display: grid;
  grid-template-columns: 1fr;
  justify-content: flex-start;
  align-content: flex-start;
  gap: $spacing-xs;
  position: relative;
  position: fixed;
  top: calc(100px + $spacing-md);
  bottom: $spacing-sm;
  left: 0px;
  overflow-y: auto;
  width: 200px;
  padding: $spacing-sm;

  @media screen and (max-width: 1000px){
    display: none;
  }

  h3 {
    margin: 0;
  }

  p {
    opacity:0.4;
  }

  .vertical-project {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-decoration: none;
    position: relative;
    background-size: cover;
    transition: all 0.3s ease-in-out;
    padding: 0;
    margin: 0;
    overflow: hidden;
    color: $black;
    border-left: 1px solid $black;
    border-radius: 0 $br-md $br-md 0;

    &.router-link-active, 
    &.router-link-exact-active,
    &:hover {
      opacity: 1;
      background: $black;
      color: $white;
      border-left: 4px solid $blue;
    }

    .vertical-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      opacity: 1;
      transition: all 0.3s ease-in-out;
      z-index: 1;
      padding: $spacing-sm;
      width: 100%;
      height: 100%;

      h4 {
        margin: 0;

        @media screen and (max-width: 1400px){
          font-size: $font-size-sm;
        }
      }

    }

  }
}

</style>