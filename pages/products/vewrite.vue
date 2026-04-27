<template>
  <section class="w-project">

    <ProjectsOverview
      title="Vewrite"
      tagline="A better way for writers to work together"
      overview="test"
      goal="test"
      outcome="test"
      services="test"
    />

    <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/vewrite/ve-homepage.png" alt="Vewrite homepage" class="single-product-image" />
    <hr>
    <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/vewrite/ve-projects.png" alt="Vewrite projects view" class="single-product-image" />
    <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/vewrite/ve-workflowcreation.png" alt="Vewrite workflow creation" class="single-product-image" />
    <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/vewrite/ve-deliverable.png" alt="Vewrite deliverable view" class="single-product-image" />
    <hr>
    <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/vewrite/ve-brand.png" alt="Vewrite Brand" class="single-product-image" />
    <NuxtImg sizes="sm:100vw md:80vw lg:1000px" loading="lazy" src="/products/vewrite/ve-palette.png" alt="Vewrite Brand" class="single-product-image" />
  </section>
  <section class="more-products w-consistent">
    <h3>More products</h3>
    <Portfolio random="3" />
  </section>
  <Footer />
</template>

<script setup>
useHead({
  title: () => `Vewrite`
})

useSeoMeta({
  title: 'Vewrite',
  ogTitle: 'Vewrite',
  description: 'Better writing through structured workflows',
  ogDescription: 'Better writing through structured workflows',
  url: 'https://www.ramijames.com/products/vewrite/',
  twitterTitle: 'Vewrite',
  twitterDescription: 'Better writing through structured workflows',
  twitterImage: '/products/vewrite/ve-projects.png',
  twitterCard: 'summary_large_image',
})

</script>