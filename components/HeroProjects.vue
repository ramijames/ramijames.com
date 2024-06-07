<template>
  <main id="HeroProjects" class="general-main">
    <section class="slides-wrapper">
      <div class="slides" :style="{ width: `calc(100% * ${slides.length})`, transform: `translateX(-${currentSlide * (100 / slides.length)}%)` }">
        <div class="slide" v-for="(slide, index) in slides" :key="slide.description">
          <a :href="slide.link">
            <img :src="slide.image" alt="slide.description" />
          </a>
          <div class="slide-description">
            {{ slide.description }}
          </div>
        </div>
      </div>
      <Button class="products-button" to="/products" text="See Recent Work" size="big" />
    </section>
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
  border-radius: $br-lg;
  background-color: $white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 720px;
  position: relative;
  padding:0;
  margin-bottom: $spacing-lg;
  box-shadow: 0px 2px 0 rgba($teal, 5%), 0px 4px 0 rgba($teal, 25%);

  @media screen and (max-width: 1000px){
    border-radius: 0;
  }

  .products-button {
    position: absolute;
    bottom: $spacing-md;
    right: $spacing-md;
  }

  .slides-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .slides {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease-in-out;
  }

  .slide {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .slide-description {
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(0deg, rgba($white,0.98), rgba($white,0.68));
    backdrop-filter: blur(10px);
    color: $teal-dark;
    font-size: $font-size-xxl;
    font-weight: 800;
    padding: $spacing-md $spacing-lg;
    text-align: center;
    border-radius: 0 $br-lg 0 $br-lg;
    border-top: 1px solid rgba($white,0.4);

    @media screen and (max-width: 1000px){
      border-radius: 0 $br-lg 0 0;
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