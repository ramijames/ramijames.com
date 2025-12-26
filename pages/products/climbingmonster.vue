<template>

  <ProjectsHeader project="Climbing Monster" logo="climbingmonster-logo.png" />

  <!-- <section class="w-half">
    <p>The product vision of Climbing Monster was to allow climbing trainers and athelets to build structured workouts that could be tracked, analyzed, and improved. The business model was focused on providing benefit for gyms that would increase loyalty through athletic improvement.</p>
    <p>I was the Head of Product for the POC. It was my job to produce high-fidelity mockups for the mobile application (iOS), for the web-based training app, for advertising purposes, and the pitch decks that we used to try and get funding.</p>
  </section> -->

  <section class="w-full">
    <img src="/products/climbingmonster/mobile-flow.png" alt="Climbing Monster mobile app for iOS" class="single-product-image">
  </section>

  <section class="w-full">
    <section class="product-images three-across">
      <img src="/products/climbingmonster/cm-createsession-welcome.png" alt="" class="single-product-image">
      <img src="/products/climbingmonster/cm-createsession-calendar.png" alt="" class="single-product-image">
      <img src="/products/climbingmonster/cm-createsession-current.png" alt="" class="single-product-image">
    </section>
  </section>

  <section class="w-full">
    <img src="/products/climbingmonster/77c0cd32013425.5605afad2ae28.png" alt="Climbing Monster web interface" class="single-product-image">
    <img src="/products/climbingmonster/09078932013445.5605af7a1f287.png" alt="Climbing Monster web interface" class="single-product-image">
  </section>

  <section class="w-full">
    <img src="/products/climbingmonster/cm-brand.png" alt="Climbing Monster Brand" class="single-product-image">
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