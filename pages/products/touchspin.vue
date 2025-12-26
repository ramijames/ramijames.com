<template>

  <ProjectsHeader project="TouchSpin" logo="touchspin-logo.svg" />

  <section class="w-full">
    <section class="product-images two-across">
      <img src="/products/touchspin/image4.png" alt="" class="single-product-image">
      <img src="/products/touchspin/image5.png" alt="" class="single-product-image">
    </section>
  </section>

  <section class="w-full">
    <img src="/products/touchspin/image1.png" alt="TouchSpin" class="single-product-image">
    <img src="/products/touchspin/image2.png" alt="TouchSpin" class="single-product-image">
    <img src="/products/touchspin/image3.png" alt="TouchSpin" class="single-product-image">
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