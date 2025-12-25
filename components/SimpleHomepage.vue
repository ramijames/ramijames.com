<template>
  <main id="Hero">
    <section class="mega-hero">
      <section class="mega-title">
        <h1>Interface<br>Designer</h1>
        <p>My name is Rami James and I work as a freelance user interface, user experience, interaction, and design professional.</p>
      </section>
      <button v-if="showOrientationButton" @click="requestOrientationPermission" class="orientation-button">
        Enable Tilt Effect
      </button>
      <section 
        class="grid-background"
        :style="{
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
        }"
      >
        <div 
          v-for="(item, index) in gridItems" 
          :key="index"
          class="grid-item"
          @mouseenter="!isMobile && updateScales(item)"
          @mouseleave="!isMobile && updateScales(null)"
          :style="{
            left: `${item.left}px`,
            top: `${item.top}px`,
            width: `${item.width}px`,
            height: `${item.height}px`,
            transform: `scale(${item.scale})`,
            opacity: item.opacity
          }"
        >
          <svg :style="{ width: '100%', height: '100%' }">
            <defs>
              <mask :id="`mask-${index}`">
                <image :href="item.svg" width="100%" height="100%" />
              </mask>
            </defs>
            <rect width="100%" height="100%" :fill="`#${item.color}`" :mask="`url(#mask-${index})`" />
          </svg>
        </div>
      </section>
    </section>  
    <section class="mega-content">
      <h4>I've been lucky to work with</h4>
      <section class="clients">
        <img src="/clients/ibm.png" />
        <img src="/clients/wpt.png" />
        <img src="/clients/microsoft.png" />
        <img src="/clients/nvidia.png" />
        <img src="/clients/wix.png" />
        <img src="/clients/ultra.png" />
        <img src="/clients/fromental.png" />
        <img src="/clients/equitick.png" />
        <img src="/clients/zivav.png" />
        <img src="/clients/microgaming.png" />
        <img src="/clients/qmarkets.png" />
        <img src="/clients/tonara.png" />
      </section>
      <a href="mailto:ramijames@gmail.com?subject=Set up a call" class="button shiny large">Become a client</a>  
    </section>
  </main>

  <section class="home-projects">
    <MergedProjects />
  </section>

  <section id="Writing">
    <section class="writing-intro w-three-quarters">
      <h1>Thoughts</h1>
    </section>
    <main class="articles w-half">
      <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in selected_articles" :key="article.slug">
        <section class="info">
          <span class="title">{{ article.title }}</span>
          <span class="description">{{ article.summary }}</span>
        </section>
      </nuxt-link>
    </main>
  </section>
  
</template>

<script setup>
import selected_articles from '~/assets/selected_articles.json'

import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'

const COLUMNS = ref(24)
const GAP = 0
const gridItems = ref([])
const colors = ['374B22', '404AA4', '507ABA', '7D4793', 'ABC48C', 'B5803D', 'CDC7D5', 'ED6932']
let waveAnimationFrame = null
let waveTime = 0
let hoveredItem = null

// 3D tilt effect
const tiltX = ref(0)
const tiltY = ref(0)
const isMobile = ref(false)
const showOrientationButton = ref(false)

// Calculate responsive column count
function updateColumns() {
  const width = window.innerWidth
  if (width < 768) {
    COLUMNS.value = 8 // Phone
    isMobile.value = true
  } else if (width < 1024) {
    COLUMNS.value = 12 // Tablet
    isMobile.value = true
  } else if (width < 1440) {
    COLUMNS.value = 16 // Small desktop
    isMobile.value = false
  } else {
    COLUMNS.value = 24 // Large desktop
    isMobile.value = false
  }
}

function calculateGridItems() {
  const heroEl = document.querySelector('.mega-hero')
  if (!heroEl) return
  
  updateColumns() // Update column count based on screen size
  
  const heroHeight = heroEl.offsetHeight
  const heroWidth = heroEl.offsetWidth
  
  // Calculate the width of each grid item
  const totalGapWidth = GAP * (COLUMNS.value - 1)
  const itemWidth = (heroWidth - totalGapWidth) / COLUMNS.value
  
  // Items are square, so height equals width
  const itemHeight = itemWidth
  
  // Calculate how many rows we need
  const rows = Math.ceil(heroHeight / (itemHeight + GAP)) + 1
  
  // Create grid items with their positions
  const items = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < COLUMNS.value; col++) {
      // Randomly select an SVG from 1.svg to 20.svg
      const svgNumber = Math.floor(Math.random() * 20) + 1
      
      // Randomly select a color from the colors array
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      items.push(reactive({
        row: row,
        col: col,
        scale: 1,
        opacity: 0.1,
        baseScale: 1,
        baseOpacity: 0.1,
        left: col * (itemWidth + GAP),
        top: row * (itemHeight + GAP),
        width: itemWidth,
        height: itemHeight,
        svg: `/elements/${svgNumber}.svg`,
        color: color
      }))
    }
  }
  
  gridItems.value = items
}

function updateScales(item) {
  hoveredItem = item
  
  if (!hoveredItem) {
    // Reset to base values (which will be overridden by wave animation)
    gridItems.value.forEach(item => {
      item.baseScale = 1
      item.baseOpacity = 0.1
    })
    return
  }
  
  gridItems.value.forEach(item => {
    // Calculate grid distance (in grid units, not pixels)
    const rowDist = Math.abs(item.row - hoveredItem.row)
    const colDist = Math.abs(item.col - hoveredItem.col)
    const distance = Math.max(rowDist, colDist) // Chebyshev distance for square ripples
    
    // Set base scale and opacity based on distance
    if (distance === 0) {
      item.baseScale = 1.4 // Center item (the one being hovered)
      item.baseOpacity = 1
    } else if (distance === 1) {
      item.baseScale = 1.2 // First ring
      item.baseOpacity = 0.8
    } else if (distance === 2) {
      item.baseScale = 1.15 // Second ring
      item.baseOpacity = 0.5
    } else if (distance === 3) {
      item.baseScale = 1 // Third ring
      item.baseOpacity = 0.3
    } else {
      item.baseScale = 1 // Everything else
      item.baseOpacity = 0.1
    }
  })
}

function animateWaves() {
  waveTime += 0.05 // Slow increment for ocean-like movement
  
  gridItems.value.forEach(item => {
    // Create multiple overlapping sine waves for ocean effect
    const wave1 = Math.sin(item.col * 0.2 + item.row * 0.15 + waveTime) * 1 + 0.5
    const wave2 = Math.sin(item.col * 0.06 + item.row * 0.55 + waveTime) * .2 + 0.05
    
    // Combine waves for complex ocean-like movement
    const combinedWave = wave1 + wave2
    
    // Scale influence: more visible scaling from 1.0 to 1.4
    const waveScaleInfluence = combinedWave * 0
    
    // Opacity influence: more visible fade
    const waveOpacityInfluence = combinedWave * 0.2
    
    // Apply wave on top of base values (from hover interaction)
    item.scale = item.baseScale + waveScaleInfluence
    item.opacity = Math.min(1, item.baseOpacity + waveOpacityInfluence)
  })
  
  waveAnimationFrame = requestAnimationFrame(animateWaves)
}

function handleMouseMove(e) {
  if (isMobile.value) return // Skip mouse movement on mobile
  
  const heroEl = document.querySelector('.mega-hero')
  if (!heroEl) return
  
  const rect = heroEl.getBoundingClientRect()
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top
  
  // Calculate tilt based on mouse position relative to center
  // Range: -1 to 1, then multiply by max tilt angle
  const maxTilt = 1.5 // degrees
  tiltY.value = ((mouseX - centerX) / centerX) * maxTilt
  tiltX.value = ((centerY - mouseY) / centerY) * maxTilt
}

function handleDeviceOrientation(e) {
  // beta is the front-to-back tilt in degrees (-180 to 180)
  // gamma is the left-to-right tilt in degrees (-90 to 90)
  const beta = e.beta || 0
  const gamma = e.gamma || 0
  
  console.log('Device orientation:', { beta, gamma, isMobile: isMobile.value })
  
  // Normalize and constrain the tilt values
  const maxTilt = 15 // More pronounced for device tilt
  
  // Map beta (front-back) to tiltX (clamped to reasonable range)
  // For portrait mode on Android, adjust the mapping
  tiltX.value = Math.max(-maxTilt, Math.min(maxTilt, (beta - 60) / 3))
  
  // Map gamma (left-right) to tiltY
  tiltY.value = Math.max(-maxTilt, Math.min(maxTilt, gamma / 3))
  
  console.log('Calculated tilt:', { tiltX: tiltX.value, tiltY: tiltY.value })
}

async function requestOrientationPermission() {
  console.log('Requesting orientation permission...')
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS 13+ requires permission
    try {
      const permission = await DeviceOrientationEvent.requestPermission()
      console.log('iOS permission result:', permission)
      if (permission === 'granted') {
        window.addEventListener('deviceorientation', handleDeviceOrientation)
        showOrientationButton.value = false
      }
    } catch (error) {
      console.log('Device orientation permission denied', error)
      showOrientationButton.value = false
    }
  } else {
    // No permission needed (Android or older iOS)
    console.log('Adding deviceorientation listener (Android/older iOS)')
    window.addEventListener('deviceorientation', handleDeviceOrientation, true)
    showOrientationButton.value = false
    
    // Test if events are firing
    setTimeout(() => {
      console.log('Current tilt values after 2s:', { tiltX: tiltX.value, tiltY: tiltY.value })
    }, 2000)
  }
}

onMounted(() => {
  nextTick(() => {
    updateColumns() // Set isMobile first
    calculateGridItems()
    animateWaves() // Start wave animation
    
    // Request orientation permission for mobile devices
    if (isMobile.value) {
      // Check if this is iOS and needs permission
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        showOrientationButton.value = true
      } else {
        // Android or older iOS - just enable it
        requestOrientationPermission()
      }
    }
  })
  window.addEventListener('resize', calculateGridItems)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateGridItems)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('deviceorientation', handleDeviceOrientation)
  if (waveAnimationFrame) {
    cancelAnimationFrame(waveAnimationFrame)
  }
})
</script>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';

#Hero {
  width: 100%;
  position: relative;
  background: linear-gradient(-120deg, transparent 80%, rgba($blue, 0.15));
  background:  linear-gradient(-120deg, transparent 80%, rgba($blue, 0.15)), url('/desktop.jpg') no-repeat top right;
  background-size: cover;
  border-bottom: $border;

  @media screen and (max-width: 1280px){
    background-size: cover;
  }

  @media screen and (max-width: 1024px){
    background:  linear-gradient(-120deg, transparent 80%, rgba($blue, 0.15)), url('/mobile.jpg') no-repeat top right;
    background-size: cover;
  }

  .mega-hero {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-sm;
    padding: $spacing-md;
    position: relative;
    height: calc(100vh - 100px); // Minus the height of mega-content

    @media screen and (max-width: 768px){
      height: calc(100vh - 80px);
    }

    .grid-background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: all;
      z-index: 0;
      transform-style: preserve-3d;
      transition: transform 0.3s ease-out;

      .grid-item {
        position: absolute;
        background: transparent;
        border-radius: $br-sm;
        transition: transform 0.2s ease-out, opacity 0.2s ease-out;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: center center;

        svg {
          display: block;
        }
      }
    }

    .blur {
      position: absolute;
      z-index: 0;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(20px);
      background: rbga($black, 0.1);

       /* Default mask position (center) */
      --mx: 50%;
      --my: 50%;

      /* Soft circular reveal */
      -webkit-mask-image: radial-gradient(
        circle 320px at var(--mx) var(--my),
        rgba(0,0,0,0) 0%,
        rgba(0,0,0,0.1) 40%,
        rgba(0,0,0,0.2) 65%,
        rgba(0,0,0,1) 80%
      );

      mask-image: radial-gradient(
        circle 320px at var(--mx) var(--my),
        rgba(0,0,0,0) 0%,
        rgba(0,0,0,0.2) 15%,
        rgba(0,0,0,1) 80%
      );

      pointer-events: none;
    }

    h1 {
        font-size: 6rem;
        line-height: 80%;
        z-index: 1;
        text-shadow: -12px -20px 68px rgba($white, .36), 6px 10px 8px rgba($black, .6), 2px 4px 2px rgba($black, .6);

        @media screen and (max-width: 768px){
          font-size: 10vw;
        }
      }

      @media screen and (max-width: 768px){
        width: 100%;
        margin: 0 auto;
      }

      p {
        font-size: $font-size-xl;
        line-height: $font-size-xl;
        font-family: $font-family-main;
        font-weight: 200;
        max-width: 600px;
        text-wrap: balance;
        color: $red;
        opacity: 1;
        text-shadow: -20px -100px 800px rgba($red, 0.4), 1px 1px 2px rgba($black, 1);

        @media screen and (max-width: 1180px){
          max-width: 65%;
          font-size: $font-size-lg;
          line-height: $font-size-lg;
        }
      }

      .mega-title {
        position: absolute;
        top: $spacing-xl;
        left: $spacing-xl;
        z-index:1;
        pointer-events: none;

        @media screen and (max-width: 1024px){
          top: $spacing-md;
          left: $spacing-md;
        }

        @media screen and (max-width: 768px){
          bottom: calc($spacing-md + 100px);
          top: initial;
          left: $spacing-md;
        }
      }

    .orientation-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      padding: $spacing-md $spacing-lg;
      background: rgba($white, 0.9);
      color: $black;
      border: 2px solid $blue;
      border-radius: $br-md;
      font-size: $font-size-md;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      pointer-events: all;

      &:hover {
        background: $blue;
        color: $white;
        transform: translate(-50%, -50%) scale(1.05);
      }

      &:active {
        transform: translate(-50%, -50%) scale(0.95);
      }
    }
  }

  h2 {
    margin-top: 0;
    line-height: 140%;

    @media screen and (max-width: 768px){
      font-size: $font-size-lg;
    }
  }

}

.mega-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: $spacing-md;
  gap: $spacing-md;
  width: 100%;
  height: 100px;
  background: rgba($black, 0.85);
  border-top: $border;
  position: relative;

  &:after {
    content: '';
    height: 100%;
    width: 35%;
    background: linear-gradient(90deg, transparent, $black);
    display: block;
    position: absolute;
    z-index: 1;
    right: 0;
    backdrop-filter:blur(10px);
    mask-image: linear-gradient(90deg, transparent 0%, $black 40%);
    pointer-events: none;
  }

  h4 {
    margin: 0;
    text-wrap: nowrap;
  }

  .clients {
    display: flex;
    flex-direction: row;
    gap: $spacing-md;

    img {
      height: 22px;
      opacity: 0.4;
      transition: 0.2s all ease-in-out;
      mix-blend-mode:luminosity;

      &:hover {
        opacity: 1;
      }
    }
  }

  .button {
    position: absolute;
    z-index: 2;
    right: $spacing-md;

  }
}

#Writing {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: $spacing-lg;
  background: rgba($blue, 0.1);

  @media screen and (max-width: 768px){
    flex-direction: column;
    gap: $spacing-md;
    padding: 0 $spacing-md;
  }
  
  .writing-intro {
    display: flex;
    flex-direction: column;

    ul {

      li {
        list-style: none;
        margin-bottom: $spacing-md;

        a {
          text-decoration: none;
          font-weight: bold;
          font-size: $font-size-md;
          color: $black;
        }
      }
    }
  }

  .articles {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-sm;
    width: 100%;
  }

      @media screen and (max-width: 1120px) {
        .articles {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: $spacing-md;
        }
      }

      @media screen and (max-width: 768px) {
        .articles {
          display: grid;
          grid-template-columns: 1fr;
          gap: $spacing-sm;
          margin-bottom: $spacing-md;
        }
      }

  .articles a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: $font-size-lg;
    text-align: center;
    transition: all 0.35s ease-in-out;
    position: relative;

    .info {
      width: 100%;
      display:flex;
      flex-direction: column;
      padding: $spacing-sm 0;
      text-wrap: balance;
      text-align: left;

      .title {
        font-size: $font-size-lg;
        font-family: $font-family-main;
      }

      .description {
        font-size: $font-size-sm;
        font-family: $font-family-secondary;
        line-height: $font-size-md * $multiplier; 
        color: $white;
        margin-top: $spacing-xs;
        opacity: 0.6;
        font-weight: normal;
      }
    }
  }

  
}

#RecentWork {
  display: flex;
  flex-direction: column;
  margin: $spacing-lg auto;

  .work-intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 $spacing-md;

    @media screen and (max-width: 768px){
      padding: 0;
    }
  }

  h3 {
    padding: 0 $spacing-md;
  }
  
  
}

.home-projects {

  @media screen and (max-width: 768px){
    padding: 0;
  }
}

</style>