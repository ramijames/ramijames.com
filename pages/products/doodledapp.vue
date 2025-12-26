<template>

  <ProjectsHeader project="doodledapp" logo="doodledapp-logo.svg" />

  <section class="w-full">
    <img src="/products/doodledapp/flow.png" alt="Early Doodledapp" class="single-product-image">
    <img src="/products/doodledapp/contract-function-single.png" alt="Early Doodledapp" class="single-product-image">
    <img src="/products/doodledapp/firstproject.png" alt="Doodledapp Project Management" class="single-product-image">
    <img src="/products/doodledapp/oneproj-populated.png" alt="Doodledapp Project Management" class="single-product-image">
    <img src="/products/doodledapp/deploy.png" alt="Doodledapp Deployment" class="single-product-image">
    <hr>
    <img src="/products/doodledapp/doodledapp-website.png" alt="Doodledapp Website" class="single-product-image">
  </section>

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
  title: () => `Doodledapp`
})

useSeoMeta({
  title: 'Doodledapp',
  ogTitle: 'Doodledapp',
  description: 'Doodledapp was a no-code smart contract editor that allowed users to create and deploy smart contracts to public networks quickly and easily. The project was broken up into a few discrete parts. Initially, we targeted smart contract developers working in Solidity, and provided them a comfortable environment to build their contracts with a node-based editor. These developers created complex, vetted components that any other user could then import into their smart contracts to extend.',
  ogDescription: 'Doodledapp was a no-code smart contract editor that allowed users to create and deploy smart contracts to public networks quickly and easily. The project was broken up into a few discrete parts. Initially, we targeted smart contract developers working in Solidity, and provided them a comfortable environment to build their contracts with a node-based editor. These developers created complex, vetted components that any other user could then import into their smart contracts to extend.',
  ogImage: '',
  url: 'https://www.ramijames.com/products/vewrite',
  twitterTitle: 'Doodledapp',
  twitterDescription: 'Doodledapp was a no-code smart contract editor that allowed users to create and deploy smart contracts to public networks quickly and easily. The project was broken up into a few discrete parts. Initially, we targeted smart contract developers working in Solidity, and provided them a comfortable environment to build their contracts with a node-based editor. These developers created complex, vetted components that any other user could then import into their smart contracts to extend.',
  twitterImage: '',
  twitterCard: 'summary_large_image',
})

</script>