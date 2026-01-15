<template>
  <div ref="container" class="three-container"></div>
</template>

<script setup>
import * as THREE from 'three'
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'

const container = ref(null)

let scene, camera, renderer, animationId, backgroundMesh
let mouse = { x: 0.5, y: 0.5 }
let targetMouse = { x: 0.5, y: 0.5 }
let onMouseMove = null

// Noise-based isovalues shader
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;
  
  // --- noise from procedural pseudo-Perlin (better but not so nice derivatives) ---------
  // ( adapted from IQ )
  float noise3( vec3 x ) {
      vec3 p = floor(x),f = fract(x);
      f = f*f*(3.-2.*f);  // or smoothstep     // to make derivative continuous at borders
      #define hash3(p)  fract(sin(1e3*dot(p,vec3(1,57,-13.7)))*4375.5453)        // rand
      
      return mix( mix(mix( hash3(p+vec3(0,0,0)), hash3(p+vec3(1,0,0)),f.x),       // triilinear interp
                      mix( hash3(p+vec3(0,1,0)), hash3(p+vec3(1,1,0)),f.x),f.y),
                  mix(mix( hash3(p+vec3(0,0,1)), hash3(p+vec3(1,0,1)),f.x),       
                      mix( hash3(p+vec3(0,1,1)), hash3(p+vec3(1,1,1)),f.x),f.y), f.z);
  }
  
  #define noise(x) (noise3(x)+noise3(x+11.5)) / 2. // pseudoperlin improvement from foxes idea 
  
  void main() // ------------ draw isovalues
  { 
      vec2 U = vUv * uResolution;
      vec2 R = uResolution.xy;
      float n = noise(vec3(U*8./R.y, .05*uTime)),
            v = sin(6.28*10.*n),
            t = uTime;
      
      v = smoothstep(1.,0., .5*abs(v)/fwidth(v));
      
      // Custom color palette: #F1C911, #FFFFFF, #6E7CBD
      vec3 color1 = vec3(0.945, 0.788, 0.067);  // #F1C911 - golden yellow
      vec3 color2 = vec3(1.0, 1.0, 1.0);        // #FFFFFF - white
      vec3 color3 = vec3(0.431, 0.486, 0.741);  // #6E7CBD - blue
      
      // Create color variation based on noise
      vec3 baseColor = .5+.5*sin(12.*n+vec3(0,2.1,-2.1));
      
      // Map to custom palette
      vec3 finalColor = mix(
          mix(color1, color2, baseColor.r),
          color3,
          baseColor.b
      );
      
      // Only show the lines, everything else is transparent
      gl_FragColor = vec4(finalColor * v, v);
  }
`

const initThreeScene = () => {
  if (!container.value) {
    console.error('Container ref is null')
    return
  }

  // Get dimensions with fallback
  const width = container.value.clientWidth || window.innerWidth
  const height = container.value.clientHeight || window.innerHeight

  console.log('Container dimensions:', width, height)

  // Prevent invalid dimensions
  if (width === 0 || height === 0) {
    console.error('Container has no dimensions')
    return
  }

  // Scene
  scene = new THREE.Scene()

  // Camera (orthographic for fullscreen effect)
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0) // Transparent background
  container.value.appendChild(renderer.domElement)
  
  console.log('Renderer created and canvas added')

  // Create fullscreen shader material
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    side: THREE.DoubleSide
  })

  // Create a plane that fills the screen
  const geometry = new THREE.PlaneGeometry(2, 2)
  backgroundMesh = new THREE.Mesh(geometry, shaderMaterial)
  scene.add(backgroundMesh)

  console.log('Shader background created and added to scene')

  // Mouse move handler
  onMouseMove = (event) => {
    const rect = container.value.getBoundingClientRect()
    targetMouse.x = (event.clientX - rect.left) / rect.width
    targetMouse.y = 1.0 - (event.clientY - rect.top) / rect.height // Flip Y
  }

  container.value.addEventListener('mousemove', onMouseMove)

  // Animation loop
  const animate = () => {
    if (!renderer || !scene || !camera) return
    
    // Smoothly interpolate mouse position for fluid movement
    mouse.x += (targetMouse.x - mouse.x) * 0.1
    mouse.y += (targetMouse.y - mouse.y) * 0.1
    
    // Update time uniform for animation
    shaderMaterial.uniforms.uTime.value += 0.016 // ~60fps
    shaderMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y)
    
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }

  animate()

  // Resize handling
  window.addEventListener('resize', onResize)
}

onMounted(async () => {
  // Wait for next tick to ensure DOM is ready
  await nextTick()
  initThreeScene()
})

function onResize() {
  if (!container.value || !camera || !renderer) return

  const width = container.value.clientWidth || window.innerWidth
  const height = container.value.clientHeight || window.innerHeight

  if (width === 0 || height === 0) return

  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
  // Update shader resolution uniform
  if (backgroundMesh && backgroundMesh.material) {
    backgroundMesh.material.uniforms.uResolution.value.set(width, height)
  }
}

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', onResize)
  if (container.value && onMouseMove) {
    container.value.removeEventListener('mousemove', onMouseMove)
  }
  
  // Proper cleanup
  if (renderer) {
    renderer.dispose()
    if (container.value && renderer.domElement && container.value.contains(renderer.domElement)) {
      container.value.removeChild(renderer.domElement)
    }
  }
  if (scene) {
    scene.clear()
  }
  if (backgroundMesh) {
    backgroundMesh.geometry.dispose()
    backgroundMesh.material.dispose()
  }
})
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  min-height: 400px;
}
</style>