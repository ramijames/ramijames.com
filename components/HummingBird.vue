<template>
  <img ref="hummingbird" src="/hummingbird.png" class="hummingbird" alt="Your project is beautiful">
</template>

<script>

import { onMounted, onUnmounted, ref } from 'vue';

export default {
  setup() {
    const hummingbird = ref(null);

    const handleScroll = () => {
      if (hummingbird.value ) {
        const scrollY = window.scrollY;
        hummingbird.value.style.transform = `rotateY(180deg) translateY(${scrollY * -1.5}px)`
        
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      hummingbird,
    };
  },
};

</script>

<style scoped lang="scss">

@import './assets/variables';

.hummingbird {
  position: absolute;
  top: -180px;
  right: -300px;
  width: 600px;
  height: 600px;
  z-index: 10;
  transform: rotateY(180deg);
  filter: drop-shadow(10px 40px 0px rgba($black, 0.1));
}

</style>