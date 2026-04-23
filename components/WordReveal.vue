<template>
  <component
    :is="tag"
    ref="root"
    class="word-reveal"
    :class="{ 'is-visible': visible }"
    :style="{
      '--wr-stagger': `${stagger}ms`,
      '--wr-delay': `${delay}ms`,
      '--wr-duration': `${duration}ms`,
    }"
  >
    <span
      v-for="(word, i) in words"
      :key="i"
      class="word"
      :style="{ '--i': i }"
    ><span class="word-inner">{{ word }}</span><span v-if="i < words.length - 1" class="word-space">&nbsp;</span></span>
  </component>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: 'span' },
  stagger: { type: Number, default: 60 },
  delay: { type: Number, default: 0 },
  duration: { type: Number, default: 900 },
  trigger: { type: String, default: 'intersect' },
  threshold: { type: Number, default: 0.25 },
})

const root = ref(null)
const visible = ref(false)
const words = computed(() => props.text.split(/\s+/).filter(Boolean))

let observer = null

onMounted(async () => {
  await nextTick()
  if (props.trigger === 'mount') {
    visible.value = true
    return
  }
  if (!root.value || typeof IntersectionObserver === 'undefined') {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.value = true
          if (observer) {
            observer.disconnect()
            observer = null
          }
        }
      })
    },
    { threshold: props.threshold }
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style lang="scss" scoped>
/*
 * Local mask keyframe with negative insets on all four sides so the clip region
 * extends past glyph ascenders, descenders, AND italic side-bearings. The
 * global `reveal` keyframe uses inset(0 100% 0 0) which clips to the element
 * box — with tight line-height that trims 'g', 'p', 'y', 'f', and with italic
 * text where the slanted strokes extend beyond the inline box on the right.
 */
@keyframes word-reveal-mask {
  0% {
    clip-path: inset(-0.2em calc(100% + 0.35em) -0.2em -0.35em);
    opacity: 0;
    transform: skewX(14deg) scale(0.92);
  }
  100% {
    clip-path: inset(-0.2em -0.35em -0.2em -0.35em);
    opacity: 1;
    transform: skewX(0) scale(1);
  }
}

.word-reveal {
  display: block;

  .word {
    display: inline-block;
    white-space: nowrap;
    /* Give inline box enough room for descenders + italic overshoot
       even when parent uses tight line-height. Italics in Libre
       Baskerville swing below the baseline on the left (e.g. the stem of
       'f') so we add a small padding-inline-start to keep strokes inside
       the clip region. */
    line-height: 1.15;
    padding-block: 0.08em;
    padding-inline: 0.1em 0.05em;
  }

  .word-inner {
    display: inline-block;
    will-change: transform, clip-path, opacity;
    clip-path: inset(-0.2em calc(100% + 0.35em) -0.2em -0.35em);
    opacity: 0;
    transform: skewX(14deg) scale(0.92);
  }

  .word-space {
    display: inline-block;
  }

  @media (prefers-reduced-motion: no-preference) {
    &.is-visible .word-inner {
      animation: word-reveal-mask var(--wr-duration, 900ms) cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
      animation-delay: calc(var(--wr-delay, 0ms) + var(--i) * var(--wr-stagger, 60ms));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .word-inner {
      clip-path: inset(-0.2em -0.35em -0.2em -0.35em);
      opacity: 1;
      transform: none;
    }
  }
}
</style>
