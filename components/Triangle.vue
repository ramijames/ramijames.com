<template>
  <img ref="triangle" src="/shapes/hero-triangle.png" class="triangle" alt="">
</template>

<script>

import { onMounted, onUnmounted, ref } from 'vue';

export default {
  setup() {
    const triangle = ref(null);

    const handleScroll = () => {
      if (triangle.value ) {
        const scrollY = window.scrollY;
        triangle.value.style.transform = `translateY(${scrollY * -2}px)`
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      triangle,
    };
  },
};

</script>

<style scoped lang="scss">

@import './assets/variables';

.triangle {
  position: absolute;
  top: 600px;
  left: -360px;
  width: 460px;
  height: auto;
  z-index: 10;
  filter: drop-shadow(10px 40px 0px rgba($black, 0.1));

  @media screen and (max-width: 768px){
    display: none;
  }
}

</style>