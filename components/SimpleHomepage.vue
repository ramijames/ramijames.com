<template>
  <main id="Hero">
    <!-- <div id="mesh-gradient" class="sixteen-elements">
      <div class="element" v-for="n in 160" :key="n"></div>
    </div> -->
    <section class="mega-hero">
      <section class="intro-text w-three-quarters">
        <p>
          <span>H</span>
          <span>e</span>
          <span>l</span>
          <span>l</span>
          <span>o</span>
          <span>.</span>
        </p>
        <p class="secondary">I am a product-first designer and developer with founder experience. My core interest is in creating innovative tools with creative partners like you. I'm currently building <a href="https://www.vewrite.com">Vewrite</a>, a project management tool for technical writing teams.</p>
        <section class="home-buttons">
          <nuxt-link class="button large" to="/about">Who am I?</nuxt-link>
          <nuxt-link class="button large" to="/services">Why work with me?</nuxt-link>
          <!-- <a class="button large" href="mailto:ramijames@gmail.com">Say hello!</a> -->
          <div class="arrow-down">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22 42C33.0457 42 42 33.0457 42 22C42 10.9543 33.0457 2 22 2C10.9543 2 2 10.9543 2 22C2 33.0457 10.9543 42 22 42ZM22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z" fill="white" fill-opacity="0.2"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21 30.5858V10H23V30.5858L27.6569 25.9289C28.0474 25.5384 28.6806 25.5384 29.0711 25.9289C29.4616 26.3195 29.4616 26.9526 29.0711 27.3431L22.7071 33.7071C22.3166 34.0976 21.6834 34.0976 21.2929 33.7071L14.9289 27.3431C14.5384 26.9526 14.5384 26.3195 14.9289 25.9289C15.3195 25.5384 15.9526 25.5384 16.3432 25.9289L21 30.5858Z" fill="white"/>
            </svg>

          </div>
        </section>
      </section>
    </section>
  </main>
  <MergedProjects />
  <ProductFirst />
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
  min-height: 80vh;

  .mega-hero {
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

      .home-buttons {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0;
        margin-top: $spacing-md;
        animation: fadeInUp 0.5s forwards ease-in-out;
        opacity: 0;
        animation-delay: 1.05s;

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
      font-size: 10vw;
      line-height: 100%;
      letter-spacing: -0.1rem;
      text-wrap: balance;
      font-family: $font-family-main;
      margin-bottom: $spacing-md;
      color: $black;

      &.small {
        font-size: $font-size-md;
        letter-spacing: 0.1rem;
        font-weight: 500;
        animation: fadeInUp 0.5s forwards ease-in-out;
        animation-delay: 1.05s;
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
        font-size: 12vw;
        text-wrap: balance;
      }
    }

    p.secondary {
      font-size: $font-size-md;
      text-transform: none;
      font-weight: normal;
      max-width: 300px;
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

}

#Problems {
  animation: fadeInUp 0.5s forwards ease-in-out;
  transform: translateY(20px);
  animation-delay: 1.05s;
  opacity: 0;

  h2 {
    font-weight: 100;
    text-wrap: balance;
    font-family: $font-family-main;
    margin: 0 auto $spacing-lg;
    text-transform: uppercase;
    text-align: center;
  }

  #Solutions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: $spacing-lg;
    position: relative;
    opacity: 0;
    transform: translateY(-20px);
    animation: fadeInUp 0.3s forwards ease-in-out;
    animation-delay: 0.4s;
    margin-bottom: $spacing-xl;

    @media screen and (max-width: 1800px){
      gap: $spacing-sm;
    }

    @media screen and (max-width: 1600px){
      grid-template-columns: 1fr 1fr;
      gap: $spacing-sm;
    }

    @media screen and (max-width: 768px){
      grid-template-columns: 1fr;
    }

    .single-solution {
      display: flex;
      flex-direction: column;

      &:hover {
        .icon {
          background: linear-gradient(180deg, rgba($blue, 0.7), rgba($blue, 0.3));
          transform: rotate(0deg) scale(1);
        }
      }

      .blue-box {
        border-radius: $br-md;
        // border: 2px solid rgba($blue, .4);
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        padding: 5rem $spacing-md $spacing-md $spacing-md;
        display: flex;
        flex-direction: column;
        margin-bottom: $spacing-md;
        background: linear-gradient(180deg, rgba($blue, 0.3), rgba($blue, 0.1));
        backdrop-filter: blur(8px);
        height: 100%;

        p {
          color: $white;
          line-height: 140%;
          opacity: 0.6;
          font-size: $font-size-sm;
        } 
      }

      .icon {
        max-width: 100px;
        margin-bottom: -4rem;
        z-index: 1;
        margin-left: $spacing-md;
        padding: $spacing-sm;
        background: linear-gradient(180deg, rgba($blue, 0.6), rgba($blue, 0.1));
        box-shadow:inset -1px -1px 10px rgba($blue, 0.4);
        transform: rotate(-5deg) scale(0.9);
        backdrop-filter: blur(3px);
        border-radius: $br-md;
        transition: all 0.3s ease-in-out;

        img {
          width: 100%;
          height: auto;
        }
      }
      
    }
  }
}

#RecentWork {
  animation: fadeInUp 0.5s forwards ease-in-out;
  transform: translateY(20px);
  animation-delay: 0.4s;
  opacity: 0;
  
  h2 {
    text-wrap: balance;
    font-family: $font-family-main;
    font-size: $font-size-max;
    margin: $spacing-lg auto 0;
    margin: 0 auto;
    text-align: center;
    color: $white;
    padding: $spacing-md $spacing-lg;
    position: absolute;
    left: 20px;
    top: -50px;
    transform: rotate(-5deg);
    border-radius: $br-md;
    transition: all 0.3s ease-in-out;

    svg {
      position: absolute;
      top: 70px;
      left: -40px;

      @media screen and (max-width: 768px){
        display: none;
      }
    }

    @media screen and (max-width: 768px){
      font-size: $font-size-xl;
      top: -20px;
      left: 50%;
      width: 79%;
      transform: translateX(-50%);
      padding: $spacing-md;
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr;
  z-index: -10;
  align-items: center;
  justify-content: center;;
  opacity: 1;
  position: fixed;
  pointer-events: none;
  top:0;
  left:0;
  right:0;
  mask-image: linear-gradient( rgba(0,0,0,0) 5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 80%);

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
      animation-delay: -#{$i * .25}s;
      width: 4dvw;
      height: 20dvw;
      border-radius: 50%;
      align-self: center;
      justify-self: center;
    }
  }

  .element {
    animation: sixteen-elements 20s linear infinite;
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