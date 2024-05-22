<template>
  <main class="product-main">
    <section class="product-content">
      <img src="/products/food-for-future/fff-logo.svg" alt="Food for Future Logo" class="product-logo">
      <h1 class="centered">Food For Future</h1>
      <h4 class="centered">Decentralized data for funding farmers</h4>
      
      <div class="main-product-image fff" ref="image">
        <img src="/products/food-for-future/fff-display-two.png" alt="Food for Future">
      </div>
      
    </section>
    <section class="product-content">
      <h2>The Food for Future Story</h2>
      <aside class="story-time">
        <p>Food for Future's vision is to provide funding for farmers by creating a transparent, accessible layer of data for those interested in investing.</p>

        <img src="/products/food-for-future/fff-display-one.png" alt="Food for Future mobile" class="single-product-image">

        <p>I was contracted to put together a set of mock-ups for the Food for Future project within a very short time-frame. These were in turn used to pitch the concept to interested parties within the UN.</p>

        <img src="/products/food-for-future/website-notify.png" alt="Food for Future signup" class="single-product-image">

        <p>A large set of custom icons was generated to create a unique look and feel. These were leveraged throughout the application to give it the personality we were looking for, which would make it stand out and be memorable.</p> 

        <img src="/products/food-for-future/fff-icons.png" alt="Food for Future icons" class="single-product-image">
        
      </aside>
    </section>

    <section class="product-content">
      <h2>Interface Design</h2>
      <p class="centered">A mobile-first approach to following the progress of remote investments.</p>
    </section>
    <section class="product-images five-across">
      <img src="/products/food-for-future/fff-global-short.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-farms-explore.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-farms-single.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-field-single.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-menu-open.png" alt="" class="single-product-image">
    </section>

  </main>
</template>

<script setup>

import { onMounted, onUnmounted, ref } from 'vue';

let image = ref(null);

onMounted(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const rotationAngle = Math.max(0, 20 - scrollPosition / 20);
    image.value.style.transform = `rotate3d(1, 0, 0, ${rotationAngle}deg)`;
  };

  window.addEventListener('scroll', handleScroll);
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

</script>