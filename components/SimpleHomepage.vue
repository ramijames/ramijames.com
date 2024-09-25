<template>
  <main id="Hero">
    <div id="mesh-gradient" class="sixteen-elements">
      <div class="element" v-for="n in 160" :key="n"></div>
    </div>
    <section class="mega-hero">
      <section class="intro-text w-three-quarters">
        <p>
          <span>Design,&nbsp;</span>
          <span>build, </span>
          <span>& ship your product</span>
        </p>
        <p class="secondary">I am a product-minded designer and developer with founder experience. My core interest is in creating innovative tools with creative partners like you.</p>
        <section class="home-buttons">
          <nuxt-link class="button" to="/services">View services</nuxt-link>
          <a class="button" href="mailto:ramijames@gmail.com">Send email</a>
        </section>
      </section>
    </section>
    <MergedProjects />
  </main>
</template>

<script setup>

const whichText = ref(0);

onMounted(() => {
  whichText.value = Math.floor(Math.random() * 5);
});

</script>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';

#Hero {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  perspective: 100rem;

  .mega-hero {
    padding: $spacing-lg $spacing-md $spacing-xl $spacing-md;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    .intro-text {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;

      .home-buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: $spacing-sm;
        margin-top: $spacing-md;
        animation: fadeInUp 0.5s forwards ease-in-out;
        opacity: 0;
        animation-delay: 1.05s;

        @media screen and (max-width: 600px){
          flex-direction: column;
          justify-content: flex-start;
          width: 100%;

          .button {
            width: 100%;
          }
        }
      }
    }

    p {
      
      font-size: 8vw;
      line-height: 90%;
      letter-spacing: -0.1rem;
      text-wrap: balance;
      font-family: $font-family-main;

      span {
        display: inline-block;
        animation: zoomBack 0.5s forwards ease-in-out;
        opacity: 0;

        &:nth-child(1) {
          animation-delay: 0.45s;
        }

        &:nth-child(2) {
          animation-delay: .6s;
        }

        &:nth-child(3) {
          animation-delay: .75s;
        }
      }

      @media screen and (max-width: 768px){
        font-size: 16vw;
        text-wrap: balance;

        span {
          margin-bottom: 0.5rem;
          display: block;
        }
      }
    }

    p.secondary {
      font-size: $font-size-xl;
      line-height: 140%;
      text-wrap: balance;
      letter-spacing: initial;
      font-family: $font-family-secondary;
      animation: fadeInUp 0.5s forwards ease-in-out;
      opacity: 0;
      animation-delay: 0.9s;

      @media screen and (max-width: 768px){
        font-size: $font-size-md;
      }
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
  pointer-events: none;
  top:0;
  left:0;
  right:0;

  @media screen and (max-width: 768px){
    display: none;
  }

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 0 through 160 {
    $hue: ($i - 1) * (360 / 60);
    $color: hsl($hue, 100%, 50%);
    $mesh-colors: map-merge($mesh-colors, ($i: $color));
  }

  $i: 0;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      // background: linear-gradient(to bottom, rgba($color,0) 55%, rgba($color,.8));
      border: 1px solid rgba($color, 0.3);
      animation-delay: -#{$i * .25}s;
      width: .8dvw;
      height: 20dvw;
      border-radius: 2rem;
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
      opacity: 1;
      transform: scale(2) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0) rotate(360deg);
    }
  }
}

</style>