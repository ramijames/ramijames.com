<template>
  <main id="Hero" class="w-three-quarters">
    <section class="mega-hero">
      <section class="intro-left">
        <h1>Interface Designer</h1>
        <p>My name is Rami James and I work as a freelance user interface, user experience, interaction, and design professional.</p>
        <a href="mailto:ramijames@gmail.com" class="button">Become a client</a>
      </section>
    </section> 
  </main>

  <section class="home-projects">
    <MergedProjects />
  </section>

  <section id="Writing" class="w-three-quarters">
    <section class="writing-intro">
      <h2>Thoughts</h2>
    </section>
    <main class="articles">
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 0 $spacing-md;
  margin: $spacing-lg auto;

  @media screen and (max-width: 768px){
    margin-top: 0;
  }

  .mega-rotate {
    width: 100%;
    height: 50vh;
  }

  .mega-hero {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    gap: $spacing-lg;
    padding: 0 $spacing-md;

    @media screen and (max-width: 768px){
      flex-direction: column-reverse;
      gap: $spacing-sm;
      padding: 0;
      margin-top: 0;
    }
    
    .intro-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: $spacing-sm;

      h1 {
        font-size: 8vw;
        line-height: 80%;

        @media screen and (max-width: 768px){
          font-size: $font-size-xxl;
        }
      }

      @media screen and (max-width: 768px){
        width: 100%;
        margin: 0 auto;
      }

      p {
        font-size: $font-size-lg;
        font-family: $font-family-main;
        max-width: 600px;
        text-wrap: balance;
      }
    }

    .intro-right {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: $spacing-md;

      @media screen and (max-width: 768px){
        width: 80%;
        align-self: flex-start;
      }

      img {
        width: 100%;
        height: auto;
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
  margin: $spacing-lg auto;
  padding: $spacing-lg;
  border-radius: $br-lg;
  min-height: 600px;
  max-width: 800px;

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