<template>
  <div ref="container" class="threejs-container">
    <div v-if="isLoading" class="loader">
      <div class="spinner" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { createNoise3D } from 'simplex-noise'

const isLoading = ref(true)
let envMapLoaded = false
let firstFrameRendered = false

const props = defineProps({
  height: {
    type: [Number, String],
    default: 100
  }
})

const containerHeight = computed(() => `${props.height}vh`)

const container = ref(null)
let scene, camera, renderer, cubeGroup, textureLoader
let animationId = null
let cubes = []
let noise3D = null
let time = 0

const checkLoadingState = () => {
  if (firstFrameRendered && envMapLoaded) {
    isLoading.value = false
  }
}

const init = () => {
  // Initialize noise
  noise3D = createNoise3D()

  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // Camera
  camera = new THREE.PerspectiveCamera(
    50,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    100
  )
  camera.position.z = 20
  camera.position.y = 10

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: false })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = .8

  container.value.appendChild(renderer.domElement)

  // Load environment map
  textureLoader = new THREE.TextureLoader()
  textureLoader.load(
    '/envmaps/station-envmap.jpg',
    (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.environment = texture
      envMapLoaded = true
      checkLoadingState()
    }
  )

  // Create group to hold all cubes
  cubeGroup = new THREE.Group()
  cubes = []

  // Rounded cube geometry and material
  const geometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.25)
  const material = new THREE.MeshStandardMaterial({
    color: 0xDDDDDD,
    metalness: .85,
    roughness: 0.01
  })

  // Create 10x10x10 array of cubes
  const gridSize = 20
  const spacing = 1.2
  const offset = (gridSize - 1) * spacing / 2

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const cube = new THREE.Mesh(geometry, material)
        cube.position.x = x * spacing - offset
        cube.position.z = z * spacing - offset
        cube.position.y = y * spacing - offset
        // Store original position for noise sampling
        cube.userData.gridPos = { x, y, z }
        cubeGroup.add(cube)
        cubes.push(cube)
      }
    }
  }

  scene.add(cubeGroup)

  // Move cubeGroup up because it starts rendering at 0 and goes down. We want to see the middle of othe group
  cubeGroup.position.y = 10

  // Linear fog (starts at distance 10, fully obscured at 30)
  // This gives a smoother look to the scene and helps a bit with speet
  scene.fog = new THREE.Fog(0xffffff, 10, 25)

  // Handle resize
  window.addEventListener('resize', onResize)

  // Start animation
  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  time += 0.0008

  const noiseScale = 0.15
  const threshold = 0.25

  for (const cube of cubes) {
    const { x, y, z } = cube.userData.gridPos
    const noiseValue = noise3D(
      x * noiseScale + time,
      y * noiseScale,
      z * noiseScale
    )

    if (noiseValue < threshold) {
      cube.scale.setScalar(0)
    } else {
      const scale = THREE.MathUtils.smoothstep(
        noiseValue,
        threshold,
        threshold + 0.3
      )
      cube.scale.setScalar(scale)
    }
  }

  cubeGroup.rotation.y += 0.0015
  renderer.render(scene, camera)

  if (!firstFrameRendered) {
    firstFrameRendered = true
    checkLoadingState()
  }
}


const onResize = () => {
  if (!container.value) return

  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

const cleanup = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', onResize)

  if (renderer) {
    renderer.dispose()
    if (container.value && renderer.domElement) {
      container.value.removeChild(renderer.domElement)
    }
  }
}

onMounted(async () => {
  await nextTick()
  if (container.value) {
    init()
  }
})

onUnmounted(() => {
  cleanup()
})
</script>

<style lang="scss" scoped>
.threejs-container {
  width: 100%;
  height: v-bind(containerHeight);
  overflow: hidden;
  cursor: crosshair;
}

.loader {
  position: absolute;
  inset: 0;
  height: v-bind(containerHeight);
  display: grid;
  place-items: center;
  background: rgba($black, 0.1);
  backdrop-filter: blur(28px);
  z-index: 10;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #ddd;
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>
