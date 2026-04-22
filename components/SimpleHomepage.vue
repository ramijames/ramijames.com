<template>
  <div class="homepage">

    <!-- 1. Intro -->
    <section class="intro">
      <span class="intro-eyebrow">RAMI JAMES &mdash; 2026</span>
      <h1 class="intro-headline">
        <WordReveal
          tag="span"
          class="intro-line intro-line-1"
          text="Designer, strategist,"
          trigger="mount"
          :delay="600"
          :stagger="140"
          :duration="950"
        />
        <span class="intro-line intro-line-2">
          <WordReveal
            tag="span"
            text="quiet"
            trigger="mount"
            :delay="900"
            :stagger="140"
            :duration="950"
          />
          <span class="serif-word">
            <WordReveal
              tag="span"
              text="force"
              trigger="mount"
              :delay="1050"
              :stagger="140"
              :duration="950"
            />
          </span>
          <WordReveal
            tag="span"
            text="multiplier."
            trigger="mount"
            :delay="1200"
            :stagger="140"
            :duration="950"
          />
        </span>
      </h1>

      <span class="scroll-hint" aria-hidden="true">
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="currentColor" stroke-width="1.5"/>
          <circle class="scroll-hint-wheel" cx="11" cy="9" r="2" fill="currentColor"/>
        </svg>
      </span>
    </section>

    <!-- 2. Work -->
    <section class="section mono-scope section-work">
      <span class="rail-label">01 / WORK</span>
      <div class="section-head section-head-left">
        <WordReveal tag="h2" text="Products I've shipped." :stagger="80" />
      </div>
      <WorkIndex />
    </section>

    <!-- 3. Thoughts -->
    <section class="section mono-scope section-thoughts">
      <span class="rail-label">02 / THOUGHTS</span>
      <div class="section-head section-head-right">
        <WordReveal tag="h2" text="Things I'm thinking about." :stagger="80" />
        <nuxt-link to="/thoughts" class="section-cta">See all thoughts <span aria-hidden="true">&rarr;</span></nuxt-link>
      </div>
      <FeaturedThoughts :articles="articles" />
    </section>

    <!-- 4. Companies -->
    <section class="section mono-scope section-companies">
      <span class="rail-label">03 / TRUST</span>
      <div class="section-head section-head-center">
        <WordReveal tag="h3" text="My work, in their words" :stagger="80" />
      </div>
      <HomepageTestimonials />
    </section>

    <!-- 5. Learn -->
    <section class="section mono-scope section-learn">
      <span class="rail-label">04 / TEACH</span>
      <div class="section-head section-head-left">
        <WordReveal tag="h2" text="Learn with me." :stagger="80" />
      </div>
      <LearnIndex />
    </section>

    <!-- 6. Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import articles from '~/assets/articles.json'

/*
 * Fade the hero content (headline, eyebrow, scroll hint) out as the user
 * scrolls past the first screen. Progress runs from 0 at the very top to 1
 * by the time ~60% of the viewport has scrolled past. We expose the result
 * as a CSS custom property so the paint is driven by compositor-friendly
 * opacity/transform, no layout thrash per scroll event.
 */
let handleScroll = null

onMounted(() => {
  if (typeof window === 'undefined') return
  const root = document.documentElement
  handleScroll = () => {
    const distance = window.innerHeight * 0.6
    const y = window.scrollY || 0
    const progress = Math.min(1, Math.max(0, y / distance))
    root.style.setProperty('--hero-fade', String(1 - progress))
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  if (handleScroll) window.removeEventListener('scroll', handleScroll)
  if (typeof document !== 'undefined') {
    document.documentElement.style.removeProperty('--hero-fade')
  }
})
</script>

<style lang="scss">
.homepage {
  position: relative;
  z-index: 1;
  color: var(--fg);
}

/*
 * Force the theme foreground on every text element inside .homepage.
 * Guards against any leftover $white/$black hardcodes from global styles
 * or child components bleeding through. The `:where(...)` keeps specificity
 * at zero for the inner list so child rules can still override when they
 * intentionally want a different color.
 */
.homepage :where(h1, h2, h3, h4, h5, h6, p, span, a, li, blockquote, button),
.homepage .intro-headline,
.homepage .intro-eyebrow,
.homepage .rail-label,
.homepage .word-reveal,
.homepage .word,
.homepage .word-inner,
.homepage .serif-word {
  color: var(--fg);
}

/* ---------- Intro ---------- */

.intro {
  position: relative;
  min-height: 100dvh;
  /* top padding clears the fixed nav (~60px + breathing room).
     bottom padding is modest so the headline always fits within the
     viewport on short/widescreen monitors — content still sits in the
     lower half because of justify-content: space-between. */
  padding-top: clamp(5rem, 10vh, 8rem);
  padding-right: clamp($spacing-md, 6vw, $spacing-xl);
  padding-left: clamp($spacing-md, 6vw, $spacing-xl);
  padding-bottom: clamp(2rem, 6vh, 5rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--fg);

  /* Fade the hero content as the user scrolls (see --hero-fade set by the
     SimpleHomepage scroll handler). Falls back to fully visible when the
     variable isn't set yet, e.g. during SSR. */
  .intro-headline {
    opacity: var(--hero-fade, 1);
    transform: translate3d(0, calc((1 - var(--hero-fade, 1)) * -20px), 0);
    will-change: opacity, transform;
  }

  /* Eyebrow and scroll-hint drive their initial fade-in through the
     registered --hero-appear custom property, so we can multiply that by
     --hero-fade here without the load animation locking opacity at 1. */
  .intro-eyebrow,
  .scroll-hint {
    opacity: calc(var(--hero-appear, 1) * var(--hero-fade, 1));
    transform: translate3d(0, calc((1 - var(--hero-fade, 1)) * -20px), 0);
    will-change: opacity, transform;
  }

  /* Hero text is purely visual — don't let it intercept clicks or hover on
     the scroll-hint / underlying layers. */
  .intro-headline,
  .intro-eyebrow {
    pointer-events: none;
  }
}

/*
 * Registered custom property for the per-element "load in" factor (0 → 1).
 * We animate this instead of opacity directly so the scroll-driven fade
 * (driven by --hero-fade) can be multiplied in, rather than being clobbered
 * by the load animation holding opacity at 1 via animation-fill-mode.
 */
@property --hero-appear {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

@keyframes hero-appear-in {
  to { --hero-appear: 1; }
}

.intro-eyebrow {
  display: inline-block;
  font-size: $font-size-sm;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  --hero-appear: 0;
  animation: hero-appear-in 0.8s ease forwards 0.3s;
}

.intro-headline {
  margin: 0;
  padding: 0;
  font-family: $font-family-main, sans-serif;
  font-weight: 500;
  /* Font-size responds to BOTH viewport width and height so the two-line
     headline always fits the hero on short/widescreen monitors (e.g.
     1920×720) where a purely vw-based size would overflow. The vw bound
     is sized so the longer line ("quiet force multiplier.") fits on a
     single line at typical desktop widths. */
  font-size: min(clamp(2.75rem, 7.5vw, 9.5rem), 18vh);
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: var(--fg);
  display: flex;
  flex-direction: column;
  gap: 0.04em;
}

/* Tighten per-word line-height inside the hero so the two headline lines
   stack compactly and don't overflow. WordReveal.vue's scoped rule sets
   this to 1.15 for descender safety — negative clip-path insets already
   protect descenders, so we can pull this back to 1.05 inside the hero. */
.intro-headline .word {
  line-height: 1.05;
}

.intro-line {
  display: block;
}

.intro-line-2 {
  padding-left: clamp($spacing-md, 8vw, 10rem);
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.35em;
  align-items: baseline;

  @media screen and (max-width: 700px) {
    padding-left: clamp($spacing-sm, 8vw, $spacing-lg);
  }
}

.serif-word {
  font-family: $font-family-serif, serif;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.01em;
  display: inline-flex;
}

/* ---------- Scroll hint ---------- */

.scroll-hint {
  position: absolute;
  right: clamp($spacing-md, 4vw, $spacing-xl);
  bottom: clamp($spacing-md, 4vh, $spacing-xl);
  color: var(--fg);
  --hero-appear: 0;
  animation: hero-appear-in 0.8s ease forwards 1.8s;

  svg {
    display: block;
  }
}

.scroll-hint-wheel {
  transform-origin: center;
  animation: scroll-hint-bob 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

@keyframes scroll-hint-bob {
  0%   { transform: translateY(0);    opacity: 1; }
  60%  { transform: translateY(8px);  opacity: 0; }
  61%  { transform: translateY(0);    opacity: 0; }
  100% { transform: translateY(0);    opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-hint-wheel { animation: none; }
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
    font-family: $font-family-main, sans-serif;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.02;
    color: var(--fg);
  }

  h2 {
    font-size: clamp(3rem, 7vw, 8rem);
  }

  h3 {
    font-size: clamp(1.5rem, 2.5vw, 2.25rem);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
}

.section-head-left { text-align: left; }
.section-head-right {
  text-align: right;

  h2 {
    display: inline-block;
    white-space: nowrap;
    font-size: clamp(2rem, 5.5vw, 7rem);
  }
}
.section-head-center { text-align: center; }

/* CTA button sitting under/after the section heading */
.section-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  margin-top: $spacing-md;
  padding: 0.6em 1.1em;
  font-family: $font-family-main, sans-serif;
  font-size: $font-size-sm;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--fg);
  border: 1px solid var(--border-faint);
  border-radius: $br-xl;
  transition: border-color 0.25s ease, transform 0.25s ease;

  &:hover,
  &:focus-visible {
    outline: none;
    border-color: var(--fg);

    span[aria-hidden] {
      transform: translateX(0.3em);
    }
  }

  span[aria-hidden] {
    transition: transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
}

.rail-label {
  position: absolute;
  top: clamp(3rem, 8vh, 6rem);
  left: clamp($spacing-sm, 2vw, $spacing-md);
  font-size: $font-size-xs;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  opacity: 0.55;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  color: var(--fg);

  @media screen and (max-width: 900px) {
    writing-mode: horizontal-tb;
    transform: none;
    position: relative;
    top: auto;
    left: auto;
    display: block;
    margin-bottom: $spacing-md;
  }
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

/* ---------- Thoughts: 0.92 opaque cards + backdrop blur ---------- */

.section-thoughts {
  /* Hide FeaturedThoughts' built-in h2 — our WordReveal heading covers it. */
  .thoughts-container > h2 {
    display: none;
  }

  /* Inverted thought cards: in light mode the cards are dark, in dark mode
     they're light. We use --fg-rgb for the bg so it flips with theme. */
  .article-card {
    background: rgb(var(--fg-rgb) / 0.92) !important;
    color: var(--bg) !important;
    backdrop-filter: blur(14px) saturate(1.1);
    -webkit-backdrop-filter: blur(14px) saturate(1.1);
    border: 1px solid var(--border-faint) !important;
  }

  .article-card:hover {
    background: rgb(var(--fg-rgb) / 0.97) !important;
  }

  .article-title,
  .article-date {
    color: var(--bg) !important;
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

/* ---------- Responsive intro ---------- */

@media screen and (max-width: 700px) {
  .intro-headline {
    font-size: clamp(3rem, 14vw, 5.5rem);
  }
}
</style>
