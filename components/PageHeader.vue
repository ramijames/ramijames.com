<template>
  <main class="page-header w-consistent">
    <div class="content">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <NuxtLink v-for="(crumb, index) in breadcrumbs" :key="crumb.path" :to="crumb.path">
          <span v-if="index > 0" class="separator">/</span>
          {{ crumb.label }}
        </NuxtLink>
      </nav>
      <h1>{{ title }}</h1>
      <h3 v-if="tagline">{{ tagline }}</h3>
    </div>
  </main>
</template>

<script setup>

const props = defineProps({
  title: String,
  tagline: String
});

const route = useRoute();

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean);
  const crumbs = [{ label: 'Home', path: '/' }];

  segments.forEach((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    const label = segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    crumbs.push({ label, path });
  });

  return crumbs;
});

</script>

<style lang="scss" scoped>

.dark {
  .page-header {
    .breadcrumbs {
      a {
        color: $white;
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }

      .separator {
        opacity: 0.2;
      }
    }

    h1 {
      color: $white;
    }

    h3 {
      color: $white;
      border-bottom: 1px solid rgba($white, 0.2);
    }
  }
}

.page-header {
  position: relative;
  padding-top: $spacing-xl;
  background-size: cover;


  h1 {
    line-height: 100%;
    text-align: left;
    text-wrap: balance;
    padding: 0;
    margin-bottom: $spacing-sm;
  }

  h3 {
    text-wrap: balance;
    margin: 0 auto;
    text-align: left;
    text-transform: initial;
    line-height: 140%;
    font-size: $font-size-lg;
    border-bottom: 1px solid rgba($black, 0.2);
    padding-bottom: $spacing-md;

    @media screen and (max-width: 1180px) {
      max-width: 100%;
      font-size: $font-size-lg;
    }
  }

  .breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: $spacing-xxs;
    margin-bottom: $spacing-sm;
    font-size: $font-size-sm;

    a {
      text-decoration: none;
      opacity: 0.5;
      color: $black;
      font-size: $font-size-xs;


      &:last-child {
        opacity: 1;
      }

      &:hover {
        opacity: 1;
      }
    }

    .separator {
      margin-right: $spacing-xxs;
      opacity: 0.2;
    }
  }

  .button-set {
    display: flex;
    flex-direction: row;
    gap: $spacing-sm;
  }
}

</style>