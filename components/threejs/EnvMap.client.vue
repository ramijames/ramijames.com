<template>
  <div class="envmap-wrapper">
    <div class="controls">
      <label>Map selection</label>
      <div class="envmap-buttons">
        <button
          v-for="env in envmaps"
          :key="env.value"
          :class="{ active: selectedEnvmap === env.value }"
          :style="{ backgroundImage: `url(${env.value})` }"
          :title="env.label"
          @click="selectEnvmap(env.value)"
        >
          <!-- <span class="label">{{ env.label }}</span> -->
        </button>
      </div>
    </div>
    <div ref="container" class="threejs-container" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { RoundedCylinderGeometry } from '~/utils/rounded-cylinder.js'

const container = ref(null)
let scene, camera, renderer, mesh, textureLoader
let animationId = null

const envmaps = [
  { label: 'Sunrise', value: '/envmaps/sunrise-envmap.jpg' },
  { label: 'Room', value: '/envmaps/room-envmap.jpg' },
  { label: 'Night', value: '/envmaps/night-envmap.png' },
  { label: 'Studio', value: '/envmaps/studio-envmap.jpg' },
  { label: 'Station', value: '/envmaps/station-envmap.jpg' }
]

const selectedEnvmap = ref(envmaps[0].value)

const selectEnvmap = (value) => {
  selectedEnvmap.value = value
  if (!textureLoader || !scene) return
  textureLoader.load(value, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = texture
  })
}

const init = () => {
  // Scene
  scene = new THREE.Scene()

  // Camera
  camera = new THREE.PerspectiveCamera(
    50,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    100
  )
  camera.position.z = 5

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  container.value.appendChild(renderer.domElement)
  
  // Create gradient background using canvas texture
  const canvas = document.createElement('canvas')
  canvas.width = 2
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 0, 256)
  gradient.addColorStop(0, '#dddddd')  // top
  gradient.addColorStop(1, '#ffffff')  // bottom
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 2, 256)

  // const grid = new THREE.GridHelper(
  //   10,   // size
  //   100,   // divisions
  //   0x888888, // center line color
  //   0x444444  // grid color
  // );

  const gridMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xcccccc) },
      uBg: { value: new THREE.Color(0x000000) },
      uScale: { value: 40.0 },
      uLineWidth: { value: 0.03 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 uColor;
      uniform vec3 uBg;
      uniform float uScale;
      uniform float uLineWidth;

      float grid(vec2 uv) {
        vec2 g = abs(fract(uv * uScale - 0.5) - 0.5);
        vec2 line = step(g, vec2(uLineWidth));
        return max(line.x, line.y);
      }

      void main() {
        float g = grid(vUv);
        vec3 color = mix(uBg, uColor, g);
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  // Add a plane that has a mesh and no color
  const planeGeometry = new THREE.PlaneGeometry(10, 10)
  // const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide, wireframe: true })
  const planeMesh = new THREE.Mesh(planeGeometry, gridMaterial)
  planeMesh.position.z = -5
  planeMesh.rotation.x = -20
  scene.add(planeMesh)

  const gradientTexture = new THREE.CanvasTexture(canvas)
  gradientTexture.magFilter = THREE.LinearFilter
  scene.background = gradientTexture

  // Load environment map
  textureLoader = new THREE.TextureLoader()
  textureLoader.load(selectedEnvmap.value, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = texture
  })

  // Rounded cylinder with reflective material
  const geometry = RoundedCylinderGeometry(0.75, 1.5, 0.15, 8, 32)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.1
  })
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // Handle resize
  window.addEventListener('resize', onResize)

  // Start animation
  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  // Rotate the mesh
  mesh.rotation.x += 0.005
  mesh.rotation.y += 0.008

  renderer.render(scene, camera)
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

onMounted(() => {
  init()
})

onUnmounted(() => {
  cleanup()
})
</script>

<style lang="scss" scoped>
.envmap-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
}

.controls {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  background: $black;
  padding: $spacing-sm;
  border-radius: $br-md;
  min-width: 240px;

  label {
    color: $white;
    opacity: 0.5;
    font-size: $font-size-sm;
  }
}

.envmap-buttons {
  display: flex;
  flex-direction: row;
  gap: $spacing-xs;

  button {
    width: 44px;
    height: 44px;
    outline: 1px solid rgba($white, 0);
    outline-offset: -1px;
    border-radius: $br-xl;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba($black, 0.4);
      transition: background 0.2s ease;
    }

    &:hover::before {
      background: rgba($black, 0.2);
    }

    &.active {
      outline: 1px solid rgba($white, 1);
      outline-offset: 2px;

      &::before {
        background: rgba($black, 0.1);
      }
    }

    .label {
      position: relative;
      z-index: 1;
      color: $white;
      font-size: $font-size-sm;
      font-weight: 500;
      text-shadow: 0 1px 3px rgba($black, 0.8);
    }
  }
}

.threejs-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>