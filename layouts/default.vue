<template>
  <main class="default-layout">
    <section class="default-main">
      <MaxNav />
      <NuxtPage />
    </section>
  </main>
</template>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

.default-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  @media screen and (max-width: 1000px){
    padding-top: 0;
  }
}

</style>