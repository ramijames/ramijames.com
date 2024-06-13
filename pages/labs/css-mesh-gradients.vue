<template>
  <section id="example">
    <div id="mesh-gradient" class="ramijames-elements">
      <div class="element" v-for="n in 16" :key="n"></div>
      <h2 class="special-title">CSS Mesh Gradients</h2>
    </div>
  </section>
  <main class="general-main page-top">
    <section class="article-extras">
      <AllPosts />
    </section>
    <section class="content">
      <p>On <a href="https://x.com/tonilijic/status/1800551272598364591">Twitter</a>, a guy named Toni Lijic was showing off how the new iOS version allows you to quickly and easily make mesh gradients as a background within iOS. It is a cool effect, and I wanted to see if I could recreate it using CSS.</p>
      <!-- <div id="simulator">
        <video src="/labs/GQwusCV43DDSc9KF.mp4" controls></video>
      </div> -->
      <h3>Naive Gradient Animation</h3>
      <p>So the easiest, but least pleasing way to go about this is with a simple css gradient. It gets you like 30% of the way towards the effect.</p>
      <p>Basically, this is just a well positioned radial-gradient that is animated to move around a bit. It's slow enough that if you don't pay attention, you can miss the wonkiness of the effect.</p>
      <pre class="code"><div class="type">CSS</div>
        <code>
    #mesh-gradient.naive {
      width: 100%;
      height: 100%;
      background: $apple-red radial-gradient(100% 50% at 50% 75%, $apple-blue 46%, rgba($apple-red, 0) 100%);
      background-size: 200% 200%;
      animation: naive-gradient 25s linear infinite;

      @keyframes naive-gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    }
        </code>
      </pre>
      <p>What it is critically missing to give it the flowing effect are two things:</p>
      <ul>
        <li>It needs more pink, which is achieved at the intersection between the colors as an interplay between the gradients.</li>
        <li>It needs to have a wave effect which happens as the diffent quadrants of the mesh alter their dominance.</li>
      </ul>
      <div id="simulator">
        <div id="phone">
          <div id="screen">
            <div id="notch"></div>
            <div id="mesh-gradient" class="naive"></div>
          </div>
        </div>  
      </div>


      <h3>Positioned Elements</h3>
      <p>So, the above was a good start, but it's not quite there. I think the next step is to try and create a mesh gradient using a combination of four elements with blurs, which we can control their color dominace in a similar fashion to a mesh gradient.</p>
      <pre class="code"><div class="type">HTML</div>
        <code v-pre>
    &lt;div id="mesh-gradient" class="four-elements"&gt;
      &lt;div class="element top-left"&gt;&lt;/div&gt;
      &lt;div class="element top-right"&gt;&lt;/div&gt;
      &lt;div class="element bottom-left"&gt;&lt;/div&gt;
      &lt;div class="element bottom-right"&gt;&lt;/div&gt;
    &lt;/div&gt;
        </code>
      </pre>
      
      <pre class="code"><div class="type">CSS</div>
        <code v-pre>
    #mesh-gradient.four-elements {
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
        </code>
      </pre>
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
            <div id="mesh-gradient" class="sixteen-elements">
              <div id="notch"></div>
              <div class="element no-blur" v-for="n in 32" :key="n"></div>
            </div>
          </div>
        </div>  
      </div>

      <p>Here's the Sass that generated this.</p>

      <pre class="code"><div class="type">CSS</div>
        <code v-pre>
    #mesh-gradient.sixteen-elements {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr ;
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      position: relative;
      background: $black-light;

      $mesh-colors: ();

      // generate the colors with an HSL model
      @for $i from 1 through 32 {
        $hue: ($i - 1) * (360 / 32);
        $color: hsl($hue, 100%, 50%);
        $mesh-colors: map-merge($mesh-colors, ($i: $color));
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

      .no-blur {
        filter: none;
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
    </code>
      </pre>

      <h3>Conclusion</h3>
      <p>So, this is a fun little experiment that I think could be used in a lot of different ways. I think it would be cool to see this used in a more subtle way as a background for a site. I think it could also be used as a loading animation or a background for a hero section. I think the possibilities are endless.</p>
    </section>
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

#simulator {
  background: $black url('/textures/texture-3-bg-dark.png') no-repeat center center;
  width: 100%;
  border-radius: $br-lg;
  margin: $spacing-lg 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: $spacing-lg;
  gap: $spacing-md;

  @media screen and (max-width: 768px){
    flex-direction: column;
    padding: $spacing-sm;
    border-radius: 30px;
  }

  video {
    width: 75%;
    border-radius: $br-lg;

    @media screen and (max-width: 768px){
      width: 100%;
    }
  }

  #phone {
    background: black;
    border: 1px solid rgba(white, 0.48);
    box-shadow: inset 0 -4px 4px 0px rgba(white, 0.32), inset 0 44px 14px 6px rgba(white, 0.12), inset 0 0 2px 4px rgba(white, 0.12), 0 10px 10px 5px rgba(black, 0.42);
    width: 345px;
    height: 717px;
    padding: 15px;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    #screen {
      background: $black;
      width: 100%;
      height: 100%;
      border-radius: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      box-shadow: 0 1px 0 0 rgba(white, 0.52);

      #notch {
        height: 30px;
        width: 105px;
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        background: black;
        border-radius: 20px;
        z-index: 1;
      }

      #mesh-gradient.naive {
        width: 100%;
        height: 100%;
        background: $apple-red radial-gradient(100% 50% at 50% 75%, $apple-blue 46%, rgba($apple-red, 0) 100%);
        background-size: 200% 200%;
        animation: naive-gradient 25s linear infinite;

        @keyframes naive-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
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

  $mesh-colors: ();

  // generate the colors with an HSL model
  @for $i from 1 through 32 {
    $hue: ($i - 1) * (360 / 32);
    $color: hsl($hue, 100%, 50%);
    $mesh-colors: map-merge($mesh-colors, ($i: $color));
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

  .no-blur {
    filter: none;
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
    filter: blur(50px);
    animation: sixteen-elements 10s linear infinite;
    mix-blend-mode: hard-light;
  }

  .no-blur {
    filter: none;
  }

  @keyframes sixteen-elements {
    0% {
      opacity:0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(4);
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
}


</style>