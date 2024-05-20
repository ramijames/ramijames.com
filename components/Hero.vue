<template>
  <main id="hero-for-the-zero" ref="animatorHero">
    <section class="intro" ref="intro">
      <Woosh />
      <div class="small">I create</div>
      <div class="products">PRODUCTS,</div>
      <div class="experiences">EXPERIENCES,</div>
      <div class="designs">& <span class="designs">DESIGNS</span></div>
    </section>
    <section class="links">
      <div class="small" ref="linksSubtitle">With these services</div>
      <nuxt-link to="/services/product-concept" ref="linksOne"><span class="number">01</span> <span class="title">Product concept</span></nuxt-link>
      <nuxt-link to="/services/ux-ui" ref="linksTwo"><span class="number">02</span> <span class="title">UX & UI</span></nuxt-link>
      <nuxt-link to="/services/implementation" ref="linksThree"><span class="number">03</span> <span class="title">Implementation</span></nuxt-link>
    </section>
  </main>
</template>

<script>

import Woosh from './Woosh.vue'

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
      threshold: 0.5 // adjust as needed
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

#hero-for-the-zero {
  display:flex;
  flex-direction: row;
  background-color: $white;
  height:100vh;
  width:100vw;

  @media screen and (max-width: 768px){
    flex-direction: column;
  }

  .intro {
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: $spacing-xs;
    width:50vw;
    height:100vh;
    padding: $spacing-lg;
    color: $black;
    font-size: $font-size-xxl;
    font-weight:bold;
    text-transform: uppercase;
    z-index: 2;

    @media screen and (max-width: 768px){
      width:100vw;
      height:45vh;
      font-size: 6dvw;
      margin-top:10vh;
    }

    .small {
      font-size: $font-size-md;
      color: $gray-md;
    }

    .products {
      opacity: 0;
    }

    .experiences {
      opacity: 0;
    }

    .designs {
      color: $blue;
      opacity: 0;
    }
  }

  .links {
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: $spacing-xs;
    width:50vw;
    height:100vh;
    padding: $spacing-lg;
    background: linear-gradient(-20deg, $black 40%, $blue 100%);
    font-size: $font-size-xxl;
    font-weight:bold;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    z-index: 10;

    @media screen and (max-width: 768px){
      width:100vw;
      height:45vh;
      font-size: 6dvw;
    }

    .small {
      font-size: $font-size-md;
      color: rgba($white, 0.5);
    }

    a {
      text-decoration: none;
      color: $white;
      display:inline;

      span.number {
        margin-right: $spacing-sm;
        opacity: 0.5;
      }

      span.title {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          transition: all 0.3s ease-in-out;
          background-color: rgba($white, 0.3);
        }

        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 3px;
          transition: width 0.3s;
        }
      }
    }
  }
}

#hero-for-the-zero a:hover span.title::after {
  background-color: rgba($white, 1);
  width:100%;
}

.dark #hero-for-the-zero {
  background-color: $black;

  .intro {
    color: $white;
  }

  .designs {
    color: $blue-light;
  }
}

.animate-in {
  .intro {
    .small {
      animation: fadeIn 0.5s ease-in forwards;
    }

    .products {
      animation: fadeIn 0.5s ease-in forwards 0.25s;
    }

    .experiences {
      animation: fadeIn 0.5s ease-in forwards 0.5s;
    }

    .designs {
      animation: fadeIn 0.5s ease-in forwards .75s;
    }
  }
}

.animate-out {
  .intro {
    .small {
      opacity: 1;
      animation: fadeOut 1s ease-in forwards;
    }

    .products {
      opacity: 1;
      animation: fadeOut 1s ease-in forwards 0.5s;
    }

    .experiences {
      opacity: 1;
      animation: fadeOut 1s ease-in forwards 1s;
    }

    .designs {
      opacity: 1;
      animation: fadeOut 1s ease-in forwards 1.5s;
    }
  }
}

// .animate-in {
//   animation: fadeIn 1s ease-in forwards;
// }

// .animate-out {
//   animation: fadeOut 1s ease-out forwards;
// }

@keyframes fadeIn {
  0% { 
    opacity: 0; 
    transform: translateY(-10px);
  }

  100% { 
    opacity: 1; 
    transform: translateY(0);
  }

}

@keyframes fadeOut {
  0% { 
    opacity: 1; 
    transform: translateY(0);
  }

  100% { 
    opacity: 0; 
    transform: translateY(10px);
  }

}

</style>