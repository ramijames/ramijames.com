<template>

  <main class="w-product-page">
    <MergedProjects vertical="true" />

    <div>

      <ProjectsHeader project="doodledapp" logo="scatter-logo.png" />

      <ProjectsOverview
        title="Scatter"
        tagline="A better wallet experience"
        overview="I helped co-found and run the primary wallet in the EOS ecosystem for three years. Our goal with Scatter was to create a retail and developer ecosystem that allowed for easy access to web3 assets anywhere that they user happened to be. We aimed for deep integration into games, websites, and day to day use applications."
        :services="['Art Direction', 'Design', 'UX', 'Iconography']"
      />

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>Scatter Desktop</h3>
              <p>Our primary product, with a peak active user base of 250k. We iterated over many versions that culminated in our "Scatter Simple" brand.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/scatter/scatter-simple.png" alt="Scatter In Progress" class="single-product-image">
              <img src="/products/scatter/inside_desktop.png" alt="Scatter In Progress" class="single-product-image">
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Complex UX simplified</h3>
              <p>A big part of my job was trying to simplify the difficult technical concepts into something that was easy for every day, non-technical users to understand.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/scatter/scatter-in-progress.png" alt="Scatter In Progress" class="single-product-image">
              <img src="/products/scatter/better-on-boarding.png" alt="Scatter improves its on-boarding" class="single-product-image">
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Scatter Mobile</h3>
              <p>I was tasked with bringing our popular Desktop experience to mobile. There were many UX and design compromises that needed to happen to bring this to fruition.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/scatter/scatter-mobile.png" alt="Scatter In Progress" class="single-product-image">
            </div>
          </section>


        </section>
      </section>
      </div>
    
    </main>

  <MergedProjectsHeader />
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

useHead({
  title: () => `Scatter`
})

useSeoMeta({
  title: 'Scatter',
  ogTitle: 'Scatter',
  description: 'Scatter was a digital identity and wallet that allowed users to interact with the EOS blockchain. At first, it was simply a browser extension that allowed users to sign transactions and interact with apps in a secure way. Quickly the vision of the product evolved from a signing extension into a digital hub for EOS users to manage their signing keys, their digital identity, and the apps that they would find most useful.',
  ogDescription: 'Scatter was a digital identity and wallet that allowed users to interact with the EOS blockchain. At first, it was simply a browser extension that allowed users to sign transactions and interact with apps in a secure way. Quickly the vision of the product evolved from a signing extension into a digital hub for EOS users to manage their signing keys, their digital identity, and the apps that they would find most useful.',
  ogImage: '',
  url: 'https://www.ramijames.com/products/scatter',
  twitterTitle: 'Scatter',
  twitterDescription: 'Scatter was a digital identity and wallet that allowed users to interact with the EOS blockchain. At first, it was simply a browser extension that allowed users to sign transactions and interact with apps in a secure way. Quickly the vision of the product evolved from a signing extension into a digital hub for EOS users to manage their signing keys, their digital identity, and the apps that they would find most useful.', 
  twitterImage: '',
  twitterCard: 'summary_large_image',
})

</script>