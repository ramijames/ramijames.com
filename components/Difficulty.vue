<template>
  <div class="difficulty-wrapper">
    <div :class="['dot lit']"></div>
    <div :class="['dot', value == 'intermediate' || 'advanced' ? 'lit' : '']"></div>
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
  padding: 4px 0;
  display: flex;
  flex-direction: row;
  gap: 3px;

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background: rgba($black, 0.3);

    &.lit {
      background: rgba($black, 1);
    }
  }
}

</style>