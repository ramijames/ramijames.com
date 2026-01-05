<template>

  <main class="w-product-page">
    <MergedProjects vertical="true" />

    <div>

      <ProjectsHeader project="Telos OBE" logo="/products/telos/telos-logo.png" />

      <ProjectsOverview
        title="Telos OBE"
        tagline="Open source block explorer"
        overview="I created the UX and designed the Telos Open Block explorer as part of my wider participation in the Telos ecosystem."
        :services="['Design', 'UX']"
      />

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>Easy to use, feature-filled</h3>
              <p>The core challenge with the Telos open block explorer design was that it was chock full of features. My previous experience with Scatter made me uniquely qualified to understand the hierarchy and feature sets that were required to make this design really shine.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/telos/telos-obe-home.png" alt="Telos OBE Home" class="single-product-image">
              <img src="/products/telos/telos-obe-various.png" alt="Telos OBE Various Screens" class="single-product-image">
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Mobile reaady</h3>
              <p>An interested side-effect of designing the block explorer meant that we were able to implement many features for the first time for mobile users.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/telos/telos-mobile.png" alt="Telos OBE Home" class="single-product-image">
            </div>
          </section>


        </section>
      </section>
    </div>
  
  </main>

  <MergedProjectsHeader mobile="true" />
  <MergedProjects mobile="true" />

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