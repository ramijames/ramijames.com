<template>
  <main id="hero">
    <section class="general-main page-top">
      <h1 class="home-max">Senior Product Designer</h1>
      <h2>I have two decades of <nuxt-link to="/about">experience</nuxt-link> in product design, software development, and developer tooling.</h2>
      <section class="buttons">
        <Button to="/products" text="Explore my work" type="small" />
        <Button to="/booking" text="📬 Get in touch" type="text" />
      </section>
    </section>
  </main>
  <!-- <section id="featured">
    <section class="general-main page-top">
      <h2>I focus my efforts on creating user-centered solutions that drive business success.</h2>
    </section>
  </section> -->
</template>

<style lang="scss" scoped>

@import './assets/variables';

#hero {
  width: 100dvw;
  padding: $spacing-lg;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .home-max {
    font-size: 8dvw;
    line-height: 100%;
  }

  h2 {
    margin-top: 0;
    line-height: 140%;
  }
}

#featured {
  width: 100dvw;
  padding: $spacing-lg;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: $black;

  h2 {
    margin-top: 0;
    line-height: 140%;
    color: $white;
  }

}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: $spacing-sm;
}

</style>