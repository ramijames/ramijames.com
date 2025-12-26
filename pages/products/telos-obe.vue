<template>

  <ProjectsHeader project="Telos OBE" logo="/products/telos/telos-logo.png" />

  <section class="w-full">
    <img src="/products/telos/telos-obe-home.png" alt="Telos OBE Home" class="single-product-image">
    <img src="/products/telos/telos-obe-various.png" alt="Telos OBE Various Screens" class="single-product-image">
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