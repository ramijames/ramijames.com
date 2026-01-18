<template>

  <PageHeader title="CSS Mesh Gradients" tagline="Neat things that you can do with filter blur" />

  <main class="w-content page-top">
    <section class="content">

      <section id="example">
        <div id="mesh-gradient" class="ramijames-elements">
          <div class="element" v-for="n in 16" :key="n"></div>
        </div>
      </section>

      <p>On <a href="https://x.com/tonilijic/status/1800551272598364591">Twitter</a>, a guy named Toni Lijic was showing off how the new iOS version allows you to quickly and easily make mesh gradients as a background within iOS. It is a cool effect, and I wanted to see if I could recreate it using CSS.</p>

      <h3>Positioned Elements</h3>
      <p>I think the first step is to try and create a mesh gradient using a combination of four elements with blurs, which we can control their color dominace in a similar fashion to a mesh gradient.</p>
      <CodeBlock :code="htmlCode" lang="html" />
      
      <CodeBlock :code="scssCode1" lang="scss" />
      <p>What we're doing is:</p>
      <ul>
        <li>Setting a gradient background</li>
        <li>Creating four elements, top two are red, bottom two are blue</li>
        <li>Positioning them in the corners of the screen</li>
        <li>Blurring them</li>
        <li>Animating their opacity and scale</li>
        <li>Adding an animation-delay to stagger the animations</li>
      </ul>
      <div id="simulator">
        <div id="phone">
          <div id="screen">
            <div id="notch"></div>
            <div id="mesh-gradient" class="four-elements">
              <div id="notch"></div>
              <div class="element top-left"></div>
              <div class="element top-right"></div>
              <div class="element bottom-left"></div>
              <div class="element bottom-right"></div>
            </div>
          </div>
        </div>  
      </div>
      <p>This gives a nice flowing and repeatable effect which we can customize easily to any color combination. What is really interesting about this technique is that we can build up even more complicated meshes by adding more elements and colors.</p>

      <p>To get a better sense of what is going on, you can remove the blur and see just the elements.</p>

      <div id="simulator">
        <div id="phone">
          <div id="screen">
            <div id="notch"></div>
            <div id="mesh-gradient" class="sixteen-elements">
              <div id="notch"></div>
              <div class="element" v-for="n in 32" :key="n"></div>
            </div>
          </div>
        </div>  
        <div id="phone">
          <div id="screen">
            <div id="notch"></div>
            <div id="mesh-gradient" class="sixteen-elements no-blur">
              <div id="notch"></div>
              <div class="element" v-for="n in 32" :key="n"></div>
            </div>
          </div>
        </div>  
      </div>

      <p>Here's the Sass that generated this.</p>

      <CodeBlock :code="scssCode2" lang="scss" />

      <h3>Conclusion</h3>
      <p>So, this is a fun little experiment that I think could be used in a lot of different ways. I think it would be cool to see this used in a more subtle way as a background for a site. I think it could also be used as a loading animation or a background for a hero section. I think the possibilities are endless.</p>
    </section>
  </main>
  <PostsExtras />
  <Footer />
</template>

<style lang="scss" scoped>
$apple-red: #FF1E49;
$apple-blue: #2E53F9;

#example {
  width: 100%;
  height: 800px;
  overflow: hidden;
  position: relative;
  background: $white linear-gradient(180deg, $white 40%, $gray-dark 120%);
  border-radius: $br-sm;
  border: 1px solid rgba($black, 0.2);
  margin-bottom: $spacing-lg;

  .special-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    text-align: center;
    color: $white !important;
    font-size: $font-size-mega;
    line-height: 100%;

    @media screen and (max-width: 768px){
      font-size: $font-size-xl;
    }
  }
}

#mesh-gradient.four-elements {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    position: relative;
    background: linear-gradient(180deg, $black -20%, $apple-red 45%, $apple-blue 100%);

    .element {
      position: absolute;
      border-radius: 100px;
      filter: blur(200px);
      transition: background 1s;
    }

    .top-left {
      top: 0;
      left: 0;
      width: 50%;
      height: 50%;
      background: $apple-red;
      opacity: 0;
      animation: four-elements 10s linear infinite;
      animation-delay: 0s;
    }

    .top-right {
      top: 0;
      right: 0;
      width: 50%;
      height: 50%;
      background: $apple-red;
      opacity: 0;
      animation: four-elements 10s linear infinite;
      animation-delay: -10s;
    }

    .bottom-left {
      bottom: 0;
      left: 0;
      width: 50%;
      height: 50%;
      background: $purple;
      opacity: 0;
      animation: four-elements 10s linear infinite;
      animation-delay: 0;
    }

    .bottom-right {
      bottom: 0;
      right: 0;
      width: 50%;
      height: 50%;
      background: $apple-blue;
      opacity: 0;
      animation: four-elements 10s linear infinite;
      animation-delay: -12.5s;
    }

    @keyframes four-elements {
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
  }

#mesh-gradient.sixteen-elements {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  position: relative;

  // generate a linear gradient from the $mesh-colors
  background: linear-gradient(180deg, $orange 20%, $mint 50%, $purple 80%);

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 1 through 32 {
    $hue: ($i - 1) * calc(360 / 32);
    $color: hsl($hue, 100%, 50%);
    $mesh-colors: merge($mesh-colors, ($i: $color));
  }

  $i: 1;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      background: $color;
      animation-delay: -#{$i * 0.625}s;
    }
  }

  .element {
    border-radius: 100px;
    animation: sixteen-elements 10s linear infinite;
  }

  &::after {
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(black, 0.01);
    backdrop-filter: blur(20px);
    z-index: 1;
  }

  &.no-blur {
    
    &::after {
      display:none;
    }

  }

  @keyframes sixteen-elements {
    0% {
      opacity:0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
}

#mesh-gradient.ramijames-elements {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  position: relative;

  $mesh-colors: (
    blue: #6A7CBE,
    blue-dark: #404AA4,
    orange: #CAA466,
    orange-dark: #B5803D,
    green: #5B7D39,
    purple: #A276B2,
    purple-dark: #7D4793,
    red: #F29453,
    mint: #C3D5AD,
    mint-dark: #ABC48C,
    gray: #DBD7E1,
    gray-dark: #CDC7D5,
    teal: #82A0CE,
    teal-dark: #507ABA,
    apple-red: #FF1E49,
    apple-blue: #2E53F9
  );

  $i: 1;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      background-color: $color;
      animation-delay: -#{$i * 1.625}s;
    }
  }

  .element {
    border-radius: 100px;
    animation: sixteen-elements 6s linear infinite;
    mix-blend-mode: hard-light;
  }

  &::after {
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(black, 0.01);
    backdrop-filter: blur(50px);
    z-index: 1;
  }

  @keyframes sixteen-elements {
    0% {
      opacity:0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(2.5);
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
}


</style>

<script setup>

useHead({
  title: 'CSS Mesh Gradients'
})

useSeoMeta({
  title: 'CSS Mesh Gradients',
  ogTitle: 'CSS Mesh Gradients',
  description: 'Apple recently released Mesh Gradients as a feature for iOS development. Let us see if we can replicate this in CSS.',
  ogDescription: 'Apple recently released Mesh Gradients as a feature for iOS development. Let us see if we can replicate this in CSS.',
  ogImage: '/labs/gradient-mesh.png',
  url: 'https://www.ramijames.com/thoughts/css-mesh-gradients',
  twitterTitle: 'CSS Mesh Gradients',
  twitterDescription: 'Apple recently released Mesh Gradients as a feature for iOS development. Let us see if we can replicate this in CSS.',
  twitterImage: '/labs/gradient-mesh.png',
  twitterCard: 'summary_large_image'
})

// Code examples for the article
const htmlCode = `<div id="mesh-gradient" class="four-elements">
  <div class="element top-left"></div>
  <div class="element top-right"></div>
  <div class="element bottom-left"></div>
  <div class="element bottom-right"></div>
</div>`

const scssCode1 = `#mesh-gradient.four-elements {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  position: relative;
  background: linear-gradient(180deg, $apple-red 20%, lighten($apple-red, 5%) 35%, $apple-blue 70%);

  .element {
    position: absolute;
    border-radius: 100px;
    filter: blur(200px);
    transition: background 1s;
  }

  .top-left {
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    background: $apple-red;
    opacity: 0;
    animation: four-elements 10s linear infinite;
    animation-delay: 0s;
  }

  .top-right {
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    background: $apple-red;
    opacity: 0;
    animation: four-elements 10s linear infinite;
    animation-delay: -10s;
  }

  .bottom-left {
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50%;
    background: $apple-blue;
    opacity: 0;
    animation: four-elements 10s linear infinite;
    animation-delay: 0;
  }

  .bottom-right {
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50%;
    background: $apple-blue;
    opacity: 0;
    animation: four-elements 10s linear infinite;
    animation-delay: -12.5s;
  }

  @keyframes four-elements {
    0% {
      opacity: 0;
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
}`

const scssCode2 = `#mesh-gradient.sixteen-elements {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  position: relative;

  // generate a linear gradient from the $mesh-colors
  background: linear-gradient(180deg, $orange 20%, $mint 50%, $purple 80%);

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 1 through 32 {
    $hue: ($i - 1) * calc(360 / 32);
    $color: hsl($hue, 100%, 50%);
    $mesh-colors: merge($mesh-colors, ($i: $color));
  }

  $i: 1;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      background: $color;
      animation-delay: -#{$i * 0.625}s;
    }
  }

  .element {
    border-radius: 100px;
    animation: sixteen-elements 10s linear infinite;
  }

  &::after {
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(black, 0.01);
    backdrop-filter: blur(20px);
    z-index: 1;
  }

  &.no-blur {
    &::after {
      display: none;
    }
  }

  @keyframes sixteen-elements {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.5);
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
}`


</script>