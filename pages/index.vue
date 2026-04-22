<template>
  <main>
    <SimpleHomepage />
  </main>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: { class: 'homepage-scroll-lock' },
})
</script>

<style lang="scss">
body.homepage-scroll-lock {
  overflow: hidden;
}
</style>