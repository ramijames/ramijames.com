<template>
  <div id="Follow">
    <div class="mouse-follower" ref="mouseFollower"></div>
    <div class="trail-1" ref="mouseTrailOne"></div>
    <div class="trail-2" ref="mouseTrailTwo"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const mouseFollower = ref(null);
const mouseTrailOne = ref(null);
const mouseTrailTwo = ref(null);

let mouseX = 0;
let mouseY = 0;
let trailOneX = 0;
let trailOneY = 0;
let trailTwoX = 0;
let trailTwoY = 0;

const interpolationFactor = 0.2; // Increase this value for closer trailing

function updateMousePosition(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function animate() {
  if (mouseFollower.value && mouseTrailOne.value && mouseTrailTwo.value) {
    trailOneX += (mouseX - trailOneX) * interpolationFactor;
    trailOneY += (mouseY - trailOneY) * interpolationFactor;
    trailTwoX += (trailOneX - trailTwoX) * interpolationFactor;
    trailTwoY += (trailOneY - trailTwoY) * interpolationFactor;

    mouseFollower.value.style.left = `${mouseX}px`;
    mouseFollower.value.style.top = `${mouseY}px`;
    mouseTrailOne.value.style.left = `${trailOneX}px`;
    mouseTrailOne.value.style.top = `${trailOneY}px`;
    mouseTrailTwo.value.style.left = `${trailTwoX}px`;
    mouseTrailTwo.value.style.top = `${trailTwoY}px`;
  }

  requestAnimationFrame(animate);
}

onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition);
  requestAnimationFrame(animate);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition);
});
</script>

<style lang="scss" scoped>
@import './assets/variables';

#Follow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 9999;

  @media screen and (max-width: 768px){
    display: none;
  }

  .mouse-follower {
    position: absolute;
    width: 60px;
    height: 60px;
    border: 1px solid rgba($blue, 0.25);
    background-color: transparent;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease-in-out;

  }

  .trail-1,
  .trail-2 {
    position: absolute;
    width: 30px;
    height: 30px;
    // border: 1px solid rgba($blue, 0.5);
    background-color: rgba($blue, 0.3);
    mix-blend-mode: overlay;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease-in-out;
  }

  .trail-2 {
    width: 10px;
    height: 10px;
    border: 1px solid rgba($white, 1);
  }
}
</style>