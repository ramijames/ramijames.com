<template>
  
  <section class="learnthreejs-layout">
    <LearnThreejsNav :innerNav="true" />
    <main>

      <PageHeader title="Instanced Meshes in Three.js" tagline="" />

      <main class="w-content page-top">
        <section class="content">
          
    </section>
      </main>
    </main>
  </section>
  
    <LearnThreejsBottomNav
    prevLink="/learn-threejs/building-blocks/custom-geometries"
    prevText="Custom Geometries"
    nextLink="/learn-threejs/building-blocks/procedural-terrain"
    nextText="Procedural Terrain"
  />
  <Footer />
</template>

<script setup>

// Use the learnthreejs layout for this page
definePageMeta({
  layout: 'learnthreejs'
})

useHead({
  title: 'Learn Three.js'
})

useSeoMeta({
  title: 'Instanced Meshes in Three.js',
  ogTitle: 'Instanced Meshes in Three.js',
  description: '',
  ogDescription: '',
  ogImage: '/learn-threejs/cover.png',
  url: 'https://www.ramijames.com/thoughts/reactive-grids-in-nuxt',
  twitterTitle: 'Instanced Meshes in Three.js',
  twitterDescription: '',
  twitterImage: '/learn-threejs/cover.png',
  twitterCard: 'summary_large_image'
})

</script>

<style scoped lang="scss">

</style>