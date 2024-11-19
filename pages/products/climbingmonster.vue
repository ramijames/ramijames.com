<template>

  <section class="product-splash">
      <section class="product-intro">
        <div class="product-intro-brand climbingmonster">
          <img src="/products/climbingmonster/climbingmonster-logo.png" alt="Climbing Monster Logo" class="product-logo">
          <h2 class="product-title">Climbing Monster</h2>
        </div>
      </section>
      <section class="product-teasers">
        <section class="product-teaser climbingmonster-website-show"></section>
        <section class="product-teaser climbingmonster-new"></section>
      </section>
    </section>

  <section class="w-three-quarters">
    <h2>Product Vision</h2>
    <p>The product vision of Climbing Monster was to allow climbing trainers and athelets to build structured workouts that could be tracked, analyzed, and improved. The business model was focused on providing benefit for gyms that would increase loyalty through athletic improvement.</p>
    <h3>My Role as Head of Product</h3>
    <p>I was the Head of Product for the POC. It was my job to produce high-fidelity mockups for the mobile application (iOS), for the web-based training app, for advertising purposes, and the pitch decks that we used to try and get funding.</p>
  </section>

  <section class="w-three-quarters">
    <h2>Product Features</h2>
    <h3>iOS App</h3>
    <p>The primary use-case for Climbing Monster was as a way for athletes to build workout routines that could be tracked over time, allowing trainers to have a good idea of the exact level that the athlete is achieving. This information could then be used to optimize workouts to enhance performance over time.</p>
    <img src="/products/climbingmonster/mobile-flow.png" alt="Climbing Monster mobile app for iOS" class="single-product-image">
  </section>

  <section class="w-full">
    <section class="product-images three-across">
      <img src="/products/climbingmonster/cm-createsession-welcome.png" alt="" class="single-product-image">
      <img src="/products/climbingmonster/cm-createsession-calendar.png" alt="" class="single-product-image">
      <img src="/products/climbingmonster/cm-createsession-current.png" alt="" class="single-product-image">
    </section>
  </section>

  <section class="w-three-quarters">
    <h3>Trainer Interface</h3>
    <p>Trainers had a separate interface that allowed them to create and manage workout routines for their athletes. This included a calendar view, a list of current sessions, and a way to create new sessions.</p>
    <img src="/products/climbingmonster/77c0cd32013425.5605afad2ae28.png" alt="Climbing Monster web interface" class="single-product-image">
    <img src="/products/climbingmonster/09078932013445.5605af7a1f287.png" alt="Climbing Monster web interface" class="single-product-image">
  </section>

  <section class="w-three-quarters">
    <h2>Branding</h2>
    <p>As part of the product development, I was responsible for the branding of the Climbing Monster product. This included the logo, color scheme, and typography. The brand was bold, clean, and unique.</p>
    <img src="/products/climbingmonster/cm-brand.png" alt="Climbing Monster Brand" class="single-product-image">
  </section>

  <section class="w-three-quarters">
    <h3>Addendum</h3>
    <p>The Climbing Monster project was spun down in late 2012 due to lack of funding.</p>
  </section>

  <hr>

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