<template>

  <main class="w-product-page">
    <MergedProjects vertical="true" />

    <div>

      <ProjectsHeader project="doodledapp" logo="ultra-logo.svg" />

      <ProjectsOverview
        title="Ultra"
        tagline="Bringing web3 gaming to the masses"
        overview="I wore many hats at my time at Ultra, from Technical PM, Marketing Advisor, to Head of Developer Relations. Each of these roles had intrinsic design considerations that I used my extensive experience to help create the best products possible for."
        :services="['Design', 'UX', 'Project Management']"
      />

      <section class="w-full">
        <section class="content">

          <section class="discuss">
            <div class="with-line">
              <h3>Developer Relations as a Product</h3>
              <p>During my two year stint at Ultra.io as the Head of Developer Relations, I helped create a few distinct products that the developer community we worked with relied directly on. The primary example of my work there was the <a href="https://developers.ultra.io">developers.ultra.io</a> project, which I both designed and helped implement. I personally designed and project managed Ultra Prime during my time working with the Marketing team.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/ultra/build-on-ultra.png" alt="Ultra's documentation platform" class="single-product-image">
              <img src="/products/ultra/ultra-documentation-1.png" alt="Ultra's documentation platform" class="single-product-image">
              <img src="/products/ultra/ultra-documentation-2.png" alt="Ultra's documentation platform" class="single-product-image">
            </div>
          </section>

          <section class="discuss">
            <div class="with-line">
              <h3>Making Marketing Calendars Public</h3>
              <p>My core contribution to the Marketing effort from a product perspective was Ultra Prime. The concept was to allow the Marketing team to produce a public schedule which the community could engage with. By making everything transparent, we allowed Ultra to build a repoire with those who were more interested in what we were creating.</p>
            </div>
            <div class="discuss-images">
              <img src="/products/ultra/ultra-prime-1.png" alt="Ultra Prime" class="single-product-image">
              <img src="/products/ultra/ultra-prime-2.png" alt="Ultra Prime" class="single-product-image">
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

useHead({
  title: () => `Ultra`
})

useSeoMeta({
  title: 'Ultra',
  ogTitle: 'Ultra',
  description: 'Ultra is a blockchain-based platform that allows game developers to mint and sell tokenized game licenses and digital items. The platform is based on a fork of the EOSIO blockchain and is designed to be a scalable, secure, and user-friendly platform for game developers and players.',
  ogDescription: 'Ultra is a blockchain-based platform that allows game developers to mint and sell tokenized game licenses and digital items. The platform is based on a fork of the EOSIO blockchain and is designed to be a scalable, secure, and user-friendly platform for game developers and players.',
  ogImage: '',
  url: 'https://www.ramijames.com/products/ultra',
  twitterTitle: 'Ultra',
  twitterDescription: 'Ultra is a blockchain-based platform that allows game developers to mint and sell tokenized game licenses and digital items. The platform is based on a fork of the EOSIO blockchain and is designed to be a scalable, secure, and user-friendly platform for game developers and players.',
  twitterImage: '',
  twitterCard: 'summary_large_image',
})

</script>