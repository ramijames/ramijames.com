<template>
  <div class="homepage">

    <!-- 1. Intro -->
    <section class="intro">
      <h1 ref="heroEl" class="intro-headline">I'm a <span
        class="hover-word"
        @mouseenter="showPopover('strategic', $event)"
        @mouseleave="hidePopover"
        @mousemove="movePopover"
      >strategic</span> designer with a <span
        class="hover-word"
        @mouseenter="showPopover('technical', $event)"
        @mouseleave="hidePopover"
        @mousemove="movePopover"
      >technical</span> mindset.</h1>
    </section>

    <!-- 2. Work -->
    <section class="section section-work">
      <Portfolio limit="highlights" />
    </section>

    <!-- 3. Thoughts -->
    <section class="section section-railed section-thoughts">
      <div class="section-rail">
        <span class="section-rail-title">Things I'm thinking about</span>
        <span class="section-rail-explainer">Short pieces on design, technology, and how I work.</span>
      </div>
      <div class="section-body">
        <FeaturedThoughts :articles="articles" />
        <div class="section-cta-row">
          <Button to="/thoughts" arrow text="See all thoughts" />
        </div>
      </div>
    </section>

    <!-- 4. Companies -->
    <section class="section section-railed section-companies">
      <div class="section-rail">
        <span class="section-rail-title">My work, in their words</span>
        <span class="section-rail-explainer">Notes from the people and teams I've shipped with.</span>
      </div>
      <div class="section-body">
        <HomepageTestimonials />
      </div>
    </section>

    <!-- 5. Learn -->
    <section class="section section-railed section-learn">
      <div class="section-rail">
        <span class="section-rail-title">Learn with me</span>
        <span class="section-rail-explainer">Tutorials and experiments in 3D, smart contracts, and design.</span>
      </div>
      <div class="section-body">
        <LearnIndex />
      </div>
    </section>

    <!-- 6. Footer -->
    <Footer />

    <div
      v-if="activePopover"
      :key="activePopover"
      class="word-popover"
      :style="{ top: popoverY + 'px', left: popoverX + 'px' }"
    >
      <svg class="popover-border" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <rect class="popover-border-rect" fill="none" stroke="currentColor" stroke-width="2" pathLength="100"/>
      </svg>
      <div class="popover-content">
        <div v-for="(line, lineIdx) in popoverWords[activePopover]" :key="lineIdx" class="popover-line">
          <span
            v-for="(word, wordIdx) in line"
            :key="wordIdx"
            class="popover-word"
            :style="{ '--word-index': lineIdx * line.length + wordIdx }"
          >{{ word }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import articles from '~/assets/articles.json'

const activePopover = ref(null)
const popoverX = ref(0)
const popoverY = ref(0)
const heroEl = ref(null)

const popoverWords = {
  strategic: [
    ['See', 'the', 'whole', 'board.'],
    ['Name', 'the', 'real', 'game.'],
    ['Place', 'the', 'smaller', 'bet.'],
    ['Walk', 'the', 'longer', 'road.'],
  ],
  technical: [
    ['Build', 'the', 'unfamiliar', 'shape.'],
    ['Wire', 'unlikely', 'things', 'together.'],
    ['Ship', 'before', "it's", 'too', 'late.'],
  ],
}

function showPopover(name, e) {
  activePopover.value = name
  movePopover(e)
}

function hidePopover() {
  activePopover.value = null
}

function movePopover(e) {
  popoverX.value = e.clientX + 16
  popoverY.value = e.clientY + 16
}

// Hero scroll-fade: as the user scrolls down past the first viewport, the
// hero h1 fades to opacity 0 and its line-height tightens.
let heroRaf = null
const HERO_LINE_HEIGHT_FROM = 1.1
const HERO_LINE_HEIGHT_TO = 0.7

function updateHero() {
  if (!heroEl.value) {
    heroRaf = null
    return
  }
  const y = window.scrollY || 0
  const distance = window.innerHeight * 0.6
  const progress = Math.min(1, Math.max(0, y / distance))
  heroEl.value.style.opacity = String(1 - progress)
  heroEl.value.style.lineHeight = String(
    HERO_LINE_HEIGHT_FROM + (HERO_LINE_HEIGHT_TO - HERO_LINE_HEIGHT_FROM) * progress
  )
  heroRaf = null
}

function onHeroScroll() {
  if (heroRaf == null) heroRaf = requestAnimationFrame(updateHero)
}

onMounted(() => {
  window.addEventListener('scroll', onHeroScroll, { passive: true })
  window.addEventListener('resize', onHeroScroll)
  updateHero()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onHeroScroll)
  window.removeEventListener('resize', onHeroScroll)
  if (heroRaf != null) cancelAnimationFrame(heroRaf)
})
</script>

<style lang="scss">
.homepage {
  position: relative;
  z-index: 1;
  color: var(--fg);
  font-weight: 300;
}

.homepage :where(h1, h2, h3, h4, h5, h6, p, span, a, li, blockquote, button, div),
.homepage .intro-headline,
.homepage .serif-word {
  color: var(--fg);
  font-weight: 300;
}

/* ---------- Intro ---------- */

.intro {
  position: relative;
  width: 80%;
  margin: 0 auto;
  padding-top: 180px;
  padding-right: 0;
  padding-left: 0;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: var(--fg);
}

.intro-headline {
  margin: 0;
  padding: 0;
  font-family: $font-family-main, sans-serif;
  font-weight: 300;
  font-size: calc(8.31579px + 4.94737vw);
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-align: center;
  color: var(--fg);
  gap: 0.04em;
  width: 100%;
  max-width: 720px;
  text-wrap: balance;

  .hover-word {
    text-decoration: underline dashed $black;
    text-underline-offset: 0.08em;
    text-decoration-thickness: 2px;
    cursor: help;
  }
}

.dark .intro-headline .hover-word {
  text-decoration: underline dashed $white;
  text-decoration-thickness: 2px;
}

.word-popover {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  min-width: 160px;
  padding: 40px;
  border-radius: 20px;
  background: var(--bg);
  font-family: $font-family-secondary, sans-serif;
  font-size: 17px;
  font-weight: 300;
  color: var(--fg);
  white-space: nowrap;
}

.popover-border {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.popover-border-rect {
  width: 100%;
  height: 100%;
  rx: 20px;
  ry: 20px;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  vector-effect: non-scaling-stroke;
  animation: popover-trace 0.35s ease forwards;
}

.popover-content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.popover-line {
  display: flex;
  gap: 0.3em;
}

.popover-word {
  font-weight: 300;
  opacity: 0;
  animation: popover-word-in 0.18s ease forwards;
  animation-delay: calc(0.3s + var(--word-index, 0) * 0.03s);
}

@keyframes popover-trace {
  to { stroke-dashoffset: 0; }
}

@keyframes popover-word-in {
  to { opacity: 1; }
}

/* ---------- Section frame ---------- */

.section {
  position: relative;
  padding-block: clamp(8rem, 18vh, 16rem);
  padding-inline: clamp($spacing-md, 6vw, $spacing-xl);
}

.section-head {
  margin-bottom: clamp($spacing-lg, 8vh, $spacing-xl);

  h2, h3 {
    margin: 0;
    padding: 0;
    color: var(--fg);
  }
}

.section-head-left { text-align: left; }

.section-head-right {
  text-align: right;

  h2 {
    display: inline-block;
  }
}
.section-head-center { text-align: center; }

.section-railed {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 40px;
  border-top: 1px solid rgb(var(--fg-rgb) / 0.15);
  padding-top: clamp($spacing-md, 4vh, $spacing-lg);

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }
}

.section-rail {
  position: sticky;
  top: 40px;
  align-self: start;
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  line-height: 1.4;
  color: var(--fg);
  text-align: left;

  @media screen and (max-width: 900px) {
    position: static;
    top: auto;
  }
}

.section-rail-title {
  font-weight: 700;
}

.section-rail-explainer {
  font-weight: 400;
  margin-left: 0.4em;
  opacity: 0.75;
}

.section-body {
  min-width: 0;
}

.section-cta-row {
  display: flex;
  justify-content: center;
  margin-top: $spacing-lg;
}

/* ---------- Mono scope: tint child components toward the current theme ---------- */

.mono-scope {
  color: var(--fg);

  h1, h2, h3, h4, h5, h6, p, a, span, li, button, blockquote {
    color: inherit;
  }

  img {
    filter: grayscale(1) contrast(1.05);
  }

  .project,
  .vertical-project,
  [class*="card"],
  [class*="panel"] {
    background: transparent;
  }

  * {
    border-color: var(--border-faint);
  }
}

/* ---------- Thoughts ---------- */

.section-thoughts {
  .thoughts-container > h2 {
    display: none;
  }

  .article-card {
    background: var(--bg) !important;
    color: var(--fg) !important;
    border: 1px solid rgb(var(--fg-rgb) / 0.15) !important;
  }

  .article-title,
  .article-date {
    color: var(--fg) !important;
  }

  .article-date {
    opacity: 0.6;
  }
}

/* ---------- Companies section ---------- */

.section-companies {
  text-align: left;

  .section-head {
    margin-bottom: clamp($spacing-xl, 12vh, 12rem);
  }
}

/* ---------- Hide "Let's work together" on homepage only ---------- */

.homepage footer .footer-cta {
  display: none;
}

/* ---------- Mobile: uniform 20px outer padding ---------- */

@media screen and (max-width: 700px) {
  .homepage .intro,
  .homepage .section {
    padding-inline: 20px;
  }

  .homepage .work-index .row,
  .homepage .learn-index .row {
    padding-inline: 0;
  }

  .homepage .section-thoughts .w-consistent {
    padding: 0;
  }
}
</style>
