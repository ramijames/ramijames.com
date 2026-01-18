<template>

  <PageHeader title="Reactive Grids in Nuxt" tagline="Build a reactive & responsive grid of SVG elements that respond to mouse movement" />

  <section id="example" class="w-consistent">
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

  <main class="w-content page-top">
    <section class="content">

      <h2>Setting up your template</h2>
      <p>We'll be creating a reactive grid of SVG elements that respond to mouse movement and create a wave-like effect.</p>
      
      <p>To start, we'll need to set up a grid of SVG elements that will be responsive to mouse movement. This will render an array that is calculated based on the number of columns and rows that fit in this screen size. This makes this automatically responsive!</p>

      <CodeBlock :code="templateCode" lang="vue" />

      <p>There's surprisingly little styling that is required for this!</p>

      <CodeBlock :code="scssCode" lang="scss" />


      <h2>Calculating the grid items</h2>
      <p>Next, we'll need to calculate the grid items based on the number of columns and rows that fit in the screen size. We'll also randomly assign an SVG and color to each grid item.</p>

      <CodeBlock :code="scriptCode" lang="javascript" />

      <h2>Conclusion</h2>
      <p>So, this is a fun little experiment that I think could be used in a lot of different ways. I think it would be cool to see this used in a more subtle way as a background for a site. I think it could also be used as a loading animation or a background for a hero section. I think the possibilities are endless.</p>
    </section>
  </main>
  <PostsExtras />
  <Footer />
</template>

<script setup>

import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'

useHead({
  title: 'Reactive Grids in Nuxts'
})

useSeoMeta({
  title: 'Reactive Grids in Nuxt',
  ogTitle: 'Reactive Grids in Nuxt',
  description: 'Build a reactive & responsive grid of SVG elements that respond to mouse movement.',
  ogDescription: 'Build a reactive & responsive grid of SVG elements that respond to mouse movement.',
  ogImage: '/articles/reactive-grid.png',
  url: 'https://www.ramijames.com/thoughts/reactive-grids-in-nuxt',
  twitterTitle: 'Reactive Grids in Nuxt',
  twitterDescription: 'Build a reactive & responsive grid of SVG elements that respond to mouse movement.',
  twitterImage: '/articles/reactive-grid.png',
  twitterCard: 'summary_large_image'
})

// Code examples for the article
const templateCode = `<section id="example" class="w-consistent">
  <section
    class="grid-background"
    :style="{
      transform: \`perspective(1000px) rotateX(\${tiltX}deg) rotateY(\${tiltY}deg)\`
    }"
  >
    <div
      v-for="(item, index) in gridItems"
      :key="index"
      class="grid-item"
      @mouseenter="!isMobile && updateScales(item)"
      @mouseleave="!isMobile && updateScales(null)"
      :style="{
        left: \`\${item.left}px\`,
        top: \`\${item.top}px\`,
        width: \`\${item.width}px\`,
        height: \`\${item.height}px\`,
        transform: \`scale(\${item.scale})\`,
        opacity: item.opacity
      }"
    >
      <svg :style="{ width: '50%', height: '50%' }">
        <defs>
          <mask :id="\`mask-\${index}\`">
            <image :href="item.svg" width="100%" height="100%" />
          </mask>
        </defs>
        <rect width="100%" height="100%" :fill="\`#\${item.color}\`" :mask="\`url(#mask-\${index})\`" />
      </svg>
    </div>
  </section>
</section>`

const scssCode = `.grid-background {
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
}`

const scriptCode = `import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'

const COLUMNS = ref(32)
const GAP = 0
const gridItems = ref([])
const colors = ['cccccc']
let waveAnimationFrame = null
let waveTime = 0
let hoveredItem = null

const tiltX = ref(0)
const tiltY = ref(0)
const isMobile = ref(false)

function updateColumns() {
  const width = window.innerWidth
  if (width < 768) {
    COLUMNS.value = 6
    isMobile.value = true
  } else if (width < 1024) {
    COLUMNS.value = 8
    isMobile.value = true
  } else if (width < 1440) {
    COLUMNS.value = 12
    isMobile.value = false
  } else {
    COLUMNS.value = 22
    isMobile.value = false
  }
}

function calculateGridItems() {
  const heroEl = document.querySelector('#example')
  if (!heroEl) return

  updateColumns()

  const heroHeight = heroEl.offsetHeight
  const heroWidth = heroEl.offsetWidth

  const totalGapWidth = GAP * (COLUMNS.value - 1)
  const itemWidth = (heroWidth - totalGapWidth) / COLUMNS.value
  const itemHeight = itemWidth

  const rows = Math.ceil(heroHeight / (itemHeight + GAP)) + 1

  const items = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < COLUMNS.value; col++) {
      const svgNumber = Math.floor(Math.random() * 20) + 1
      const color = colors[Math.floor(Math.random() * colors.length)]

      items.push(reactive({
        row, col, scale: 1, opacity: 0.1,
        baseScale: 1, baseOpacity: 0.1,
        left: col * (itemWidth + GAP),
        top: row * (itemHeight + GAP),
        width: itemWidth, height: itemHeight,
        svg: \`/elements/\${svgNumber}.svg\`,
        color
      }))
    }
  }

  gridItems.value = items
}

function updateScales(item) {
  hoveredItem = item

  if (!hoveredItem) {
    gridItems.value.forEach(item => {
      item.baseScale = 1
      item.baseOpacity = 0.1
    })
    return
  }

  gridItems.value.forEach(item => {
    const rowDist = Math.abs(item.row - hoveredItem.row)
    const colDist = Math.abs(item.col - hoveredItem.col)
    const distance = Math.max(rowDist, colDist)

    if (distance === 0) {
      item.baseScale = 2.4
      item.baseOpacity = 1
    } else if (distance === 1) {
      item.baseScale = 1.8
      item.baseOpacity = 0.8
    } else if (distance === 2) {
      item.baseScale = 1.15
      item.baseOpacity = 0.5
    } else if (distance === 3) {
      item.baseScale = 1
      item.baseOpacity = 0.3
    } else {
      item.baseScale = 1
      item.baseOpacity = 0.1
    }
  })
}

function animateWaves() {
  waveTime += 0.025

  gridItems.value.forEach(item => {
    const wave1 = Math.sin(item.col * 0.2 + item.row * 0.15 + waveTime) * 1 + 0.5
    const wave2 = Math.sin(item.col * 0.06 + item.row * 0.55 + waveTime) * .2 + 0.05
    const combinedWave = wave1 + wave2

    const waveScaleInfluence = combinedWave * 0
    const waveOpacityInfluence = combinedWave * 0.2

    item.scale = item.baseScale + waveScaleInfluence
    item.opacity = Math.min(1, item.baseOpacity + waveOpacityInfluence)
  })

  waveAnimationFrame = requestAnimationFrame(animateWaves)
}

onMounted(() => {
  nextTick(() => {
    updateColumns()
    calculateGridItems()
    animateWaves()
  })
  window.addEventListener('resize', calculateGridItems)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateGridItems)
  if (waveAnimationFrame) {
    cancelAnimationFrame(waveAnimationFrame)
  }
})`

const COLUMNS = ref(32)
const GAP = 0
const gridItems = ref([])
const colors = ['cccccc']
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
  const heroEl = document.querySelector('#example')
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
  const maxTilt = 1.5 // degrees
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
#example {
  width: 100%;
  height: 800px;
  overflow: hidden;
  position: relative;
  background: $black;
  border-radius: $br-sm;
  border: 1px solid rgba($black, 0.2);
  margin-bottom: $spacing-lg;

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

}

</style>
