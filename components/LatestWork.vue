<template>
  <div class="work-container">
    <section class="work-header">
      <section class="work-header-text">
        <h2>See My Latest Work</h2>
      </section>
      <nuxt-link class="button small white" to="/products">View all products</nuxt-link>
    </section>
    <section id="LatestWork">
      <nuxt-link
          :class="['project', product.class]"
          v-for="product in products"
          :key="product.title"
          :to="product.slug"
        >
        <div class="primary-image" :style="{ backgroundImage: `url(${product.bg})`, backgroundColor: `${product.color}` }">
          <div class="info-title">{{ product.title }}</div>
          <div class="info-description">{{ product.description }}</div>
        </div>
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
.work-container {
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-xl;
  background: $white;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 1000px) {
    padding: $spacing-md;
    gap: 0;
  }
}

.work-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1000px) {
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: $spacing-xs;
    margin-bottom: -62px;
  }

  .button {
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }

  .work-header-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    h2 {
      color: $black;
      opacity: 1;
      margin: 0;
    }
  }
}

#LatestWork {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
  height: calc(100dvh - ($spacing-xl * 2) - 100px);

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    height: auto;
  }

  .project {
    width: 100%;
    height: 100%;
    text-decoration: none;
    position: relative;
    transition: all 0.3s ease-in-out;
    overflow: hidden;

    @media screen and (max-width: 1000px) {
      height: 50%;
    }

    &:nth-child(1) {
      border-radius: $br-sm 0 0 $br-sm;

      @media screen and (max-width: 1000px) {
        border-radius: $br-sm $br-sm 0 0;
      }
    }

    &:nth-child(2) {
      border-radius: 0 $br-sm $br-sm 0;

      @media screen and (max-width: 1000px) {
        border-radius: 0 0 $br-sm $br-sm;
      }
    }

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
      background: $black;
      outline: 1px solid rgba($black, 0.1);
      background-size: cover;
      background-position: center;
      height: 100%;
      width: 100%;
      z-index: 1;
      transition: all 0.4s ease;
      padding: $spacing-md;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;


      @media screen and (max-width: 768px){
        background-position: top right;
        padding: $spacing-md;
        min-height: 200px;
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

.dark {
  .work-container {
    background: $black;
  }

  .work-header {
    .work-header-text {
      h2, p {
        color: $white;
      }
    }

    .view-all {
      color: $white;
    }
  }
}
</style>
