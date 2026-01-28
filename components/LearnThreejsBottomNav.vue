<template>
  <main class="bottom-nav w-consistent">
    <nuxt-link class="button" :to="prevLink" v-if="prevLink">←&nbsp;&nbsp;&nbsp;{{ prevText }}</nuxt-link>
    <nuxt-link class="button" :to="nextLink" v-if="nextLink">{{ nextText }}&nbsp;&nbsp;&nbsp;→</nuxt-link>
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

.bottom-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>