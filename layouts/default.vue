<template>
  <main class="default-layout">
    <!-- <Mainbar /> -->
    <section class="default-main">
      <Navbar />
      <div class="container">
        <NuxtPage />
      </div>
      
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