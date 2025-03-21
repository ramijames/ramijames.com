<template>

  <section class="product-splash">
    <section class="product-intro">
      <div class="product-intro-brand fff">
        <img src="/products/food-for-future/fff-logo.svg" alt="Food for Future Logo" class="product-logo">
        <h2 class="product-title">Food For Future</h2>
      </div>
    </section>
    <section class="product-teasers">
      <section class="product-teaser fff-show"></section>
      <section class="product-teaser fff-new"></section>
    </section>
  </section>

  <section class="w-three-quarters">
    <h2 class="role"><span>Role</span>Principle Designer</h2>
    <p>As the core creative talent, I created the visual brand, product concept, mockups, and clickable prototype.</p>
  </section>

  <section class="w-three-quarters">
    <h2>About Food for Future</h2>
    <p>Food for Future's vision was to provide funding for farmers by creating a transparent, accessible layer of data for those interested in investing.</p>
    <p>I was contracted to put together a brand and a set of mock-ups for the Food for Future project within a very short time-frame. These were in turn used to pitch the concept to interested parties within the UN.</p>
  </section>

  <section class="w-three-quarters">
    <h3>Mobile first design</h3>
    <p>A mobile-first approach was taken in the design process. No desktop version was created, as the understanding was that the intended audience was on-the-go investors who were closely aligned with the UN and its agro-industry projects.</p>
  </section>

  <section class="w-full">
    <section class="product-images five-across">
      <img src="/products/food-for-future/fff-global-short.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-farms-explore.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-farms-single.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-field-single.png" alt="" class="single-product-image">
      <img src="/products/food-for-future/fff-menu-open.png" alt="" class="single-product-image">
    </section>
  </section>
  
  <section class="w-three-quarters">
    <h3>Brand</h3>
    <p>The Food for Future brand evokes a clean, fresh style based around simple typography and a stylized icon of wheat, which is commonly grown around the world as a staple crop.</p> 
  </section>    

  <section class="w-three-quarters">
    <img src="/products/food-for-future/fff-brand.png" alt="Food for Future brand" class="single-product-image">
  </section>

  <section class="w-three-quarters">
    <h3>Iconography</h3>
    <p>A large set of custom icons was also generated to create a unique look and feel for the project. These were leveraged throughout the application to give it the friendly, approachable personality we were looking for. It helped make the application stand out and be memorable in the minds of potential investors.</p> 
  </section>    

  <section class="w-full">
    <img src="/products/food-for-future/fff-icons.png" alt="Food for Future icons" class="single-product-image">
  </section>

  <hr />
  <MergedProjects />
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