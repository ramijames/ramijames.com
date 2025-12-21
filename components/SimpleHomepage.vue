<template>
  <main id="Hero">
    <section class="mega-hero w-three-quarters">
      <h1>Interface<br>Designer</h1>
      <section class="mega-content">
        <p>My name is Rami James and I work as a freelance user interface, user experience, interaction, and design professional.</p>
      </section>
    </section>  
    <img src="/hummingbird.png" class="hummingbird" />
    <section id="Clients" class="w-three-quarters">
      <h4>I've been lucky to work with</h4>
      <img src="/clients.png" />
      <a href="mailto:ramijames@gmail.com" class="button">Become a client</a>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 0 $spacing-md;
  background: linear-gradient(-120deg, transparent 80%, rgba($blue, 0.15));

  .hummingbird {
    position: absolute;
    z-index: 0;
    right: 0;
    top: 55%;
    transform: translateY(-50%);
    width: 55vw;
    transition: all 0.4s ease-in-out;

    @media screen and (min-width: 1800px){
      width: 50vw;
      max-width: 1000px;
      top: 50%;
      right: 5%;
    }

    @media screen and (max-width: 1400px){
      width: 70vw;
      top: 50%;
      right: -15%;
    }

    @media screen and (max-width: 1180px){
      width: 70vw;
      top: 45%;
      right: -15%;
    }
    
    @media screen and (max-width: 768px){
      width: 80vw;
      top: 30%;
      right: -30%;
    }
  }

  @media screen and (max-width: 768px){
    margin-top: 0;
  }

  #Clients {
    padding: 0 $spacing-md;
    margin: $spacing-lg auto;
    opacity:0.85;
    transition: all 0.2s ease-in-out;
    max-width: 1200px;

    img {
      max-width: 100%;
      width: 600px;
      padding: $spacing-sm 0;
      border-top: $border;
      background: rgba($black, 0.25);
    }

    &:hover {
      opacity:1;
    }
  }

  .mega-rotate {
    width: 100%;
    height: 50vh;
  }

  .mega-hero {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 1200px;
    gap: $spacing-sm;
    padding: 0 $spacing-md;
    position: relative;

    h1 {
        font-size: 8vw;
        line-height: 80%;
        z-index: 1;
        text-shadow: -20px -100px 800px rgba($red, 0.4), 2px 4px 2px rgba($black, 1);

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

      .mega-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: $spacing-sm;
        z-index: 1;
      }

    @media screen and (max-width: 768px){
      flex-direction: column;
      align-items: flex-start;
      gap: $spacing-sm;
      padding: 0;
      margin-top: 0;
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