<template>

  <ProjectsHeader project="Tonara" logo="tonara-logo.png" />

  <section class="w-full">
    <section class="product-images three-across">
    <img src="/products/tonara/screen1.png" alt="TouchSpin" class="single-product-image">
    <img src="/products/tonara/screen2.png" alt="TouchSpin" class="single-product-image">
    <img src="/products/tonara/screen3.png" alt="TouchSpin" class="single-product-image">
    </section>
    <section class="product-images two-across">
      <img src="/products/tonara/website.png" alt="" class="single-product-image">
      <img src="/products/tonara/website2.png" alt="" class="single-product-image">
    </section>
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
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const rotationAngle = Math.max(0, 20 - scrollPosition / 20);
    image.value.style.transform = `rotate3d(1, 0, 0, ${rotationAngle}deg)`;
  };

  window.addEventListener('scroll', handleScroll);
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

</script>