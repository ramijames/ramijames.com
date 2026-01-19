<template>
  <div ref="container" class="threejs-container" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  forceDark: {
    type: Boolean,
    default: false
  }
})

const container = ref(null)
let scene, camera, renderer
let animationId = null
let darkModeObserver = null
let resizeHandler = null
let mouseHandler = null

// Wave dots
let wavePoints = null
let waveGeometry = null
let waveMaterial = null

// Mouse tracking
let mouseTarget = { x: 0, y: 0 }
let mouseSmooth = { x: 0, y: 0 }

onMounted(async () => {
  await nextTick()

  if (!container.value) return

  const checkDimensions = () => {
    return container.value &&
           container.value.clientWidth > 0 &&
           container.value.clientHeight > 0
  }

  if (!checkDimensions()) {
    await new Promise(resolve => {
      const checkInterval = setInterval(() => {
        if (checkDimensions()) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 10)

      setTimeout(() => {
        clearInterval(checkInterval)
        resolve()
      }, 1000)
    })
  }

  if (!checkDimensions()) return

  // Determine colors based on mode
  const isLightSite = document.body.classList.contains('light')
  const useDarkBackground = props.forceDark || isLightSite
  const bgColor = useDarkBackground ? 0xffffff : 0x000000
  const fgColor = useDarkBackground ? 0x000000 : 0xffffff

  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(bgColor)

  // Perspective camera for 3D depth
  const aspect = container.value.clientWidth / container.value.clientHeight
  camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000)
  camera.position.set(0, 8, 25)
  camera.lookAt(0, 0, 0)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // Create wave grid of dots
  const gridWidth = 80
  const gridDepth = 40
  const spacing = 0.5
  const cols = Math.floor(gridWidth / spacing)
  const rows = Math.floor(gridDepth / spacing)
  const numDots = cols * rows

  const positions = new Float32Array(numDots * 3)
  const basePositions = new Float32Array(numDots * 3)
  const opacities = new Float32Array(numDots)

  let index = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = (col - cols / 2) * spacing
      const z = (row - rows / 2) * spacing

      positions[index * 3] = x
      positions[index * 3 + 1] = 0
      positions[index * 3 + 2] = z

      basePositions[index * 3] = x
      basePositions[index * 3 + 1] = 0
      basePositions[index * 3 + 2] = z

      // Fade based on distance from center (front to back)
      const distZ = Math.abs(z) / (gridDepth / 2)
      const distX = Math.abs(x) / (gridWidth / 2)
      const fade = 1 - Math.max(distZ * 0.8, distX * 0.3)
      opacities[index] = Math.max(0, fade)

      index++
    }
  }

  waveGeometry = new THREE.BufferGeometry()
  waveGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  waveGeometry.setAttribute('basePosition', new THREE.BufferAttribute(basePositions, 3))
  waveGeometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1))

  // Custom shader for dots with opacity
  waveMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(fgColor) },
      uSize: { value: 4.0 * window.devicePixelRatio }
    },
    vertexShader: `
      attribute float opacity;
      attribute vec3 basePosition;
      uniform float uTime;
      uniform float uSize;
      varying float vOpacity;

      void main() {
        vOpacity = opacity;

        vec3 pos = basePosition;

        // Multiple wave layers for complexity
        float wave1 = sin(pos.x * 0.3 + uTime * 0.8) * 1.5;
        float wave2 = sin(pos.x * 0.15 + pos.z * 0.1 + uTime * 0.5) * 2.0;
        float wave3 = cos(pos.z * 0.2 + uTime * 0.6) * 1.0;

        pos.y = wave1 + wave2 + wave3;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Size attenuation based on distance
        gl_PointSize = uSize * (15.0 / -mvPosition.z);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vOpacity;

      void main() {
        // Circular dot
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        if (dist > 0.5) discard;

        // Soft edge
        float alpha = smoothstep(0.5, 0.3, dist) * vOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false
  })

  wavePoints = new THREE.Points(waveGeometry, waveMaterial)
  scene.add(wavePoints)

  // Render once immediately
  renderer.render(scene, camera)

  // Handle resize
  resizeHandler = () => {
    if (!container.value) return

    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }

  window.addEventListener('resize', resizeHandler)

  // Watch for dark mode changes
  if (!props.forceDark) {
    darkModeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isLight = document.body.classList.contains('light')
          const newBgColor = isLight ? 0xffffff : 0x000000
          const newFgColor = isLight ? 0x000000 : 0xffffff

          if (scene) {
            scene.background = new THREE.Color(newBgColor)
            if (waveMaterial) {
              waveMaterial.uniforms.uColor.value.setHex(newFgColor)
            }
          }
        }
      })
    })

    darkModeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    })
  }

  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate)

    if (waveMaterial) {
      waveMaterial.uniforms.uTime.value += 0.016
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }

  animate()

  // Force dark mode if prop is set
  if (props.forceDark && scene) {
    scene.background = new THREE.Color(0x000000)
    if (waveMaterial) {
      waveMaterial.uniforms.uColor.value.setHex(0xffffff)
    }
  }
})

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }

  if (darkModeObserver) {
    darkModeObserver.disconnect()
  }

  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (waveGeometry) waveGeometry.dispose()
  if (waveMaterial) waveMaterial.dispose()
  if (renderer) renderer.dispose()
})
</script>

<style scoped>
.threejs-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
