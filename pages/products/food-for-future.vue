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

    <section class="product-content general-main page-top">
      <aside class="product-role">
        <div class="single-role">
          <h4>Role</h4>
          <p>I brought on to very quickly build a visual brand, product concept, and set of icons which could be then used in the mockups and prototype which I developed.</p>
        </div>
        <div class="single-role">
          <h4>Responsibilities</h4>
          <ul class="roles">
            <li>Branding</li>
            <li>Iconography</li>
            <li>Design</li>
            <li>Mockups</li>
            <li>Prototyping</li>
          </ul>
        </div>
      </aside>
    </section>

    <section class="product-content general-main page-top">
      <aside class="story-time">
        <h3>About Food for Future</h3>
        <p>Food for Future's vision was to provide funding for farmers by creating a transparent, accessible layer of data for those interested in investing.</p>
        <p>I was contracted to put together a brand and a set of mock-ups for the Food for Future project within a very short time-frame. These were in turn used to pitch the concept to interested parties within the UN.</p>
      </aside>
    </section>
    
    <section class="product-content general-main page-top">
      <aside class="story-time">
        <h3>Brand</h3>
        <p>The Food for Future brand evokes a clean, fresh style based around simple typography and a stylized icon of wheat, which is commonly grown around the world as a staple crop.</p> 
        <br>
        <img src="/products/food-for-future/fff-brand.png" alt="Food for Future brand" class="single-product-image">
      </aside>
    </section>    


    <section class="product-content general-main page-top">
      <aside class="story-time">
        <h3>Iconography</h3>
        <p>A large set of custom icons was also generated to create a unique look and feel for the project. These were leveraged throughout the application to give it the friendly, approachable personality we were looking for. It helped make the application stand out and be memorable in the minds of potential investors.</p> 
      </aside>
    </section>    

    <img src="/products/food-for-future/fff-icons.png" alt="Food for Future icons" class="single-product-image">

    <section class="product-content general-main page-top">
      <aside class="story-time">
        <h3>Mobile first design</h3>
        <p>A mobile-first approach was taken in the design process. No desktop version was created, as the understanding was that the intended audience was on-the-go investors who were closely aligned with the UN and its agro-industry projects.</p>
      </aside>
    </section>

    <section class="product-images five-across">
      <img src="/products/food-for-future/fff-global-short.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-farms-explore.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-farms-single.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-field-single.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-menu-open.png" alt="" class="single-product-image">
    </section>
      

  </main>
  <Footer />
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