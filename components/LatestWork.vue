<template>

  <div class="work-container w-consistent">
    <div class="section-title">I've worked on a lot of interesting products over the years.</div>
    <section id="LatestWork">
      <nuxt-link
          :class="['project', 'w-full', product.class]"
          v-for="product in products" 
          :key="product.title" 
          :to="product.slug"
          :style="{ backgroundImage: `url(${product.bg})`, backgroundColor: `${product.color}` }"
        >
        <img 
          :src="product.logo" 
          alt="Logo" 
          class="logo" 
          :style="{ backgroundColor: `${product.color}` }"
        />
        <!-- <img :src="product.image" alt="Logo" class="preview" /> -->
        <section :class="['info', product.class]">
          <section class="info-content">
            <div class="info-title">{{ product.title }}</div>
            <div class="info-description">{{ product.description }}</div>
          </section>
        </section>
        <section class="thumbnails">
          <img v-for="image in product.thumbnails" :src="image" />
        </section>
        <!-- <div class="button large">View product</div> -->
      </nuxt-link>
      <nuxt-link class="button large" to="/products">View more</nuxt-link>
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
                    bg: '/products/scatter/scatter-bg1.png',
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

    @media screen and (max-width: 1000px) {
      font-size: 4dvw;
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
    height: 800px;
    text-decoration: none;
    position: relative;
    margin: 0;
    transition: all 0.3s ease-in-out;
    padding: $spacing-md;
    overflow: hidden;
    border-radius: $br-md;
    background: $black;
    outline: 1px solid rgba($black, 0.1);
    background-size: cover;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: flex-end;

    img.logo {
        width: 100%;
        max-width: 100px;
        padding: 24px;
        background: $black;
        border-radius: $br-sm;
        position: absolute;
        top: -5px;
        z-index: 11;

        @media screen and (max-width: 1024px){
          max-width: 60px;
          padding: 12px;
        }
      }

    @media screen and (max-width: 1200px){
      height: 600px;
      padding: $spacing-sm;
    }

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($black, .1);
      backdrop-filter: blur(20px);
      z-index: 1;
      transition: all 0.3s ease;
    }

    .thumbnails {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: $spacing-xs;
      align-items: flex-end;
      justify-content: flex-end;
      z-index: 10;
      max-width: 85%;
      transition: all 0.3s ease-in-out;

      @media screen and (max-width: 1200px){
        max-width: 100%;
        gap: 1px;
        border-radius: $br-sm;
        overflow: hidden;
      }

      img {
        width: 33.333%;
        border-radius: $br-sm;
        width: 100%;

        @media screen and (max-width: 1200px){
          border-radius: 0;
        }
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      opacity: 1;
      transition: all 0.3s ease-in-out;
      z-index: 1;
      padding: 0 0 $spacing-md;
      gap: $spacing-sm;

      .info-content {

        .info-title {
          font-size: $font-size-lg;
          color: $white;
        }

        .info-description {
          font-size: $font-size-sm;
          color: $white;
        }
      }

    }

    .button {
      opacity: 0;
      z-index:10;
    }

    &:hover {

      &:before {
        background: rgba($black, .02);
      }
      
      .button {
        opacity: 1;
      }
    }

  }
}

</style>