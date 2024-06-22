<template>
  <main id="Hero">
    <div id="mesh-gradient" class="sixteen-elements">
      <div class="element" v-for="n in 160" :key="n"></div>
    </div>
    <section class="general-main page-top">
      <h1 class="home-max">Senior Product Designer</h1>
      <h2>I have two decades of <nuxt-link to="/about">experience</nuxt-link> in <span class="red">product design</span>, <span class="mint">software development</span>, and <span class="purple">developer tooling</span>.</h2>
      <!-- <section class="buttons">
        <Button to="/products" text="Explore my work" type="big" />
        <Button to="/booking" text="Get in touch" type="big clear" />
      </section> -->
      <h3>I make <nuxt-link to="/products">clean, clear interfaces</nuxt-link> for folks building fun software - myself included. If you’d like to commission a work, <a href="rami@ramijames.com">send me an email</a>.</h3>
    </section>
    <section id="Products">
      <div class="project ultra">
        <section class="info">
          <h1>Ultra</h1>
          <p>Tokenized game licenses and digital items</p>
          <Button to="/products/ultra" text="View project" type="big" />
        </section>
      </div>
      <div class="project scatter">
        <section class="info">
          <h1>Scatter</h1>
          <p>Web3 Wallet, Digital Identity, and Marketplace</p>
          <Button to="/products/scatter" text="View project" type="big" />
        </section>
      </div>
      <div class="project foodforfuture">
        <section class="info">
          <h1>Food for Future</h1>
          <p>Decentralized data for funding farmers</p>
          <Button to="/products/food-for-future" text="View project" type="big" />
        </section>
      </div>
      <div class="project doodledapp">
        <section class="info">
          <h1>Doodledapp</h1>
          <p>No-code smart contract development, deployment, and component marketplace</p>
          <Button to="/products/doodledapp" text="View project" type="big" />
        </section>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>

@import './assets/variables';

#Products {
  .project {
    background-size: cover;
    height: 580px;
    width: 100dvw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: white;
    padding: $spacing-xl;

    @media screen and (max-width: 1000px){
      align-items: center;
    }

    &.ultra {
      background: url('/homepage/hp-ultra.png') no-repeat center center;

      @media screen and (max-width: 1000px){
        align-items: center;
        background-position: center right;
      }
    }

    &.scatter {
      background: url('/homepage/hp-scatter.png') no-repeat center center;
      align-items: flex-end;

      @media screen and (max-width: 1000px){
        align-items: center;
      }
    }

    &.doodledapp {
      background: url('/homepage/hp-doodledapp.png') no-repeat center center;
      align-items: flex-end;

      @media screen and (max-width: 1000px){
        align-items: center;
      }
    }

    &.foodforfuture {
      background: url('/homepage/hp-fff.png') no-repeat center center;

      @media screen and (max-width: 1000px){
        align-items: center;
        background-position: center right;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: $spacing-sm 0;

      h1 {
        margin: 0;
        text-shadow: 0 4px 10px rgba($black, 0.25), 0 2px 2px rgba($black, 0.25), 0 1px 1px rgba($black, 0.5);
      }

      p {
        text-align: center;
        text-shadow: 0 4px 10px rgba($black, 0.25), 0 2px 2px rgba($black, 0.25), 0 1px 1px rgba($black, 0.5);
      }
    }
  }
}

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

  .home-max {
    background: linear-gradient(120deg, $white-light 30%, darken($teal-dark,20%) 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
    
  &::before {
    background: linear-gradient(to bottom, $black 0%, rgba($black, 0) 100%);
  }

  &::after {
    background: linear-gradient(to top, $black-dark 0%, rgba($black-dark, 0) 100%);
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
  z-index: -1;
  align-items: center;
  justify-content: center;;
  opacity: 0.1;
  position: fixed;
  top:0;
  left:0;
  right:0;
  transform: rotate(22.5deg);

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
      // box-shadow: inset 0 0 100px rgba($color, 0.85), 0 0 100px rgba($color, 0.85);
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