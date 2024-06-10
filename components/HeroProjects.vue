<template>
  <main id="HeroProjects" class="general-main">
    <section class="slides-wrapper">
      <div class="slides" :style="{ width: `calc(100% * ${slides.length})`, transform: `translateX(-${currentSlide * (100 / slides.length)}%)` }">
        <div class="slide" v-for="(slide, index) in slides" :key="slide.description">
          <a :href="slide.link">
            <img :src="slide.image" alt="slide.description" />
          </a>
          <!-- <div class="slide-description">
            {{ slide.description }}
          </div> -->
        </div>
      </div>
      <section class="navigation">
        <button class="previous" @click="prevSlide">
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3L3.70711 10.2929C3.31658 10.6834 3.31658 11.3166 3.70711 11.7071L11 19" stroke="white" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="next" @click="nextSlide">
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L10.2929 10.2929C10.6834 10.6834 10.6834 11.3166 10.2929 11.7071L3 19" stroke="white" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </button>
      </section>
    </section>
    <Button class="products-button" to="/products" text="See Recent Work" size="default" />
    <HummingBird />
  </main>
</template>

<script>

export default {
  data() {
    return {
      currentSlide: 0,
      slides: [
        { image: '/products/doodledapp/flow.png', link: '/products/doodledapp', description: 'Doodledapp' },
        { image: '/products/scatter/scatter-main-mobile.png', link: '/products/scatter', description: 'Scatter' },
        { image: '/products/food-for-future/fff-display-two.png', link: '/products/food-for-future', description: 'Food for Future' },
        { image: '/products/ultra/ultra-docs-main.png', link: '/products/ultra', description: 'Ultra' },
      ]
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      if (this.currentSlide === 0) {
        this.currentSlide = this.slides.length - 1;
      } else {
        this.currentSlide--;
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 4000);
  }
}

</script>

<style scoped lang="scss">

@import './assets/variables';

#HeroProjects {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 720px;
  position: relative;
  padding:0;
  margin-bottom: $spacing-xl;

  @media screen and (max-width: 1000px){
    border-radius: 0;
    height: 400px;
    margin: 0 auto $spacing-lg;
    width: 90vw;
  }

  .products-button {
    position: absolute;
    bottom: -23px;
    right: 50%;
    transform: translateX(50%);
    box-shadow: 0 10px 0px rgba($black, 0.24);
  }

  .slides-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: $br-lg;
    box-shadow: 0px 2px 0 rgba($teal, 5%), 0px 4px 0 rgba($teal, 25%);
    border-top: 1px solid rgba($white,0.4);

    .navigation {
      position: absolute;
      top: $spacing-md;
      left: $spacing-md;
      border-radius: $br-sm;
      padding: $spacing-sm;
      cursor: pointer;
      z-index: 10;
      display: flex;
      flex-direction: row;
      gap: $spacing-md;
      background: $teal-dark;
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba($white,0.4);

      @media screen and (max-width: 768px){
        display:none;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;

        &:hover {
          svg path {
            stroke: rgba($white, 0.8);
          }
        }

        &:active {
          svg path {
            stroke: lighten($teal-dark, 20%);
          }
        }

        svg path {
          stroke: $white;
        }
      }
    }
  }

  .slides {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.25s ease-in-out;
    overflow: hidden;
    border-radius: $br-lg;
  }

  .slide {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: $br-lg;
    overflow: hidden;
  }

  .slide-description {
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("/_nuxt/public/textures/texture-3-bg.png") padding-box, linear-gradient(140deg, white -5%, white 15%) border-box;
    color: $teal-dark;
    font-size: $font-size-xxl;
    font-weight: 800;
    padding: $spacing-md $spacing-lg;
    text-align: center;
    border-radius: 0 $br-lg 0 $br-lg;
    overflow: hidden;
    border-top: 1px solid rgba($white,0.4);
    box-shadow: 0 10px 10px rgba($black, 0.24);

    @media screen and (max-width: 1000px){
      display: none;
    }
  }

  a {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      overflow: hidden;
      border-radius: $br-lg;
    }
  }
}

</style>