<template>
  <section class="learn-index">
    <div class="rows">
      <nuxt-link
        v-for="item in items"
        :key="item.title"
        :to="item.slug"
        class="row"
      >
        <span class="row-title">{{ item.title }}</span>
        <span class="row-desc">{{ item.description }}</span>
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
}

.row {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: $spacing-md;
  padding-block: clamp($spacing-md, 3vh, $spacing-lg);
  padding-inline: 0;
  min-height: clamp(6rem, 12vh, 10rem);
  color: inherit;
  text-decoration: none;
  transition: padding-inline 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);

  &:hover {
    padding-inline: $spacing-md;
  }
}

.row-title {
  font-family: $font-family-main, sans-serif;
  font-weight: 300;
  font-size: clamp(1.25rem, 3.5vw, 3.5rem);
  line-height: 1.0;
  letter-spacing: -0.02em;
}

.row-desc {
  justify-self: end;
  max-width: 24ch;
  text-align: right;
  font-family: 'Roboto', sans-serif;
  font-size: $font-size-sm;
  letter-spacing: 0;
  text-transform: none;
  opacity: 0.65;
}

@media screen and (max-width: 900px) {
  .row {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    row-gap: $spacing-xxs;
  }

  .row-desc {
    justify-self: start;
    text-align: left;
    max-width: 100%;
  }
}
</style>
