<template>
  <div class="geometric">
    <div ref="container" class="threejs-container" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let renderer, scene, camera, mesh, material

// Track mouse position in absolute pixel coordinates
const mouse = new THREE.Vector2(-1000, -1000) 

const init = () => {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)
  
  // Using an Orthographic camera or a standard Perspective one works, 
  // but we keep your setup for consistency.
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.value.appendChild(renderer.domElement)

  const gridShader = {
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: mouse },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uGridSize: { value: 50.0 } // Size of one square in pixels
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
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uGridSize;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        // 1. Use gl_FragCoord for perfect pixel alignment
        // We flip Y because gl_FragCoord starts from bottom-left
        vec2 pixelCoords = vec2(gl_FragCoord.x, gl_FragCoord.y);
        
        // 2. Create the Grid based on pixels
        vec2 gridCoords = pixelCoords / uGridSize;
        vec2 grid = abs(fract(gridCoords - 0.5) - 0.5) / fwidth(gridCoords);
        float line = min(grid.x, grid.y);
        
        // GridMask (1.0 on lines, 0.0 inside squares)
        float gridMask = 1.0 - smoothstep(0.0, 0.1, line);

        // 3. Mouse Interaction (Now in pixel space)
        float dist = distance(pixelCoords, uMouse);
        // Falloff radius is now relative to pixels (e.g., 150px)
        float falloff = smoothstep(150.0, 0.0, dist); 

        // 4. Coloring logic
        // Use vUv for the color gradient so it spans the whole plane smoothly
        vec3 rainbow = hsv2rgb(vec3(uTime * 0.15 + vUv.x + vUv.y, 0.8, 1.0));
        vec3 finalColor = rainbow * gridMask * falloff;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  }

  // Plane is large enough to cover the screen
  const geometry = new THREE.PlaneGeometry(50, 50)
  material = new THREE.ShaderMaterial({
    uniforms: gridShader.uniforms,
    vertexShader: gridShader.vertexShader,
    fragmentShader: gridShader.fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending
  })
  
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  animate()
}

const animate = (time) => {
  requestAnimationFrame(animate)
  if (material) material.uniforms.uTime.value = time * 0.001
  renderer.render(scene, camera)
}

const handleMouseMove = (event) => {
  // Update mouse to absolute pixel coordinates
  mouse.x = event.clientX 
  // Reverse Y because browser is top-down, WebGL is bottom-up
  mouse.y = window.innerHeight - event.clientY
}

const handleResize = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
  material.uniforms.uResolution.value.set(w, h)
}

onMounted(() => {
  init()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
  renderer.dispose()
})
</script>

<style scoped>
.threejs-container {
  width: 100%;
  height: 100vh;
  background: #000;
  overflow: hidden;
  cursor: crosshair;
}
</style>