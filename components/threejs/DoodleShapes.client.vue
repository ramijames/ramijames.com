<template>
  <div ref="container" class="threejs-container" />
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'
import { useThemeStore } from '~/store/theme'

const props = defineProps({
  svg: {
    type: String,
    default: ''
  },
  svgUrl: {
    type: String,
    default: '/svgs/ai.svg'
  },
  particleCount: {
    type: Number,
    default: 3200
  }
})

const themeStore = useThemeStore()
const container = ref(null)

let scene, camera, renderer
let animationId = null
let resizeHandler = null
let mouseMoveHandler = null
let mouseLeaveHandler = null
let clock = new THREE.Clock()
let squaresMesh = null
let squareMat = null
let bgGlowMesh = null
let bgGlowMat = null

/**
 * Parse an SVG string and sample evenly-spaced points along all paths.
 * Points are normalized to fit within the Three.js visible area.
 */
function sampleSvgPoints(svgString, numPoints, fitWidth, fitHeight) {
  const tempContainer = document.createElement('div')
  tempContainer.style.cssText = 'position:absolute;left:-9999px;top:-9999px;'
  tempContainer.innerHTML = svgString
  document.body.appendChild(tempContainer)

  const svgEl = tempContainer.querySelector('svg')
  if (!svgEl) {
    document.body.removeChild(tempContainer)
    return []
  }

  const shapes = svgEl.querySelectorAll('path, line, circle, ellipse, rect, polyline, polygon')
  if (shapes.length === 0) {
    document.body.removeChild(tempContainer)
    return []
  }

  // Measure total length across all geometric elements
  let totalLength = 0
  const shapeLengths = []
  for (const shape of shapes) {
    const len = shape.getTotalLength()
    shapeLengths.push(len)
    totalLength += len
  }

  // Sample points evenly, distributed proportionally to path length
  const points = []
  const step = totalLength / numPoints
  let shapeIndex = 0
  let accumulated = 0

  for (let i = 0; i < numPoints; i++) {
    const targetDist = i * step
    while (shapeIndex < shapes.length - 1 && targetDist >= accumulated + shapeLengths[shapeIndex]) {
      accumulated += shapeLengths[shapeIndex]
      shapeIndex++
    }
    const localDist = targetDist - accumulated
    const pt = shapes[shapeIndex].getPointAtLength(localDist)
    points.push({ x: pt.x, y: pt.y })
  }

  document.body.removeChild(tempContainer)

  // Normalize based on actual point bounds (handles any coordinate space)
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const pt of points) {
    if (pt.x < minX) minX = pt.x
    if (pt.x > maxX) maxX = pt.x
    if (pt.y < minY) minY = pt.y
    if (pt.y > maxY) maxY = pt.y
  }

  const rangeX = maxX - minX || 1
  const rangeY = maxY - minY || 1
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  const scale = Math.min(fitWidth * 0.7 / rangeX, fitHeight * 0.7 / rangeY)

  for (const pt of points) {
    pt.x = (pt.x - cx) * scale
    pt.y = -(pt.y - cy) * scale // flip Y for Three.js
  }

  return points
}

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

  const NUM_SQUARES = props.particleCount

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

  // Visible area dimensions
  const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(50 / 2)) * 6
  const visibleWidth = visibleHeight * (el.clientWidth / el.clientHeight)

  // Background glow plane with perlin noise
  const bgGeo = new THREE.PlaneGeometry(visibleWidth * 1.2, visibleHeight * 1.2)
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

  // Resolve SVG content: use inline prop or fetch from URL
  let svgContent = props.svg
  if (!svgContent && props.svgUrl) {
    try {
      const res = await fetch(props.svgUrl)
      svgContent = await res.text()
    } catch (e) {
      console.warn('DoodleShapes: failed to fetch SVG from', props.svgUrl, e)
      return
    }
  }
  if (!svgContent) return

  // Sample points along SVG paths
  const svgPoints = sampleSvgPoints(svgContent, NUM_SQUARES, visibleWidth, visibleHeight)
  if (svgPoints.length === 0) return

  // Instanced squares
  const squareSize = 0.01
  const squareGeo = new THREE.PlaneGeometry(squareSize, squareSize)
  squareMat = new THREE.MeshBasicMaterial({ color: 0x3E74FF, transparent: true })
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

  // Per-particle float animation offsets
  const floatSpeeds = new Float32Array(NUM_SQUARES)
  const floatAmplitudes = new Float32Array(NUM_SQUARES)
  const floatPhases = new Float32Array(NUM_SQUARES)
  for (let i = 0; i < NUM_SQUARES; i++) {
    floatSpeeds[i] = 0.3 + Math.random() * 0.5
    floatAmplitudes[i] = 0.02 + Math.random() * 0.04
    floatPhases[i] = Math.random() * Math.PI * 2
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

  // Mouse tracking
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

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    const mouseRadius = 0.6
    const glowRadius = 1.25
    const glowBoost = 25.0
    const nudgeStrength = 0.03
    const nudgeDecay = 0.9
    let colorsChanged = false

    // Pulse of light traveling along path order
    const pulseSpeed = 0.22
    const pulseWidth = 0.08
    const pulseBoost = 12.0
    const pulsePos = (t * pulseSpeed) % 1.0

    for (let i = 0; i < NUM_SQUARES; i++) {
      const baseX = svgPoints[i].x
      const baseY = svgPoints[i].y
      const floatX = Math.sin(t * floatSpeeds[i] + floatPhases[i]) * floatAmplitudes[i]
      const floatY = Math.cos(t * floatSpeeds[i] * 0.7 + floatPhases[i]) * floatAmplitudes[i]
      const px = baseX + floatX
      const py = baseY + floatY

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

      // Pulse along path order
      const pathPos = i / NUM_SQUARES
      let pulseDist = Math.abs(pathPos - pulsePos)
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
    squareMat.dispose()
  }
  if (renderer) renderer.dispose()
})
</script>

<style scoped>
.threejs-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
