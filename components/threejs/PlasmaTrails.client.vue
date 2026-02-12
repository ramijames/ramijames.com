<template>
  <div class="mesh-gradient">
    <div ref="container" class="threejs-container" />
  </div>
</template>

<script setup>

// Altered from https://codepen.io/sabosugi/full/jErebjR

import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'

const container = ref(null)
let renderer, composer, camera, clock
let trailMaterials = []
let animationId = null
let cameraAngle = 0

const CONFIG = {
  cameraSpeed: 0.08,
  plasmaColor: '#777777',
  bloomStrength: 1.5,
  lineThickness: 0.005,
  speedMult: 0.5,
  lengthMult: 1.6
}

const vertexShaderTrail = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const DitherShader = {
  uniforms: {
    tDiffuse: { value: null },
    uDotSize: { value: 10.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uDotSize;
    varying vec2 vUv;

    void main() {
      vec4 texColor = texture2D(tDiffuse, vUv);
      float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

      // Even halftone dot grid
      vec2 cell = floor(gl_FragCoord.xy / uDotSize);
      vec2 cellCenter = (cell + 0.5) * uDotSize;
      float dist = length(gl_FragCoord.xy - cellCenter);

      // Dot radius scales with brightness
      float maxRadius = uDotSize * 0.5;
      float radius = maxRadius * brightness;

      float dot = step(dist, radius);
      gl_FragColor = vec4(vec3(dot), 1.0);
    }
  `
}

const fragmentShaderTrail = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uSpeed;
  uniform float uSpeedMult;
  uniform float uLength;
  uniform float uLengthMult;
  uniform float uOffset;
  uniform float uDirection;
  varying vec2 vUv;

  void main() {
    float finalSpeed = uSpeed * uSpeedMult;
    float progress = fract(vUv.x * 2.0 - (uTime * finalSpeed * uDirection) + uOffset);

    float finalLength = clamp(uLength * uLengthMult, 0.01, 0.99);
    float alpha = 0.0;

    if (uDirection > 0.0) {
      float tailStart = 1.0 - finalLength;
      alpha = smoothstep(tailStart, 1.0, progress);
    } else {
      float tailEnd = finalLength;
      alpha = 1.0 - smoothstep(0.0, tailEnd, progress);
    }
    alpha = pow(alpha, 3.0);
    gl_FragColor = vec4(uColor, alpha);
  }
`

const init = () => {
  if (!container.value) return

  const w = container.value.clientWidth
  const h = container.value.clientHeight

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x424242, 5.82)

  camera = new THREE.PerspectiveCamera(90, w / h, 0.01, 100)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.toneMapping = THREE.NoToneMapping
  container.value.appendChild(renderer.domElement)

  const tokamakGroup = new THREE.Group()
  scene.add(tokamakGroup)

  scene.add(new THREE.AmbientLight(0x000000))

  // Post processing
  const renderPass = new RenderPass(scene, camera)
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 0.85)
  bloomPass.threshold = 0.01
  bloomPass.strength = CONFIG.bloomStrength
  bloomPass.radius = 0.26

  composer = new EffectComposer(renderer)
  composer.addPass(renderPass)
  composer.addPass(bloomPass)
  composer.addPass(new ShaderPass(DitherShader))

  // Plasma trail lines
  trailMaterials = []
  for (let i = 0; i < 80; i++) {
    const laneRadius = 7.5 + Math.random() * 5.0
    const geo = new THREE.TorusGeometry(laneRadius, CONFIG.lineThickness, 6, 120)
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertexShaderTrail,
      fragmentShader: fragmentShaderTrail,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(CONFIG.plasmaColor) },
        uSpeed: { value: 0.1 + Math.random() * 0.3 },
        uSpeedMult: { value: CONFIG.speedMult },
        uLength: { value: 0.1 + Math.random() * 0.2 },
        uLengthMult: { value: CONFIG.lengthMult },
        uOffset: { value: Math.random() * 100.0 },
        uDirection: { value: 1.0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.x = (Math.random() - 0.5) * 0.1
    mesh.position.z = (Math.random() - 0.5) * 0.5
    tokamakGroup.add(mesh)
    trailMaterials.push(mat)
  }

  clock = new THREE.Clock()
  window.addEventListener('resize', onResize)
  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  const delta = clock.getDelta()
  const elapsedTime = clock.getElapsedTime()

  cameraAngle += CONFIG.cameraSpeed * delta
  const r = 10
  camera.position.set(
    Math.cos(cameraAngle) * r,
    Math.sin(cameraAngle) * r,
    0.5
  )

  const lookAtAngle = cameraAngle + 0.1
  camera.lookAt(
    Math.cos(lookAtAngle) * r,
    Math.sin(lookAtAngle) * r,
    0
  )

  trailMaterials.forEach(mat => {
    mat.uniforms.uTime.value = elapsedTime
  })

  composer.render()
}

const onResize = () => {
  if (!container.value || !renderer) return
  const w = container.value.clientWidth
  const h = container.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
  composer.setSize(w, h)
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
