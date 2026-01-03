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

.default-layout {
  display: flex;
  flex-direction: row;
  margin-left: 120px;
  min-height: 100vh;

  @media screen and (max-width: 1000px){
    margin-left: 0px;
    margin-top: 80px;
  }
}

.dark {
  .default-main {

    &:after {
      background: #171123;
    }
  }
}

.default-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  &:after {
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    background: #ffffff;
    position: absolute;
    width: 40px;
    -webkit-mask-image: linear-gradient(-90deg, transparent 0%, #171123 100%);
    mask-image: linear-gradient(-90deg, transparent 0%, #171123 100%);
    pointer-events: none;
    opacity: 1;
  }
}

</style>