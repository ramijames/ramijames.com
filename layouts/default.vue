<template>
  <main class="default-layout">
    <section class="default-main">
      <SimpleNav />
      <!-- <Follow /> -->
      <NuxtPage />
    </section>
  </main>
</template>

<style>

.default-layout {
  display: flex;
  flex-direction: row;
  margin-left: 140px;

  @media screen and (max-width: 1000px){
    margin-left: 0px;
    margin-top: 80px;
  }
}

.default-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-left: 1px solid rgba(255,255,255, 0.1);
}

</style>