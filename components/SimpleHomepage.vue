<template>
  <main id="Hero">
    
    <section class="mega-hero">

      <section class="explainer">
        <h3>
          <span>
            My name is 
          </span>
          <span 
            class="blue">
            Rami James
          </span> 
          <span >
            and I'm a 
          </span>
          <span 
            class="yellow" >
            Product Designer
          </span>
        </h3>
        <p 
          class="intro-text" >
          I enjoy creating unique, user-friendly interfaces for both native and web applications across a range of platforms and use-cases.
        </p>
        <a 
          href="mailto:ramijames@gmail.com" 
          class="button large" >
          Say "Hello"
        </a>
      </section>
      <section 
        class="links" >
        <a href="https://github.com/ramijames">
          Github
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.71319 -6.09502e-05L11.1396 7.42639L3.7132 14.8528L-3.10162e-05 11.1396L3.7132 7.42639L-3.16422e-05 3.71317L3.71319 -6.09502e-05Z" fill="white"/>
          </svg>
        </a>
        <a href="https://github.com/ramijames/ramijames.com">
          Source
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.71319 -6.09502e-05L11.1396 7.42639L3.7132 14.8528L-3.10162e-05 11.1396L3.7132 7.42639L-3.16422e-05 3.71317L3.71319 -6.09502e-05Z" fill="white"/>
          </svg>
        </a>
        <a href="https://dribbble.com/ramijames">
          Dribbble
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.71319 -6.09502e-05L11.1396 7.42639L3.7132 14.8528L-3.10162e-05 11.1396L3.7132 7.42639L-3.16422e-05 3.71317L3.71319 -6.09502e-05Z" fill="white"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/rami-james/">
          LinkedIn
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.71319 -6.09502e-05L11.1396 7.42639L3.7132 14.8528L-3.10162e-05 11.1396L3.7132 7.42639L-3.16422e-05 3.71317L3.71319 -6.09502e-05Z" fill="white"/>
          </svg>
        </a>
        <a href="https://www.shadertoy.com/view/ldfczS">
          Shadertoy Credit
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.71319 -6.09502e-05L11.1396 7.42639L3.7132 14.8528L-3.10162e-05 11.1396L3.7132 7.42639L-3.16422e-05 3.71317L3.71319 -6.09502e-05Z" fill="white"/>
          </svg>
        </a>
      </section>

      <section class="three-scene">
        <ThreeScene></ThreeScene> />
      </section>

    </section>  

  </main>

  <section class="homepage-content">
    <LatestWork />
    <Clients />
    <!-- <FeaturedThoughts :featured-articles="featuredArticles" :articles="regularArticles" /> -->
    <Testimonials />
    <Footer />
  </section>
  
</template>

<script setup>

</script>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';

.dark {
  #Hero {

    .mega-hero {
      background: linear-gradient(to top, rgba(#222222, 1), rgba($black, .19));

      .name {
        color: $white;
      }

      .links {
        border-top: 1px solid rgba($white,0.2);
        color: $white;

        a {
          color: $white;

          svg {

            path {
              fill: rgba($white, 0.2);
            }
          }

          &:hover {
            color: $yellow;

            svg {

              path {
                fill: rgba($yellow, 1);
              }
            }
          }
        }
      }
    }
  }
}

#Hero {
  position: fixed;
  background-size: cover;
  overflow: hidden;
  top: 0;
  width: 100%;

  @media screen and (max-width: 768px) {
    position: relative;
  }

  .three-scene {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100dvh;
    pointer-events: all;
    z-index: 0;
    -webkit-mask-image: linear-gradient(transparent 5% , rgba(0, 0, 0, 0.571) 90%);
    mask-image: linear-gradient(transparent 5% , rgba(0, 0, 0, 0.571) 90%);
    opacity: 0;
    animation: fade 1s forwards;
    transition-timing-function: cubic-bezier(0.355, 0.965, 0.670, 0.970);
    animation-delay: 1s;
  }

  .mega-hero {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    background: linear-gradient(to bottom, rgba(#ccc, 1), rgba($white, 1));
    transition: all 0.2s ease-in-out;
    position: fixed;
    width: 100%;
    padding: $spacing-lg;

    @media screen and (max-width: 1000px) {
      flex-direction: column;
      margin-top: 84px;
      height: calc(100% - 84px);
      align-items: center;
      justify-content: center;
      gap: $spacing-md;
      padding: 0;
    }

    .explainer {
      z-index: 10;
      line-height: 100%;
      text-wrap: balance;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: $spacing-sm;
      opacity: 0;
      animation: fade 1s ease-in forwards;

      @media screen and (max-width: 1000px) {
        font-size: 8dvw;
        position: relative;
        left: initial;
        bottom: initial;
        position: relative;
        margin: 0 $spacing-md;
        width: auto;
        padding: $spacing-sm 0;
        max-width: initial;
        gap: $spacing-xs;
      }

      img {
        width: 10dvw;

        @media screen and (max-width: 1600px) {
          width: 20dvw;
        }
        
        @media screen and (max-width: 1000px) {
          display: none;
        }
      }

      h3 {
        margin: 0;
        font-weight: 400;
        font-size: 5.3dvw;
        line-height: 80%;
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1dvw;
        margin-bottom: $spacing-sm;

        @media screen and (max-width: 768px) {
          font-size: 8dvw;
        }

        span {
          display: inline-block;
        }

        span.blue {
          color: $blue;
        }

        span.yellow {
          color: $yellow-dark;
        }
      }

      p {
        margin: 0 0 $spacing-xs;
        opacity: 0.6;
        font-family: $font-family-main;
        max-width: 600px;
        text-wrap: balance;
      }

    }

    .links {
      z-index: 10;
      padding: $spacing-sm 0 0;
      font-size: $font-size-sm;
      font-weight: 400;
      border-top: 1px solid rgba($black,0.2);
      display: flex;
      flex-direction: column;
      min-width: 160px;
      animation: fade .4s forwards;
      transition-timing-function: cubic-bezier(0.355, 0.965, 0.670, 0.970);
      animation-delay: 0s;
      
      a {
        color: rgba($black, 1);
        text-decoration: none;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-wrap: nowrap;

        svg {
          width: 6px;

          @media screen and (max-width: 1000px) {
            width: 10px;
          }

          path {
            fill: rgba($black, 0.2);

            @media screen and (max-width: 1000px) {
              fill: rgba($black, 1);
            }
          }
        }

        &:hover {
            color: rgba($black, 1);

            svg {

              path {
                fill: rgba($yellow, 1);
              }
            }
          }
      }

      @media screen and (max-width: 1000px) {
        position: relative;
        right: initial;
        bottom: initial;
        margin: 0 $spacing-md;
        width: calc(100% - $spacing-md - $spacing-md);
        padding: $spacing-sm 0;
        border: none;
      }
    }

    img {
      width: 1dvw;

      @media screen and (max-width: 1000px) {
        width: 3dvw;
      }
    }

  }

  .grid-background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100dvh;
      pointer-events: all;
      z-index: 0;
      transform-style: preserve-3d;
      transition: transform 0.3s ease-out;
      -webkit-mask-image: radial-gradient(black, transparent);
      mask-image: radial-gradient(black, transparent );
      opacity: 1;

      .grid-item {
        position: absolute;
        background: transparent;
        border-radius: $br-sm;
        transition: transform 0.2s ease-out, opacity 0.2s ease-out;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: center center;

        svg {
          display: block;
        }
      }
    }

}

.dark .homepage-content {
  background: linear-gradient(to bottom, #000000be, $black 300px);
}

.homepage-content {
  background: linear-gradient(to bottom, #cccccc87, $white 300px);
  backdrop-filter: blur(4px);
  position: absolute;
  z-index: 2;
  top: 100dvh;
  width: 100%;
}

</style>