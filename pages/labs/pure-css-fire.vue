<template>
  <section id="example">
    <div id="mesh-gradient" class="fired-up">
      <div class="element" v-for="n in 16" :key="n"></div>
    </div>
    <h2 class="special-title">Pure CSS Fire</h2>
  </section>
  <main class="general-main page-top">

    <section class="content">
      <p>I was recently playing with creating a CSS version of <nuxt-link to="/thoughts/css-mesh-gradients">mesh gradients</nuxt-link>. The animation that came out of that was really pleasing to the eye, and i was excited to see what else I could do with the concepts there. In general, I like being able to take something highly structured, as html/css is, and use it to create something which feels wild and random.</p>
      <p>There's nothing more wild and random than fire, so let's create that.</p>
      <p>We won't be using SVGs, but we will lean on filters and other layering effects to create the billowing, wild look that we're going for. Here it is inside of a phone simulator:</p>
    </section>

    <div id="simulator">
      <div id="phone">
        <div id="screen" class="fire">
          <div id="notch"></div>
          <div id="mesh-gradient" class="fired-up">
            <div class="element" v-for="n in 32" :key="n"></div>
          </div>
        </div>
      </div> 
    </div>
    
    <p>If we turn off some of the effects, it quickly becomes much more clear what is going on:</p>
    
    <div id="simulator">
      <div id="phone">
        <div id="screen" class="">
          <div id="notch"></div>
          <div id="mesh-gradient" class="fired-up no-blur">
            <div class="element" v-for="n in 32" :key="n"></div>
          </div>
        </div>
      </div> 
    </div>

    <PostsExtras />
  </main>
  <Footer />
</template>

<style lang="scss" scoped>

@import './assets/variables';

$apple-red: #FF1E49;
$apple-blue: #2E53F9;

#example {
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
  filter: brightness(100%) contrast(600%);
  background: linear-gradient(0deg, #C0562A, #612378);
  perspective: 26em;
  box-shadow:  inset 0 0 2px 2px rgba(black, 0.2), inset 0 0 40px 20px rgba(white, 0.12);

  .special-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    text-align: center;
    color: $white !important;
    font-size: $font-size-mega;
    line-height: 100%;
    font-weight: 900;

    @media screen and (max-width: 768px){
      font-size: $font-size-xl;
    }
  }
}

@keyframes sixteen-elements {
  0% {
    opacity:0;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(2);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}


#mesh-gradient.fired-up {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr ;
  position: relative;
  gap: 1px;
  filter: blur(20px);
  transform: scale(1) rotate3d(93, 81, 85, 60deg);
  $mesh-colors: ();

  &.no-blur {
    filter: none;
  }

  // generate the colors with an HSL model
  @for $i from 0 through 15 {
    $hue: ($i - 1) * calc(60 / 16);
    $color: hsl($hue, 20%, 50%);
    $mesh-colors: map-merge($mesh-colors, ($i: $color));
  }

  $i: 0;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      background-color: $color;
      animation-delay: -#{$i * .6}s;
    }
  }

  .element {
    position: relative;
    animation: sixteen-elements 10s linear infinite;
    border-radius: 100%;
  }

}


</style>