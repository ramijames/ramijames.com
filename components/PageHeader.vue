<template>
  <main ref="headerEl" class="page-header">
    <div class="content">
      <span v-if="eyebrow" class="page-eyebrow">{{ eyebrow }}</span>
      <h1 ref="titleEl" class="page-title">
        <span
          v-for="(word, wi) in titleWords"
          :key="wi"
          class="hl-word"
        ><span
          v-for="(ch, ci) in word.split('')"
          :key="ci"
          :class="['hl-char', { 'hl-char--fixed': !isLetter(ch) }]"
        >{{ ch }}</span></span>
      </h1>
      <h3 v-if="tagline" class="page-tagline">{{ tagline }}</h3>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  title: String,
  tagline: String,
  eyebrow: String
});

// Split the title into words (spacing) → letters (each weight-animated).
const titleWords = computed(() => (props.title || '').split(' '));
const isLetter = (ch) => /\p{L}/u.test(ch);

// Cursor-driven weight spotlight: each title letter's font-weight scales with
// how close the pointer is (near = heavy, far = light). Same effect as the
// homepage hero. Centers are cached so weight changes don't feed back to layout.
const headerEl = ref(null);
const titleEl = ref(null);
const WEIGHT_MIN = 400;
const WEIGHT_MAX = 900;
const WEIGHT_REST = 400;
const WEIGHT_RADIUS = 320;
let charEls = [];
let charCenters = [];
let pointerX = 0;
let pointerY = 0;
let weightRaf = null;
let scrollRaf = null;

function measureCharCenters() {
  charCenters = charEls.map((el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
}

// Pin each letter's advance width to its heaviest-weight size so the cursor
// spotlight never changes widths — otherwise the title re-wraps and jumps.
function lockCharWidths() {
  if (!charEls.length) return;
  for (const el of charEls) { el.style.width = ''; el.style.fontWeight = String(WEIGHT_MAX); }
  const widths = charEls.map((el) => el.getBoundingClientRect().width);
  charEls.forEach((el, i) => {
    el.style.width = `${widths[i]}px`;
    el.style.fontWeight = String(WEIGHT_REST);
  });
  measureCharCenters();
}

function applyWeights() {
  weightRaf = null;
  for (let i = 0; i < charEls.length; i++) {
    const c = charCenters[i];
    if (!c) continue;
    const d = Math.hypot(pointerX - c.x, pointerY - c.y);
    const t = Math.max(0, 1 - d / WEIGHT_RADIUS);
    charEls[i].style.fontWeight = String(Math.round(WEIGHT_MIN + t * (WEIGHT_MAX - WEIGHT_MIN)));
  }
}

function onPointerMove(e) {
  pointerX = e.clientX;
  pointerY = e.clientY;
  if (charCenters.length !== charEls.length) measureCharCenters();
  if (weightRaf == null) weightRaf = requestAnimationFrame(applyWeights);
}

function onPointerEnter(e) {
  measureCharCenters();
  onPointerMove(e);
}

function resetWeights() {
  for (const el of charEls) el.style.fontWeight = String(WEIGHT_REST);
}

function onScroll() {
  if (scrollRaf == null) {
    scrollRaf = requestAnimationFrame(() => {
      scrollRaf = null;
      if (charEls.length) measureCharCenters();
    });
  }
}

function onResize() {
  lockCharWidths();
}

onMounted(() => {
  charEls = titleEl.value ? Array.from(titleEl.value.querySelectorAll('.hl-char:not(.hl-char--fixed)')) : [];
  if (headerEl.value) {
    headerEl.value.addEventListener('pointerenter', onPointerEnter);
    headerEl.value.addEventListener('pointermove', onPointerMove);
    headerEl.value.addEventListener('pointerleave', resetWeights);
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll, { passive: true });
  // Lock widths once the variable font's real metrics are available.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(lockCharWidths);
  else lockCharWidths();
  lockCharWidths();
});

onBeforeUnmount(() => {
  if (weightRaf != null) cancelAnimationFrame(weightRaf);
  if (scrollRaf != null) cancelAnimationFrame(scrollRaf);
  if (headerEl.value) {
    headerEl.value.removeEventListener('pointerenter', onPointerEnter);
    headerEl.value.removeEventListener('pointermove', onPointerMove);
    headerEl.value.removeEventListener('pointerleave', resetWeights);
  }
  window.removeEventListener('resize', onResize);
  window.removeEventListener('scroll', onScroll);
});

</script>

<style lang="scss" scoped>

.page-header {
  position: relative;
  padding: clamp(7rem, 22vh, 14rem) $spacing-md clamp(3rem, 9vh, 7rem);
  text-align: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;
    margin: 0 auto;
    padding: 0;
  }

  /* Eyebrow rendered as a small bordered chip, centered above the title. */
  .page-eyebrow {
    display: inline-block;
    padding: 0.55em 0.95em;
    border: 1px solid rgb(var(--fg-rgb) / 0.18);
    border-radius: 8px;
    background: rgb(var(--fg-rgb) / 0.05);
    font-family: $font-family-main, sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    line-height: 1;
    color: var(--fg);
    opacity: 0.75;
  }

  .page-title {
    font-family: $font-family-main, sans-serif;
    font-size: clamp(var(--text-h1-fs, var(--h1-size)), 9.7vw, 12rem);
    font-weight: 300;
    letter-spacing: -0.03em;
    line-height: 1.05;
    text-align: center;
    text-wrap: balance;
    color: var(--fg);
    margin: 0;

    @media screen and (max-width: 1024px) {
      font-size: var(--text-h1-fs, var(--h1-size));
    }
  }

  .hl-word {
    display: inline-block;

    &:not(:last-child) { margin-right: 0.22em; }
  }

  /* Per-letter spans whose weight is driven from the cursor distance (JS). */
  .hl-char {
    display: inline-block;
    text-align: center;
    font-weight: 400;
    transition: font-weight 0.2s ease;
    will-change: font-weight;
  }

  .hl-char--fixed {
    font-weight: 400;
    transition: none;
    will-change: auto;
  }

  .page-tagline {
    font-family: $font-family-main, sans-serif;
    font-weight: 400;
    font-size: clamp(1.15rem, 2vw, 1.6rem);
    line-height: 1.4;
    text-align: center;
    text-transform: initial;
    text-wrap: balance;
    color: var(--fg);
    opacity: 0.6;
    border: none;
    margin: 0;
  }
}

</style>