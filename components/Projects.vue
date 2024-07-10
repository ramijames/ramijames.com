<template>
  <section id="projects" class="w-three-quarters page-top" ref="projects">
    <h1 class="">Recent Work</h1>
    <h4 class="">I'm proud to have worked on these products over the years</h4>
    <section id="company-logos">
      <img src="/social-proof/wix.png" alt="Wix" />
      <img src="/social-proof/ibm.png" alt="IBM" />
      <img src="/social-proof/spiral.png" alt="Spiral" />
      <img src="/social-proof/wpt.png" alt="WPT" />
      <img src="/social-proof/qmarkets.png" alt="Qmarkets" />
      <img src="/social-proof/telos.png" alt="Telos" />
      <img src="/social-proof/ultra.png" alt="Ultra" />
    </section>
  </section>
  <MergedProjects />
</template>

<style scoped lang="scss">

@import './assets/variables';

#projects {
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1000px){
    flex-direction: column;
  }

  .talk-to-me {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .project-steps {
    display:flex;
    flex-direction: column;
    gap: $spacing-md;

    .step {
      display:flex;
      flex-direction: row;
      gap: $spacing-md;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
      }

      p {
        margin:0;
      }
    }
  }
}

#company-logos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: $spacing-md;
  margin: $spacing-lg 0;
  width: 100%;

  .images {
    display: flex;
    flex-direction: row;
    gap: $spacing-md;
  }

  img {
    width: 50px;
    opacity: 0.5;
  }
}

.dark #company-logos {
  img {
    filter: invert(1);
  }
}

</style>