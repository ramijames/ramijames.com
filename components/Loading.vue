<template>
  <main id="Loading">
    <div :class="['spinner', type]"></div>
  </main>
</template>

<script setup>

const props = defineProps(['type'])

</script>

<style lang="scss" scoped>
#Loading {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding: $spacing-xl 0;
  width: 100%;
  z-index: 10;
 
  .spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid rgba($black, .1);
    border-top-color: $black;
    animation: spin .5s linear infinite;
    display: block;
    padding: 0;

    &.tiny {
      width: 16px;
      height: 16px;
      border: 1px solid rgba($black, .1);
      border-top-color: $black;
    }

    &.small {
      width: 20px;
      height: 20px;
      border: 2px solid rgba($black, .1);
      border-top-color: $black;
    }

    &.header {
      width: 20px;
      height: 20px;
      border: 4px solid rgba($white, .1);
      border-top-color: $white;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}

</style>