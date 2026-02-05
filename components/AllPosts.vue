<template>
  <main class="posts">

  </main>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.posts {
  display: flex;
  flex-direction: column;
  transition: all 1s ease-in-out;
  position: sticky;
  top: calc($spacing-xl + 2rem);
  z-index: 210;
}

</style>