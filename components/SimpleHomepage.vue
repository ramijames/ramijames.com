<template>
  <main id="Hero">
    <div id="mesh-gradient" class="sixteen-elements">
      <div class="element" v-for="n in 160" :key="n"></div>
    </div>
    <section class="mega-hero">
      <h3>Senior Product Designer</h3>
      <h1>
        <span>R</span><span>A</span><span>M</span><span>I</span>
        <span>J</span><span>A</span><span>M</span><span>E</span><span>S</span>
      </h1>
    </section>
    <!-- <section class="w-three-quarters page-top">
      <h1 class="">Rami James</h1>
      <h4 class="">I'm Senior Product Designer who makes <nuxt-link to="/products">clean, clear interfaces</nuxt-link> for folks building fun software&ndash;myself included. If you’d like to commission a work, <a href="mailto:ramijames@gmail.com">send me an email</a>.</h4>
    </section> -->
    <MergedProjects />
  </main>
</template>

<style lang="scss" scoped>

@import './assets/variables';

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#Hero {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  perspective: 1000rem;

  .mega-hero {
    width: 100%;
    height: 100vh;
    padding: $spacing-md;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;

    h1 {
      font-size: 16.15vw;
      line-height: 90%;
      letter-spacing: -0.1rem;
      text-wrap: nowrap;

      span {
        opacity: 0;
        display: inline-block;
        animation: fadeInUp 0.5s forwards;
      }

      span:nth-child(1) { animation-delay: 0.1s; }
      span:nth-child(2) { animation-delay: 0.2s; }
      span:nth-child(3) { animation-delay: 0.3s; }
      span:nth-child(4) { animation-delay: 0.4s; }
      span:nth-child(5) { animation-delay: 0.5s; }
      span:nth-child(6) { animation-delay: 0.6s; }
      span:nth-child(7) { animation-delay: 0.7s; }
      span:nth-child(8) { animation-delay: 0.8s; }
      span:nth-child(9) { animation-delay: 0.9s; }
    }

    h3 {
      font-size: $font-size-xl;
      margin-left: $spacing-sm;
      font-weight: 500;
      opacity: 0;
      animation: fadeInUp 0.5s forwards;
      animation-delay: 1s;

      @media screen and (max-width: 768px){
        margin-left: 0;
      }
    }
  }

  .hero-top {
    padding: $spacing-xl $spacing-md $spacing-md;

    @media screen and (max-width: 768px){
      padding: $spacing-lg $spacing-md 0;
      z-index: 100;
    }
  }

  @media screen and (max-width: 768px){
    min-height: 80dvh;
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
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  z-index: -10;
  align-items: center;
  justify-content: center;;
  opacity: 1;
  position: fixed;
  top:0;
  left:0;
  right:0;
  mask-image: linear-gradient(to top, rgba(255,255,255,0) 20%, rgba(255,255,255,1) 100%);

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
      background: $color;
      animation-delay: -#{$i * .125}s;
      width: 10dvw;
      height: 15dvw;
      border: 1px solid $color;
      border-radius: 100%;
      align-self: center;
      justify-self: center;

      @media screen and (max-width: 768px){
        width: 10dvw;
        height: 15dvw;
        border: 1px solid $color;
      }
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