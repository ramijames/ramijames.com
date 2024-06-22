<template>
  <main id="Hero">
    <div id="mesh-gradient" class="sixteen-elements">
      <div class="element" v-for="n in 160" :key="n"></div>
    </div>
    <section class="general-main page-top">
      <h1 class="home-max">Senior Product Designer</h1>
      <h2>I have two decades of <nuxt-link to="/about">experience</nuxt-link> in <span class="red">product design</span>, <span class="mint">software development</span>, and <span class="purple">developer tooling</span>.</h2>
      <h3>I make <nuxt-link to="/products">clean, clear interfaces</nuxt-link> for folks building fun software - myself included. If you’d like to commission a work, <a href="rami@ramijames.com">send me an email</a>.</h3>
    </section>
    <MergedProjects />
    <TypesOfDesigns />
  </main>
</template>

<style lang="scss" scoped>

@import './assets/variables';

#Hero {
  width: 100dvw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  perspective: 1000rem;
  overflow: hidden;
  background: linear-gradient(-140deg, white 60%, rgba($teal, 0.2) 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10dvh;
    background: linear-gradient(to bottom, white 0%, rgba(white, 0) 100%);
    z-index: 100;
  }

  @media screen and (max-width: 768px){
    min-height: 80dvh;
  }

  .home-max {
    font-size: 8dvw;
    line-height: 100%;
    padding: $spacing-sm 0;
    font-weight: 700;
    pointer-events: none;
  }

  h2 {
    margin-top: 0;
    line-height: 140%;

    @media screen and (max-width: 768px){
      font-size: $font-size-lg;
    }
  }

  .services {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: $spacing-md;
    
    li {
      background: $black-dark;
      height: 300px;
      padding: $spacing-md;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}

.dark #Hero {
  background: linear-gradient(-140deg, $black 60%, rgba($black, 0.2) 100%);
    
  &::before {
    background: linear-gradient(to bottom, $black 0%, rgba($black, 0) 100%);
  }
}

#Various {
  width: 100%;
  position: relative;
  padding: $spacing-md $spacing-lg;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: $spacing-lg;

  div {
    width: calc(50% - $spacing-lg / 2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      padding: $spacing-sm 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    p {
      margin-bottom: 0;
      font-family: $font-family-main;
      font-weight: 500;

      small {
        opacity: 0.3;
      }
    }
  }

}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: $spacing-sm;
  margin-bottom: $spacing-xxl;

  @media screen and (max-width: 768px){
    flex-direction: column;
    justify-content: flex-start;
  }
}

#mesh-gradient.sixteen-elements {
  width: 150%;
  height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  z-index: -10;
  align-items: center;
  justify-content: center;;
  opacity: 0.5;
  position: fixed;
  top:0;
  left:0;
  right:0;
  transform: rotate(22.5deg);

  @media screen and (max-width: 768px){
    opacity: 0.01;
  }

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 0 through 160 {
    $hue: ($i - 1) * (360 / 160);
    $color: hsl($hue, 100%, 50%);
    $mesh-colors: map-merge($mesh-colors, ($i: $color));
  }

  $i: 0;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      border: 1px solid $color;
      animation-delay: -#{$i * .125}s;
      width: 5dvw;
      height: 5dvw;
      align-self: center;
      justify-self: center;
    }
  }

  .element {
    animation: sixteen-elements 10s linear infinite;

    
  }

  @keyframes sixteen-elements {
    0% {
      opacity:0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 0.6;
      transform: scale(2) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0) rotate(360deg);
    }
  }
}

</style>