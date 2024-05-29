<template>
  <main class="product-main">
    <section class="product-content">
      <img src="/products/ultra/ultra-logo.svg" alt="Ultra Logo" class="product-logo">
      <h1 class="hyper-bold">Ultra</h1>
      <h4 class="centered">Tokenized game licenses and digital items</h4>
      
      
      <div class="main-product-image ultra" ref="image">
        <img src="/products/ultra/ultra-docs-main.png" alt="Ultra">
      </div>
      
    </section>
    <section class="product-content">
      <h2>The Ultra Story</h2>
      <aside class="story-time">
        <p>Ultra is a blockchain-based platform that allows game developers to mint and sell tokenized game licenses and digital items. The platform is based on a fork of the EOSIO blockchain and is designed to be a scalable, secure, and user-friendly platform for game developers and players.</p>

        <p>In January of 2020, after closing up shop at <nuxt-link to="/products/scatter">Scatter</nuxt-link>, my co-founder and I migrated to Ultra's blockchain team. Over the next two years, as the Technical Project Manager, I helped the team define, organize, develop, and deploy many key components while we ramped up to the Mainnet launch.</p>

        <p>As part of the work that I did there, I interacted with many other teams and spread critical knowledge about how the blockchain worked to those who were attempting to craft the company's marketing and business strategies.</p>

      </aside>
    </section>
    
    <img src="/products/ultra/ultra-documentation.png" alt="Ultra's documentation platform" class="single-product-image">

    <section class="product-content">
      <aside class="story-time">
        <p>In early 2023, I took on the role of Head of Developer Relations. It was my pleasure to directly interact with countless talented developers who were creating tools and games for Ultra's ecosystem.</p>

        <p>This involved creating a strategy for reaching developers, and of course, teaching them how to use the countless technologies that the teams had developed over the years. A large and complex documentation site was designed and developed by me and my team. This included hundreds of pages of documentation, video tutorials, and many code examples.</p>
      </aside>
    </section>

    <img src="/products/ultra/ultra-chill.png" alt="Ultra Chill" class="single-product-image">

    <section class="product-content">
      <aside class="story-time">

        <p>As part of both the Developer Relations and Marketing efforts, I hosted and produced the Ultra Chill podcast. Over four seasons, and dozens of episodes, I brought on both internal Ultra employees and external guests and talked to them about a wide range of topics. We covered things like how tokenization could impact businesses to why Ultra is building what it is.</p>

        <p>I resigned from Ultra in late 2024.</p>
      </aside>
    </section>

  </main>
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