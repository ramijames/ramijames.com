<template>
  <main id="Hero">
    
    <section class="mega-hero">

      <section class="explainer">
        <h3>My name is <span class="blue">Rami James</span> and I'm a <span>Product Designer</span>.</h3>
        <p class="intro-text">I'm a passionate Product Designer with a development background. I enjoy creating unique, user-friendly interfaces for both native and web applications across a range of platforms and use-cases.</p>
        <a href="mailto:ramijames@gmail.com" class="button">Say "Hello"</a>
      </section>
      <section class="links">
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
        <ThreeScene />
      </section>

    </section>  

  </main>

  <section class="homepage-content">
    <Clients />
    <LatestWork />
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
        font-size: 6dvw;
        line-height: 100%;

        span.blue {
          color: $blue;
        }

        span {
          color: $yellow;
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

    .name {
      z-index: 10;
      color: $black;
      text-wrap: nowrap;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 18dvw;
        margin-bottom: $spacing-md;

        @media screen and (max-width: 1600px) {
          width: 20dvw;
        }

        @media screen and (max-width: 1000px) {
          width: 40dvw;
        }

        @media screen and (max-width: 768px) {
          width: 40dvw;
          margin-bottom: $spacing-sm;
        }
      }

      .rami {
        font-size: 8dvw;
        line-height: 100%;
        font-weight: 500;

        @media screen and (max-width: 768px) {
          font-size: 12dvw;
        }
      }

      .occupation {
        font-size: 4dvw;
        font-weight: 500;
        font-style: italic;
        font-family: $font-family-serif;
        opacity: 0.2;
      }

      svg {
        width: 18dvw;
        margin-bottom: 1dvw;

        path, circle {
          fill: $yellow;
        }
      }

      @media screen and (max-width: 1000px) {
        font-size: 8dvw;
        position: relative;
        position: relative;
        margin: 0 $spacing-md;
        width: calc(100% - $spacing-md - $spacing-md);
        padding: $spacing-sm 0;
        justify-content: center;
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
      
      a {
        color: rgba($black, 1);
        text-decoration: none;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        text-wrap: nowrap;

        @media screen and (max-width: 1000px) {
          font-size: $font-size-lg;
          font-weight: 400;
        }

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
  background: $black;
}

.homepage-content {
  background: $white;
  position: absolute;
  z-index: 2;
  top: 100dvh;
  width: 100%;
}

</style>