<template>
  <section class="projects-header">
    <h3>Browse work</h3>
  </section>
</template>

<style scoped lang="scss">
.projects-header {
  display: none;

  @media screen and (max-width: 1000px) {
    display: block;
  }
}

h3 {
  margin: $spacing-md $spacing-md 0 $spacing-md;

  @media screen and (max-width: 1000px) {
    margin: $spacing-sm $spacing-sm 0 $spacing-sm;
  }
}

</style>