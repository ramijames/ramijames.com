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
  margin-left: 132px;
  min-height: 100vh;

  @media screen and (max-width: 1000px){
    margin-left: 0px;
    margin-top: 80px;
  }
}

.default-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

</style>