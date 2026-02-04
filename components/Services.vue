<template>
  <div class="services-section">
    <div class="services-grid">
      <div class="service" v-for="service in services" :key="service.title">
        <div class="service-title">{{ service.title }}</div>
        <div class="service-description">{{ service.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  {
    title: 'Product Design',
    description: 'For complex systems'
  },
  {
    title: 'UX Strategy',
    description: 'And execution'
  },
  {
    title: 'Workflow Definition',
    description: 'And implementation'
  },
  {
    title: 'Design Systems',
    description: 'Architecture and consultation'
  }
];
</script>

<style lang="scss" scoped>
.services-section {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
  background: $white;

  @media screen and (max-width: 768px) {
    padding: $spacing-md;
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-xl;
  max-width: 1200px;
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }
}

.service {
  text-align: left;

  .service-title {
    font-size: 4vw;
    font-weight: 700;
    color: $black;
    line-height: 100%;
    margin-bottom: $spacing-xs;

    @media screen and (max-width: 768px) {
      font-size: 8vw;
    }
  }

  .service-description {
    font-size: $font-size-lg;
    color: rgba($black, 0.5);

    @media screen and (max-width: 768px) {
      font-size: $font-size-md;
    }
  }
}

.dark {
  .services-section {
    background: $black;
  }

  .service {
    .service-title {
      color: $white;
    }

    .service-description {
      color: rgba($white, 0.5);
    }
  }
}
</style>
