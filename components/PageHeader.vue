<template>
  <main class="page-header">
    <h1>{{ title }}</h1>
    <h3 v-if="tagline">{{ tagline }}</h3>
  </main>
</template>

<script setup>

const props = defineProps({
  title: String,
  tagline: String
});

</script>

<style lang="scss" scoped>

.dark { 
  .page-header {
    h3 {
      border-bottom: 1px solid rgba($white, 0.5);
    }
 }
}

.page-header {
  width: 100%;
  position: relative;
  margin-top: 84px;
  padding: $spacing-xl 0 $spacing-lg;
  background-size: cover;

  h1 {
    margin: 0 0 $spacing-xs;
    line-height: 100%;
    text-align: center;
    text-wrap: balance;
  }

  h3 {
    text-wrap: balance;
    margin: 0 auto;
    text-align: center;
    text-transform: initial;
    opacity: 0.5;
    font-weight: 500;
    font-family: $font-family-serif;
    padding: $spacing-lg $spacing-md calc($spacing-lg + $spacing-sm);
    line-height: 140%;
    max-width: 800px;
    font-size: $font-size-xl;
    font-style: italic;

    @media screen and (max-width: 1180px) {
      max-width: 100%;
    }
  }

  .button-set {
    display: flex;
    flex-direction: row;
    gap: $spacing-sm;
  }
}

</style>