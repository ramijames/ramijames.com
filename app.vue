<template>
  <NuxtLayout>
    <div ref="stageEl" class="transition-stage">
      <NuxtPage />
    </div>
  </NuxtLayout>

  <!-- Blank full-width panel that wipes up from the bottom between pages. -->
  <div ref="overlayEl" class="page-transition-overlay" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Inline script that runs before paint to set the theme class on <body>.
// This prevents a flash of unstyled/wrong-themed content during hydration.
useHead({
  script: [
    {
      innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.body.classList.add('light')}else{document.body.classList.add('dark')}}catch(e){document.body.classList.add('dark')}})()`,
      tagPosition: 'bodyOpen',
    },
  ],
})

// Site-wide page transition, driven by router guards (works for every page
// regardless of how many root nodes its template has):
//   1. the outgoing page scales down + fades slightly,
//   2. a blank full-width panel wipes up from the bottom to cover it,
//   3. the panel wipes off the top while the new page fades in.
const stageEl = ref<HTMLElement | null>(null)
const overlayEl = ref<HTMLElement | null>(null)
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'
let covered = false

// Set by a card click (StackCards): that navigation uses its own expand-to-hero
// morph, so the generic wipe (and the page-in stagger) should sit this one out.
const skipWipe = useState('skipPageWipe', () => false)
const morphNav = useState('morphNav', () => false)

// Fade the page's top-level blocks in from above on load — the title first,
// then everything else — on both initial load and client navigations.
function animatePageIn() {
  if (!stageEl.value) return
  let targets = Array.from(stageEl.value.children)
  // Single-wrapper pages (e.g. <main><Homepage/></main>): dive one level so we
  // stagger the real sections rather than the lone wrapper.
  if (targets.length === 1 && targets[0].children && targets[0].children.length > 1) {
    targets = Array.from(targets[0].children)
  }
  targets.forEach((el, i) => {
    el.animate(
      [
        { opacity: 0, transform: 'translateY(-28px)' },
        { opacity: 1, transform: 'none' },
      ],
      {
        duration: 550,
        delay: i === 0 ? 0 : 260 + (i - 1) * 90,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'backwards',
      },
    )
  })
}

const router = useRouter()
const nuxtApp = useNuxtApp()

// Cover phase — awaited in a navigation guard so the route swap is held until
// the panel has fully covered the old page. The old page scales down from its
// top centre and fades, while the blank panel grows up from the bottom edge.
function cover(): Promise<void> {
  return new Promise((resolve) => {
    if (skipWipe.value) {
      skipWipe.value = false
      return resolve()
    }
    stageEl.value?.animate(
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(0.94)', opacity: 0.4 },
      ],
      { duration: 460, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' },
    )
    if (!overlayEl.value) return resolve()
    overlayEl.value.getAnimations().forEach((a) => a.cancel())
    const a = overlayEl.value.animate(
      [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }],
      { duration: 460, easing: EASE, fill: 'forwards' },
    )
    covered = true
    a.finished.then(() => resolve()).catch(() => resolve())
  })
}

// Reveal phase — the new page is mounted, fully covered by the panel. Reset the
// old scale (hidden under the panel), drop the panel instantly (it's the same
// colour as the page background, so no flash), then fade the new content in.
function reveal() {
  if (!covered) return
  covered = false

  if (overlayEl.value) {
    overlayEl.value.getAnimations().forEach((a) => a.cancel())
    overlayEl.value.style.transform = 'scaleY(0)'
  }

  if (stageEl.value) {
    stageEl.value.getAnimations().forEach((a) => a.cancel())
    stageEl.value.style.transform = ''
    stageEl.value.style.opacity = '0'
    stageEl.value
      .animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        easing: 'ease',
        fill: 'forwards',
      })
      .finished.then(() => { if (stageEl.value) stageEl.value.style.opacity = '' })
      .catch(() => { if (stageEl.value) stageEl.value.style.opacity = '' })
  }
}

onMounted(() => {
  // Registered after the initial render, so the first page load never animates.
  router.beforeResolve(async (to, from) => {
    if (from && to.fullPath !== from.fullPath) await cover()
  })
  nuxtApp.hook('page:finish', () => {
    reveal()
    // Card-morph navigations reveal via their own clone fade — don't also
    // stagger the content (it would fight the seamless hero hand-off).
    if (morphNav.value) {
      morphNav.value = false
      return
    }
    animatePageIn()
  })
  // Initial page load (the page:finish hook above only catches later navigations).
  animatePageIn()
})
</script>

<style lang="scss">
.transition-stage {
  transform-origin: 50% 0;
  will-change: transform, opacity;
}

.page-transition-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg);
  transform: scaleY(0);
  transform-origin: 50% 100%;
  pointer-events: none;
  will-change: transform;
}
</style>
