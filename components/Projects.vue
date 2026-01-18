<template>
  <main id="ProjectsMain">
  </main> 
  <MergedProjects />
</template>

<style scoped lang="scss">
#ProjectsMain {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  perspective: 100rem;
}

.products-hero {
  padding: $spacing-lg 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .intro-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;

    .products-buttons {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: $spacing-sm;
      margin-top: $spacing-md;
      animation: fadeInUp 0.5s forwards ease-in-out;
      opacity: 0;
      animation-delay: .65s;

      .arrow-down {
        margin-top: $spacing-md;
        animation: bounce 2s infinite ease-in-out;
      }
      
      .button {
        margin-top: -2px;
      }

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
    font-size: 4vw;
    line-height: 100%;
    letter-spacing: -0.1rem;
    text-wrap: balance;
    font-family: $font-family-main;
    margin-bottom: $spacing-md;
    color: $white;

    &.small {
      font-size: $font-size-md;
      letter-spacing: 0.1rem;
      font-weight: 500;
      animation: fadeInUp 0.5s forwards ease-in-out;
      animation-delay: .65s;
      opacity: 0;
      margin-bottom: $spacing-sm;
    }

    span {
      display: inline-block;
      animation: zoomBack 0.5s forwards ease-in-out;
      opacity: 0;
      transition: all 0.35s ease-in-out;

      // There are 35 letters, so let's iterate through them and delay each one
      @for $i from 1 through 35 {
        &:nth-child(#{$i}) {
          animation-delay: $i * 0.025s;
        }
      }
    }

    @media screen and (max-width: 768px){
      font-size: 11vw;
      text-wrap: balance;
    }
  }
}

#company-logos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: $spacing-lg;
  width: 100%;

  .images {
    display: flex;
    flex-direction: row;
    gap: $spacing-lg;
  }

  img {
    width: 60px;
    opacity: 0.5;
    filter: invert(1);

    @media screen and (max-width: 768px){
      width: 40px;
    }
  }
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: -1;
  mask-image: linear-gradient( rgba(0,0,0,0) 5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 80%);
}

#mesh-gradient.sixteen-elements {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  z-index: -10;
  align-items: center;
  justify-content: center;;
  opacity: 1;
  position: fixed;
  pointer-events: none;
  top:0;
  left:0;
  right:0;
  animation: rotateGroup 120s linear infinite;

  @media screen and (max-width: 768px){
    display: none;
  }

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 0 through 360 {
    $hue: ($i - 1) * calc(360 / 60);
    $color: hsl($hue, 100%, 50%);
    $mesh-colors: merge($mesh-colors, ($i: $color));
  }

  $i: 0;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      // background: linear-gradient(to bottom, rgba($color,0) 55%, rgba($color,.8));
      border: 1px solid rgba($color, .4);
      animation-delay: -#{$i * .15}s;
      width: 1px;
      height: 10dvw;
      border-radius: 5dvw;
      align-self: center;
      justify-self: center;
    }
  }

  .element {
    animation: sixteen-elements 10s linear infinite;
  }

  @keyframes rotateGroup {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sixteen-elements {
    0% {
      opacity:0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.6) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0) rotate(360deg);
    }
  }
}

</style>