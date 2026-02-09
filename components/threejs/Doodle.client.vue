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
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'
import { useThemeStore } from '~/store/theme'

const props = defineProps({
  scrollProgress: {
    type: Number,
    default: 0
  }
})

const themeStore = useThemeStore()

const container = ref(null)
const progress = ref(0)

let scene, camera, renderer
let animationId = null
let resizeHandler = null
let mouseMoveHandler = null
let mouseLeaveHandler = null
let clock = new THREE.Clock()
let squaresMesh = null
let bgGlowMesh = null
let bgGlowMat = null

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
  const isDark = themeStore.currentTheme === 'dark'
  const bgColor = new THREE.Color(isDark ? 0x101114 : 0xFFFFFF)
  renderer.setClearColor(bgColor, 1)
  el.appendChild(renderer.domElement)

  // Background glow plane with perlin noise
  const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(50 / 2)) * 6
  const visibleWidthBg = visibleHeight * (el.clientWidth / el.clientHeight)
  const bgGeo = new THREE.PlaneGeometry(visibleWidthBg * 1.2, visibleHeight * 1.2)
  bgGlowMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uBgColor: { value: bgColor.clone() },
      uGlowColor: { value: new THREE.Color(0x3E74FF) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uBgColor;
      uniform vec3 uGlowColor;
      varying vec2 vUv;

      // Classic Perlin 2D noise (Ashima Arts)
      vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                                      + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                 dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 pos = (vUv - 0.5) * 3.0;
        float n = snoise(pos + uTime * 0.04) * 0.5 + 0.5;
        n += snoise(pos * 2.0 - uTime * 0.02) * 0.25;
        n *= 0.5;

        // Radial fade — stronger in center, fading to edges
        float dist = length(vUv - 0.5) * 2.0;
        float radial = 1.0 - smoothstep(0.0, 1.0, dist);

        float glow = n * radial * 0.48;
        vec3 color = mix(uBgColor, uGlowColor, glow);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    depthWrite: false
  })
  bgGlowMesh = new THREE.Mesh(bgGeo, bgGlowMat)
  bgGlowMesh.position.z = -1
  scene.add(bgGlowMesh)

  // Circle of tiny squares — radius is 50% of visible height
  const circleRadius = visibleHeight * 0.25

  const squareSize = 0.01
  const squareGeo = new THREE.PlaneGeometry(squareSize, squareSize)
  const squareMat = new THREE.MeshBasicMaterial({ color: 0x3E74FF, transparent: true })

  squaresMesh = new THREE.InstancedMesh(squareGeo, squareMat, NUM_SQUARES)
  const dummy = new THREE.Object3D()

  const baseColor = new THREE.Color(0x3E74FF)
  const instanceColor = new THREE.Color()
  const baseBrightness = new Float32Array(NUM_SQUARES)
  for (let i = 0; i < NUM_SQUARES; i++) {
    baseBrightness[i] = 1 + (Math.random() - 0.5) * 5
    instanceColor.copy(baseColor).multiplyScalar(baseBrightness[i])
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

  // ~5% of squares randomly fade to white
  const sparklePhase = new Float32Array(NUM_SQUARES)
  const sparkleSpeed = new Float32Array(NUM_SQUARES)
  const isSparkle = new Uint8Array(NUM_SQUARES)
  const whiteColor = new THREE.Color(0xFFFFFF)
  for (let i = 0; i < NUM_SQUARES; i++) {
    if (Math.random() < 0.05) {
      isSparkle[i] = 1
      sparklePhase[i] = Math.random() * Math.PI * 2
      sparkleSpeed[i] = 0.3 + Math.random() * 0.7
    }
  }

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

  watch(() => themeStore.currentTheme, (theme) => {
    const newBg = new THREE.Color(theme === 'dark' ? 0x101114 : 0xFFFFFF)
    renderer.setClearColor(newBg, 1)
    bgGlowMat.uniforms.uBgColor.value.copy(newBg)
  })

  let currentDisperse = 0

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    const targetDisperse = progress.value / 100
    currentDisperse += (targetDisperse - currentDisperse) * 0.05

    const mouseRadius = 0.6
    const glowRadius = 1.25
    const glowBoost = 25.0
    const nudgeStrength = 0.03
    const nudgeDecay = 0.9
    let colorsChanged = false

    // Pulse of light traveling from outside (0) to inside (1)
    const pulseSpeed = 0.22
    const pulseWidth = 0.08
    const pulseBoost = 12.0
    const pulsePos = (t * pulseSpeed) % 1.0

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

      // Mouse repulsion + glow
      let glow = 0
      if (mouseActive) {
        const finalX = px + nudgeX[i]
        const finalY = py + nudgeY[i]
        const distX = finalX - mouseWorld.x
        const distY = finalY - mouseWorld.y
        const dist = Math.sqrt(distX * distX + distY * distY)

        if (dist < mouseRadius && dist > 0.001) {
          const force = (1 - dist / mouseRadius) * nudgeStrength
          nudgeX[i] += (distX / dist) * force
          nudgeY[i] += (distY / dist) * force
        }

        if (dist < glowRadius) {
          const t2 = 1 - dist / glowRadius
          glow = t2 * t2 * glowBoost
        }
      }

      // Spring back
      nudgeX[i] *= nudgeDecay
      nudgeY[i] *= nudgeDecay

      // Spiral pulse — distance along spiral from this particle to pulse front
      const spiralPos = i / NUM_SQUARES
      let pulseDist = Math.abs(spiralPos - pulsePos)
      if (pulseDist > 0.5) pulseDist = 1.0 - pulseDist
      const pulse = pulseDist < pulseWidth ? (1.0 - pulseDist / pulseWidth) * pulseBoost : 0

      // Update color with glow + sparkle + pulse
      const brightness = baseBrightness[i] + glow + pulse
      instanceColor.copy(baseColor).multiplyScalar(brightness)
      if (isSparkle[i]) {
        const s = Math.sin(t * sparkleSpeed[i] + sparklePhase[i]) * 2.5
        instanceColor.lerp(whiteColor, s)
      }
      squaresMesh.setColorAt(i, instanceColor)
      colorsChanged = true

      dummy.position.set(px + nudgeX[i], py + nudgeY[i], 0)
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      squaresMesh.setMatrixAt(i, dummy.matrix)
    }
    squaresMesh.instanceMatrix.needsUpdate = true
    if (colorsChanged) squaresMesh.instanceColor.needsUpdate = true

    squareMat.opacity = 1 - currentDisperse * 0.5
    bgGlowMat.uniforms.uTime.value = t

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
  if (bgGlowMesh) {
    bgGlowMesh.geometry.dispose()
    bgGlowMat.dispose()
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

.dark {
  .center-dot {
    .center-plus-text {
      color: $white;
    }
  }
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
  cursor: pointer;
  animation: pulse-glow 3s ease-in-out infinite;
  transition: all 0.24s ease-in-out;

  &:hover {
    animation-play-state: paused;
    width: 64px;
    height: 64px;
    background: #5887ff;
  }

  .center-plus-text {
    position: absolute;
    color: $black;
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

@keyframes pulse-glow {
  0%, 100% {
    box-shadow:
      0 0 8px rgba(62, 116, 255, 0.3),
      0 0 16px rgba(62, 116, 255, 0.1);
  }
  50% {
    box-shadow:
      0 0 40px rgba(62, 116, 255, 0.35),
      0 0 70px rgba(62, 116, 255, 0.15),
      0 0 40px 60px rgba(107, 149, 255, 0.15);
  }
}
</style>
