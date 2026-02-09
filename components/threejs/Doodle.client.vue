<template>
  <div ref="container" class="threejs-container">
    <div v-if="progress >= 70" class="center-dot" :style="{ opacity: Math.min(1, (progress - 70) / 25) }">
      <span class="center-plus">+</span>
      <span class="center-plus-text">Create your first node</span>
    </div>
    <div class="slider-panel">
      <span class="slider-label">{{ Math.round(progress) }}%</span>
      <input
        type="range"
        min="0"
        max="100"
        :value="progress"
        class="zoom-slider"
        @input="progress = Number($event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  scrollProgress: {
    type: Number,
    default: 0
  }
})

const container = ref(null)
const progress = ref(0)

let scene, camera, renderer
let animationId = null
let resizeHandler = null
let mouseMoveHandler = null
let mouseLeaveHandler = null
let clock = new THREE.Clock()
let squaresMesh = null

const NUM_SQUARES = 3200

onMounted(async () => {
  await nextTick()
  if (!container.value) return

  const el = container.value
  if (!el.clientWidth || !el.clientHeight) {
    await new Promise(resolve => {
      const iv = setInterval(() => {
        if (el.clientWidth && el.clientHeight) { clearInterval(iv); resolve() }
      }, 10)
      setTimeout(() => { clearInterval(iv); resolve() }, 1000)
    })
  }
  if (!el.clientWidth || !el.clientHeight) return

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.01, 100)
  camera.position.set(0, 0, 6)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(el.clientWidth, el.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x101114, 1)
  el.appendChild(renderer.domElement)

  // Circle of tiny squares — radius is 50% of visible height
  const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(50 / 2)) * 6
  const circleRadius = visibleHeight * 0.25

  const squareSize = 0.01
  const squareGeo = new THREE.PlaneGeometry(squareSize, squareSize)
  const squareMat = new THREE.MeshBasicMaterial({ color: 0x3E74FF, transparent: true })

  squaresMesh = new THREE.InstancedMesh(squareGeo, squareMat, NUM_SQUARES)
  const dummy = new THREE.Object3D()

  const baseColor = new THREE.Color(0x3E74FF)
  const instanceColor = new THREE.Color()
  for (let i = 0; i < NUM_SQUARES; i++) {
    const brightness = 1 + (Math.random() - 0.5) * 5
    instanceColor.copy(baseColor).multiplyScalar(brightness)
    squaresMesh.setColorAt(i, instanceColor)
  }
  squaresMesh.instanceColor.needsUpdate = true

  // Per-particle random offsets for organic spacing and floating
  const baseAngles = new Float32Array(NUM_SQUARES)
  const radialOffsets = new Float32Array(NUM_SQUARES)
  const floatSpeeds = new Float32Array(NUM_SQUARES)
  const floatAmplitudes = new Float32Array(NUM_SQUARES)
  const floatPhases = new Float32Array(NUM_SQUARES)

  const spiralTurns = 1.8
  for (let i = 0; i < NUM_SQUARES; i++) {
    const progress = i / NUM_SQUARES
    baseAngles[i] = progress * Math.PI * 2 * spiralTurns + (Math.random() + 0.25) * 0.4
    const spiralRadius = circleRadius * (1.0 - progress * 0.7)
    radialOffsets[i] = spiralRadius - circleRadius + (Math.random() - 0.5) * circleRadius * 0.15
    floatSpeeds[i] = 0.3 + Math.random() * 0.5
    floatAmplitudes[i] = 0.02 + Math.random() * 0.04
    floatPhases[i] = Math.random() * Math.PI * 2
  }

  // Per-particle random dispersion directions and speeds
  const disperseAngles = new Float32Array(NUM_SQUARES)
  const disperseSpeeds = new Float32Array(NUM_SQUARES)
  for (let i = 0; i < NUM_SQUARES; i++) {
    disperseAngles[i] = baseAngles[i] + (Math.random() - 0.5) * 0.8
    disperseSpeeds[i] = 0.7 + Math.random() * 0.6
  }

  // Per-particle nudge offsets for mouse repulsion
  const nudgeX = new Float32Array(NUM_SQUARES)
  const nudgeY = new Float32Array(NUM_SQUARES)

  scene.add(squaresMesh)

  const visibleWidth = visibleHeight * (el.clientWidth / el.clientHeight)
  const disperseDistance = Math.max(visibleWidth, visibleHeight) * 0.3

  // Mouse tracking — convert screen coords to world-space on z=0 plane
  const mouseWorld = new THREE.Vector2(0, 0)
  let mouseActive = false

  mouseMoveHandler = (e) => {
    const rect = el.getBoundingClientRect()
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1
    const vec = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera)
    const dir = vec.sub(camera.position).normalize()
    const dist = -camera.position.z / dir.z
    const pos = camera.position.clone().add(dir.multiplyScalar(dist))
    mouseWorld.set(pos.x, pos.y)
    mouseActive = true
  }
  mouseLeaveHandler = () => { mouseActive = false }

  el.addEventListener('mousemove', mouseMoveHandler)
  el.addEventListener('mouseleave', mouseLeaveHandler)

  resizeHandler = () => {
    if (!container.value) return
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }
  window.addEventListener('resize', resizeHandler)

  let currentDisperse = 0

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    const targetDisperse = progress.value / 100
    currentDisperse += (targetDisperse - currentDisperse) * 0.05

    const mouseRadius = 0.6
    const nudgeStrength = 0.03
    const nudgeDecay = 0.9

    for (let i = 0; i < NUM_SQUARES; i++) {
      const r = circleRadius + radialOffsets[i] + Math.sin(t * floatSpeeds[i] + floatPhases[i]) * floatAmplitudes[i]
      const angle = baseAngles[i] + Math.sin(t * floatSpeeds[i] * 0.7 + floatPhases[i] + 1.0) * 0.02

      const baseX = Math.cos(angle) * r
      const baseY = Math.sin(angle) * r

      const d = currentDisperse * disperseSpeeds[i]
      const dx = Math.cos(disperseAngles[i]) * disperseDistance * d
      const dy = Math.sin(disperseAngles[i]) * disperseDistance * d

      const px = baseX + dx
      const py = baseY + dy

      // Mouse repulsion
      if (mouseActive) {
        const distX = px + nudgeX[i] - mouseWorld.x
        const distY = py + nudgeY[i] - mouseWorld.y
        const dist = Math.sqrt(distX * distX + distY * distY)
        if (dist < mouseRadius && dist > 0.001) {
          const force = (1 - dist / mouseRadius) * nudgeStrength
          nudgeX[i] += (distX / dist) * force
          nudgeY[i] += (distY / dist) * force
        }
      }

      // Spring back
      nudgeX[i] *= nudgeDecay
      nudgeY[i] *= nudgeDecay

      dummy.position.set(px + nudgeX[i], py + nudgeY[i], 0)
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      squaresMesh.setMatrixAt(i, dummy.matrix)
    }
    squaresMesh.instanceMatrix.needsUpdate = true

    squareMat.opacity = 1 - currentDisperse * 0.5

    renderer.render(scene, camera)
  }
  animate()
})

onUnmounted(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (animationId) cancelAnimationFrame(animationId)
  if (container.value && mouseMoveHandler) {
    container.value.removeEventListener('mousemove', mouseMoveHandler)
    container.value.removeEventListener('mouseleave', mouseLeaveHandler)
  }
  if (squaresMesh) {
    squaresMesh.geometry.dispose()
    squaresMesh.material.dispose()
  }
  if (renderer) renderer.dispose()
})
</script>

<style lang="scss" scoped>
.threejs-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.center-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #3E74FF;
  display: flex;
  align-items: center;
  justify-content: center;

  .center-plus-text {
    position: absolute;
    color: $white;
    bottom: -30px;
    font-size: $font-size-xs;
    width: 100vw;
    margin: 0 auto;
    text-align: center;
    opacity: 0.35;
  }
}

.center-plus {
  color: #fff;
  font-size: 28px;
  font-weight: 300;
  line-height: 1;
  font-family: monospace;
}

.slider-panel {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  backdrop-filter: blur(8px);
}

.slider-label {
  font-size: 12px;
  font-family: monospace;
  color: rgba(255, 255, 255, 0.7);
  min-width: 36px;
  text-align: right;
}

.zoom-slider {
  width: 140px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.zoom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #c084fc;
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

.zoom-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #c084fc;
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
}
</style>
