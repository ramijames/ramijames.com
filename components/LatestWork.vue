<template>

  <div class="work-container w-consistent">
    <div class="section-title">I've worked on a lot of interesting products over the years.</div>
    <section id="LatestWork">
      <nuxt-link
          :class="['project', 'w-full', product.class]"
          v-for="product in products" 
          :key="product.title" 
          :to="product.slug"
          :style="{ background: product.color }"
        >
        <img :src="product.image" alt="Logo" class="preview" />
        <section :class="['info', product.class]">
          <img :src="product.logo" alt="Logo" class="logo" />
          <section class="info-content">
            <div class="info-title">{{ product.title }}</div>
            <div class="info-description">{{ product.description }}</div>
          </section>
        </section>
        <div class="button white large">View product</div>
        <!-- <section class="bg" :style="{ backgroundImage: 'url(' + product.bg + ')' }"></section> -->
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
  display: grid;
  grid-template-columns: 1fr;
  padding: $spacing-xl 0;
  min-height: 100dvh;
  align-items: center;

  @media screen and (max-width: 1000px) {
    padding: $spacing-md;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    position: relative;
    margin: 0;
    transition: all 0.3s ease-in-out;
    padding: $spacing-md;
    overflow: hidden;
    border-radius: $br-sm;
    background: $black;
    outline: 1px solid rgba($black, 0.2);
    outline-offset: -1px;

    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba($black,0.6) 20%, rgba($black, 0.25) 100%);
      z-index: 1;
      opacity: .6;
      transition: all 0.3s ease;
      mix-blend-mode: soft-light;
    }

    @media screen and (max-width: 1024px){
      height: 400px;
    }

    .preview {
      position: absolute;
      bottom: -100px;
      right: -10%;
      width: 50%;
      transform: rotate(-15deg);
      z-index: 1;
      transition: all 0.3s ease;
      border-radius: $br-sm;
    }

    &:hover {
      opacity: 1;

      img.preview {
        bottom: -40px;
        opacity: 1;
      }
    }

    .info {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      opacity: 1;
      transition: all 0.3s ease-in-out;
      z-index: 1;
      padding: $spacing-sm;
      gap: $spacing-sm;

      img.logo {
        width: 100%;
        max-width: 100px;

        @media screen and (max-width: 1024px){
          max-width: 60px;
        }
      }

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
    }

    &:hover {
      .info {
        gap: $spacing-md;
      }
      
      .button {
        opacity: 1;
      }
    }

  }
}

</style>