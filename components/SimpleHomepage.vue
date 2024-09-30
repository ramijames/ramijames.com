<!-- 
 
Objective 

The point of this page is to explain:

- Who I am
- Talk a bit about problems that startups face when developing a product
- Explain why my methodology is beneficial for those who are looking to build a product
- Show some of my recent work
- Show some of my recent blog posts

-->

<template>
  <main id="Hero">
    <div id="mesh-gradient" class="sixteen-elements">
      <div class="element" v-for="n in 160" :key="n"></div>
    </div>
    <section class="mega-hero">
      <section class="intro-text w-three-quarters">
        <p class="small">
          Rami James
        </p>
        <p class="small blue">
          Founder, designer, & developer
        </p>
        <p>
          <span>D</span>
          <span>e</span>
          <span>s</span>
          <span>i</span>
          <span>g</span>
          <span>n</span>
          <span>,</span>
          <span>&nbsp;</span>
          <span>b</span>
          <span>u</span>
          <span>i</span>
          <span>l</span>
          <span>d</span>
          <span>,</span>
          <span>&nbsp;</span>
          <br>
          <span>&</span>
          <span>&nbsp;</span>
          <span>s</span>
          <span>h</span>
          <span>i</span>
          <span>p</span>
          <span>&nbsp;</span>
          <span>y</span>
          <span>o</span>
          <span>u</span>
          <span>r</span>
          <span>&nbsp;</span>
          <span>p</span>
          <span>r</span>
          <span>o</span>
          <span>d</span>
          <span>u</span>
          <span>c</span>
          <span>t</span>
        </p>
        <!-- <p class="secondary">I am a product-minded designer and developer with founder experience. My core interest is in creating innovative tools with creative partners like you.</p> -->
        <section class="home-buttons">
          <nuxt-link class="button large" to="/services">Why work with me?</nuxt-link>
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
    <!-- <section id="Problems" class="w-three-quarters">
      <h2>Put your product in the right hands</h2>
      <section id="Solutions">
        <div class="single-solution">
          <div class="icon">
            <img src="/services/ai.png" alt="Idea icon" />
          </div>
          <div class="blue-box">
            <h3>Problem</h3>
            <p>Building a product is hard. It's even harder when you're not sure what to build. You might have a great idea, but how do you know if it's the right idea?</p>
          </div>
        </div>
        <div class="single-solution">
          <div class="icon">
            <img src="/services/budget.png" alt="Idea icon" />
          </div>
          <div class="blue-box">
            <h3>Affordable</h3>
            <p>My preference is to work with small, agile, and fast-growing teams. They tend to be strapped for cash, and I'm happy to provide them with affordable services while they scale.</p>
            <p><nuxt-link class="button clear" to="/services#rate">See rates</nuxt-link></p>
          </div>
        </div>
        <div class="single-solution">
          <div class="icon">
            <img src="/services/iterate.png" alt="Idea icon" />
          </div>
          <div class="blue-box">
            <h3>Fast</h3>
            <p>My methodology focuses on fast iteration, so that's exactly what you get. Within a matter of hours your project gets started, and within weeks you'll have designs you can publicly validate.</p>
          </div>
        </div>
        <div class="single-solution">
          <div class="icon">
            <img src="/services/team.png" alt="Idea icon" />
          </div>
          <div class="blue-box">
            <h3>Team Player</h3>
            <p>I'm friendly and work well within a team. Having </p>
          </div>
        </div>
        
      </section>
    </section> -->
    <section id="RecentWork" class="w-three-quarters">
      <h2 class="blue">
        <svg width="80" height="139" viewBox="0 0 80 139" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M66.1469 127.638C67.0518 127.005 67.2719 125.758 66.6385 124.853L56.3161 110.107C55.6827 109.202 54.4356 108.982 53.5307 109.615C52.6259 110.249 52.4058 111.496 53.0392 112.401L62.2146 125.508L49.1069 134.684C48.202 135.317 47.9819 136.564 48.6154 137.469C49.2488 138.374 50.4958 138.594 51.4007 137.961L66.1469 127.638ZM78.3774 0.0993819C20.1798 19.1641 -1.64208 47.6941 1.01012 73.951C3.6377 99.964 30.2043 121.89 64.6524 127.97L65.3476 124.03C31.7957 118.11 7.36229 97.036 4.98987 73.549C2.64208 50.3059 21.8203 22.8359 79.6226 3.90062L78.3774 0.0993819Z" fill="white"/>
        </svg>
        My Recent Work
      </h2>
      <MergedProjects />
    </section>
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
      font-size: 6vw;
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
        font-size: 11vw;
        text-wrap: balance;
        animation: shadowDropMobile 0.5s forwards ease-in-out;
      }
    }

    p.secondary {
      font-size: $font-size-lg;
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