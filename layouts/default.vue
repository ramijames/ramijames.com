<template>
  <main :class="['default-layout', isOpen && isLearnThreeJSSubPage ? 'innerNav-open' : '']" class="default-layout">
    <section class="default-main">
      <MaxNav />
      <slot />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const isOpen = useState('learnthreejs-nav-open', () => true)

const isLearnThreeJSSubPage = computed(() => route.path.startsWith('/learn-threejs/') && route.path !== '/learn-threejs/');
</script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  transition: all 0.4s;
  transition-timing-function: cubic-bezier(0.355, 0.965, 0.670, 0.970);

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