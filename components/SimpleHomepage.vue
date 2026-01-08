<template>
  <main id="Hero">
    
    <section class="mega-hero">
      <section class="name">
        <img src="/dude.png">
        <div>This is the personal portfolio site of Rami James.</div>
      </section>
      <section class="actions">
        <div>
          <img src="/elements/1.svg"> Product Design
        </div>
        <div>
          <img src="/elements/7.svg"> Development
        </div>
        <div>
          <img src="/elements/14.svg"> Writing
        </div>
      </section>

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
          <svg :style="{ width: '50%', height: '50%' }">
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

  </main>

  <section class="homepage-content">
    <Clients />
    <LatestWork />
    <FeaturedThoughts :featured-articles="featuredArticles" :articles="regularArticles" />
    <Testimonials />
    <Footer />
  </section>
  
</template>

<script setup>

import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'

import articles from '~/assets/articles.json'

// Get the two latest articles as featured
const featuredArticles = computed(() => articles.slice(0, 4))

// Get remaining articles (excluding the first two)
const regularArticles = computed(() => articles.slice(4))

const COLUMNS = ref(32)
const GAP = 0
const gridItems = ref([])
const colors = ['FFFFFF']
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
    COLUMNS.value = 6 // Phone
    isMobile.value = true
  } else if (width < 1024) {
    COLUMNS.value = 8 // Tablet
    isMobile.value = true
  } else if (width < 1440) {
    COLUMNS.value = 12 // Small desktop
    isMobile.value = false
  } else {
    COLUMNS.value = 22 // Large desktop
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
      item.baseScale = 2.4 // Center item (the one being hovered)
      item.baseOpacity = 1
    } else if (distance === 1) {
      item.baseScale = 1.8 // First ring
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
  waveTime += 0.025 // Slow increment for ocean-like movement
  
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
  const maxTilt = 5 // degrees
  tiltY.value = ((mouseX - centerX) / centerX) * maxTilt
  tiltX.value = ((centerY - mouseY) / centerY) * maxTilt
}

onMounted(() => {
  nextTick(() => {
    updateColumns()
    calculateGridItems()
    animateWaves()
  })
  window.addEventListener('resize', calculateGridItems)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateGridItems)
  window.removeEventListener('mousemove', handleMouseMove)
  if (waveAnimationFrame) {
    cancelAnimationFrame(waveAnimationFrame)
  }
})

</script>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';



#Hero {
  position: fixed;
  background-size: cover;
  overflow: hidden;
  top: 0;
  width: 100%;

  .mega-hero {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: calc(100px  + $spacing-md);
    background: rgba($black, .96);
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 1000px) {
      padding: $spacing-sm;
      align-items: flex-start;
      justify-content: flex-end;
      gap: $spacing-md;
    }

    .name {
      font-size: 3dvw;
      font-weight: 400;
      position: absolute;
      z-index: 10;
      left: $spacing-md;
      bottom: $spacing-md;
      line-height: 100%;
      color: $white;
      text-wrap: balance;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: $spacing-sm;

      img {
        width: 10dvw;
      }

      @media screen and (max-width: 1000px) {
        font-size: 5dvw;
        position: relative;
        left: initial;
        bottom: initial;
        position: relative;
      }
    }

    .actions {
      right: $spacing-md;
      bottom: $spacing-md;
      position: absolute;
      z-index: 10;
      padding: $spacing-sm 0 $spacing-sm;
      font-size: 1.5dvw;
      font-weight: 500;
      border-top: 1px solid $white;
      border-bottom: 1px solid $white;
      color: $white;

      @media screen and (max-width: 1000px) {
        position: relative;
        right: initial;
        bottom: initial;
        margin: 0;
        font-size: 3dvw;
        width: calc(100%);
        padding: $spacing-sm 0;
      }

      div {
        display: flex;
        flex-direction: row;
        gap: $spacing-sm;
      }
    }

    img {
      width: 1dvw;

      @media screen and (max-width: 1000px) {
        width: 3dvw;
      }
    }

  }

  .grid-background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100dvh;
      pointer-events: all;
      z-index: 0;
      transform-style: preserve-3d;
      transition: transform 0.3s ease-out;
      -webkit-mask-image: radial-gradient(black, transparent);
      mask-image: radial-gradient(black, transparent );
      opacity: 0.5;

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

}

.dark .homepage-content {
  background: $black;
}

.homepage-content {
  background: $white;
  position: absolute;
  z-index: 2;
  top: 100dvh;
  width: 100%;
}

</style>