<template>
  <main id="hero" ref="animatorHero" class="general-main">
    <section class="images">
      <img ref="triangle" src="/shapes/hero-triangle.png" class="triangle" alt="Your project is layered">
      <img ref="hummingbird" src="/hummingbird.png" class="hummingbird" alt="Your project is beautiful">
      <img ref="floatingShapes1" src="/shapes/floating-shapes-1.png" class="floating-shapes-1" alt="Woooo!">
      <img ref="floatingShapes2" src="/shapes/floating-shapes-2.png" class="floating-shapes-2" alt="Woooo!">
      <img ref="floatingShapes3" src="/shapes/floating-shapes-3.png" class="floating-shapes-3" alt="Woooo!">
    </section>
    <section class="text">
      <h1>
          Ideate.<br>
          <span class="design">Design.</span><br>
          <span class="ship">Ship.</span>
      </h1>
      <div class="go-row">
        <h4 class="small">Specialized <span>design & development service retainers</span> are now available as an alternative for smart builders who just want to get to work. <span>Pay by the week, get what you need now.</span></h4>
        <div class="button-row">
          <Button text="See available plans" size="default" to="#get-to-work" />
          <span>Capacity available</span>
        </div>
      </div>
    </section>
  </main>
  <section class="after-links">
    <section class="links">
      <div class="services-title">
        <span>Quickstart</span>
      </div>
      <section class="links-row">
        <a href="#perks">
          <span class="number">01</span> 
          <span class="title">Member Perks</span>
        </a>
        <a href="#join">
          <span class="number">02</span> 
          <span class="title">Join Today</span>
        </a>
        <a href="#questions">
          <span class="number">03</span> 
          <span class="title">Common Questions</span>
        </a>
        <a href="#booking">
          <span class="number">04</span> 
          <span class="title">Book a Call</span>
        </a>
      </section>
    </section>
  </section>
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
    const floatingShapes2 = ref(null);
    const floatingShapes3 = ref(null);

    const handleScroll = () => {
      if (triangle.value && hummingbird.value && floatingShapes1.value && floatingShapes2.value && floatingShapes3.value) {
        const scrollY = window.scrollY;
        triangle.value.style.transform = `translateY(${scrollY * -0.8}px)`;
        hummingbird.value.style.transform = `translateY(${scrollY * -0.5}px)`;
        floatingShapes1.value.style.transform = `translateY(${scrollY * -1}px)`;
        floatingShapes2.value.style.transform = `translateY(${scrollY * -1}px)`;
        floatingShapes3.value.style.transform = `translateY(${scrollY * -1}px)`;
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
      floatingShapes2,
      floatingShapes3,
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
  padding: $spacing-xl 0;
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
        top: 300px;
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
          position: absolute;
          left: -120px;
          top: -80px;
          height: 200px;
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
          left:-300px;
          top: -50px;
          height: 400px;
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
    color: $mint-dark;

    .design {
      color: $blue-light;
    }

    .ship {
      color: $red;
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

    span {
      color: $blue;
      font-weight: 700;
    }

    @media screen and (max-width: 768px){
      margin-right: $spacing-xl;
    }
  }

  .highlight {
    color: $blue;
  }

}

.after-links {
  margin-top: $spacing-sm;
  max-width: 600px;
  width:100%;
  z-index: 3;

  .links {

    @media screen and (max-width: 768px) {
      display:none;
    }

    .services-title {
      font-size: $font-size-sm;
      padding-bottom: $spacing-sm;
      letter-spacing: 0.1rem;
      opacity: 0.5;
      text-transform: uppercase;
      display:flex;
      flex-direction: row;
      justify-content: center;
      border-bottom: 1px solid rgba($blue, 0.2);
    }

    .links-row {
      display: flex;
      justify-content: space-between;
      gap: $spacing-sm;
      padding-top: $spacing-sm;
      flex-direction: row;

      a {
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        text-decoration: none;
        font-family: $font-family-secondary;
        font-weight: 400;
        font-size: $font-size-md;
      }

      .number {
        display:none;
      }
    }
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

// #hero-for-the-zero {
//   display:flex;
//   flex-direction: row;
//   background-color: $white;
//   height:100vh;
//   width:100vw;

//   @media screen and (max-width: 768px){
//     flex-direction: column;
//     height: initial;
//   }

//   .intro {
//     display:flex;
//     flex-direction: column;
//     justify-content: center;
//     gap: $spacing-xs;
//     width:50vw;
//     height:100vh;
//     padding: $spacing-lg;
//     z-index: 2;
//     align-items: flex-start;
//     -webkit-transform:scale(1.0);

//     h1 {
//       font-size: 6rem;
//       line-height: 6rem;
//       margin: 0;
//       color: $blue;
//     }

//     @media screen and (max-width: 768px){
//       width:100vw;
//       height:100vh;
//       font-size: $font-size-mega;
//       padding: $spacing-md;
//     }

//     .blue {
//       color: $blue;
//     }

//     .convince {
//       font-family: $font-family-secondary;
//       font-size: $font-size-xl;
//       font-weight:normal;
//       text-transform: none;
//       margin: $spacing-md 0;
//     }

//     .products {
//       opacity: 0;
//       font-weight:black;

//       @media screen and (max-width: 768px){
//         font-size: $font-size-mega;
//       }
//     }

//     .experiences {
//       opacity: 0;
//     }

//     .designs {
//       color: $blue;
//       opacity: 0;
//     }
//   }

//   .links {
//     display:flex;
//     flex-direction: column;
//     justify-content: center;
//     gap: $spacing-xs;
//     width:50vw;
//     height:100vh;
//     padding: $spacing-lg;
//     background: $black;
//     font-size: $font-size-max;
//     font-weight:bold;
//     text-transform: uppercase;
//     position: relative;
//     overflow: hidden;
//     z-index: 10;
//     border-left: 4px solid $blue;
//     align-items: flex-start;
//     background: $black radial-gradient(ellipse at top left, rgba($blue, 0.2) 0%, rgba($black, 100) 50%);
//     perspective: 10em;

//     @media screen and (max-width: 768px){
//       height: 50vh;
//     }

//     .linksRotator {
//       transform: rotate3d(0, 1, 0, -25deg) scale(1.2);
//       transform-style: preserve-3d;
//       display:flex;
//       flex-direction: column;
//       justify-content: center;
//       gap: $spacing-xs;

//       @media screen and (max-width: 768px){
//         transform: rotate3d(0, 1, 0, 0deg) scale(1);
//       }
//     }

//     @media screen and (max-width: 768px){
//       width:100vw;
//       height:100vh;
//       font-size: 6dvw;
//       padding: $spacing-md;
//     }

//     .small {
//       font-size: $font-size-md;
//       color: rgba($white, 0.5);
//       opacity: 0;
//     }

//     .linkOne {
//       opacity: 0;
//     }

//     .linkTwo {
//       opacity: 0;
//     }

//     .linkThree {
//       opacity: 0;
//     }

//     a {
//       text-decoration: none;
//       color: $white;
//       display:inline;
//       font-weight: normal;
//       transition: color 0.3s ease-in-out;

//       span.number {
//         margin-right: $spacing-sm;
//         opacity: 0.5;
//       }

//       span.title {
//         position: relative;

//         &::before {
//           content: '';
//           position: absolute;
//           bottom: -2px;
//           left: 0;
//           width: 100%;
//           height: 4px;
//           transition: all 0.4s ease-in-out;
//           background-color: rgba($white, 0.3);
//         }

//         &::after {
//           content: '';
//           position: absolute;
//           bottom: -2px;
//           left: 0;
//           width: 0;
//           height: 4px;
//           transition: width 0.4s;
//           background-color: rgba($blue, 1);
//         }
//       }
//     }
//   }
// }

// #hero-for-the-zero a:hover {
//   color: $blue;
// }

// #hero-for-the-zero a:hover span.title::after {
//   background-color: rgba($blue, 1);
//   width:100%;
// }

// .dark #hero-for-the-zero {
//   background-color: $black;

//   .intro {
//     color: $white;
//   }

//   .links {
//     background: $white;

//     .small {
//       color: $gray-md;
//     }

//     a {
//       color: $black;

//       span.number {
//         opacity: 0.5;
//       }

//       span.title::before {
//         background-color: rgba($black, 0.3);
//       }

//       span.title::after {
//         background-color: rgba($black, 1);
//       }
//     }

//     .designs {
//       color: $blue-light;
//     }
//   }
// }

// .animate-in {
//   .intro {
//     .small {
//       animation: fadeIn 0.5s ease-in forwards;
//     }

//     .products {
//       animation: fadeIn 0.5s ease-in forwards 0.25s;
//     }

//     .experiences {
//       animation: fadeIn 0.5s ease-in forwards 0.5s;
//     }

//     .designs {
//       animation: fadeIn 0.5s ease-in forwards .75s;
//     }
//   }
// }

// .animate-out {
//   .intro {
//     .small {
//       opacity: 1;
//       animation: fadeOut 0.25s ease-in forwards;
//     }

//     .products {
//       opacity: 1;
//       animation: fadeOut 0.25s ease-in forwards;
//     }

//     .experiences {
//       opacity: 1;
//       animation: fadeOut 0.25s ease-in forwards;
//     }

//     .designs {
//       opacity: 1;
//       animation: fadeOut 0.25s ease-in forwards;
//     }
//   }
// }

// .animate-in {
//   .links {
//     .small {
//       animation: fadeIn 0.5s ease-in forwards;
//     }

//     .linkOne {
//       animation: fadeIn 0.5s ease-in forwards 0.25s;
//     }

//     .linkTwo {
//       animation: fadeIn 0.5s ease-in forwards 0.5s;
//     }

//     .linkThree {
//       animation: fadeIn 0.5s ease-in forwards .75s;
//     }
//   }
// }

// .animate-out {
//   .links {
//     .small {
//       opacity: 1;
//       animation: fadeOut 0.25s ease-in forwards;
//     }

//     .linkOne {
//       opacity: 1;
//       animation: fadeOut 0.25s ease-in forwards;
//     }

//     .linkTwo {
//       opacity: 1;
//       animation: fadeOut 0.25s ease-in forwards;
//     }

//     .linkThree {
//       opacity: 1;
//       animation: fadeOut 0.25s ease-in forwards;
//     }
//   }
// }

// @keyframes fadeIn {
//   0% { 
//     opacity: 0; 
//     transform: translateX(-10px);
//   }

//   100% { 
//     opacity: 1; 
//     transform: translateX(0);
//   }

// }

// @keyframes fadeOut {
//   0% { 
//     opacity: 1; 
//     transform: translateX(0);
//   }

//   100% { 
//     opacity: 0; 
//     transform: translateX(10px);
//   }

// }

</style>