<template>
  <section id="example">
    <div id="mesh-gradient" class="ramijames-elements">
      <div class="element" v-for="n in 16" :key="n"></div>
      <h2 class="special-title">Interactive Mesh Gradient</h2>
    </div>
  </section>
  <main class="general-main page-top">
    <section class="content">
      <p>Recently, I was playing with creating a CSS version of <nuxt-link to="/thoughts/css-mesh-gradients">mesh gradients</nuxt-link>. It occurred to me that it wouldn't be too hard to create a Vue component that allows these to be interactive. So, let's do that, but first a quick recap to explain what it is that a mesh gradient actually is so that we can understand what it is that we're building.</p>
      <p>When you have a traditional gradient you will have a linear or radial progression of colors. You can think of it as a 2d line. It goes one way.</p>
      <img src="/labs/regular-gradient.png" alt="Gradient" />
      <p>With a mesh gradient, you have to think of it as a matrix. It has both width and height. It goes in two directions.</p>
      <img src="/labs/mesh-gradient.png" alt="Gradient" />
      <p>Unfortunatly, CSS (or Figma) doesn't have a native way to actually build this, so we have to fudge it.</p>
      <p>The solution that I proposed in the previous article was to have a container, with its overflow hidden, and a series of internal elements which are all using filter: blur(); to bleed the colors into one another. You can see below the implemented mesh-gradient and a wire-frame version. If you're interested in the exact code for how to do this, please take a look <nuxt-link to="/labs/css-mesh-gradients">at this article</nuxt-link>.</p>
    </section>
    <div id="simulator">
      <div id="phone">
        <div id="screen">
          <div id="notch"></div>
          <div id="mesh-gradient" class="illustrative">
            <div class="element" v-for="n in 16" :key="n"></div>
          </div>
        </div>
      </div>  
      <div id="phone">
        <div id="screen">
          <div id="notch"></div>
          <div id="mesh-gradient" class="illustrative">
            <div class="element simplified" v-for="n in 16" :key="n"></div>
          </div>
        </div>
      </div>  
    </div>
    <h3>Interactivity</h3>
    <p>Let's talk for a second about what interactivity actually could mean, so that we know what it is that we're going to implement. There are two possible interactions which I think would be interesting:</p>
    <ul>
      <li>Hovering over the mesh gradient to show the different colors, making it an interactive play thing</li>
      <li>Changing the mesh gradient by adding or removing nodes, making it a tool for editing mesh gradients</li>
    </ul>
    <h4>Mesh Gradient Play Thing</h4>
    <p>For the first interaction, we're going to make it so that when you hover over the mesh gradient, it will show the colors of the mesh gradient. This is a simple interaction, and a way to show off the mesh gradient in a way that is a step up from a non-interactive animation.</p>
    <div id="simulator">
      <div id="blank">
        <div id="mesh-gradient" class="play-thing" ref="play-thing">
          <div class="element" v-for="n in 64" :key="n"></div>
        </div>
      </div>
    </div>
    <h4>Mesh Gradient Editor</h4>
    <PostsExtras />
  </main>
  <Footer />
</template>

<style lang="scss" scoped>
$apple-red: #FF1E49;
$apple-blue: #2E53F9;

#example {
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
  background: $black linear-gradient(180deg, $black 40%, $gray-dark 120%);

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

    @media screen and (max-width: 768px){
      font-size: $font-size-xl;
    }
  }
}

#mesh-gradient.illustrative {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  position: relative;

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
      background-color: $color;
      animation-delay: -#{$i * 0.625}s;
    }
  }

  .element {
    border-radius: 100px;
    filter: blur(50px);
    animation: sixteen-elements 10s linear infinite;
  }

  .simplified {
    filter: none;
    background-color: transparent !important;
    border: 1px solid rgba(white, 0.32) !important;
    border-radius: 0;
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
}

#mesh-gradient.play-thing {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  position: relative;

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 0 through 63 {
    $hue: ($i - 1) * calc(360 / 64);
    $color: hsl($hue, 50%, 50%);
    $mesh-colors: merge($mesh-colors, ($i: $color));
  }

  $i: 0;
  @each $name, $color in $mesh-colors {
    $i: $i + 1;
    .element:nth-child(#{$i}) {
      background-color: $color;
    }
  }

  .element {
    // border-radius: 100%;
    // transform: scale(1.5);
    transition: all 0.15s;
    opacity: .3;
    position: relative;

    &:hover {
      opacity: 1;
      // transform: scale(1);
      z-index: 9;

      &:after {
        opacity: 1;
      }
    }

    &:after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 300%;
      height: 300%;
      background: rgba($white, 0);
      filter: blur(30px);
      transition: opacity 0.5s;
      z-index: 10;
      pointer-events: none;
      border-radius: 100%;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($black, 0);
    backdrop-filter: blur(30px);
    transition: opacity 0.5s;
    z-index: 10;
    pointer-events: none;
  }

}

</style>