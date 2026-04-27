<template>
  <section class="portfolio">
    <ul class="portfolio-grid">
      <li
        v-for="p in items"
        :key="p.slug"
        :class="['portfolio-item', `is-${random ? 'small' : p.size}`]"
      >
        <nuxt-link :to="p.slug" class="portfolio-card">
          <div class="portfolio-image-wrap">
            <div class="portfolio-media">
              <NuxtImg
                :src="p.images.default"
                :alt="p.title"
                class="portfolio-img portfolio-img-default"
                sizes="sm:100vw md:67vw lg:50vw"
                loading="lazy"
                format="webp"
              />
              <NuxtImg
                :src="p.images.hover"
                :alt="''"
                aria-hidden="true"
                class="portfolio-img portfolio-img-hover"
                sizes="sm:100vw md:67vw lg:50vw"
                loading="lazy"
                format="webp"
              />
            </div>
            <svg class="portfolio-border" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <rect class="portfolio-border-rect" fill="none" stroke="currentColor" stroke-width="2" pathLength="100"/>
            </svg>
          </div>
          <div class="portfolio-meta">
            <span class="portfolio-title">{{ p.title }}</span>
            <span class="portfolio-desc">{{ p.description }}</span>
          </div>
        </nuxt-link>
      </li>
    </ul>

    <div v-if="limit === 'highlights'" class="portfolio-cta-row">
      <Button to="/products" arrow text="See all products" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '~/utils/products'

const props = defineProps({
  limit: {
    type: String,
    default: 'all',
    validator: (v) => ['all', 'highlights'].includes(v),
  },
  random: {
    type: [Number, String],
    default: null,
  },
})

// Curated 7-item homepage order producing the row pattern:
// row 1: small, large
// row 2: small, small, small
// row 3: large, small
const homepageSlugs = [
  '/products/ultra/',
  '/products/scatter/',
  '/products/climbingmonster/',
  '/products/food-for-future/',
  '/products/telos-obe/',
  '/products/doodledapp/',
  '/products/tonara/',
]

const route = useRoute()

// Re-shuffle on client mount so SSR + hydration agree (server renders
// products in source order, client picks random after mount).
const randomSeed = ref(0)
onMounted(() => {
  randomSeed.value = Math.random()
})

const items = computed(() => {
  if (props.random) {
    const count = Number(props.random)
    const currentPath = route.path.replace(/\/?$/, '/')
    const pool = products.filter((p) => p.slug !== currentPath && p.slug !== route.path)
    if (!randomSeed.value) {
      // SSR / pre-mount: just return the first N so output is stable
      return pool.slice(0, count)
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }
  if (props.limit === 'highlights') {
    return homepageSlugs
      .map((slug) => products.find((p) => p.slug === slug))
      .filter(Boolean)
  }
  return products
})
</script>

<style lang="scss" scoped>
.portfolio {
  position: relative;
  width: 100%;
}

.portfolio-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 40px;

  @media (max-width: 1000px) {
    gap: 24px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.portfolio-item {
  margin: 0;
  padding: 0;

  &.is-small {
    grid-column: span 4;
  }

  &.is-large {
    grid-column: span 8;
  }

  @media (max-width: 1000px) {
    &.is-small {
      grid-column: span 6;
    }
    &.is-large {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 600px) {
    &.is-small,
    &.is-large {
      grid-column: 1 / -1;
    }
  }
}

.portfolio-card {
  display: block;
  width: 100%;
  text-decoration: none;
  color: var(--fg);
}

.portfolio-image-wrap {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  isolation: isolate;
  box-shadow: inset 0 0 0 0 transparent;
  transition: box-shadow 0.25s ease;

  .is-large & {
    height: clamp(360px, 36vw, 620px);
  }

  .is-small & {
    height: calc(clamp(360px, 36vw, 620px) * 2 / 3);
  }

  @media (max-width: 600px) {
    .is-small &,
    .is-large & {
      height: auto;
      aspect-ratio: 4 / 3;
    }
  }
}

.portfolio-media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.portfolio-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s ease, opacity 0.4s ease;
  filter: none !important;
}

.portfolio-img-hover {
  opacity: 0;
}

.portfolio-card:hover {
  .portfolio-image-wrap {
    box-shadow: inset 0 0 0 4px var(--bg);
  }

  .portfolio-img-default {
    opacity: 0;
    transform: scale(1.04);
  }

  .portfolio-img-hover {
    opacity: 1;
    transform: scale(1.08);
  }

  .portfolio-border {
    opacity: 1;

    .portfolio-border-rect {
      animation: portfolio-trace 0.5s ease forwards;
    }
  }
}

.portfolio-border {
  position: absolute;
  top: 1px;
  left: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  pointer-events: none;
  overflow: visible;
  opacity: 0;
  z-index: 3;
  color: var(--fg);
}

.portfolio-border-rect {
  width: 100%;
  height: 100%;
  rx: 20px;
  ry: 20px;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  vector-effect: non-scaling-stroke;
}

@keyframes portfolio-trace {
  to { stroke-dashoffset: 0; }
}

.portfolio-meta {
  margin-top: $spacing-sm;
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 1.3;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--fg);
}

.portfolio-title {
  font-weight: 700;
  margin-right: 0.5em;
  color: var(--fg);
}

.portfolio-desc {
  font-weight: 400;
  color: var(--fg);
  opacity: 0.75;
}

.portfolio-cta-row {
  display: flex;
  justify-content: center;
  margin-top: clamp($spacing-lg, 6vh, $spacing-xl);
}
</style>
