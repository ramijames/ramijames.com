<template>

  <main class="w-product-page">

    <div>

      <ProjectsHeader project="Qmarkets" logo="qmarkets-logo.svg" />

      <ProjectsOverview
        title="Qmarkets"
        tagline="Stop Wasting Time on Innovation Without Impact"
        overview="I was the in-house designer and user-experience expert at Qmarkets."
        :services="['Design', 'UX', 'Drupal']"
      />

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>Deep user-experience research</h3>
              <p>The core challenge at Qmarkets was taking their clunky interface, which had been primarily developed by in-house developers with no ui or ux experience, and turning it in to a sleek, easy to use product that could be deployed at scale to companies like Lufthansa, Ford, Nike, and more..</p>
            </div>
            <div class="discuss-images">
              <section class="product-images two-across">
                <img src="/products/qmarkets/qm-wireframe1.png" alt="qmarkets" class="single-product-image">
                <img src="/products/qmarkets/qm-wireframe2.png" alt="qmarkets" class="single-product-image">
              </section>
              <section class="product-images two-across">
                <img src="/products/qmarkets/qm-wireframe3.png" alt="qmarkets" class="single-product-image">
                <img src="/products/qmarkets/qm-wireframe4.png" alt="qmarkets" class="single-product-image">
              </section>
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Establishing a consistent design system</h3>
              <p>Before we could get down to the nitty gritty details of implementation, we had to establish a consistent design baseline. We created and used a design system for all of Qmarket's products, including typograph, user interface inputs, buttons, and dropdowns. I also created a set of unique icons which were used across the system.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/qmarkets/design-system.webp" alt="qmarkets" class="single-product-image">
              <img src="/products/qmarkets/custom-icons.webp" alt="qmarkets" class="single-product-image">
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Making it shine</h3>
              <p>Once the core user-experience was iterated on and polished, we deployed to dozens of enterprise clients, each boasting their own white-label skin.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/qmarkets/qm-nike.jpg" alt="qmarkets for nike" class="single-product-image">
              <img src="/products/qmarkets/qm-ford.jpg" alt="qmarkets for ford" class="single-product-image">
              <img src="/products/qmarkets/qm-kaufland.jpg" alt="qmarkets for kaufland" class="single-product-image">
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