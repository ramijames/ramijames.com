<template>
  <PageHeader title="Product Case Studies" tagline="Some of my favorite work over the years" />
  <section class="products-page">
    <Portfolio />
  </section>
  <Footer />
</template>

<script setup>
</script>

<style lang="scss" scoped>
.products-page {
  padding: clamp($spacing-lg, 8vh, $spacing-xl) clamp($spacing-md, 6vw, $spacing-xl);
}
</style>