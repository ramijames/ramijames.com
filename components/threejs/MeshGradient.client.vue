<template>
  <div class="mesh-gradient">
    <div ref="container" class="threejs-container" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, mesh
let animationId = null
let startTime = Date.now()

// Color pool — individual colors that each slot picks from independently
const colorPool = [
  '#6B33A0', '#FFFFFF', '#FF0000', '#0000FF',
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#E8175D', '#474747', '#1ADBFF', '#FFD700',
  '#2D1B69', '#FF6F61', '#6B5B95', '#88B04B',
  '#F7DC6F', '#48C9B0', '#AF7AC5', '#EC7063',
  '#1B2631', '#D4AC0D', '#2E86C1', '#E74C3C',
  '#F39C12', '#8E44AD', '#1ABC9C', '#2980B9',
  '#2C3E50', '#E67E22', '#27AE60',
]

const hexToVec3 = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return new THREE.Vector3(r, g, b)
}

const randomColor = () => hexToVec3(colorPool[Math.floor(Math.random() * colorPool.length)])

// Each color slot transitions independently with its own timing and speed
const colorSlots = [
  { current: hexToVec3('#6B33A0'), target: hexToVec3('#6B33A0'), progress: 1.0, speed: 0.008, interval: 5000, lastChange: 0 },
  { current: hexToVec3('#FFFFFF'), target: hexToVec3('#FFFFFF'), progress: 1.0, speed: 0.012, interval: 7000, lastChange: 0 },
  { current: hexToVec3('#FF0000'), target: hexToVec3('#FF0000'), progress: 1.0, speed: 0.006, interval: 9000, lastChange: 0 },
  { current: hexToVec3('#0000FF'), target: hexToVec3('#0000FF'), progress: 1.0, speed: 0.010, interval: 6000, lastChange: 0 },
]

// Stagger initial changes so they don't all fire at once
colorSlots.forEach((slot, i) => {
  slot.lastChange = -slot.interval + i * 2000
})

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColors[4];

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float aspect = uResolution.x / uResolution.y;
    vec2 uvAspect = vec2(uv.x * aspect, uv.y);

    float t = uTime * 0.15;

    // Base gradient blobs - 4 color centers that drift slowly
    vec2 c1 = vec2(
      0.3 + sin(t * 0.7) * 0.2,
      0.3 + cos(t * 0.5) * 0.2
    );
    vec2 c2 = vec2(
      0.7 + cos(t * 0.6) * 0.2,
      0.7 + sin(t * 0.8) * 0.2
    );
    vec2 c3 = vec2(
      0.5 + sin(t * 0.9 + 2.0) * 0.3,
      0.4 + cos(t * 0.4 + 1.0) * 0.3
    );
    vec2 c4 = vec2(
      0.6 + cos(t * 0.5 + 3.0) * 0.25,
      0.6 + sin(t * 0.7 + 2.0) * 0.25
    );

    // Distances to each center (in aspect-corrected space)
    float d1 = length(uvAspect - vec2(c1.x * aspect, c1.y));
    float d2 = length(uvAspect - vec2(c2.x * aspect, c2.y));
    float d3 = length(uvAspect - vec2(c3.x * aspect, c3.y));
    float d4 = length(uvAspect - vec2(c4.x * aspect, c4.y));

    // Soft blending weights
    float w1 = 1.0 / (d1 * d1 + 0.15);
    float w2 = 1.0 / (d2 * d2 + 0.15);
    float w3 = 1.0 / (d3 * d3 + 0.15);
    float w4 = 1.0 / (d4 * d4 + 0.15);
    float wTotal = w1 + w2 + w3 + w4;

    // Colors from uniform
    vec3 col = (uColors[0] * w1 + uColors[1] * w2 + uColors[2] * w3 + uColors[3] * w4) / wTotal;

    // Very subtle noise layer
    float n1 = snoise(uvAspect * 500.0 + t * 0.3) * 0.05 + 0.5;
    float n2 = snoise(uvAspect * 500.0 - t * 0.2 + 10.0) * 0.05 + 0.5;
    float noise = mix(n1, n2, 0.5);

    // Apply noise as barely-visible color variation
    col += (noise - 0.5) * 1.0;

    gl_FragColor = vec4(col, 1.0);
  }
`

const init = () => {
  if (!container.value) return
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  renderer = new THREE.WebGLRenderer({ antialias: false })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  container.value.appendChild(renderer.domElement)

  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(
        container.value.clientWidth * Math.min(window.devicePixelRatio, 2),
        container.value.clientHeight * Math.min(window.devicePixelRatio, 2)
      )},
      uColors: { value: colorSlots.map(s => s.current.clone()) }
    }
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  window.addEventListener('resize', onResize)

  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  const elapsed = (Date.now() - startTime) / 1000
  mesh.material.uniforms.uTime.value = elapsed

  // Update each color slot independently
  const now = Date.now()
  for (let i = 0; i < colorSlots.length; i++) {
    const slot = colorSlots[i]

    // Time to pick a new target?
    if (now - slot.lastChange > slot.interval) {
      slot.target = randomColor()
      slot.progress = 0.0
      slot.lastChange = now
      // Randomize next interval slightly so it stays unpredictable
      slot.interval = 4000 + Math.random() * 8000
    }

    // Advance transition
    if (slot.progress < 1.0) {
      slot.progress = Math.min(1.0, slot.progress + slot.speed)
      // Sharper easing — fast start, holds, then snaps to target
      const p = slot.progress
      const t = p < 0.5
        ? 4 * p * p * p
        : 1 - Math.pow(-2 * p + 2, 3) / 2
      slot.current.lerp(slot.target, t)
      mesh.material.uniforms.uColors.value[i].copy(slot.current)
    }
  }

  renderer.render(scene, camera)
}

const onResize = () => {
  if (!container.value) return
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  mesh.material.uniforms.uResolution.value.set(
    container.value.clientWidth * Math.min(window.devicePixelRatio, 2),
    container.value.clientHeight * Math.min(window.devicePixelRatio, 2)
  )
}

const cleanup = () => {
  if (animationId) cancelAnimationFrame(animationId)
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
  init()
})
onUnmounted(() => cleanup())
</script>

<style lang="scss" scoped>
.mesh-gradient {
  position: relative;
  width: 100%;
  height: 100%;
}

.threejs-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
