<template>
  <main id="Hero">
    <section class="mega-hero">
      <section class="mega-title">
        <h1>Interface<br>Designer</h1>
        <p>My name is Rami James and I work as a freelance user interface, user experience, interaction, and design professional.</p>
      </section>
      <section class="mega-content">
        <h4>I've been lucky to work with</h4>
        <section class="clients">
          <img src="/clients/ibm.png" />
          <img src="/clients/wpt.png" />
          <img src="/clients/microsoft.png" />
          <img src="/clients/nvidia.png" />
          <img src="/clients/wix.png" />
          <img src="/clients/ultra.png" />
          <img src="/clients/fromental.png" />
          <img src="/clients/equitick.png" />
          <img src="/clients/zivav.png" />
          <img src="/clients/microgaming.png" />
          <img src="/clients/qmarkets.png" />
          <img src="/clients/tonara.png" />
        </section>
        <a href="mailto:ramijames@gmail.com?subject=Set up a call" class="button large">Become a client</a>  
      </section>
    </section>  
  </main>

  <section class="home-projects">
    <MergedProjects />
  </section>

  <section id="Writing">
    <section class="writing-intro w-three-quarters">
      <h1>Thoughts</h1>
    </section>
    <main class="articles w-half">
      <nuxt-link :to="`/thoughts/${article.slug}`" v-for="article in selected_articles" :key="article.slug">
        <section class="info">
          <span class="title">{{ article.title }}</span>
          <span class="description">{{ article.summary }}</span>
        </section>
      </nuxt-link>
    </main>
  </section>
  
</template>

<script setup>

import selected_articles from '~/assets/selected_articles.json'

</script>

<style lang="scss" scoped>

@import './assets/variables';
@import './assets/animation';

#Hero {
  width: 100%;
  position: relative;
  background: linear-gradient(-120deg, transparent 80%, rgba($blue, 0.15));
  background:  linear-gradient(-120deg, transparent 80%, rgba($blue, 0.15)), url('/desktop.jpg') no-repeat top right;
  background-size: contain;
  border-bottom: $border;

  @media screen and (max-width: 1280px){
    background-size: cover;
  }

  @media screen and (max-width: 1024px){
    background:  linear-gradient(-120deg, transparent 80%, rgba($blue, 0.15)), url('/mobile.jpg') no-repeat top right;
    background-size: cover;
  }

  .mega-hero {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-sm;
    padding: $spacing-md;
    position: relative;
    height: 100vh;

    h1 {
        font-size: 6rem;
        line-height: 80%;
        z-index: 1;
        text-shadow: -12px -20px 68px rgba($white, .36), 6px 10px 8px rgba($black, .6), 2px 4px 2px rgba($black, .6);

        @media screen and (max-width: 768px){
          font-size: 18vw;
        }
      }

      @media screen and (max-width: 768px){
        width: 100%;
        margin: 0 auto;
      }

      p {
        font-size: $font-size-xl;
        line-height: $font-size-xl;
        font-family: $font-family-main;
        font-weight: 200;
        max-width: 600px;
        text-wrap: balance;
        color: $red;
        opacity: 1;
        text-shadow: -20px -100px 800px rgba($red, 0.4), 1px 1px 2px rgba($black, 1);

        @media screen and (max-width: 1180px){
          max-width: 500px;
        }
      }

      .mega-title {
        position: absolute;
        top: $spacing-xl;
        left: $spacing-xl;

        @media screen and (max-width: 1024px){
          top: $spacing-md;
          left: $spacing-md;
        }
      }

      .mega-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: $spacing-md;
        gap: $spacing-md;
        width: 100%;
        background: rgba($black, 0.85);
        border-top: $border;

        &:after {
          content: '';
          height: 100%;
          width: 35%;
          background: linear-gradient(90deg, transparent, $black);
          display: block;
          position: absolute;
          z-index: 1;
          right: 0;
          backdrop-filter:blur(10px);
          mask-image: linear-gradient(90deg, transparent 0%, $black 40%);
          pointer-events: none;
        }

        h4 {
          margin: 0;
          text-wrap: nowrap;
        }

        .clients {
          display: flex;
          flex-direction: row;
          gap: $spacing-md;

          img {
            height: 22px;
            opacity: 0.4;
            transition: 0.2s all ease-in-out;
            mix-blend-mode:luminosity;

            &:hover {
              opacity: 1;
            }
          }
        }

        .button {
          position: absolute;
          z-index: 2;
          right: $spacing-md;

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

#Writing {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: $spacing-lg;
  background: rgba($blue, 0.1);

  @media screen and (max-width: 768px){
    flex-direction: column;
    gap: $spacing-md;
    padding: 0 $spacing-md;
  }
  
  .writing-intro {
    display: flex;
    flex-direction: column;

    ul {

      li {
        list-style: none;
        margin-bottom: $spacing-md;

        a {
          text-decoration: none;
          font-weight: bold;
          font-size: $font-size-md;
          color: $black;
        }
      }
    }
  }

  .articles {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-sm;
    width: 100%;
  }

      @media screen and (max-width: 1120px) {
        .articles {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: $spacing-md;
        }
      }

      @media screen and (max-width: 768px) {
        .articles {
          display: grid;
          grid-template-columns: 1fr;
          gap: $spacing-sm;
          margin-bottom: $spacing-md;
        }
      }

  .articles a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: $font-size-lg;
    text-align: center;
    transition: all 0.35s ease-in-out;
    position: relative;

    .info {
      width: 100%;
      display:flex;
      flex-direction: column;
      padding: $spacing-sm 0;
      text-wrap: balance;
      text-align: left;

      .title {
        font-size: $font-size-lg;
        font-family: $font-family-main;
      }

      .description {
        font-size: $font-size-sm;
        font-family: $font-family-secondary;
        line-height: $font-size-md * $multiplier; 
        color: $white;
        margin-top: $spacing-xs;
        opacity: 0.6;
        font-weight: normal;
      }
    }
  }

  
}

#RecentWork {
  display: flex;
  flex-direction: column;
  margin: $spacing-lg auto;

  .work-intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 $spacing-md;

    @media screen and (max-width: 768px){
      padding: 0;
    }
  }

  h3 {
    padding: 0 $spacing-md;
  }
  
  
}

.home-projects {

  @media screen and (max-width: 768px){
    padding: 0;
  }
}

</style>