<template>
  <main class="product-main">
    <section class="product-content">
      <img src="/products/telos/telos-logo.png" alt="Telos Logo" class="product-logo">
      <h1 class="hyper-bold">Telos Open Block Explorer</h1>
      <h4 class="centered">The best way to view transactions and manage your wallets</h4>
      
      
      <div class="main-product-image telos" ref="image">
        <img src="/products/telos/telos-mobile.png" alt="Telos OBE Mobile">
      </div>      
    </section>

    <section class="product-content general-main page-top">
      <aside class="product-role">
        <div class="single-role">
          <h4>Role</h4>
          <p>I was contracted by the Telos Network Foundation in 2022 to product a high-quality set of mockups for their nascent block explorer. We iterated over a series of months and launched to the public during the summer. You can <a href="https://explorer.telos.net">view the live explorer here</a>.</p>
        </div>
        <div class="single-role">
          <h4>Responsibilities</h4>
          <ul class="roles">
            <li>Concept</li>
            <li>Roadmap</li>
            <li>Design</li>
            <li>UI/UX</li>
            <li>Prototyping</li>
            <li>Mockups</li>
          </ul>
        </div>
      </aside>
    </section>
    
    <img src="/products/telos/telos-obe-home.png" alt="Telos OBE Home" class="single-product-image">

    <section class="product-content">
      <aside class="story-time">
        <p><a href="https://www.telos.net/">Telos</a> is a blockchain network that is built on the EOSIO software stack. It is a decentralized, open-source blockchain that is designed to provide a platform for developers to build decentralized applications (dApps) and smart contracts. </p>
        
        <p>The open-source Telos Open Block Explorer allows users to explore the Telos blockchain, view transactions, blocks, and accounts, and search for specific transactions or accounts. Telos OBE is designed to be user-friendly and easy to use, with a clean and intuitive interface that makes it easy to navigate and find the information you need. It supports viewing both native and EVM transactions.</p>

      </aside>
    </section>

    <img src="/products/telos/telos-obe-various.png" alt="Telos OBE Various Screens" class="single-product-image">

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