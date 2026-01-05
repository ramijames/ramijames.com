<template>

  <main class="w-product-page">
    <MergedProjects vertical="true" />

    <div>

  <ProjectsHeader project="Food For Future" logo="fff-logo.svg" />

  <ProjectsOverview
        title="Food For Future"
        tagline="Decentralized data for funding farmers"
        overview="I designed the POC which was presented to the UN."
        :services="['Design', 'UX', 'Branding']"
      />

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>Mobile access to critical data</h3>
              <p>I created the initial designs for the Food for Future mobile application which allowed potential funders to access critical data on the state of farms in deep rural areas.</p>
            </div>
            <div class="discuss-images">
              <section class="product-images three-across">
                <img src="/products/food-for-future/fff-global-short.png" alt="" class="single-product-image">
                <img src="/products/food-for-future/fff-farms-explore.png" alt="" class="single-product-image">
                <img src="/products/food-for-future/fff-farms-single.png" alt="" class="single-product-image">
              </section>
              <section class="product-images two-across">
                <img src="/products/food-for-future/fff-field-single.png" alt="" class="single-product-image">
                <img src="/products/food-for-future/fff-menu-open.png" alt="" class="single-product-image">
              </section>
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Branding</h3>
              <p>As part of the pitch process, I designed a concept brand, palette, and icon set. These were intended to present a fresh, modern take on dry data.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/food-for-future/fff-brand.png" alt="Food for Future brand" class="single-product-image">
              <img src="/products/food-for-future/fff-icons.png" alt="Food for Future icons" class="single-product-image">
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