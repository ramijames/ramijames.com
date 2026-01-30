<template>
  <main class="viewer-layout">
    <section class="viewer-main">
      <NuxtPage />
    </section>
  </main>
</template>

<style lang="scss" scoped>

.viewer-layout {
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  overflow: hidden;
}

.viewer-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 1000px){
    padding-top: 0;
  }
}

</style>