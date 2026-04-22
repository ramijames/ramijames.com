<template>
  <section class="work-index">
    <div class="rows">
      <nuxt-link
        v-for="(product, i) in products"
        :key="product.title"
        :to="product.slug"
        class="row"
        :class="{ 'is-visible': visible[i] }"
        :ref="(el) => setRowRef(el, i)"
        :style="{ '--row-index': i }"
      >
        <span class="row-index">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="row-title">{{ product.title }}</span>
        <span class="row-desc">{{ product.description }}</span>
        <span class="row-arrow" aria-hidden="true">&rarr;</span>
      </nuxt-link>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { products } from '~/utils/products'

const visible = reactive(products.map(() => false))
const rowRefs = []
let observer = null

const setRowRef = (el, i) => {
  if (el && el.$el) el = el.$el
  rowRefs[i] = el || null
}

onMounted(async () => {
  await nextTick()
  if (typeof IntersectionObserver === 'undefined') {
    visible.forEach((_, i) => (visible[i] = true))
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const i = rowRefs.indexOf(entry.target)
        if (i !== -1) {
          visible[i] = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  )
  rowRefs.forEach((el) => el && observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  observer = null
})
</script>

<style lang="scss" scoped>
.work-index {
  position: relative;
  width: 100%;
}

.rows {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-faint, rgba(0, 0, 0, 0.18));
}

.row {
  position: relative;
  display: grid;
  grid-template-columns: 4rem 1fr auto 2.5rem;
  align-items: center;
  gap: $spacing-md;
  padding-block: clamp($spacing-md, 3vh, $spacing-lg);
  padding-inline: $spacing-md;
  min-height: clamp(6rem, 12vh, 10rem);
  border-bottom: 1px solid var(--border-faint, rgba(0, 0, 0, 0.18));
  color: inherit;
  text-decoration: none;

  /* Scroll-in reveal: each row fades + slides up when it enters the viewport.
     Transforms/opacity only, so it stays cheap. Rows stagger slightly via the
     --row-index custom property multiplied into the transition-delay. */
  opacity: 0;
  transform: translate3d(0, 28px, 0);
  transition:
    opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1),
    padding-inline-start 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  transition-delay: calc(var(--row-index, 0) * 60ms);

  &.is-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &:hover,
  &:focus-visible {
    outline: none;
    padding-inline-start: calc(#{$spacing-md} + 0.75rem);

    .row-title {
      font-family: $font-family-serif, serif;
      font-style: italic;
      font-weight: 400;
      letter-spacing: -0.015em;
    }

    .row-index {
      opacity: 1;
    }

    .row-arrow {
      transform: translateX(0.5rem);
    }
  }
}

.row-index {
  font-family: $font-family-serif, serif;
  font-style: italic;
  font-size: $font-size-lg;
  opacity: 0.55;
}

.row-title {
  font-family: $font-family-main, sans-serif;
  font-weight: 500;
  font-size: clamp(1.25rem, 3.5vw, 3.5rem);
  line-height: 1.0;
  letter-spacing: -0.02em;
}

.row-desc {
  justify-self: end;
  max-width: 22ch;
  text-align: right;
  font-size: $font-size-sm;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.65;
}

.row-arrow {
  justify-self: end;
  font-size: $font-size-xl;
  transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .row {
    opacity: 1;
    transform: none;
    transition: padding-inline-start 0.4s ease;
  }
}

@media screen and (max-width: 900px) {
  .row {
    grid-template-columns: 2.5rem 1fr;
    grid-auto-rows: auto;
    row-gap: $spacing-xxs;
  }

  .row-desc {
    grid-column: 2;
    justify-self: start;
    text-align: left;
    max-width: 100%;
  }

  .row-arrow {
    display: none;
  }
}
</style>
