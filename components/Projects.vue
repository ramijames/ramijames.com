<template>
  <main id="ProjectsMain">
    <!-- <div class="mask">
      <div id="mesh-gradient" class="sixteen-elements">
        <div class="element" v-for="n in 160" :key="n"></div>
      </div>
    </div> -->
    <section class="products-hero">
      <section class="intro-text w-three-quarters">
        <p class="small blue">
          Love for products
        </p>
        <p>
          <span>R</span>
          <span>e</span>
          <span>c</span>
          <span>e</span>
          <span>n</span>
          <span>t</span>
          <span>&nbsp;</span>
          <span>W</span>
          <span>o</span>
          <span>r</span>
          <span>k</span>
        </p>
        <section class="products-buttons">
          <nuxt-link class="button large" to="/services">What can I do for you?</nuxt-link>
          <a class="button large" href="mailto:ramijames@gmail.com">Say hello!</a>
          <div class="arrow-down">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22 42C33.0457 42 42 33.0457 42 22C42 10.9543 33.0457 2 22 2C10.9543 2 2 10.9543 2 22C2 33.0457 10.9543 42 22 42ZM22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z" fill="white" fill-opacity="0.2"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21 30.5858V10H23V30.5858L27.6569 25.9289C28.0474 25.5384 28.6806 25.5384 29.0711 25.9289C29.4616 26.3195 29.4616 26.9526 29.0711 27.3431L22.7071 33.7071C22.3166 34.0976 21.6834 34.0976 21.2929 33.7071L14.9289 27.3431C14.5384 26.9526 14.5384 26.3195 14.9289 25.9289C15.3195 25.5384 15.9526 25.5384 16.3432 25.9289L21 30.5858Z" fill="white"/>
            </svg>
          </div>
        </section>
      </section>
    </section>
    <section id="projects" class="w-full" ref="projects">
      <section id="company-logos">
        <img src="/social-proof/wix.png" alt="Wix" />
        <img src="/social-proof/ibm.png" alt="IBM" />
        <img src="/social-proof/spiral.png" alt="Spiral" />
        <img src="/social-proof/wpt.png" alt="WPT" />
        <img src="/social-proof/qmarkets.png" alt="Qmarkets" />
        <img src="/social-proof/telos.png" alt="Telos" />
        <img src="/social-proof/ultra.png" alt="Ultra" />
      </section>
    </section>
  </main> 
  <MergedProjects />
</template>

<style scoped lang="scss">

@import './assets/variables';

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
    transform: skewY(0deg) scale(0.6);
    animation: skewIn .9s forwards ease-in-out;

    .products-buttons {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0;
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
    text-transform: uppercase;
    font-weight: 900;
    animation: shadowDrop 0.5s forwards ease-in-out;
    animation-delay: 0.4s;

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
      animation: shadowDropMobile 0.5s forwards ease-in-out;
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
    $mesh-colors: map-merge($mesh-colors, ($i: $color));
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