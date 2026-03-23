<template>
  <LearnNav :sections="sections" stateKey="learnthreejs-nav-open" :innerNav="innerNav" />
</template>

<script lang="ts" setup>

defineProps({
  innerNav: Boolean
})

const sections = [
  {
    title: 'Foundational Three.js',
    links: [
      { to: '/learn-threejs/foundational-threejs/why-threejs', label: 'Why Three.js?', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/setting-up-your-dev-environment', label: 'A modern dev environment', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/hello-cube', label: '"Hello Cube"', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/the-scene', label: 'The Scene', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/cameras', label: 'Cameras', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/the-renderer', label: 'The Renderer', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/the-scene-graph', label: 'The Scene Graph', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/understanding-parent-child-relationships', label: 'Understanding relationships', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/position-rotation-and-scale', label: 'Position, Rotation, and Scale', difficulty: 'easy' },
      { to: '/learn-threejs/foundational-threejs/the-animation-loop', label: 'The Animation Loop', difficulty: 'easy' },
    ]
  },
  {
    title: 'The Building Blocks',
    links: [
      { to: '/learn-threejs/building-blocks/buffer-geometry', label: 'BufferGeometry', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/standard-primitives', label: 'Standard primitives', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/custom-geometries', label: 'Custom geometries and vertices', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/instanced-mesh', label: 'Instanced Mesh', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/procedural-terrain', label: 'Procedural terrain', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/the-spectrum-of-materials', label: 'The spectrum of materials', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/physically-based-rendering', label: 'Physically Based Rendering', difficulty: 'easy' },
      { to: '/learn-threejs/building-blocks/advanced-mapping-concepts', label: 'Advanced Mapping Concepts', difficulty: 'intermediate' },
    ]
  },
  {
    title: 'Lighting',
    links: [
      { to: '/learn-threejs/lighting/types-of-lighting', label: 'Types of Lighting', difficulty: 'intermediate' },
      { to: '/learn-threejs/lighting/types-of-shadows', label: 'Types of Shadows', difficulty: 'intermediate' },
      { to: '/learn-threejs/lighting/transparency-in-shadows', label: 'Transparency in Shadows', difficulty: 'intermediate' },
      { to: '/learn-threejs/lighting/custom-shadow-materials', label: 'Custom Shadow Materials', difficulty: 'intermediate' },
      { to: '/learn-threejs/lighting/environment-maps', label: 'Environment Maps', difficulty: 'intermediate' },
    ]
  },
  {
    title: 'Working with Assets',
    links: [
      { to: '/learn-threejs/assets/asset-standards', label: 'Asset standards', difficulty: 'easy' },
      { to: '/learn-threejs/assets/loading-assets', label: 'Loading assets', difficulty: 'intermediate' },
      { to: '/learn-threejs/assets/working-with-loaded-models', label: 'Working with loaded models', difficulty: 'intermediate' },
      { to: '/learn-threejs/assets/common-loading-errors', label: 'Common loading errors', difficulty: 'intermediate' },
      { to: '/learn-threejs/assets/traversing-loaded-models', label: 'Traversing loaded models', difficulty: 'intermediate' },
    ]
  },
  {
    title: 'Interaction',
    links: [
      { to: '/learn-threejs/interaction/raycasting-and-mouse-events', label: 'Raycasting and Mouse Events', difficulty: 'intermediate' },
      { to: '/learn-threejs/interaction/interaction-managers-and-libraries', label: 'Interaction Managers and Libraries', difficulty: 'intermediate' },
      { to: '/learn-threejs/interaction/drag-drop-and-transform', label: 'Drag, Drop, and Transform', difficulty: 'intermediate' },
      { to: '/learn-threejs/interaction/html-overlays-and-labels', label: 'HTML Overlays and Labels', difficulty: 'intermediate' },
    ]
  },
  {
    title: 'Shaders',
    links: [
      { to: '/learn-threejs/shaders/introduction-to-shaders', label: 'Introduction to Shaders', difficulty: 'advanced' },
      { to: '/learn-threejs/shaders/how-to-think-about-creating-shaders', label: 'How to think about creating shaders', difficulty: 'advanced' },
      { to: '/learn-threejs/shaders/your-first-shader', label: 'Your first shader', difficulty: 'advanced' },
    ]
  }
]
</script>
