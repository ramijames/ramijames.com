<template>
  <main id="hero" ref="animatorHero" class="general-main">
    <section class="images">
      <img ref="triangle" src="/shapes/hero-triangle.png" class="triangle" alt="Your project is layered">
      <img ref="hummingbird" src="/hummingbird.png" class="hummingbird" alt="Your project is beautiful">
      <img ref="floatingShapes1" src="/shapes/floating-shapes-1.png" class="floating-shapes-1" alt="Woooo!">
      <!-- <img ref="floatingShapes2" src="/shapes/floating-shapes-2.png" class="floating-shapes-2" alt="Woooo!"> -->
      <img ref="floatingShapes3" src="/shapes/floating-shapes-3.png" class="floating-shapes-3" alt="Woooo!">
    </section>
    <section class="text">
      <h1 ref="heroText">
          Ideate.<br>
          <span class="design">Design.</span><br>
          <span class="ship">Ship.</span>
      </h1>
      <div class="go-row">
        <h4 class="small">I help startups, small teams, and solopreneurs:</h4>
        <ul class="help-them">
          <li>
            <img src="/hero/vision.svg" alt="" />
            <span>Improve their product vision and definition</span>
          </li>
          <li>
            <img src="/hero/process.svg" alt="" />
            <span>Define a product process</span>
          </li>
          <li>
            <img src="/hero/data.svg" alt="" />
            <span>Be data-driven</span>
          </li>
          <li>
            <img src="/hero/error.svg" alt="" />
            <span>Identify issues with their products</span>
          </li>
          <li>
            <img src="/hero/wireframe.svg" alt="" />
            <span>Create wireframes and prototypes</span>
          </li>
          <li>
            <img src="/hero/designs.svg" alt="" />
            <span>Create friendly and attractive designs</span>
          </li>
        </ul>
        <!-- <div class="button-row">
          <Button text="Book a call" size="default" to="#booking" />
          <span>Capacity available</span>
        </div> -->
      </div>
    </section>
  </main>
</template>

<script>

import Button from './Button.vue'
import { onMounted, onUnmounted, ref } from 'vue';

export default {
  // ...
  setup() {
    const triangle = ref(null);
    const hummingbird = ref(null);
    const floatingShapes1 = ref(null);
    const floatingShapes3 = ref(null);
    const heroText = ref(null);

    const handleScroll = () => {
      if (triangle.value && hummingbird.value && floatingShapes1.value && floatingShapes3.value) {
        const scrollY = window.scrollY;
        triangle.value.style.transform = `translateY(${scrollY * -0.8}px)`;
        hummingbird.value.style.transform = `translateY(${scrollY * -0.5}px)`;
        floatingShapes1.value.style.transform = `translateY(${scrollY * -1}px)`;
        floatingShapes3.value.style.transform = `translateY(${scrollY * -1}px)`;
        heroText.value.style.lineHeight = `${80 - scrollY * 0.4}%`;
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      triangle,
      hummingbird,
      floatingShapes1,
      floatingShapes3,
      heroText,
    };
  },
};

</script>

<style scoped lang="scss">

@import './assets/variables';

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes antispin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

.desktop-only {
  display: block;

  @media screen and (max-width: 768px) {
    display: none;
  }
}

#hero {
  display:flex;
  flex-direction: row;
  align-items: flex-start;
  padding: $spacing-lg 0;
  position: relative;

  @media screen and (max-width: 768px){
    flex-direction: column;
    align-items: flex-end;
    overflow: hidden;
  }

  .text {
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 2;
    width: 55%;
    position: relative;

    @media screen and (max-width: 768px){
      width: 100%;
      margin-top: $spacing-md;
    }
  }

  .help-them {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin:0;
    padding:0;
    width: 100%;

    li {
      display:flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: $spacing-sm;
      list-style: none;
      margin:0;
      font-family: $font-family-main, 'sans-serif';
      font-size: $font-size-sm;
      font-weight: 500;
      color: lighten($black, 20%);
      line-height: $font-size-sm * $multiplier;

      span {
        margin: 0 auto;
      }
      
      img {
        width: 46px;
        height: auto;
        margin: 0 auto;
        display: block;
      }
    }
  }

  .go-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 50px;
    position: relative;
    width: 100%;

    .button-row {
      display:flex;
      flex-direction: row;
      align-items: center;

      @media screen and (max-width: 1000px){
        flex-direction: column;
        align-items: flex-start;
        gap: $spacing-sm;

      }

      span {
        font-size: $font-size-sm;
        color: #7D4893;
        margin-left: $spacing-sm;

        @media screen and (max-width: 1000px){
          margin-left: 0;
        }

        &::before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: $green;
          margin-right: $spacing-xs;
        
        }
      }
    }

  }

  .images {
    width: 45%;
    margin: 0 auto;

    @media screen and (max-width: 768px){
      transform: scaleX(-1);
      position: absollute;
      right: 150px;
    }

    .floating-shapes-1 {
      position: absolute;
      right: 100px;
      top: -100px;
      transition: all 0.35 ease-in-out;
      width: 200px;
      animation: spin 390s linear infinite;

      @media screen and (max-width: 1200px){
        width: 200px;
        right: 200px;
        top: -100px;
      }

      @media screen and (max-width: 1000px){
        right: 200px;
        top: -100px;
        width: 200px;
      }

      @media screen and (max-width: 768px){
        display: none;
      }
    }

    .floating-shapes-2 {
      position: absolute;
      right: 100px;
      bottom: 0px;
      transition: all 0.35 ease-in-out;
      width: 200px;

      @media screen and (max-width: 1200px){
        right: 100px;
        bottom: 200px;
        width: 200px;
      }

      @media screen and (max-width: 1000px){
        right: 100px;
        bottom: 100px;
        width: 150px;
      }

      @media screen and (max-width: 768px){
        right: 220px;
        top: 380px;
        width: 150px;
      }
    }

    .floating-shapes-3 {
      position: absolute;
      left: 50px;
      bottom: 50px;
      transition: all 0.35 ease-in-out;
      width: 150px;
      z-index: -1;
      animation: spin 90s linear infinite;

      @media screen and (max-width: 1200px){
        right: 100px;
        bottom: 100px;
        width: 100px;
      }

      @media screen and (max-width: 1000px){
        display: none;
      }
    }

    .triangle {
        position: absolute;
        left: -100px;
        top: 100px;
        height: 750px;
        transition: all 0.35 ease-in-out;

        @media screen and (max-width: 1200px){
          position: absolute;
          left: -100px;
          top: 100px;
          height: 750px;
        }

        @media screen and (max-width: 1000px){
          position: absolute;
          left: -50px;
          top: 100px;
          height: 550px;
        }

        @media screen and (max-width: 768px){
          display: none;
        }
      }

      .hummingbird {
        position: absolute;
        left:-50px;
        top: 150px;
        height: 600px;
        transition: all 0.35 ease-in-out;
        z-index: 5;

        @media screen and (max-width: 1200px){
          position: absolute;
          left:-50px;
          top: 120px;
          height: 600px;
        }

        @media screen and (max-width: 1000px){
          position: absolute;
          left:-50px;
          top: 100px;
          height: 500px;
        }

        @media screen and (max-width: 768px){
          position: absolute;
          left:-360px;
          top: -50px;
          height: 450px;
        }
      }

  }

  @media screen and (max-width: 1200px){
    padding: $spacing-xl $spacing-lg $spacing-lg;
  }

  @media screen and (max-width: 768px){
    padding: $spacing-xl $spacing-md $spacing-md;
  }

  h1 {
    color: $red;
    font-weight: 800;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat; 
    font-size: 120px;
    line-height: 80%;
    padding: $spacing-md 0;
    background: lighten($red, 20%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0px 3px 0 $red, 0px -10px 30px rgba($red,0.05);

    @media screen and (max-width: 768px){
      font-size: 60px;
      text-shadow: 0px 2px 0 $red, 0px -10px 30px rgba($red,0.05);
    }

    .design {
      background: lighten($black, 20%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0px 3px 0 $black, 0px -10px 30px rgba($red,0.05);

      @media screen and (max-width: 768px){
        text-shadow: 0px 2px 0 $black, 0px -10px 30px rgba($red,0.05);
      }
    }

    .ship {
      color: $purple;
      background: lighten($purple, 20%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0px 3px 0 $purple, 0px -10px 30px rgba($red,0.05);

      @media screen and (max-width: 768px){
        text-shadow: 0px 2px 0 $purple, 0px -10px 30px rgba($red,0.05);
      }
    }
  }

  svg {
    width: 100%;
    max-width: 800px;
    margin-bottom: $spacing-sm;
    height: auto;

    path {
      stroke: $blue;
    }
  }

  .small {
    margin-bottom: $spacing-md;
    color: lighten($black, 20%);

    span {
      color: $blue;
    }

    @media screen and (max-width: 768px){
      margin-right: $spacing-xl;
    }
  }

  .highlight {
    color: $blue;
  }

}

.dark #hero {

  h1 {
    color: $mint-dark;

    .design {
      color: $blue-light;
    }

    .ship {
      color: $red;
    }
  }

}

</style>