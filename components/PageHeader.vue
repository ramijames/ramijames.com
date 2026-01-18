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

@import './assets/variables';
@import './assets/animation';

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
  }

  h3 {
    text-wrap: balance;
    margin: 0;
    text-align: center;
    text-transform: initial;
    opacity: 0.4;
    font-weight: 500;
    padding: 0 $spacing-md;
    line-height: 110%;

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