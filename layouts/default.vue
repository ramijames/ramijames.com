<template>
  <main :class="['default-layout', isNavOpen && isLearnSubPage ? 'innerNav-open' : '']" class="default-layout">
    <section class="default-main">
      <MaxNav />
      <slot />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const threejsOpen = useState('learnthreejs-nav-open', () => true)
const solidityOpen = useState('learnsolidity-nav-open', () => true)

const isLearnSubPage = computed(() => /^\/learn-[^/]+\/.+/.test(route.path))

const isNavOpen = computed(() => {
  if (route.path.startsWith('/learn-threejs/')) return threejsOpen.value
  if (route.path.startsWith('/learn-solidity/')) return solidityOpen.value
  return false
})
</script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: row;
  min-height: 100vh;

  &.innerNav-open {
    margin-left: 400px;

    @media screen and (max-width: 1000px){
      margin: 0;
    }
  }
}

.default-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}
</style>
