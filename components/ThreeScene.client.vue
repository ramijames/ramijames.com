<template>
  <div ref="container" class="threejs-container" />
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
let scene, camera, renderer
let animationId = null
let resizeHandler = null
let blob = null
let blobMaterial = null
let clock = new THREE.Clock()

// Smoothed current values for transitions (will be initialized on first frame)
let currentConfig = null
const transitionDuration = 2.0 // seconds for smooth transitions

// Section configurations: colors and displacement for each scroll section
const sectionConfigs = [
  {
    // Hero - Soft purple/pink gradient
    color1: new THREE.Color(0xc084fc), // Light purple
    color2: new THREE.Color(0xf472b6), // Pink
    color3: new THREE.Color(0xa78bfa), // Lavender
    color4: new THREE.Color(0xfbbf24), // Amber
    distortion: .3,
    noiseScale: .2,
    noiseSpeed: 0.01,
    animSpeed: 0.01
  },
  {
    // Product Design - Ocean blues
    color1: new THREE.Color(0x06b6d4), // Cyan
    color2: new THREE.Color(0x0ea5e9), // Sky blue
    color3: new THREE.Color(0x3b82f6), // Blue
    color4: new THREE.Color(0x8b5cf6), // Violet
    distortion: .4,
    noiseScale: .2,
    noiseSpeed: 0.01,
    animSpeed: 0.01
  },
  {
    // UX Strategy - Sunset warm
    color1: new THREE.Color(0xf97316), // Orange
    color2: new THREE.Color(0xef4444), // Red
    color3: new THREE.Color(0xfbbf24), // Amber
    color4: new THREE.Color(0xf472b6), // Pink
    distortion: .1,
    noiseScale: .3,
    noiseSpeed: 0.01,
    animSpeed: 0.01
  },
  {
    // Design Systems - Forest greens
    color1: new THREE.Color(0x10b981), // Emerald
    color2: new THREE.Color(0x14b8a6), // Teal
    color3: new THREE.Color(0x06b6d4), // Cyan
    color4: new THREE.Color(0x84cc16), // Lime
    distortion: .6,
    noiseScale: .2,
    noiseSpeed: 0.01,
    animSpeed: 0.01
  },
  {
    // Latest Work - Electric neon
    color1: new THREE.Color(0xe879f9), // Fuchsia
    color2: new THREE.Color(0x22d3ee), // Cyan bright
    color3: new THREE.Color(0xa3e635), // Lime bright
    color4: new THREE.Color(0xfbbf24), // Amber
    distortion: .6,
    noiseScale: .2,
    noiseSpeed: 0.01,
    animSpeed: 0.01
  },
  {
    // Testimonials - Elegant gold/rose
    color1: new THREE.Color(0xfbbf24), // Amber
    color2: new THREE.Color(0xf59e0b), // Orange
    color3: new THREE.Color(0xfb7185), // Rose
    color4: new THREE.Color(0xc084fc), // Purple
    distortion: .5,
    noiseScale: .2,
    noiseSpeed: 0.01,
    animSpeed: 0.01
  },
  {
    // Footer - Deep space
    color1: new THREE.Color(0x6366f1), // Indigo
    color2: new THREE.Color(0x8b5cf6), // Violet
    color3: new THREE.Color(0xec4899), // Pink
    color4: new THREE.Color(0x06b6d4), // Cyan
    distortion: .6,
    noiseScale: .2,
    noiseSpeed: 0.01,
    animSpeed: 0.01
  }
]

// Helper to interpolate between section configs
function lerpConfig(configA, configB, t) {
  return {
    color1: configA.color1.clone().lerp(configB.color1, t),
    color2: configA.color2.clone().lerp(configB.color2, t),
    color3: configA.color3.clone().lerp(configB.color3, t),
    color4: configA.color4.clone().lerp(configB.color4, t),
    distortion: configA.distortion + (configB.distortion - configA.distortion) * t,
    noiseScale: configA.noiseScale + (configB.noiseScale - configA.noiseScale) * t,
    noiseSpeed: configA.noiseSpeed + (configB.noiseSpeed - configA.noiseSpeed) * t,
    animSpeed: configA.animSpeed + (configB.animSpeed - configA.animSpeed) * t
  }
}

function getConfigForProgress(progress) {
  const numSections = sectionConfigs.length
  const sectionSize = 1 / (numSections - 1)
  const sectionIndex = Math.min(Math.floor(progress / sectionSize), numSections - 2)
  const localProgress = (progress - sectionIndex * sectionSize) / sectionSize

  return lerpConfig(
    sectionConfigs[sectionIndex],
    sectionConfigs[sectionIndex + 1],
    localProgress
  )
}

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

  // Scene setup
  scene = new THREE.Scene()

  // Perspective camera
  const aspect = container.value.clientWidth / container.value.clientHeight
  camera = new THREE.PerspectiveCamera(80, aspect, 0.01, 1000)
  camera.position.set(2, 0, 2)
  camera.lookAt(-2, 0, 0)

  // Renderer with transparency
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  // High-poly smooth sphere for blob base
  const geometry = new THREE.SphereGeometry(1.5, 128, 128)

  // Colorful iridescent blob shader
  blobMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uColor1: { value: new THREE.Color(0xff6b9d) }, // Pink
      uColor2: { value: new THREE.Color(0x9d4edd) }, // Purple
      uColor3: { value: new THREE.Color(0x00d4ff) }, // Cyan
      uColor4: { value: new THREE.Color(0xffd93d) }, // Yellow
      uNoiseScale: { value: 1.2 },
      uNoiseSpeed: { value: 0.3 },
      uDistortion: { value: 0.4 },
      uAnimSpeed: { value: 1.0 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uScrollProgress;
      uniform float uNoiseScale;
      uniform float uNoiseSpeed;
      uniform float uDistortion;
      uniform float uAnimSpeed;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying float vDisplacement;

      //
      // GLSL textureless classic 3D noise "cnoise",
      // with an RSL-style periodic variant "pnoise".
      // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
      // Version: 2011-10-11
      //
      vec3 mod289(vec3 x) { return x - floor(x * 0.00346020761) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * 0.00346020761) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

      float cnoise(vec3 P) {
        vec3 Pi0 = floor(P);
        vec3 Pi1 = Pi0 + vec3(1.0);
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P);
        vec3 Pf1 = Pf0 - vec3(1.0);
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (0.14285714);
        vec4 gy0 = fract(floor(gx0) * (0.14285714)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (0.14285714);
        vec4 gy1 = fract(floor(gx1) * (0.14285714)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }

      void main() {
        float animTime = uTime * uAnimSpeed;
        float time = animTime * uNoiseSpeed;

        // Breathing effect - global pulsing
        float breathe = sin(animTime * 0.8) * 0.08 + 1.0;
        float breathe2 = sin(animTime * 1.3 + 1.5) * 0.05;

        // Domain warping for more organic shapes
        vec3 warpedPos = position;
        warpedPos.x += cnoise(position * 0.5 + time * 0.3) * 0.3;
        warpedPos.y += cnoise(position * 0.5 + time * 0.2 + 100.0) * 0.3;
        warpedPos.z += cnoise(position * 0.5 + time * 0.25 + 200.0) * 0.3;

        // Multi-octave noise with domain warping
        float noise1 = cnoise(warpedPos * uNoiseScale + time);
        float noise2 = cnoise(warpedPos * uNoiseScale * 2.0 + time * 1.2) * 0.5;
        float noise3 = cnoise(warpedPos * uNoiseScale * 4.0 + time * 0.7) * 0.25;
        float noise4 = cnoise(warpedPos * uNoiseScale * 8.0 + time * 0.4) * 0.125;

        float totalNoise = noise1 + noise2 + noise3 + noise4;

        // Flowing waves across surface
        float wave1 = sin(position.x * 3.0 + position.y * 2.0 + animTime * 1.5) * 0.1;
        float wave2 = sin(position.y * 4.0 + position.z * 3.0 + animTime * 1.2) * 0.08;
        float wave3 = cos(position.z * 2.5 + position.x * 2.0 + animTime * 1.8) * 0.06;

        // Combine all displacement factors
        float scrollInfluence = 1.0 + uScrollProgress * 0.3;
        float displacement = (totalNoise * uDistortion + wave1 + wave2 + wave3) * scrollInfluence;

        // Apply breathing
        displacement *= breathe;
        displacement += breathe2;

        vDisplacement = displacement;

        // Tangential displacement for more interesting shapes
        vec3 tangent1 = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
        vec3 tangent2 = normalize(cross(normal, tangent1));
        float tangentNoise1 = cnoise(position * 2.0 + time * 0.5) * 0.15;
        float tangentNoise2 = cnoise(position * 2.0 + time * 0.5 + 50.0) * 0.15;

        // Final position with normal and tangential displacement
        vec3 newPosition = position * breathe;
        newPosition += normal * displacement;
        newPosition += tangent1 * tangentNoise1 * uDistortion;
        newPosition += tangent2 * tangentNoise2 * uDistortion;

        // Compute displaced normal for better lighting
        float eps = 0.01;
        vec3 posX = position + vec3(eps, 0.0, 0.0);
        vec3 posY = position + vec3(0.0, eps, 0.0);
        float dispX = cnoise(posX * uNoiseScale + time) * uDistortion;
        float dispY = cnoise(posY * uNoiseScale + time) * uDistortion;
        vec3 displacedNormal = normalize(normal + vec3(displacement - dispX, displacement - dispY, 0.0) * 2.0);

        vNormal = normalize(normalMatrix * mix(normal, displacedNormal, 0.5));
        vPosition = newPosition;
        vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uScrollProgress;
      uniform float uAnimSpeed;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      varying float vDisplacement;

      void main() {
        float animTime = uTime * uAnimSpeed;

        // View direction for fresnel
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float NdotV = dot(viewDirection, vNormal);

        // Multiple fresnel layers for rich edge effects
        float fresnelSharp = pow(1.0 - abs(NdotV), 4.0);
        float fresnelSoft = pow(1.0 - abs(NdotV), 2.0);
        float fresnelWide = pow(1.0 - abs(NdotV), 1.5);
        float fresnelCore = pow(abs(NdotV), 2.0); // Core glow (opposite of fresnel)

        // Flowing color bands that move across surface
        float band1 = sin(vPosition.x * 4.0 + vPosition.y * 3.0 + animTime * 0.8) * 0.5 + 0.5;
        float band2 = sin(vPosition.y * 5.0 + vPosition.z * 4.0 - animTime * 0.6) * 0.5 + 0.5;
        float band3 = cos(vPosition.z * 3.0 + vPosition.x * 2.0 + animTime * 0.7) * 0.5 + 0.5;

        // Swirling pattern
        float angle = atan(vPosition.y, vPosition.x);
        float radius = length(vPosition.xy);
        float swirl = sin(angle * 3.0 + radius * 2.0 - animTime * 1.2) * 0.5 + 0.5;

        // Combine patterns for color mixing
        float colorMix1 = mix(band1, swirl, 0.3);
        float colorMix2 = mix(band2, band3, 0.5);
        float colorMix3 = sin(vPosition.z * 2.0 + animTime * 0.3 + uScrollProgress * 3.14159) * 0.5 + 0.5;

        // Blend colors with flowing bands
        vec3 color12 = mix(uColor1, uColor2, colorMix1);
        vec3 color34 = mix(uColor3, uColor4, colorMix2);
        vec3 baseColor = mix(color12, color34, colorMix3);

        // Add scroll-based color shift
        float scrollHue = uScrollProgress * 2.0;
        vec3 scrollColor = mix(uColor1, uColor4, fract(scrollHue));
        baseColor = mix(baseColor, scrollColor, 0.25);

        // Subsurface scattering simulation
        float sss = pow(max(0.0, -NdotV), 2.0) * 0.5;
        vec3 sssColor = mix(uColor2, uColor4, 0.5);
        baseColor += sssColor * sss * fresnelCore * 0.9;

        // Multi-layer iridescence
        float iri1 = sin(NdotV * 8.0 + animTime * 2.0) * 0.5 + 0.5;
        float iri2 = sin(NdotV * 12.0 + animTime * 1.5 + 1.0) * 0.5 + 0.5;
        vec3 iridescentColor = mix(uColor2, uColor3, iri1);
        iridescentColor = mix(iridescentColor, uColor1, iri2 * 0.3);

        // Combine base color with iridescence
        vec3 finalColor = mix(baseColor, iridescentColor, fresnelSoft * 0.4);

        // Core glow - lighter in the center
        vec3 coreColor = mix(uColor3, vec3(1.0), 0.3);
        finalColor = mix(finalColor, coreColor, fresnelCore * 0.15);

        // Animated rim color
        float rimHue = sin(animTime * 0.5) * 0.5 + 0.5;
        vec3 rimColor = mix(uColor1, uColor3, rimHue);
        finalColor += rimColor * fresnelSharp * 0.7;

        // Soft outer glow
        finalColor += vec3(1.0) * fresnelSoft * 0.25;

        // Wide ambient rim with color cycling
        vec3 ambientRimColor = mix(uColor2, uColor4, sin(animTime * 0.3) * 0.5 + 0.5);
        finalColor += ambientRimColor * fresnelWide * 0.12;

        // Displacement-based highlights
        float dispHighlight = smoothstep(0.0, 0.3, vDisplacement);
        float dispShadow = smoothstep(0.0, -0.3, vDisplacement);
        finalColor += uColor4 * dispHighlight * 0.15;
        finalColor = mix(finalColor, uColor1 * 0.8, dispShadow * 0.1);

        // Pulsing edge highlight
        float pulse = sin(animTime * 1.5) * 0.5 + 0.5;
        finalColor += vec3(1.0) * fresnelSharp * pulse * 0.15;

        // Sparkle effect at extreme edges
        float sparkle = pow(fresnelSharp, 3.0) * sin(animTime * 8.0 + vPosition.x * 20.0) * 0.5 + 0.5;
        finalColor += vec3(1.0) * sparkle * 0.1;

        // Output with fresnel-based transparency
        float alpha = 0.85 + fresnelSoft * 0.15;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.FrontSide,
    depthWrite: true
  })

  blob = new THREE.Mesh(geometry, blobMaterial)
  // Position blob in bottom right corner
  blob.position.set(1.5, -1, 0)
  scene.add(blob)

  // Soft lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const light1 = new THREE.PointLight(0xff6b9d, 1, 10)
  light1.position.set(3, 3, 3)
  scene.add(light1)

  const light2 = new THREE.PointLight(0x00d4ff, 1, 10)
  light2.position.set(-3, -3, 3)
  scene.add(light2)

  // Handle resize
  resizeHandler = () => {
    if (!container.value) return
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }
  window.addEventListener('resize', resizeHandler)

  // Animation loop
  let lastTime = 0
  const animate = () => {
    animationId = requestAnimationFrame(animate)

    const elapsed = clock.getElapsedTime()
    const deltaTime = elapsed - lastTime
    lastTime = elapsed

    // Get target config for current scroll position
    const targetConfig = getConfigForProgress(props.scrollProgress)

    // Initialize currentConfig on first frame
    if (!currentConfig) {
      currentConfig = {
        color1: targetConfig.color1.clone(),
        color2: targetConfig.color2.clone(),
        color3: targetConfig.color3.clone(),
        color4: targetConfig.color4.clone(),
        distortion: targetConfig.distortion,
        noiseScale: targetConfig.noiseScale,
        noiseSpeed: targetConfig.noiseSpeed,
        animSpeed: targetConfig.animSpeed
      }
    }

    // Smooth interpolation factor (exponential decay for 2-second transition feel)
    // Using 1 - e^(-dt / tau) where tau controls the transition speed
    // tau = transitionDuration / 3 gives ~95% completion in transitionDuration
    const tau = transitionDuration / 3
    const lerpFactor = 1 - Math.exp(-deltaTime / tau)

    // Smoothly interpolate current config toward target
    currentConfig.color1.lerp(targetConfig.color1, lerpFactor)
    currentConfig.color2.lerp(targetConfig.color2, lerpFactor)
    currentConfig.color3.lerp(targetConfig.color3, lerpFactor)
    currentConfig.color4.lerp(targetConfig.color4, lerpFactor)
    currentConfig.distortion += (targetConfig.distortion - currentConfig.distortion) * lerpFactor
    currentConfig.noiseScale += (targetConfig.noiseScale - currentConfig.noiseScale) * lerpFactor
    currentConfig.noiseSpeed += (targetConfig.noiseSpeed - currentConfig.noiseSpeed) * lerpFactor
    currentConfig.animSpeed += (targetConfig.animSpeed - currentConfig.animSpeed) * lerpFactor

    if (blobMaterial) {
      blobMaterial.uniforms.uTime.value = elapsed
      blobMaterial.uniforms.uScrollProgress.value = props.scrollProgress

      // Update colors with smoothed values
      blobMaterial.uniforms.uColor1.value.copy(currentConfig.color1)
      blobMaterial.uniforms.uColor2.value.copy(currentConfig.color2)
      blobMaterial.uniforms.uColor3.value.copy(currentConfig.color3)
      blobMaterial.uniforms.uColor4.value.copy(currentConfig.color4)

      // Update displacement settings with smoothed values
      blobMaterial.uniforms.uDistortion.value = currentConfig.distortion
      blobMaterial.uniforms.uNoiseScale.value = currentConfig.noiseScale
      blobMaterial.uniforms.uNoiseSpeed.value = currentConfig.noiseSpeed
      blobMaterial.uniforms.uAnimSpeed.value = currentConfig.animSpeed
    }

    // Gentle floating motion around bottom-right position
    if (blob) {
      blob.rotation.x = Math.sin(elapsed * 0.2) * 0.1
      blob.rotation.y = elapsed * 0.15
      blob.rotation.z = Math.cos(elapsed * 0.15) * 0.05
      // Float around base position (1.5, -1, 0)
      blob.position.y = -1 + Math.sin(elapsed * 0.4) * 0.15
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }

  animate()
})

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }

  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (blob) {
    blob.geometry.dispose()
  }
  if (blobMaterial) {
    blobMaterial.dispose()
  }
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<style scoped>
.threejs-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
