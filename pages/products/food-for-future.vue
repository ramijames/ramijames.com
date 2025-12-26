<template>

  <ProjectsHeader project="Food For Future" logo="fff-logo.svg" />

  <section class="w-full">
    <section class="product-images three-across">
      <img src="/products/food-for-future/fff-global-short.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-farms-explore.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-farms-single.png" alt="" class="single-product-image">
    </section>
  </section>

  <section class="w-full">
    <section class="product-images two-across">
      <img src="/products/food-for-future/fff-field-single.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-menu-open.png" alt="" class="single-product-image">
    </section>
  </section>

  <section class="w-full">
    <img src="/products/food-for-future/fff-brand.png" alt="Food for Future brand" class="single-product-image">
    <img src="/products/food-for-future/fff-icons.png" alt="Food for Future icons" class="single-product-image">
  </section>

  <MergedProjectsHeader />
  <MergedProjects />
  <Footer />
</template>

<script setup>

import { onMounted, onUnmounted, ref } from 'vue';

let image = ref(null);

onMounted(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const rotationAngle = Math.max(0, 20 - scrollPosition / 20);
    image.value.style.transform = `rotate3d(1, 0, 0, ${rotationAngle}deg)`;
  };

  window.addEventListener('scroll', handleScroll);
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

</script>