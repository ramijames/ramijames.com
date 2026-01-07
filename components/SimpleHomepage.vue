<template>
  <main id="Hero">
    
    <section class="mega-hero">
      <section class="mega-content">
        <div class="developer">
          <small>Developer</small>
          <span>Rami</span>
        </div>
        <img src="/rami_small_white.png">
        <div class="designer">
          <span>James</span>
          <small>Product Designer</small>
        </div>
      </section>
    </section>  
    <Clients />
    
    <LatestWork />
    <FeaturedThoughts :featured-articles="featuredArticles" :articles="regularArticles" />
    <Testimonials />

    <!-- <section id="Reasons">
      <VisibleThought />
      <PartnerNotVendor />
    </section> -->

  </main>
  
</template>

<script setup>

import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'

import articles from '~/assets/articles.json'

// Get the two latest articles as featured
const featuredArticles = computed(() => articles.slice(0, 4))

// Get remaining articles (excluding the first two)
const regularArticles = computed(() => articles.slice(4))


</script>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';



#Hero {
  position: relative;
  background-size: cover;
  border-bottom: $border;

  .mega-hero {
    height: 80dvh;
    width: calc(100dvw - $spacing-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: calc(100px  + $spacing-md);

    @media screen and (max-width: 1000px) {
      padding-top: calc(68px + $spacing-sm);
    }

    .mega-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: $spacing-sm;

      @media screen and (max-width: 1200px) {
        flex-direction: column;
        gap: 0;
      }

      .developer {
        font-size: 6dvw;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        letter-spacing: -.2dvw;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
        margin-bottom: 23px;

        span { 
          line-height: 100%;
        }

        @media screen and (max-width: 768px) {
          font-size: 18dvw;
          align-items: center;
        }
        
        @media screen and (max-width: 1200px) {
          font-size: 12dvw;
          align-items: center;
        }

        small {
          font-size: 1.3dvw;
          letter-spacing: initial;
          font-weight: 500;
          opacity: 0.7;

          @media screen and (max-width: 1200px) {
            font-size: 3dvw;
          }
        }
      }

      img {
        max-width: 15dvw;
        border-radius: $br-sm;

        @media screen and (max-width: 1200px) {
          max-width: 35dvw;
        }
      }

      .designer {
        font-size: 6dvw;
        font-weight: 700;
        text-transform: uppercase;
        position: relative;
        letter-spacing: -.2dvw;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0;
        margin-top: 23px;

        span { 
          line-height: 100%;
        }

        @media screen and (max-width: 768px) {
          font-size: 18dvw;
          align-items: center;
        }
        
        @media screen and (max-width: 1200px) {
          font-size: 12dvw;
          align-items: center;
        }

        small {
          font-size: 1.3dvw;
          letter-spacing: initial;
          font-weight: 500;
          opacity: 0.7;

          @media screen and (max-width: 1200px) {
            font-size: 3dvw;
          }
        }
      }
    }
  }

}

#Reasons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba($blue, 0.05);
  margin-top: $spacing-lg;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

</style>