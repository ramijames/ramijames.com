<template>
  <section id="Products">
    <nuxt-link
        :class="['project', product.class]"
        v-for="product in products" 
        :key="product.title" 
        :to="product.slug" 
        :style="{ backgroundColor: product.color, backgroundImage: `url(${product.bg})` }"
      >
      <!-- <section class="image-wrapper">
        <img :src="product.image" :alt="product.title" />
      </section> -->
      <section :class="['info', product.class]">
        <div class="tag">{{ product.type }}</div>
        <h3>{{ product.title }}</h3>
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

  .project {
    width: 100vw;
    height: 56vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-decoration: none;
    position: relative;
    background-size: cover;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      &.scatter,
      &.doodledapp,
      &.illustrations,
      &.telos {
        align-items: flex-end;

        .tag {
          align-self: flex-end;
        }
      }

      .tag {
        color: $white;
        margin: $spacing-md $spacing-md 0 $spacing-md;
        padding: $spacing-xs $spacing-sm;
        background: rgba($white, 0.2);
        align-self: flex-start;
        border-radius: 4px;
      }
    }

    h3 {
      color: $white;
      font-size: 6vw;
      border: 0;
      line-height: 100%;
      margin: $spacing-sm $spacing-md $spacing-md $spacing-md;
      padding: 0;
      text-wrap: balance;
      font-family: $font-family-secondary;
      z-index: 2;
      position: relative;
      text-shadow: 0 2px 2px rgba($black, 0.14), 0 10px 20px rgba($black, 0.15), 0 20px 40px rgba($black, 0.1);

      @media screen and (max-width: 768px){
        font-size: 15vw;
        text-wrap: balance;

        span {
          margin-bottom: 0.5rem;
          display: block;
        }
      }
    }
  }

  // .project {
  //   background-size: 100%;
  //   height: 520px;
  //   width: 50%;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  //   color: white;
  //   position: relative;
  //   text-decoration: none;
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   background-position: center center;
  //   transition: all .5s ease-in-out;
  //   transform: translateY(50px) scale(0.9);
  //   opacity: 1;

  //   &:hover {
  //     transform: translateY(0px) scale(1.1) !important;
  //     box-shadow: 0 20px 20px rgba($black, 0.6), 0 40px 40px rgba($black, 0.3);
  //     z-index: 10;
  //   }

  //   &.visible {
  //     transform: translateY(0px) scale(1);
  //     opacity: 1;
  //   }

  //   @media screen and (max-width: 1000px) {
  //     height: 420px;
  //     width: 100%;
  //     margin-bottom: $spacing-md;
  //   }

  //   .image-wrapper {
  //     position: absolute;
  //     bottom:0;
  //     top: 0;
  //     left: 0;
  //     right: 0;
  //     z-index: 10;
  //     width: 100%;
  //     border-radius: 6px 6px 0 0;
  //     transition: all 0.38s ease-in-out;
  //     overflow: hidden;

  //     // @media screen and (orientation: landscape) and (max-width: 600px) and (max-height: 768px) {
  //     //   width: 30vw;
  //     //   max-width: 300px;
  //     //   bottom: -100px;
  //     // }

  //     // @media screen and (orientation: landscape) and (max-height: 400px) {
  //     //   width: 90vw;
  //     //   bottom: 0;
  //     //   bottom: 0px;
  //     // }

  //     // @media screen and (max-width: 1000px) {
  //     //   max-width: 50vw;
  //     // }

  //     // @media screen and (max-width: 600px) {
  //     //   max-width: 66vw;
  //     // }

  //     // @media screen and (max-width: 420px) {
  //     //   max-width: 82vw;
  //     // }

  //     .image-pages {
  //       width: 100%;
  //       max-width: 600px;
  //       bottom:-74px;
  //       position: absolute;
  //       right: -54px;
  //       z-index: 9;
  //       transform: rotate(-11.5deg) scale(0.9);
  //       border-radius: 6px;
  //       transition: transform 0.38s ease-in-out;

  //       @media screen and (max-width: 1000px) {
  //         right: -54px;
  //         bottom: 80px;
  //       }

  //       img {
  //         width: 100%;
  //         height: auto;
  //         border-radius: 6px;
  //         transition: all 0.38s ease-in-out;
  //         position: relative;
  //         z-index: 10;
  //         overflow: hidden;
  //       }

  //       &::after {
  //         content: '';
  //         position: absolute;
  //         top: 0px;
  //         left: 5%;
  //         width: 90%;
  //         height: 40px;
  //         border: 1px solid darken($white, 30%);
  //         z-index: -1;  
  //         transition: all 0.18s ease-in-out;
  //         mix-blend-mode: overlay;
  //       }

  //       &::before {
  //         content: '';
  //         position: absolute;
  //         top: 0px;
  //         left: 10%;
  //         width: 80%;
  //         height: 40px;
  //         border: 1px solid darken($white, 30%);
  //         z-index: -2;
  //         transition: all 0.18s ease-in-out;
  //         mix-blend-mode: overlay;
  //       }
  //     }

  //     img {

  //     }
  //   }

  //   &:nth-child(even) {
  //     margin-left: 50%;

  //     @media screen and (max-width: 1000px) {
  //       margin-left: 0;
  //     }

  //     .info {
  //       left: auto;
  //       right: 0;

  //       @media screen and (max-width: 1000px) {
  //         left: 0;
  //         right: auto;
  //       }
  //     }
  //   }

  //   // @media screen and (max-width: 1200px) {
  //   //   height: 420px;
  //   // }

  //   // @media screen and (max-width: 1000px) {
  //   //   height: 420px;
  //   //   width: 100vw;
  //   // }

  //   // @media screen and (max-width: 600px) {
  //   //   height: 320px;
  //   // }

  //   // @media screen and (max-width: 420px) {
  //   //   height: 280px;
  //   // }


  //   .right {
  //     background-position: center right;
  //   }

  //   &::after {
  //     content: '';
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //     background: rgba($black, .4);
  //     transition: all 0.8s ease-in-out;
  //     mix-blend-mode: multiply;

  //     @media screen and (max-width: 768px){
  //       background: rgba($black, .25);
  //     }
  //   }

  //   &:hover {

  //     @media screen and (max-width: 1000px){
  //       flex: 1 0 0;
  //     }

  //     &::after {
  //       background: rgba($black, .15);
  //     }


  //     .image-wrapper {

  //       .image-pages {
  //         transform: rotate(-6.5deg) scale(1);

  //         &::after {
  //           top:-10px;
  //         }

  //         &::before {
  //           top:-20px;
  //         }
  //       }

  //     }
  //   }

    // &.ultra {
    //   background-image: url('/homepage/hp-ultra.png');
    // }

    // &.illustrations {
    //   background-image: url('/homepage/hp-illustrations.jpg');
    //   background-position: bottom center;
    // }

    // &.scatter {
    //   background-image: url('/homepage/hp-scatter.png');
    // }

    // &.doodledapp {
    //   background-image: url('/homepage/hp-doodledapp.png');
    // }

    // &.foodforfuture {
    //   background-image: url('/homepage/hp-fff.png');
    //   background-position: center right;
    // }

    // &.telos {
    //   background-image: url('/homepage/hp-telos.png');
    //   background-position: center right;
    // }
  // }

  // .info {
  //   width: 75%;
  //   position: absolute;
  //   left: 0;
  //   bottom: 0;
  //   transform: translateY(50%);
  //   z-index: 10;

  //   @media screen and (max-width: 1000px) {
  //     width: 100%;
  //     transform: none;
  //   }

  //   .text {
  //     width: 100%;
  //     display:flex;
  //     flex-direction: column;
  //     justify-content: flex-start;
  //     align-items: flex-start;
  //     color: $white;
  //     text-wrap: balance;
  //     padding: $spacing-md $spacing-md;

  //     h2 {
  //       text-align: left;
  //       line-height: 100%;
  //       margin: 0 0 $spacing-xs 0;

  //       @media screen and (max-width: 1000px){
  //         font-size: $font-size-xl;
  //       }

  //       @media screen and (max-width: 600px){
  //         padding: $spacing-sm;
  //         font-size: $font-size-lg;
  //       }
  //     }

  //     h4 {
  //       text-align: left;
  //       margin:0;
  //       opacity: 0.4;
  //       line-height: 120%;
  //     }
  //   }
  // }
}

</style>