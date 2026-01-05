<template>
  <main id="Hero">
    <img 
      src="/homepage/figure1.png" 
      class="figure-one"
      :style="{ transform: `translateY(${parallaxOffsets.figure1}px)` }"
    >
    <img 
      src="/homepage/figure2.png" 
      class="figure-two"
      :style="{ transform: `translateY(${parallaxOffsets.figure2}px)` }"
    >
    <img 
      src="/homepage/figure3.png" 
      class="figure-three"
      :style="{ transform: `translateY(${parallaxOffsets.figure3}px)` }"
    >
    <img 
      src="/homepage/figure4.png" 
      class="figure-four"
      :style="{ transform: `translateY(${parallaxOffsets.figure4}px)` }"
    >
    <section class="mega-hero">
      <section class="mega-title">
        <h1>Principal<br>Product<br>Designer</h1>
        <p>My name is Rami James, and I work as a user-interface, user-experience, interaction, and design professional.</p>
        <section class="button-set">
          <nuxt-link to="/products" class="button shiny">Browse case studies</nuxt-link>  
          <a href="mailto:ramijames@gmail.com?subject=Set up a call" class="button blue">Become a client</a>  
        </section>
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
    
    <LatestWork />
    <FeaturedThoughts :featured-articles="featuredArticles" :articles="regularArticles" />
    <Clients />
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

.dark {
  #Hero {
    background-color: $black;

    .figure-one {
      position: absolute;
      top: -200px;
      right: 200px;
      z-index:10;
      width: 15%;
      will-change: transform;
      transition: transform 0.1s ease-out;
      max-width: 200px;
      filter:blur(15px);
      pointer-events: none;
      opacity:0.6;

      @media screen and (max-width: 1000px){
        display: none;
      }
    }

    .figure-two {
      position: absolute;
      top: 24%;
      right: 12%;
      z-index:10;
      width: 20%;
      will-change: transform;
      transition: transform 0.1s ease-out;
      max-width: 200px;
      pointer-events: none;

      @media screen and (max-width: 1000px){
        display: none;
      }
    }

    .figure-three {
      position: absolute;
      top: 20%;
      right: 40px;
      z-index:9;
      width: 20%;
      will-change: transform;
      transition: transform 0.1s ease-out;
      max-width: 200px;
      filter:blur(15px);
      pointer-events: none;
      opacity:0.6;

      @media screen and (max-width: 1000px){
        display: none;
      }
    }

    .figure-four {
      position: absolute;
      top: 5%;
      right: 5%;
      z-index:10;
      width: 25%;
      will-change: transform;
      transition: transform 0.1s ease-out;
      max-width: 200px;
      pointer-events: none;

      @media screen and (max-width: 1000px){
        display: none;
      }
    }

    .mega-hero {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: $spacing-sm;
      padding: $spacing-md;
      position: relative;
      height: calc(100dvh - 80px);
      overflow: hidden;

      @media screen and (max-width: 768px){
        height: calc(100dvh - 120px);
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
        -webkit-mask-image: linear-gradient(black, transparent);
        mask-image: linear-gradient(black, transparent);

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

      h1 {
          font-size: 6rem;
          line-height: 100%;
          margin-bottom: $spacing-sm;
          z-index: 1;

          @media screen and (max-width: 768px){
            font-size: 2.4rem;
          }
        }

        @media screen and (max-width: 768px){
          width: 100%;
          margin: 0 auto;
        }

        p {
          font-size: $font-size-lg;
          line-height: $font-size-lg;
          font-family: $font-family-main;
          font-weight: 200;
          max-width: 600px;
          text-wrap: balance;
          color: $white;
          opacity: 0.8;
          text-shadow: -20px -100px 800px rgba($red, 0.4), 1px 1px 2px rgba($black, 1);

          @media screen and (max-width: 1180px){
            max-width: 65%;
            font-size: $font-size-lg;
            line-height: $font-size-lg;
          }

          @media screen and (max-width: 768px){
            max-width: calc(100% - $spacing-md);
            font-size: 16px;
            line-height: $font-size-lg;
          }
        }

        .mega-title {
          position: absolute;
          bottom: $spacing-xl;
          left: $spacing-xl;
          z-index:1;

          @media screen and (max-width: 1200px){
            bottom: $spacing-lg;
            left: $spacing-lg;
          }
          
          @media screen and (max-width: 768px){
            bottom: $spacing-md;
            left: $spacing-md;
          }

          .button-set {
            display: flex;
            flex-direction: row;
            gap: $spacing-sm;

            @media screen and (max-width: 768px){
              flex-direction: column;
              gap: $spacing-xs;
              align-items: flex-start;

              .button {
                width: calc(100% - $spacing-md);
              }
            }
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
}

#Hero {
  width: 100%;
  position: relative;
  background-color: $white;
  background-size: cover;
  border-bottom: $border;

  .figure-one {
    position: absolute;
    top: -200px;
    right: 200px;
    z-index:10;
    width: 15%;
    will-change: transform;
    transition: transform 0.1s ease-out;
    max-width: 200px;
    filter:blur(15px);
    pointer-events: none;
    opacity:0.6;

    @media screen and (max-width: 1000px){
      display: none;
    }
  }

  .figure-two {
    position: absolute;
    top: 24%;
    right: 12%;
    z-index:10;
    width: 20%;
    will-change: transform;
    transition: transform 0.1s ease-out;
    max-width: 200px;
    pointer-events: none;

    @media screen and (max-width: 1000px){
      display: none;
    }
  }

  .figure-three {
    position: absolute;
    top: 20%;
    right: 40px;
    z-index:9;
    width: 20%;
    will-change: transform;
    transition: transform 0.1s ease-out;
    max-width: 200px;
    filter:blur(15px);
    pointer-events: none;
    opacity:0.6;

    @media screen and (max-width: 1000px){
      display: none;
    }
  }

  .figure-four {
    position: absolute;
    top: 5%;
    right: 5%;
    z-index:10;
    width: 25%;
    will-change: transform;
    transition: transform 0.1s ease-out;
    max-width: 200px;
    pointer-events: none;

    @media screen and (max-width: 1000px){
      display: none;
    }
  }

  .mega-hero {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: $spacing-sm;
    padding: $spacing-md;
    position: relative;
    height: calc(80dvh - 80px);
    overflow: hidden;

    @media screen and (max-width: 768px){
      height: calc(100dvh - 120px);
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
      -webkit-mask-image: linear-gradient(black, transparent);
      mask-image: linear-gradient(black, transparent);

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

    h1 {
        font-size: 6rem;
        line-height: 100%;
        margin: 0 0 $spacing-sm -0.5rem;
        z-index: 1;

        @media screen and (max-width: 768px){
          font-size: 2.4rem;
        }
      }

      @media screen and (max-width: 768px){
        width: 100%;
        margin: 0 auto;
      }

      p {
        font-size: $font-size-lg;
        line-height: $font-size-lg;
        font-family: $font-family-main;
        font-weight: 200;
        max-width: 600px;
        text-wrap: balance;
        opacity: 0.8;

        @media screen and (max-width: 1180px){
          max-width: 65%;
          font-size: $font-size-lg;
          line-height: $font-size-lg;
        }

        @media screen and (max-width: 768px){
          max-width: calc(100% - $spacing-md);
          font-size: 16px;
          line-height: $font-size-lg;
        }
      }

      .mega-title {
        position: absolute;
        bottom: $spacing-xl;
        left: $spacing-xl;
        z-index:1;

        @media screen and (max-width: 1200px){
          bottom: $spacing-lg;
          left: $spacing-lg;
        }
        
        @media screen and (max-width: 768px){
          bottom: $spacing-md;
          left: $spacing-md;
        }

        .button-set {
          display: flex;
          flex-direction: row;
          gap: $spacing-sm;

          @media screen and (max-width: 768px){
            flex-direction: column;
            gap: $spacing-xs;
            align-items: flex-start;

            .button {
              width: calc(100% - $spacing-md);
            }
          }
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