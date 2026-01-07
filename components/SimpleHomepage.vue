<template>
  <main id="Hero">
    
    <section class="mega-hero">
      <section class="mega-content">
        <div>
          <span>Rami</span>
        </div>
        <img src="/rami_small_white.png">
        <div>
          <span>James</span>
          <small>Product Designer</small>
        </div>
      </section>
    </section>  
    <Clients />
    
    <LatestWork />
    <FeaturedThoughts :featured-articles="featuredArticles" :articles="regularArticles" />
    <Testimonials />

    <!-- <section id="Reasons">
      <VisibleThought />
      <PartnerNotVendor />
    </section> -->

  </main>
  
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
const colors = ['374B22', '404AA4', '507ABA', '7D4793', 'ABC48C', 'B5803D', 'CDC7D5', 'ED6932']
let waveAnimationFrame = null
let waveTime = 0
let hoveredItem = null

// 3D tilt effect
const tiltX = ref(0)
const tiltY = ref(0)
const isMobile = ref(false)
const showOrientationButton = ref(false)

// Parallax scroll offsets
const parallaxOffsets = reactive({
  figure1: 0,
  figure2: 0,
  figure3: 0,
  figure4: 0
})

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
        opacity: 0.5,
        baseScale: 1,
        baseOpacity: 0.5,
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
      item.baseOpacity = 0.6
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
  const maxTilt = 1.5 // degrees
  tiltY.value = ((mouseX - centerX) / centerX) * maxTilt
  tiltX.value = ((centerY - mouseY) / centerY) * maxTilt
}

// Parallax scroll handler
function handleScroll() {
  const scrollY = window.scrollY
  
  // Different parallax speeds for each figure
  // Negative values move up, positive values move down
  // Higher absolute values = faster movement
  parallaxOffsets.figure1 = scrollY * 0.3  // Moves down slowly
  parallaxOffsets.figure2 = scrollY * -0.2 // Moves up slowly
  parallaxOffsets.figure3 = scrollY * 0.4  // Moves down faster
  parallaxOffsets.figure4 = scrollY * -0.15 // Moves up very slowly
}

onMounted(() => {
  nextTick(() => {
    updateColumns()
    calculateGridItems()
    animateWaves()
  })
  window.addEventListener('resize', calculateGridItems)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateGridItems)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('scroll', handleScroll)
  if (waveAnimationFrame) {
    cancelAnimationFrame(waveAnimationFrame)
  }
})
</script>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';



#Hero {
  position: relative;
  background-size: cover;
  border-bottom: $border;

  .mega-hero {
    height: 80dvh;
    width: calc(100dvw - $spacing-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .mega-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: $spacing-sm;

      div {
        font-size: 6dvw;
        font-weight: 900;
        text-transform: uppercase;
        position: relative;
        letter-spacing: -.2dvw;

        small {
          position: absolute;
          bottom: .4dvw;
          right: 4px;
          font-size: 1.3dvw;
          letter-spacing: initial;
          font-weight: 500;
          opacity: 0.5;
          text-transform: Capitalize;
        }
      }

      img {
        max-width: 15dvw;
        border-radius: $br-sm;
      }
    }
  }

}

#Reasons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba($blue, 0.05);
  margin-top: $spacing-lg;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

</style>