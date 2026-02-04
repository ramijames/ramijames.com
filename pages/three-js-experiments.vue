<template>
  <div class="experiments-page">
    <nav class="component-selector">
      <div class="group-label">Experiments</div>
      <section class="selector-group">
        <div
          v-for="comp in experiments"
          :key="comp.id"
          :class="['selector-label', { active: selectedExperiment === comp.id }]"
          @click="selectedExperiment = comp.id"
        >
          {{ comp.label }}
        </div>
      </section>
    </nav>

    <section class="view">
      <component :is="currentComponent" />
    </section>

  </div>
</template>

<style lang="scss" scoped>
.experiments-page {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
}

.component-selector {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: $white;
  flex-wrap: wrap;
  background: $white;
  border-right: 1px solid rgba($black, 0.1);
  position: fixed;
  left: $spacing-sm;
  bottom: $spacing-sm;
  max-height: 300px;
  overflow-y: auto;
  border-radius: $br-sm;
  z-index: 1;

  .group-label {
    font-size: $font-size-xs;
    font-weight: 600;
    text-transform: uppercase;
    color: $black;
    letter-spacing: 1px;
    position: sticky;
    padding: $spacing-xs;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: rgba($white, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 2;
  }

  .selector-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: $spacing-xs;
    gap: $spacing-xxs;

    .selector-label {
      font-size: $font-size-sm;
      padding: $spacing-xs;
      border-radius: $br-sm;
      width: 100%;
      cursor: pointer;
      transition: all 0.2s ease;
      color: $black;
      opacity: 0.7;

      &.active,
      &:hover {
        background: rgba($black, 0.15);
        color: $black;
        opacity: 1;
      }
    }
  }
}

.view {
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom:0;
  left:0;
  right:0;

  &.white {
    background: $white;
  }

  &.black {
    background: $black;
  }
}
</style>

<script setup>
import { ref, computed, markRaw, watch } from 'vue'
import EnvMap from '~/components/threejs/EnvMap.client.vue'
import WavingDots from '~/components/threejs/WavingDots.client.vue'
import DigitalOcean from '~/components/threejs/DigitalOcean.client.vue'
import PerlinNoiseLines from '~/components/threejs/PerlinNoiseLines.client.vue'
import Threedarray from '~/components/threejs/Threedarray.client.vue'
import Mandelbulb from '~/components/threejs/Mandelbulb.client.vue'
import SDF from '~/components/threejs/SDF.client.vue'
import MeshGradient from '~/components/threejs/MeshGradient.client.vue'
import GeometricTracking from '~/components/threejs/GeometricTracking.client.vue'
import TheBlob from '~/components/ThreeScene.client.vue'

const route = useRoute()
const router = useRouter()

// Add new experiments here
const experiments = [
  {
    id: 'envmap',
    label: 'Environment Map',
    description: 'A reflective rounded cylinder with selectable HDR environment maps.',
    component: markRaw(EnvMap)
  },
  {
    id: 'dot-matrix-wave',
    label: 'Dot Matrix Wave',
    description: 'A wave of dots that move in a matrix pattern.',
    component: markRaw(WavingDots)
  },
  {
    id: 'digital-ocean',
    label: 'Digital Ocean',
    description: 'A digital ocean wave simulation using Three.js.',
    component: markRaw(DigitalOcean)
  },
  {
    id: 'perlin-noise-lines',
    label: 'Perlin Noise Lines',
    description: 'Animated lines using Perlin noise for organic movement.',
    component: markRaw(PerlinNoiseLines)
  },
  {
    id: '3d-array',
    label: '3d array',
    description: 'A 3d array of rounded cubes.',
    component: markRaw(Threedarray)
  },
  {
    id: 'mandelbulb',
    label: 'Mandelbulb',
    description: 'A 3d fractal.',
    component: markRaw(Mandelbulb)
  },
  {
    id: 'mesh-gradient',
    label: 'Mesh Gradient with Particles',
    description: 'An interactive mesh gradient with particle effects.',
    component: markRaw(MeshGradient)
  },
  {
    id: 'geometric-tracking',
    label: 'Geometric Tracking',
    description: 'An interactive, coloful geomtric effect.',
    component: markRaw(GeometricTracking)
  },
  {
    id: 'the-blob',
    label: 'The Blob',
    description: 'A huge, colorful blob',
    component: markRaw(TheBlob)
  }
]

// Get initial experiment from URL query param, fallback to first experiment
const getInitialExperiment = () => {
  const queryExperiment = route.query.experiment
  if (queryExperiment && experiments.find(e => e.id === queryExperiment)) {
    return queryExperiment
  }
  return experiments[0].id
}

const selectedExperiment = ref(getInitialExperiment())

// Update URL when experiment changes
watch(selectedExperiment, (newExperiment) => {
  router.replace({ query: { experiment: newExperiment } })
})

const currentExperiment = computed(() =>
  experiments.find(e => e.id === selectedExperiment.value)
)

const currentComponent = computed(() =>
  currentExperiment.value?.component
)

useHead({
  title: 'Three.js Experiments'
})

useSeoMeta({
  title: 'Three.js Experiments',
  ogTitle: 'Three.js Experiments',
  description: 'A collection of experiments with Three.js',
  ogDescription: 'A collection of experiments with Three.js',
  ogImage: '/thoughts/three-js-experiments.png',
  url: 'https://www.ramijames.com/labs/three-js-experiments',
  twitterTitle: 'Three.js Experiments',
  twitterDescription: 'A collection of experiments with Three.js',
  twitterImage: '/thoughts/three-js-experiments.png',
  twitterCard: 'summary_large_image'
})
</script>