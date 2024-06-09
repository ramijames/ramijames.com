<template>
  <main id="hero" ref="animatorHero" class="general-main">
    <!-- <section class="images">
      <img ref="floatingShapes1" src="/shapes/floating-shapes-1.png" class="floating-shapes-1" alt="Woooo!">
      <img ref="floatingShapes2" src="/shapes/floating-shapes-2.png" class="floating-shapes-2" alt="Woooo!">
      <img ref="floatingShapes3" src="/shapes/floating-shapes-3.png" class="floating-shapes-3" alt="Woooo!">
    </section> -->
    <section class="text">
      <p class="super-text">Tired of being stuck and not gaining traction?</p>
      <h1 ref="heroText">
          Become a<br>
          <span class="ship">Product-first</span><br>
          Company.
      </h1>
      <div class="go-row">
        <Button to="/booking" text="Sign Up Now" type="small" />
        <a class="cta" href="#methodology">What is Product-first?</a>
      </div>
    </section>
    <Triangle />
  </main>
</template>

<script>

import Button from './Button.vue'
import { onMounted, onUnmounted, ref } from 'vue';

export default {
  setup() {
    const heroText = ref(null);

    const handleScroll = () => {
      if (heroText.value ) {
        const scrollY = window.scrollY;
        heroText.value.style.lineHeight = `${100 - scrollY * 0.4}%`;
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
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
    padding: $spacing-xl $spacing-sm $spacing-md;
  }

  .text {
    display:flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    position: relative;

    @media screen and (max-width: 768px){
      width: 100%;
      margin-top: 0;
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
    flex-direction: row;
    align-items: center;
    align-content: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
    position: relative;

    @media screen and (max-width: 768px){
      flex-direction: column;
    }

    .cta {
      font-size: $font-size-sm;
      color: $red;
      text-align: center;

      @media screen and (max-width: 768px){
        font-size: $font-size-sm;
      }
    }

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

  h1 {
    color: $blue-dark;
    font-weight: 800;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat; 
    font-size: $font-size-mega;
    line-height: 100%;
    padding: $spacing-md 0;
    color: $teal-dark;
    text-align: center;
    text-shadow: 0px 1.5px 0 lighten($teal, 5%), 0px 3px 0 darken($teal, 25%);

    @media screen and (max-width: 768px){
      padding: 0;
      font-size: $font-size-xxl;
      text-shadow: none;
    }

    .ship {
      color: $red-dark;
      text-shadow: 0px 1.5px 0 lighten($red, 5%), 0px 3px 0 darken($red, 25%);

      @media screen and (max-width: 768px){
        text-shadow: none;
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

  .highlight {
    color: $blue;
  }

}

.dark #hero {

  h1 {
    color: $teal;

    .ship {
      color: $red;
    }
  }

}

</style>