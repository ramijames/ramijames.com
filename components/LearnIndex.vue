<template>
  <section class="learn-index">
    <div class="rows">
      <nuxt-link
        v-for="(item, i) in items"
        :key="item.title"
        :to="item.slug"
        class="row"
      >
        <span class="row-index">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="row-title">{{ item.title }}</span>
        <span class="row-desc">{{ item.description }}</span>
        <span class="row-arrow" aria-hidden="true">&rarr;</span>
      </nuxt-link>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    title: 'Learn Three.js',
    description: 'Step-by-step tutorials to master 3D on the web',
    slug: '/learn-threejs',
  },
  {
    title: 'Three.js Experiments',
    description: 'Interactive demos exploring particles, fractals, and more',
    slug: '/three-js-experiments',
  },
  {
    title: 'Learn Solidity',
    description: 'Smart contracts, DeFi patterns, and on-chain development',
    slug: '/learn-solidity',
  },
]
</script>

<style lang="scss" scoped>
.learn-index {
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
  transition: padding-inline-start 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);

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
  max-width: 24ch;
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
