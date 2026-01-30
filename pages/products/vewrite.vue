<template>
  <section class="w-project">

    <ProjectsOverview
      title="Vewrite"
      tagline="A better way for writers to work together"
      overview="test"
      goal="test"
      outcome="test"
      services="test"
    />

    <img src="/products/vewrite/ve-homepage.png" alt="Vewrite homepage" class="single-product-image">
    <hr>
    <img src="/products/vewrite/ve-projects.png" alt="Vewrite projects view" class="single-product-image">
    <img src="/products/vewrite/ve-workflowcreation.png" alt="Vewrite workflow creation" class="single-product-image">
    <img src="/products/vewrite/ve-deliverable.png" alt="Vewrite deliverable view" class="single-product-image">
    <hr>
    <img src="/products/vewrite/ve-brand.png" alt="Vewrite Brand" class="single-product-image">
    <img src="/products/vewrite/ve-palette.png" alt="Vewrite Brand" class="single-product-image">
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

useHead({
  title: () => `Vewrite`
})

useSeoMeta({
  title: 'Vewrite',
  ogTitle: 'Vewrite',
  description: 'Better writing through structured workflows',
  ogDescription: 'Better writing through structured workflows',
  url: 'https://www.ramijames.com/products/vewrite/',
  twitterTitle: 'Vewrite',
  twitterDescription: 'Better writing through structured workflows',
  twitterImage: '/products/vewrite/ve-projects.png',
  twitterCard: 'summary_large_image',
})

</script>