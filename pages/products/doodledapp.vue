<template>

  <main class="w-product-page">

    <div>

      <ProjectsHeader project="doodledapp" logo="doodledapp-logo.svg" />

      <ProjectsOverview
        title="Doodledapp"
        tagline="Easily create and deploy smart contracts"
        overview="I helped co-found and run product for Doodledapp. The goal was to allow anyone to create and deploy smart contracts with chunks of pre-made functionality."
        :services="['Design', 'UX', 'Concept']"
      />

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>A complex visual programming stack</h3>
              <p>The core challenge with Doodledapp was how to present programming concepts as something that anybody could pick up and learn. We leant hard on the visual concepts that were developer by the team that created Blueprints for Unreal Engine, and developed our own unique style and visual concepts.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/doodledapp/flow.png" alt="Early Doodledapp" class="single-product-image">
              <img src="/products/doodledapp/example-function.png" alt="Early Doodledapp" class="single-product-image">
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Smart Contract Project Management</h3>
              <p>A big part of the functionality for Doodledapp was how users would create the projects that would house their smart contracts as many deployed projects leverage multiple smart contracts at once. Then, of course, we developed the user-interface and functionality for deploying these smart contracts easily across multiple networks.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/doodledapp/firstproject.png" alt="Doodledapp Project Management" class="single-product-image">
              <img src="/products/doodledapp/oneproj-populated.png" alt="Doodledapp Project Management" class="single-product-image">
              <img src="/products/doodledapp/deploy.png" alt="Doodledapp Deployment" class="single-product-image">
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Marketing Website</h3>
              <p>As part of our attempt to break into the wider web3 market, I designed, implemented, and deployed a slick, responsive marketing website for Doodledapp.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/doodledapp/doodledapp-website.png" alt="Doodledapp Website" class="single-product-image">
              <img src="/products/doodledapp/good-stuff.png" alt="Doodledapp Website" class="single-product-image">
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

useHead({
  title: () => `Doodledapp`
})

useSeoMeta({
  title: 'Doodledapp',
  ogTitle: 'Doodledapp',
  description: 'Doodledapp was a no-code smart contract editor that allowed users to create and deploy smart contracts to public networks quickly and easily. The project was broken up into a few discrete parts. Initially, we targeted smart contract developers working in Solidity, and provided them a comfortable environment to build their contracts with a node-based editor. These developers created complex, vetted components that any other user could then import into their smart contracts to extend.',
  ogDescription: 'Doodledapp was a no-code smart contract editor that allowed users to create and deploy smart contracts to public networks quickly and easily. The project was broken up into a few discrete parts. Initially, we targeted smart contract developers working in Solidity, and provided them a comfortable environment to build their contracts with a node-based editor. These developers created complex, vetted components that any other user could then import into their smart contracts to extend.',
  ogImage: '',
  url: 'https://www.ramijames.com/products/vewrite',
  twitterTitle: 'Doodledapp',
  twitterDescription: 'Doodledapp was a no-code smart contract editor that allowed users to create and deploy smart contracts to public networks quickly and easily. The project was broken up into a few discrete parts. Initially, we targeted smart contract developers working in Solidity, and provided them a comfortable environment to build their contracts with a node-based editor. These developers created complex, vetted components that any other user could then import into their smart contracts to extend.',
  twitterImage: '',
  twitterCard: 'summary_large_image',
})

</script>