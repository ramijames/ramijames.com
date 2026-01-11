<template>
  <main id="Hero">
    
    <section 
      class="mega-hero"
      :style="{
        opacity: 1 - scrollProgress * 1
      }"
    >
      <section class="name">
        <img src="/dude.png" />
        <div class="rami">Rami James</div>
        <div class="occupation">Product Designer</div>
      </section>
      <section class="explainer">
        <!-- <img src="/dude.png" /> -->
        <h3>Hello there.</h3>
        <p class="intro-text">I'm a passionate Product Designer with a development background. I enjoy creating unique, user-friendly interfaces for both native and web applications across a range of platforms and use-cases.</p>
        <a href="mailto:ramijames@gmail.com" class="button">Hire me today</a>
      </section>
      <section class="links">
        <a href="https://github.com/ramijames">
          Github
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.71319 -6.09502e-05L11.1396 7.42639L3.7132 14.8528L-3.10162e-05 11.1396L3.7132 7.42639L-3.16422e-05 3.71317L3.71319 -6.09502e-05Z" fill="white"/>
          </svg>
        </a>
        <a href="https://github.com/ramijames/ramijames.com">
          Source
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.71319 -6.09502e-05L11.1396 7.42639L3.7132 14.8528L-3.10162e-05 11.1396L3.7132 7.42639L-3.16422e-05 3.71317L3.71319 -6.09502e-05Z" fill="white"/>
          </svg>
        </a>
        <a href="https://dribbble.com/ramijames">
          Dribbble
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.71319 -6.09502e-05L11.1396 7.42639L3.7132 14.8528L-3.10162e-05 11.1396L3.7132 7.42639L-3.16422e-05 3.71317L3.71319 -6.09502e-05Z" fill="white"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/rami-james/">
          LinkedIn
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.71319 -6.09502e-05L11.1396 7.42639L3.7132 14.8528L-3.10162e-05 11.1396L3.7132 7.42639L-3.16422e-05 3.71317L3.71319 -6.09502e-05Z" fill="white"/>
          </svg>
        </a>
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
    <!-- <FeaturedThoughts :featured-articles="featuredArticles" :articles="regularArticles" /> -->
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
const colors = ['F8C802', 'F8C802', 'F8C802', 'F8C802', 'F8C802', '82A0CE']
let waveAnimationFrame = null
let waveTime = 0
let hoveredItem = null

// 3D tilt effect
const tiltX = ref(0)
const tiltY = ref(0)
const isMobile = ref(false)
const showOrientationButton = ref(false)

// Scroll effect
const scrollProgress = ref(0)

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

function handleScroll() {
  // Calculate scroll progress (0 to 1) based on viewport height
  const scrolled = window.scrollY
  const viewportHeight = window.innerHeight
  
  // Progress will be 0 at top, 1 at 1 viewport height scrolled
  scrollProgress.value = Math.min(scrolled / viewportHeight, 1)
}

onMounted(() => {
  nextTick(() => {
    updateColumns()
    calculateGridItems()
    animateWaves()
  })
  window.addEventListener('resize', calculateGridItems)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll)
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

    .mega-hero {
      background: linear-gradient(to top, rgba(#222222, 1), rgba($black, .19));

      .name {
        color: $white;
      }

      .links {
        border-top: 1px solid rgba($white,0.2);
        color: $white;

        a {
          color: $white;

          svg {

            path {
              fill: rgba($white, 0.2);
            }
          }

          &:hover {
            color: $yellow;

            svg {

              path {
                fill: rgba($yellow, 1);
              }
            }
          }
        }
      }
    }
  }
}

#Hero {
  position: fixed;
  background-size: cover;
  overflow: hidden;
  top: 0;
  width: 100%;

  @media screen and (max-width: 768px) {
    position: relative;
  }

  .mega-hero {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, rgba(#ccc, 1), rgba($white, 1));
    transition: all 0.2s ease-in-out;
    position: fixed;
    width: 100%;

    @media screen and (max-width: 1000px) {
      justify-content: space-between;
      margin-top: 84px;
      height: calc(100% - 84px);
      align-items: flex-start;
      gap: $spacing-md;
    }

    .explainer {
      position: absolute;
      z-index: 10;
      left: $spacing-md;
      bottom: $spacing-md;
      line-height: 100%;
      text-wrap: balance;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: $spacing-sm;

      @media screen and (max-width: 1000px) {
        font-size: 8dvw;
        position: relative;
        left: initial;
        bottom: initial;
        position: relative;
        margin: 0 $spacing-md;
        width: auto;
        padding: $spacing-sm 0;
        max-width: initial;
        gap: $spacing-xs;
      }

      @media screen and (max-width: 768px) {
        display: none;
      }

      img {
        width: 10dvw;

        @media screen and (max-width: 1600px) {
          width: 20dvw;
        }
        
        @media screen and (max-width: 1000px) {
          display: none;
        }
      }

      h3 {
        margin: 0;
        font-weight: 400;
      }

      p {
        margin: 0 0 $spacing-xs;
        opacity: 0.6;
        font-family: $font-family-main;
      }

    }

    .name {
      z-index: 10;
      color: $black;
      text-wrap: nowrap;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 18dvw;
        margin-bottom: $spacing-md;

        @media screen and (max-width: 1600px) {
          width: 20dvw;
        }

        @media screen and (max-width: 1000px) {
          width: 40dvw;
        }

        @media screen and (max-width: 768px) {
          width: 40dvw;
          margin-bottom: $spacing-sm;
        }
      }

      .rami {
        font-size: 8dvw;
        line-height: 100%;
        font-weight: 500;

        @media screen and (max-width: 768px) {
          font-size: 12dvw;
        }
      }

      .occupation {
        font-size: 4dvw;
        font-weight: 500;
        font-style: italic;
        font-family: $font-family-serif;
        opacity: 0.2;
      }

      svg {
        width: 18dvw;
        margin-bottom: 1dvw;

        path, circle {
          fill: $yellow;
        }
      }

      @media screen and (max-width: 1000px) {
        font-size: 8dvw;
        position: relative;
        position: relative;
        margin: 0 $spacing-md;
        width: calc(100% - $spacing-md - $spacing-md);
        padding: $spacing-sm 0;
        justify-content: center;
      }
    }

    .links {
      right: $spacing-md;
      bottom: $spacing-md;
      position: absolute;
      z-index: 10;
      padding: $spacing-sm 0 0;
      font-size: $font-size-sm;
      font-weight: 400;
      border-top: 1px solid rgba($black,0.2);
      display: flex;
      flex-direction: column;
      min-width: 120px;
      
      a {
        color: rgba($black, 1);
        text-decoration: none;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        @media screen and (max-width: 1000px) {
          font-size: $font-size-lg;
          font-weight: 400;
        }

        svg {
          width: 6px;

          @media screen and (max-width: 1000px) {
            width: 10px;
          }

          path {
            fill: rgba($black, 0.2);

            @media screen and (max-width: 1000px) {
              fill: rgba($black, 1);
            }
          }
        }

        &:hover {
            color: rgba($black, 1);

            svg {

              path {
                fill: rgba($yellow, 1);
              }
            }
          }
      }

      @media screen and (max-width: 1000px) {
        position: relative;
        right: initial;
        bottom: initial;
        margin: 0 $spacing-md;
        width: calc(100% - $spacing-md - $spacing-md);
        padding: $spacing-sm 0;
        border: none;
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
      opacity: 0.6;

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