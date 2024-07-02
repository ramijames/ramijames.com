<template>
  <main class="product-main">
    <section class="product-content">
      <img src="/products/telos/telos-logo.png" alt="Telos Logo" class="product-logo">
      <h1 class="hyper-bold">Telos OBE</h1>
      <h4 class="centered">An Open Block Explorer for the Telos ecosystem</h4>
      
      
      <div class="main-product-image scatter" ref="image">
        <img src="/products/telos/telos-mobile.png" alt="Telos OBE Mobile">
      </div>
      
    </section>
    <section class="product-content">
      <aside class="story-time">
        
      </aside>
    </section>
    
    <img src="/products/telos/telos-obe-home.png" alt="Telos OBE Home" class="single-product-image">

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