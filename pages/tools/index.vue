<template>
  <PageHeader title="Tools" tagline="Free, client-side tools for designers and developers" />

  <main class="general-main page-top">
    <div class="tools-grid">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.slug"
        :to="tool.slug"
        class="tool-card"
      >
        <div class="tool-icon">{{ tool.emoji }}</div>
        <div class="tool-info">
          <h2 class="tool-name">{{ tool.name }}</h2>
          <p class="tool-description">{{ tool.description }}</p>
        </div>
        <svg class="tool-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </NuxtLink>
    </div>
  </main>

  <Footer />
</template>

<script setup>
useSeoMeta({
  title: 'Tools',
  description: 'Free, client-side tools for designers and developers — no sign-up, no server uploads.',
  ogTitle: 'Tools',
  ogDescription: 'Free tools for designers and developers by Rami James.',
})

const tools = [
  {
    slug: '/tools/app-icon-mockup',
    emoji: '📱',
    name: 'App Icon Mockup',
    description: 'Upload your app icon and preview it on iOS and Android home screens. Export a developer-ready ZIP with all required sizes for Xcode and Android Studio.',
  },
]
</script>

<style lang="scss" scoped>

.tools-grid {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  width: 100%;
}

.tool-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  border-radius: $br-md;
  border: $border-light;
  text-decoration: none;
  color: $black;
  background: rgba($white-dark, 0.5);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;

  &:hover {
    background: rgba($blue, 0.04);
    border-color: rgba($blue, 0.3);
    transform: translateX(3px);
  }
}

:global(.dark) .tool-card {
  color: $white;
  background: rgba($white, 0.04);
  border-color: rgba($white, 0.12);

  &:hover {
    background: rgba($blue-light, 0.08);
    border-color: rgba($blue-light, 0.3);
  }
}

.tool-icon {
  font-size: 2rem;
  flex-shrink: 0;
  line-height: 1;
}

.tool-info {
  flex: 1;
}

.tool-name {
  font-size: $font-size-md;
  font-weight: 700;
  margin: 0 0 $spacing-xxs;
}

.tool-description {
  font-size: $font-size-sm;
  opacity: 0.6;
  margin: 0;
  line-height: 1.5;
}

.tool-arrow {
  flex-shrink: 0;
  opacity: 0.3;
  transition: opacity 0.2s, transform 0.2s;

  .tool-card:hover & {
    opacity: 0.8;
    transform: translateX(3px);
  }
}

</style>
