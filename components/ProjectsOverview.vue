<template>
  
  <section class="projects-overview">
    <section class="projects-intro">
      <h1>{{ title }}</h1>
      <h3>{{ tagline }}</h3>
    </section>
    <section class="projects-content">
      <div class="project-column">
        <h4>Overview</h4>
        <p>{{ overview }}</p>
      </div>
      <div class="project-column">
        <h4>Services</h4>
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
    padding: 0;
    line-height: 100%;
  }

  h3 {
    margin-top: $spacing-xs;
    opacity: 0.4;
    font-family: $font-family-serif;
    font-weight: 400;
    font-style: italic;
  }
}

.dark {
  .projects-overview {

    .projects-content {

      .project-column {

        .services {

          .single-service {
            background: rgba($white, 1);
            color: rgba($black, 1);
          }
        }
      }
    }
  }
}

.projects-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: $spacing-xl;
  gap: $spacing-md;
  border-radius: $br-sm;
  margin: $spacing-md;

  @media screen and (max-width: 1000px) {
    margin: $spacing-sm;
    padding: 0;
  }

  .projects-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;

    .project-column {
      display: grid;
      grid-template-columns: 1fr 10fr;
      align-items: flex-start;
      gap: $spacing-md;
      width: 100%;

      @media screen and (max-width: 1000px){
        grid-template-columns: 1fr;
        gap: $spacing-xs;
      }

      h4 {
        margin: 0;
        opacity: 0.4;
      }

      p {
        margin:0;
        max-width: 600px;
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
        opacity: 1;
        flex-wrap: wrap;

        .single-service {
          padding: 6px 10px 4px;
          background: $black;
          line-height: 100%;
          border-radius: $br-sm;
          text-transform: uppercase;
          font-size: 10px;
          font-weight: bold;
          letter-spacing: 1px;
          color: $white;
        }
      }
    }
  }
}

</style>