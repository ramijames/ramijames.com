<template>
  <div class="difficulty-wrapper">
    <div :class="['dot lit']"></div>
    <div :class="['dot', value == 'intermediate' ? 'lit' : '']"></div>
    <div :class="['dot', value == 'advanced' ? 'lit' : '']"></div>
  </div>
</template>

<script setup>

const props = defineProps({
  value: String
});

</script>

<style lang="scss" scoped>

.dark {
  .difficulty-wrapper {

    .dot {
      background: rgba($white, 0.2);

      &.lit {
        background: rgba($white, 1);
      }
    }
  }
}

.difficulty-wrapper {
  padding: $spacing-xs 0;
  display: flex;
  flex-direction: row;
  gap: 3px;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: rgba($black, 0.2);

    &.lit {
      background: rgba($black, 1);
    }
  }
}

</style>