<template>

  <ProjectsOverview
    title="Climbing Monster"
    tagline="Effectively track your rock climbing training regimen"
    overview="I was the Head of Product for the POC. It was my job to produce high-fidelity mockups for the mobile application (iOS), for the web-based training app, for advertising purposes, and the pitch decks that we used to try and get funding."
    :services="['Design', 'UX', 'Branding']"
  />

  <main class="w-consistent">

    <div>

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>Mobile first application</h3>
              <p>The core concept was that athletes would be able to quickly run through their climbing regimen with their phone at their side. They would get customized training plans directly from their coaches, automatically downloaded daily.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/climbingmonster/mobile-flow.png" alt="Climbing Monster mobile app for iOS" class="single-product-image">
              <section class="product-images three-across">
                <img src="/products/climbingmonster/cm-createsession-welcome.png" alt="" class="single-product-image">
                <img src="/products/climbingmonster/cm-createsession-calendar.png" alt="" class="single-product-image">
                <img src="/products/climbingmonster/cm-createsession-current.png" alt="" class="single-product-image">
              </section>
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Web interface for trainers</h3>
              <p>For the staff that worked at climbing gyms, we developed a web interface that allowed them to quickly and easiy manage athletes, create training plans, and view analytics about their athlete's progress.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/climbingmonster/77c0cd32013425.5605afad2ae28.png" alt="Climbing Monster web interface" class="single-product-image">
              <img src="/products/climbingmonster/09078932013445.5605af7a1f287.png" alt="Climbing Monster web interface" class="single-product-image">
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Brand</h3>
              <p>Climbing Monster's unique name demanded a unique brand and a bold set of colors.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/climbingmonster/cm-brand.png" alt="Climbing Monster Brand" class="single-product-image">
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