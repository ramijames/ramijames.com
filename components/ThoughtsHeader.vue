<template>
 
</template>

<script setup>

const props = defineProps({
  project: String,
  logo: String,
  slug: String,
  title: String
});

</script>

<style scoped lang="scss">
@import './assets/variables';

.single-thought-header {
  background: linear-gradient(180deg, transparent 67%, rgba($blue, 0.05));
  border-bottom: $border;
  padding: $spacing-xs $spacing-sm;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-sm;

  .navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-xs;
  }

  .thought-details {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $spacing-xs;

    img {
      max-height: 44px;
    }

    span {
      font-size: $font-size-md;
      text-transform: capitalize;
    }
  }
}

</style>