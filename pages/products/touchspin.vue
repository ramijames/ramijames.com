<template>

  <ProjectsOverview
    title="Touchspin"
    tagline="iGaming on your iPad"
    overview="I generated custom illustrations and game designs for the Touchspin group as they were seeking funding."
    :services="['Design', 'UX', 'Concept']"
  />

  <main class="w-consistent">

    <div>

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>Custom gaming designs</h3>
              <p>The core challenge with Touchspin was creating a clean layout that was mobile friendly.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/touchspin/image1.png" alt="TouchSpin" class="single-product-image">
              <img src="/products/touchspin/image2.png" alt="TouchSpin" class="single-product-image">
              <img src="/products/touchspin/image3.png" alt="TouchSpin" class="single-product-image">
              <img src="/products/touchspin/image4.png" alt="TouchSpin" class="single-product-image">
              <img src="/products/touchspin/image5.png" alt="TouchSpin" class="single-product-image">
              <img src="/products/touchspin/image6.jpg" alt="TouchSpin" class="single-product-image">
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