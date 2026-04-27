<template>
  <Loading v-if="loading" />

  <section id="Products" v-if="filteredProjects && loading == false && !vertical" :class="['w-consistent'], mobile ? 'mobile-only' : ''">
    <nuxt-link
        :class="['project', 'w-full', product.class]"
        v-for="product in filteredProjects" 
        :key="product.title" 
        :to="product.slug" 
        :style="{ backgroundColor: product.color }"
      >
      <section :class="['info', product.class]">
        <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" :src="product.logo" alt="Logo" class="logo" />
      </section>
      <section class="bg" :style="{ backgroundImage: 'url(' + product.bg + ')' }"></section>
    </nuxt-link>
  </section>

  <section id="ProductsVertical" v-if="products && loading == false && vertical">
    <!-- <h3>Products</h3> -->
    <nuxt-link
        :class="['vertical-project', 'w-full', product.class, { selected: product.title === matchingProject.title }]"
        v-for="product in products" 
        :key="product.title" 
        :to="product.slug" 
      >
      <section :class="['vertical-info', product.class]">
        <h4>{{ product.title }}</h4>
      </section>
    </nuxt-link>
  </section>


</template>

<script setup>

import { useRoute } from 'vue-router';
import { products } from '~/utils/products';
const route = useRoute();

const props = defineProps({
  vertical: Boolean,
  mobile: Boolean
});

const filteredProjects = ref(null);
const matchingProject = ref(null);

const loading = ref(true);

onMounted(() => {
  filteredProjects.value = products.filter(product => product.slug !== route.path);
  matchingProject.value = products.filter(product => product.slug == route.path)
  loading.value = false;
})

</script>

<style lang="scss" scoped>
#Products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-sm;
  grid-template-rows: 1fr;
  position: relative;

  &.mobile-only {
    display: none;

    @media screen and (max-width: 1000px){
      display: grid;
    }
  }
  
  @media screen and (max-width: 1180px){
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1000px) {
    margin: $spacing-sm;
    width: calc(100% - $spacing-md);
    grid-template-columns: 1fr;

  }
  
  @media screen and (max-width: 768px){
    padding: 0;
  }

  .project {
    width: 100%;
    height: 480px;
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
      height: 300px;
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

.dark {

  .vertical-project {
    color: $white !important;
    border-left: 1px solid rgba($white,0.2) !important;

    &.router-link-active, 
    &.router-link-exact-active,
    &:hover {
      background: $white !important;
      color: $black !important;
      border-left: 4px solid $blue !important;
    }

  }
}

#ProductsVertical {
  display: grid;
  grid-template-columns: 1fr;
  justify-content: flex-start;
  align-content: flex-start;
  gap: $spacing-xs;
  position: relative;
  position: fixed;
  top: calc(100px + $spacing-md);
  bottom: $spacing-sm;
  left: 0px;
  overflow-y: auto;
  width: 200px;
  padding: $spacing-sm;

  @media screen and (max-width: 1000px){
    display: none;
  }

  h3 {
    margin: 0;
  }

  p {
    opacity:0.4;
  }

  .vertical-project {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-decoration: none;
    position: relative;
    background-size: cover;
    transition: all 0.3s ease-in-out;
    padding: 0;
    margin: 0;
    overflow: hidden;
    color: $black;
    border-left: 1px solid $black;
    border-radius: 0 $br-sm $br-sm 0;

    &.router-link-active, 
    &.router-link-exact-active,
    &:hover {
      opacity: 1;
      background: $black;
      color: $white;
      border-left: 4px solid $blue;
    }

    .vertical-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      opacity: 1;
      transition: all 0.3s ease-in-out;
      z-index: 1;
      padding: $spacing-sm;
      width: 100%;
      height: 100%;

      h4 {
        margin: 0;

        @media screen and (max-width: 1400px){
          font-size: $font-size-sm;
        }
      }

    }

  }
}

</style>