<template>
  <section ref="stackEl" class="stack-cards">
    <article
      v-for="(card, i) in cards"
      :key="i"
      class="stack-card"
      role="link"
      tabindex="0"
      @click="openCard($event, card, i)"
      @keydown.enter="openCard($event, card, i)"
    >
      <div class="stack-card-body">
        <h2 class="stack-card-title">
          <span
            v-for="(word, wi) in card.title.split(' ')"
            :key="wi"
            class="hl-word"
          ><span
            v-for="(ch, ci) in word.split('')"
            :key="ci"
            class="hl-char"
          >{{ ch }}</span></span>
        </h2>
        <p class="stack-card-desc">{{ card.description }}</p>
      </div>
      <div class="stack-card-media">
        <NuxtImg
          :src="card.image"
          :alt="card.title"
          sizes="sm:100vw md:50vw lg:50vw"
          loading="lazy"
          format="webp"
        />
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  cards: { type: Array, default: () => [] },
})

const router = useRouter()
const nuxtApp = useNuxtApp()
// Shared with app.vue (skip the generic page wipe) and CaseStudyHero (which side
// the image was on, so the morph doesn't flip).
const skipWipe = useState('skipPageWipe', () => false)
const morphNav = useState('morphNav', () => false)
const expandSide = useState('cardExpandSide', () => 'content-left')

// Click a card → clone it, expand the clone to fill the viewport, navigate, then
// (once the case-study page's matching hero has rendered underneath) fade the
// clone out — so the card seamlessly becomes the page header.
function openCard(e, card, i) {
  if (!import.meta.client || !card.to) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const radius = getComputedStyle(el).borderRadius
  const nav = document.querySelector('.max-nav')
  const navH = nav ? nav.getBoundingClientRect().height : 0
  expandSide.value = 'content-left'

  // Final (expanded) box: full width, below the header.
  const fx = 0
  const fy = navH
  const fw = window.innerWidth
  const fh = window.innerHeight - navH

  const clone = el.cloneNode(true)
  clone.style.cssText +=
    `;position:fixed;margin:0;z-index:10001;pointer-events:none;opacity:1;border-radius:0;` +
    `transform-origin:top left;top:${fy}px;left:${fx}px;width:${fw}px;height:${fh}px;`
  // Reset the title's hover weights so it matches the uniform destination hero.
  clone.querySelectorAll('.hl-char').forEach((c) => { c.style.fontWeight = '400' })
  document.body.appendChild(clone)
  clone.getBoundingClientRect() // reflow before animating

  // FLIP: start transformed to sit exactly over the card, animate to identity.
  // Transform-based so it's GPU-composited (smooth); the card is already almost
  // full-size, so the scale is tiny and doesn't visibly distort the contents.
  const sx = r.width / fw
  const sy = r.height / fh
  const tx = r.left - fx
  const ty = r.top - fy
  const anim = clone.animate(
    [
      { transform: `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`, borderRadius: radius },
      { transform: 'translate(0px, 0px) scale(1, 1)', borderRadius: '0px' },
    ],
    { duration: 600, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' },
  )

  skipWipe.value = true
  morphNav.value = true
  const off = nuxtApp.hook('page:finish', async () => {
    off()
    try { await anim.finished } catch (_) {}
    const fade = clone.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 280, easing: 'ease', fill: 'forwards' })
    fade.finished.then(() => clone.remove()).catch(() => clone.remove())
  })

  router.push(card.to)
}

// As each card is covered by the next (which sticks over it), fade it back into
// the background and shrink it slightly for depth.
const stackEl = ref(null)
let cardEls = []
let stickyTop = 0
let raf = null

// Cursor-driven weight spotlight on the card titles (same as the hero).
const WEIGHT_MIN = 400
const WEIGHT_MAX = 900
const WEIGHT_RADIUS = 300
let titleCharEls = []
let pointerX = -99999
let pointerY = -99999

function applyTitleWeights() {
  for (let i = 0; i < titleCharEls.length; i++) {
    const el = titleCharEls[i]
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const t = Math.max(0, 1 - Math.hypot(pointerX - cx, pointerY - cy) / WEIGHT_RADIUS)
    el.style.fontWeight = String(Math.round(WEIGHT_MIN + t * (WEIGHT_MAX - WEIGHT_MIN)))
  }
}

function onPointerMove(e) {
  pointerX = e.clientX
  pointerY = e.clientY
  onScroll()
}

function onPointerLeave() {
  pointerX = -99999
  pointerY = -99999
  onScroll()
}

// The cards sit below the fixed header; measure it so the sticky offset and the
// card height account for it (and expose it to CSS as --nav-h).
function measure() {
  const md = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2 // $spacing-md = 2rem
  const nav = document.querySelector('.max-nav')
  const navH = nav ? nav.getBoundingClientRect().height : 0
  if (stackEl.value) stackEl.value.style.setProperty('--nav-h', navH + 'px')
  stickyTop = navH + md
}

function update() {
  raf = null
  const vh = window.innerHeight
  const denom = Math.max(1, vh - stickyTop)
  for (let i = 0; i < cardEls.length; i++) {
    const el = cardEls[i]
    const next = cardEls[i + 1]
    if (!next) {
      el.style.opacity = ''
      el.style.transform = ''
      continue
    }
    // How far the next card has risen toward its stuck position (0 → 1).
    const nextTop = next.getBoundingClientRect().top
    const p = Math.min(1, Math.max(0, (vh - nextTop) / denom))
    el.style.opacity = String(1 - p)
    el.style.transform = `scale(${1 - p * 0.06})`
  }
  applyTitleWeights()
}

function onScroll() {
  if (raf == null) raf = requestAnimationFrame(update)
}

function onResize() {
  measure()
  onScroll()
}

onMounted(() => {
  cardEls = stackEl.value ? Array.from(stackEl.value.querySelectorAll('.stack-card')) : []
  titleCharEls = stackEl.value ? Array.from(stackEl.value.querySelectorAll('.stack-card-title .hl-char')) : []
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  if (stackEl.value) {
    stackEl.value.addEventListener('pointermove', onPointerMove)
    stackEl.value.addEventListener('pointerleave', onPointerLeave)
  }
  update()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  if (stackEl.value) {
    stackEl.value.removeEventListener('pointermove', onPointerMove)
    stackEl.value.removeEventListener('pointerleave', onPointerLeave)
  }
  if (raf != null) cancelAnimationFrame(raf)
})
</script>

<style lang="scss" scoped>
.stack-cards {
  position: relative;
}

.stack-card {
  position: sticky;
  // Sit below the fixed header, with md spacing.
  top: calc(var(--nav-h, 0px) + #{$spacing-md});
  height: calc(100vh - var(--nav-h, 0px) - #{$spacing-md} * 2);
  // Side + top spacing of md; a ~quarter-page gap below so the next card waits
  // before scrolling in.
  margin: $spacing-md $spacing-md 25vh;
  border-radius: $br-md;
  background: #ffffff;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  cursor: pointer;
  will-change: transform, opacity;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.stack-card-body {
  order: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: $spacing-sm;
  padding: $spacing-lg;

  @media screen and (max-width: 800px) {
    order: 2;
    padding: $spacing-md;
  }
}


.stack-card .stack-card-title {
  margin: 0;
  font-family: $font-family-main, sans-serif;
  font-weight: 400;
  font-size: clamp(1.5rem, 2.8vw, 2.75rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #111111;
  // Stay on one line at every weight, so the cursor-weight spotlight never
  // reflows the title onto a second line.
  white-space: nowrap;

  .hl-word {
    display: inline-block;

    &:not(:last-child) { margin-right: 0.25em; }
  }

  .hl-word,
  .hl-char {
    color: #111111;
  }

  .hl-char {
    display: inline-block;
    font-weight: 400;
    transition: font-weight 0.15s ease;
    will-change: font-weight;
  }
}

.stack-card .stack-card-desc {
  margin: 0;
  max-width: 42ch;
  font-family: $font-family-main, sans-serif;
  font-weight: 400;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  line-height: 1.5;
  color: rgba(#111111, 0.65);
}

.stack-card-media {
  order: 2;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media screen and (max-width: 800px) {
    order: 1;
  }
}
</style>
