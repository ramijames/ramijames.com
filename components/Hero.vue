<template>
  <main id="hero" ref="animatorHero" class="general-main">
    <!-- <Woosh class="desktop-only" /> -->
    <!-- <h1 class="centered">Designing a product used to be slow, hard, and expensive. <span class="highlight">Not anymore.</span></h1> -->
    <h1 class="centered">It's time for your product's vision to take flight</h1>
    <h4 class="centered small">Specialized design subscriptions are now available as an alternative for smart builders who just want to get to work.</h4>
    <Button text="See available plans" size="default" to="#get-to-work" />
    <section class="links">
      <div class="services-title">
        <span>Quickstart</span>
      </div>
      <section class="links-row">
        <a href="#product-concept">
          <span class="number">01</span> 
          <span class="title">Recent Work</span>
        </a>
        <a href="#build">
          <span class="number">02</span> 
          <span class="title">Member Perks</span>
        </a>
        <a href="#build">
          <span class="number">03</span> 
          <span class="title">Join Today</span>
        </a>
        <a href="#build">
          <span class="number">04</span> 
          <span class="title">Common Questions</span>
        </a>
      </section>
    </section>
  </main>
</template>

<script>

import Woosh from './Woosh.vue'
import Button from './Button.vue'

export default {
  data(){
    return {
      title: 'Home'
    }
  },
  setup() {
    return {
      
    }
  },
  components: {
    Woosh  
  },
  mounted() {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.2 // adjust as needed
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          entry.target.classList.remove('animate-in');
          entry.target.classList.add('animate-out');
        }
      });
    }, options);

    observer.observe(this.$refs.animatorHero);
  }
}

</script>

<style scoped lang="scss">

@import './assets/variables';

.desktop-only {
  display: block;

  @media screen and (max-width: 768px) {
    display: none;
  }
}

#hero {
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-xl $spacing-xxl;
  width:100vw;
  margin-top: $spacing-md;
  border-radius: $br-xl $br-xl 0 0;

  @media screen and (max-width: 1200px){
    padding: $spacing-xl $spacing-lg $spacing-lg;
  }

  @media screen and (max-width: 768px){
    padding: $spacing-xl $spacing-md $spacing-md;
  }

  h1 {
    font-size: 3.8dvw;
    line-height: 3.8dvw * $multiplier-sm;

    @media screen and (max-width: 1000px) {
      font-size: 5dvw;
      line-height: 5dvw * $multiplier-sm;
    }

    @media screen and (max-width: 768px) {
      font-size: 6.4dvw;
      line-height: 6.4dvw * $multiplier-sm;
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

  .centered {
    text-align: center;
    max-width: 1400px;
    width:100%;
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
  }

  .centered.small {
    line-height: $spacing-md * $multiplier;
    margin-bottom: $spacing-lg;

    @media screen and (max-width: 768px) {
      line-height: initial;
    }
  }

  .highlight {
    color: $blue;
  }

  .links {
    margin-top: $spacing-lg;
    max-width: 600px;
    width:100%;

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
      }

      .number {
        display:none;
      }
    }
  }
}

.dark #hero {
  background-color: $black;

  svg {

    path {
      stroke: lighten($blue,25%);
    }
  }

  .services-title {
    border-bottom: 1px solid rgba($white, 0.2);
  }

  .highlight {
    color: lighten($blue,25%);
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