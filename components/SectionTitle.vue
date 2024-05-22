<template>
  <div class="section-title">
    <h2>{{ title }}</h2>
    <h3>{{ subtitle }}</h3>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  }
}

</script>

<style scoped lang="scss">

@import './assets/variables.scss';

.section-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: $spacing-lg;

  h2 {
    margin-top: 0;
    margin-bottom: $spacing-md;
  }

  h3 {
    font-size: $font-size-xl;
    font-family: $font-family-secondary;
    font-weight:normal;
    opacity: 0.6;
    line-height: $spacing-md * $multiplier;
    margin-top: 0;
  }
}

</style>