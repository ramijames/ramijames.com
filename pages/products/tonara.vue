<template>

  <main class="w-product-page">

    <div>

      <ProjectsHeader project="Tonara" logo="tonara-logo.png" />

      <ProjectsOverview
        title="Tonara"
        tagline="Interactive sheet music"
        overview="I created the initial concepts, the user-experience, and the designs for Tonara's interactive sheet music applications. Then I worked hand in hand with the engineers to implement them."
        :services="['Design', 'UX', 'Branding']"
      />

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>Digital Sheet Music</h3>
              <p>The core challenge with Tonara was innovating an easy to use, pleasant, and fun new interface for digital sheet music.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/tonara/tonara-ipad.png" alt="Tonara" class="single-product-image">
              <section class="product-images three-across">
                <img src="/products/tonara/screen1.png" alt="Tonara" class="single-product-image">
                <img src="/products/tonara/screen2.png" alt="Tonara" class="single-product-image">
                <img src="/products/tonara/screen3.png" alt="Tonara" class="single-product-image">
              </section>
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Branding</h3>
              <p>I created the Tonara brand, including the logo and the palette.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/tonara/tonara-brand.png" alt="Tonara" class="single-product-image">
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Marketing Website</h3>
              <p>I helped design and implement Tonara's initial marketing website.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/tonara/website.png" alt="Tonara" class="single-product-image">
              <img src="/products/tonara/website2.png" alt="Tonara" class="single-product-image">
            </div>
          </section>

        </section>
      </section>
    </div>
  
  </main>

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

</script>