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
  display: flex; /* Changed to flex for better height distribution */
  flex-direction: column;
  height: 100dvh; /* Match the snap-section exactly */
  width: 100%;
  padding: $spacing-xl;
  background: $white;
  position: relative;
  z-index: 1;
  box-sizing: border-box; /* Ensures padding is included in the 100dvh calculation */
  overflow: hidden;

  @media screen and (max-width: 1000px) {
    padding: calc($spacing-md + 58px) $spacing-md $spacing-md $spacing-md;
    /* Account for iOS safe area (bottom home bar) */
    padding-bottom: calc($spacing-md + env(safe-area-inset-bottom));
    gap: $spacing-xs;
  }
}

.work-header {
  flex-shrink: 0; /* Prevents header from squishing */
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
    margin-bottom: 0; /* Removed negative margin which causes alignment issues */
  }

  .button {
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }

  .work-header-text {
    h2 {
      color: $black;
      margin: 0;
    }
  }
}

#LatestWork {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1; /* Automatically takes up remaining space in .work-container */
  min-height: 0; /* Fixes flex child overflow in some browsers */

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }

  .project {
    width: 100%;
    height: 100%;
    text-decoration: none;
    position: relative;
    transition: all 0.3s ease-in-out;
    overflow: hidden;

    @media screen and (max-width: 1000px) {
      flex: 1; /* Divides available space equally between projects */
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

    .primary-image {
      background: $black;
      background-size: cover;
      background-position: center;
      height: 100%;
      width: 100%;
      padding: $spacing-md;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
      box-sizing: border-box;

      @media screen and (max-width: 768px){
        background-position: center; /* Better centering for vertical mobile view */
      }

      &:before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba($black, .5);
        z-index: 1;
        -webkit-mask-image: linear-gradient(120deg, black 15% , transparent 100%);
        mask-image: linear-gradient(120deg, black 15% , transparent 100%);
      }

      .info-title {
        position: relative;
        z-index: 2;
        color: $white;
        font-size: $font-size-md;
      }
      
      .info-description {
        position: relative;
        z-index: 2;
        color: $white;
        font-size: $font-size-xs;
      }
    }
  }
}

.dark {
  .work-container { background: $black; }
  .work-header .work-header-text h2 { color: $white; }
}
</style>