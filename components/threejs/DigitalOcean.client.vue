<template>
  <div ref="container" class="threejs-container" />
</template>

<script setup>

import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, mesh, material, geometry
let animationId = null
let mouse = { x: 0, y: 0 }
let resizeHandler = null
let mouseHandler = null
let touchHandler = null
let touchStartHandler = null


// Ocean wave vertex shader
const vertexShader = `
  uniform float uTime;
  uniform float uWaveScale;
  uniform float uWaveSpeed;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vElevation;

  // Noise functions for organic waves
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float time = uTime * uWaveSpeed;

    // Create multiple layers of waves at different scales and speeds
    // Large, slow waves
    float wave1 = snoise(vec2(pos.x * 0.3 + time * 0.15, pos.z * 0.3 + time * 0.1)) * 0.8;

    // Medium waves
    float wave2 = snoise(vec2(pos.x * 0.8 - time * 0.25, pos.z * 0.8 + time * 0.2)) * 0.4;

    // Small detail waves
    float wave3 = snoise(vec2(pos.x * 2.0 + time * 0.4, pos.z * 2.0 - time * 0.35)) * 0.2;

    // Combine waves
    float elevation = (wave1 + wave2 + wave3) * uWaveScale;

    // Apply elevation to Y position
    pos.y += elevation;
    vElevation = elevation;

    // Calculate new normal based on neighboring points for proper lighting
    float offset = 0.1;
    vec3 posRight = position + vec3(offset, 0.0, 0.0);
    vec3 posForward = position + vec3(0.0, 0.0, offset);

    float elevRight = (
      snoise(vec2(posRight.x * 0.3 + time * 0.15, posRight.z * 0.3 + time * 0.1)) * 0.8 +
      snoise(vec2(posRight.x * 0.8 - time * 0.25, posRight.z * 0.8 + time * 0.2)) * 0.4 +
      snoise(vec2(posRight.x * 2.0 + time * 0.4, posRight.z * 2.0 - time * 0.35)) * 0.2
    ) * uWaveScale;

    float elevForward = (
      snoise(vec2(posForward.x * 0.3 + time * 0.15, posForward.z * 0.3 + time * 0.1)) * 0.8 +
      snoise(vec2(posForward.x * 0.8 - time * 0.25, posForward.z * 0.8 + time * 0.2)) * 0.4 +
      snoise(vec2(posForward.x * 2.0 + time * 0.4, posForward.z * 2.0 - time * 0.35)) * 0.2
    ) * uWaveScale;

    posRight.y += elevRight;
    posForward.y += elevForward;
    vec3 tangent = normalize(posRight - pos);
    vec3 bitangent = normalize(posForward - pos);
    vNormal = normalize(cross(tangent, bitangent));

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uDitherScale;
  uniform float uThreshold;
  uniform float uAnimationSpeed;
  uniform float uInvert;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vElevation;

  // Bayer matrix 8x8 for dithering
  float bayerMatrix8(vec2 pos) {
    mat4 m1 = mat4(
      0.0,  32.0,  8.0, 40.0,
      48.0, 16.0, 56.0, 24.0,
      12.0, 44.0,  4.0, 36.0,
      60.0, 28.0, 52.0, 20.0
    );
    mat4 m2 = mat4(
      3.0,  35.0, 11.0, 43.0,
      51.0, 19.0, 59.0, 27.0,
      15.0, 47.0,  7.0, 39.0,
      63.0, 31.0, 55.0, 23.0
    );

    int x = int(mod(pos.x, 8.0));
    int y = int(mod(pos.y, 8.0));

    if (y < 4) {
      if (x < 4) return m1[y][x] / 64.0;
      else return m2[y][x - 4] / 64.0;
    } else {
      if (x < 4) return m1[y - 4][x] / 64.0;
      else return m2[y - 4][x - 4] / 64.0;
    }
  }


  // Organized dithering pattern
  float orderedDither(vec2 pos, float brightness) {
    float ditherValue = bayerMatrix8(pos);
    return step(ditherValue, brightness);
  }

  // Animated noise pattern
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    // Ocean lighting - sun from above and slightly in front
    vec3 lightDirection = normalize(vec3(0.3, 1.0, 0.5));
    float diffuse = max(dot(vNormal, lightDirection), 0.0);

    // Ambient ocean light
    float ambient = 0.25;

    // Use elevation to create depth - peaks are lighter, troughs are darker
    float depthShading = vElevation * 0.3;

    // Calculate brightness
    float brightness = ambient + diffuse * 0.5 + depthShading;

    // Mouse interaction - creates a "sunbeam" or light source
    vec2 mouseInfluence = (uMouse - vUv) * 1.5;
    float mouseDist = length(mouseInfluence);
    float mouseLight = smoothstep(1.2, 0.0, mouseDist) * 0.4;
    brightness += mouseLight;

    // Slow animated shimmer on the surface
    float shimmer = sin(vPosition.x * 8.0 + uTime * uAnimationSpeed * 1.3) * 
                    cos(vPosition.z * 8.0 + uTime * uAnimationSpeed * 0.25) * 0.08;

    brightness += shimmer;

    // Slow, massive wave patterns in brightness
    float wavePattern = sin(vPosition.x * 0.5 + uTime * 0.1) * 
                        cos(vPosition.z * 0.5 + uTime * 0.08) * 0.12;

    brightness += wavePattern;

    // Adjust brightness with threshold
    brightness = clamp((brightness - 0.5) * 3.4 + 0.5 + uThreshold, 0.0, 1.0);

    // Calculate dither position
    vec2 ditherPos = gl_FragCoord.xy / uDitherScale;

    // Apply ordered dithering
    float dithered = orderedDither(ditherPos, brightness);

    // Very subtle grain for ocean texture
    float grain = random(vUv + uTime * 10.0) * 0.01;
    dithered = clamp(dithered + grain, 0.5, 2.0);

    gl_FragColor = vec4(vec3(dithered), 1.0);

  }

`

onMounted(async () => {
  // Wait for DOM to be fully ready
  await nextTick()

  if (!container.value) return

  // Ensure container has dimensions before proceeding
  const checkDimensions = () => {
    return container.value && 
           container.value.clientWidth > 0 && 
           container.value.clientHeight > 0
  }

  // Wait for container to have dimensions
  if (!checkDimensions()) {
    await new Promise(resolve => {
      const checkInterval = setInterval(() => {
        if (checkDimensions()) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 10)

      // Timeout after 1 second
      setTimeout(() => {
        clearInterval(checkInterval)
        resolve()
      }, 1000)
    })
  }

  if (!checkDimensions()) return

  // Scene setup
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  // Camera - positioned to view ocean from above at an angle
  camera = new THREE.PerspectiveCamera(
    32,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 3, 8)
  camera.lookAt(0, 0, 0)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  // Create large ocean plane with optimal detail for smooth waves
  // Using 200x200 for best balance of performance and quality
  geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50)
  geometry.rotateX(-Math.PI / 2) // Rotate to be horizontal

  // Shader material with uniforms
  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 2 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { 
        value: new THREE.Vector2(
          container.value.clientWidth, 
          container.value.clientHeight
        ) 
      },
      uDitherScale: { value: 3.0 }, // Lower = larger dither pattern
      uThreshold: { value: -0.65 }, // Adjust overall brightness
      uAnimationSpeed: { value: .85 }, // Slower for ocean
      uWaveScale: { value: 0.75 }, // Height of waves
      uWaveSpeed: { value: 1.3 }, // Speed of wave movement
      // uInvert: { value: 0.0 } // Invert colors for dark mode
    },
    side: THREE.DoubleSide // Render both sides of the plane
  })
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // Add ambient light visualization (though shader handles lighting)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  // Render once immediately to prevent black screen
  renderer.render(scene, camera)

  // Detect if device is mobile/touch
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // Set initial mouse position (center for mobile, center for desktop too)
  if (isMobile) {
    material.uniforms.uMouse.value.set(0.5, 0.5)
  }

  // Mouse move listener
  mouseHandler = (event) => {
    if (isMobile) return // Don't update on mobile
    const rect = container.value.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width)
    mouse.y = 1.0 - ((event.clientY - rect.top) / rect.height)
    material.uniforms.uMouse.value.set(mouse.x, mouse.y)
  }

  // Touch listener for mobile - keeps it centered
  touchHandler = (event) => {
    // Keep centered on mobile, ignore touch moves
    material.uniforms.uMouse.value.set(0.5, 0.5)
  }

  touchStartHandler = (event) => {
    material.uniforms.uMouse.value.set(0.5, 0.5)
  }
  if (!isMobile) {
    container.value.addEventListener('mousemove', mouseHandler)
  } else {
    container.value.addEventListener('touchmove', touchHandler)
    container.value.addEventListener('touchstart', touchStartHandler)
  }

  // Handle resize
  resizeHandler = () => {
    if (!container.value) return
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
    material.uniforms.uResolution.value.set(
      container.value.clientWidth,
      container.value.clientHeight
    )
  }
  window.addEventListener('resize', resizeHandler)

  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate)

    // Slow time increment for massive, slow waves
    if (material && material.uniforms) {
      material.uniforms.uTime.value += 0.008
    }
    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }

  animate()

})

onUnmounted(() => {
  // Cleanup
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  if (container.value) {
    if (mouseHandler) {
      container.value.removeEventListener('mousemove', mouseHandler)
    }
    if (touchHandler) {
      container.value.removeEventListener('touchmove', touchHandler)
    }
    if (touchStartHandler) {
      container.value.removeEventListener('touchstart', touchStartHandler)
    }
  }

  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (geometry) geometry.dispose()
  if (material) material.dispose()
  if (renderer) renderer.dispose()
})

</script>

<style scoped>

.threejs-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  cursor: crosshair;
}

</style>