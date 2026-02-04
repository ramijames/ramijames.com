<template>
  <section class="scroll-progress" :style="{ height:  `${scrollProgress * 90 }vh` }"></section>
  <div ref="snapContainer" class="snap-container">
    <main id="Hero" class="snap-section">
      <section class="three-scene">
        <ThreeScene :scroll-progress="scrollProgress" />
      </section>

      <section class="content-blast">
        <div class="reveal">
          <h1><span>Helping early stage & established businesses bring their products into focus</span></h1>
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 29L29 37L37 29" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M29 37L29 21" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <rect x="1" y="1" width="56" height="56" rx="5" stroke="white" stroke-width="2"/>
          </svg>


        </div>
      </section>
    </main>

    <section id="ServiceProductDesign" class="snap-section">
      <section class="content-blast">
        <div class="reveal">
          <h2><span>Through Thoughtful Product Design,</span></h2>
          <p>[ I design interfaces that convert. From wireframes to pixel-perfect screens, I craft experiences that drive engagement and help your product stand out. ]</p>
        </div>
      </section>
    </section>

    <section id="ServiceUXStrategy" class="snap-section">
      <section class="content-blast">
        <div class="reveal">
          <h2><span>Unique UX Strategy,</span></h2>
          <p>[ Research-driven strategy that uncovers what your users actually need. I map journeys, validate assumptions, and create blueprints that reduce costly pivots. ]</p>
        </div>
      </section>
    </section>

    <section id="ServiceProductDesign" class="snap-section">
      <section class="content-blast">
        <div class="reveal">
          <h2><span>And By Building Rock Solid Design Systems.</span></h2>
          <p>[ Scalable component libraries and design tokens that keep your team aligned. Ship faster with consistent UI that developers can implement without guesswork. ]</p>
        </div>
      </section>
    </section>

    <section class="snap-section">
      <LatestWork />
    </section>

    <section class="snap-section testimonials-section">
      <SimpleTestimonials />
    </section>

    <section class="snap-section footer-section">
      <Footer />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const scrollProgress = ref(0)
const snapContainer = ref(null)

const handleScroll = () => {
  if (!snapContainer.value) return

  const scrollTop = snapContainer.value.scrollTop
  const scrollHeight = snapContainer.value.scrollHeight
  const clientHeight = snapContainer.value.clientHeight
  const maxScroll = scrollHeight - clientHeight

  // Calculate progress: 0 at top, 1 at bottom of all content
  const progress = maxScroll > 0 ? scrollTop / maxScroll : 0
  scrollProgress.value = progress
  console.log('scroll:', scrollTop, 'max:', maxScroll, 'progress:', progress.toFixed(3))
}

onMounted(async () => {
  await nextTick()
  console.log('snapContainer ref:', snapContainer.value)
  if (snapContainer.value) {
    snapContainer.value.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  }
})

onUnmounted(() => {
  if (snapContainer.value) {
    snapContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style lang="scss" scoped>

.scroll-progress {
  position: fixed;
  z-index: 10000;
  top: 62px;
  left: $spacing-sm;
  width: 2px;
  border-radius: 2px;
  mix-blend-mode: difference;
  background: $white;
}
.snap-container {
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.snap-section {
  height: 100dvh;
  width: 100vw;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
}

.testimonials-section {
  position: relative;
  z-index: 2;
}

.footer-section {
  height: auto;
  min-height: 100vh;
  scroll-snap-align: start;
}

#Hero,
#ServiceProductDesign {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 0;

  @media screen and (max-width: 768px) {
    position: relative;
  }

  .three-scene {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100vw - 15px);
    height: 100dvh;
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    animation: fade 1s forwards;
    transition-timing-function: cubic-bezier(0.355, 0.965, 0.670, 0.970);
    animation-delay: 1s;

    @media screen and (max-width: 768px) {
      width: 100vw;
      height: 100vh;
    }
  }
}

.content-blast {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  z-index: 1;
  padding: $spacing-xl;
  pointer-events: none;
  height: calc(100% - 62px);
  margin:62px auto 0;
  align-self: center;
  gap: $spacing-sm;
  max-width: 100%;
  container-type: inline-size;
  
  @media screen and (max-width: 1200px) {
    padding: $spacing-lg $spacing-md $spacing-lg $spacing-lg;
  }

  @media screen and (max-width: 768px) {
    padding: $spacing-md $spacing-sm $spacing-md $spacing-md;
  }


  .reveal {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
  }


  h1 {
    line-height: 110%;
    margin: 0;
    text-align: left;
    font-family: $font-family-main;
    text-wrap: balance;
    max-width: 50vw;
    font-size: 4cqw;

    @media screen and (max-width: 1000px) {
      font-size: 8cqw;
      max-width: 80%;
    }

    @media screen and (max-height: 900px) {
      font-size: $font-size-xxl;
      max-width: 80%;
    }
  }

  h2 {
    line-height: 120%;
    margin: 0 0 $spacing-sm 0;
    text-align: left;
    font-family: $font-family-main;
    text-wrap: balance;
    width: 80vw;
    max-width: 600px;
    font-size: 3cqw;

    @media screen and (max-width: 1000px) {
      font-size: $font-size-xl;
      max-width: 80%;
    }
  }

  p {
    font-size: $font-size-lg;
    line-height: 140%;
    margin: 0;
    text-align: left;
    font-family: $font-family-main;
    text-wrap: balance;
    width: 80vw;
    max-width: 400px;
    opacity: 0.5;

    @media screen and (max-width: 1000px) {
      font-size: $font-size-md;
      width: 80%;
    }
  }

  svg {
    path {
      stroke: $black;
    }

    rect {
      stroke: none;
      fill: rgba($white, .4);
      backdrop-filter: blur(128px);
    }
  }
}

.dark {
  #Hero {
    background: $black;
  }

  .content-blast {

    h1, h2 {
      color: $white;
      text-shadow: .1cqw .2cqw 0px rgba($black, 1);
    }
  }
    
}
</style>
