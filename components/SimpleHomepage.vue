<template>
  <main id="Hero">
    
    <section class="three-scene">
      <ThreeScene></ThreeScene> />
    </section>

    <section class="content-blast">
      <div class="reveal">
        <h1>Helping early stage & established businesses innovate their product experiences.</h1>
      </div>
      <!-- <div class="sub-content"> -->
        <!-- <div class="left">
          <div class="reveal">
            <p>My name is Rami James and I'm a Product Designer. I help clients like you create intuitive and engaging product experiences.</p>
          </div>
          <div class="reveal">
            <a href="mailto:ramijames@gmail.com" class="button large black">
              Let's Talk
            </a>
          </div>
        </div> -->
      <!-- </div> -->
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

#Hero {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: $white;
  position: relative;

  @media screen and (max-width: 768px) {
    position: relative;
  }

  .links {
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

  .reveal {
    overflow: hidden; /* fallback safety */
  }

  .reveal h1 {
    display: block;
    width: 100%;
    height: auto;
    clip-path: inset(0 100% 0 0);
    animation: reveal 1s forwards;
    transition-timing-function: cubic-bezier(0.355, 0.965, 0.670, 0.970);
    animation-delay: .6s;
  }

  .reveal p {
    display: block;
    width: 100%;
    height: auto;
    clip-path: inset(0 100% 0 0);
    animation: reveal 1s forwards;
    transition-timing-function: cubic-bezier(0.355, 0.965, 0.670, 0.970);
    animation-delay: 1s;
  }

  .reveal a {
    display: block;
    width: 100%;
    height: auto;
    clip-path: inset(0 100% 0 0);
    animation: reveal 1s forwards;
    transition-timing-function: cubic-bezier(0.355, 0.965, 0.670, 0.970);
    animation-delay: 1.6s;
  }

  .three-scene {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100dvh;
    pointer-events: all;
    z-index: 0;
    opacity: 0;
    animation: fade 1s forwards;
    transition-timing-function: cubic-bezier(0.355, 0.965, 0.670, 0.970);
    animation-delay: 1s;
    -webkit-mask-image: linear-gradient(to bottom, black 45% , rgba($black, 0) 80%, rgba(0, 0, 0, 0));
    mask-image: linear-gradient(to bottom, black 45% , rgba($black, 0) 80%, rgba(0, 0, 0, 0));
  }

  .content-blast {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    z-index: 1;
    padding: $spacing-lg $spacing-md $spacing-xl;
    pointer-events: none;
    height: 100%;
    margin: 0 auto;
    align-self: center;
    gap: $spacing-sm;
    max-width: 100%;
    container-type: inline-size;
    
    h1 {
      font-size: 4cqw;
      font-weight: 700;
      color: $black;
      line-height: 100%;
      margin: 0;
      text-align: left;
      font-family: $font-family-main;
      text-wrap: balance;
      text-shadow: .1cqw .2cqw 0px rgba($white, 1);

      @media screen and (max-width: 1000px) {
        font-size: 8cqw;
      }
    }

    .sub-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;

      p {
        color: rgba($black, 1);
        line-height: 100%;
        max-width: 800px;
        text-wrap: balance;
        padding: $spacing-sm 0 0;
        font-size: $font-size-sm;
        font-weight: 400;
        border-top: 1px solid rgba($black,0.2);
        display: flex;
        flex-direction: column;
      }

      .button.large.black {
        pointer-events: all;
      }
    } 
  }
}

.homepage-content {
  background: $white;
  width: 100%;
}

.dark {
  #Hero {
    background: $black;

    .content-blast {
      
      h1 {
        color: $white;
        text-shadow: .1cqw .2cqw 0px rgba($black, 1);
      }

      p {
        color: rgba($white, 1);
      }
    }
  }

  .homepage-content {
    background: $black;
  }
}

</style>