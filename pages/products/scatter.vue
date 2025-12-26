<template>
  <ProjectsHeader project="scatter" logo="scatter-logo.png" />

  <section class="w-full">
    <img src="/products/scatter/scatter-mobile.png" alt="Scatter In Progress" class="single-product-image">
    <img src="/products/scatter/inside_desktop.png" alt="Scatter In Progress" class="single-product-image">
    <img src="/products/scatter/scatter-in-progress.png" alt="Scatter In Progress" class="single-product-image">
    <img src="/products/scatter/better-on-boarding.png" alt="Scatter improves its on-boarding" class="single-product-image">
    <img src="/products/scatter/scatter-evolves.png" alt="Scatter evolves" class="single-product-image">
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
  title: () => `Scatter`
})

useSeoMeta({
  title: 'Scatter',
  ogTitle: 'Scatter',
  description: 'Scatter was a digital identity and wallet that allowed users to interact with the EOS blockchain. At first, it was simply a browser extension that allowed users to sign transactions and interact with apps in a secure way. Quickly the vision of the product evolved from a signing extension into a digital hub for EOS users to manage their signing keys, their digital identity, and the apps that they would find most useful.',
  ogDescription: 'Scatter was a digital identity and wallet that allowed users to interact with the EOS blockchain. At first, it was simply a browser extension that allowed users to sign transactions and interact with apps in a secure way. Quickly the vision of the product evolved from a signing extension into a digital hub for EOS users to manage their signing keys, their digital identity, and the apps that they would find most useful.',
  ogImage: '',
  url: 'https://www.ramijames.com/products/scatter',
  twitterTitle: 'Scatter',
  twitterDescription: 'Scatter was a digital identity and wallet that allowed users to interact with the EOS blockchain. At first, it was simply a browser extension that allowed users to sign transactions and interact with apps in a secure way. Quickly the vision of the product evolved from a signing extension into a digital hub for EOS users to manage their signing keys, their digital identity, and the apps that they would find most useful.', 
  twitterImage: '',
  twitterCard: 'summary_large_image',
})

</script>