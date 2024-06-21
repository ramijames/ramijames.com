<template>
  <main id="hero">
    <div id="mesh-gradient" class="sixteen-elements">
      <div class="element" v-for="n in 256" :key="n"></div>
    </div>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  perspective: 1000rem;
  overflow: hidden;

  @media screen and (max-width: 768px){
    min-height: 80dvh;
  }

  .home-max {
    font-size: 8dvw;
    line-height: 100%;
    animation: animbackground 10s linear infinite;
    padding: $spacing-sm 0;
    font-weight: 700;
  }

  @keyframes animbackground {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  h2 {
    margin-top: 0;
    line-height: 140%;

    @media screen and (max-width: 768px){
      font-size: $font-size-lg;
    }
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

  @media screen and (max-width: 768px){
    flex-direction: column;
    justify-content: flex-start;
  }
}

#mesh-gradient.sixteen-elements {
  width: 130%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  position: relative;
  position: absolute;
  z-index: -1;
  transform: translateX(-15%) scale(0.55) rotate3d(-2, -4, 6, 30deg);
  opacity: 0.3;
  

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 0 through 256 {
    $hue: ($i - 1) * (100000 / 256);
    $color: hsl($hue, 100%, 50%);
    $mesh-colors: map-merge($mesh-colors, ($i: $color));
  }

  $i: 0;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      border: 1px solid $color;
      animation-delay: -#{$i * .125}s;
    }
  }

  .element {
    animation: sixteen-elements 10s linear infinite;
  }

  @keyframes sixteen-elements {
    0% {
      opacity:0;
      transform: scale(1);
      height: 10%;
    }
    50% {
      opacity: 1;
      transform: scale(2);
      height: 200%;
    }
    100% {
      opacity: 0;
      transform: scale(1);
      height: 10%;
    }
  }
}

</style>