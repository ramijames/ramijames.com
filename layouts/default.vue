<template>
  <main class="default-layout">
    <section class="default-main">
      <Navbar />
      <NuxtPage />
    </section>
  </main>
</template>

<style>

.default-layout {
  display: flex;
  flex-direction: row;
}

.default-main {
  display: flex;
  flex-direction: column;
  width: 100%;
}

</style>