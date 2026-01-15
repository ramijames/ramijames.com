<template>

  <div class="work-container w-consistent">
    <div class="section-title"
      v-gsap.whenVisible.from="{ opacity: 0, scale: 0.4, duration: 2.5, ease: 'power3.out' }"
    >I've worked on a lot of interesting products over the years.</div>
    <section id="LatestWork">
      <nuxt-link
          :class="['project', 'w-full', product.class]"
          v-for="product in products" 
          :key="product.title" 
          :to="product.slug"
          v-gsap.whenVisible.fromTo="[
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
          ]"
        >
        <div class="primary-image" :style="{ backgroundImage: `url(${product.bg})`, backgroundColor: `${product.color}` }">
          <div class="info-title">{{ product.title }}</div>
          <div class="info-description">{{ product.description }}</div>
        </div>
      </nuxt-link>
      <nuxt-link class="button large blue" to="/products">View all products</nuxt-link>
    </section>
  </div>

</template>

<script setup>

const products = [
                  {
                    title: 'Scatter',
                    description: 'Open-source web3 wallet',
                    image: '/products/scatter/scatter-thumb.png',
                    thumbnails: ['/products/scatter/scatter-thumb-1.png', '/products/scatter/scatter-thumb-2.png', '/products/scatter/scatter-thumb-3.png'],
                    logo: '/products/scatter/scatter-logo.png',
                    bg: '/products/scatter/scatter-shiny.png',
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
                    thumbnails: ['/products/doodledapp/doodledapp-thumb-1.png', '/products/doodledapp/doodledapp-thumb-2.png', '/products/doodledapp/doodledapp-thumb-3.png'],
                    logo: '/products/doodledapp/doodledapp-logo.svg',
                    bg: '/products/doodledapp/doodledapp-shiny.png',
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
@import './assets/animation';

.work-container {
  display: grid;
  grid-template-columns: 1fr;
  padding: $spacing-xl 0;
  min-height: 100vh;
  align-items: center;

  @media screen and (max-width: 1200px) {
    padding: $spacing-md;
  }

  @media screen and (max-width: 768px) {
    padding: $spacing-sm;
  }

  .section-title {
    font-size: 3dvw;
    font-weight: 400;
    line-height: 100%;
    text-wrap: balance;
    text-align: center;
    padding: $spacing-xl 0;
    opacity: 0.4;
    position: relative;

    @media screen and (max-width: 1000px) {
      font-size: 6dvw;
      padding: $spacing-md;
    }
  }
}

#LatestWork {
  width: 100%;
  position: relative;
  margin: $spacing-md 0 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  align-items: center;

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
    text-decoration: none;
    position: relative;
    margin: 0;
    transition: all 0.3s ease-in-out;

    .info-title {
      font-size: $font-size-xl;
      color: rgba($white, 1);
      position: relative;
      z-index: 2;

      @media screen and (max-width: 768px){
        text-align: center;
      }
    }

    .primary-image {
      border-radius: $br-md;
      background: $black;
      outline: 1px solid rgba($black, 0.1);
      background-size: cover;
      background-position: center;
      height: 800px;
      width: 100%;
      z-index: 1;
      transition: all 0.4s ease;
      padding: $spacing-lg;
      overflow: hidden;
      position: relative;

      @media screen and (max-width: 768px){
        background-position: top right;
        padding: $spacing-md;
        height: 480px;
      }

      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba($black, .5);
        z-index: 1;
        transition: all 0.2s ease;
        -webkit-mask-image: linear-gradient(120deg, black 15% , transparent 100%);
        mask-image: linear-gradient(120deg, black 15% , transparent 100%);
      }

      .info-description {
        font-size: $font-size-sm;
        color: $white;
        z-index: 2;
        position: relative;

        @media screen and (max-width: 768px){
          text-align: center;
        }
      }
    }

    &:hover {
      .primary-image {

        &:before {
          background: rgba($black, .1);
        }
      }
    }

    
  }
}

</style>