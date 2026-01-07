<template>
  <main class="default-layout">
    <section class="default-main">
      <SimpleNav />
      <!-- <Follow /> -->
      <NuxtPage />
    </section>
  </main>
</template>

<style lang="scss">

@import './assets/variables';

.default-layout {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

.dark {
  .default-main {

    &:after {
      background: linear-gradient(to bottom, rgba($black, 1), rgba($black, 0));
    }
  }
}

.default-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  // padding-top: calc(100px + $spacing-sm);
  position: relative;

  @media screen and (max-width: 1000px){
    padding-top: 0;
  }
}

</style>