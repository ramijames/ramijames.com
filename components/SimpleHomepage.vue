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
    <section id="Various" class="general-main">
      <div>
        <img src="/homepage/hp-scatter.png" alt="Scatter" />
        <section class="info">
          <p>Scatter</p>
          <p><small>2017-2020</small></p>
        </section>
      </div>
      <div>
        <img src="/homepage/hp-ultra.png" alt="Ultra" />
        <section class="info">
          <p>Ultra</p>
          <p><small>2020-2023</small></p>
        </section>
      </div>
      <div>
        <img src="/homepage/hp-fff.png" alt="Food for Future" />
        <section class="info">
          <p>Food for Future</p>
          <p><small>2023</small></p>
        </section>
      </div>
      <div>
        <img src="/homepage/hp-doodledapp.png" alt="Doodledapp" />
        <section class="info">
          <p>Doodledapp</p>
          <p><small>2023</small></p>
        </section>
      </div>
      <div>
        <img src="/homepage/hp-climbingmonster.png" alt="Climbing Monster" />
        <section class="info">
          <p>Climbing Monster</p>
          <p><small>2016</small></p>
        </section>
      </div>
      <div>
        <img src="/homepage/hp-src.png" alt="SRC" />
        <section class="info">
          <p>SRC</p>
          <p><small>2014</small></p>
        </section>
      </div>
      <div>
        <img src="/homepage/hp-tonara.png" alt="Tonara" />
        <section class="info">
          <p>Tonara</p>
          <p><small>2012</small></p>
        </section>
      </div>
      <div>
        <img src="/homepage/hp-legalaunch.png" alt="Legalaunch" />
        <section class="info">
          <p>Legalaunch</p>
          <p><small>2011</small></p>
        </section>
      </div>
    </section>
    <!-- <section class="general-main">
      <h1 class="home-max">Process & Services</h1>
      <h2>I can jump into your project and provide maximum value.</h2>
      <ul class="services">
        <li>Product Design</li>
        <li>User Experience</li>
        <li>Frontend Development</li>
        <li>Product Strategy</li>
        <li>Design Systems</li>
        <li>Design Leadership</li>
      </ul>
    </section> -->
  </main>
  <!-- <section id="featured">
    <section class="general-main page-top">
      <h2>I focus my efforts on creating user-centered solutions that drive business success.</h2>
    </section>
  </section> -->
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
  padding-bottom: 30rem;
  
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
    background: linear-gradient(120deg, $black-light 30%, darken($teal-dark,5%) 60%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
  padding: $spacing-md;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: $spacing-md;

  div {
    width: calc(50% - $spacing-md);
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
  opacity: 0.44;
  position: fixed;
  top:0;
  left:0;
  right:0;
  transform: rotate(22.5deg);

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 0 through 160 {
    $hue: ($i - 1) * (-80 / 160);
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