<template>



  <div ref="container" class="three-container"></div>


</template>





<script setup>


import * as THREE from 'three'


import { onMounted, onBeforeUnmount, ref } from 'vue'





const container = ref(null)





let scene, camera, renderer, animationId, backgroundMesh


let mouse = { x: 0.5, y: 0.5 }


let targetMouse = { x: 0.5, y: 0.5 }


let onMouseMove = null


let onMouseDown = null


let onMouseUp = null


let ripples = []


let distortionZones = []


let isMouseDown = false





// Noise-based isovalues shader with mouse interactivity


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


  uniform vec3 uRipples[10]; // x, y, intensity


  uniform vec3 uDistortionZones[5]; // x, y, radius


  uniform int uRippleCount;


  uniform int uDistortionCount;


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


      


      // Apply distortion from mouse position


      vec2 mouseInfluence = (vUv - uMouse) * 2.0;


      float mouseDist = length(mouseInfluence);


      float mouseEffect = exp(-mouseDist * 3.0) * 0.5;


      


      // Apply ripple effects


      float rippleEffect = 0.0;


      for(int i = 0; i < 10; i++) {


          if(i >= uRippleCount) break;


          vec2 ripplePos = uRipples[i].xy;


          float rippleIntensity = uRipples[i].z;


          float dist = length(vUv - ripplePos);


          rippleEffect += sin(dist * 30.0 - uTime * 5.0) * exp(-dist * 8.0) * rippleIntensity;


      }


      


      // Apply distortion zones


      vec2 distortion = vec2(0.0);


      for(int i = 0; i < 5; i++) {


          if(i >= uDistortionCount) break;


          vec2 zonePos = uDistortionZones[i].xy;


          float zoneRadius = uDistortionZones[i].z;


          vec2 toZone = vUv - zonePos;


          float zoneDist = length(toZone);


          if(zoneDist < zoneRadius) {


              float strength = 1.0 - (zoneDist / zoneRadius);


              // Create vortex effect


              float angle = atan(toZone.y, toZone.x);


              distortion += vec2(


                  cos(angle + uTime) * strength * 0.3,


                  sin(angle + uTime) * strength * 0.3


              );


          }


      }


      


      // Combine all effects


      vec2 finalUV = U + distortion * 100.0 + mouseInfluence * mouseEffect * 50.0;


      


      float n = noise(vec3(finalUV*8./R.y, .1*uTime + rippleEffect * 2.0)),


            v = sin(6.28*10.*n),


          t = uTime;


      


      v = smoothstep(1.,0., .5*abs(v)/fwidth(v));


      


      // Custom color palette with mouse-reactive colors


      vec3 color1 = vec3(0.945, 0.788, 0.067); // #F1C911 - golden yellow


      vec3 color2 = vec3(1.0, 1.0, 1.0);        // #FFFFFF - white


      vec3 color3 = vec3(0.431, 0.486, 0.741); // #6E7CBD - blue


      


      // Create color variation based on noise and mouse position


      vec3 baseColor = .5+.5*sin(12.*n+vec3(0,2.1,-2.1) + mouseEffect * 3.0);


      


      // Add ripple color shift


      baseColor += vec3(rippleEffect * 0.3);


      


      // Map to custom palette


      vec3 finalColor = mix(


          mix(color1, color2, baseColor.r),


          color3,


          baseColor.b


      );


      


      // Intensify colors near mouse


      finalColor += mouseEffect * color2 * 0.3;


      


      // Only show the lines, everything else is transparent


      float alpha = v * (1.0 + mouseEffect * 0.5);


      gl_FragColor = vec4(finalColor * v, alpha);


  }


`





onMounted(() => {


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





  // Create fullscreen shader material with interactive uniforms


  const shaderMaterial = new THREE.ShaderMaterial({


    uniforms: {


      uTime: { value: 0 },


      uResolution: { value: new THREE.Vector2(width, height) },


      uMouse: { value: new THREE.Vector2(0.5, 0.5) },


      uRipples: { value: Array(10).fill(new THREE.Vector3(0, 0, 0)) },


      uRippleCount: { value: 0 },


      uDistortionZones: { value: Array(5).fill(new THREE.Vector3(0, 0, 0)) },


      uDistortionCount: { value: 0 }


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





  // Mouse down handler - create distortion zone


  onMouseDown = (event) => {


    isMouseDown = true


    const rect = container.value.getBoundingClientRect()


    const x = (event.clientX - rect.left) / rect.width


    const y = 1.0 - (event.clientY - rect.top) / rect.height


    


    // Add distortion zone


    if (distortionZones.length < 5) {


      distortionZones.push({


        x: x,


        y: y,


        radius: 0.15,


        life: 1.0


      })


    }


  }





  // Mouse up handler - create ripple


  onMouseUp = (event) => {


    isMouseDown = false


    const rect = container.value.getBoundingClientRect()


    const x = (event.clientX - rect.left) / rect.width


    const y = 1.0 - (event.clientY - rect.top) / rect.height


    


    // Add ripple at click position


    if (ripples.length < 10) {


      ripples.push({


        x: x,


        y: y,


        intensity: 1.0,


        life: 1.0


      })


    }


  }





  container.value.addEventListener('mousemove', onMouseMove)


  container.value.addEventListener('mousedown', onMouseDown)


  container.value.addEventListener('mouseup', onMouseUp)





  // Animation loop


  const animate = () => {


    if (!renderer || !scene || !camera) return


    


    // Smoothly interpolate mouse position for fluid movement


    mouse.x += (targetMouse.x - mouse.x) * 0.1


    mouse.y += (targetMouse.y - mouse.y) * 0.1


    


    // Update ripples


    ripples = ripples.filter(ripple => {


      ripple.life -= 1.02


      ripple.intensity = ripple.life


      return ripple.life > 0


    })


    


    // Update distortion zones


    distortionZones = distortionZones.filter(zone => {


      zone.life -= 0.01


      zone.radius = 2.15 * (1.0 + (1.0 - zone.life) * 0.5)


      return zone.life > 0


    })


    


    // Update shader uniforms


    shaderMaterial.uniforms.uTime.value += 0.016 // ~60fps


    shaderMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y)


    


    // Update ripple uniforms


    const rippleArray = ripples.slice(0, 10).map(r => new THREE.Vector3(r.x, r.y, r.intensity))


    while (rippleArray.length < 10) {


      rippleArray.push(new THREE.Vector3(0, 0, 0))


    }


    shaderMaterial.uniforms.uRipples.value = rippleArray


    shaderMaterial.uniforms.uRippleCount.value = Math.min(ripples.length, 10)


    


    // Update distortion zone uniforms


    const distortionArray = distortionZones.slice(0, 5).map(z => new THREE.Vector3(z.x, z.y, z.radius))


    while (distortionArray.length < 5) {


      distortionArray.push(new THREE.Vector3(0, 0, 0))


    }


    shaderMaterial.uniforms.uDistortionZones.value = distortionArray


    shaderMaterial.uniforms.uDistortionCount.value = Math.min(distortionZones.length, 5)


    


    renderer.render(scene, camera)


    animationId = requestAnimationFrame(animate)


  }





  animate()





  // Resize handling


  window.addEventListener('resize', onResize)


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


  if (container.value) {


    container.value.removeEventListener('mousemove', onMouseMove)


    container.value.removeEventListener('mousedown', onMouseDown)


    container.value.removeEventListener('mouseup', onMouseUp)


  }


  


  // Proper cleanup


  if (renderer) {


    renderer.dispose()


    if (container.value && renderer.domElement) {


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


  cursor: crosshair;


}


</style>