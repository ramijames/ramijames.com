<template>
  <main class="home-root">
    <div class="three-bg" aria-hidden="true">
      <ThreejsPlasmaTrails />
    </div>
    <SimpleHomepage />
  </main>
</template>

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

.three-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  animation: fade 1s forwards 0.4s;
  /* PlasmaTrails canvas is transparent (alpha:true). The themed background
     sits behind it, so in light mode the plasma plays on white and in dark
     mode on black. */
  background: var(--bg);
}
</style>
