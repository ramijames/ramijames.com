<template>
  <main class="bottom-nav w-consistent">
    <nuxt-link class="button small" :to="prevLink" v-if="prevLink">←&nbsp;&nbsp;&nbsp;{{ prevText }}</nuxt-link>
    <nuxt-link class="button small" :to="nextLink" v-if="nextLink">{{ nextText }}&nbsp;&nbsp;&nbsp;→</nuxt-link>
  </main>
</template>

<script setup>

const props = defineProps({
  prevLink: String,
  prevText: String,
  nextLink: String,
  nextText: String,
});

</script>

<style lang="scss" scoped>

.dark {
  .bottom-nav {
    border-top: 1px solid rgba($black, 0.2);
  }
}

.bottom-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-top: 1px solid rgba($black, 0.2);
  margin-top: $spacing-md;

  @media screen and (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    gap: $spacing-xs;

    .button {
      width: 100%;
    }
  }
}

</style>