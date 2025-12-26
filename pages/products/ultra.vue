<template>

  <ProjectsHeader project="Ultra" logo="ultra-logo.svg" />
  
  <section class="w-full">
    <img src="/products/ultra/ultra-documentation-1.png" alt="Ultra's documentation platform" class="single-product-image">
    <img src="/products/ultra/ultra-documentation-2.png" alt="Ultra's documentation platform" class="single-product-image">
    <hr>
    <img src="/products/ultra/ultra-prime-1.png" alt="Ultra Prime" class="single-product-image">
    <img src="/products/ultra/ultra-prime-2.png" alt="Ultra Prime" class="single-product-image">
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
  title: () => `Ultra`
})

useSeoMeta({
  title: 'Ultra',
  ogTitle: 'Ultra',
  description: 'Ultra is a blockchain-based platform that allows game developers to mint and sell tokenized game licenses and digital items. The platform is based on a fork of the EOSIO blockchain and is designed to be a scalable, secure, and user-friendly platform for game developers and players.',
  ogDescription: 'Ultra is a blockchain-based platform that allows game developers to mint and sell tokenized game licenses and digital items. The platform is based on a fork of the EOSIO blockchain and is designed to be a scalable, secure, and user-friendly platform for game developers and players.',
  ogImage: '',
  url: 'https://www.ramijames.com/products/ultra',
  twitterTitle: 'Ultra',
  twitterDescription: 'Ultra is a blockchain-based platform that allows game developers to mint and sell tokenized game licenses and digital items. The platform is based on a fork of the EOSIO blockchain and is designed to be a scalable, secure, and user-friendly platform for game developers and players.',
  twitterImage: '',
  twitterCard: 'summary_large_image',
})

</script>