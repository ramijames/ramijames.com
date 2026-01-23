<template>
  <div class="experiments-page">
    <nav class="component-selector">
      <button
        v-for="comp in experiments"
        :key="comp.id"
        :class="{ active: selectedExperiment === comp.id }"
        @click="selectedExperiment = comp.id"
      >
        {{ comp.label }}
      </button>
    </nav>

    <section class="example">
      <component :is="currentComponent" />
    </section>

    <main class="w-content page-top">
      <section class="content">
        <h2>{{ currentExperiment?.label }}</h2>
        <p>{{ currentExperiment?.description }}</p>
      </section>
    </main>
    <PostsExtras />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.experiments-page {
  width: 100%;
  padding-top: $spacing-lg;
}

.component-selector {
  display: flex;
  gap: $spacing-sm;
  padding: $spacing-md;
  background: $white;
  border-bottom: 1px solid rgba($black, 0.2);
  flex-wrap: wrap;

  button {
    padding: $spacing-sm $spacing-md;
    border: 1px solid rgba($black, 0.2);
    border-radius: $br-sm;
    background: $white;
    font-family: $font-family-secondary;
    font-size: $font-size-sm;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba($black, 0.05);
    }

    &.active {
      background: $black;
      color: $white;
      border-color: $black;
    }
  }
}

.example {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid rgba($black, 0.2);

  &.white {
    background: $white;
  }

  &.black {
    background: $black;
  }
}
</style>

<script setup>
import { ref, computed, markRaw } from 'vue'
import EnvMap from '~/components/threejs/EnvMap.client.vue'

// Add new experiments here
const experiments = [
  {
    id: 'envmap',
    label: 'Environment Map',
    description: 'A reflective rounded cylinder with selectable HDR environment maps.',
    component: markRaw(EnvMap)
  }
]

const selectedExperiment = ref(experiments[0].id)

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