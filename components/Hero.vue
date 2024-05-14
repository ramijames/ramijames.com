<template>
  <main class="hero-for-the-zero">
    <component :is="selectedBgComponent" />
    <section class="hero-text">
      <h1 class="home-bold">Fast-track your project</h1>
      <h5 class="home-bold">Subscription access for <strong class="underline">startups</strong> to top-tier expertise</h5>
      
      <section class="hero-talents">
        <div>
          <h5>Product Expertise</h5>
          <p>Ensure that your team builds the right things for the right reasons.</p>
        </div>
        <div>
          <h5>Premium Design</h5>
          <p>Makes your application or website stand out from the competition.</p>
        </div>
        <div>
          <h5>Vue/Nuxt Dev</h5>
          <p>Implementing high-quality, accessible, and responsive front-ends.</p>
        </div>
      </section>
      
      <Button text="Get Started" type="default" class="home-button" />
    </section>
    <section class="bgSelect">
      <label for="bgSelector">Background select</label>
      <select v-model="selectedBgComponent" name="bgSelector">
        <option name="woosh">Woosh</option>
        <option name="cubes">Cubes</option>
        <option name="slivers">Slivers</option>
      </select>
    </section>
  </main>
</template>

<script>

import Woosh from './Woosh.vue'
import Cubes from './Cubes'
import Slivers from './Slivers'
import Button from './Button.vue'

export default {
  data(){
    return {
      title: 'Home',
      numberOfElements: 10,
      size: 40,
      color: '#ff9900',
      borderWidth: 10,
      animationStyle: 'defaultWoosh',
      selectedBgComponent: 'Woosh'
    }
  },
  setup() {
    
    
    return {
      
    }
  },
  components: {
    Woosh,
    Cubes,
    Slivers,
    Button
  }
}

</script>

<style scoped lang="scss">

.hero-for-the-zero {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:hidden;
  box-shadow: inset 0 -50px 100px rgba(161, 49, 231, 0.1);

  @media screen and (max-width: 768px) {
    top:-113px;
    padding:0 2rem;
  }
}

    .hero-text {
      text-align:center;    
    }

    h1.home-bold {
      text-align: center;
      font-size:6dvw;
      font-weight: bold;
      margin:0;
      line-height: 7dvw;
      z-index: 200;
      animation: animatedBackground 5s ease-in-out infinite;
      animation: fadeIn 0.5s ease-in-out;
      animation-delay: 0s;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      background-image: linear-gradient(90deg, rgb(161, 49, 231), #d81515, #7523e1, rgb(161, 49, 231)) !important;
      background-size: 300% !important;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
      opacity: 0;
    }

        @media screen and (max-width: 768px) {
          h1.home-bold {
            font-size: 4rem;
            line-height: 3.5rem;
            padding:0 0 1rem;
          }
          
        }

        @keyframes animatedBackground {
          0% {
            background-position:0 50%;
          }
          50% {
            background-position:50% 50%;
          }
          100% {
            background-position:0 50%;
          }
        }

    h5.home-bold {
      text-transform: uppercase;
      letter-spacing: .1rem;
      font-weight: bold;
      animation: fadeIn 0.5s ease-in-out;
      animation-delay: 0.5s;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      opacity: 0;
      max-width:800px;
      margin: 1rem auto 4rem;
    }

        @media (max-width: 768px) {
          h5.home-bold {
            font-size: 1rem;
            margin: 1rem 0rem 2rem;
            line-height: 1.5rem;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

    .home-button {
      animation: fadeIn 0.5s ease-in-out;
      animation-delay: 1.5s;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      opacity: 0;
    }

    .animPanel {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      background-color: rgba(89, 48, 103, 0.1);
      backdrop-filter: blur(16px);
      padding: 20px;
      border-radius:.3rem;
      z-index: 1000;
      box-shadow: 0 18px 32px 0 rgba(25, 27, 50, 0.164);
    }

    .dark .animPanel {
      background-color: #15071d6e;
      box-shadow: 0 18px 32px 0 rgba(54, 11, 47, 0.28);
    }

    .hero-talents {
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;
      max-width:900px;
      margin:0 auto 4rem;
      backdrop-filter: blur(10px);
      border-radius: 0.3rem;
      animation: fadeIn 0.5s ease-in-out;
      animation-delay: 1s;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      opacity: 0;

      @media screen and (max-width: 768px) {
        display: none;   
      }

      & > div {
        display:flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;

        &:nth-child(1) {
          border-right:1px solid rgba(161, 49, 231,0.05);
        }

        &:nth-child(2) {
          border-right:1px solid rgba(161, 49, 231,0.05);
        }

        img {
          width: 40px;
          height: 40px;
        }

        h5 {
          margin: 0 0 0.5rem 0;
          font-weight:bold;
        }

        p {
          margin: 0;
          font-size: 0.8rem;
        }
      }
    }

.services-sell {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.bgSelect {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 1000;
  border-radius: 0.3rem;
  animation: fadeIn-30b0ac3d 0.5s ease-in-out;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  opacity: 0;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    font-size:0.5rem;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.1rem;
    line-height: 32px;
  }

  select {
    height:32px;
    width:120px;
    border: 2px solid rgba(161, 49, 231, 0.4);
    background: transparent;
    padding:0 0.5rem;
    border-radius: 0.15rem;
    font-size:0.6rem;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
  }
}

.dark .bgSelect {
  select {
    color:white;
  }
}

</style>