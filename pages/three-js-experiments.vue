<template>
  <div class="experiments-page">
    <nav class="component-selector">
      <section class="selector-group">
        <div class="group-label">Experiments</div>
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
  flex-direction: column;
  align-items: flex-start;
  gap: $spacing-sm;
  background: $white;
  flex-wrap: wrap;
  width: 300px;
  background: $white;
  border-right: 1px solid rgba($black, 0.1);

  .selector-group {
    display: flex;
    flex-direction: column;
    width: calc(100% - 2 * $spacing-xs);
    margin: $spacing-xs;
    padding: $spacing-xs;
    gap: $spacing-xxs;

    .group-label {
      font-size: $font-size-xs;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: $spacing-xs;
      color: $black;
      opacity: 0.5;
      letter-spacing: 1px;
    }

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
  position: relative;

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
import ThreeScene from '~/components/ThreeScene.client.vue'
import DigitalOcean from '~/components/threejs/DigitalOcean.client.vue'
import PerlinNoiseLines from '~/components/threejs/PerlinNoiseLines.client.vue'
import Threedarray from '~/components/threejs/Threedarray.client.vue'
import Mandelbulb from '~/components/threejs/Mandelbulb.client.vue'
import SDF from '~/components/threejs/SDF.client.vue'

const route = useRoute()
const router = useRouter()

// Use the viewer layout for this page
definePageMeta({
  layout: 'viewer'
})

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
    component: markRaw(ThreeScene)
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
    id: 'sdf',
    label: 'SDF',
    description: 'SDF volume experiment.',
    component: markRaw(SDF)
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