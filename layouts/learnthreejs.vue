<template>
  <MaxNav />
  <main :class="['learnthreejs-layout', isOpen ? 'innerNav-open' : '']">
    <section class="learnthreejs-main">
      <NuxtPage />
    </section>
  </main>
</template>

<script lang="ts" setup>
const isOpen = useState('learnthreejs-nav-open', () => true)
</script>

<style lang="scss" scoped>

.learnthreejs-main {
  width: 100%;
}

</style>