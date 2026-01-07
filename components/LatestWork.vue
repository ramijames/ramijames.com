<template>

  <div class="work-container w-consistent">
    <h2>Latest Work</h2>
    <section id="LatestWork">
      <nuxt-link
          :class="['project', 'w-full', product.class]"
          v-for="product in products" 
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
  </div>

</template>

<script setup>

const products = [
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
                ];

</script>

<style lang="scss" scoped>

@import './assets/variables';

.work-container {

  h2 {
    margin: 0 0 $spacing-md;
  }
}

#LatestWork {
  width: 100%;
  position: relative;
  margin: $spacing-md 0 0;
  display: flex;
  flex-direction: row;
  gap: $spacing-md;

  @media screen and (max-width: 1400px) {
    width: 100%;
    margin: $spacing-sm 0;
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    gap: $spacing-sm;
    margin-bottom: $spacing-xl;
  }
  
  @media screen and (max-width: 768px){
    padding: 0;
  }

  .project {
    width: 100%;
    height: 600px;
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
      height: 400px;
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