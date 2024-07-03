<template>
  <section class="product-content">
    <img src="/products/ultra/ultra-logo.svg" alt="Ultra Logo" class="product-logo">
    <h1 class="hyper-bold">Ultra</h1>
    <h4 class="centered">Tokenized game licenses and digital items</h4>
    <div class="main-product-image ultra" ref="image">
      <img src="/products/ultra/ultra-docs-main.png" alt="Ultra">
    </div>
  </section>

  <section class="w-three-quarters">
    <aside class="product-role">
      <div class="single-role">
        <h3>Role</h3>
        <h4>I was the Technical Project Manager of the blockchain team during the critical period where Ultra developed many of its core features and deployed them to the public as they launched their gaming-focused networks. Following that I lead the product which became Ultra's Developer Relations unit.</h4>
      </div>
      <div class="single-role">
        <h3>Responsibilities</h3>
        <ul class="roles">
          <li>Concept</li>
          <li>Roadmap</li>
          <li>Design</li>
          <li>Leadership</li>
          <li>Agile</li>
        </ul>
      </div>
    </aside>
  </section>

  <section class="w-three-quarters">
    <h3>About Ultra</h3>
    <p>Ultra is a blockchain-based platform that allows game developers to mint and sell tokenized game licenses and digital items. The platform is based on a fork of the EOSIO blockchain and is designed to be a scalable, secure, and user-friendly platform for game developers and players.</p>
    <p>In January of 2020, after closing up shop at <nuxt-link to="/products/scatter">Scatter</nuxt-link>, my co-founder and I migrated to Ultra's blockchain team. Over the next two years, as the Technical Project Manager, I helped the team define, organize, develop, and deploy many key components while we ramped up to the Mainnet launch.</p>
    <p>As part of the work that I did there, I interacted with many other teams and spread critical knowledge about how the blockchain worked to those who were attempting to craft the company's marketing and business strategies.</p>
  </section>
  
  <section class="w-full">
    <img src="/products/ultra/ultra-documentation.png" alt="Ultra's documentation platform" class="single-product-image">
  </section>

  <section class="w-three-quarters">
    <h3>Head of Developer Relations</h3>
    <p>In early 2023, I took on the role of Head of Developer Relations. It was my pleasure to directly interact with countless talented developers who were creating tools and games for Ultra's ecosystem.</p>
    <p>This involved creating a strategy for reaching developers, and of course, teaching them how to use the countless technologies that the teams had developed over the years. As part of my work as Head of Developer relations, I lead the production of a large and complex documentation portal. This included hundreds of pages of documentation, video tutorials, and many code examples.</p>
  </section>

  <section class="w-three-quarters">
    <h3>Ultra Prime</h3>
    <p>As part of the Marketing efforts, I conceptualized and designed the Ultra Prime product, which was deployed to the client. It allowed the marketing team to present an easy to use, clear, and manageable roadmap of events. Users would now be able to check when Uniqs and new Games would be dropping right from the comfort of the place that they would be buying them.</p>
  </section>

  <section class="w-full">
    <img src="/products/ultra/ultra-prime.png" alt="Ultra Prime" class="single-product-image">
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

</script>