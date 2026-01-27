<template>
  <div class="mesh-gradient">
    <div class="controls">
      <label v-for="(c, i) in colors" :key="i" class="color-picker">
        <input type="color" :value="c.value" @input="e => updateColor(i, e.target.value)" />
      </label>
    </div>
    <div ref="container" class="threejs-container" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, mesh
let animationId = null
let startTime = Date.now()
let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }

const TRAIL_LENGTH = 32
let trail = [] // { x, y, age } entries
let lastTrailTime = 0

// Reactive color pickers (hex)
const colors = [
  ref('#6B33A0'),  // Purple
  ref('#FFFFFF'),  // White
  ref('#FF0000'),  // Red
  ref('#0000FF')   // Blue
]

const hexToVec3 = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return new THREE.Vector3(r, g, b)
}

const updateColor = (index, hex) => {
  colors[index].value = hex
  if (!mesh) return
  mesh.material.uniforms.uColors.value[index] = hexToVec3(hex)
}

const MAX_PARTICLES = 64
let particles = [] // { x, y, vx, vy, age, size }
let lastParticleTime = 0

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
  uniform vec2 uMouse;
  uniform vec2 uTrail[32];
  uniform vec2 uTrailVel[32];
  uniform float uTrailAge[32];
  uniform int uTrailCount;
  uniform vec2 uParticles[64];
  uniform float uParticleAge[64];
  uniform float uParticleSize[64];
  uniform int uParticleCount;
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

    // Mouse influence - smooth radial field
    vec2 mouseAspect = vec2(uMouse.x * aspect, uMouse.y);
    float mouseDist = length(uvAspect - mouseAspect);
    float mouseInfluence = smoothstep(0.8, 0.0, mouseDist) * 0.3;

    // Base gradient blobs - 4 color centers that drift slowly
    vec2 c1 = vec2(
      0.3 + sin(t * 0.7) * 0.2 + mouseInfluence * 0.2,
      0.3 + cos(t * 0.5) * 0.2
    );
    vec2 c2 = vec2(
      0.7 + cos(t * 0.6) * 0.2,
      0.7 + sin(t * 0.8) * 0.2 + mouseInfluence * 0.15
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

    // Mouse proximity adds slight brightness
    col += mouseInfluence * 0.15;

    // Mouse trail - each point adds a fading warm glow
    for (int i = 0; i < 32; i++) {
      if (i >= uTrailCount) break;
      float age = uTrailAge[i];
      float fade = 1.0 - age;
      fade = fade * fade * fade;
      vec2 tp = vec2(uTrail[i].x * aspect, uTrail[i].y);
      float td = length(uvAspect - tp);
      float glow = smoothstep(0.15, 0.0, td) * fade * .5;
      col += glow * vec3(1.0, 0.65, 0.6);
    }

    // Particles - small bright dots that fall with gravity
    for (int i = 0; i < 64; i++) {
      if (i >= uParticleCount) break;
      float age = uParticleAge[i];
      float fade = 1.0 - age;
      fade = fade * fade;
      float sz = uParticleSize[i] * fade;
      vec2 pp = vec2(uParticles[i].x * aspect, uParticles[i].y);
      float pd = length(uvAspect - pp);
      float dot = smoothstep(sz, sz * 0.3, pd) * fade;
      col += dot * vec3(1.0, 0.9, 0.8);
    }

    gl_FragColor = vec4(col, 1.0);
  }
`

const init = () => {
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
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTrail: { value: Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector2(0, 0)) },
      uTrailAge: { value: new Float32Array(TRAIL_LENGTH) },
      uTrailCount: { value: 0 },
      uParticles: { value: Array.from({ length: MAX_PARTICLES }, () => new THREE.Vector2(0, 0)) },
      uParticleAge: { value: new Float32Array(MAX_PARTICLES) },
      uParticleSize: { value: new Float32Array(MAX_PARTICLES) },
      uParticleCount: { value: 0 },
      uColors: { value: colors.map(c => hexToVec3(c.value)) }
    }
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  window.addEventListener('resize', onResize)
  container.value.addEventListener('mousemove', onMouseMove)
  container.value.addEventListener('mouseleave', onMouseLeave)

  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  const elapsed = (Date.now() - startTime) / 1000
  mesh.material.uniforms.uTime.value = elapsed

  // Smooth mouse lerp
  mouse.x += (mouse.targetX - mouse.x) * 0.05
  mouse.y += (mouse.targetY - mouse.y) * 0.05
  mesh.material.uniforms.uMouse.value.set(mouse.x, mouse.y)

  const dt = 1 / 60
  const uniforms = mesh.material.uniforms

  // Age trail points and remove expired ones
  trail = trail.filter(p => { p.age += dt * 1.2; return p.age < 1.0 })

  // Upload trail to uniforms
  const trailCount = Math.min(trail.length, TRAIL_LENGTH)
  for (let i = 0; i < trailCount; i++) {
    uniforms.uTrail.value[i].set(trail[i].x, trail[i].y)
    uniforms.uTrailAge.value[i] = trail[i].age
  }
  uniforms.uTrailCount.value = trailCount

  // Update particles - apply gravity and age
  particles = particles.filter(p => {
    p.vy -= 0.4 * dt // gravity
    p.vx *= 0.99      // air resistance
    p.vy *= 0.99
    p.x += p.vx * dt
    p.y += p.vy * dt
    p.age += dt * 0.6
    return p.age < 1.0 && p.y > -0.1
  })

  // Upload particles to uniforms
  const pCount = Math.min(particles.length, MAX_PARTICLES)
  for (let i = 0; i < pCount; i++) {
    uniforms.uParticles.value[i].set(particles[i].x, particles[i].y)
    uniforms.uParticleAge.value[i] = particles[i].age
    uniforms.uParticleSize.value[i] = particles[i].size
  }
  uniforms.uParticleCount.value = pCount

  renderer.render(scene, camera)
}

const onMouseMove = (e) => {
  const rect = container.value.getBoundingClientRect()
  mouse.targetX = (e.clientX - rect.left) / rect.width
  mouse.targetY = 1.0 - (e.clientY - rect.top) / rect.height

  const now = performance.now()

  // Add trail point every ~30ms
  if (now - lastTrailTime > 30) {
    trail.push({ x: mouse.targetX, y: mouse.targetY, age: 0 })
    if (trail.length > TRAIL_LENGTH) trail.shift()
    lastTrailTime = now
  }

  // Spawn particles every ~50ms
  if (now - lastParticleTime > 50) {
    const count = 1 + Math.floor(Math.random() * 2) // 1-2 particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: mouse.targetX + (Math.random() - 0.5) * 0.02,
        y: mouse.targetY,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() * 0.1) + 0.02,
        age: 0,
        size: 0.004 + Math.random() * 0.006
      })
      if (particles.length > MAX_PARTICLES) particles.shift()
    }
    lastParticleTime = now
  }
}

const onMouseLeave = () => {
  mouse.targetX = 0.5
  mouse.targetY = 0.5
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
  if (container.value) {
    container.value.removeEventListener('mousemove', onMouseMove)
    container.value.removeEventListener('mouseleave', onMouseLeave)
  }
  if (renderer) {
    renderer.dispose()
    if (container.value && renderer.domElement) {
      container.value.removeChild(renderer.domElement)
    }
  }
}

onMounted(() => init())
onUnmounted(() => cleanup())
</script>

<style lang="scss" scoped>
.mesh-gradient {
  position: relative;
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.6);
  padding: 10px;
  border-radius: 8px;
}

.color-picker {
  display: block;
  cursor: pointer;

  input[type="color"] {
    -webkit-appearance: none;
    appearance: none;
    width: 32px;
    height: 32px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    background: none;

    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    &::-webkit-color-swatch {
      border: none;
      border-radius: 50%;
    }

    &::-moz-color-swatch {
      border: none;
      border-radius: 50%;
    }
  }
}

.threejs-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  cursor: crosshair;
}
</style>
