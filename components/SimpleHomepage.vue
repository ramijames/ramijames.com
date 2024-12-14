<template>
  <main id="Hero">
    <spline-viewer class="mega-rotate" url="https://prod.spline.design/9UnGpupziB04gPII/scene.splinecode"></spline-viewer>
    <section class="mega-hero">
      <section class="intro-text w-full">
        <p>
          <span>H</span>
          <span>e</span>
          <span>l</span>
          <span>l</span>
          <span>o</span>
          <span>.</span>
        </p>
        <p class="secondary">I am a product-first designer and developer with founder experience. My core interest is in creating innovative tools with creative partners like you. I'm currently building <a href="https://www.vewrite.com">Vewrite</a>, a project management tool for technical writing teams.</p>
        <section class="home-buttons">
          <nuxt-link class="button large primary" to="/about">Who am I?</nuxt-link>
        </section>
      </section>
    </section>
  </main>
  <MergedProjects />
  <!-- <ProductFirst /> -->
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

  .mega-rotate {
    width: 100%;
    height: 50vh;
  }

  .mega-hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    

    .intro-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin-top: 0;

      .home-buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: $spacing-sm;
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
      font-size: 10vw;
      line-height: 100%;
      letter-spacing: -0.1rem;
      text-wrap: balance;
      font-family: $font-family-main;
      margin-bottom: $spacing-md;
      color: $black;

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

        @for $i from 1 through 6 {
          &:nth-child(#{$i}) {
            animation-delay: $i * 0.15s;
          }
        }
      }

      @media screen and (max-width: 768px){
        font-size: 12vw;
        text-wrap: balance;
      }
    }

    p.secondary {
      font-size: $font-size-md;
      text-transform: none;
      font-weight: normal;
      max-width: 400px;
      line-height: 140%;
      text-wrap: balance;
      letter-spacing: initial;
      font-family: $font-family-secondary;
      animation: fadeInUp 0.5s forwards ease-in-out;
      opacity: 0;
      animation-delay: 0.9s;

      @media screen and (max-width: 768px){
        font-size: $font-size-md;
        max-width: 100%;
      }
    }
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

</style>