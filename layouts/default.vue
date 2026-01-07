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
  padding-top: calc(100px + $spacing-sm);
  position: relative;

  @media screen and (max-width: 1000px){
    padding-top: 0;
  }

  &:after {
    content:'';
    width: 100dvw;
    height: 200px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    background: linear-gradient(to bottom, rgba($white, 1), rgba($white, 0));
    backdrop-filter: blur(8px);
    mask-image: linear-gradient(to top, transparent 0%, $black 90%);
    pointer-events: none;

    @media screen and (max-width: 1000px){
      height: 100px;
    }
  }
}

</style>