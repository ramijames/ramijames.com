<template>
  <main class="home-root">
    <div class="three-bg" :class="{ 'is-ready': bgReady }" aria-hidden="true">
      <ThreejsPlasmaTrails @ready="bgReady = true" />
    </div>
    <SimpleHomepage />
  </main>
</template>

<script setup>
import { ref } from 'vue'
const bgReady = ref(false)
</script>

<style lang="scss">
/*
 * Set theme CSS variables on the body (not .home-root) so they flow through
 * every descendant — including child components with their own scoped styles.
 * Default to light; body.dark flips. body:not(.dark) is also declared so the
 * light values win even if some other selector might otherwise take precedence.
 */
body:not(.dark),
body.light {
  --fg: #{$black};
  --bg: #{$white};
  --fg-rgb: 3 3 3;
  --bg-rgb: 255 255 255;
  --border-faint: rgb(3 3 3 / 0.15);
}

body.dark {
  --fg: #{$white};
  --bg: #{$black};
  --fg-rgb: 255 255 255;
  --bg-rgb: 3 3 3;
  --border-faint: rgb(255 255 255 / 0.18);
}

.home-root {
  position: relative;
  min-height: 100dvh;
  background: var(--bg);
  color: var(--fg);
}

/* Put the theme background directly on <body> as the ultimate fallback:
   even if mobile Safari ever drops the fixed-positioned .three-bg out of
   the compositor, the page's body bg color is painted by the browser root
   and doesn't scroll with content — so the color stays pinned and the only
   thing that can visibly "scroll" is the plasma canvas layer itself. */
html,
body {
  background: var(--bg);
  /* Prevent horizontal scroll from any element that stretches past the
     viewport (oversized headings, 100vw children, etc.). */
  overflow-x: hidden;
  max-width: 100%;
}

.home-root {
  overflow-x: clip;
}

.three-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  /* 100vh is the largest (URL-bar-hidden) viewport state on mobile. It
     doesn't change as the address bar shows/hides, so the canvas doesn't
     resize mid-scroll. */
  height: 100vh;
  z-index: 0;
  pointer-events: none;

  /* Fade is driven by the `is-ready` class toggled by PlasmaTrails' `ready`
     emit — so the canvas only fades in once the first real frame has been
     rendered, instead of appearing on a time delay regardless of state. */
  opacity: 0;
  transition: opacity 1s ease-out;

  &.is-ready {
    opacity: 1;
  }

  /* Force the fixed element onto its own compositor layer. This is the
     canonical iOS Safari fix for the bug where `position: fixed` elements
     appear to scroll with content during momentum scroll — Safari drops
     the layer unless something explicitly promotes it. */
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
