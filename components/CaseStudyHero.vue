<template>
  <section :class="['cs-hero', side === 'image-left' ? 'is-flipped' : '']">
    <div class="cs-hero-body">
      <h1 class="cs-hero-title">{{ heroTitle }}</h1>
      <p v-if="heroDesc" class="cs-hero-desc">{{ heroDesc }}</p>
    </div>
    <div class="cs-hero-media">
      <NuxtImg
        v-if="heroImage"
        :src="heroImage"
        :alt="heroTitle"
        sizes="sm:100vw md:50vw lg:50vw"
        format="webp"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '~/utils/products'

const props = defineProps({
  title: String,
  tagline: String,
})

// Match the clicked card exactly by pulling title/description/image from the
// same product record, keyed off the current route.
const route = useRoute()
const norm = (p) => (p || '').replace(/\/$/, '')
const product = computed(() => products.find((p) => norm(p.slug) === norm(route.path)))

const heroTitle = computed(() => product.value?.title || props.title)
const heroDesc = computed(() => product.value?.description || props.tagline)
const heroImage = computed(() => product.value?.images?.default || product.value?.image || '')

// Which side the image sat on in the card that expanded into this hero, so the
// morph doesn't flip horizontally.
const side = useState('cardExpandSide', () => 'content-left')
</script>

<style scoped lang="scss">
.cs-hero {
  position: relative;
  width: 100%;
  // Sit below the fixed header rather than under it, matching the expanded card.
  margin-top: var(--nav-h, 0px);
  height: calc(100vh - var(--nav-h, 0px));
  background: #ffffff;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.cs-hero-body {
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

.cs-hero-media {
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

.cs-hero.is-flipped {
  .cs-hero-body { order: 2; }
  .cs-hero-media { order: 1; }
}

.cs-hero .cs-hero-title {
  margin: 0;
  font-family: $font-family-main, sans-serif;
  font-weight: 400;
  /* Match the card title exactly so the morph doesn't change size/wrapping. */
  font-size: clamp(1.5rem, 2.8vw, 2.75rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #111111;
  white-space: nowrap;
}

.cs-hero .cs-hero-desc {
  margin: 0;
  max-width: 42ch;
  font-family: $font-family-main, sans-serif;
  font-weight: 400;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  line-height: 1.5;
  color: rgba(#111111, 0.65);
}
</style>
