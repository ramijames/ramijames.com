<template>
  <main id="Hero">
    <div id="mesh-gradient" class="sixteen-elements">
      <div class="element" v-for="n in 160" :key="n"></div>
    </div>
    <section class="mega-hero">
      <section class="intro-text">
        <h3>Senior Product Designer</h3>
        <p>
          <span class="mint">To delight with design & code,<br></span>
          <span class="blue">You must bring new ideas to life,<br></span>
          <span class="red">A new way of thinking, a new way of doing.</span>
        </p>
      </section>
      <section class="bottom-text">
        <h1 v-if="whichText === 0">
          <span>MUCH</span>
          <span>W</span>
          <span>O</span>
          <span>W</span>
        </h1>
        <h1 v-if="whichText === 1">
          <span>S</span>
          <span>H</span>
          <span>I</span>
          <span>N</span>
          <span>Y</span>
        </h1>
        <h1 v-if="whichText === 2">
          <span>W</span>
          <span>H</span>
          <span>O</span>
          <span>O</span>
          <span>S</span>
          <span>H</span>
        </h1>
        <h1 v-if="whichText === 3">
          <span>W</span>
          <span>E</span>
          <span>E</span>
          <span>E</span>
          <span>E</span>
          <span>E</span>
        </h1>
        <h1 v-if="whichText === 4">
          <span>P</span>
          <span>L</span>
          <span>A</span>
          <span>Y</span>
          <span>T</span>
          <span>I</span>
          <span>M</span>
          <span>E</span>
        </h1>
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
    width: 100dvw;
    padding: $spacing-md;
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
    }

    p {
      animation: fadeInUp 0.5s forwards;
      font-size: $font-size-lg;
      animation-delay: 1.4s;
      opacity: 0;

      @media screen and (max-width: 768px){
        font-size: $font-size-sm;
      }
    }

    .bottom-text {
      width: 100%;
    }

    h1 {
      font-size: 16.65vw;
      line-height: 90%;
      letter-spacing: -0.1rem;
      text-wrap: nowrap;
      margin-top: $spacing-lg;

      @media screen and (max-width: 768px){
        font-size: 15.25vw;
      }

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
      font-weight: 500;
      opacity: 0;
      animation: fadeInUp 1.6s forwards;
      animation-delay: 1s;

      @media screen and (max-width: 768px){
        margin-left: 0;
        font-size: $font-size-lg;
      }
    }
  }

  .hero-top {
    padding: $spacing-xl $spacing-md $spacing-md;

    @media screen and (max-width: 768px){
      padding: $spacing-lg $spacing-md 0;
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
  mask-image: linear-gradient(to top, rgba(255,255,255,0) 20%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 90%);

  @media screen and (max-width: 768px){
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
      // background: linear-gradient(to bottom, rgba($color,0), rgba($color,0.25));
      animation-delay: -#{$i * .125}s;
      width: 10dvw;
      height: 20dvw;
      border: 1px solid rgba($color, 0.4);
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
      opacity: 0.8;
      transform: scale(2) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0) rotate(360deg);
    }
  }
}

</style>