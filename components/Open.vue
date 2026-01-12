<template>
  <section class="open-sesame" ref="openSection" :class="{ 'is-visible': isVisible }">
    <div class="logo" v-if="showLogo"></div>
    <div class="left"></div>
    <div class="right"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  showLogo: Boolean
});

const openSection = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true
          // Optional: disconnect observer after first trigger
          // observer.disconnect()
        }
      })
    },
    {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: '0px' // Adjust this to trigger earlier/later
    }
  )

  if (openSection.value) {
    observer.observe(openSection.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

</script>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';

.open-sesame {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;

  .left {
    transform-origin: center left;
    width: 50%;
    height: 100%;
    background: #ccc;
    position: absolute;
    left: 0;
    // Animation removed from default state
    animation: none;
  }

  .right {
    transform-origin: center left;
    width: 50%;
    height: 100%;
    background: #ccc;
    position: absolute;
    right: 0;
    // Animation removed from default state
    animation: none;
  }

  // Only apply animation when visible
  &.is-visible {
    .left,
    .right {
      animation: openSesame 1.2s ease-out forwards;
    }
  }
}

</style>