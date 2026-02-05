<template>
  
  <PageHeader :title="title" :tagline="tagline" />
  <section class="projects-overview w-consistent">
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
.dark {
  .projects-overview {

    .projects-content {
      background: rgba($white, 0);

      .project-column {

        .services {

          .single-service {
            background: rgba($black, 1);
            color: rgba($white, 1);
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
  margin: 0 auto;

  @media screen and (max-width: 1000px) {
    margin: $spacing-sm;
    padding: 0;
  }

  .projects-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    border-radius: $br-sm;
    padding: $spacing-md 0;

    @media screen and (max-width: 1000px) {
      padding: $spacing-sm $spacing-md;
      width: calc(100% - $spacing-md);
    }



    .project-column {
      display: grid;
      grid-template-columns: 1fr 10fr;
      align-items: flex-start;
      text-align: left;
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

        @media screen and (max-width: 768px){
          align-items: center;
          justify-content: center;
        }

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