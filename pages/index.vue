<template>
  <main class="home-root">
    <SimpleHomepage />
  </main>
</template>

<script setup>
</script>

<style lang="scss">
.home-root {
  position: relative;
  min-height: 100dvh;
  background: var(--bg);
  color: var(--fg);
  overflow-x: clip;
}

html,
body {
  background: var(--bg);
  overflow-x: hidden;
  max-width: 100%;
}
</style>
