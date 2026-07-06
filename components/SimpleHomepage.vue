<template>
  <div class="homepage">

    <!-- 1. Intro -->
    <section ref="introEl" class="intro" :class="{ 'hero-ready': heroReady }">
      <div class="intro-inner">
        <span class="intro-eyebrow">
          <span
            v-for="(word, i) in eyebrowWords"
            :key="i"
            class="eyebrow-word"
            :style="{ '--ei': i }"
          ><span class="eyebrow-word-inner">{{ word }}</span></span>
        </span>
        <h1 ref="heroEl" class="intro-headline">
          <span
            v-for="(word, i) in headlineWords"
            :key="i"
            class="hl-word"
          ><span
            v-for="(ch, ci) in word.split('')"
            :key="ci"
            :class="['hl-char', { 'hl-char--fixed': !isLetter(ch) }]"
          >{{ ch }}</span></span>
        </h1>
      </div>
    </section>

    <StackCards :cards="stackCards" />

    <!-- Temporarily hidden: timeline (Work), testimonials (My work, in their
         words), and Learn sections. -->
    <!--
    <section class="section section-work">
      <WorkStory />
      <div class="section-cta-row">
        <Button to="/products" arrow text="See all products" />
      </div>
    </section>

    <section class="section section-railed section-companies">
      <div class="section-rail">
        <span class="section-rail-title">My work, in their words</span>
        <span class="section-rail-explainer">Notes from the people and teams I've shipped with.</span>
      </div>
      <div class="section-body">
        <HomepageTestimonials />
      </div>
    </section>

    <section class="section section-railed section-learn">
      <div class="section-rail">
        <span class="section-rail-title">Learn with me</span>
        <span class="section-rail-explainer">Tutorials and experiments in 3D, smart contracts, and design.</span>
      </div>
      <div class="section-body">
        <LearnIndex />
      </div>
    </section>
    -->

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
import { products } from '~/utils/products'

const activePopover = ref(null)
const popoverX = ref(0)
const popoverY = ref(0)
const heroEl = ref(null)
const introEl = ref(null)
const heroReady = ref(false)

// Hero headline, split into words for the masked slide-up reveal.
const headlineWords = 'Simplicity in complexity'.split(' ')

// Eyebrow words for the masked word-by-word reveal (after the headline fades).
const eyebrowWords = 'Innovation in developer tooling'.split(' ')

// Full-screen sticky stacking cards — every project on the site.
const stackCards = products.map((p) => ({
  title: p.title,
  description: p.description,
  cta: 'View case study',
  to: p.slug,
  image: p.images?.default || p.image,
}))

// Only letters get the cursor-driven weight spotlight; symbols (the heart) and
// its variation selector stay at a fixed weight.
const isLetter = (ch) => /\p{L}/u.test(ch)

const popoverWords = {
  designer: [
    ['Start', 'with', 'the', 'human.'],
    ['Cut', 'what', "doesn't", 'help.'],
    ['Make', 'the', 'complex', 'feel', 'simple.'],
  ],
  developer: [
    ['Read', 'the', 'codebase.'],
    ['Ship', 'the', 'prototype.'],
    ['Trust', 'what', 'actually', 'runs.'],
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
  if (introEl.value) introEl.value.style.opacity = String(1 - progress)
  heroEl.value.style.lineHeight = String(
    HERO_LINE_HEIGHT_FROM + (HERO_LINE_HEIGHT_TO - HERO_LINE_HEIGHT_FROM) * progress
  )
  // Letter centers are viewport-relative and the hero scrolls with the page, so
  // keep them fresh while scrolling.
  if (charEls.length) measureCharCenters()
  heroRaf = null
}

function onHeroScroll() {
  if (heroRaf == null) heroRaf = requestAnimationFrame(updateHero)
}

// Cursor-driven weight spotlight: each headline letter's font-weight scales with
// how close the pointer is to it (near = heavy, far = light). Centers are cached
// (measured on enter/resize) so weight changes don't feed back into layout.
const WEIGHT_MIN = 400
const WEIGHT_MAX = 900
const WEIGHT_REST = 400
const WEIGHT_RADIUS = 320 // px falloff from a letter's center
let charEls = []
let charCenters = []
let pointerX = 0
let pointerY = 0
let weightRaf = null

function measureCharCenters() {
  charCenters = charEls.map((el) => {
    const r = el.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  })
}

function applyWeights() {
  weightRaf = null
  for (let i = 0; i < charEls.length; i++) {
    const c = charCenters[i]
    if (!c) continue
    const d = Math.hypot(pointerX - c.x, pointerY - c.y)
    const t = Math.max(0, 1 - d / WEIGHT_RADIUS)
    charEls[i].style.fontWeight = String(Math.round(WEIGHT_MIN + t * (WEIGHT_MAX - WEIGHT_MIN)))
  }
}

function onHeadlinePointerMove(e) {
  pointerX = e.clientX
  pointerY = e.clientY
  // Lazily measure if we never got a pointerenter (cursor already over the hero
  // on load), so the spotlight works on the very first move.
  if (charCenters.length !== charEls.length) measureCharCenters()
  if (weightRaf == null) weightRaf = requestAnimationFrame(applyWeights)
}

function onHeadlinePointerEnter(e) {
  measureCharCenters()
  onHeadlinePointerMove(e)
}

function resetWeights() {
  for (const el of charEls) el.style.fontWeight = String(WEIGHT_REST)
}

onMounted(() => {
  window.addEventListener('scroll', onHeroScroll, { passive: true })
  updateHero()
  // Trigger the text fade-in after the first paint.
  requestAnimationFrame(() => requestAnimationFrame(() => { heroReady.value = true }))

  // Wire up the per-letter weight spotlight across the hero section.
  charEls = heroEl.value ? Array.from(heroEl.value.querySelectorAll('.hl-char:not(.hl-char--fixed)')) : []
  if (introEl.value) {
    introEl.value.addEventListener('pointerenter', onHeadlinePointerEnter)
    introEl.value.addEventListener('pointermove', onHeadlinePointerMove)
    introEl.value.addEventListener('pointerleave', resetWeights)
  }
  window.addEventListener('resize', measureCharCenters)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onHeroScroll)
  if (heroRaf != null) cancelAnimationFrame(heroRaf)
  if (weightRaf != null) cancelAnimationFrame(weightRaf)
  if (introEl.value) {
    introEl.value.removeEventListener('pointerenter', onHeadlinePointerEnter)
    introEl.value.removeEventListener('pointermove', onHeadlinePointerMove)
    introEl.value.removeEventListener('pointerleave', resetWeights)
  }
  window.removeEventListener('resize', measureCharCenters)
})
</script>

<style lang="scss">
.homepage {
  position: relative;
  z-index: 1;
  color: var(--fg);
  font-weight: 300;
}

/* No shadows anywhere on the homepage. */
.homepage,
.homepage *,
.homepage *::before,
.homepage *::after {
  box-shadow: none !important;
  text-shadow: none !important;
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
  min-height: 70dvh;
  margin: 0 auto;
  padding-top: 80px;
  padding-right: 0;
  padding-left: 0;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--fg);
}

.intro-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-md;
  width: 100%;
}

.intro-eyebrow {
  font-family: $font-family-main, sans-serif;
  font-size: clamp(0.7rem, 0.8vw, 0.8rem);
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: center;
  color: var(--fg);
  opacity: 0.6;
  user-select: none;
  -webkit-user-select: none;
}

/* Each eyebrow word sits in an overflow-clipped mask and slides up into view,
   staggered word by word — starting after the headline has faded in. */
.eyebrow-word {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  padding-bottom: 0.06em;
}

.eyebrow-word:not(:last-child) { margin-right: 0.35em; }

.eyebrow-word-inner {
  display: inline-block;
  transform: translateY(130%);
}

.hero-ready .eyebrow-word-inner {
  transform: translateY(0);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(0.85s + var(--ei, 0) * 0.12s);
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
  width: 100%;
  max-width: 1100px;
  text-wrap: balance;
  user-select: none;
  -webkit-user-select: none;
  /* Simple fade-in on load; the cursor-weight effect is live immediately. */
  opacity: 0;
}

.hero-ready .intro-headline {
  opacity: 1;
  transition: opacity 0.8s ease;
}

.hl-word {
  display: inline-block;
}

.hl-word:not(:last-child) { margin-right: 0.22em; }

/* Per-letter spans whose weight is driven from the cursor distance (JS). The
   transition smooths the weight as the spotlight sweeps across / leaves. */
.hl-char {
  display: inline-block;
  font-weight: 400;
  transition: font-weight 0.2s ease;
  will-change: font-weight;
}

.hl-char--fixed {
  font-weight: 400;
  transition: none;
  will-change: auto;
}

.word-popover {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  min-width: 160px;
  padding: 40px;
  border-radius: 20px;
  background: var(--bg);
  font-family: $font-family-main, sans-serif;
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
  font-family: $font-family-main, sans-serif;
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

/* Work section hosts the git-graph timeline, which manages its own 80%-centered
   width (aligned to the hero), so drop the section's horizontal padding. */
.section-work {
  padding-inline: 0;
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
}
</style>
