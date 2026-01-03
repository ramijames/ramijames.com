<template>
  <section class="projects-intro">
        <h1>{{ title }}</h1>
        <h2>{{ tagline }}</h2>
      </section>
  <section class="projects-overview">
    <section class="projects-content">
      <div class="project-column">
        <h3>Overview</h3>
        <div>{{ overview }}</div>
      </div>
      <div class="project-column">
        <h3>Services</h3>
        <ul class="services">
          <li v-for="service in services" class="single-service">
            {{ service }}
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script setup>

  const props = defineProps({
    title: String,
    tagline: String,
    overview: String,
    goal: String,
    outcome: String,
    services: Array
  });

</script>

<style scoped lang="scss">

@import './assets/variables';

.projects-intro {

  margin: 0 0 $spacing-lg;

  h1 {
    margin: 0;
  }

  h2 {
    margin: 0;
    opacity: 0.7;
  }
}

.dark {
  .projects-overview {
    background: rgba($blue, 0.1);

    .projects-intro {
      border-right: $border;
    }

    .projects-content {

      .project-column {

        .services {

          .single-service {
            background: rgba($blue, 1);
            color: rgba($white, 1);
          }
        }
      }
    }
  }
}

.projects-overview {
  gap: spacing-md;
  background: rgba($black, 0.12);
  border-radius: $br-sm;
  margin: 0 0 $spacing-lg;

  .projects-intro {
    border-right: $border;
  }

  .projects-content {
    padding: $spacing-md;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;

    .project-column {
      display: grid;
      grid-template-columns: 300px 1fr;
      align-items: flex-start;
      gap: $spacing-md;
      width: 100%;

      @media screen and (max-width: 1000px){
        grid-template-columns: 1fr;
        gap: $spacing-xs;
      }

      h3 {
        margin: 0;
      }

      p {
        margin:0;
      }

      div {
        width: 100%;
      }

      .services {
        display: flex;
        flex-direction: row;
        gap: $spacing-xs;
        list-style: none;
        margin: 10px 0 0 0;

        .single-service {
          padding: 6px 10px 4px;
          background: rgba($black, 1);
          line-height: 100%;
          border-radius: $br-lg;
          text-transform: uppercase;
          font-size: 10px;
          font-weight: bold;
          letter-spacing: 1px;
          color: rgba($white, 1);
        }
      }
    }
  }
}

</style>